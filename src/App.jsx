import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RecordForm from "./components/RecordForm";
import HealthList from "./components/HealthList";
import "./index.css";
class App extends Component {
  constructor(props) {
    super(props);
    const storedRecords = localStorage.getItem("healthRecords");
    this.state = {
      healthRecords: storedRecords ? JSON.parse(storedRecords) : [],
      notification: null,
    };
  }

  updateHealthRecords = (newRecords, callback) => {
    this.setState({ healthRecords: newRecords }, () => {
      localStorage.setItem("healthRecords", JSON.stringify(newRecords));
      if (callback) {
        callback();
      }
    });
  };

  addHealthRecord = (newRecord) => {
    this.setState((prevState) => ({
      healthRecords: [
        ...prevState.healthRecords,
        {
          ...newRecord,
          id: prevState.healthRecords.length + 1,
        },
      ],
    }));
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
        <div className="App">
        <Routes>
        <Route path="/" element={<HomePage />} />
            <Route
              path="/record"
              element={<RecordForm addHealthRecord={this.addHealthRecord} />}
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
        </div>
      </Router>
    );
  }
}

export default App;
