import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cat from "../assets/img/cat.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const formatHealthRecordDate = (date) => {
  const [month, day, year] = date.split("/");
  return `${day}/${month}/${year}`;
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

  handleEdit = (recordId) => {
    const recordToEdit = this.props.healthRecords.find(
      (record) => record.id === recordId
    );

    this.setState({
      editedRecordId: recordId,
      editedRecordData: {
        type: recordToEdit.type,
        date: recordToEdit.date,
        info: recordToEdit.info,
      },
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
    this.props.editRecord(
      this.state.editedRecordId,
      this.state.editedRecordData
    );

    this.setState({
      editedRecordId: null,
      editedRecordData: {
        type: "",
        date: "",
        info: "",
      },
    });
  };

  handleDelete = (recordId) => {
    console.log("Deleting record with id:", recordId);

    const updatedRecords = this.props.healthRecords.filter(
      (record) => record.id !== recordId
    );

    this.props.updateHealthRecords(updatedRecords, () => {
      console.log(
        "After deleting, healthRecords in App component:",
        updatedRecords
      );
    });

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
                      onClick={() => this.handleEdit(record.id)}
                      className="button-secondary"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      onClick={() => this.handleDelete(record.id)}
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
