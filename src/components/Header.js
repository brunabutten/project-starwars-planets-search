import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Header() {
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [filterByNumericValues, defFilValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const {
    defOpcao,
    defSelOpcao,
    filterByName,
    setFilterByName } = useContext(PlanetContext);

  const handleClickFil = () => {
    setColumns((prevState) => prevState
      .filter((item) => item !== filterByNumericValues.column));
    defSelOpcao((prevState) => [...prevState, filterByNumericValues]);
    defFilValues({
      column: '',
      comparison: '',
      value: '',
    });
  };

  const handleClickRem = () => {
    defSelOpcao([]);
    setColumns([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div className="container-header-filter">
      <div className="img-starwars" />
      <div className="container-header-filter-title">
        <input
          type="text"
          value={ filterByName }
          className="input-filter-name"
          data-testid="name-filter"
          onChange={ (e) => setFilterByName(e.target.value) }
        />
        <div className="select">
          <select
            data-testid="column-filter"
            value={ filterByNumericValues.column }
            name="column"
            onChange={ ({ target: { value } }) => defFilValues(
              (prevState) => ({ ...prevState, column: value }),
            ) }
          >
            {columns.map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            data-testid="comparison-filter"
            value={ filterByNumericValues.comparison }
            onChange={ ({ target: { value } }) => defFilValues(
              (prevState) => ({ ...prevState, comparison: value }),
            ) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <input
          type="number"
          data-testid="value-filter"
          className="input-number"
          value={ filterByNumericValues.value }
          onChange={ ({ target: { value } }) => defFilValues(
            (prevState) => ({ ...prevState, value }),
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          className="btn-filter"
          onClick={ handleClickFil }
        >
          Filtro
        </button>
        <button
          className="btn-remove-all"
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleClickRem }
        >
          Remove filtros
        </button>
      </div>
      {defOpcao.map((filter, index) => (
        <div className="text-filter-btnX" data-testid="filter" key={ index }>
          <span>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </span>
          <button
            className="btn-filter-remove"
            id={ index }
            type="button"
            onClick={ () => {
              defSelOpcao((prevState) => prevState
                .filter((item) => item.column !== filter.column));
              setColumns((prevState) => [...prevState, filter.column]);
            } }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Header;
