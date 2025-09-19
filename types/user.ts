export type User = {
  email: string;
  username: string; 
  avatar: string;
}

/* export type CheckSessionRequest = {
  success: boolean;
}; */

export type RegisterData = {
  email: string;
  password: string;
}

export type LoginData = {
  email: string;
  password: string;
}