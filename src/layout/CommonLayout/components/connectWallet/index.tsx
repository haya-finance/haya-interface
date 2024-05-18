import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WalletList from './walletList';
import { Box, Drawer, Stack, Typography } from '@mui/material';
// import MetaMask from 'assets/wallet/metamask.png';
import { useConnect } from 'wagmi';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: '600px',
    borderRadius: '20px'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

// interface WalletProps {
//   name: any;
//   icon?: string;
//   uid: string;
//   connector: any;
// }

interface Props {
  open: boolean;
  handleClose: () => void;
  windowWidth: number
}

export default function ConnectWallet({ open, handleClose, windowWidth }: Props) {
  const { connectors, connect } = useConnect();

  // console.log("钱包数组", connectors)

  const [installedWallets] = React.useMemo(() => {
    let installed: any[] = [];

    for (let i = 0; i < connectors.length - 1; i++) {
      if (connectors[i].type !== "injected" || connectors[i].icon == undefined) {
        // installed.push({
        //   name: connectors[i].name,
        //   icon: `assets/wallet/${connectors[i].name}.png`,
        //   uid: connectors[i].uid,
        //   connector: connectors[i]
        // })
        installed.push(connectors[i])
      }

    }
    return [installed];
  }, [connectors]);

  const handleWalletClick = (connector: any) => {

    const res = connect({ connector });
    console.log('res', res)
    // console.log(connect, connectors);
    handleClose();
  };

  return (
    // <React.Fragment>
    <>
      {
        windowWidth >= 600 ? (
          <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" sx={{ width: '100%' }}>
            <Box sx={{ backgroundColor: '#191a1a', borderBottom: '1px solid #1e1f1f' }}>
              <DialogTitle sx={{ color: '#fff' }} id="customized-dialog-title">
                Connect wallet
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent sx={{ width: '100%', backgroundColor: '#191a1a', p: '1px', pr: '10px', pl: '10px' }}>
              <WalletList handleClick={handleWalletClick} wallets={installedWallets} />
            </DialogContent>
          </BootstrapDialog>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#191a1a', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ backgroundColor: '#191a1a', borderBottom: '1px solid #1e1f1f' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="10px">
                  <Typography sx={{ color: "#fff", fontSize: '17px', fontWeight: 700 }}>
                    Connect wallet
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ color: "#9b9b9b" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Box>
              <Box sx={{ width: '100%', backgroundColor: '#191a1a', p: '9px 20px' }}>
                <WalletList handleClick={handleWalletClick} wallets={installedWallets} />
              </Box>

            </Box>
          </Drawer>


        )
      }
    </>
    // </React.Fragment>
  );
}
