import React from "react";
import './Pipefy.css';
import BotaoDenuncia from '../../assets/img/icon-denuncia.svg';

const Pipefy = () => {
    return (
        <a href="https://app.pipefy.com/public/form/qEDdcd6i" className="pipefy" target="_blank">
            <img src={BotaoDenuncia} alt="Denúncia" title="Denúncia"/>
        </a>
    )
}

export default Pipefy;