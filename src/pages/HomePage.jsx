import { Link } from "react-router-dom";
import "../index.css";
import homeImage from "../assets/img/homeImage.svg"


const HomePage = () => {
  return (
    <div className="App">
    <div className="container">
      <h1> Hey, Alexandra </h1>
      <p> What&apos;s the health vibe for the day?</p>
      <div className="button-container">
      <Link to="/record" className="button-link"> Track </Link>
      <Link to="/health" className="button-link"> Review Logs </Link>
      </div>
      <img src={homeImage} alt="Illustration" />
    
    </div>
    </div>
  );
};

export default HomePage;
