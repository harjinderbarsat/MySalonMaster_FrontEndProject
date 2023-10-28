// Sidebar route metadata
export interface EmployeeRouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu : EmployeeRouteInfo[];
    visibility: boolean;  
}
