import React, { useState, useEffect } from "react";
import { Carousel, Spin, Alert, Button } from "antd";
import { fetchPopularAttractions } from "../services/apiService";

/// Carousel with popular attractions used in the Catalog page
function PopularAttractionsCarousel() {
  /// Popular attractions
  const [popularAttractions, setPopularAttractions] = useState([]);

  /// Whether the attractions are being fetched
  const [isLoading, setIsLoading] = useState(false);

  /// Error fetching attractions
  const [error, setError] = useState(null);

  // Get popular attractions for carousel
  useEffect(() => {
    const fetchAttractions = async () => {
      setIsLoading(true);
      try {
        const attractions = await fetchPopularAttractions();
        setPopularAttractions(attractions);
      } catch (err) {
        setError("Failed to load popular attractions");
      }
      setIsLoading(false);
    };

    fetchAttractions();
  }, []);

  if (error) {
    return <div className="mt-20"></div>;
  }

  // Loading state, placeholder with spinner
  if (isLoading)
    return (
      <div className="mt-16 h-96 w-full flex justify-center items-center bg-stone-200">
        {" "}
        <Spin size="large" />
      </div>
    );

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

  return (
    <Carousel autoplay={true} className="mt-16 h-96 w-full overflow-hidden">
      {popularAttractions.map((attraction) => (
        <div key={attraction.id}>
          <div
            style={{ backgroundImage: `url('${getLargestImage(attraction.images)}')` }}
            className="w-full h-96 bg-cover bg-center mb-4 bg-no-repeat bg-fixed flex flex-col justify-end p-16"
          >
            {/* Gradient Background */}
            <div
              className="absolute right-0 bottom-0 w-full h-64"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 70%",
              }}
            ></div>
            {/* Attraction title */}
            <h1 className="text-white z-10 text-4xl">{attraction.name}</h1>
            {/* Button to go to the attraction */}
            <Button
              type="primary"
              onClick={() => window.open(attraction.url, "_blank")}
              className="mt-4 w-min z-10 bg-tmBlue"
            >
              Go to attraction
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default PopularAttractionsCarousel;
