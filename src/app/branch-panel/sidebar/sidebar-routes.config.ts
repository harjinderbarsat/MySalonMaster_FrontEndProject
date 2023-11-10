import { BranchRouteInfo } from "./route-info";

 
//Sidebar menu Routes and data
export const BRANCH_PANEL_ROUTES: BranchRouteInfo[] = [
  { path: '/branch/dashboard', title: 'Dashboard', icon: 'fa fa-tachometer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  { path: '/branch/weekly-schedule', title: 'Calendar', icon: 'fa fa-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  // { path: '/branch/attendance', title: 'Attendance', icon: 'fa fa-clock-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  // { path: '/walkIn/bookAppointment', title: 'Walk-In', icon: 'fa fa-check', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },

  {
    path: '', title: 'Appointments', icon: 'fa fa-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/branch/upcoming-appointments', title: 'Upcoming', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/branch/in-progress-appointments', title: 'In Progress', icon: 'fa fa-spinner', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/branch/historic-appointments', title: 'History', icon: 'fa fa-history', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },

    ], visibility: true, isAdmin: false
  }, 
  // {
  //   path: '', title: 'Sale', icon: 'fa fa-money', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
  //     { path: '/branch/daily-sale', title: 'Daily Sale', icon: 'fa fa-industry ', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
  //     { path: '/branch/appointments-static', title: 'Service Sales', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
  //     { path: '/branch/loylity-points', title: 'Loylity Point', icon: 'fa fa-gift', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true }
  //   ], visibility: true, isAdmin: true
  // },
  { path: '/branch/customer', title: 'Clients', icon: 'fa fa-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },

  // {
  //   path: '', title: 'Client', icon: 'fa fa-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
  //   submenu: [
  //     // { path: '/branch/client-Reviews', title: ' Reviews', icon: 'fa fa-star', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
  //   ], visibility: true, isAdmin: true
  // }, 
  {
    path: '', title: 'Products', icon: 'fa fa-houzz', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/branch/product-sale', title: 'New Sale', icon: 'fa fa-tachometer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      // { path: '/branch/product-sale-history', title: 'Sale History', icon: 'fa fa-history', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/branch/products', title: 'All Products', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/branch/products-Categoty', title: 'All Categories', icon: 'fa fa-list-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
    ], visibility: true, isAdmin: false
  },
  {
    path: '', title: 'Services', icon: 'fa fa-wrench', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/branch/serviceCategory', title: 'All Categories', icon: 'fa fa-list-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/branch/serviceList', title: 'All Service', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      // { path: '/branch/defaultServices', title: 'Load Default', icon: 'fa fa-play', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
    ], visibility: true, isAdmin: false
  },
  // { path: '/branch/profile', title: 'Branch Profile', icon: 'fa fa-industry', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  { path: '/branch/support', title: 'Help', icon: 'fa ft-phone', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  
];
