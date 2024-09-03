import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Obtém o token da sessão
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('sessionID');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/test', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.nome);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const logo = "https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png";
  const avatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

  return (
    <div className="nav-container">
      <img className="nav-logo" src={logo} alt="Netflix" />
      <text className="nav-username">{username}</text>
      <img className="nav-avatar" src={avatar} alt="Avatar" />
    </div>
  );
}

export default Nav;
