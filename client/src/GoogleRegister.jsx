import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

function GoogleRegistration() {
  const [userInfo, setUserInfo] = useState(null);
  const [signedUp, setSignedUp] = useState(false);
  const [city, setCity] = useState("");
  const [style, setStyle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      email: userInfo.email,
      city,
      style,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', dataToSend);
      console.log(response);
      navigate('/home', { state: { user: response.data } });
    } catch (error) {
      console.error('Error while registering:', error);
    }
  };

  async function createUserOnServer(decodedToken) {
    const serverEndpoint = 'http://localhost:3001/saveUserData';

    try {
      const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: decodedToken.email,
          givenName: decodedToken.given_name,
        }),
      });

      if (response.ok) {
        console.log('User data saved on the server successfully.');
        setSignedUp(true);
      } else {
        console.error('Failed to save user data on the server.');
      }
    } catch (error) {
      console.error('Error while communicating with the server:', error);
    }
  }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const decodedToken = jwtDecode(response.credential);
      console.log('Decoded JWT ID token:', decodedToken);
      setUserInfo(decodedToken);
      createUserOnServer(decodedToken);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error('Invalid JWT:', error.message);
      } else {
        console.error('Error decoding JWT:', error);
      }
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '698726625190-41vi7mvqele9t2p7m99m63ra5j3mtj3g.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleDropdownSelect = (eventKey) => {
    setStyle(eventKey);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gray">
      <div className="text-center p-4 rounded bg-white">
        <div id="signInDiv">
          {userInfo ? (
            <div>
              <p>Hello {userInfo.given_name}. Your email is {userInfo.email}.</p>
              <img src={userInfo.picture} alt="Profile" className="rounded-circle" />
            </div>
          ) : null}
        </div>
        {signedUp && (
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <label htmlFor="city" className="form-label text-dark">
                <strong>City</strong>
              </label>
              <input
                type="text"
                placeholder="Enter your City"
                name="city"
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="style" className="form-label text-dark">
                <strong>Style</strong>
              </label>
              <DropdownButton
                title={style || 'Select Style'}
                onSelect={handleDropdownSelect}
                className="w-100 mb-3"
              >
                <Dropdown.Item eventKey="streetwear">Streetwear</Dropdown.Item>
                <Dropdown.Item eventKey="preppy">Preppy</Dropdown.Item>
                <Dropdown.Item eventKey="business">Business</Dropdown.Item>
                <Dropdown.Item eventKey="business_casual">Business Casual</Dropdown.Item>
                <Dropdown.Item eventKey="scandinavian">Scandinavian</Dropdown.Item>
                <Dropdown.Item eventKey="hipster">Hipster</Dropdown.Item>
                <Dropdown.Item eventKey="sporty">Sporty</Dropdown.Item>
                <Dropdown.Item eventKey="trendy">Trendy</Dropdown.Item>
              </DropdownButton>
            </div>
            <button type="submit" className="btn btn-success rounded-0" style={{ backgroundColor: 'pink', border: 'none' }}>
              Finish Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoogleRegistration;