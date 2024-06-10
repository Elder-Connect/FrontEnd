import React from 'react';
import Header from '../components/Header/Header';
import './CadastroCuidador.css'
import Input from '../components/Input/Input'
import { GENDER, USERTYPE, genderOptions, ufOptions } from '../services/enums';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleCepChange, handleDocumentChange, handleInputChange, handleDataNascimento, validadeForm } from '../services/utils';
import Select from '../components/Select/Select';
import SelectEspecialidades from '../components/Select/SelectEspecialidades';
import Loading from '../components/Loading/Loading';

function CadastroCuidador() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        nome: "",
        email: "",
        documento: "",
        tipoUsuario: USERTYPE.CUIDADOR,
        dataNascimento: "",
        genero: "",
        endereco: {
            cep: "",
            logradouro: "",
            bairro: "",
            numero: "",
            complemento: "",
            cidade: "",
            uf: ""
        },
        especialidades: []
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        //Validar Formulário
        if(!validadeForm()){
            setLoading(false);
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }
        
        //Cadastrar Usuário
        try {
            const response = await api.post(`/usuarios/colaborador`, formData);
            setLoading(false);
            if (response.status === 201) {
                navigate('/Cuidadores');
                toast.success('Usuário cadastrado com sucesso');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Falha ao cadastrar usuário');
            console.error('Failed to sign up:', error);
        }
    };    

    return (
        <>
            <Header />
            <Loading show={loading} />
            <div className='container'>
                <h1>Cadastro de Cuidador</h1>

                <form onSubmit={handleFormSubmit}>
                    <div className='formCadastro'>
                        <div className='formColuna'>
                            <div>
                                <h2>Dados Pessoais</h2>
                                <hr />
                            </div>
                            <Input name="nome" label="Nome" placeholder="John Richard Doe" mandatory onChange={(e) => handleInputChange(e, setFormData)} value={formData.nome} />
                            <Input name="documento" label="Documento" placeholder="153.436.719-10" mandatory onChange={(e) => handleDocumentChange(e, setFormData)} value={formData.documento} />
                            <Input name="email" label="Email" placeholder="John.doe@example.com" mandatory onChange={(e) => handleInputChange(e, setFormData)} value={formData.email} />
                            <Input name="dataNascimento" label="Data de Nascimento" placeholder="1990-12-31" onChange={(e) => handleDataNascimento(e, setFormData)} value={formData.dataNascimento} />
                            <Select name="genero" label="Gênero" value={formData.genero} options={genderOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                            <SelectEspecialidades value={formData.especialidades} setFormData={setFormData} />
                        </div>

                        <div className='formColuna'>
                            <div>
                                <h2>Endereço</h2>
                                <hr />
                            </div>
                            <Input name="endereco.cep" label="CEP" placeholder="463.23-010" onChange={(e) => handleCepChange(e, setFormData)} value={formData.endereco.cep} />
                            <Input name="endereco.logradouro" label="Logradouro" placeholder="Rua de Baixo" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.logradouro}/>

                            <div className='formLinha'>
                                <Input name="endereco.numero" label="Número" placeholder="534" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.numero} />
                                <Input name="endereco.complemento" label="Complemento" placeholder="2B" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.complemento} />
                            </div>
                            
                            <Input name="endereco.bairro" label="Bairro" placeholder="Limoeiro" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.bairro} />
                            <Input name="endereco.cidade" label="Cidade" placeholder="São Paulo" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.cidade} />
                            <Select name="endereco.uf" label="Estado" value={formData.endereco.uf} options={ufOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                        </div>
                    </div>

                    <button className='btn' type='submit'>Cadastro</button>
                </form>
            </div>
        </>
    )
}

export default CadastroCuidador