import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";
import InputBox from "./InputBox";
import SecondaryButton from "./SecondaryButton";
import { addDoc } from "firebase/firestore";
import { postsCollectionRef } from "../App";
import PopupMessage from "./PopupMessage";

import citiesData from '../cities.json'; // Direct import from src folder

interface Props {
  onClose: () => void;
  refreshPostList: () => void;
  toggleUploadDialogue: () => void;
}

interface RomanianCity {
  city: string;  // Assuming 'city' holds the name of the city
  county: string; // Assuming 'county' holds the county name
}

const PostUploadDialogue = ({ onClose, refreshPostList, toggleUploadDialogue }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string>("Bucuresti");
  const [cities, setCities] = useState<string[]>([]);

  // Info from the user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");

  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const [invalidCredentials, setInvalidCredentials] = useState(false);

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

  const onSubmitPost = async () => {
    try {
      await addDoc(postsCollectionRef, {
        city: selectedCity,
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

    return () => clearInterval(intervalId);
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
                  : setInvalidCredentials(true)
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
