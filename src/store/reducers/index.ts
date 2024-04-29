// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';

import login from './login';

import logout from './logout';
import account from './account';
import addAccounts from './addAccounts';
import checkInvitation from './checkInvitation';


// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  login,
  logout,
  account,
  addAccounts,
  checkInvitation

});

export default reducers;
