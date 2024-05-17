import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [],
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea']
    },
    getters: {},
    mutations: {
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, survey.data];
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map(s => {
                if (survey.data.id === s.id) {
                    return survey.data;
                }
                return s;
            });
        },
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
        async getSurveys () {
            return axiosClient.get('/survey')
               .then(res => {
                    return res.data.data;
                });
        },
        async getSurvey ({ commit }, survey) {
            return axiosClient.get('/survey/'+survey+'/edit')
               .then(res => {
                    return res.data;
                });
        },
        async saveSurvey ({ commit }, survey) {
            return axiosClient.post('/survey', survey, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(res => {
                    commit('saveSurvey', res.data);
                    return res;
                });
        },
        async updateSurvey ({ commit }, survey) {
            survey._method = 'put';
            return axiosClient.post('/survey/'+survey.id, survey, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(res => {
                    commit('updateSurvey', res.data);
                    return res;
                });
        },
        async deleteSurvey ({ commit }, survey) {
            return axiosClient.delete('/survey/' + survey)
                .then(res => {
                    return res;
                });
            },
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

