import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
   
  },
  {
    id: 'products',
    icon: 'iconsminds-shop-4',
    label: 'menu.products',
    to: `${adminRoot}/product/default`,
   
  },   
  {
    id: 'promotions',
    icon: 'simple-icon-present',
    label: 'menu.promotions',
    to: `${adminRoot}/promotions/default`,
   
  },   
  {
    id: "brand",
    icon: 'iconsminds-apple',
    label: 'menu.brand',
    to: '/app/dashboards/brands',
    newWindow: false,
  },
  
          {
            id: "productCategory",
            icon: 'simple-icon-settings',
            label: 'menu.product-category',
            to: '/app/dashboards/product-category',
            newWindow: false,
          },  
          {
            id: "category",
            icon: 'iconsminds-mine',
            label: 'menu.category',
            to: '/app/dashboards/category',
            newWindow: false,
          },
          {
            id: "subCategory",
            icon: 'iconsminds-scissor',
            label: 'menu.sub-category',
            to: '/app/dashboards/sub-category',
            newWindow: false,
          },
          {
            id: "specification",
            icon: 'iconsminds-computer',
            label: 'menu.technical-specification',
            to: '/app/dashboards/technical-specification',
            newWindow: false,
          },
          {
            id: "settings",
            icon: 'iconsminds-security-settings',
            label: 'menu.colors-specification',
            to: '/app/dashboards/color-specification',
            newWindow: false,
          },
    
  
 
];
export default data;
