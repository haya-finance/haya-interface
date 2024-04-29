// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { BsFillFuelPumpDieselFill, BsDisc, BsBootstrapReboot } from 'react-icons/bs';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';

// type
import { NavItemType } from 'types/menu';
// import { isAdmin } from 'utils/token';
// import { getData } from 'store/reducers/trade';

// icons
const icons = {
  BsFillFuelPumpDieselFill,
  BsDisc,
  MdOutlineAccountCircle,
  BsBootstrapReboot
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

// let router_list: any = []
// const data = getProduct().product
// for (let i = 0; i < data.length; i++) {
//   router_list.push({
//     id: 'product_' + data[i].id,
//     title: data[i].name,
//     type: 'item',
//     icon: icons.FileProtectOutlined,
//     url: '/product/product_' + data[i].id
//   })
// }

const other: NavItemType = {
  id: 'other',
  title: '',
  type: 'group',
  children: [
    {
      id: 'debot_home',
      title: <FormattedMessage id="title-home" />,
      type: 'item',
      icon: icons.MdOutlineAccountCircle,
      url: '/debot/home'
    },
    {
      id: 'debot_bots',
      title: <FormattedMessage id="titleyar-bots" />,
      type: 'item',
      icon: icons.BsDisc,
      url: '/debot/bots'
      // disabled: !isAdmin()
    }
  ]
};

const TextOther = () => {
  return <></>;
};

export { other, TextOther };
