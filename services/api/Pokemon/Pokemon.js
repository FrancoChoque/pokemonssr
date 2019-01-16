import axios from 'axios';

export const getPokemons = () => new Promise((resolve, reject) => {
  axios
    .get('https://pokeapi.co/api/v2/pokemon/')
    .then((res) => {
      if (res && res.data) {
        resolve(res.data.results);
      } else {
        reject(res);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

export const getPokemonByName = name => new Promise((resolve, reject) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((res) => {
      if (res && res.data) {
        resolve({
          name: res.data.name,
          stats: [...res.data.stats],
          sprite: res.data.sprites.front_default,
        });
      } else {
        reject(res);
      }
    })
    .catch((err) => {
      console.log('get-pokemon-by-name', err);
      reject(err);
    });
});
