import React, { useState, useEffect } from "react";
import "./styles/ViewPort.css";

const ViewPort = () => {
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const storedMetadata = localStorage.getItem("metadata");
    if (storedMetadata) {
      setMetadata(JSON.parse(storedMetadata));
    }
  }, []);

  const renderInputs = () => {
    return Object.keys(metadata).map((key, index) => (
      <div className={`view-port-group ${key.toLowerCase()}`} key={index}>
        {key === "ImageURL" ? (
          <img
            src={metadata[key]}
            style={{
              opacity: 0.7,
              width: "800px",
              height: "800px",
              objectFit: "cover",
            }}
            alt="background_image"
          />
        ) : (
          metadata[key]
        )}
      </div>
    ));
  };

  return <div className="view-port">{renderInputs()}</div>;
};

export default ViewPort;
