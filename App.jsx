import React, { useState } from 'react';
import './App.css'; // Importa os estilos globais
import MenuPrincipal from './components/MenuPrincipal.jsx';
import FormCadastroCliente from './components/FormCadastroCliente.jsx';
import FormAgendarReserva from './components/FormAgendarReserva.jsx';
import VisualizarReservas from './components/VisualizarReservas.jsx';
import FormConfirmacaoReserva from './components/FormConfirmacaoReserva.jsx';

function App() {
  // Estado para controlar qual tela está ativa: 'menu', 'cadastro', 'agendar', 'visualizar', 'confirmar'
  const [activeView, setActiveView] = useState('menu');

  // Função para mudar a tela
  const handleSelectOption = (view) => {
    setActiveView(view);
  };

  // Função para voltar ao menu principal
  const handleBackToMenu = () => {
    setActiveView('menu');
  };

  // Renderização condicional baseada no estado activeView
  const renderView = () => {
    switch (activeView) {
      case 'menu':
        return <MenuPrincipal onSelectOption={handleSelectOption} />;
      case 'cadastro':
        return <FormCadastroCliente onBack={handleBackToMenu} />;
      case 'agendar':
        return <FormAgendarReserva onBack={handleBackToMenu} />;
      case 'visualizar':
        return <VisualizarReservas onBack={handleBackToMenu} />;
      case 'confirmar':
        return <FormConfirmacaoReserva onBack={handleBackToMenu} />;
      default:
        return <MenuPrincipal onSelectOption={handleSelectOption} />; // Volta pro menu por padrão
    }
  };

  return (
    <div className="app-container"> {/* Container principal para centralizar/estilizar */}
      {renderView()} {/* Renderiza a tela ativa */}
      {/* A atribuição (attribution) do seu HTML original pode ser adicionada aqui se desejar:
        <footer style={{ textAlign: 'center', fontSize: '11px', marginTop: '40px' }}>
          .attribution a color: hsl(228, 45%, 44%);
        </footer>
      */}
    </div>
  );
}

export default App;