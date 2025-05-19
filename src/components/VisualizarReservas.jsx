import React, { useEffect, useState } from 'react';

function VisualizarReservas({ onBack }) {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Substitua 'URL_DO_SEU_BACKEND/reservas' pela URL real da sua API
        // Para teste, usando jsonplaceholder (retorna posts, não reservas):
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        // Simulando dados de reserva a partir dos posts de teste
        const simulatedReservas = data.map(post => ({
            id: post.id,
            clienteNome: `Cliente ${post.userId}`,
            data: `2025-05-${String(post.id % 30 + 1).padStart(2, '0')}`, // Data simulada
            hora: `${String(post.id % 12 + 8).padStart(2, '0')}:00`, // Hora simulada
            servico: `Serviço Exemplo ${post.id % 3 + 1}`,
            observacoes: post.title.substring(0, 20) + '...', // Observação simulada
        }));
        setReservas(simulatedReservas);
      } catch (err) {
        setError(err);
        console.error("Erro ao buscar reservas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []); // Array vazio [] garante que rode apenas uma vez ao montar

  return (
    <div className="visualizacao-container">
      <h2>Visualizar Reservas</h2>
      {loading && <p>Carregando reservas...</p>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar reservas: {error.message}</p>}
      {!loading && !error && (
        <div className="visualizacao-conteudo">
          {reservas.length > 0 ? (
            <ul>
              {reservas.map(reserva => (
                <li key={reserva.id}>
                  <p><strong>Reserva ID:</strong> {reserva.id}</p>
                  <p><strong>Cliente:</strong> {reserva.clienteNome}</p>
                  <p><strong>Data/Hora:</strong> {reserva.data} às {reserva.hora}</p>
                  <p><strong>Serviço:</strong> {reserva.servico}</p>
                  {reserva.observacoes && <p><strong>Obs:</strong> {reserva.observacoes}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma reserva encontrada.</p>
          )}
        </div>
      )}
      <button onClick={onBack} className="botao-voltar">Voltar ao Menu</button>
    </div>
  );
}

export default VisualizarReservas;
