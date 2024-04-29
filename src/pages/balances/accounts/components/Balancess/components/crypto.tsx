
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider, ListItem, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
// import BlackIcon from 'assets/icons/black/crypto';
import CryptoColorIcon from 'assets/icons/color/crypto';

export default function CryptoList() {

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <FormattedMessage id="crypto" />
        </ListSubheader>
      }
    >
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>12,5420</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            {/* <BsFillDatabaseFill size={20} /> */}
            <CryptoColorIcon name="BTC" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>BTC</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}>Bitcoin</Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>2,000.2410</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            {/* <BsFillDatabaseFill size={20} /> */}
            <CryptoColorIcon name="ETH" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>ETH</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}>Ethereum</Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>24,001.1200</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            {/* <BsFillDatabaseFill size={20} /> */}
            <CryptoColorIcon name="XRP" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>XRP</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}>XRP Ledger</Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>2,502,2403</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            {/* <BsFillDatabaseFill size={20} /> */}
            <CryptoColorIcon name="SOL" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>SOL</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}>Solana</Typography>
        </ListItem>
      </ListItem>
    </List>
  );
}