import { createAction, props } from "@ngrx/store";

export const addDarkTheme = createAction("[Theme] Add Dark Theme");
export const addLightTheme = createAction("[Theme] Add Light Theme");
export const getTheme = createAction(
  "[Theme] Get theme",
  props<{theme: string}>()
)
