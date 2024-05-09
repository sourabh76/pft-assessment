import React, { useEffect, useState } from "react";
import { COMMON_KEYS } from "../constants";
import "./styles/Movies.css";
import Back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";

const TVShows = () => {
  const [metadata, setMetadata] = useState({});
  let keys = [...COMMON_KEYS, "Episode", "Cast", "Year"];

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

  const renderInputs = () => {
    return keys.map((key) => (
      <div key={key} className="form-group">
        <label htmlFor={key} className="label">
          {key === "Title" ? key + "*" : key}
        </label>
        <input
          type="text"
          id={key}
          value={metadata[key] || ""}
          onChange={(e) => handleChange(e, key)}
          className="input"
        />
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
        <h1>TV Shows Metadata</h1>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default TVShows;
