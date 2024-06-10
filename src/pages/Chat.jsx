import React, { useEffect, useState } from 'react';
import './Chat.css';
import Header from '../components/Header/Header';
import Specialty from '../components/Specialty/Specialty';
import { ReactComponent as SellIcon } from '@material-symbols/svg-600/rounded/sell-fill.svg';
import { ReactComponent as EventIcon } from '@material-symbols/svg-600/rounded/event-fill.svg';
import { ReactComponent as ScheduleIcon } from '@material-symbols/svg-600/rounded/schedule-fill.svg';
import { ReactComponent as SendIcon } from '@material-symbols/svg-600/rounded/send-fill.svg';
import { ReactComponent as AddIcon } from '@material-symbols/svg-600/rounded/add-fill.svg';
import api from '../services/api';
import { toast } from 'react-toastify';
import { convertDateToFrontend, convertTimeToFrontend, formatDate, formatHour, formatPriceBackend, formatPriceFrontend, handleInputChange, handlePriceChange, isNewDay } from '../services/utils';
import { USERTYPE } from '../services/enums';
import Loading from '../components/Loading/Loading';
import { useLocation } from 'react-router-dom';

function Chat() {
  const location = useLocation();
  const userId = Number(localStorage.getItem('userId'));
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [proposal, setProposal] = useState({
    remetenteId: userId,
    destinatarioId: undefined,
    conteudo: "",
    proposta: {
      descricao: "",
      dataHoraInicio: "",
      dataHoraFim: "",
      preco: ''
    }
  });
  const [proposalModalIsOpen, setProposalModalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');

  const { state } = location;
  const cuidadorInfo = state ? state : null;
  useEffect(() => {
    async function loadContacts() {
      setLoading(true);
      try{
        let c = await api.get(`/mensagens/conversas/${userId}`);
        setLoading(false);
        
        //Cuidador Vindo do Chat
        if(cuidadorInfo) {
          if(c.data.map(contact => contact.id).includes(cuidadorInfo.id)){
            handleContactClick(cuidadorInfo.id);
          }else{
            setContactId(cuidadorInfo.id);
            c.data.push(cuidadorInfo);
          }
        }

        c.data.length === 0 ? toast.info('Você não possui conversas') : setContacts(c.data);
      }catch(err){
        setLoading(false);
        toast.error('Erro ao carregar as conversas');
        console.log(err);
      }
    }

    loadContacts();
  }, [userId]);

  useEffect(() => {
    let intervalId;
    if (contactId !== undefined) {
      if(messages.length === 0) setLoading(true);
      intervalId = setInterval(async () => {
        try {
          const response = await api.get(`/mensagens/${userId}/${contactId}`);
          setLoading(false);
          setMessages(response.data);
        } catch (err) {
          setLoading(false);
          toast.error('Erro ao carregar as mensagens');
          console.log(err);
        }
      }, 10_000);
    }

    return () => clearInterval(intervalId);
  }, [userId, contactId]);

  const handleContactClick = async (id) => {
    setLoading(true);
    if(id === contactId) return setLoading(false);
    try {
      const response = await api.get(`/mensagens/${userId}/${id}`);
      setLoading(false);
      setMessages(response.data);
      setContactId(id);
      setProposal({ ...proposal, destinatarioId: id });
      // TODO Scroll to the bottom of the chat
    } catch (err) {
      setLoading(false);
      setContactId(undefined);
      toast.error('Erro ao carregar as mensagens');
      console.log(err);
    }
  };

  const handleSend = async (e) => {
    if (!proposalModalIsOpen) {
      handleSendMessage(e);
      return;
    }
    handleSendProposal();
  }

  const handleSendMessage = async (e) => {
    if((e.key && e.key !== 'Enter') || message === '') return;
    if(contactId === undefined) return toast.error('Selecione um contato para enviar a mensagem');
    document.getElementById("inputMessage").disabled = true;
    try{
      const messageResponse = await api.post(`/mensagens`, {
        remetenteId: userId,
        destinatarioId: contactId,
        conteudo: message,
      });
      setMessages([...messages, messageResponse.data]);
      setMessage('');
      document.getElementById("inputMessage").disabled = false;
    }catch(err){
      toast.error('Erro ao enviar a mensagem');
      console.log(err);
    }
  }

  const handleSendProposal = async () => {
    if (contactId === undefined) return toast.error('Selecione um contato para enviar a proposta');
    if(startDate === '' || startTime === '' || endDate === '' || endTime === '' || price === '' || proposal.conteudo == '') return toast.error('Preencha todos os campos');
    document.getElementById("inputMessage").disabled = true;

    const dataHoraInicio = new Date(`${startDate}T${startTime}:00.000Z`).toISOString();
    const dataHoraFim = new Date(`${endDate}T${endTime}:00.000Z`).toISOString();

    const formatedProposal = {
      ...proposal,
      proposta: {
        ...proposal.proposta,
        dataHoraInicio,
        dataHoraFim,
        preco: formatPriceBackend(price)
      }
    };

    try {
      const proposalResponse = await api.post(`/propostas`, formatedProposal);
      setMessages([...messages, proposalResponse.data]);
      document.getElementById("inputMessage").disabled = false;
      setProposalModalIsOpen(false);
      handleOpenProposalModal();
    } catch (err) {
      toast.error('Erro ao enviar a proposta');
      console.log(err);
      document.getElementById("inputMessage").disabled = false;
      setProposalModalIsOpen(false);
      handleOpenProposalModal();
    }
  }

  const handleAcceptProposal = async (id) => {
    try {
      setLoading(true);
      const response = await api.patch(`/propostas/aceitar/${id}`, null, {headers: {'accessToken': localStorage.getItem('accessToken')}});
      setLoading(false);
      if(response.status === 200) {
        toast.success('Proposta aceita com sucesso!');
        const newMessages = messages.map(message => {
          if(message.id === id) {
            return { ...message, proposta: { ...message.proposta, aceita: true } };
          }
          return message;
        });
        setMessages(newMessages);
      }
    } catch (err) {
      setLoading(false);
      toast.error('Erro ao aceitar a proposta');
      console.log(err);
    }
  }

  const handleOpenProposalModal = () => {
    if (contactId === undefined) return toast.error('Selecione um contato para enviar a proposta');
    if (proposalModalIsOpen) {
      document.getElementById("inputMessage").disabled = false;
      document.getElementById('proposalModal').style.display = 'none';
      return setProposalModalIsOpen(false);
    }
    document.getElementById("inputMessage").disabled = true;
    document.getElementById('proposalModal').style.display = 'block';
    return setProposalModalIsOpen(true);
  }

  return (
    <>
      <Header />
      <Loading show={loading} />
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map(contact => (
            <div onClick={() => handleContactClick(contact.id)} key={contact.id} className="contact-list-item">
              <div className="contact-avatar"><img src={contact.fotoPerfil} alt="user profile" /></div>
              <div className="contact-info">
                <div className="contact-neighborhood">{contact.endereco.bairro}</div>
                <div className="contact-name">{contact.nome}</div>
                <div className="contact-tags">
                  {contact.especialidades.map((especialidade, index) => (
                    <Specialty key={index} text={especialidade.nome} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          {contactId === undefined ? (
            <div className="chat-empty">
              <div className="chat-empty-icon">😔</div>
              <div className="chat-empty-text">Você não selecionou nenhum contato. Selecione alguém para começar a conversar!</div>
            </div>
          ) : (
            <>
            <div className="chat-header">
              <div className="chat-header-avatar"><img src={contacts.find(contact => contact.id === contactId).fotoPerfil} alt="user profile" /></div>
              <div className="chat-header-info">
                <div className="chat-header-neighborhood">{contacts.find(contact => contact.id === contactId).endereco.bairro}</div>
                <div className="chat-header-name">{contacts.find(contact => contact.id === contactId).nome}</div>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => {
                //Data Processing
                const messageType = message.remetente.id === userId ? 'sent' : 'received';
                const formatedSentTime = formatHour(message.dataHora);
                const formatedSentDate = formatDate(message.dataHora);
                const showDateSeparator = index === 0 || isNewDay(message.dataHora, messages[index - 1].dataHora);
                return (
                  <React.Fragment key={index}>
                    {showDateSeparator && (
                      <div className="date-separator">
                        {formatedSentDate}
                      </div>
                    )}
                    <div key={message.id} className={`chat-message ${messageType}`}>
                      {
                        message.proposta ? (
                          //Proposta
                          <div className={`proposal ${messageType}`}>
                            <div className={`proposal-container ${messageType}`}>
                              <div className="proposal-title">{message.conteudo}</div>
                              <div className={`proposal-datetime ${messageType}`}>{formatedSentTime}</div>
                            </div>
                            <div className={`proposal-content ${messageType}`}>{message.proposta.descricao}</div>
                            <div className={`proposal-container ${messageType}`} style={{width: '60%'}}>
                              <span>De</span>
                              <div className="proposal-tags">
                                <div className={`proposal-tag ${messageType}`} ><EventIcon /> {convertDateToFrontend(message.proposta.dataHoraInicio)}</div>
                                <div className={`proposal-tag ${messageType}`} ><ScheduleIcon /> {convertTimeToFrontend(message.proposta.dataHoraInicio)}</div>
                              </div>
                              <span>à</span>
                              <div className="proposal-tags">
                                <div className={`proposal-tag ${messageType}`} ><EventIcon /> {convertDateToFrontend(message.proposta.dataHoraFim)}</div>
                                <div className={`proposal-tag ${messageType}`} ><ScheduleIcon /> {convertTimeToFrontend(message.proposta.dataHoraFim)}</div>
                              </div>
                            </div>
                            <div className={`proposal-container ${messageType}`}>
                              <div className="proposal-tags">
                                <div className={`proposal-tag ${messageType}`} ><SellIcon /> {formatPriceFrontend(message.proposta.preco)}</div>
                              </div>
                            </div>
                            {message.proposta.aceita ? (
                              <div className={`proposal-accepted ${messageType}`}>Proposta aceita</div>
                            ) : (
                              <button onClick={() => handleAcceptProposal(message.proposta.id)} className={`proposal-accept-button ${messageType}`}>Aceitar</button>
                            )}
                          </div>
                        ) : (
                          <div className={`chat-message-content ${messageType}`}>
                            {message.conteudo}
                            <div className={`chat-message-time ${messageType}`}>
                              {formatedSentTime}
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
            <div id='proposalModal' className="proposal-modal">
              <div className="proposal-modal-content">
                <div className="proposal-modal-title">Nova Proposta de Serviço</div>
                <div className="proposal-modal-inputs">
                  <div>
                    <p className='proposal-modal-label'>Título</p>
                    <input value={proposal.conteudo} onChange={(e) => handleInputChange(e, setProposal)} name='conteudo' type="text" placeholder="Cuidados Sr. José" />
                  </div>
                  <div>
                    <p className='proposal-modal-label'>Descrição</p>
                    <textarea value={proposal.proposta.descricao} onChange={(e) => handleInputChange(e, setProposal)} name='proposta.descricao' className='proposal-modal-textarea' placeholder='Rua João Lima, 237&#10;Cuidados Especiais'></textarea>
                  </div>
                  <div className="proposal-modal-inputs-section">
                    <div style={{width: '49%'}}>
                      <p className='proposal-modal-label'>Início</p>
                      <div className="proposal-modal-inputs-section">
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                      </div>
                    </div>
                    <div style={{width: '49%'}}>
                      <p className='proposal-modal-label'>Fim</p>
                      <div className="proposal-modal-inputs-section">
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='proposal-modal-label'>Preço</p>
                    <input value={price} onChange={(e) => handlePriceChange(e, setPrice)} type="text" placeholder="R$0,00" />
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-input">
              {localStorage.getItem('userType') == USERTYPE.CUIDADOR && (
                <button onClick={() => handleOpenProposalModal()} className="send-button-left">
                  <AddIcon />
                </button>
              )}
              <input id="inputMessage" onKeyDown={(e) => handleSendMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Digite sua mensagem..." />
              <button onClick={(e) => handleSend(e)} className="send-button-right">
                <SendIcon />
              </button>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
