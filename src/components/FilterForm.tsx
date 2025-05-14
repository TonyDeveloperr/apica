import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import citiesData from '../cities.json';

interface City {
  nume: string;
  simplu: string;
  comuna: string;
}

interface County {
  auto: string;
  nume: string;
}

interface FilterFormProps {
  setSelectedCounty: (county: string) => void;
  setSelectedCity: (city: string) => void;
}

interface RomanianCity {
  city: string;  // Assuming 'city' holds the name of the city
  county: string; // Assuming 'county' holds the county name
}

const FilterForm: React.FC<FilterFormProps> = ({ setSelectedCounty, setSelectedCity }) => {
  const [counties, setCounties] = useState<County[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // Directly use the imported citiesData
    if (citiesData && Array.isArray(citiesData)) {
      const citySet = new Set<string>();
      citiesData.forEach((city: RomanianCity) => {
        citySet.add(city.city); // Assuming the name of the city is under 'city'
      });
      const sortedCities = Array.from(citySet).sort();
      setCities(sortedCities);
    } else {
      console.error("citiesData is not in the expected array format");
    }
  }, []); // No need to fetch anything, citiesData is already imported

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="filter-form-container">
      <Dropdown
        items={cities}
        label="Oras"
        onSelect={handleCityChange}
        placeholder="Alege un oras"
        id="city-select"
      />
    </div>
  );
};

export default FilterForm;
