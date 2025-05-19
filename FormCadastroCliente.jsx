import React, { useState } from 'react';

function FormCadastroCliente({ onBack }) {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    observacoes: ''
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
    const { telefone, email } = formData;
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (telefone && !telefoneRegex.test(telefone)) {
      setSubmitMessage('Formato de telefone inválido. Use (XX) XXXXX-XXXX');
      return false;
    }

    if (email && !emailRegex.test(email)) {
      setSubmitMessage('Formato de email inválido.');
      return false;
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

    console.log('Dados para enviar (Cadastro Cliente):', formData);

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
      console.log('Resposta do Backend (Cadastro Cliente):', result);
      setSubmitMessage('Cliente cadastrado com sucesso!');
      setFormData({ nomeCompleto: '', telefone: '', email: '', observacoes: '' });

    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setSubmitMessage(`Falha ao cadastrar cliente: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="nomeCompleto">Nome Completo:</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="telefone">Telefone (com DDD):</label>
          <input type="tel" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="campo-grupo">
          <label htmlFor="observacoes">Observações/Preferências:</label>
          <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>
        </div>
        <div>
          <button type="submit" className="botao-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Cadastro'}
          </button>
        </div>
      </form>
      {submitMessage && <p style={{ marginTop: '15px', textAlign: 'center', color: submitMessage.includes('sucesso') ? 'green' : 'red' }}>{submitMessage}</p>}
      <button onClick={onBack} className="botao-voltar">Voltar ao Menu</button>
    </div>
  );
}

export default FormCadastroCliente;