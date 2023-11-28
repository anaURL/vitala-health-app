import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecordForm from "./components/RecordForm";
import HealthList from "./components/HealthList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthRecords: [],
    };
  }

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
    // console.log("Health Records Data:", this.state.healthRecords);

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/record">Record </Link>
              </li>
              <li>
                <Link to="/health">Health Records </Link>
              </li>
            </ul>
          </nav>
          <Routes>
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
