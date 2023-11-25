import React, { useState, useEffect } from "react";
import { fetchSimilarAttractions } from "../services/apiService";
import { Spin } from "antd";
import ItemCard from "./ItemCard";

function SuggestedAttractions({ categoryId }) {
  const [suggestedAttractions, setSuggestedAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchSimilarAttractions(categoryId)
      .then((attractions) => {
        setSuggestedAttractions(attractions);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load suggested attractions");
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading)
    return (
      <div className="w-full h-96 mt-20 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  if (error) return <></>;

  return (
    <section>
      {suggestedAttractions.length > 0 && (
        <div>
          <h2 className="text-2xl mt-4">More events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {suggestedAttractions.map((attr) => (
              <ItemCard key={attr.id} item={attr} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default SuggestedAttractions;
