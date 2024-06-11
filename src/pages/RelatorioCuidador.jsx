import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import IconExportar from '../assets/img/icon-download.svg'
import './RelatorioCuidador.css'
import api from '../services/api';
import { toast } from 'react-toastify';
import Loading from '../components/Loading/Loading';

function RelatorioCuidador() {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get('/usuarios/colaboradores').then((response) => {
            setLoading(false);
            const { data } = response;
            setCardsData(data);
        }).catch(() => {
            setLoading(false);
            console.log('Erro ao buscar os dados do BackEnd: ')
            toast.error("Erro ao recuperar os valores da API, tente novamente");
        });
    }, []);


    const handleExport = () => {
        setLoading(true);
        api.get('/usuarios/colaboradores/csv', {
            responseType: 'blob',
        })
            .then((response) => {
                setLoading(false);
                const url = URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Relatório de Cuidadores - Elderly.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                toast.error("Erro ao exportar os dados, tente novamente");
            });
    };


    return (
        <>
            <Header />
            <Loading show={loading} />
            <div className='export'>
                <button className='exportButton' onClick={handleExport}>
                    Exportar
                    <img src={IconExportar} alt="icone de exportar arquivo" />
                </button>
            </div>

            <div style={{ display: 'flex', margin: '0 auto', width: '95%', flexDirection: 'row', gap: '1em', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                {cardsData && cardsData.map((data, index) => (
                    <Card key={index}
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