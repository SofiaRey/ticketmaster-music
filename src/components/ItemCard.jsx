import { useNavigate } from "react-router-dom";
import useFavoritesStore from "../stores/favoritesStore";
import { Card, Button } from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  GlobalOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

/// Item card component, displayed in the Catalog page
function ItemCard({ item }) {
  const navigate = useNavigate();

  // Item data
  const { name, upcomingEvents } = item;
  
  // Favorites store
  const { favorites, toggleFavorite } = useFavoritesStore((state) => ({
    favorites: state.favorites,
    toggleFavorite: state.toggleFavorite,
  }));

  // Whether the item is a favorite
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  // On card click, navigate to item detail
  const handleCardClick = () => {
    navigate(`/attraction/${item.id}`);
  };

  // On favorite toggle, add/remove from favorites
  const handleToggleFavorite = (event) => {
    event.stopPropagation(); // Detiene la propagación del evento
    toggleFavorite(item);
  };

  // Get top 3 social links
  function getTopSocialLinks(externalLinks) {
    const priorityOrder = ["homepage", "instagram", "youtube", "twitter"];
    const selectedLinks = [];

    for (const platform of priorityOrder) {
      if (externalLinks && externalLinks[platform]) {
        selectedLinks.push({
          platform: platform,
          url: externalLinks[platform][0].url,
        });
        if (selectedLinks.length === 3) break;
      }
    }

    return selectedLinks;
  }

  // Get social media icon
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <InstagramOutlined />;
      case "youtube":
        return <YoutubeOutlined />;
      case "twitter":
        return <TwitterOutlined />;
      case "homepage":
        return <GlobalOutlined />;
      default:
        return null;
    }
  };

  // Image URL of the item
  const imageUrl =
    item.images.find((img) => img.ratio === "3_2")?.url ||
    item.images[0]?.url ||
    "default-placeholder.png";

  // Description of the item
  const description =
    upcomingEvents?._total == 0
      ? "No upcoming events"
      : `${upcomingEvents._total} upcoming event${
          upcomingEvents._total > 1 ? "s" : ""
        }`;

  // Social media links
  const socialLinks = getTopSocialLinks(item.externalLinks);

  // Social media information for actions (icons at the bottom of the card)
  const socialActions = socialLinks.map((link) => ({
    icon: getPlatformIcon(link.platform),
    url: link.url,
  }));

  return (
    <div style={{ position: "relative" }}>
      <Card
        hoverable
        loading={!item}
        onClick={handleCardClick}
        cover={<img alt={name} src={imageUrl} />}
        actions={socialActions.map((action) => (
          <a
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {action.icon}
          </a>
        ))}
      >
        <Card.Meta title={name} description={description} />
      </Card>
      {/* Favorite button */}
      <Button
        shape="circle"
        icon={
          isFavorite ? (
            <HeartFilled className="text-tmBlue" />
          ) : (
            <HeartOutlined />
          )
        }
        onClick={handleToggleFavorite}
        className="bg-white top-2 right-2 z-10 absolute shadow-sm flex justify-center items-center"
      />
    </div>
  );
}

export default ItemCard;
