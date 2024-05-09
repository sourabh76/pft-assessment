import React, { useState, useEffect } from "react";
import "./styles/Movies.css";
import { COMMON_KEYS } from "../constants";
import Back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [metadata, setMetadata] = useState({});
  const [genreValue, setGenreValue] = useState("");
  const [isGenreInputFocused, setIsGenreInputFocused] = useState(false);
  let keys = [...COMMON_KEYS, "Genre", "Cast", "Year", "Rating"];

  useEffect(() => {
    localStorage.clear();
  }, []);

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
  };

  const listClickHandler = (e, key) => {
    setGenreValue(e.target.value);
    setMetadata({ ...metadata, Genre: e.target.value });
    setIsGenreInputFocused(!isGenreInputFocused);

    localStorage.setItem(
      "metadata",
      JSON.stringify({ ...metadata, [key]: e.target.value })
    );
  };

  const renderInputs = () => {
    return keys.map((key) => (
      <div key={key} className="form-group">
        <label htmlFor={key} className="label">
          {key === "Title" ? key + "*" : key}
        </label>
        {key === "Genre" ? (
          <select value={genreValue} onChange={(e) => listClickHandler(e, key)}>
            <option value="">Select Genre</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
            <option value="Thriller">Thriller</option>
          </select>
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

export default Movies;
