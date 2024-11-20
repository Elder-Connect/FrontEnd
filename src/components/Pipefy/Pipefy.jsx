import React from "react";
import './Pipefy.css';
import BotaoSuporte from '../../assets/img/icon-suporte.svg';

const Pipefy = () => {
    return (
        <a href="https://app.pipefy.com/public/form/qEDdcd6i" className="pipefy" target="_blank">
            <img src={BotaoSuporte} alt="Suporte" title="Suporte"/>
        </a>
    )
}

export default Pipefy;