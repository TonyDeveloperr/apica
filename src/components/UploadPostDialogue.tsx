import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import PrimaryButton from "./PrimaryButton";
import InputBox from "./InputBox";
import SecondaryButton from "./SecondaryButton";

import { addDoc } from "firebase/firestore";

import { postsCollection } from "../App";
import PopupMessage from "./PopupMessage";

interface Props {
  onClose: () => void;
  refreshPostList: () => void;
  toggleUploadDialogue: () => void;
}

const PostUploadDialogue = ({
  onClose,
  refreshPostList,
  toggleUploadDialogue,
}: Props) => {
  interface City {
    nume: string;
    simplu: string;
    comuna: string;
  }

  interface County {
    auto: string;
    nume: string;
  }

  // info for the select tags
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("Abrud");
  const [counties, setCounties] = useState<County[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // info from the user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const [invalidCredentials, setinvalidCredentials] = useState(false);

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

  const onSubmitPost = async () => {
    try {
      await addDoc(postsCollection, {
        city: selectedCity,
        county: selectedCounty,
        date: currentDateTime,
        description: description,
        title: title,
        school: school,
        likes: 0,
      });
      refreshPostList();
      toggleUploadDialogue();
      console.log("postat");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <>
      {invalidCredentials && (
        <PopupMessage isAlert={true}>
          Toate câmpurile sunt obligatorii!
        </PopupMessage>
      )}
      <div className="dialogue-background"></div>
      <div className="upload-container">
        <div className="upload-fields-container">
          <h1>Adaugă o postare</h1>
          <InputBox
            longText={false}
            placeholder="Care este subiectul postarii?"
            label="Titlu"
            onChange={setTitle}
            id="title-input"
          />

          <Dropdown
            items={counties.map((county: County) => county.nume)}
            label="Județ"
            onSelect={setSelectedCounty}
            placeholder="...."
            id="county-dropdown"
          />
          <Dropdown
            items={cities}
            label="Oraș"
            onSelect={setSelectedCity}
            placeholder="...."
            id="city-dropdown"
          />
          <InputBox
            longText={false}
            placeholder="ex. Scoala gimnaziala..."
            label="Unitate de invatamant"
            onChange={setSchool}
            id="school-input"
          />
          <InputBox
            longText={true}
            placeholder="Descrie situatia..."
            label="Descriere"
            onChange={setDescription}
            id="description-input"
          />
          <div className="send-post-dialogue-btns-container">
            <SecondaryButton
              style={{
                padding: "0.3rem 1.5rem 0.3rem 1.5rem",
              }}
              onClick={onClose}
            >
              Anuleaza
            </SecondaryButton>
            <PrimaryButton
              style={{
                padding: "0.3rem 1.5rem 0.3rem 1.5rem",
                marginLeft: "1rem",
              }}
              onClick={() =>
                title && description && school
                  ? onSubmitPost()
                  : setinvalidCredentials(true)
              }
            >
              Postează
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUploadDialogue;
