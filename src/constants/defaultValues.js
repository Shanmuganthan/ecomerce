export const  UserRole = {
  Admin: 'admin',
  Editor: 'manager',
};

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },

];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const adminRoot = '/app';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const servicePath = 'https://api.coloredstrategies.com';
const IMAGE_PATH = 'public/img';
export const IMAGE_URL = `${process.env.REACT_APP_BE_END_POINT}${IMAGE_PATH}`;

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];


