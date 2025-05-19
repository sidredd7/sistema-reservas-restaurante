import React from 'react';

function MenuPrincipal({ onSelectOption }) {
  return (
    <section className="menu-principal-container"> {/* Classe específica para o menu container, se necessário para estilização */}
      <div className="container">
        <h1>Gerenciador de Reservas</h1>
        <h2>Selecione uma opção:</h2>
      </div>

      <div
        className="menu-button cadastrar" // Classes para estilização
        role="button"
        tabIndex="0"
        onClick={() => onSelectOption('cadastro')}
      >
        <h1>Cadastrar Cliente</h1>
      </div>

      <div
        className="menu-button agendar"
        role="button"
        tabIndex="0"
        onClick={() => onSelectOption('agendar')}
      >
        <h1>Agendar Reserva</h1>
      </div>

      <div
        className="menu-button visualizar"
        role="button"
        tabIndex="0"
        onClick={() => onSelectOption('visualizar')}
      >
        <h1>Visualizar Reservas</h1>
      </div>

      {/* Removendo a opção "Confirmação de Reserva" */}
      {/*
      <div
        className="menu-button confirmar"
        role="button"
        tabIndex="0"
        onClick={() => onSelectOption('confirmar')}
      >
        <h1>Confirmação de Reserva</h1>
      </div>
      */}
    </section>
  );
}

export default MenuPrincipal;
