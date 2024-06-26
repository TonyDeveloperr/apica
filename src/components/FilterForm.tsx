import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
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

const FilterForm = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [counties, setCounties] = useState<County[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // Fetch counties
    axios
      .get("https://roloca.coldfuse.io/judete")
      .then((res) => {
        setCounties(res.data);
      })
      .catch((error) => console.error("Error fetching counties:", error));
  }, []);

  useEffect(() => {
    // Find the short name of the selected county
    const selectedCountyData = counties.find(
      (county) => county.nume === selectedCounty
    );
    if (selectedCountyData) {
      const shortName = selectedCountyData.auto;
      // Fetch cities for the selected county
      axios
        .get(`https://roloca.coldfuse.io/orase/${shortName}`)
        .then((res) => {
          const cityNames = res.data.map((city: City) => city.nume);
          setCities(cityNames);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedCounty, counties]);

  useEffect(() => {
    // Fetch cities for the default selected county when the component mounts
    if (counties.length > 0) {
      const defaultCountyData = counties[0]; // Assuming the first county is the default
      setSelectedCounty(defaultCountyData.nume);
    }
  }, [counties]);

  return (
    <>
      <div className="filter-form-container">
        <div>
          <Dropdown
            items={counties.map((county: County) => county.nume)}
            label="Județ"
            onSelect={setSelectedCounty}
            placeholder="...."
            style={{ marginBottom: "1.5rem" }}
            id="county-select1"
          />
        </div>
        <div>
          {" "}
          <Dropdown
            items={cities}
            label="Oraș"
            onSelect={setSelectedCity}
            placeholder="...."
            style={{ marginBottom: "1.5rem" }}
            id="city-select1"
          />
        </div>

        <PrimaryButton
          style={{
            marginLeft: "3rem",
          }}
          onClick={() => alert("ce faci pui")}
        >
          Caută
        </PrimaryButton>
      </div>
    </>
  );
};

export default FilterForm;
