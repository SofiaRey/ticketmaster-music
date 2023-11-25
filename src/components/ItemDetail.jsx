import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchItemDetail,
  fetchEventsByAttractionId,
  fetchSimilarAttractions,
} from "../services/apiService";
import { Tag, Collapse, Card, Input, DatePicker, Spin, Button } from "antd";
import {
  CalendarOutlined,
  HomeOutlined,
  PushpinOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import emptyStateImg from "../assets/empty_state_illustration.svg";
import useFavoritesStore from "../stores/favoritesStore";
import errorImg from "../assets/error_illustration.svg";
import SuggestedAttractions from "./SuggestedAttractions";
import "dayjs/locale/en";

const { Panel } = Collapse;

/// Item detail page
function ItemDetail() {
  const { id } = useParams();

  /// Item (attraction) being displayed
  const [item, setItem] = useState(null);

  /// Whether the item is being fetched
  const [isLoading, setIsLoading] = useState(true);

  /// Error fetching attraction
  const [error, setError] = useState(null);

  /// Events for the item
  const [attractionEvents, setAttractionEvents] = useState([]);

  /// Similar attractions based on the item's category
  const [suggestedAttractions, setSuggestedAttractions] = useState([]);

  /// Filter by city
  const [cityFilter, setCityFilter] = useState("");

  /// Filter by date
  const [dateFilter, setDateFilter] = useState(null);

  /// Whether the collapse is open showing the upcoming events
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  /// Favorites store
  const { favorites, toggleFavorite } = useFavoritesStore((state) => ({
    favorites: state.favorites,
    toggleFavorite: state.toggleFavorite,
  }));

  /// Whether the item is a favorite
  const isFavorite = favorites.some((fav) => fav.id === id);

  // Get item detail from API
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await fetchItemDetail(id);
        setItem(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Get events for the item
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await fetchEventsByAttractionId(id);
      setAttractionEvents(events);
    };

    fetchEvents();
  }, [id]);

  // Get suggested attractions
  useEffect(() => {
    if (item) {
      const categoryId = item.classifications[0].segment.id;
      fetchSimilarAttractions(categoryId).then(setSuggestedAttractions);
    }
  }, [item]);

  // Filter events by city and date
  const filteredEvents = attractionEvents.filter((event) => {
    return (
      (!cityFilter ||
        event._embedded.venues[0].city.name
          .toLowerCase()
          .includes(cityFilter.toLowerCase())) &&
      (!dateFilter ||
        dayjs(event.dates.start.localDate).isSame(dateFilter, "day"))
    );
  });

  // Handle collapse change
  const handleCollapseChange = (key) => {
    setIsCollapseOpen(key.length > 0);
  };

  // Get largest image from an array of images
  function getLargestImage(images) {
    const images16_9 = images.filter((img) => img.ratio === "16_9");
    let largestImage = null;
    let maxArea = 0;

    images16_9.forEach((img) => {
      const area = img.width * img.height;
      if (area > maxArea) {
        largestImage = img;
        maxArea = area;
      }
    });

    return largestImage ? largestImage.url : null;
  }

  if (isLoading)
    return (
      <div className="w-full h-96 mt-20 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  // Format upcoming event date
  function renderEventDate(dateString) {
    return dayjs(dateString).locale("en").format("ddd, MMM D, YYYY");
  }

  if (error)
    return (
      <div className="w-full h-96 mt-32 flex flex-col justify-center items-center">
        <img src={errorImg} className="w-4/12" />
        <p className="text-xl mt-4 font-semibold">Something went wrong :(</p>
        <p className="text-md"> {error}</p>
      </div>
    );

  return (
    <div>
      {/* Cover image */}
      {item.images ? (
        <div
          style={{ backgroundImage: `url('${getLargestImage(item.images)}')` }}
          className="w-full h-96 bg-cover bg-center mb-4 bg-no-repeat bg-fixed"
        ></div>
      ) : (
        // Empty state
        <div className="w-full h-96 bg-stone-300"></div>
      )}
      {/* Item info */}
      <div className="p-4">
        <div className="flex items-center w-full">
          {/* Item Title */}
          <h1 className="text-3xl font-bold">{item.name}</h1>
          {/* Item Categories */}
          <div className="ml-2 md:ml-8">
            <Tag>{item.classifications[0].segment.name}</Tag>
            <Tag>{item.classifications[0].subGenre.name}</Tag>
          </div>
          {/* Add or remove from Favorites button */}
          <Button
            className="ml-auto"
            onClick={() => toggleFavorite(item)}
            icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>
        {/* Upcoming events section */}
        <section>
          <h2 className="text-2xl mt-4">Upcoming events</h2>
          {/* Filters */}
          <div className="flex  justify-center my-8">
            <Input
              className="w-6/12 mr-4"
              placeholder="Filter by City"
              onChange={(e) => {
                setCityFilter(e.target.value);
                setIsCollapseOpen(true);
              }}
            />
            <DatePicker
              onChange={(date, dateString) => {
                setDateFilter(date);
                setIsCollapseOpen(true);
              }}
            />
          </div>
          {/* Events display */}
          {filteredEvents.length === 0 ? (
            // Empty state
            <div className="flex flex-col justify-center items-center w-full mb-8">
              <img src={emptyStateImg} className="w-4/12" />
              <p className="text-xl mt-4">No events found...</p>
            </div>
          ) : (
            <Collapse
              defaultActiveKey={[]}
              activeKey={isCollapseOpen ? "1" : ""}
              onChange={handleCollapseChange}
            >
              <Panel header="Upcoming Events" key="1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
                  {filteredEvents.map((event) => {
                    const description = `${event.dates.start.localDate} - ${event._embedded.venues[0].name}`;
                    return (
                      <Card
                        hoverable
                        loading={!suggestedAttractions}
                        onClick={() => window.open(event.url, "_blank")}
                        key={event.id}
                        title={event.name}
                      >
                        <div className="mb-4">
                          <CalendarOutlined className="text-tmBlue mr-4" />{" "}
                          {renderEventDate(event.dates.start.localDate)}
                        </div>
                        <div className="mb-4">
                          <PushpinOutlined className="text-tmBlue mr-4" />{" "}
                          {event._embedded.venues[0].city.name}
                        </div>
                        <div>
                          <HomeOutlined className="text-tmBlue mr-4" />{" "}
                          {event._embedded.venues[0].name}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          )}
        </section>
        {/* More events section */}
        <SuggestedAttractions categoryId={item.classifications[0].segment.id} />
      </div>
    </div>
  );
}

export default ItemDetail;
