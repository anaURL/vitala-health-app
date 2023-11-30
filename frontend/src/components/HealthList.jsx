import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cat from "../assets/img/cat.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const formatHealthRecordDate = (date) => {
  if (!date) {
    return "";
  }
  return moment(date).format("DD-MM-YYYY");
};

class HealthList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedRecordId: null,
      editedRecordData: {
        type: "",
        date: "",
        info: "",
      },
    };
  }

  componentDidMount() {
    console.log("Fetching health records...");
    fetch("http://localhost:3001/api/healthrecords")
      .then((response) => response.json())
      .then((data) => {
        // Format dates for display in the UI
        const formattedData = data.map((record) => ({
          ...record,
          date: formatHealthRecordDate(record.date),
        }));

        console.log("Fetched health records:", formattedData);
        this.setState({ healthRecords: formattedData });
      })
      .catch((error) => {
        console.error("Error fetching health records:", error);
      });
  }

  handleEdit = (recordId) => {
    fetch(`http://localhost:3001/api/healthrecords/${recordId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((healthRecord) => {
        // Set the fetched health record in the component state
        this.setState({
          editedRecordId: recordId,
          editedRecordData: {
            type: healthRecord.type,
            date: healthRecord.date,
            info: healthRecord.info,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching record details:", error);
      });
  };

  handleEditChange = (e) => {
    this.setState((prevState) => ({
      editedRecordData: {
        ...prevState.editedRecordData,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleEditSubmit = () => {
    const { editedRecordId, editedRecordData } = this.state;
    const formattedDate = formatHealthRecordDate(editedRecordData.date);

    fetch(`http://localhost:3001/api/healthrecords/${editedRecordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editedRecordData,
        date: formattedDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedRecord) => {
        // Update the record in the parent component's state
        this.props.editRecord(editedRecordId, updatedRecord);

        // Reset the component state
        this.setState({
          editedRecordId: null,
          editedRecordData: {
            type: "",
            date: "",
            info: "",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  handleDelete = (recordId) => {
    console.log("Deleting record with id:", recordId);

    fetch(`http://localhost:3001/api/healthrecords/${recordId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Update the parent component's state after successful deletion
        const updatedRecords = this.props.healthRecords.filter(
          (record) => record._id !== recordId
        );
        this.props.updateHealthRecords(updatedRecords);

        // Reset the component state if the deleted record was being edited
        if (this.state.editedRecordId === recordId) {
          this.setState({
            editedRecordId: null,
            editedRecordData: {
              type: "",
              date: "",
              info: "",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  render() {
    console.log("HealthList component is rendering.");

    const { healthRecords } = this.props;
    return (
      <div className="container">
        <h1>Health Logs</h1>
        <div>
          {healthRecords.length === 0 ? (
            <p>No recorded items available</p>
          ) : (
            <div className="logs-table">
              {healthRecords.map((record, index) => (
                <div className="logs-row" key={index}>
                  <div className="logs-col">
                    {formatHealthRecordDate(record.date)}
                  </div>
                  <div className="logs-col">{record.type}</div>
                  <div className="logs-col">{record.info}</div>
                  <div className="button-container-2">
                    <button
                      onClick={() => this.handleEdit(record._id)}
                      className="button-secondary"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      onClick={() => this.handleDelete(record._id)}
                      className="button-secondary"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="button-container">
            <Link to="/record" className="button-link">
              Track
            </Link>

            <Link to="/" className="button-link">
              Home
            </Link>
          </div>

          {this.state.editedRecordId && (
            <div>
              <form className="edit-form">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={this.state.editedRecordData.date}
                  onChange={this.handleEditChange}
                />
                <label> Activity type</label>
                <input
                  type="text"
                  name="type"
                  value={this.state.editedRecordData.type}
                  onChange={this.handleEditChange}
                />

                <label>Note</label>
                <textarea
                  name="info"
                  value={this.state.editedRecordData.info}
                  onChange={this.handleEditChange}
                />
                <button
                  className=" button-secondary"
                  type="button"
                  onClick={this.handleEditSubmit}
                >
                  Save
                </button>
              </form>
            </div>
          )}
          <img src={cat} alt="Cute cat illustration" />
        </div>
      </div>
    );
  }
}

// Set default props to an empty array
HealthList.defaultProps = {
  healthRecords: [],
};

HealthList.propTypes = {
  healthRecords: PropTypes.array.isRequired,
  editRecord: PropTypes.func.isRequired,
  updateHealthRecords: PropTypes.func.isRequired,
};

export default HealthList;
