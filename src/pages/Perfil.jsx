import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import './Perfil.css';
import Input from '../components/Input/Input';
import { UserContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

function Perfil() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ formData, setFormData ] = useState({
        nome: "",
        email: "",
        documento: "",
        dataNascimento: "",
        tipoUsuario: 3,
        genero: 1,
        endereco: {
            cep: "",
            logradouro: "",
            bairro: "",
            numero: "",
            complemento: "",
            cidade: "",
            uf: "SP"
        },
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
        }else{
        //Usuário já existente
            api.get(`/usuarios/${localStorage.getItem('userId')}`).then((response) => {
                const { data } = response;
                setFormData((prevState) => ({
                    ...prevState,
                    nome: data?.nome || '',
                    email: data?.email || '',
                    documento: data?.documento || '',
                    dataNascimento: data?.dataNascimento || '',
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
                    especialidades: data?.especialidades || []
                }));
            });
        }
    }, [location]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        //Atualizar usuário
        if(localStorage.getItem('userId')) {
            try {
                const response = await api.put(`/usuarios/${localStorage.getItem('userId')}`, formData);
                if (response.status === 200) {
                    toast.success('Usuário atualizado com sucesso');
                    navigate('/Cuidadores');
                }
            } catch (error) {
                toast.error('Falha ao atualizar usuário');
                console.error('Failed to update user:', error);
            }
            return;
        }
        
        //Cadastrar Usuário
        // let tempTipoUsuario = formData.especialidades.length === 0 ? 3 : 2;
        // let tempTipoUsuario = 2;
        // setFormData((prevState) => ({
        //     ...prevState,
        //     tipoUsuario: tempTipoUsuario
        // }));
        // let url = formData.tipoUsuario === 3 ? '/usuarios/cliente' : '/usuarios/colaborador';
        let url = '/usuarios/cliente';
        
        try {
            const response = await api.post(url, formData);
            if (response.status === 201) {
                navigate('/Cuidadores');
                localStorage.setItem('accessToken', tokenResponse.access_token);
                localStorage.setItem('userId', response.data.id);
                toast.success('Usuário cadastrado com sucesso');
            }
        } catch (error) {
            toast.error('Falha ao cadastrar usuário');
            console.error('Failed to sign up:', error);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await api.delete(`/usuarios/${localStorage.getItem('userId')}`);
            if (response.status === 404 || response.status === 204) {
                toast.success('Usuário excluído com sucesso');
                setUser(null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userId");
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    }

    //TODO formatDataNascimento

    const handleDocumentChange = (event) => {
        const { value } = event.target;
        let maskedValue = value;
        maskedValue = value.replace(/[^\d]/g, '');
        if (maskedValue.length <= 11) {
            maskedValue = maskedValue.replace(/^(\d{3})(\d)/, '$1.$2');
            maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        } else {
            maskedValue = maskedValue.replace(/^(\d{2})(\d)/, '$1.$2');
            maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
            maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
        }
        setFormData((prevState) => ({
            ...prevState,
            documento: maskedValue,
        }));
    }
    
    const handleCepChange = async (event) => {
        const { value } = event.target;
        let maskedValue = value;
        maskedValue = maskedValue.replace(/\D/g, "");
        maskedValue = maskedValue.replace(/(\d{5})(\d)/, "$1-$2");
        if (maskedValue.length === 9) {
            try {
                const response = await axios.get(
                `https://viacep.com.br/ws/${maskedValue}/json/`
                );
                const address = response.data;
                setFormData((prevState) => ({
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        cep: maskedValue,
                        logradouro: address.logradouro,
                        bairro: address.bairro,
                        cidade: address.localidade,
                        uf: address.uf
                    }
                }));
            } catch (error) {
                toast.error('Falha ao buscar endereço');
                console.log("Failed to fetch address:", error.message);
            }
        }else{
            setFormData((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: maskedValue
                }
            }));
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('endereco.')) {
            const endereco = name.split('.')[1];
            setFormData(prevFormData => ({
                ...prevFormData,
                endereco: {
                    ...prevFormData.endereco,
                    [endereco]: value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };
    
    const handleEstadoChange = (event) => {
        const selectedUF = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                uf: selectedUF
            }
        }));
    };
    
    const handleGeneroChange = (event) => {
        const generoValue = parseInt(event.target.value);
        setFormData(prevFormData => ({
            ...prevFormData,
            genero: generoValue
        }));
    };
    
    const handleSectionChange = (section) => {
        const sections = ['informacoesPessoais', 'endereco', 'especialidades'];
        const index = sections.indexOf(section);
    
        function removeFocus() {
            document.getElementById('informacoesPessoaisBtn').style.boxShadow = 'none';
            document.getElementById('informacoesPessoaisBtn').style.color = 'var(--black)';
            document.getElementById('enderecoBtn').style.boxShadow = 'none';
            document.getElementById('enderecoBtn').style.color = 'var(--black)';
            if(formData.tipoUsuario === 2){
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
            if(formData.tipoUsuario === 2) {
                document.getElementById('especialidades').style.display = 'none';
            }
        } else if (index === 1) {
            removeFocus();
            document.getElementById('informacoesPessoais').style.display = 'none';
            document.getElementById('endereco').style.display = 'flex';
            document.getElementById('enderecoBtn').style.boxShadow = 'inset 0px -2px 0px 0px var(--primary)';
            document.getElementById('enderecoBtn').style.color = 'var(--primary)';
            if(formData.tipoUsuario === 2){
                document.getElementById('especialidades').style.display = 'none';
            }
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

            <div className='container'>
                <div className="imageContainer">
                    <img src={user.picture} alt="Botão para acessar funções de usuário" />
                </div>

                <div className='navegacaoCadastro'>
                    <nav>
                        <button className='navigationBtn' id='informacoesPessoaisBtn' onClick={() => handleSectionChange('informacoesPessoais')} >Informações Pessoais</button>
                        <button className='navigationBtn' id='enderecoBtn' onClick={() => handleSectionChange('endereco')}>Endereço</button>
                        {formData.tipoUsuario === 2 && 
                            <button className='navigationBtn' id='especialidadesBtn' onClick={() => handleSectionChange('especialidades')}>Especialidades</button>
                        }
                    </nav>
                </div>


                <form onSubmit={handleFormSubmit}>
                    <div className='formCadastro'>
                        {/* informações pessoais */}
                        <div className='inputWrapper' id="informacoesPessoais">
                            <div className='formColuna'>
                                <Input name="nome" value={formData.nome} onChange={handleInputChange} label="Nome Completo" placeholder="John Richard Doe" />
                                <Input name="documento" value={formData.documento} onChange={handleDocumentChange} label="Documento(CPF/CNPJ)" placeholder="153.436.719-10" />
                                <div>
                                    <p>Gênero</p>
                                    <select value={formData.genero} onChange={handleGeneroChange}>
                                        <option value="3">Prefiro não informar</option>
                                        <option value="2">Feminino</option>
                                        <option value="1">Masculino</option>
                                    </select>
                                </div>
                            </div>

                            <div className='formColuna'>
                                <Input name="email" value={formData.email} onChange={handleInputChange} label="Email" placeholder="John.doe@example.com" />
                                <Input name="dataNascimento" value={formData.dataNascimento} onChange={handleInputChange} label="Data de Nascimento" placeholder="1990-12-31" />
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className='inputWrapper' id="endereco">
                            <div className='formColuna'>
                                <Input name="endereco.cep" value={formData.endereco.cep} onChange={handleCepChange} label="CEP" placeholder="463.23-010" />
                                <Input name="endereco.numero" value={formData.endereco.numero} onChange={handleInputChange} label="Número" placeholder="534" />

                                <div>
                                    <p>Estado</p>
                                    <select value={formData.endereco.uf} onChange={handleEstadoChange}>
                                        <option disabled value="">Selecione</option>
                                        <option value="AC">Acre (AC)</option>
                                        <option value="AL">Alagoas (AL)</option>
                                        <option value="AP">Amapá (AP)</option>
                                        <option value="AM">Amazonas (AM)</option>
                                        <option value="BA">Bahia (BA)</option>
                                        <option value="CE">Ceará (CE)</option>
                                        <option value="DF">Distrito Federal (DF)</option>
                                        <option value="ES">Espírito Santo (ES)</option>
                                        <option value="GO">Goiás (GO)</option>
                                        <option value="MA">Maranhão (MA)</option>
                                        <option value="MT">Mato Grosso (MT)</option>
                                        <option value="MS">Mato Grosso do Sul (MS)</option>
                                        <option value="MG">Minas Gerais (MG)</option>
                                        <option value="PA">Pará (PA)</option>
                                        <option value="PB">Paraíba (PB)</option>
                                        <option value="PR">Paraná (PR)</option>
                                        <option value="PE">Pernambuco (PE)</option>
                                        <option value="PI">Piauí (PI)</option>
                                        <option value="RJ">Rio de Janeiro (RJ)</option>
                                        <option value="RN">Rio Grande do Norte (RN)</option>
                                        <option value="RS">Rio Grande do Sul (RS)</option>
                                        <option value="RO">Rondônia (RO)</option>
                                        <option value="RR">Roraima (RR)</option>
                                        <option value="SC">Santa Catarina (SC)</option>
                                        <option value="SP">São Paulo (SP)</option>
                                        <option value="SE">Sergipe (SE)</option>
                                        <option value="TO">Tocantins (TO)</option>
                                    </select>
                                </div>

                                <Input name="endereco.bairro" value={formData.endereco.bairro} onChange={handleInputChange} label="Bairro" placeholder="Limoeiro" />

                            </div>

                            <div className='formColuna'>
                                <Input name="endereco.logradouro" value={formData.endereco.logradouro} onChange={handleInputChange} label="Logradouro" placeholder="Rua de Baixo" />
                                <Input name="endereco.complemento" value={formData.endereco.complemento} onChange={handleInputChange} label="Complemento" placeholder="2B" />
                                <Input name="endereco.cidade" value={formData.endereco.cidade} onChange={handleInputChange} label="Cidade" placeholder="São Paulo" />
                            </div>
                        </div>

                        {/* Especialidades */}
                        {formData.tipoUsuario === 2 && 
                            <div className='inputWrapper' id="especialidades">
                                <div className='formColuna'>
                                    <div>
                                        <p>Especialidades</p>
                                        <select>
                                            <option value="">Bingo</option>
                                            <option value="">Troca de Fralda</option>
                                            <option value="">Salão de Beleza</option>
                                            <option value="">Passeio</option>
                                            <option value="">Medicação em casa</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='formColuna'>
                                    <div>
                                        <p>Biografia</p>
                                        <textarea id="input-text"></textarea>
                                    </div>

                                </div>
                            </div>
                        }
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