import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemeService } from '../../services/theme/theme.service';
import { addDarkThemeStart, addDarkThemeSuccess, addLightThemeStart,
  addLightThemeSuccess, getThemeStart, getThemeSuccess } from '../actions/theme.actions';
import { map } from 'rxjs';

@Injectable()
export class ThemeEffects {
  constructor(
    private actions$: Actions,
    private themeService: ThemeService
  ) {}

  addDarkTheme$ = createEffect(() => this.actions$.pipe(
    ofType(addDarkThemeStart),
    map(() => {
      this.themeService.addDarkTheme();
      return addDarkThemeSuccess();
    }),
  ))

  addLightTheme$ = createEffect(() => this.actions$.pipe(
    ofType(addLightThemeStart),
    map(() => {
      this.themeService.addLightTheme();
      return addLightThemeSuccess()
    }),
  ))
  
  getTheme$ = createEffect(() => this.actions$.pipe(
    ofType(getThemeStart),
    map(() => {
      const theme = this.themeService.getTheme();
      return getThemeSuccess({ theme });
    })
  ));
}
