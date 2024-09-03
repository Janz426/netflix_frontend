import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logo = "https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png";

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o session ID na sessão
        sessionStorage.setItem('sessionID', data.sessionID);

        // Redireciona para a página principal
        navigate('/home');
      } else {
        console.error('Login falhou:', data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="login-container">
      <img className="login-logo" src={logo} alt="Netflix" />

      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email ou número de telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>

      <div className="login-footer">
        <p>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Manter conectado</label>
        </p>
      </div>
      <p className="help">Precisa de ajuda?</p>
      <div className="signup-now">
        <p>Novo na Netflix? <span>Inscreva-se agora.</span></p>
      </div>
    </div>
  );
}

export default Login;
