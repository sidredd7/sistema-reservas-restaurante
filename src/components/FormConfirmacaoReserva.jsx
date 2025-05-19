import React, { useState } from 'react';

function FormConfirmacaoReserva({ onBack, onConfirm }) {
  const [reservaIdInput, setReservaIdInput] = useState('');
  const [reservaInfo, setReservaInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setReservaIdInput(e.target.value);
    setReservaInfo(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reservaIdInput.trim()) {
      setError(new Error("Por favor, insira o código da reserva."));
      return;
    }

    setLoading(true);
    setError(null);
    setReservaInfo(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${reservaIdInput}`);

      if (!response.ok) {
         if(response.status === 404) {
             throw new Error(`Reserva com código ${reservaIdInput} não encontrada.`);
         }
         throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      const simulatedReserva = {
          id: data.id,
          clienteNome: `Cliente Teste ${data.userId}`,
          data: `2025-05-${String(data.id % 30 + 1).padStart(2, '0')}`,
          hora: `${String(data.id % 12 + 8).padStart(2, '0')}:00`,
          servico: `Serviço Exemplo ${data.id % 3 + 1}`,
          status: 'Pendente',
          observacoes: data.title.substring(0, 50) + '...',
      };

      setReservaInfo(simulatedReserva);


    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmClick = () => {
    if (reservaInfo) {
      alert("Reserva Confirmada!");
      onConfirm();
    }
  };

  return (
    <div className="form-container">
      <h2>Confirmação de Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="reservaId">Código da Reserva:</label>
          <input
            type="text"
            id="reservaId"
            value={reservaIdInput}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Reserva'}
        </button>
      </form>

      {error && <p className="error-message">{error.message}</p>}

      {reservaInfo && (
        <div className="reserva-info">
          <h3>Detalhes da Reserva</h3>
          <p>Cliente: {reservaInfo.clienteNome}</p>
          <p>Data: {reservaInfo.data}</p>
          <p>Hora: {reservaInfo.hora}</p>
          <p>Serviço: {reservaInfo.servico}</p>
          <p>Status: {reservaInfo.status}</p>
          <p>Observações: {reservaInfo.observacoes}</p>
          <div className="botoes-acao">
            <button onClick={handleConfirmClick}>Confirmar Reserva</button>
          </div>
        </div>
      )}

      <button onClick={onBack} className="botao-voltar">Voltar ao Menu</button>
    </div>
  );
}

export default FormConfirmacaoReserva;