import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import axios from 'axios';

function GoogleLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Wait for the Google Sign-In API script to be loaded
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
  
      // Initialize Google Sign-In
      google.accounts.id.initialize({
        client_id: '698726625190-41vi7mvqele9t2p7m99m63ra5j3mtj3g.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });
  
      // Render the Google Sign-In button
      google.accounts.id.renderButton(
        document.getElementById('loginDiv'),
        { theme: 'outline', size: 'large' }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  };
  
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const decodedToken = jwtDecode(response.credential);
      console.log('Decoded JWT ID token:', decodedToken);
      setUserInfo(decodedToken);

      // Use the email from Google OAuth to fetch user info from your server
      fetchUserInfo(decodedToken.email);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error('Invalid JWT:', error.message);
      } else {
        console.error('Error decoding JWT:', error);
      }
    }
  };

  const fetchUserInfo = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${email}`);
      
      if (response.data) {
        const userData = response.data;
        navigate('/home', { state: { user: userData } });
      } else {
        console.error('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gray">
      <div className="text-center p-4 rounded bg-white">
        <div id="loginDiv"></div>
        {userInfo && (
          <div>
            <p>Hello {userInfo.given_name}. Your email is {userInfo.email}.</p>
            <img src={userInfo.picture} alt="Profile" className="rounded-circle" />
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleLogin;
