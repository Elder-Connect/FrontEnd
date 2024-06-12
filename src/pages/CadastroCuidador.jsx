import React from 'react';
import Header from '../components/Header/Header';
import './CadastroCuidador.css'
import Input from '../components/Input/Input'
import { GENDER, USERTYPE, genderOptions, ufOptions } from '../services/enums';
import api from '../services/api';
import { toast } from 'react-toastify';
import { handleCepChange, handleDocumentChange, handleInputChange, handleDataNascimento, validadeForm, convertDateToBackendFormat } from '../services/utils';
import Select from '../components/Select/Select';
import SelectEspecialidades from '../components/Select/SelectEspecialidades';
import Loading from '../components/Loading/Loading';

function CadastroCuidador() {
    const [loading, setLoading] = React.useState(false);
    const [userStack, setUserStack] = React.useState([]);
    const [formData, setFormData] = React.useState({
        nome: "",
        email: "",
        documento: "",
        tipoUsuario: USERTYPE.CUIDADOR,
        dataNascimento: "",
        genero: GENDER.OUTRO,
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

        // Validate Form
        if (!validadeForm()) {
            setLoading(false);
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        const formatedData = {
            ...formData,
            dataNascimento: convertDateToBackendFormat(formData.dataNascimento)
        };

        // Register User
        try {
            const response = await api.post(`/usuarios/colaborador`, formatedData);
            setLoading(false);
            if (response.status === 201) {
                setUserStack([...userStack, [response.data.id, formData.nome]]);
                toast.success('Usuário cadastrado com sucesso');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Falha ao cadastrar usuário');
            console.error('Failed to sign up:', error);
        }
    };

    const deleteLastCreatedUser = async () => {
        if (userStack.length === 0) {
            toast.error('Não há ações para desfazer!');
            return;
        }
        setLoading(true);
        const lastUser = userStack.pop();
        try {
            const response = await api.delete(`/usuarios/${lastUser[0]}`);
            setLoading(false);
            if (response.status === 404 || response.status === 204) {
                toast.success(`Usuário ${lastUser[1]} removido com sucesso`);
                setUserStack([...userStack]);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Failed to delete user');
            console.error('Failed to delete user:', error);
        }
    }

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
                            <Input name="dataNascimento" value={formData.dataNascimento} onChange={(e) => handleDataNascimento(e, setFormData)} label="Data de Nascimento" placeholder="31/12/1990" mandatory />
                            <Select name="genero" label="Gênero" value={formData.genero} options={genderOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                            <SelectEspecialidades value={formData.especialidades} setFormData={setFormData} />
                        </div>

                        <div className='formColuna'>
                            <div>
                                <h2>Endereço</h2>
                                <hr />
                            </div>
                            <Input name="endereco.cep" label="CEP" placeholder="463.23-010" onChange={(e) => handleCepChange(e, setFormData)} value={formData.endereco.cep} />
                            <Input name="endereco.logradouro" label="Logradouro" placeholder="Rua de Baixo" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.logradouro} />

                            <div className='formLinha'>
                                <Input name="endereco.numero" label="Número" placeholder="534" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.numero} />
                                <Input name="endereco.complemento" label="Complemento" placeholder="2B" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.complemento} />
                            </div>
                            
                            <Input name="endereco.bairro" label="Bairro" placeholder="Limoeiro" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.bairro} />
                            <Input name="endereco.cidade" label="Cidade" placeholder="São Paulo" onChange={(e) => handleInputChange(e, setFormData)} value={formData.endereco.cidade} />
                            <Select name="endereco.uf" label="Estado" value={formData.endereco.uf} options={ufOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '1em'}}>
                        <button className='btn' type='submit'>Cadastro</button>
                        {userStack.length > 0 &&
                            <button onClick={() => deleteLastCreatedUser()} className='btnDelete'>Desfazer Última Criação</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default CadastroCuidador;