import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../assets/back.svg";

const Upload = () => {
  const [metadata, setMetadata] = useState({});
  const navigate = useNavigate();

  function getRandomColor() {
    let color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;

    return color;
  }

  let backgroundColor = getRandomColor();

  useEffect(() => {
    const storedMetadata = localStorage.getItem("metadata");
    if (storedMetadata) {
      setMetadata(JSON.parse(storedMetadata));
    }
  }, []);

  const handleSubmit = () => {
    navigate("/viewport");
  };

  const renderInputs = () => {
    return Object.keys(metadata).map((key, index) => (
      <div className="form-group" key={index}>
        <label htmlFor="Genre" className="label">
          {key}
        </label>
        <input type="text" value={metadata[key]} readOnly className="input" />
      </div>
    ));
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
      <div
        className="form-container"
        style={{ backgroundColor: backgroundColor }}
      >
        <h1>Uploaded Metadata</h1>
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <input className="submit" type="submit" value="View Port" />
        </form>
      </div>
    </>
  );
};

export default Upload;
