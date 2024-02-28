import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemeService } from '../../services/theme/theme.service';
import { addDarkTheme, addLightTheme, getTheme } from '../actions/theme.actions';

@Injectable()
export class ThemeEffects {
  constructor(
    private actions$: Actions,
    private themeService: ThemeService
  ) {}

  addDarkTheme$ = createEffect(() => this.actions$.pipe(
    ofType(addDarkTheme),
    
  ))
}
