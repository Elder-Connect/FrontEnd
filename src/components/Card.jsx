import React from 'react'
import { useNavigate } from "react-router-dom"
import { ReactComponent as Grade } from '@material-symbols/svg-600/rounded/grade-fill.svg';
import './Card.css'
import Specialty from './Specialty'

function Card() {
  const navigate = useNavigate();
  return (
    <>
        <div className="card">
          <div className="cardHeader">
            <div className="info">
              <div className="infoImg">
                <img src="https://via.placeholder.com/50" alt="Imagem do Cuidador"/>
              </div>
              <div className="infoText">
                <div className="data">  
                  <p className='neighborhood'>Vila Matilde</p>
                  <h3 className='name'>Maria Antonieta</h3>
                </div>
                <div className="specialties">
                  <Specialty text="Troca Faldas"/>
                  <Specialty text="Skate de Idoso"/>
                  <Specialty text="Bingo"/>
                </div>
              </div>
            </div>
            <div className="rating">
            <Grade className='icon' style={{marginBottom: '4px', marginRight: '0.25em', fontSize: '1.5em'}} />
              <p>4.5</p>
            </div>
          </div>
          <div className="description">
            <p>Sou uma pessoa dedicada e experiente, comprometida em proporcionar cuidados compassivos e de qualidade para seus entes queridos. Com habilidades abrangentes em assistência diária, incluindo higiene pessoal, alimentação e administração de medicamentos, garanto um ambiente seguro e acolhedor, promovendo o bem-estar físico e emocional dos idosos sob meus cuidados.</p>
          </div>
          <div className="cardFooter">
            <div className="price">
              <p>R$ 150 /hora</p>
            </div>
            <button className="btn" onClick={() => navigate("/Entrar")}>Conversar</button>
          </div>
        </div>
    </>
  )
}

export default Card