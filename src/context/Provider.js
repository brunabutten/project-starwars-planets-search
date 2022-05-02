import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ContextStar from './PlanetContext';
import planetAPI from '../services/PlanetsAPI';

function Provider({ children }) {
  const [data, defData] = useState([]);
  const [search, defSearch] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [defOpcao, defSelOpcao] = useState([]);

  useEffect(() => {
    (async () => {
      const { results } = await planetAPI();
      defData(results);
      defSearch(results);
    })();
  }, []);

  useEffect(() => {
    let inputNome = data.filter(({ name }) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      name.toLowerCase().includes(filterByName.toLowerCase()));
    if (search.length) {
      inputNome = inputNome.filter((item) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        defOpcao.every(({ column, comparison, value }) => {
          if (comparison === 'maior que') {
            return Number(item[column]) > Number(value);
          }
          if (comparison === 'menor que') {
            return Number(item[column]) < Number(value);
          }
          if (comparison === 'igual a') {
            return Number(item[column]) === Number(value);
          }
          return false;
        }));
    }
    defSearch(inputNome);
  }, [defOpcao, filterByName, data, search.length]);

  return (
    <ContextStar.Provider
      value={ {
        search,
        defOpcao,
        defSelOpcao,
        filterByName,
        setFilterByName,
      } }
    >
      {children}
    </ContextStar.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
