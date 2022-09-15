import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css';
import api from './services/api';
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});
  const color = document.getElementsByClassName('containerInput');
  async function handleSearch(){
    if(input === ''){
     
      color[0].style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      color[0].style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
      setInput('');
    }catch{
      color[0].style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      alert('Erro ao buscar o cep');
      
      setInput('');
    }



  }
  function colorPattern(){
    
    color[0].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    return;
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador Cep</h1>
      <div className="containerInput">
        <input type="text" id='input' placeholder="Digite seu cep" onClick={colorPattern} value={input} onChange={(event) => setInput(event.target.value)}></input>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"></FiSearch>
        </button>
        
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>

        </main>
      )}
      
    </div>
  );
}

export default App;
