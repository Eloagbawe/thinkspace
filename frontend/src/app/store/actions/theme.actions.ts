import { createAction, props } from "@ngrx/store";

export const addDarkThemeStart = createAction("[Theme] Add Dark Theme Start");
export const addDarkThemeSuccess = createAction("[Theme] Add Dark Theme Success");

export const addLightThemeStart = createAction("[Theme] Add Light Theme Start");
export const addLightThemeSuccess = createAction("[Theme] Add Light Theme Success");
export const getThemeStart = createAction("[Theme] Get Theme Start");
export const getThemeSuccess = createAction(
  "[Theme] [Theme] Get Theme Success",
  props<{theme: string}>()
);
