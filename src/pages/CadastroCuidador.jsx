import React from 'react';
import Header from '../components/Header/Header';
import './CadastroCuidador.css'
import Input from '../components/Input/Input'

function CadastroCuidador() {
    return (
        <>
            <Header />

            <div className='container'>
                <h1>Cadastro</h1>
                <p>Cadastre um cuidador</p>

                <form>
                    <div className='formCadastro'>
                        <div className='formColuna'>
                            <div>
                                <p>Nome</p>
                                <Input placeholder="Nome" className="inputClass" />
                            </div>

                            <div>
                                <p>Documento</p>
                                <Input placeholder="CFP/CNPJ" className="inputClass" />
                            </div>

                            <div>
                                <p>Especialidade</p>
                                <Input placeholder="Especialidade" className="inputClass" />
                            </div>

                            <div>
                                <p>Email</p>
                                <Input placeholder="Email" className="inputClass" />
                            </div>

                            <div>
                                <p>Cidade</p>
                                <Input placeholder="Cidade" className="inputClass" />
                            </div>

                        </div>

                        <div className='formColuna'>
                            <div>
                                <p>CEP</p>
                                <Input placeholder="CEP" className="inputClass" />
                            </div>

                            <div>
                                <p>Logradouro</p>
                                <Input placeholder="Logradouro" className="inputClass" />
                            </div>

                            <div className='formLinha'>
                                <div>
                                    <p>Número</p>
                                    <Input placeholder="Número" className="inputMenor" />
                                </div>

                                <div>
                                    <p>Complemento</p>
                                    <Input placeholder="Complemento" className="inputMenor" />
                                </div>
                            </div>

                            <div>
                                <p>Bairro</p>
                                <Input placeholder="Bairro" className="inputClass" />
                            </div>

                            <div>
                                <p>UF</p>
                                <Input placeholder="UF" className="inputClass" />
                            </div>

                        </div>
                    </div>

                    <button className='btn'>Cadastro</button>
                </form>
            </div>
        </>
    )
}

export default CadastroCuidador