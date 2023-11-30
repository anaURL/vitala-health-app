import { Link } from "react-router-dom";
import "../index.css";
import homeImage from "../assets/img/homeImage.svg"


const HomePage = () => {
  return (
    <div className="container">
      <h1> Hey, Ana </h1>
      <p> What&apos;s the health vibe for the day?</p>
      <div className="button-container">
      <Link to="/record" className="button-link"> Track </Link>
      <Link to="/health" className="button-link"> Review Logs </Link>
      </div>
      <img src={homeImage} alt="Illustration of a relaxed person surrounded by the purple sunflowers" />
    
    </div>
  
  );
};

export default HomePage;
