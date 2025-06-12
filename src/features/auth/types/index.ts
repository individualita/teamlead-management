/*
 * Type for Firebase auth functions that take auth, email, password 
 * and return UserCredential promise.
*/


import { Auth, UserCredential } from 'firebase/auth';

export type AuthActionType =  (auth: Auth, email:string, password:string) => Promise<UserCredential>;
