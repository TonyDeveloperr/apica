import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import citiesData from "../cities.json";

interface FilterFormProps {
  setSelectedCounty: (county: string) => void;
  setSelectedCity: (city: string) => void;
}

interface RomanianCity {
  city: string;
}

const FilterForm: React.FC<FilterFormProps> = ({ setSelectedCity }) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (citiesData && Array.isArray(citiesData)) {
      const citySet = new Set<string>();
      citiesData.forEach((city: RomanianCity) => {
        citySet.add(city.city);
      });
      const sortedCities = Array.from(citySet).sort();
      setCities(sortedCities);
    }
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="filter-form-container">
      <Dropdown
        items={cities}
        label="Oraș"
        onSelect={handleCityChange}
        placeholder="Alege un oraș"
        id="city-select"
      />
    </div>
  );
};

export default FilterForm;
