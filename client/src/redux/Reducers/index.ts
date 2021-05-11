import { combineReducers } from 'redux';
import alert from './alertReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    alert,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;