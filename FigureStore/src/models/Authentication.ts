export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string | null;
    role: string;
    defaultAddress: string | null;
    enabled: boolean;
    username: string;
    authorities: { authority: string }[];
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}
  
export interface AuthResponse {
    authenticationDTO: {
      token: string;
      message: string;
    };
    user: User;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}