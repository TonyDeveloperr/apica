import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";

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

const FilterForm: React.FC<FilterFormProps> = ({ setSelectedCounty, setSelectedCity }) => {
  const [counties, setCounties] = useState<County[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("https://roloca.coldfuse.io/judete")
      .then((res) => setCounties(res.data))
      .catch((error) => console.error("Error fetching counties:", error));
  }, []);

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);

    const selectedCountyData = counties.find((c) => c.nume === county);
    if (selectedCountyData) {
      axios
        .get(`https://roloca.coldfuse.io/orase/${selectedCountyData.auto}`)
        .then((res) => setCities(res.data.map((city: City) => city.nume)))
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="filter-form-container">
      <Dropdown
        items={counties.map((county) => county.nume)}
        label="County"
        onSelect={handleCountyChange}
        placeholder="Select a county"
        id="county-select"
      />
      <Dropdown
        items={cities}
        label="City"
        onSelect={handleCityChange}
        placeholder="Select a city"
        id="city-select"
      />
    </div>
  );
};

export default FilterForm;
