import { APP_LOAD,APP_LOADED , LOG_OUT, REDIRECT, SET_IS_AUTHENTICATED } from "./contants";


const defaultState = {
    appName: 'Inventory Management',
    token: null,
     appLoaded : false,
  };

export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
        return {
          ...state,
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        };
      
        case SET_IS_AUTHENTICATED:
            return { ...state,  isAuthenticated : action.payload  };
    case REDIRECT:
        return { ...state, redirectTo: null  };
        case APP_LOADED:
        return { ...state, redirectTo: null, appLoaded : true , isAuthenticated : action.payload?.isAuthenticated };
      case LOG_OUT:
        return { ...state, redirectTo: '/', token: null, currentUser: null };
        default:
            return { ...state };
}
}