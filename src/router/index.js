/* eslint-disable linebreak-style */
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import IndexView from '../views/IndexView.vue';
import LogInView from '../views/LogInView.vue';
import MainView from '../views/MainView.vue';
import Converztions from '../views/TalkingViews/ConverztionsView.vue';
import Chat from '../views/TalkingViews/ChatView.vue';
import Form from '../views/FormViews/FormView.vue';
import MoreLinks from '../views/MoreLinksViews/MoreLinksView.vue';
import HellowWorld from '../components/HelloWorld.vue';
import ProfileShow from '../views/ProfileViews/ProfileView.vue';
import Requests from '../views/Requests/RequestsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HellowWorld,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: IndexView,
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
  },
  {
    path: '/Converztions',
    name: 'Converztions',
    component: Converztions,
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/Form',
    name: 'Form',
    component: Form,
  },
  {
    path: '/MoreLinks',
    name: 'MoreLinks',
    component: MoreLinks,
  },
  {
    path: '/Profile',
    name: 'ProfileShow',
    component: ProfileShow,
  },

  {
    path: '/Requests',
    name: 'Requests',
    component: Requests,
  },
  // {
  //   path: '/',
  //   name: '',
  //   component:,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
