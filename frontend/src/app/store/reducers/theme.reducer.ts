import { createReducer, on } from "@ngrx/store";
import { addDarkThemeSuccess, addLightThemeSuccess, getThemeSuccess } from "../actions/theme.actions";
import { initialThemeState } from "../state/theme.state";

export const ThemeReducer = createReducer(
  initialThemeState,
  on(addDarkThemeSuccess, (state) => {
    return {
      ...state,
      theme: 'light'
    }
  }),
  on(addLightThemeSuccess, (state) => {
    return {
      ...state,
      theme: 'dark'
    }
  }),
  on(getThemeSuccess, (state, action) => {
    return {
      ...state,
      theme: action.theme
    }
  })
)
