// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { TextOther } from 'menu-items/other';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
    <TextOther />
  </SimpleBar>
);

export default DrawerContent;
