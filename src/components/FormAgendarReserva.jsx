import React, { useState, useEffect } from 'react';

const FormAgendarReserva = ({ onReservaSucesso }) => {
  const [formData, setFormData] = useState({
    idCliente: '',
    dataReserva: '',
    horaReserva: '',
    servico: '',
    observacoesAgendamento: '',
  });
  const [clientes, setClientes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3001/clientes');
        if (!response.ok) {
          throw new Error(`Erro ao buscar clientes: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados de clientes recebidos:', data);
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setSubmitMessage(`Falha ao carregar clientes: ${error.message}`);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.idCliente.trim()) {
      errors.idCliente = 'O ID do cliente é obrigatório.';
    }
    if (!formData.dataReserva.trim()) {
      errors.dataReserva = 'A data da reserva é obrigatória.';
    }
    if (!formData.horaReserva.trim()) {
      errors.horaReserva = 'A hora da reserva é obrigatória.';
    }
    if (!formData.servico.trim()) {
      errors.servico = 'O serviço é obrigatório.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const backendUrl = 'http://localhost:3001/reservas';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao agendar reserva: ${response.status} - ${errorData?.error || response.statusText}`);
      }

      const result = await response.json();
      console.log('Reserva agendada com sucesso:', result);
      setSubmitMessage('Reserva agendada com sucesso!');
      setFormData({ idCliente: '', dataReserva: '', horaReserva: '', servico: '', observacoesAgendamento: '' });
      if (onReservaSucesso) {
        onReservaSucesso(result);
      }

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
          <label htmlFor="idCliente">Cliente:</label>
          <select
            id="idCliente"
            name="idCliente"
            value={formData.idCliente}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nomecompleto}</option>
            ))}
          </select>
          {validationErrors.idCliente && <p className="erro-validacao">{validationErrors.idCliente}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="dataReserva">Data:</label>
          <input
            type="date"
            id="dataReserva"
            name="dataReserva"
            value={formData.dataReserva}
            onChange={handleChange}
            required
          />
          {validationErrors.dataReserva && <p className="erro-validacao">{validationErrors.dataReserva}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="horaReserva">Hora:</label>
          <input
            type="time"
            id="horaReserva"
            name="horaReserva"
            value={formData.horaReserva}
            onChange={handleChange}
            required
          />
          {validationErrors.horaReserva && <p className="erro-validacao">{validationErrors.horaReserva}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="servico">Serviço:</label>
          <input
            type="text"
            id="servico"
            name="servico"
            value={formData.servico}
            onChange={handleChange}
            required
          />
          {validationErrors.servico && <p className="erro-validacao">{validationErrors.servico}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="observacoesAgendamento">Observações:</label>
          <textarea
            id="observacoesAgendamento"
            name="observacoesAgendamento"
            value={formData.observacoesAgendamento}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agendando...' : 'Agendar Reserva'}
        </button>
        {submitMessage && <p className={submitMessage.startsWith('Falha') ? 'mensagem-erro' : 'mensagem-sucesso'}>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default FormAgendarReserva;