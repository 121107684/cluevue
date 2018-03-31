// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from "./assets/api"
import config from "./assets/config"
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import axios from 'axios'
import publicnav from './components/publicnav'
import menuslider from './components/menu'
import publicsearch from './components/publicsearch'
import tableModel from './components/tableModel'
import breadcrumb from './components/breadcrumb'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/loader-style.css'
import './assets/css/signin.css'
import './assets/css/style.css'
import './assets/css/bootstrap.css'
import './assets/js/footable/css/footable.core.css'
import './assets/js/footable/css/footable-demos.css'
import './assets/js/footable/css/footable.standalone.css'


Vue.config.productionTip = false;

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userToken: '',
    classname:"button-bg",
    breadListState:[
      {name:'首页',path:'/'}
    ],
    pickerOptions2: {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    }
  },
  mutations:{
    changebg(state,name){
      state.classname = name
    },
    breadListMutations(getters,list){
      getters.breadListState=list;
      sessionStorage.setItem('breadListStorage',list);
    },
    breadListStateAdd(state,obj){
      state.breadListState.push(obj);
    },
    breadListStateRemove(state,num){
      state.breadListState.splice(num,state.breadListState.length-num);
    }
  },
  getters:{
    breadListState(){
      return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
    }
  }
})
Vue.use(ElementUI);
// axios.defaults.baseURL = 'http://clue.api.test';
// axios.defaults.headers.common['Authorization'] = "aaa";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const $axios = axios.create({
  //baseURL: 'http://www.yfqcy.cn',
  baseURL: 'http://clue.api.test',
  timeout: 5000,
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    console.log(JSON.parse(localStorage.getItem('userinfo'))==null)
    if(JSON.parse(localStorage.getItem('userinfo'))==null){
      return JSON.stringify(data);
    }else{
      var postdata = {data:data,token:JSON.parse(localStorage.getItem('userinfo')).token,type:1}
      return JSON.stringify(postdata);
      
    }
    
  }],
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    if(!JSON.parse(data).success){
      console.log("错误")
      Vue.prototype.$message({
        showClose: true,
        message: data,
        type: 'error'
      })
    }else{
      return JSON.parse(data).data;
    }
    
  }],
});
Vue.prototype.$ajax = $axios
Vue.prototype.confindata = config
Vue.component('public-nav', publicnav);
Vue.component('menuslider', menuslider);
Vue.component('publicsearch', publicsearch);
Vue.component('tableModel', tableModel);
Vue.component('breadcrumb', breadcrumb);
/* eslint-disable no-new */
router.beforeEach((to,from,next)=>{
  //console.log(to,!!localStorage.getItem('userinfo'))
  next()   
  
  
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App, publicnav, menuslider },
  template: '<App/>'
})
