import { createReducer, on } from "@ngrx/store";
import { addDarkTheme, addLightTheme, getTheme } from "../actions/theme.actions";
import { initialThemeState } from "../state/theme.state";

export const ThemeReducer = createReducer(
  initialThemeState,
)
