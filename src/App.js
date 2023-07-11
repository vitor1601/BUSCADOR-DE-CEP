import logo from './logo.svg';
import './App.css';
import {FiSearch} from 'react-icons/fi'
import './styles.css';   
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState ('')
  const [cep, setCep] = useState ({});

  async function handleSearch(){
    //  01310930/json/

    if(input==''){
      alert("preencha algum CEP!")
    return;
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }
    catch{
      alert("ops, erro ao buscar")
      setInput("")
    }
  }
  
  return (
    <div className="container">
      <h1 className ="title">BUSCADOR DE CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="digite seu cep..."
        value ={input}
        onChange={(e) => setInput(e.target.value) } 
        />
        
        <button className="buttonsearch" onClick={handleSearch}>
          <FiSearch size={25} color='white'/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade}</span>
        </main>
      )}
    </div>
    )
}



export default App;
