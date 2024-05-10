import React, { useState, useEffect } from "react";
import "./styles/Movies.css";
import { COMMON_KEYS } from "../constants";
import Back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const [metadata, setMetadata] = useState({});
  const [tutorName, setTutorName] = useState("");
  let keys = [...COMMON_KEYS, "Age", "Tutor", "Topic"];

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("component", "Education");
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
    setTutorName(e.target.value);
    setMetadata({ ...metadata, Tutor: e.target.value });

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
        {key === "Tutor" ? (
          <select value={tutorName} onChange={(e) => listClickHandler(e, key)}>
            <option value="">Select Tutor</option>
            <option value="Nitin">Nitin</option>
            <option value="Rajat">Rajat</option>
            <option value="Mukesh">Mukesh</option>
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
        <h1>Education Metadata</h1>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Education;
