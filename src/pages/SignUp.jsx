import React from 'react'
import Header from '../components/Header'
import './SignUp.css'
import SignUpImage from '../assets/img/signup.svg'

function SignUp() {
  return (
    <>
      <Header />
      <div className="signup">
          <div className="imageContainer">
              <img src={SignUpImage} alt="Ilustração Cadastro" />
          </div>
          <div className="formContainer">
              <h1>Cadastro</h1>
              <form action="#">
                  <label htmlFor="name">Nome:</label>
                  <input type="text" id="name" name="name" placeholder="Your Name"/>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="Your Email"/>
                  <button className='btn'>Cadastro</button>
              </form>
          </div>
      </div>

    </>
  )
}

export default SignUp