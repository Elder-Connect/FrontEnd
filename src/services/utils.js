import axios from 'axios';
import { toast } from 'react-toastify';

export const handleDocumentChange = (event, setFormData) => {
    const { value } = event.target;
    let maskedValue = value.replace(/[^\d]/g, '');
    if(maskedValue.length >= 15){
        return;
    }
    if (maskedValue.length <= 11) {
        maskedValue = maskedValue.replace(/^(\d{3})(\d)/, '$1.$2');
        maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
        maskedValue = maskedValue.replace(/^(\d{2})(\d)/, '$1.$2');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
        maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
    setFormData((prevState) => ({
        ...prevState,
        documento: maskedValue,
    }));
};

export const handleCepChange = async (event, setFormData) => {
    const { value } = event.target;
    let maskedValue = value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
    if(maskedValue.length > 9){
        return;
    }
    if (maskedValue.length === 9) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${maskedValue}/json/`);
            const address = response.data;
            setFormData((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: maskedValue,
                    logradouro: address.logradouro,
                    bairro: address.bairro,
                    cidade: address.localidade,
                    uf: address.uf
                }
            }));
        } catch (error) {
            toast.error('Falha ao buscar endereço');
            console.log("Failed to fetch address:", error.message);
        }
    } else {
        setFormData((prevState) => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                cep: maskedValue
            }
        }));
    }
};

export const handleDataNascimento = (event, setFormData) => {
    const { value } = event.target;
    let formattedDate = value.replace(/[^\d]/g, '');

    if (formattedDate.length > 8) {
        return;
    }

    if (formattedDate.length <= 8) {
        formattedDate = formattedDate.replace(/^(\d{2})(\d)/, '$1/$2');
        formattedDate = formattedDate.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }

    setFormData((prevState) => ({
        ...prevState,
        dataNascimento: formattedDate,
    }));
};

export const convertDateToBackendFormat = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

export const convertDateToFrontendFormat = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

export const handlePriceChange = (e, setPrice) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');

    if (rawValue === '') {
        setPrice('');
    } else if(parseInt(rawValue, 10) >= 10_000_00){
        setPrice('R$10.000,00');
        toast.info('Valor máximo permitido é R$10.000,00');
    }else {
        const valueInCents = parseInt(rawValue, 10);
        const formattedPrice = `R$${(valueInCents / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`;
        setPrice(formattedPrice);
    }
};

export const formatPriceFrontend = (price) => {
    return `R$${(price).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
    })}`;
}

export const formatPriceBackend = (price) => {
    const rawValue = price.replace(/[^\d]/g, '');
    const valueInDouble = parseInt(rawValue, 10) / 100;
    return valueInDouble;
}

export const handleInputChange = (event, setFormData) => {
    let { name, value } = event.target;
    value = value === '' ? '' : (isNaN(value) ? value : Number(value));

    if (typeof setFormData === 'function' && !setFormData.toString().includes('prevFormData')) {
        setFormData(value);
        return;
    }

    if (name.includes('endereco.')) {
        const endereco = name.split('.')[1];
        setFormData(prevFormData => ({
            ...prevFormData,
            endereco: {
                ...prevFormData.endereco,
                [endereco]: value
            }
        }));
    } else if(name.includes('proposta.')){
        const proposta = name.split('.')[1];
        setFormData(prevFormData => ({
            ...prevFormData,
            proposta: {
                ...prevFormData.proposta,
                [proposta]: value
            }
        }));
    }else {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
};

export const validadeForm = () => {
    var isValid = true;
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element.classList.contains('mandatory') && element.value === "") {
            element.classList.add('error');
            element.previousElementSibling.classList.add('error');
            isValid = false;
        }
        if (element.classList.contains('mandatory') && element.value !== "") {
            element.classList.remove('error');
            element.previousElementSibling.classList.remove('error');
        }
    }
    return isValid;
};

export const formatHour = (dateTime) => {
    let date = new Date(dateTime);

    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

export const isNewDay = (currentDate, previousDate) => {
    const current = new Date(currentDate);
    const previous = new Date(previousDate);

    return current.getFullYear() !== previous.getFullYear() ||
            current.getMonth() !== previous.getMonth() ||
            current.getDate() !== previous.getDate();
}

export const convertDateToFrontend = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const convertTimeToFrontend = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}