import { DefaultSession } from 'next-auth';
import { TLoginResponse } from '@psu/entities';

// declare module 'next-auth' {
//   interface session {
//     user : {
//       id: string;
//       name: string;
//       email: string;
//       image?: string;
//       accesToken: string;
//     }
//   }
// }
type TProfile = {
  picture?: string;
};

declare module 'next-auth' {
  interface Session extends DefaultSession, TLoginResponse {}
  interface Profile extends TProfile {}
  interface AdapterUser extends TLoginResponse {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TLoginResponse {}
}

declare module 'next-auth/core/types' {
  interface User extends Partial<TLoginResponse> {}
  interface AdapterUser extends Partial<TLoginResponse> {}
}