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
    affiliation: string;
    officeName: string;
    officeAddress: string;
    department: string;
    positionTitle: string;
  }
  
  export interface UserState {
    message: string;
    user: User;
  }

  export interface SignupState {
    id?: number;
    email: string;
    password: string;
    first_name: string;
    lastname: string;
    sex: string;
    official_id_number: string;
    contactNumber: string;
    municipality: string;
    affiliation: string;
    officeName: string;
    officeAddress: string;
    department: string;
    positionTitle: string;
  }