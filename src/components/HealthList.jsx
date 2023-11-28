import { Component } from "react";
import PropTypes from 'prop-types';



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
    this.setState((prevState) =>({
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
  
    console.log("Updated Records:", updatedRecords);

    this.props.editRecord(recordId, { healthRecords: updatedRecords });
    console.log("After deleting, healthRecords in App component:", this.props.healthRecords);


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

    if (!healthRecords || healthRecords.length === 0) {
      return <p> No recorded items available</p>; //  handle the case where healthRecords not available
    }

    return (
      <div>
        <h2>Health Records</h2>
        <ul>
          {healthRecords.map((record) => (
            <li key={record.id}>
              <span>
                {record.type} - {record.date}
              </span>
              <p>{record.info}</p>
              <button onClick={() => this.handleEdit(record.id)}>Edit </button>
              <button onClick={() => this.handleDelete(record.id)}>
                Delete{" "}
              </button>
            </li>
          ))}
        </ul>

        {this.state.editedRecordId && (
          <div>
            <h3> Edit Record</h3>
            <form>
              <label> Type</label>
              <input
                type="text"
                name="type"
                value={this.state.editedRecordData.type}
                onChange={this.handleEditChange}
              />

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={this.state.editedRecordData.date}
                onChange={this.handleEditChange}
              />
              <label>Info</label>
              <textarea
                name="info"
                value={this.state.editedRecordData.info}
                onChange={this.handleEditChange}
              />
              <button type="button" onClick={this.handleEditSubmit}>
                Save
              </button>
            </form>
          </div>
        )}
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
  };

export default HealthList;
