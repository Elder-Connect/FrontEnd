import React from 'react';
import Header from '../components/Header/Header';
import './CadastroCuidador.css'
import Input from '../components/Input/Input'

function CadastroCuidador() {
    return (
        <>
            <Header />

            <div className='container'>
                <h1>Cadastro de Cuidador</h1>

                <form>
                    <div className='formCadastro'>
                        <div className='formColuna'>
                            <Input label="Nome" placeholder="Nome" className="inputClass" />
                            <Input label="Documento" placeholder="CFP/CNPJ" className="inputClass" />
                            <Input label="Especialidade" placeholder="Especialidade" className="inputClass" />
                            <Input label="Email" placeholder="Email" className="inputClass" />
                            <Input label="Cidade" placeholder="Cidade" className="inputClass" />
                        </div>

                        <div className='formColuna'>
                            <Input label="CEP" placeholder="CEP" className="inputClass" />
                            <Input label="Logradouro" placeholder="Logradouro" className="inputClass" />

                            <div className='formLinha'>
                                <Input label="Número" placeholder="Número" className="inputMenor" />
                                <Input label="Complemento" placeholder="Complemento" className="inputMenor" />
                            </div>
                            
                            <Input label="Bairro" placeholder="Bairro" className="inputClass" />
                            <Input label="UF" placeholder="UF" className="inputClass" />
                        </div>
                    </div>

                    <button className='btn'>Cadastro</button>
                </form>
            </div>
        </>
    )
}

export default CadastroCuidador