import React from 'react';
import Header from '../components/Header/Header';
import './CadastroCuidador.css'
import Input from '../components/Input/Input'

function CadastroCuidador() {
    return (
        <>
            <Header />

            <div className='container'>
                <div className='imagemContainer'>
                    <img src="favicon.ico" alt="" />
                </div>

                <div className='navegacaoCadastro'>
                    <nav >
                        <button className='btnNoBg' >Informações Pessoais</button>
                        <button className='btnNoBg' >Endereço</button>
                        <button className='btnNoBg' >Especialidades</button>
                    </nav>
                </div>


                <form>
                    <div className='formCadastro'>

                        {/* informações pessoais */}
                        <div className='formColuna1'>
                            <div>
                                <p>Nome Completo</p>
                                <Input placeholder="John Richard Doe" />
                            </div>
                            <div>
                                <p>Documento(CPF/CNPJ)</p>
                                <Input placeholder="123.456.789-10" />
                            </div>

                            <div>
                                <p>Gênero</p>
                                <select name="" id="">
                                    <option value="">Prefiro não informar</option>
                                    <option value="">Masculino</option>
                                    <option value="">Feminino</option>
                                </select>
                            </div>

                        </div>

                        <div className='formColuna1'>
                            <div>
                                <p>Email</p>
                                <Input placeholder="John.doe@example.com" />
                            </div>

                            <div>
                                <p>Data de Nascimento</p>
                                <Input placeholder="01/01/1990" />
                            </div>

                        </div>
                        {/* informações pessoais */}


                        {/* Endereço */}

                        <div className='formColuna2'>
                            <div>
                                <p>CEP</p>
                                <Input placeholder="John Richard Doe" />
                            </div>

                            <div>
                                <p>Número</p>
                                <Input placeholder="123.456.789-10" />
                            </div>

                            <div>
                                <p>Estado</p>
                                <select name="" id="">
                                    <option value="">São Paulo</option>
                                    <option value="">Rio de Janeiro</option>
                                    <option value="">Bahia</option>
                                </select>
                            </div>

                            <div>
                                <p>Bairro</p>
                                <Input placeholder="Limoeiro" />
                            </div>

                        </div>

                        <div className='formColuna2'>
                            <div>
                                <p>Logradouro</p>
                                <Input placeholder="Rua de Baixo" />
                            </div>

                            <div>
                                <p>Complemento</p>
                                <Input placeholder="2B" />
                            </div>

                            <div>
                                <p>Cidade</p>
                                <Input placeholder="São Paulo" />
                            </div>

                        </div>

                        {/* Endereço */}



                        {/* Especialidades */}
                        <div className='formColuna3'>
                            <div>
                                <p>Especialidades</p>
                                <select name="" id="">
                                    <option value="">Bingo</option>
                                    <option value="">Troca de Fralda</option>
                                    <option value="">Salão de Beleza</option>
                                    <option value="">Passeio</option>
                                    <option value="">Medicação em casa</option>
                                </select>
                            </div>
                        </div>

                        <div className='formColuna3'>
                            <div>
                                <p>Biografia</p>
                                <textarea id="input-text"></textarea>
                            </div>

                        </div>

                        {/* Especialidades */}
                    </div>

                    <button className='btn'>Salvar</button>

                </form>



            </div>

        </>
    )
}

export default CadastroCuidador