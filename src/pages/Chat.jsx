import React, { useEffect, useState } from 'react'
import './Chat.css'
import Header from '../components/Header/Header'
import Specialty from '../components/Specialty/Specialty';
import { ReactComponent as SellIcon } from '@material-symbols/svg-600/rounded/sell-fill.svg';
import { ReactComponent as EventIcon } from '@material-symbols/svg-600/rounded/event-fill.svg';
import { ReactComponent as ScheduleIcon } from '@material-symbols/svg-600/rounded/schedule-fill.svg';
import { ReactComponent as SendIcon } from '@material-symbols/svg-600/rounded/send-fill.svg';
import api from '../services/api';
import { toast } from 'react-toastify';
import { formatDate, formatHour } from '../services/utils';

function Chat() {
  const userId = Number(localStorage.getItem('userId'));
  const [contactId, setContactId] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    /*
      TODO If the URL has a contactId, load the information of the contact and put into contacts.
    */

    async function loadContacts() {
      try{
        let c = await api.get(`/mensagens/conversas/${userId}`);
        c.data.length == 0 ? toast.info('Você não possui conversas') : setContacts(c.data);
      }catch(err){
        toast.error('Erro ao carregar as conversas');
        console.log(err);
      }
    }

    loadContacts();
  }, []);

  useEffect(() => {
    let intervalId;
    if (contactId !== undefined) {
      intervalId = setInterval(async () => {
        try {
          const response = await api.get(`/mensagens/${userId}/${contactId}`);
          setMessages(response.data);
        } catch (err) {
          toast.error('Erro ao carregar as mensagens');
          console.log(err);
        }
      }, 10_000);
    }

    return () => clearInterval(intervalId);
  }, [contactId]);

  const handleContactClick = async (contactId) => {
    try {
      const response = await api.get(`/mensagens/${userId}/${contactId}`);
      setMessages(response.data);
      setContactId(contactId);
      // TODO Scroll to the bottom of the chat
    } catch (err) {
      setContactId(undefined);
      toast.error('Erro ao carregar as mensagens');
      console.log(err);
    }
  };

  const handleSendMessage = async (e) => {
    if((e.key && e.key !== 'Enter') || message === '') return;
    if(contactId === undefined) return toast.error('Selecione um contato para enviar a mensagem');
    document.getElementById("inputMessage").disabled = true;
    try{
      const messageResponse = await api.post(`/mensagens`, {
        remetenteId: userId,
        destinatarioId: contactId,
        conteudo: message,
      })
      setMessages([...messages, messageResponse.data]);
      setMessage('');
      document.getElementById("inputMessage").disabled = false;
    }catch(err){
      toast.error('Erro ao enviar a mensagem');
      console.log(err);
    }
  }

  const isNewDay = (currentDate, previousDate) => {
    const current = new Date(currentDate);
    const previous = new Date(previousDate);

    return current.getFullYear() !== previous.getFullYear() ||
           current.getMonth() !== previous.getMonth() ||
           current.getDate() !== previous.getDate();
  }

  return (
    <>
      <Header />
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map(contact => (
            <div onClick={() => handleContactClick(contact.id)} key={contact.id} className="contact-list-item">
              <div className="contact-avatar"><img src={contact.fotoPerfil} alt="user profile picture" /></div>
              <div className="contact-info">
                <div className="contact-neighborhood">{contact.bairro}</div>
                <div className="contact-name">{contact.nome}</div>
                <div className="contact-tags">{
                    contact.especialidades.map((especialidade, index) => (
                        <Specialty key={index} text={especialidade.nome} />
                    ))
                }</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-messages">
            {messages.map((message, index) => {
              //Data Processing
              const messageType = message.remetente.id === userId ? 'sent' : 'received';
              const formatedSentTime = formatHour(message.dataHora);
              const formatedSentDate = formatDate(message.dataHora);
              const showDateSeparator = index === 0 || isNewDay(message.dataHora, messages[index - 1].dataHora);
              //Proposta
              return (
                <React.Fragment key={index}>
                  {showDateSeparator && (
                    <div className="date-separator">
                      {formatedSentDate}
                    </div>
                  )}
                  <div key={message.id} className={`chat-message ${messageType}`}>
                    {
                      message.proposal ? (
                        //Proposta
                        <div className={`proposal ${messageType}`}>
                          <div className={`proposal-container`}>
                            <div className="proposal-title">{message.title}</div>
                            <div className={`proposal-datetime ${messageType}`}>{formatedSentTime}</div>
                          </div>
                          <div className="proposal-content">{message.content}</div>
                          <div className="proposal-container">
                            <div className="proposal-tags">
                              <div className={`proposal-tag ${messageType}`} ><EventIcon /> {message.date}</div>
                              <div className={`proposal-tag ${messageType}`} ><ScheduleIcon /> {message.time}</div>
                              <div className={`proposal-tag ${messageType}`} ><SellIcon /> {message.price}</div>
                            </div>
                            <button className={`proposal-accept-button ${messageType}`} >Aceitar</button>
                          </div>
                        </div>
                      ) : (
                        //Mensagem
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
          <div className="chat-input">
            <input id="inputMessage" onKeyDown={(e) => handleSendMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Digite sua mensagem..." />
            <button onClick={(e) => handleSendMessage(e)} className="send-button">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
