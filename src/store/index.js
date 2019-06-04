import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        myData:[
            {
                title:'생산',
                data:[]
            },
            {
                title:'출하',
                data:[]
            },
            {
                title:'가동률',
                data:[]
            }
        ],

        myGraph:[
            {
                title:'유가/환율',
                data:[]
            }
        ],

        myDashboard: [
            {
                title:'국제국',
                data:[]
            }
        ]
    },

    mutations: {
        setMyData (state, data) {
            state.myData = data
        },
        setMyGraph (state, data) {
            state.myGraph = data
        },
        setMyDashboard (state, data) {
            state.myDashboard = data
        },
        setMyDashboardIndex (state, data) {
            state.myDashboard = data
        }
    }
})
