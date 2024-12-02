import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import './Settings.css';
import Loading from '../components/Loading/Loading';
import Input from '../components/Input/Input';
import { handleProfitChange } from '../services/utils';
import { toast } from 'react-toastify';
import api from '../services/api';

function Settings() {
    const [loading, setLoading] = useState(false);
    const [targetProfit, setTargetProfit] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [especialidades, setEspecialidades] = useState([]);
    const [editingEspecialidade, setEditingEspecialidade] = useState(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        fetchTargetProfit();
        fetchEspecialidades();
    }, []);

    //Profit Target
    const fetchTargetProfit = async () => {
        setLoading(true);
        try {
            const response = await api.get('/lucros');
            setTargetProfit(response.data[0].lucro);
        } catch (error) {
            toast.error('Erro ao carregar métricas');
        }
        setLoading(false);
    };

    const handleTargetProfitSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/lucros/1', {lucro: targetProfit});
            toast.success('Métricas atualizadas com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar métricas');
        }
        setLoading(false);
    };

    //Especialidades
    const fetchEspecialidades = async () => {
        try {
            const response = await api.get('/especialidades');
            setEspecialidades(response.data);
        } catch (error) {
            toast.error('Erro ao carregar especialidades');
        }
    };

    const handleAddEspecialidade = async (e) => {
        e.preventDefault();
        if (!especialidade) {
            toast.error('Digite uma especialidade');
            return;
        }
        setLoading(true);
        try {
            await api.post('/especialidades', { especialidades: [especialidade] });
            setEspecialidade("");
            fetchEspecialidades();
            toast.success('Especialidade adicionada com sucesso');
        } catch (error) {
            toast.error('Erro ao adicionar especialidade');
        }
        setLoading(false);
    };

    const handleEditEspecialidade = async (id) => {
        const esp = especialidades.find(e => e.id === id);
        setEditingEspecialidade(esp);
        setEditName(esp.nome);
    };

    const handleSaveEdit = async () => {
        setLoading(true);
        try {
            await api.put(`/especialidades/${editingEspecialidade.id}`, { 
                especialidade: editName 
            });
            fetchEspecialidades();
            setEditingEspecialidade(null);
            toast.success('Especialidade atualizada com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar especialidade');
        }
        setLoading(false);
    };

    const handleDeleteEspecialidade = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/especialidades/${id}`);
            fetchEspecialidades();
            toast.success('Especialidade removida com sucesso');
        } catch (error) {
            toast.error('Erro ao remover especialidade');
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <Loading show={loading} />
            <div className='container'>
                <h1>Gerenciamento</h1>
                
                <div className='formCadastro'>
                    <div className='formColuna'>
                        <div>
                            <h2>Meta de Lucro</h2>
                            <hr />
                        </div>
                        <form onSubmit={handleTargetProfitSubmit} className="especialidade-form">
                            <Input
                                name="targetProfit"
                                label="Meta de Lucro Mensal (R$)"
                                type="number"
                                placeholder="100000"
                                value={targetProfit}
                                onChange={(e) => handleProfitChange(e, setTargetProfit)}
                                mandatory
                            />
                            <button className='btnSettings' type='submit'>Salvar Meta</button>
                        </form>
                    </div>

                    <div className='formColuna'>
                        <div>
                            <h2>Especialidades</h2>
                            <hr />
                        </div>
                        <form onSubmit={handleAddEspecialidade} className="especialidade-form">
                            <Input
                                name="especialidade"
                                label="Nova Especialidade"
                                placeholder="Digite a especialidade"
                                value={especialidade}
                                onChange={(e) => setEspecialidade(e.target.value)}
                            />
                            <button className='btnSettings' type='submit'>Adicionar</button>
                        </form>
                        <div className="especialidades-list">
                            {especialidades.map((esp) => (
                                <div className="especialidade-item" key={esp.id}>
                                    {editingEspecialidade?.id === esp.id ? (
                                        <div className="edit-form">
                                            <Input
                                                name="editName"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                            <div className="btns">
                                                <button className="btnEdit" onClick={handleSaveEdit}>
                                                    Salvar
                                                </button>
                                                <button className="subBtnSettings" onClick={() => setEditingEspecialidade(null)}>
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <span>{esp.nome}</span>
                                            <div className="btns">
                                                <button className="btnEdit" onClick={() => handleEditEspecialidade(esp.id)}>
                                                    Editar
                                                </button>
                                                <button className="subBtnSettings" onClick={() => handleDeleteEspecialidade(esp.id)}>
                                                    Remover
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;