import React, { useState } from 'react';
import './Search.css';
import { ReactComponent as SearchIcon } from '@material-symbols/svg-600/rounded/search-fill.svg';
import DatePicker, { registerLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
registerLocale("pt-BR", ptBr);

function Search() {
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const display = (id) => {
    setFilter(filter === id ? '' : id);
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
          <div className={`search-item border-right ${filter === 'priceRange' ? 'active' : ''}`} onClick={() => display('priceRange')}> {/*TODO: Add Tab navigation and Click outside to close*/}
          <div>
            <label style={filter === 'priceRange' ? { color: 'var(--white)' } : {}} htmlFor="preco">Preço</label>
            <p>Buscar por Preço</p>
          </div>
          </div>
        </div>
      </div>
      <div id="filters" style={{ display: filter ? 'flex' : 'none' }}>
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
        <div id="specialtySelect" style={{ display: filter === 'specialtySelect' ? 'block' : 'none' }}>
          <select name="especialidade">
            <option value="cuidados">Cuidados</option>
            <option value="atividades">Atividades</option>
            <option value="acompanhamento">Acompanhamento</option>
          </select>
        </div>
        <div id="priceRange" style={{ display: filter === 'priceRange' ? 'block' : 'none' }}>
          <input type="number" name='preco' placeholder="Buscar por Preço"/>
        </div>
      </div>
    </>
  );
}

export default Search;
