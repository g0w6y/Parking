
export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  department: string;
  semester: string;
  registeredAt: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: number;
}

export enum AppRoute {
  HOME = 'home',
  REGISTER = 'register',
  ADMIN_LOGIN = 'admin-login',
  ADMIN_DASHBOARD = 'admin-dashboard'
}
