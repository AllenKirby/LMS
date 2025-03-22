export interface User {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    sex: string;
    birth_date: string;
    contact: string;
    address: string;
  }
  
  export interface UserState {
    message: string;
    user: User;
    access_token?: string;
    csrf_token?: string;
    expiration: Date;
  }