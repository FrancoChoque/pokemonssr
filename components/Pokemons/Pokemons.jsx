import React from 'react';
import PropTypes from 'prop-types';
import PokemonPreview from './PokemonPreview/PokemonPreview';
import styles from './Pokemons.module.css';

const Pokemons = (props) => {
  const { data } = props;
  const matches = data.map(each => (
    <PokemonPreview
      pokemon={each}
      pokemonClicked={pokemon => props.pokemonClicked(pokemon)}
      key={each.name}
    />
  ));
  return (
    <div className={styles.Pokemons}>
      {matches}
    </div>
  );
};

Pokemons.defaultProps = {
  data: null,
  pokemonClicked: null,
};

Pokemons.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  pokemonClicked: PropTypes.func,
};

export default Pokemons;
