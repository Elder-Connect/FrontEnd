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

    if (formattedDate.length > 10) {
        return;
    }

    if (formattedDate.length <= 8) {
        formattedDate = formattedDate.replace(/^(\d{4})(\d)/, '$1-$2');
        formattedDate = formattedDate.replace(/^(\d{4})-(\d{2})(\d)/, '$1-$2-$3');
    } else if (formattedDate.length > 8) {
        formattedDate = formattedDate.slice(0, 8);
        formattedDate = formattedDate.replace(/^(\d{4})(\d)/, '$1-$2');
        formattedDate = formattedDate.replace(/^(\d{4})-(\d{2})(\d)/, '$1-$2-$3');
    }

    setFormData((prevState) => ({
        ...prevState,
        dataNascimento: formattedDate,
    }));
};


export const handleInputChange = (event, setFormData) => {
    let { name, value } = event.target;
    value = value === '' ? '' : (isNaN(value) ? value : Number(value));
    if (name.includes('endereco.')) {
        const endereco = name.split('.')[1];
        setFormData(prevFormData => ({
            ...prevFormData,
            endereco: {
                ...prevFormData.endereco,
                [endereco]: value
            }
        }));
    } else {
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
