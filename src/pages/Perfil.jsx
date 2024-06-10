import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import './Perfil.css';
import Input from '../components/Input/Input';
import { UserContext } from '../App';
import { USERTYPE, GENDER, ufOptions, genderOptions } from '../services/enums';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { handleCepChange, handleDocumentChange, handleInputChange, handleDataNascimento, validadeForm, convertDateToFrontendFormat, convertDateToBackendFormat } from '../services/utils';
import Select from '../components/Select/Select';
import SelectEspecialidades from '../components/Select/SelectEspecialidades';
import { logOff, setLocalStorage } from '../services/auth';
import Loading from '../components/Loading/Loading';

function Perfil() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [ formData, setFormData ] = useState({
        nome: "",
        email: "",
        documento: "",
        dataNascimento: "",
        tipoUsuario: USERTYPE.CLIENTE,
        genero: GENDER.MASCULINO,
        fotoPerfil: user?.picture || '',
        endereco: {
            cep: "",
            logradouro: "",
            bairro: "",
            numero: "",
            complemento: "",
            cidade: "",
            uf: "SP"
        },
        biografia: "",
        especialidades: []
    });

    //Carregar informações iniciais
    const { state } = location;
    const { tokenResponse, userInfo } = state ? state : { tokenResponse: null, userInfo: null };
    useEffect(() => {
        handleSectionChange('informacoesPessoais');
        //Primeiro cadastro
        if (state && userInfo) {
            setFormData((prevState) => ({
                ...prevState,
                nome: userInfo.name,
                email: userInfo.email,
            }));
            setLoading(false);
        }else{
        //Usuário já existente
            api.get(`/usuarios/${localStorage.getItem('userId')}`).then((response) => {
                const { data } = response;
                setFormData((prevState) => ({
                    ...prevState,
                    nome: data?.nome || '',
                    email: data?.email || '',
                    documento: data?.documento || '',
                    dataNascimento: convertDateToFrontendFormat(data?.dataNascimento) || '',
                    tipoUsuario: data?.tipoUsuario || '',
                    genero: data?.genero || '',
                    endereco: {
                        cep: data?.endereco?.cep || '',
                        logradouro: data?.endereco?.logradouro || '',
                        bairro: data?.endereco?.bairro || '',
                        numero: data?.endereco?.numero || '',
                        complemento: data?.endereco?.complemento || '',
                        cidade: data?.endereco?.cidade || '',
                        uf: data?.endereco?.uf || ''
                    },
                    biografia: data?.biografia || '',
                    especialidades: data?.especialidades || []
                }));
                setLoading(false);
            }).catch((error) => {
                console.error('Failed to fetch user:', error);
                setLoading(false);
            });
        }
    }, [location]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        //Validar Formulário
        if(!validadeForm()){
            setLoading(false);
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }
        
        //Atualizar usuário
        if(localStorage.getItem('userId')) {
            try {
                const formatedData = {
                    ...formData,
                    dataNascimento: convertDateToBackendFormat(formData.dataNascimento)
                };
                const response = await api.put(`/usuarios/${localStorage.getItem('userId')}`, formatedData);
                setLoading(false);
                if (response.status === 200) {
                    toast.success('Usuário atualizado com sucesso');
                    navigate('/Cuidadores');
                }
            } catch (error) {
                setLoading(false);
                toast.error('Falha ao atualizar usuário');
                console.error('Failed to update user:', error);
            }
            return;
        }
        
        //Cadastrar Usuário
        let tempTipoUsuario = formData.especialidades.length === 0 ? USERTYPE.CLIENTE : USERTYPE.CUIDADOR;
        setFormData((prevState) => ({
            ...prevState,
            tipoUsuario: tempTipoUsuario
        }));
        let url = formData.tipoUsuario === USERTYPE.CLIENTE ? '/usuarios/cliente' : '/usuarios/colaborador';
        
        try {
            const formatedData = {
                ...formData,
                dataNascimento: convertDateToBackendFormat(formData.dataNascimento)
            };
            const response = await api.post(url, formatedData);
            setLoading(false);
            if (response.status === 201) {
                navigate('/Cuidadores');
                setLocalStorage(tokenResponse, response.data);
                toast.success('Usuário cadastrado com sucesso');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Falha ao cadastrar usuário');
            console.error('Failed to sign up:', error);
        }
    };

    const deleteUser = async () => {
        setLoading(true);
        try {
            const response = await api.delete(`/usuarios/${localStorage.getItem('userId')}`);
            setLoading(false);
            if (response.status === 404 || response.status === 204) {
                toast.success('Usuário excluído com sucesso');
                setUser(null);
                logOff();
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    }
    
    const handleSectionChange = (section) => {
        const sections = ['informacoesPessoais', 'endereco', 'especialidades'];
        const index = sections.indexOf(section);
    
        function removeFocus() {
            document.getElementById('informacoesPessoaisBtn').style.boxShadow = 'none';
            document.getElementById('informacoesPessoaisBtn').style.color = 'var(--black)';
            document.getElementById('enderecoBtn').style.boxShadow = 'none';
            document.getElementById('enderecoBtn').style.color = 'var(--black)';
            if(formData.tipoUsuario === USERTYPE.CUIDADOR){
                document.getElementById('especialidadesBtn').style.boxShadow = 'none';
                document.getElementById('especialidadesBtn').style.color = 'var(--black)';
            }
        }
    
        if (index === 0) {
            removeFocus();
            document.getElementById('informacoesPessoais').style.display = 'flex';
            document.getElementById('informacoesPessoaisBtn').style.boxShadow = 'inset 0px -2px 0px 0px var(--primary)';
            document.getElementById('informacoesPessoaisBtn').style.color = 'var(--primary)';
            document.getElementById('endereco').style.display = 'none';
            document.getElementById('especialidades').style.display = 'none';
        } else if (index === 1) {
            removeFocus();
            document.getElementById('informacoesPessoais').style.display = 'none';
            document.getElementById('endereco').style.display = 'flex';
            document.getElementById('enderecoBtn').style.boxShadow = 'inset 0px -2px 0px 0px var(--primary)';
            document.getElementById('enderecoBtn').style.color = 'var(--primary)';
            document.getElementById('especialidades').style.display = 'none';
        } else {
            removeFocus();
            document.getElementById('informacoesPessoais').style.display = 'none';
            document.getElementById('endereco').style.display = 'none';
            document.getElementById('especialidades').style.display = 'flex';
            document.getElementById('especialidadesBtn').style.boxShadow = 'inset 0px -2px 0px 0px var(--primary)';
            document.getElementById('especialidadesBtn').style.color = 'var(--primary)';
        }
    };

    return (
        <>
            <Header />
            <Loading show={loading} />
            <div className='container'>
                <div className="imageContainer">
                    <img src={user.picture} alt="Botão para acessar funções de usuário" />
                </div>

                <div className='navegacaoCadastro'>
                    <nav>
                        <button className='navigationBtn' id='informacoesPessoaisBtn' onClick={() => handleSectionChange('informacoesPessoais')} >Informações Pessoais</button>
                        <button className='navigationBtn' id='enderecoBtn' onClick={() => handleSectionChange('endereco')}>Endereço</button>
                        {formData.tipoUsuario === USERTYPE.CUIDADOR && 
                            <button className='navigationBtn' id='especialidadesBtn' onClick={() => handleSectionChange('especialidades')}>Especialidades</button>
                        }
                    </nav>
                </div>


                <form onSubmit={handleFormSubmit}>
                    <div className='formCadastro'>
                        {/* informações pessoais */}
                        <div className='inputWrapper' id="informacoesPessoais">
                            <div className='formColuna'>
                                <Input name="nome" value={formData.nome} onChange={(e) => handleInputChange(e, setFormData)} label="Nome Completo" placeholder="John Richard Doe" mandatory />
                                <Input name="documento" value={formData.documento} onChange={(e) => handleDocumentChange(e, setFormData)} label="Documento(CPF/CNPJ)" placeholder="153.436.719-10" mandatory />
                                <Select name="genero" label="Gênero" value={formData.genero} options={genderOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                            </div>

                            <div className='formColuna'>
                                <Input name="email" value={formData.email} onChange={(e) => handleInputChange(e, setFormData)} label="Email" placeholder="John.doe@example.com" disabled mandatory />
                                <Input name="dataNascimento" value={formData.dataNascimento} onChange={(e) => handleDataNascimento(e, setFormData)} label="Data de Nascimento" placeholder="31/12/1990" mandatory />
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className='inputWrapper' id="endereco">
                            <div className='formColuna'>
                                <Input name="endereco.cep" value={formData.endereco.cep} onChange={(e) => handleCepChange(e, setFormData)} label="CEP" placeholder="463.23-010" mandatory />
                                <Input name="endereco.logradouro" value={formData.endereco.logradouro} onChange={(e) => handleInputChange(e, setFormData)} label="Logradouro" placeholder="Rua de Baixo" mandatory />
                                <Input name="endereco.bairro" value={formData.endereco.bairro} onChange={(e) => handleInputChange(e, setFormData)} label="Bairro" placeholder="Limoeiro" mandatory />
                                <Select name="endereco.uf" label="Estado" value={formData.endereco.uf} options={ufOptions} onChange={(e) => handleInputChange(e, setFormData)} mandatory />
                            </div>

                            <div className='formColuna'>
                                <Input name="endereco.numero" value={formData.endereco.numero} onChange={(e) => handleInputChange(e, setFormData)} label="Número" placeholder="534" mandatory />
                                <Input name="endereco.complemento" value={formData.endereco.complemento} onChange={(e) => handleInputChange(e, setFormData)} label="Complemento" placeholder="2B" />
                                <Input name="endereco.cidade" value={formData.endereco.cidade} onChange={(e) => handleInputChange(e, setFormData)} label="Cidade" placeholder="São Paulo" mandatory />
                            </div>
                        </div>

                        {/* Especialidades */}
                        <div className='inputWrapper' id="especialidades">
                            <div className='formColuna'>
                                {loading ? (
                                    <p>Loading...</p> //TODO Loading component
                                ) : (
                                    <SelectEspecialidades value={formData.especialidades} setFormData={setFormData} />
                                )}
                            </div>

                            <div className='formColuna'>
                                <div>
                                    <p>Biografia</p>
                                    <textarea id="input-text" name="biografia" value={formData.biografia} onChange={(e) => handleInputChange(e, setFormData)}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '1em'}}>
                        <button className='btn' type='submit'>Salvar</button>
                        { localStorage.getItem('userId') &&
                            <button onClick={() => deleteUser()} className='btnDelete'>Excluir Usuário</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default Perfil