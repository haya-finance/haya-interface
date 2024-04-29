
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';

import { Divider, ListItem, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import ColorFiatIcon from 'assets/icons/color/fiat';

export default function FiatList() {

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <FormattedMessage id="fiat" />
        </ListSubheader>
      }
    >
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>12,000</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            <ColorFiatIcon name="USD" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>USD</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}><FormattedMessage id="usd" /></Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>12,000</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            <ColorFiatIcon name="EUR" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>EUR</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}><FormattedMessage id="eur" /></Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>12,000</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            <ColorFiatIcon name="GBP" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>GBP</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}><FormattedMessage id="gbp" /></Typography>
        </ListItem>
      </ListItem>
      <Divider variant="middle" />
      <ListItem
        secondaryAction={
          <Typography variant="h6" sx={{ color: '#64605f' }}>12,000</Typography>
        }
        disablePadding
      >
        <ListItem >
          <ListItemIcon>
            <ColorFiatIcon name="JPY" size={20} />
          </ListItemIcon>
          <Typography variant="h5" sx={{ color: '#000', ml: 0.5 }}>JPY</Typography>
          <Typography variant="h6" sx={{ color: '#64605f', ml: 1 }}><FormattedMessage id="jpy" /></Typography>
        </ListItem>
      </ListItem>
    </List>
  );
}