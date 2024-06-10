import React, { useState, useEffect, useRef } from 'react';
import './SelectEspecialidades.css';
import { toast } from 'react-toastify';
import api from '../../services/api';

const SelectEspecialidades = ({ value, setFormData }) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        //Fetch Especialidades
        const fetchEspecialidades = async () => {
            try {
                const response = await api.get('/especialidades');
                const fetchedOptions = response.data.map((item) => [item.id, item.nome]);
                const initialSelectedOptions = value.map((item) => [item.id, item.nome]);
                setSelectedOptions(initialSelectedOptions);
                const filteredOptions = fetchedOptions.filter(option => 
                    !initialSelectedOptions.some(selected => selected[0] === option[0])
                );
                setOptions(filteredOptions);
            } catch (error) {
                toast.error('Falha ao buscar especialidades');
                console.error('Failed to fetch:', error);
            }
        };
        fetchEspecialidades();

        //Remove Focus of Dropdown
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setFormData((prevState) => ({ ...prevState, especialidades: selectedOptions.map(option => option[0]) }));
    }, [selectedOptions, setFormData]);

    const handleRemoveOption = (option) => {
        setOptions((prevState) => [...prevState, option]);
        setSelectedOptions((prevState) => prevState.filter((opt) => opt[0] !== option[0]));
    };
    
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };
    
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    
    const handleSelectOption = (option) => {
        setSearchText(''); 
        if (selectedOptions.length >= 5) {
            toast.error('Máximo de 5 especialidades selecionadas');
            setIsFocused(false);
            return;
        }
        setSelectedOptions((prevState) => [...prevState, option]);
        setOptions((prevState) => prevState.filter((opt) => opt[0] !== option[0]));
        setIsFocused(false);
    };

    const filteredOptions = options.filter(option =>
        option[1] ? option[1].toLowerCase().includes(searchText.toLowerCase()) : false
    );

    return (
        <div className="containerInput">
            <p>Especialidades <span style={{color: 'var(--error)'}}>*</span></p>
            <div className="labelContainer" ref={inputRef}>
                <input
                    type="text" 
                    value={searchText} 
                    onChange={handleInputChange} 
                    onFocus={handleInputFocus}
                    placeholder="Procure por especialidades..." 
                />
                {isFocused && filteredOptions.length > 0 && (
                    <div className="options-dropdown">
                        {filteredOptions.map((option) => (
                            <div 
                                key={option[0]} 
                                className="option-item" 
                                onClick={() => handleSelectOption(option)}
                            >
                                {option[1]}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='specialtyContainer'>
                {selectedOptions.map((option) => (
                    <div className='specialtyBox' key={option[0]}>
                        <span>{option[1]}</span>
                        <button onClick={() => handleRemoveOption(option)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectEspecialidades;
