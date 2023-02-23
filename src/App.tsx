import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { api } from './services/api'
import './styles.css'

type cepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState<cepProps>()

  async function handleSearch() {
    if (input === '') {
      alert("Digite um cep válido")
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch (error) {
      alert("Digite um cep válido")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="buttonSearch"
          onClick={handleSearch}
        >
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>
      {cep ? 
          <main className='main'>
            <h2>Cep: {cep.cep}</h2>
    
            <span>{cep.logradouro}</span>

            {cep.complemento ?
              <span>complemento: {cep.complemento}</span>
            :
              ""
            }

            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>      
        :
          ''
      }
    </div>
  )
}