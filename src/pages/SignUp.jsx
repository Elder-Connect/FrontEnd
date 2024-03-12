import React from 'react'
import Header from '../components/Header'
import './SignUp.css'
import SignUpImage from '../assets/img/signup.svg'

function SignUp() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="signup">
            <div className="imageContainer">
                <img src={SignUpImage} alt="Ilustração Cadastro" />
            </div>
            <div className="formContainer">
                <h1>Cadastro</h1>
                <form action="#">
                    <input type="text" id="name" name="name" placeholder="Nome"/>
                    <input type="email" id="email" name="email" placeholder="Email"/>
                    <button className='btn'>Cadastro</button>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp