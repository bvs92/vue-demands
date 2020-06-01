import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({


  state: {
    mode: 'create',
    selectedDemand: {},
    Demand: {},
    demands: [],
    errors:[]
  },

  
  mutations: {

    _fetchAllDemands: (state, incDemands) => state.demands = incDemands.map(item => {
      item.edit = false;
      return item;
    }),

    _registerDemand: (state, newDemand) => state.demands.unshift(newDemand),
    
    _setSelectedDemand: (state, id) => {
      console.log("Inainte de cautare.");
      console.log(state.selectedDemand);

      state.selectedDemand = state.demands.find(elem => {
      if(elem.id == id)
          return elem;
      })

      console.log("Suntem aici.");
      console.log(state.selectedDemand);
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

    _resetErrors: state => state.errors = []

  },



  actions: {

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
          resolve(response.data);
        })
        .catch(
          err => {
            if(err.response.status == 422){
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

    getSelectedDemand(state){
      return state.selectedDemand;
    },
    
    getAllDemands(state){
      return state.demands;
    },

    getDemandsCount(state){
      return state.demands.length;
    },

    getErrors(state){
      return state.errors;
    }
  },


  modules: {
  }
})
