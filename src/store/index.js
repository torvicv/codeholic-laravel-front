import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        }
    },
    getters: {},
    mutations: {
        logout: state => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
          state.user.data = userData.user;
          state.user.token = userData.token;
          sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
            .then(({data}) => {
                commit("setUser", data);
                return data;
            });
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
            .then(({data}) => {
                commit("setUser", data);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then((response) => {
                    commit("logout");
                    return response;
                });
        }
    },
    modules: {}
});

export default store;

