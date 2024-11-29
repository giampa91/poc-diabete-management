import React, { useEffect, useState } from 'react';
import './App.css';

import { Link } from "react-router";

function App() {
  const [newGlycemicData, setNewGlycemicData] = useState({
    id: 0,
    dateTime: '',
    insulinType: '',
    glycemia: '',
    carbohydrate: '',
    dose: '',
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [glycemicDataList, setGlycemicDataList] = useState([]);
  const [currentToken, setCurrentToken] = useState('');

  // First useEffect: Handle login and retrieve token
  useEffect(() => {
    const handleLogin = async () => {
      const tokenUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: keycloakConfig.clientId,
            client_secret: keycloakConfig.clientSecret,
          }).toString(),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Token received:', data);
          setCurrentToken(data.access_token); // Update token state
        } else {
          const error = await response.json();
          console.error('Login failed:', error);
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    handleLogin(); // Trigger token retrieval
  }, []); // Runs once on component mount

  // Second useEffect: Fetch user data after token is retrieved
  useEffect(() => {
    if (!currentToken) return; // Wait for the token to be set

    const fetchCurrentUserData = async () => {
      try {
        const response = await fetch('http://localhost:8089/user/users/1', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setCurrentUser(json); // Update user state
          console.log('User data fetched:', json);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchCurrentUserData(); // Trigger user data fetch
  }, [currentToken]); // Runs whenever currentToken changes




  const handleInputChange = (field, value) => {
    setNewGlycemicData((prev) => ({ ...prev, [field]: value }));
  };

  // Replace these with your Keycloak server details
  const keycloakConfig = {
    realm: 'diabete-management-realm',
    clientId: 'diabete-management-client',
    clientSecret: 'qNoSncQ0Ket2q7iCzjJJ3XJmgJN5Dtoy',
    url: 'http://localhost:8080', // Replace with your Keycloak server's URL
  };

  const fetchGlycemicData = async (token) => {
    try {
      const response = await fetch('http://localhost:8089/glycemia/Glycemia', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setGlycemicDataList(json);
      } else {
        console.error('Failed to fetch glycemic data');
      }
    } catch (error) {
      console.error('Failed to fetch glycemic data:', error);
    }
  };

  const addGlycemicData = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch('http://localhost:8089/glycemia/Glycemia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          insulinType: newGlycemicData.insulinType,
          glycemia: newGlycemicData.glycemia,
          carbohydrate: newGlycemicData.carbohydrate,
          dose: newGlycemicData.dose,
          userId: currentUser.id,
        }),
      });

      if (response.ok) {
        console.log('Glycemic Data added');
        fetchGlycemicData(currentToken);
      } else {
        console.error('Failed to add glycemic data');
      }
    } catch (error) {
      console.error('Failed to add glycemic data:', error);
    }
  };

  const deleteGlycemicData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8089/glycemia/Glycemia/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        console.log('Glycemic Data deleted');
        fetchGlycemicData(currentToken);
      } else {
        console.error('Failed to delete glycemic data');
      }
    } catch (error) {
      console.error('Failed to delete glycemic data:', error);
    }
  };

  const renderGlycemicData = () => {
    return glycemicDataList.map((data) => (
      <div key={data.id} className="card">
        <p>Date Time: {data.dateTime}</p>
        <p>Insulin Type: {data.insulinType}</p>
        <p>Glycemia: {data.glycemia}</p>
        <p>Carbohydrate: {data.carbohydrate}</p>
        <p>Dose: {data.dose}</p>
        <button onClick={() => deleteGlycemicData(data.id)}>Delete</button>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
      <Link to="/home">Homepage</Link>
        <h1>Welcome, {currentUser?.name || 'User'}</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Insulin Type"
            value={newGlycemicData.insulinType}
            onChange={(e) => handleInputChange('insulinType', e.target.value)}
          />
          <input
            type="text"
            placeholder="Glycemia"
            value={newGlycemicData.glycemia}
            onChange={(e) => handleInputChange('glycemia', e.target.value)}
          />
          <input
            type="text"
            placeholder="Carbohydrate"
            value={newGlycemicData.carbohydrate}
            onChange={(e) => handleInputChange('carbohydrate', e.target.value)}
          />
          <input
            type="text"
            placeholder="Dose"
            value={newGlycemicData.dose}
            onChange={(e) => handleInputChange('dose', e.target.value)}
          />
          <button onClick={addGlycemicData}>Add Glycemic Data</button>
        </div>
        <div className="data-list">{renderGlycemicData()}</div>
      </header>
    </div>
  );
}

export default App;
