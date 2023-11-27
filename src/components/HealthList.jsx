import {Component} from 'react';

class HealthList extends Component {
    constructor (props) {
        super (props); 
        this.state = {
            healthRecords: [ 
                {id: 1, type: "Functional training", date: "2023-27-11", info: "Did a 45-minute strength training"},
                {id: 2, type: "Meditation", date: "2023-28-11", info: "15-minute mindfulness with Headspace app"}
            ]
        }
    }

    render () {
        return ( 
            <div> 
                <h2> Health Records</h2>
                <ul> {this.state.healthRecords.map((record) => ( 
                    <li key={record.id}>
                        <span> {record.type} - {record.date}</span> 
                        <p> {record.info}</p>
                        {/* edit,delete */}
                        </li>
                ))}
                        </ul>
            </div>
        )
    }
}

export default HealthList;