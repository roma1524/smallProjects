import {AppRootStateType} from './store';
import {TodolistType} from './todolists-reducer';

export const selectTodolists = (state: AppRootStateType): TodolistType[] => state.todolists