import { createAction, props } from "@ngrx/store";
import { LoginCredentials, SignUpCredentials } from "../../interfaces/auth.interface";

export const loginStart = createAction("[Auth] Login start", 
  props<{credentials: LoginCredentials}>()
);

export const loginSuccess = createAction("[Auth] Login success");

export const signUpStart = createAction("[Auth] Sign Up start", 
  props<{credentials: SignUpCredentials}>()
);

export const signUpSuccess = createAction("[Auth] Sign Up success");
