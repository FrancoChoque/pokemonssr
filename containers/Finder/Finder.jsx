/* eslint-disable no-restricted-globals */
/* global self */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getPokemons, getPokemonByName } from '../../services/api/index';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pokemons from '../../components/Pokemons/Pokemons';
import PokeSpinner from '../../components/UI/Spinner/Spinner';
import { addPokemon } from '../../store/actions/pokemons';
import styles from './Finder.module.css';
import Aux from '../../hoc/Aux';
import subscribe from '../../subscribe';

export class FinderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      results: null,
      hits: 0,
      clickedSearch: false,
      searchField: '',
    };
    this.searchedText = '';
    this.searchPokemonHandler = this.searchPokemonHandler.bind(this);
    this.searchTextHandler = this.searchTextHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.pokemonClickHandler = this.pokemonClickHandler.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await getPokemons();
      this.setState({ pokemons: res });
    } catch (error) {
      // handle error
    }
  }

  async searchPokemonHandler() {
    const { pokemons, searchField } = this.state;
    try {
      this.setState({ results: [], clickedSearch: true, hits: 0 });
      this.searchedText = searchField;
      const matches = pokemons.filter(each => each.name.includes(searchField.toLocaleLowerCase()));
      // console.log(matches);
      const results = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const each of matches) {
        const res = getPokemonByName(each.name);
        results.push(res);
        this.setState(prevState => ({
          ...prevState,
          hits: prevState.hits + 1,
        }));
      }
      this.setState({
        results: [...(await Promise.all(results))],
        clickedSearch: false,
      });
    } catch (error) {
      this.setState({ clickedSearch: false });
    }
  }

  searchTextHandler(text) {
    this.setState({ searchField: text });
  }

  keyPressHandler(e) {
    if (e.key === 'Enter') {
      this.searchPokemonHandler();
    }
  }

  pokemonClickHandler(pokemon) {
    const { addPokemonToStore } = this.props;
    addPokemonToStore(pokemon);
  }

  render() {
    const {
      clickedSearch, results, hits, searchField,
    } = this.state;
    let searchResults = clickedSearch ? (
      <PokeSpinner hits={hits} />
    ) : (
      <p className={styles.Info}>El que quiere Pokemons, que los busque</p>
    );

    if (results && !clickedSearch) {
      searchResults = results.length ? (
        <div>
          <p className={styles.Info}>
            {'Resultados de la búsqueda"'}
            {this.searchedText}
            {'": '}
            {hits}
            {' coincidencias'}
          </p>
          <Pokemons
            data={results}
            pokemonClicked={pokemon => this.pokemonClickHandler(pokemon)}
          />
        </div>
      ) : (
        <p className={styles.Info}>
          {'No se encontró ningún Pokemon cuyo nombre contenga: "'}
          {this.searchedText}
          {'"'}
        </p>
      );
    }

    return (
      <Aux>
        <SearchBar
          value={searchField}
          textChanged={text => this.searchTextHandler(text)}
          clicked={this.searchPokemonHandler}
          onKeyPress={e => this.keyPressHandler(e)}
          placeholder="Nombre del pokemon..."
          disabled={clickedSearch}
        />
        <button type="button" onClick={() => subscribe()}>Pushnotificacion</button>
        <button
          type="button"
          onClick={() => {
            self.navigator.serviceWorker.ready
              .then((serviceWorkerRegistration) => {
                serviceWorkerRegistration.pushManager.getSubscription()
                  .then((subscription) => {
                    axios.post('/push/register', { subs: subscription, message: 'lorem ipsum' });
                  }).catch(err => console.log(err));
              }).catch(err => console.log(err, self.navigator));
          }}
        >
        Send Push
        </button>
        <div className={styles.Container}>{searchResults}</div>
      </Aux>
    );
  }
}

FinderComponent.defaultProps = {
  addPokemonToStore: null,
};

FinderComponent.propTypes = {
  addPokemonToStore: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addPokemonToStore: pokemon => dispatch(addPokemon(pokemon)),
});

export default connect(
  null,
  mapDispatchToProps,
)(FinderComponent);
