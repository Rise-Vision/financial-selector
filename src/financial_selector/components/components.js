import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import Search from './search/search';
import Auth from './auth/auth';
import Layout from './layout/layout';

const componentModule = angular.module('app.components', [
  Layout,
  Home,
  About,
  Profile,
  Search,
  Auth,
])

.name;

export default componentModule;
