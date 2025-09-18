export type User = {
  id: string;
  email: string;
  username: string; 
  avatar: string;
}

export type CheckSessionRequest = {
  success: boolean;
};

/* export interface RegisterData {
  email: string;
  password: string;
} */

export type RegisterData = {
  email: string;
  password: string;
}

export type LoginData = {
  email: string;
  password: string;
}