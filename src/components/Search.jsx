import React from 'react';
import './Search.css';
import { ReactComponent as SearchIcon } from '@material-symbols/svg-600/rounded/search-fill.svg';

function Search() {
  return (
    <div className="search">
      <div className="search-row">
        <div className="search-item">
          <label htmlFor="periodo">Período</label>
          <input type="datetime-local" name='periodo' placeholder="Buscar por Período" />
        </div>
        <hr className="divisionLine" />
        <div className="search-item">
          <label htmlFor="especialidade">Especialidade</label>
          <select name="especialidade" id="especialidades">
            <option value="cuidados">Cuidados</option>
            <option value="atividades">Atividades</option>
            <option value="acompanhamento">Acompanhamento</option>
          </select>
        </div>
        <hr className="divisionLine" />
        <div className="search-item">
          <label htmlFor="preco">Preço</label>
          <input type="number" name='preco' placeholder="Buscar por Preço" />
        </div>
        <div className="searchBtn">
          <SearchIcon className='icon' />
        </div>
      </div>
    </div>
  );
}

export default Search;
