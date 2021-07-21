import React, {useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListEditor} from "./ListEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
    const [startDate, setStartDate] = useState(new Date());

  return (
      <div className="container">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="navbar-brand" >Daily Gratitude</div>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item">
                                  <div className="nav-link">Login</div>
                              </li>
                          </ul>
                      </div>
                  </nav>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6 offset-md-3 text-right">
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
          </div>

          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <div style={{ border: "1px solid grey", padding: '2px', minHeight: '400px' }}>
                      <ListEditor/>

                  </div>
              </div>
          </div>
      </div>
  );
}