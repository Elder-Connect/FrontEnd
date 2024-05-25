import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import IconExportar from '../assets/img/icon-download.svg'
import './RelatorioCuidador.css'
import api from '../services/api';
import { toast } from 'react-toastify';

function RelatorioCuidador() {

    const [cardsData, setCardsData] = useState();

    useEffect(() => {
        api.get('/usuarios').then((response) => {
            const { data } = response;
            setCardsData(data);
        }).catch(() => {
            console.log('Erro ao buscar os dados do BackEnd: ')
            toast.error("Erro ao recuperar os valores da API, tente novamente");
        });
    }, []);


    return (
        <>
            <Header />
            <div className='export'>
                <button className='exportButton'>
                    Exportar
                    <img src={IconExportar} alt="icone de exportar arquivo" />
                </button>
            </div>

            <div style={{ display: 'flex', margin: '0 auto', width: '95%', flexDirection: 'row', gap: '1em', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                {cardsData && cardsData.map((data) => (
                    <Card
                        id={data.id}
                        nome={data.nome}
                        email={data.email}
                        documento={data.documento}
                        dataNascimento={data.dataNascimento}
                        biografia={data.biografia}
                        fotoPerfil={data.fotoPerfil}
                        tipoUsuario={data.tipoUsuario}
                        genero={data.genero}
                        endereco={data.endereco}
                        especialidades={data.especialidades}
                        btn='false'
                        price='false'
                    />
                ))}
            </div>
        </>
    )
}

export default RelatorioCuidador