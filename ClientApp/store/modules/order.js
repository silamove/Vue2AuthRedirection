// Order module for Vuex store
const state = {
  currentOrder: {
    customerName: 'John Doe',
    product: 'Premium Widget',
    quantity: 2,
    price: 49.99,
    created: '2025-01-15',
    status: 'Processing'
  },
  orders: [],
  loading: false,
  error: null
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order;
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  UPDATE_ORDER_FIELD(state, { field, value }) {
    if (state.currentOrder) {
      state.currentOrder[field] = value;
    }
  }
};

const actions = {
  async fetchOrder({ commit }, orderId) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    
    try {
      // For now, just use the default order data
      // In a real app, you'd fetch from API: `/api/orders/${orderId}`
      const order = {
        id: orderId,
        customerName: 'John Doe',
        product: 'Premium Widget',
        quantity: 2,
        price: 49.99,
        created: '2025-01-15',
        status: 'Processing'
      };
      
      commit('SET_CURRENT_ORDER', order);
      return { success: true };
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch order');
      return { success: false, error: 'Failed to fetch order' };
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async saveOrder({ commit, state }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    
    try {
      // In a real app, you'd save to API: POST `/api/orders/${state.currentOrder.id}`
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (error) {
      commit('SET_ERROR', 'Failed to save order');
      return { success: false, error: 'Failed to save order' };
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  updateOrderField({ commit }, payload) {
    commit('UPDATE_ORDER_FIELD', payload);
  }
};

const getters = {
  currentOrder: state => state.currentOrder,
  orders: state => state.orders,
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
