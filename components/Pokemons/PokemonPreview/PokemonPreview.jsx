import React from 'react';
import PropTypes from 'prop-types';
import styles from './PokemonPreview.module.css';
import Image from '../../Image/Image';

const PokemonPreview = (props) => {
  const { pokemon, pokemonClicked } = props;

  return (
    <div className={styles.PokemonPreview}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Image
          src={
            pokemon.sprite
              ? pokemon.sprite
              : '/static/unknown.png'
          }
          alt={pokemon.name}
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <p className={styles.header}>{pokemon.name}</p>
          <button type="button" onClick={() => pokemonClicked(pokemon)}>
            Add to favorites
          </button>
          <div className={styles.StatsContainer}>
            <div>
              <p>
                HP:
                {' '}
                {pokemon.stats.find(each => each.stat.name === 'hp').base_stat}
              </p>
              <p>
                ATQ.ESP:
                {' '}
                {
                  pokemon.stats.find(
                    each => each.stat.name === 'special-attack',
                  ).base_stat
                }
              </p>
            </div>
            <div>
              <p>
                ATAQUE:
                {' '}
                {
                  pokemon.stats.find(each => each.stat.name === 'attack')
                    .base_stat
                }
              </p>
              <p>
                DEF.ESP:
                {' '}
                {
                  pokemon.stats.find(
                    each => each.stat.name === 'special-defense',
                  ).base_stat
                }
              </p>
            </div>
            <div>
              <p>
                DEFENSA:
                {' '}
                {
                  pokemon.stats.find(each => each.stat.name === 'defense')
                    .base_stat
                }
              </p>
              <p>
                VELOCIDAD:
                {' '}
                {
                  pokemon.stats.find(each => each.stat.name === 'speed')
                    .base_stat
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonPreview.defaultProps = {
  pokemon: null,
  pokemonClicked: null,
};

PokemonPreview.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pokemon: PropTypes.object,
  pokemonClicked: PropTypes.func,
};

export default PokemonPreview;
