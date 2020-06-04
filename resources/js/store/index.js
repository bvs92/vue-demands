import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({


  state: {
    mode: 'create',
    token: localStorage.getItem('token') || null,
    selectedDemand: {},
    Demand: {},
    demands: [],
    errors:[],
    categories:[],
  },

  
  mutations: {

    _setErrors: (state, incErrors) => {
      // transform from Object to Array & after that reduce the array with flat method
      state.errors = Object.values(incErrors).flat();
      // console.log("Incoming errors");
      // console.log(incErrors);
      // console.log(Object.values(incErrors));
    },

    _fetchAllDemands: (state, incDemands) => state.demands = incDemands.map(item => {
      item.edit = false;
      return item;
    }),

    _fetchAllCategories: (state, incCategories) => {
      state.categories = incCategories.map(item => item);
      console.log('INC');
      console.log(state.categories);
      console.log(state.categories.length);
      console.log('END');
    },

    _registerDemand: (state, newDemand) => state.demands.unshift(newDemand),
    
    _setSelectedDemand: (state, id) => {
      // console.log("Inainte de cautare.");
      // console.log(state.selectedDemand);

      state.selectedDemand = state.demands.find(elem => {
      if(elem.id == id)
          return elem;
      })

      // console.log("Suntem aici.");
      // console.log(state.selectedDemand);
  },
    _changeMode: state => {
      if(state.mode == 'create')
        state.mode = 'edit';
      else
        state.mode = 'create';
    },

    _updateTheDemand: (state, theDemand) => {
      console.log('aici sus ');
      console.log(state.demands);

      state.demands = state.demands.map(elem => {
        if(elem.id == theDemand.id){
          // console.log(theDemand);
          elem = theDemand;
          elem.edit = false;
          // state.selectedDemand = {};
          
          // elem.id = theDemand.id;
          // elem.first_name = theDemand.first_name;
          // elem.last_name = theDemand.last_name;

          // do axios
        }

        return elem;
      });

      console.log('aicijos');
      console.log(state.demands);
      

    },

    _deleteTheDemand: (state, id) => state.demands = state.demands.filter(item => item.id != id),

    _resetErrors: state => state.errors = [],

    _loginUser(state, incToken){
      state.token = incToken;
    },
    _resetToken: state => state.token = null,

  },



  actions: {


    registerUser(context, newUser){
      return new Promise((resolve, reject) => {
          axios
          .post('/api/register', newUser)
          .then(response => {
            // response.data.edit = false;
            // context.commit('_registerUser', response.data);
            // console.log(response.data);
            resolve(response);
          })
          .catch(
            err => {
              console.log(err.response.status);
              if(err.response.status == 422 || err.response.status == 500){
                // console.error(err.response.data.errors);
                // theErrors = err.response.data.errors.map(item => );
                console.error(err.response.data.errors);
                context.commit('_setErrors', err.response.data.errors);
                // context.state.errors = err.response.data.errors; 
                reject(err.response.data.errors);  
              } 
            }    
          );
        });

    },

    loginUser(context, user){
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

      let data = new FormData();

      // Nu este indicat. Date sensibile expuse.
      //Observatie: Probleme cURL folosind php - laravel? Rezolvare 0.
      // Am luat decizia de a continua proiectul si de a pune datele aici.

      data.append('grant_type', 'password');
      data.append('client_id', 2);
      data.append('client_secret', 'VbdxjL53LFqiZoBvKHWizXfAPZSu5q7qcvH4ay1x');
      data.append('username', user.email);
      data.append('password', user.password);

      // console.log(user);

      return new Promise((resolve, reject) => {
        axios.post('/oauth/token', data, {
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          console.log("HIT HERE");
          context.commit('_loginUser', response.data.access_token);
          localStorage.setItem('token', response.data.access_token);
          resolve(response);
        }).catch(err => {
          reject(err);
          console.log('HIT errors');
          console.log(err.response.status);
          if(err.response.status == 400)
            context.commit('_setErrors', ['Invalid credentials.']);
        }
        );
      });
    },

    logoutUser(context){
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.defaults.headers.common = {'Authorization': `Bearer ${context.getters.getToken}`}

      // console.log(context.getters.getToken);
      return new Promise((resolve, reject) => {
        axios.post('/api/logout', {
          headers: {
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${context.getters.getToken}`
          }
        }).then(response => {
          resolve(response);
          localStorage.removeItem('token');
          context.commit('_resetToken');
        }).catch(err => reject(err));
      });
    },

    fetchAllDemands(context){
      return new Promise((resolve, reject) => {
        axios
          .get('/api/demands')
          .then(response => {
            // console.log('aiciiii');
            // console.log(response.data);
            context.commit('_fetchAllDemands', response.data);
            resolve(response.data);
          })
          .catch(
            err => reject(err)        
          );
      });
    },

    fetchAllCategories(context){
        axios
          .get('/api/categories/all').then(response => {
            context.commit('_fetchAllCategories', response.data);
            
            console.log("Fetch");
            console.log(response.data);
            console.log("End Fetch");
          })
          .catch(err => console.log(err));
    },


    registerDemand(context, newDemand){
     
      // axios.defaults.baseURL = 'http://127.0.0.1:8000';
      // axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


      return new Promise((resolve, reject) => {
        axios
        .post('/api/demands', newDemand)
        .then(response => {
          response.data.edit = false;
          context.commit('_registerDemand', response.data);
          // console.log(response.data);
          resolve(response);
        })
        .catch(
          err => {
            // console.log(err.response.status);
            if(err.response.status == 422 || err.response.status == 500){
              // console.error(err.response.data.errors);
              context.state.errors = err.response.data.errors; 
              reject(err.response.data.errors);  
            } 
          }    
        );
      });
    },

    updateDemand(context, theDemand){
      axios
      .put(`/api/demands/${theDemand.id}`, theDemand)
      .then(response => {
        // console.log(response.status);
        context.commit('_updateTheDemand', theDemand);
      })
      .catch(err => {
          if(err.response.status == 422){
            // console.error(err.response.data.errors);
            context.state.errors = err.response.data.errors;   
          } 
        } 
      );
    },

    updateTheDemand(context, theDemand){
      context.commit('_updateTheDemand', theDemand);
    },

    deleteTheDemand(context, id){
      console.log('aici stergem');
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/demands/${id}`)
          .then(response => {
            // console.log(response.data);
            // console.log(response.status);
            let resp = context.commit('_deleteTheDemand', id);
            resolve(resp);
          })
          .catch(err => reject(err));
      });
    },

    setSelectedDemand(context, id){
      context.commit('_setSelectedDemand', id);
    },

    changeMode(context){
      context.commit('_changeMode');
    },

    resetErrors(context){
      context.commit('_resetErrors');
    }
  },


  getters: {
    getMode(state){
      return state.mode;
    },

    // getCategoryName(state, id){
    //   return state.categories.filter(item => {
    //     if(item.id == id)
    //       return item.usage_name;
    //   });
    // },

    getCategoryName: (state) => (id) => {
      return state.categories.find(category => {
        if(category.id === id)
          return category;
        else 
          return null;
      });
    },

    getSelectedDemand(state){
      return state.selectedDemand;
    },
    
    getAllDemands(state){
      return state.demands;
    },

    getAllCategories(state){
      return state.categories;
    },

    getCategoriesCount(state){
      console.log('Nnumar categorii');
      console.log(state.categories.length);
      return state.categories.length;
    },

    getDemandsCount(state){
      return state.demands.length;
    },

    getErrors(state){
      return state.errors;
    },

    getToken(state){
      return state.token;
    },

    isLoggedIn(state){
      return state.token !== null;
    }
  },


  modules: {
  }
})
