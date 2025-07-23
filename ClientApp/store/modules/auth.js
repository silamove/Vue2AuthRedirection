// Auth module for Vuex store
const state = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    
    try {
      const response = await fetch('/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        commit('SET_AUTHENTICATED', true);
        await this.dispatch('auth/fetchUser');
        return { success: true };
      } else {
        commit('SET_ERROR', 'Invalid username or password');
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      commit('SET_ERROR', 'Login failed. Please try again.');
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async logout({ commit }) {
    try {
      await fetch('/account/logout', { method: 'POST' });
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER', null);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false };
    }
  },
  
  async checkAuth({ commit }) {
    try {
      const response = await fetch('/account/me');
      if (response.ok) {
        const user = await response.json();
        commit('SET_AUTHENTICATED', true);
        commit('SET_USER', user);
        return true;
      } else {
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', null);
        return false;
      }
    } catch (error) {
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER', null);
      return false;
    }
  },
  
  async fetchUser({ commit }) {
    try {
      const response = await fetch('/account/me');
      if (response.ok) {
        const user = await response.json();
        commit('SET_USER', user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  loading: state => state.loading,
  error: state => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
