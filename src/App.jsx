import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecordForm from "./components/RecordForm";
import HealthList from "./components/HealthList";

class App extends Component {
  render() {
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
            <Route path="/record" element={<RecordForm />} />
            <Route path="/health" element={<HealthList />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
