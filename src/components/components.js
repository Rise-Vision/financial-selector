import angular from "angular";
import Home from "./home/home";
import About from "./about/about";
import Displays from "./displays/displays";
import DisplayUsers from "./displayUsers";
import Profile from "./profile/profile";
import Search from "./search/search";
import Auth from "./auth/auth";
import Layout from "./layout/layout";
import FinancialLists from "./financialLists/financialLists";

const componentModule = angular.module( "app.components", [
  //one per line, for easier merge conflict resolution
  Layout,
  Home,
  About,
  Displays,
  DisplayUsers,
  Profile,
  Search,
  Auth,
  FinancialLists,
] ).name;

export default
componentModule;
