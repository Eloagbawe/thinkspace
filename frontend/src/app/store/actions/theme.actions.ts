import { createAction, props } from "@ngrx/store";

export const addDarkTheme = createAction("[Theme] Add Dark Theme",
  props<{theme: string}>()
);
export const addLightTheme = createAction("[Theme] Add Light Theme", 
  props<{theme: string}>()
);
export const getTheme = createAction(
  "[Theme] Get theme",
  props<{theme: string}>()
);
