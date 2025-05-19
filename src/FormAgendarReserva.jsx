import React, { useState } from 'react';

function FormAgendarReserva({ onBack }) {
  const [formData, setFormData] = useState({
    idCliente: '',
    dataReserva: '',
    horaReserva: '',
    servico: '',
    observacoesAgendamento: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { dataReserva, horaReserva } = formData;
    const selectedDate = new Date(dataReserva);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    if (selectedDate < today) {
      setSubmitMessage('A data da reserva deve ser futura.');
      return false;
    }

    if (selectedDate.getTime() === today.getTime()) {
      const selectedTime = horaReserva.split(':');
      const selectedHour = parseInt(selectedTime[0], 10);
      const selectedMinute = parseInt(selectedTime[1], 10);
      const now = new Date();

      if (selectedHour < now.getHours() || (selectedHour === now.getHours() && selectedMinute <= now.getMinutes())) {
        setSubmitMessage('A hora da reserva deve ser futura.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    console.log('Dados para enviar (Agendar Reserva):', formData);

    const backendUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL de teste

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro na requisição: ${response.status} - ${errorData || response.statusText}`);
      }
      const result = await response.json();
      console.log('Resposta do Backend (Agendar Reserva):', result);
      setSubmitMessage('Reserva agendada com sucesso!');
      setFormData({ idCliente: '', dataReserva: '', horaReserva: '', servico: '', observacoesAgendamento: '' });
      // Opcional: setTimeout(() => onBack(), 2000);
    } catch (error) {
      console.error('Erro ao agendar reserva:', error);
      setSubmitMessage(`Falha ao agendar reserva: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Agendar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="idCliente">ID do Cliente:</label>
          <input type="text" id="idCliente" name="idCliente" value={formData.idCliente} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="dataReserva">Data da Reserva:</label>
          <input type="date" id="dataReserva" name="dataReserva" value={formData.dataReserva} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="horaReserva">Hora da Reserva:</label>
          <input type="time" id="horaReserva" name="horaReserva" value={formData.horaReserva} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="servico">Serviço Desejado:</label>
          <select id="servico" name="servico" value={formData.servico} onChange={handleChange} required>
            <option value="">Selecione...</option>
            <option value="servico1">Serviço Tipo 1</option>
            <option value="servico2">Serviço Tipo 2</option>
            {/* TODO: Carregar opções de serviço do backend dinamicamente */}
          </select>
        </div>
        <div className="campo-grupo">
          <label htmlFor="observacoesAgendamento">Observações:</label>
          <textarea id="observacoesAgendamento" name="observacoesAgendamento" value={formData.observacoesAgendamento} onChange={handleChange}></textarea>
        </div>
        <div>
          <button type="submit" className="botao-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Agendando...' : 'Agendar'}
          </button>
        </div>
      </form>
      {submitMessage && <p style={{ marginTop: '15px', textAlign: 'center', color: submitMessage.includes('sucesso') ? 'green' : 'red' }}>{submitMessage}</p>}
      <button onClick={onBack} className="botao-voltar">Voltar ao Menu</button>
    </div>
  );
}

export default FormAgendarReserva;
