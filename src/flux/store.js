import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
// import {getSuperAdminNavItems, getDietitianNavItems, getPatientNavItems } from "../data/sidebar-nav-items";
import {getAdminNavItems, getPatientNavItems, getDietitianNavItems } from '../data/sidebar-nav-items';

// let role = localStorage.getItem('role');

let _store = {
  menuVisible: false,
  navItems: getAdminNavItems(),
  dietitianNavItems: getDietitianNavItems(),
  patientNavItems: getPatientNavItems(),
  // formItems: [],
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    // this.addFormItem = this.addFormItem.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
    // Dispatcher.register(this.addFormItem.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  };

  // addFormItem(actionType, payload) {
  //   // _store.formItems = [..._store.formItems, payload];
  //   // this.emit(Constants.ADD_ITEM);
  //   switch (actionType) {
  //     case Constants.ADD_ITEM:
  //       _store.formItems = [..._store.formItems, payload];
  //       // this.emit(Constants.ADD_ITEM);
  //       break;
  //     default:
  //   }
  // }

  // // edit
  // getFormItems() {
  //   return _store.formItems;
  // }
  // //

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getDietitianSidebarItems() {
    return _store.dietitianNavItems;
  }

  getPatientSidebarItems() {
    return _store.patientNavItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
