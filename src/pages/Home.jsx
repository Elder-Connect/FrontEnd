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


function Home() {
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

              <button type="submit" className='btn'>Conheça nossos profissionais</button>
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
          <p className='textoEspera'>Aqui você encontra <span className='textoCor'>cuidadores de idosos selecionados e capacitados</span> para te atender em qualquer situação, <span className='textoCor'>sem te restringir a quem você já conhece</span>.
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
            Nosso propósito é <span className='textoCor'>permitir</span> que as <span className='textoCor'>pessoas</span> importantes para você <span className='textoCor'>recebam</span> a <span className='textoCor'>atenção e cuidado</span> que elas merecem.
          </p>

          <div className='textoImage'>
            <p className='textoQuem'>Buscamos estabelecer <span className='textoCor'>conexão</span> eficiente <span className='textoCor'>entre familiares e profissionais</span>, garantindo <span className='textoCor'>cuidados personalizados</span> </p>
            <div className='imageContainer3'>
              <img src={HomeImage3} alt="Ilustração Home" />
            </div>
            <p className='textoQuem'>De <span className='textoCor'>alta qualidade</span> para cada idoso, além de proporcionar <span className='textoCor'>tranquilidade e confiança</span> aos seus entes queridos.</p>
          </div>

          <div className='botaoFacaParte'>
          <button type="submit" className='btn'>Faça Parte</button>
          </div>
        
        </div>

        <div className='bloco'>
          <div className='question'>
            <h2>Nossos Valores</h2>
          </div>
        </div>

        <div className='conteudoValores1'>
          <div className='confiancaTransparencia'>
            <h2 className='textoCor' style={{marginBottom: "0px"}}>Confiança e Transparência</h2>
            
            <img src={HomeImage4} alt="Ilustração Home" />
            
          </div>
          <p className='textoValores'>Prezamos pela comunicação aberta entre os familiares e os cuidadores, buscando uma relação firme para auxiliar nesse momento tão importante.</p>
        </div>

        <div className='conteudoValores2'>
          <div className='respeitoDignidade'>
            <h2 className='textoCor'style={{marginBottom: "0px"}}>Respeito e Dignidade</h2>
            
            <img src={HomeImage5} alt="Ilustração Home" />
            
          </div>
          <p className='textoValores'>Sabemos que cada um tem sua individualidade, e nós valorizamos isso para te ajudar a encontrar a pessoa certa para o seu cenário.</p>
        </div>

        <div className='conteudoValores3'>
          <div className='qualidadeEficiencia'>
            <h2 className='textoCor'>Qualidade e Eficiência</h2>
            
            <img src={HomeImage6} alt="Ilustração Home" />
            
          </div>
          <p className='textoValores'>Visamos garantir que cada atendimento seja realizado com excelência, e com isso promover o bem-estar e segurança para o idoso. Oferecemos uma plataforma segura, fácil e descomplicada para satisfazer todas as partes envolvidas.</p>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home