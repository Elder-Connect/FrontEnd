import React from "react";
import './Pipefy.css';
import BotaoDenuncia from '../../assets/img/icon-denuncia.svg';

const Pipefy = () => {
    return (
        <a href="https://app.pipefy.com/organizations/301375919/portals?pipeId=304835112&pipeUuid=1b7f9d11-7851-4eb7-95db-ad44a76d9777" className="pipefy">
            <img src={BotaoDenuncia} alt="Denúncia" />
        </a>

    )
}

export default Pipefy;