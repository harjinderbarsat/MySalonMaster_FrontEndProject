import { RouteInfo } from "./route-info";

//Sidebar menu Routes and data
export const BRANCH_ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'fa fa-tachometer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  { path: '/admin/weekly-schedule', title: 'Calendar', icon: 'fa fa-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  { path: '/admin/attendance', title: 'Attendance', icon: 'fa fa-clock-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  {
    path: '', title: 'Appointments', icon: 'fa fa-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/upcoming-appointments', title: 'Upcoming', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/in-progress-appointments', title: 'In Progress', icon: 'fa fa-spinner', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/historic-appointments', title: 'History', icon: 'fa fa-history', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },

    ], visibility: true, isAdmin: false
  }, {
    path: '', title: 'Sale', icon: 'fa fa-money', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/admin/daily-sale', title: 'Daily Sale', icon: 'fa fa-industry ', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
      { path: '/admin/appointments-static', title: 'Service Sales', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
      // { path: '/admin/loylity-points', title: 'Loylity Point', icon: 'fa fa-gift', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true }
    ], visibility: true, isAdmin: true
  },
  {
    path: '', title: 'Client', icon: 'fa fa-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/admin/customer', title: 'List', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/client-Reviews', title: ' Reviews', icon: 'fa fa-star', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
    ], visibility: true, isAdmin: true
  }, {
    path: '', title: 'Products', icon: 'fa fa-houzz', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/admin/product-sale', title: 'New Sale', icon: 'fa fa-tachometer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/product-sale-history', title: 'Sale History', icon: 'fa fa-history', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/products', title: 'All Products', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/products-Categoty', title: 'All Categories', icon: 'fa fa-list-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
    ], visibility: true, isAdmin: false
  },
  {
    path: '', title: 'Services', icon: 'fa fa-wrench', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/admin/serviceCategory', title: 'All Categories', icon: 'fa fa-list-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/serviceList', title: 'All Service', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/defaultServices', title: 'Load Default', icon: 'fa fa-play', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
    ], visibility: true, isAdmin: false
  },
  {
    path: '', title: 'Admin', icon: 'ft-settings', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      // { path: '/admin/profile', title: 'My Profile', icon: 'fa fa-user ', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
      { path: '/admin/storeList', title: 'Branchs', icon: 'fa fa-industry ', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
      { path: '/admin/employees', title: 'Team Members', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: true },
      // { path: '/admin/weekly-schedule', title: 'Weekly Roster', icon: 'fa fa-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      // { path: '/admin/incentive', title: 'Incentive', icon: 'fa fa-gift', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
      { path: '/admin/leaves', title: 'Leaves', icon: 'fa fa-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
    ], visibility: true, isAdmin: true
  },
  { path: '/admin/settings', title: 'Settings', icon: 'fa ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },

  // { path: '/admin/marketing', title: 'Marketing', icon: 'fa fa-bullhorn', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  // { path: '/admin/reports', title: 'Reports', icon: 'fa fa-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  // { path: '/admin/help', title: 'Help', icon: 'fa fa-question-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
  // { path: '/admin/support', title: 'Support', icon: 'fa fa-phone', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true, isAdmin: false },
];
