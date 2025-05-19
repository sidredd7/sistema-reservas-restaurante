import React, { useState } from 'react';

const FormCadastroCliente = ({ onClienteCadastrado, onBack }) => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    observacoesPreferencias: '',
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao cadastrar cliente: ${response.status} - ${errorData?.error || response.statusText}`);
      }

      const novoCliente = await response.json();
      setMensagem('Cliente cadastrado com sucesso!');
      setFormData({
        nomeCompleto: '',
        telefone: '',
        email: '',
        observacoesPreferencias: '',
      });
      onClienteCadastrado(novoCliente);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setErro(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        {erro && <p className="error-message">{erro}</p>}
        {mensagem && <p className="success-message">{mensagem}</p>}

        <label htmlFor="nomeCompleto">Nome Completo:</label>
        <input
          type="text"
          id="nomeCompleto"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
          required
        />

        <label htmlFor="telefone">Telefone (com DDD):</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="observacoesPreferencias">Observações/Preferências:</label>
        <textarea
          id="observacoesPreferencias"
          name="observacoesPreferencias"
          value={formData.observacoesPreferencias}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit" className="botao-submit">Salvar Cadastro</button>
          <button type="button" className="botao-voltar" onClick={onBack}>Voltar ao Menu</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastroCliente;
