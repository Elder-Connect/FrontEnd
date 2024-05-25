import React from 'react'
import { useNavigate } from "react-router-dom"
import { ReactComponent as Grade } from '@material-symbols/svg-600/rounded/grade-fill.svg';
import './Card.css'
import Specialty from '../Specialty/Specialty'

function Card({
  id,
  nome,
  email,
  documento,
  dataNascimento,
  biografia,
  fotoPerfil,
  tipoUsuario,
  genero,
  endereco,
  especialidades,
  btn, 
  price
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="card">
        <div className="cardHeader">
          <div className="info">
            <div className="infoImg">
              <img src={fotoPerfil || "https://via.placeholder.com/50"} alt="Imagem do Cuidador" />
            </div>
            <div className="infoText">
              <div className="data">
                <p className='neighborhood'>{endereco.bairro || "Vila Matilde"}</p>
                <h3 className='name'>{nome || "Maria Antonieta"}</h3>
              </div>
              <div className="specialties">
                {especialidades && especialidades.map((especialidade, index) => (
                  <Specialty key={index} text={especialidade} />
                ))}
              </div>
            </div>
          </div>
          <div className="rating">
            <Grade className='icon' style={{ marginBottom: '4px', marginRight: '0.25em', fontSize: '1.5em' }} />
            <p>4.5</p>
          </div>
        </div>
        <div className="description">
          <p>{biografia || "Sou uma pessoa dedicada e experiente, comprometida em proporcionar cuidados compassivos e de qualidade para seus entes queridos. Com habilidades abrangentes em assistência diária, incluindo higiene pessoal, alimentação e administração de medicamentos, garanto um ambiente seguro e acolhedor, promovendo o bem-estar físico e emocional dos idosos sob meus cuidados."}</p>
        </div>
        <div className="cardFooter">
          {price !== 'false' && (
            <div className="price">
              <p style={{ fontSize: '16px' }}>R$ 150 /hora</p>
            </div>
          )}
          {btn !== 'false' && (
            <button className="btn" onClick={() => navigate("/Entrar")} >Conversar</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
