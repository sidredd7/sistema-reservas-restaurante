import React, { useState, useEffect } from 'react';

const FormAgendarReserva = ({ onReservaAgendada, onBack }) => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    idCliente: '',
    dataReserva: '',
    horaReserva: '',
    servico: '',
    observacoesAgendamento: '',
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3001/clientes');
      if (!response.ok) {
        throw new Error(`Erro ao buscar clientes: ${response.status}`);
      }
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setErro('Erro ao buscar clientes.');
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('http://localhost:3001/reservas', {
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

      const novaReserva = await response.json();
      setMensagem('Reserva agendada com sucesso!');
      setFormData({
        idCliente: '',
        dataReserva: '',
        horaReserva: '',
        servico: '',
        observacoesAgendamento: '',
      });
      onReservaAgendada(novaReserva);
    } catch (error) {
      console.error('Erro ao agendar reserva:', error);
      setErro(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Agendar Nova Reserva</h2>
      <form onSubmit={handleSubmit}>
        {erro && <p className="error-message">{erro}</p>}
        {mensagem && <p className="success-message">{mensagem}</p>}

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
            <option key={cliente.id} value={cliente.id}>
              {cliente.nomecompleto}
            </option>
          ))}
        </select>

        <label htmlFor="dataReserva">Data:</label>
        <input
          type="date"
          id="dataReserva"
          name="dataReserva"
          value={formData.dataReserva}
          onChange={handleChange}
          required
        />

        <label htmlFor="horaReserva">Hora:</label>
        <input
          type="time"
          id="horaReserva"
          name="horaReserva"
          value={formData.horaReserva}
          onChange={handleChange}
          required
        />

        <label htmlFor="servico">Serviço Desejado:</label>
        <input
          type="text"
          id="servico"
          name="servico"
          value={formData.servico}
          onChange={handleChange}
          required
        />

        <label htmlFor="observacoesAgendamento">Observações:</label>
        <textarea
          id="observacoesAgendamento"
          name="observacoesAgendamento"
          value={formData.observacoesAgendamento}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="botao-submit">Reservar</button>
          <button type="button" className="botao-voltar" onClick={onBack}>Voltar ao Menu</button>
        </div>
      </form>
    </div>
  );
};

export default FormAgendarReserva;
