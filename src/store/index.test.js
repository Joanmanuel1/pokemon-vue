import { createStore } from 'vuex';
import pokemon from './pokemon';
import { describe, it, expect, beforeEach } from "vitest";

describe('Vuex Store - index.js', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        pokemon,
      },
    });
  });

  it('should have the pokemon module registered', () => {
    expect(store.hasModule('pokemon')).toBe(true);
  });

});
