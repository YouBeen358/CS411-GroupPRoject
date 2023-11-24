import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';


function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [city, setCity] = useState()
    const [style, setStyle] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email, password, city, style})
        .then(result => {
            console.log(result);
            navigate('/home',{ state: { user: result.data } });
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
          <p>Already Have an Account?</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login Here
          </Link>
         
      
      </div>
    </div>
  );
}

export default Signup;
