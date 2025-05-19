import React, { useState, useEffect } from 'react';
import './formStyles.css';

const VisualizarReservas = ({ onBack }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/reservas');
      if (!response.ok) {
        throw new Error(`Erro ao buscar reservas: ${response.status}`);
      }
      const data = await response.json();
      setReservas(data);
    } catch (err) {
      console.error('Erro ao buscar reservas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleConfirmar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/reservas/${id}/confirmar`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao confirmar reserva: ${response.status} - ${errorData?.error || response.statusText}`);
      }
      fetchReservas();
    } catch (error) {
      console.error('Erro ao confirmar reserva:', error);
      alert(`Falha ao confirmar reserva: ${error.message}`);
    }
  };

  const handleCancelar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/reservas/${id}/cancelar`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao cancelar reserva: ${response.status} - ${errorData?.error || response.statusText}`);
      }
      fetchReservas();
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      alert(`Falha ao cancelar reserva: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Carregando reservas...</p>;
  }

  if (error) {
    return <p>Erro ao carregar reservas: {error}</p>;
  }

  return (
    <div className="form-container">
      <h2>Reservas Agendadas</h2>
      <button className="back-button" onClick={onBack}>Voltar ao Menu</button>
      {reservas.length === 0 ? (
        <p>Nenhuma reserva agendada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Cliente</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Serviço</th>
              <th>Observações</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.idcliente}</td>
                <td>{new Date(reserva.datareserva).toLocaleDateString()}</td>
                <td>{reserva.horareserva}</td>
                <td>{reserva.servico}</td>
                <td>{reserva.observacoesagendamento || '-'}</td>
                <td>{reserva.status}</td>
                <td>
                  {reserva.status === 'Pendente' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/* Usamos um div com flexbox */}
                      <button onClick={() => handleConfirmar(reserva.id)}>Confirmar</button>
                      <button onClick={() => handleCancelar(reserva.id)}>Cancelar</button>
                    </div>
                  )}
                  {reserva.status === 'Confirmada' && <span>Confirmada</span>}
                  {reserva.status === 'Cancelada' && <span>Cancelada</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisualizarReservas;
