import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecordForm from "./components/RecordForm";
import HealthList from "./components/HealthList";
import "./index.css";
class App extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor called");
    const storedRecords = localStorage.getItem("healthRecords");
    this.state = {
      healthRecords: storedRecords ? JSON.parse(storedRecords) : [],
      notification: null,
    };
  }

  updateHealthRecords = (newRecords, callback) => {
    console.log("Updating health records:", newRecords);

    this.setState({ healthRecords: newRecords }, () => {
      try {
        localStorage.setItem("healthRecords", JSON.stringify(newRecords));
        console.log("Local storage updated successfully.");
        if (callback) {
          callback();
        }
      } catch (error) {
        console.error("Error updating local storage:", error);
      }
    });
  };

  addHealthRecord = (newRecord) => {
    console.log("Adding new record:", newRecord);

    this.setState(
      (prevState) => ({
        healthRecords: [
          ...prevState.healthRecords,
          {
            ...newRecord,
            id: prevState.healthRecords.length + 1,
          },
        ],
      }),
      () => {
        this.updateHealthRecords(this.state.healthRecords);
      }
    );
  };

  editRecord = (recordId, updatedRecordData) => {
    const updatedRecords = this.state.healthRecords.map((record) =>
      record.id === recordId ? { ...record, ...updatedRecordData } : record
    );
    this.setState({
      healthRecords: updatedRecords,
    });
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/record"
            element={
              <RecordForm
                addHealthRecord={this.addHealthRecord}
                updateHealthRecords={this.updateHealthRecords}
              />
            }
          />
          <Route
            path="/health"
            element={
              <HealthList
                healthRecords={this.state.healthRecords}
                editRecord={this.editRecord}
                updateHealthRecords={this.updateHealthRecords}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
