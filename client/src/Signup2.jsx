// Signup2.js
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import axios from 'axios';

function Signup2() {
    const [city, setCity] = useState("");
    const [style, setStyle] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Access data from the state or context to combine with the new fields
        const { name, email, password } = location.state || {};
        
        // Save the combined data to MongoDB
        axios.post('http://localhost:3001/register', { name, email, password, city, style })
            .then(result => {
                console.log(result);
                // Redirect to the home page or another relevant page
                navigate('/home', { state: { user: result.data } });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <form onSubmit={handleSubmit}>
             <div className="mb-3">
            <label htmlFor="city">
              <strong>City</strong>
            </label>
            <input
              type="city"
              placeholder="Enter your City"
              name="city"
              className="form-control rounded-0"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="style">
              <strong>Style</strong>
            </label>
            <Dropdown onSelect={(eventKey) => setStyle(eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 rounded-0" style={{ backgroundColor: 'transparent', border: '1px solid #ced4da', color: '#495057' }}>
                {style || "Select a style"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="streetwear">Streetwear</Dropdown.Item>
                <Dropdown.Item eventKey="preppy">Preppy</Dropdown.Item>
                <Dropdown.Item eventKey="business">Business</Dropdown.Item>
                <Dropdown.Item eventKey="buisness_casual">Business Casual</Dropdown.Item>
                <Dropdown.Item eventKey="scandinavian">Scandinavian</Dropdown.Item>
                <Dropdown.Item eventKey="hipster">Hipster</Dropdown.Item>
                <Dropdown.Item eventKey="sporty">Sporty</Dropdown.Item>
                <Dropdown.Item eventKey="trendy">Trendy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'pink', border:'none'}}>
            Register
          </button>
          </form>

        </div>
    );
}

export default Signup2;
