import React from 'react'
import Header from '../components/Header/Header'
import './Home.css'
import HomeImage1 from '../assets/img/sign.svg'
import HomeImage2 from '../assets/img/homeImage2.svg'
import HomeImage3 from '../assets/img/homeImage3.svg'
import HomeImage4 from '../assets/img/homeImage4.svg'
import HomeImage5 from '../assets/img/homeImage5.svg'
import HomeImage6 from '../assets/img/homeImage6.svg'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className='containerHome'>
        <div className='conteudo'>
          <div className='introduction'>
            <div className='Title'>
              <h1 className='titulo1'>Cuidado do que importa,</h1>
              <h1 className='titulo2'>Para você.</h1>

              <p className='fraseEfeito'>Nossos profissionais são treinados e qualificados para atender o que mais importa para você com excelência e sabedoria, quando, onde e como quiser!</p>

              <button onClick={() => navigate("/Cuidadores")} className='btn'>Conheça nossos profissionais</button>
            </div>
          </div>
          <div className='imageContainer1'>
            <img src={HomeImage1} alt="Ilustração Home" />
          </div>
        </div>

        <div className='bloco'>
          <div className='question'>
            <h2>O Que Esperar?</h2>
          </div>
        </div>

        <div className='conteudoEspera'>
          <p className='textoEspera'>Aqui você encontra <span className='textoCor'>cuidadores de idosos capacitados</span> e selecionados para te atender em qualquer situação, sem te restringir a quem você já conhece.
          </p>
          <div className='imageContainer2'>
            <img src={HomeImage2} alt="Ilustração Home" />
          </div>
        </div>

        <div className='bloco'>
          <div className='question'>
            <h2>Quem Somos?</h2>
          </div>
        </div>

        <div className='conteudoQuemSomos'>
          <p>
            Nosso propósito é permitir que as pessoas importantes para você recebam a <span className='textoCor'>atenção e cuidado</span> que elas merecem.
          </p>

          <div className='textoImage'>
            <p className='textoQuem'>Buscamos estabelecer <span className='textoCor'>conexão entre familiares e profissionais</span>, garantindo cuidados personalizados</p>
            <div className='imageContainer3'>
              <img src={HomeImage3} alt="Ilustração Home" />
            </div>
            <p className='textoQuem'>De alta qualidade para cada idoso, além de proporcionar <span className='textoCor'>tranquilidade e confiança</span> aos seus entes queridos.</p>
          </div>

          <div className='botaoFacaParte'>
          <button onClick={() => navigate("/Cuidadores")} className='btn'>Faça Parte</button>
          </div>
        
        </div>

        <div className='bloco'>
          <div className='question'>
            <h2>Nossos Valores</h2>
          </div>
        </div>

        <div className='conteudoValores1'>
          <div className='confiancaTransparencia'>
            <h2 className='textoCor' style={{marginBottom: "2em"}}>Confiança e Transparência</h2>
            <p className='textoValores textoLeft'>Prezamos pela comunicação aberta entre os familiares e os cuidadores, buscando uma relação firme para auxiliar nesse momento tão importante.</p>
          </div>
          <img src={HomeImage4} alt="Ilustração Home" />
        </div>

        <div className='conteudoValores2'>
          <div className='respeitoDignidade'>
            <h2 className='textoCor'style={{marginBottom: "2em"}}>Respeito e Dignidade</h2>
            <p className='textoValores'style={{alignSelf: 'end'}}>Sabemos que cada um tem sua individualidade, e nós valorizamos isso para te ajudar a encontrar a pessoa certa para o seu cenário.</p>
          </div>
          <img src={HomeImage5} alt="Ilustração Home" />
        </div>

        <div className='conteudoValores3'>
          <div className='qualidadeEficiencia'>
            <h2 className='textoCor'style={{marginBottom: "2em"}}>Qualidade e Eficiência</h2>
            <p className='textoValores textoLeft'>Visamos garantir que cada atendimento seja realizado com excelência, e com isso promover o bem-estar e segurança para o idoso. Oferecemos uma plataforma segura, fácil e descomplicada para satisfazer todas as partes envolvidas.</p>
          </div>
          <img src={HomeImage6} alt="Ilustração Home" />
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home