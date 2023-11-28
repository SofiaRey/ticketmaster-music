import { Input } from "antd";
import uyFlag from "../assets/flags/uruguay.png";
import arFlag from "../assets/flags/argentina.png";
import brFlag from "../assets/flags/brazil.png";
import ukFlag from "../assets/flags/united-kingdom.png";
import frFlag from "../assets/flags/france.png";
import esFlag from "../assets/flags/spain.png";

/// Search bar component, contains search input and country filter
function SearchBar({
  searchTerm,
  onSearchChange,
  onCountrySelect,
  selectedCountry,
  clearSearch,
}) {
  // List of countries to display
  const countries = [
    { countryCode: "UY", flag: uyFlag },
    { countryCode: "AR", flag: arFlag },
    { countryCode: "BR", flag: brFlag },
    { countryCode: "UK", flag: ukFlag },
    { countryCode: "FR", flag: frFlag },
    { countryCode: "ES", flag: esFlag },
  ];

  return (
    <div className="flex items-center flex-col justify-center mt-12 mb-6">
      {/* Search input */}
      <div className="flex justify-center w-full mb-4">
        <Input
          className="w-8/12 h-12"
          placeholder="Search events"
          value={searchTerm}
          onChange={onSearchChange}
        />
        {/* Clear button */}
        <button
          className="ml-4 text-stone-400 hover:text-tmBlue"
          onClick={clearSearch}
        >
          Clear Filters
        </button>
      </div>
      {/* Country filter */}
      {/* ----------------------------------- */}
      {/* ----------- Please read ----------- */}
      {/* The initial purpose of the country filter was to sift through events. 
      However, as the events are repeated, the filter's logic was modified to 
      focus on attractions, which don't include country-specific information. 
      Despite this change, the country filter remains visible to show the UI and
      the functionality of the component. */}
      {/* ----------------------------------- */}
      <div className="flex gap-4">
        {countries.map(({ countryCode, flag }) => (
          <div
            onClick={() => onCountrySelect(countryCode)}
            className={`rounded-full hover:border-tmBlue border-2 ${
              selectedCountry == countryCode ? "border-tmBlue" : "border-white"
            } w-10 h-10 transition`}
            key={countryCode}
          >
            <img
              src={flag}
              className="w-full h-full p-0.5"
              alt={`${countryCode} flag`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
