import { Component } from "react";

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      date: "",
      info: "",
      healthRecords: [],
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: this.state.healthRecords.length + 1,
      type: this.state.type,
      date: this.state.date,
      info: this.state.info,
    };

    // eslint-disable-next-line react/prop-types
    this.props.addHealthRecord(newRecord);

    this.setState({
      type: "",
      date: "",
      info: "",
    });
  };

  render() {
    // console.log("Rendering Record component");

    return (
      <div>
        <h1> Record Health Activity </h1>
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
          <label> Info </label>
          <textarea
            name="info"
            value={this.state.info}
            onChange={this.handleChange}
          />
          <button type="submit">Submit </button>
        </form>
      </div>
    );
  }
}

export default RecordForm;
