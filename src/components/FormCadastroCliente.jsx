import React, { useState } from 'react';

const FormCadastroCliente = ({ onCadastroSucesso }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    observacoes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' }); // Limpa o erro ao digitar
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.nomeCompleto.trim()) {
      errors.nomeCompleto = 'O nome completo é obrigatório.';
    }
    if (!formData.telefone.trim()) {
      errors.telefone = 'O telefone é obrigatório.';
    }
    if (!formData.email.trim()) {
      errors.email = 'O email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Formato de email inválido.';
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

    const backendUrl = 'http://localhost:3001/clientes'; // URL do seu backend

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
        throw new Error(`Erro no cadastro: ${response.status} - ${errorData?.error || response.statusText}`);
      }

      const result = await response.json();
      console.log('Cliente cadastrado com sucesso:', result);
      setSubmitMessage('Cliente cadastrado com sucesso!');
      setFormData({ nomeCompleto: '', telefone: '', email: '', observacoes: '' });
      if (onCadastroSucesso) {
        onCadastroSucesso(result); // Chama a função de sucesso, passando os dados do cliente cadastrado
      }

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
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />
          {validationErrors.nomeCompleto && <p className="erro-validacao">{validationErrors.nomeCompleto}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          {validationErrors.telefone && <p className="erro-validacao">{validationErrors.telefone}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && <p className="erro-validacao">{validationErrors.email}</p>}
        </div>
        <div className="campo-grupo">
          <label htmlFor="observacoes">Observações:</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Salvar Cadastro'}
        </button>
        {submitMessage && <p className={submitMessage.startsWith('Falha') ? 'mensagem-erro' : 'mensagem-sucesso'}>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default FormCadastroCliente;