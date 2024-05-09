import React from "react";
import Movie from "../assets/movie.svg";
import TVShow from "../assets/tvshow.svg";
import Education from "../assets/education.svg";
import Stocks from "../assets/stocks.svg";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate("/movie");
  };
  const handleTVShowlick = () => {
    navigate("/tvshow");
  };
  const handleEducationlick = () => {
    navigate("/education");
  };
  const handleStocksClick = () => {
    navigate("/stocks");
  };

  return (
    <>
      <div>
        <h2>Choose Categoary to Upload</h2>
      </div>

      <div className="home">
        <div className="config" onClick={handleMovieClick}>
          <img src={Movie} alt="movie" title="Movie" />
          <h2>Movies</h2>
        </div>
        <div className="config" onClick={handleTVShowlick}>
          <img src={TVShow} alt="tvshow" title="TV Show" />
          <h2>TV Shows</h2>
        </div>
        <div className="config" onClick={handleEducationlick}>
          <img src={Education} alt="education" title="Education" />
          <h2>Education</h2>
        </div>
        <div className="config" onClick={handleStocksClick}>
          <img src={Stocks} alt="stocks" title="Finance" />
          <h2>Finance</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
