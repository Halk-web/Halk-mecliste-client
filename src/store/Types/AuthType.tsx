  import { ReactElement } from 'react';

  // ==============================|| TYPES - AUTH  ||============================== //

  export type GuardProps = {
    children: ReactElement | null;
  };

  export type ProfileProps={
    id:string;
    profile_img?:string;
    gender?:string;
    politicalView:string;
    city?:string;
    party?:string;
  }

  export type UserProfile = {
    id?: string;
    username?: string;
    email?:string;
    numberOfPosts?:number;
    profile:ProfileProps;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
  };

  export interface AuthProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null;
    findUser?:null;
    token?: string | null;
    email?: string | null;
    verified?: boolean | null;
  }

  export interface AuthActionProps {
    type: string;
    payload?: AuthProps;
  }

  export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
  }

  export interface JWTDataProps {
    userId: string;
  }

  export type JWTContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    token?: string | null;
    email?: string | null;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username:string,city:string,party:string,politicalView:string,gender:string) => Promise<void>;
    findOneById:(userId:string)=>Promise<UserProfile|null>;
    updateOneUserById:(id:string,userData:any)=>Promise<any|null>;
    findAll:()=>Promise<UserProfile[]|null>;
    forgotPassword: (email: string) => Promise<[boolean, string?]>;
    resetPassword: (email: string) => Promise<[boolean, string?]>;
    updateProfile: VoidFunction;
    verifyCode: (code: string) => Promise<[boolean, string?]>;
  };



