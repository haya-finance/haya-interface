
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Stack, Typography } from '@mui/material';
import OneTokenList from './onetokenList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: '600px',
    padding: '20px 20px',
    borderRadius: '20px',


  },
  '& .MuiDialogContent-root': {
    padding: 0
  },
  '& .MuiDialogActions-root': {
    padding: 0
  }

}));

interface Props {
  open: boolean;
  handleClose: () => void;
  handleListClose: (value: string) => void;
  data: any[];
  windowWidth: number

}

export default function SelectAddOneToken({ open, handleClose, handleListClose, data, windowWidth }: Props) {
  return (
    <>
      {
        windowWidth >= 600 ? (
          <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="10px">
              <Typography sx={{ color: "#000000", fontSize: '18px', fontWeight: 600 }}>
                Select a Token
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ color: "#9b9b9b" }}

              >
                <CloseIcon />
              </IconButton>
            </Stack>

            <DialogContent>
              <Stack direction="row" justifyContent="space-between" sx={{ p: '9px 20px', mb: '10px' }}>
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600 }} color="#9b9b9b">
                  Token
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600 }} color="#9b9b9b">
                  My balance
                </Typography>

              </Stack>
              <OneTokenList windowWidth={windowWidth} onClose={handleListClose} data={data} />
            </DialogContent>
          </BootstrapDialog>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" pb="10px">
                <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 600 }}>
                  Select a Token
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{ color: "#9b9b9b" }}

                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ p: '9px 20px' }}>
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600 }} color="#9b9b9b">
                  Token
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600 }} color="#9b9b9b">
                  My balance
                </Typography>

              </Stack>
              <OneTokenList windowWidth={windowWidth} onClose={handleListClose} data={data} />
            </Box>
          </Drawer>


        )
      }

    </>
  );
}
