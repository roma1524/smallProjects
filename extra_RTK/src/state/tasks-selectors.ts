import {AppRootStateType} from './store';
import {TasksStateType} from './tasks-reducer';

export const selectTasks = (state: AppRootStateType): TasksStateType => state.tasks