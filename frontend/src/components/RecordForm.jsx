import { Component } from "react";
import { Link } from "react-router-dom";
import dogWalk from "../assets/img/dogWalk.svg";
import moment from "moment";

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      date: "",
      info: "",
      healthRecords: [],
      notifications: [],
      showOptions: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling form submission");

    const parsedDate = new Date(this.state.date);

    // Format the date as "YYYY-MM-DD"
    const formattedDate = moment(parsedDate).utc().format("YYYY-MM-DD");

    const newRecord = {
      id: this.state.healthRecords.length + 1,
      type: this.state.type,
      date: formattedDate,
      info: this.state.info,
    };

    fetch("http://localhost:3001/api/healthrecords/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((addedRecord) => {
        // eslint-disable-next-line react/prop-types
        this.props.addHealthRecord(addedRecord);

        this.setState({
          type: "",
          date: "",
          info: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  toggleOptions = () => {
    this.setState((prevState) => ({
      showOptions: !prevState.showOptions,
    }));
  };

  handleOptionSelect = (option) => {
    this.setState({
      type: option,
      showOptions: false,
    });
  };

  render() {
    // console.log("Rendering Record component");
    const { type, showOptions } = this.state;

    const activityOptions = [
      "I walked for 30mins today...",
      "Breasts self-exam",
      "Morning stretch",
      "How can I make my day better?",
    ];
    return (
      <div className="container">
        <h1> Track Your Healthy Activities </h1>
        <div className="dropdown">
          <p onClick={this.toggleOptions} className="dropdown-trigger">
            {type || "Need a prompt to get you going?"}
          </p>
          {showOptions && (
            <div className="dropdown-menu">
              {activityOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => this.handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label> Type </label>
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <label> Date</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <label> Notes </label>
          <textarea
            name="info"
            value={this.state.info}
            onChange={this.handleChange}
          />
          <button type="submit" className="button-link button-secondary">
            Submit{" "}
          </button>
        </form>
        <div className="button-container">
          <Link to="/health" className="button-link">
            {" "}
            Review Logs
          </Link>
        </div>
        <img src={dogWalk} alt="Illustration of a person walking the dog" />
      </div>
    );
  }
}

export default RecordForm;
