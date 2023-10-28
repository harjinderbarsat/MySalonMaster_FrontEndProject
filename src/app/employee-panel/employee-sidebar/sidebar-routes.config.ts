import { EmployeeRouteInfo } from "./employee-route-info";

 
//Sidebar menu Routes and data
export const Employee_ROUTES: EmployeeRouteInfo[] = [
  { path: '/employee/dashboard', title: 'Dashboard', icon: 'fa fa-tachometer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [],  visibility:true   },
  { path: '/employee/attendance', title: 'Attendance', icon: 'fa fa-clock-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility: true},
  { path: '/employee/profile', title: 'Profile', icon: 'fa fa-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], visibility:true },
  { path: '/employee/docuemnts', title: 'Documents', icon: 'fa fa-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [],  visibility:true   },
  { path: '/employee/weekly-schedule', title: 'Weekly Schedule', icon: 'fa fa-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [],  visibility:true   },
  { path: '/employee/leaves', title: 'Leaves', icon: 'fa fa-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [],  visibility:true   },
  { path: '/employee/incentive', title: 'Incentive', icon: 'fa fa-money', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [],  visibility:true   },

];
