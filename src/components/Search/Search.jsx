import React, { useEffect, useState } from 'react';
import './Search.css';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
import SelectEspecialidades from '../Select/SelectEspecialidades';
import { ReactComponent as SearchIcon } from '@material-symbols/svg-600/rounded/search-fill.svg';
import { handlePriceChange } from '../../services/utils';
import Loading from '../Loading/Loading';
registerLocale("pt-BR", ptBr);

function Search(props) {
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [especialidades, setEspecialidades] = useState([]);

  const display = (id) => {
    setFilter(filter === id ? '' : id);
  };

  const handleSearch = async () => {
    props.handler(startDate, endDate, especialidades);
    document.getElementById('searchIcon').style.color = 'white';
    setFilter('search');
    setTimeout(() => {
      document.getElementById('searchIcon').style.color = 'black';
      setFilter('');
    }, 300);
  };

  // TODO: Add Search Button
  return (
    <>
      <div className="search">
        <div className="search-row">
          <div className={`search-item border-left ${filter === 'dateSearch' ? 'active' : ''}`} onClick={() => display('dateSearch')}> {/*TODO: Add Tab navigation and Click outside to close*/}
            <div>
              <label style={filter === 'dateSearch' ? { color: 'var(--white)' } : {}} htmlFor="periodo">Período</label>
              <p>Bucar por Período</p>
            </div>
          </div>
          <hr className="divisionLine" />
          <div className={`search-item ${filter === 'specialtySelect' ? 'active' : ''}`} onClick={() => display('specialtySelect')}> {/*TODO: Add Tab navigation and Click outside to close*/}
            <div>
              <label style={filter === 'specialtySelect' ? { color: 'var(--white)' } : {}} htmlFor="especialidade">Especialidade</label>
              <p>Bucar por Especialidades</p>
            </div>
          </div>
          <hr className="divisionLine" />
          <div onClick={() => handleSearch()} className={`search-item border-right ${filter === 'search' ? 'active' : ''}`} > {/*TODO: Add Tab navigation and Click outside to close*/}
            <SearchIcon id='searchIcon'/>
          </div>
        </div>
      </div>
      <div id="filters" style={{ display: filter && filter !== 'search' ? 'flex' : 'none' }}>
        <div id="dateSearch" style={{ display: filter === 'dateSearch' ? 'flex' : 'none' }}>
          <div className="inicio">
            <label>Início</label>
            <DatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="dd-MM-YY / HH:mm"
              timeFormat="HH:mm"
              locale="pt-BR"
              closeOnScroll
              shouldCloseOnSelect
              inline
            />
          </div>
          <div className="fim">
            <label>Fim</label>
            <DatePicker
              showTimeSelect
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              dateFormat="dd-MM-yy / HH:mm"
              locale="pt-BR"
              inline
            />
          </div>
        </div>
        <div id="specialtySelect" style={{ width: '100%', display: filter === 'specialtySelect' ? 'block' : 'none' }}>
          <SelectEspecialidades setFormData={setEspecialidades}/>
        </div>
      </div>
    </>
  );
}

export default Search;
