import React, { useState, useEffect } from "react";
import "./styles/Movies.css";
import { COMMON_KEYS } from "../constants";
import Back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const genreOptions = ["A1", "A2", "A3"];
  const [metadata, setMetadata] = useState({});
  const [genreSuggestions, setGenreSuggestions] = useState(genreOptions);
  const [isGenreInputFocused, setIsGenreInputFocused] = useState(false);
  let keys = [...COMMON_KEYS, "Age", "Tutor", "Topic"];

  useEffect(() => {
    localStorage.clear();
  }, []);

  const filterGenreSuggestions = (input) => {
    const inputValue = input.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions =
      inputLength === 0
        ? []
        : genreOptions.filter(
            (option) =>
              option.toLowerCase().slice(0, inputLength) === inputValue
          );
    setGenreSuggestions(suggestions);
  };

  const handleChange = (e, key) => {
    const { value } = e.target;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [key]: value,
    }));

    localStorage.setItem(
      "metadata",
      JSON.stringify({ ...metadata, [key]: value })
    );

    if (key === "Tutor") {
      filterGenreSuggestions(value);
    }
  };

  const listClickHandler = (e, key) => {
    setMetadata({ ...metadata, Tutor: e.target.innerText });
    setIsGenreInputFocused(!isGenreInputFocused);

    localStorage.setItem(
      "metadata",
      JSON.stringify({ ...metadata, [key]: e.target.innerText })
    );
  };

  const renderInputs = () => {
    return keys.map((key) => (
      <div key={key} className="form-group">
        <label htmlFor={key} className="label">
          {key === "Title" ? key + "*" : key}
        </label>
        {key === "Tutor" ? (
          <div className="autocomplete">
            <input
              type="text"
              id={key}
              value={metadata[key] || ""}
              onChange={(e) => handleChange(e, key)}
              onFocus={() => setIsGenreInputFocused(!isGenreInputFocused)}
              className="input"
            />
            {isGenreInputFocused && (
              <ul className="suggestion">
                {genreSuggestions.map((genre, index) => (
                  <li key={index} onClick={(e) => listClickHandler(e, key)}>
                    {genre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <input
            type="text"
            id={key}
            value={metadata[key] || ""}
            onChange={(e) => handleChange(e, key)}
            className="input"
          />
        )}
      </div>
    ));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (!metadata.Title) {
      alert("Please select a valid title.");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    navigate("/upload");
  };

  const backHandleClick = () => {
    window.history.back();
  };

  return (
    <>
      <img
        className="back-button"
        src={Back}
        alt="back"
        onClick={backHandleClick}
      />
      <div className="form-container">
        <h1>Movie Metadata</h1>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Education;
