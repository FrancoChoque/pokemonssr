import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePokemon } from '../../store/actions/pokemons';
import Pokemons from '../../components/Pokemons/Pokemons';
import Aux from '../../hoc/Aux';


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.pokemonClickHandler = this.pokemonClickHandler.bind(this);
  }

  pokemonClickHandler(pokemon) {
    const { removePokemonFromStore } = this.props;
    removePokemonFromStore(pokemon);
  }

  render() {
    const { pokemons } = this.props;
    return (
      <Aux>
        <Pokemons data={pokemons} pokemonClicked={pokemon => this.pokemonClickHandler(pokemon)} />
      </Aux>
    );
  }
}

Favorites.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pokemons: PropTypes.array,
  removePokemonFromStore: PropTypes.func,
};

Favorites.defaultProps = {
  pokemons: [],
  removePokemonFromStore: null,
};

const mapStateToProps = state => ({
  pokemons: state.pokemons.pokemons,
});

const mapDispatchToProps = dispatch => ({
  removePokemon: pokemon => dispatch(removePokemon(pokemon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
