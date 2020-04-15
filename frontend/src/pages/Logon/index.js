import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import API
import api from '../../services/api';

// Import Icons
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

// Import assets
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

  const [id, setId] = useState();

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('login', { id });

      // Salvar no storage do navegador
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input 
          placeholder="Sua ID"
          value={id}
          onChange={event => setId(event.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}