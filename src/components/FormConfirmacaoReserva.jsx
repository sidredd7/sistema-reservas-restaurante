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
      // TODO: Substitua 'URL_DO_SEU_BACKEND/confirmacao/' pela URL real da sua API
      // Para teste, usando jsonplaceholder (retorna um post, não uma reserva específica):
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${reservaIdInput}`);

      if (!response.ok) {
         if(response.status === 404) {
             throw new Error(`Reserva com código ${reservaIdInput} não encontrada.`);
         }
         throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      // Simulando dados de reserva a partir do post de teste
      const simulatedReserva = {
          id: data.id,
          clienteNome: `Cliente Teste ${data.userId}`,
          data: `2025-05-${String(data.id % 30 + 1).padStart(2, '0')}`,
          hora: `${String(data.id % 12 + 8).padStart(2, '0')}:00`,
          servico: `Serviço Exemplo ${data.id % 3 + 1}`,
          status: 'Pendente', // Status simulado
          observacoes: data.title.substring(0, 20) + '...',
      };
      setReservaInfo(simulatedReserva);

    } catch (err) {
      setError(err);
      console.error("Erro ao buscar confirmação:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
