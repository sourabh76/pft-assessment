import React, { useState, useEffect } from "react";
import "./styles/ViewPort.css";

const ViewPort = () => {
  const [metadata, setMetadata] = useState({});
  const component = localStorage.getItem("component");

  useEffect(() => {
    const storedMetadata = localStorage.getItem("metadata");
    if (storedMetadata) {
      setMetadata(JSON.parse(storedMetadata));
    }
  }, []);

  const renderInputs = () => {
    return Object.keys(metadata).map((key, index) => {
      const customStyles = {};
      if (component === "Education" && key === "Title") {
        customStyles.left = "10%";
        customStyles.transform = "none";
      }
      return (
        <div
          className={`view-port-group ${key.toLowerCase()}`}
          key={index}
          style={customStyles}
        >
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
      );
    });
  };

  return <div className="view-port">{renderInputs()}</div>;
};

export default ViewPort;
