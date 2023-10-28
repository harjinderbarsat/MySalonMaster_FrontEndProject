// Sidebar route metadata
export interface BranchRouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu : BranchRouteInfo[];
    visibility: boolean;  
    isAdmin:boolean
}
