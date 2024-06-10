import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Card from '../components/Card/Card'
import Search from '../components/Search/Search'
import api from '../services/api'
import { toast } from 'react-toastify'

function Cuidadores() {

  const [cuidadores, setCuidadores] = useState([]);

  const handleSearch = async (startDate, endDate, especialidades) => {
    if(!localStorage.getItem('accessToken')){
      return toast.error('Você precisa estar logado para realizar essa ação');
    }
    const especialidadesArray = await getEspecialidades(especialidades.especialidades);
    try {
      const response = await api.get('/colaboradores-disponiveis', {
        headers: {
          'accessToken': localStorage.getItem('accessToken')
        },
        params: {
          especialidades: especialidadesArray,
          dataHoraInicio: startDate,
          dataHoraFim: endDate
        }
      });
      setCuidadores(response.data);
    } catch (error) {
      toast.error('Erro ao buscar cuidadores');
      console.error('Failed to fetch:', error);
    }
  }

  const getEspecialidades = async (especialidades) => {
    let especialidadesArray = [];
    try {
      const response = await api.get('/especialidades');
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < especialidades.length; j++) {
          if(response.data[i].id === especialidades[j]) {
            especialidadesArray.push(response.data[i].nome);
          }
        }
      }
    } catch (error) {
      toast.error('Erro ao buscar especialidades');
      console.error('Failed to fetch:', error);
    }
    return especialidadesArray;
  }

  return (
    <>
        <Header />
        <Search handler={handleSearch} />
        <div style={{ display: 'flex', margin: '0 auto', width: '95%', flexDirection: 'row', gap: '1em', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
          {/*
            TODO
            Pass the userId of the user in card on the URL when the actionButton is clicked 
           */}
          {cuidadores.map((cuidador, index) => (
            <Card 
              key={index}
              id={cuidador.id}
              nome={cuidador.nome}
              biografia={cuidador.biografia}
              fotoPerfil={cuidador.fotoPerfil}
              endereco={cuidador.endereco}
              especialidades={cuidador.especialidades}
              btn
            />
          ))}
        </div>
    </>
  )
}

export default Cuidadores