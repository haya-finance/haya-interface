import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


const avatarImage = require.context('assets/wallet', true);

// interface WalletProps {
//   name: any;
//   icon?: string;
//   uid: string;
//   connector: any;
// }

interface Props {
  handleClick: (connector: any) => void;
  wallets: any[];
}

export default function WalletList({ handleClick, wallets }: Props) {
  // console.log('111111111111111111', wallets)
  return (
    <Box sx={{ width: '100%' }}>
      <nav aria-label="main mailbox folders" style={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>
          {wallets.map((item) => {
            return (
              <ListItem
                sx={{ backgroundColor: '#1e1f1f', mb: 1, width: '100%', borderRadius: '0.5rem', '&:hover': { backgroundColor: "#2d2d2d" }, '&:active': { backgroundColor: "#2d2d2d" }, '&:focus': { backgroundColor: "#2d2d2d" } }}
                disablePadding
                key={item.uid}
              >
                <ListItemButton onClick={() => handleClick(item)} sx={{ width: '100%', pr: '11.5rem' }}>
                  <ListItemIcon sx={{ mr: 2, borderRadius: '2.5rem' }}>
                    <Avatar src={avatarImage(`./${item.name}.png`)} sx={{ width: '2.25rem', height: '2.25rem' }} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ color: '#fff' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
