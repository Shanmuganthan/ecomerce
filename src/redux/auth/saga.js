import { put, takeEvery ,call,all} from 'redux-saga/effects';
import { getCurrentLoginUser } from 'services/auth';
import { APP_LOAD } from 'redux/contants';
import { setCurrentUser } from 'helpers/Utils';
import { loginUserSuccess } from './actions';



function* initinalAppLoad(){
  try{
  const res = yield call(getCurrentLoginUser);
  yield put(loginUserSuccess(res.data));
  setCurrentUser(res.data.data)
  }catch(err){
   console.log(err)
  }
}


export function* AppLoad(){
  yield takeEvery(APP_LOAD, initinalAppLoad);
}

export default function* rootSaga() {
 yield all([AppLoad()
 ])
}
