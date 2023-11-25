import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import emptyStateImg from "../assets/empty_state_illustration.svg";
import errorImg from "../assets/error_illustration.svg";
import SearchBar from "./SearchBar";
import { Spin } from "antd";
import PopularAttractionsCarousel from "./PopularAttractionsCarousel";

import {
  fetchItemsFromAPI,
  fetchAttractionsByCountry,
} from "../services/apiService";

/// Catalog page, displays all attractions
function Catalog() {
  /// Attractions
  const [items, setItems] = useState([]);

  /// Filtered attractions
  const [filteredItems, setFilteredItems] = useState([]);

  /// Whether the attractions are being fetched
  const [isLoading, setIsLoading] = useState(true);

  /// Error fetching attractions
  const [error, setError] = useState(null);

  /// Search term for filtering attractions
  const [searchTerm, setSearchTerm] = useState("");

  /// Filter by country
  const [countryFilter, setCountryFilter] = useState("");

  // Get attractions from API (all attractions or by country)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        let data;
        // if country filter is set, fetch attractions by country
        // otherwise, fetch all attractions
        if (countryFilter) {
          data = await fetchAttractionsByCountry(countryFilter);
        } else {
          data = await fetchItemsFromAPI();
        }
        setItems(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [countryFilter]);

  // Filter attractions by search term
  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, items]);

  // Clear search term
  const clearSearch = () => setSearchTerm("");

  if (isLoading)
    return (
      <div className="w-full h-96 mt-20 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-96 mt-32 flex flex-col justify-center items-center">
        <img src={errorImg} className="w-4/12" />
        <p className="text-xl mt-4 font-semibold">Something went wrong :(</p>
        <p className="text-md"> {error}</p>
      </div>
    );

  return (
    <div className="p-4">
      {/* Carousel of popular attractions */}
      <PopularAttractionsCarousel />
      {/* Search bar containing search input and country filters */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onCountrySelect={setCountryFilter}
        clearSearch={clearSearch}
        selectedCountry={countryFilter}
      />
      {/* Attractions */}
      {filteredItems.length === 0 ? (
        // Empty State
        <div className="flex flex-col justify-center items-center w-full mt-32">
          <img src={emptyStateImg} className="w-6/12" />
          <p className="text-xl mt-4">No items found...</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-end">
          <p className="mb-4">{filteredItems.length} Results</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;
