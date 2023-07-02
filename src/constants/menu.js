import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
   
  },
  {
    id: 'Settings',
    icon: 'iconsminds-digital-drawing',
    label: 'menu.config',
    to: '',
    subs: [
      {
        id: 'pages-master',
        label: 'menu.master',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-settings',
            label: 'menu.product-category',
            to: '/app/dashboards/product-category',
            newWindow: false,
          },  {
            icon: 'simple-icon-settings',
            label: 'menu.brand',
            to: '/app/dashboards/brands',
            newWindow: false,
          },
          {
            icon: 'simple-icon-settings',
            label: 'menu.category',
            to: '/app/dashboards/category',
            newWindow: false,
          },
          {
            icon: 'simple-icon-settings',
            label: 'menu.sub-category',
            to: '/app/dashboards/sub-category',
            newWindow: false,
          },
          {
            icon: 'simple-icon-settings',
            label: 'menu.technical-specification',
            to: '/user/login',
            newWindow: false,
          },
          {
            icon: 'simple-icon-settings',
            label: 'menu.colors-specification',
            to: '/user/login',
            newWindow: false,
          },
        
        ],
      },
    ]
  }   
];
export default data;
