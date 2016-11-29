import angular from "angular";
import Home from "./home/home";
import About from "./about/about";
import Displays from "./displays/displays";
import Profile from "./profile/profile";
import Search from "./search/search";
import Auth from "./auth/auth";
import Layout from "./layout/layout";

const componentModule = angular.module( "app.components", [
  Layout, Home, About, Displays, Profile, Search, Auth, ] )

  .name;

export default
componentModule;
