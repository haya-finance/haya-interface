// import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// project import
import Search from './Search';
// import Message from './Message';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';
// import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';

// type
import { LAYOUT_CONST } from 'types/config';
import { useMemo } from 'react';
import Localization from './Localization';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const localization = useMemo(() => <Localization />, [i18n]);

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}

      {/* {!downLG && megaMenu} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {localization}

      {/* <Notification /> */}
      {/* <Message /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
