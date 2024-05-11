import { data } from "autoprefixer";
import axios from "axios";
import { createStore } from "vuex";

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
        },
        setUser: (state, userData) => {
          state.user.data = userData.user;
          state.user.token = userData.token;
          sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    actions: {
        register({ commit}, user) {
            return axios.post('http://localhost:8000/api/register', 
                JSON.stringify(user),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                }
            )
            // .then((res) => res.json())
            .then((res) => {
                commit("setUser", res.data);
                return res.data;
            });
        }
    },
    modules: {}
});

export default store;

