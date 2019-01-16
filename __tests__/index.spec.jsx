/* eslint-disable no-unused-vars */
/* global document */

import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import About from '../components/About/About';
import Finder, { FinderComponent } from '../containers/Finder/Finder';
import { getPokemons, getPokemonByName } from '../services/api/Pokemon/Pokemon';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import DrawerToggle from '../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import PokemonPreview from '../components/Pokemons/PokemonPreview/PokemonPreview';
import Footer from '../components/Navigation/Footer/Footer';
import MyDocument from '../pages/_document';
import SearchBar from '../components/SearchBar/SearchBar';

const getPokemonsMock = () => (
  [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'htts://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
    { name: 'ludicolo', url: 'https://pokeapi.co/api/v2/pokemon/272/' },
    { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' }]
);

const getPokemonMock = () => (
  {
    name: 'ludicolo',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/272.png',
    },
    stats: [
      {
        base_stat: 70,
        effort: 0,
        stat: {
          name: 'speed',
          url: 'https://pokeapi.co/api/v2/stat/6/',
        },
      },
      {
        base_stat: 100,
        effort: 3,
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: 90,
        effort: 0,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: 70,
        effort: 0,
        stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
      },
      {
        base_stat: 70,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        base_stat: 80,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
    ],
  }
);

describe('Integration', () => {
  describe('Pokemon SearchBar', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should trigger api call', async (done) => {
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/', {
        status: 200,
        response: {
          results: getPokemonsMock(),
        },
      });
      const wrap = mount(<FinderComponent />);
      moxios.wait(() => {
        expect(wrap.find('PokemonPreview').length).toBe(0);
        done();
      });
    });
    it('should trigger api calla', async (done) => {
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/ludicolo/', {
        status: 200,
        response: getPokemonMock(),
      });
      const wrap = mount(<FinderComponent />);
      wrap.setState({ searchField: 'ludicolo', pokemons: getPokemonsMock() });
      wrap.update();
      wrap.find('SearchBar').find('button').simulate('click');
      moxios.wait(() => {
        wrap.update();
        expect(wrap.find('PokemonPreview').length).toBe(1);
        done();
      });
    });
  });
});

describe('Components', () => {
  describe('About', () => {
    it('should render my name', () => {
      const wrap = shallow(<About />);
      expect(wrap.find('div').text()).toBe('Franco Choque');
    });
  });
  describe('Footer', () => {
    it('should render desc', () => {
      const wrap = shallow(<Footer />);
      expect(wrap.find('a').text()).toBe('Link al repo');
      expect(wrap.find('a').prop('href')).toBe('https://github.com/FrancoChoque/pokefinder');
    });
  });
  describe('SideDrawer', () => {
    it('should render', () => {
      const wrap = mount(<SideDrawer />, { attachTo: document.getElementById('altRoot') });
      expect(wrap.find(<DrawerToggle />));
    });
  });
  describe('Finder without pokemons', () => {
    it('should not render pokemons', () => {
      const wraps = mount(<FinderComponent />);
      expect(wraps.find(<SideDrawer />));
    });
  });
});

describe('mocking axios requests', () => {
  describe('across entire suite', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should fail api call', async (done) => {
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/', {
        status: 404,
      });
      let pokemons = [];
      try {
        pokemons = await getPokemons();
      } catch (error) {
        pokemons = [];
      }
      moxios.wait(() => {
        expect(pokemons).toEqual([]);
        done();
      });
    });
    it('should succeed api call', async (done) => {
      // Match against an exact URL value
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/', {
        status: 200,
        response: {
          results: getPokemonsMock(),
        },
      });
      const pokemons = await getPokemons();
      moxios.wait(() => {
        expect(pokemons).toEqual(getPokemonsMock());
        done();
      });
    });
    it('should remain empty', (done) => {
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/', {
        status: 404,
      });
      const wrap = shallow(<FinderComponent />);
      moxios.wait(() => {
        expect(wrap.state().pokemons).toEqual([]);
        done();
      });
    });
    it('should populate state', (done) => {
      // Match against an exact URL value
      moxios.stubRequest('https://pokeapi.co/api/v2/pokemon/', {
        status: 200,
        response: {
          results: getPokemonsMock(),
        },
      });
      const wrap = shallow(<FinderComponent />);
      moxios.wait(() => {
        expect(wrap.state().pokemons).toEqual(getPokemonsMock());
        done();
      });
    });
  });
});
