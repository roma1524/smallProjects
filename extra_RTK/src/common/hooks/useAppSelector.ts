import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';

export const useAppSelector = useSelector.withTypes<AppRootStateType>()