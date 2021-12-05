import repository from "../api/repository";
import { createStore} from 'vuex';

const store = createStore({
  modules: {
    auth: {
      state: {
        token: null
      },

      getters: {
        token: state => state.token,
        authenticated: state => !!state.token,
      },

      mutations: {
        SET_TOKEN(state, token) {
          state.token = token;
        }
      },

      actions: {
        async login({ commit }, user) {
          const { data } = await repository.login(user);
          commit('SET_TOKEN', data.token)
          localStorage.setItem('token', data.token)
        },

        async logout({ commit }) {
          await repository.logout();
          commit('SET_TOKEN', null);
          localStorage.removeItem('token');
        }
      }
    }
  }
});

export default store;