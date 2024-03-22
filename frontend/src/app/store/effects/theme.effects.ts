import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemeService } from '../../services/theme/theme.service';
import { addDarkTheme, addLightTheme, getTheme } from '../actions/theme.actions';
import { catchError, exhaustMap, map, throwError } from 'rxjs';

@Injectable()
export class ThemeEffects {
  constructor(
    private actions$: Actions,
    private themeService: ThemeService
  ) {}

  addDarkTheme$ = createEffect(() => this.actions$.pipe(
    ofType(addDarkTheme),
    map(() => {
      this.themeService.addDarkTheme();
      return addDarkTheme({theme: 'dark'})
    }),
  ))

  addLightTheme$ = createEffect(() => this.actions$.pipe(
    ofType(addLightTheme),
    map(() => {
      this.themeService.addLightTheme();
      return addDarkTheme({theme: 'light'})
    }),
  ))
  
  getTheme$ = createEffect(() => this.actions$.pipe(
    ofType(getTheme),
    map(() => {
      const theme = this.themeService.getTheme();
      return getTheme({ theme });
    })
  ));
}
