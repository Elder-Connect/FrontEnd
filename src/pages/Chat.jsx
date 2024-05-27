import React from 'react'
import './Chat.css'
import Header from '../components/Header/Header'
import Specialty from '../components/Specialty/Specialty';
import { ReactComponent as SellIcon } from '@material-symbols/svg-600/rounded/sell-fill.svg';
import { ReactComponent as EventIcon } from '@material-symbols/svg-600/rounded/event-fill.svg';
import { ReactComponent as ScheduleIcon } from '@material-symbols/svg-600/rounded/schedule-fill.svg';

function Chat() {
  const contacts = [
    { id: 1, name: 'Maria Antonieta', neighborhood: 'Vila Matilde', specialties: ['Fisioterapia', 'Bingo', 'Skate Idoso'], fotoPerfil: 'https://lh3.googleusercontent.com/a/ACg8ocIWmTZBhWV4hAaK0HbD60zLgJyhKuCPKSMrc-1sTb0G0TR1uA=s96-c' },
    { id: 2, name: 'Maria Antonieta', neighborhood: 'Vila Matilde', specialties: ['Fisioterapia', 'Bingo', 'Skate Idoso', 'especialidade', 'especialidade 2'], fotoPerfil: 'https://lh3.googleusercontent.com/a/ACg8ocIWmTZBhWV4hAaK0HbD60zLgJyhKuCPKSMrc-1sTb0G0TR1uA=s96-c' },
  ];

  const messages = [
    { id: 1, type: 'received', content: 'Boa Tarde!', timeSent: '14:00'},
    { id: 2, type: 'received', content: 'Boa Tarde!', timeSent: '14:01'},
    { id: 3, type: 'sent', content: 'Olá, Boa tarde!', timeSent: '14:02'},
    { id: 4, type: 'received', content: 'Lorem Ipsum is simply ', timeSent: '23:43'},
    { 
      id: 5, 
      proposal: true, 
      type: 'received',
      title: 'Serviço de Fisioterapia',
      date: '26/05/2024',
      time: '14:00', 
      price: 'R$ 150,00', 
      content: 'Sessão de fisioterapia para alívio de dores nas costas.',
      timeSent: '00:00'
    },
    { 
      id: 6, 
      proposal: true, 
      type: 'sent',
      title: 'Serviço de Fisioterapia',
      date: '26/05/2024',
      time: '14:00', 
      price: 'R$ 150,00', 
      content: 'Sessão de fisioterapia para alívio de dores nas costas.',
      timeSent: '00:00'
    }
  ];

  return (
    <>
      <Header />
      <div className="chat-container">
        <div className="contact-list">
          {contacts.map(contact => (
            //TODO - Adicionar onClick para abrir chat
            <div key={contact.id} className="contact-list-item">
              <div className="contact-avatar"><img src={contact.fotoPerfil} alt="user profile picture" /></div>
              <div className="contact-info">
                <div className="contact-neighborhood">{contact.neighborhood}</div>
                <div className="contact-name">{contact.name}</div>
                <div className="contact-tags">{
                    contact.specialties.map((specialty, index) => (
                        <Specialty key={index} text={specialty} />
                    ))
                }</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-area">
          <div className="chat-messages">
            {messages.map(message => (
              message.proposal ? (
                <div key={message.id} className={`chat-message ${message.type}`}>
                  <div className={`proposal ${message.type}`}>
                    <div className={`proposal-container`}>
                      <div className="proposal-title">{message.title}</div>
                      <div className={`proposal-datetime ${message.type}`}>{message.timeSent}</div>
                    </div>
                    <div className="proposal-content">{message.content}</div>
                    <div className="proposal-container">
                      <div className="proposal-tags">
                        <div className={`proposal-tag ${message.type}`} ><EventIcon /> {message.date}</div>
                        <div className={`proposal-tag ${message.type}`} ><ScheduleIcon /> {message.time}</div>
                        <div className={`proposal-tag ${message.type}`} ><SellIcon /> {message.price}</div>
                      </div>
                      <button className={`proposal-accept-button ${message.type}`} >Aceitar</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={message.id} className={`chat-message ${message.type}`}>
                  <div className={`chat-message-content ${message.type}`}>
                    {message.content}
                    <div className={`chat-message-time ${message.type}`}>
                      {message.timeSent}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Digite sua mensagem..." />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
