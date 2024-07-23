/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState, useEffect } from "react"

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [gender, setGender] = useState('')
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isMaritalStatusValid, setIsMaritalStatusValid] = useState(false)
  const [isGenderValid, setIsGenderValid] = useState(false)
  const [progressBar, setProgressBar] = useState(0)
  const [btnEnable, setBtnEnable] = useState(false)

  const twoNames = /\w+\s+\w+/
  const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleNameInput = (e) => {
    setName(e.target.value)
    if (twoNames.test(e.target.value)) {
      if (!isNameValid) {
        setIsNameValid(true)
        handleSumProgressBar()
      }
    } else if (isNameValid) {
      setIsNameValid(false)
      handleSubtractProgressBar()
    }
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
    if (isEmail.test(e.target.value)) {
      if (!isEmailValid) {
        setIsEmailValid(true)
        handleSumProgressBar()
      }
    } else if (isEmailValid) {
      setIsEmailValid(false)
      handleSubtractProgressBar()
    }
  }

  const handleSelect = (e) => {
    const newValue = e.target.value
    setMaritalStatus(newValue)
    if (!isMaritalStatusValid) {
      if (newValue !== '') {
        setIsMaritalStatusValid(true)
        handleSumProgressBar()
      } 
    } else if (newValue === '') {
      setIsMaritalStatusValid(false)
      handleSubtractProgressBar()
    }
  }

  const handleRadio = (e) => {
    const newValue = e.target.value
    setGender(newValue)
    if (!isGenderValid) {
      setIsGenderValid(true)
      handleSumProgressBar()
    }
  }

  const handleSumProgressBar = () => {
    setProgressBar((prev) => Math.min(prev + 25, 100))
  }

  const handleSubtractProgressBar = () => {
    setProgressBar((prev) => Math.max(prev - 25, 0))
  }

  const handleBtnLogin = () => {
    alert('Login realizado com sucesso!')
    setName('')
    setEmail('')
    setMaritalStatus('')
    setGender('')
    setProgressBar(0)
    setIsNameValid(false)
    setIsEmailValid(false)
    setIsMaritalStatusValid(false)
    setIsGenderValid(false)
  }

  useEffect(() => {
    if(progressBar === 100){
      setBtnEnable(true)
    } else {
      setBtnEnable(false)
    }
  }, [progressBar])

  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progressBar}%` }} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input value={name} onChange={handleNameInput} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input value={email} onChange={handleEmailInput} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select value={maritalStatus} onChange={handleSelect}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input
                type='radio'
                value={'Masculino'}
                checked={gender === 'Masculino'}
                onChange={handleRadio}
              /> Masculino
            </span>
            <span>
              <input
                type='radio'
                value={'Feminino'}
                checked={gender === 'Feminino'}
                onChange={handleRadio}
              /> Feminino
            </span>
          </div>
        </div>
        <button disabled={!btnEnable} onClick={handleBtnLogin}>Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
