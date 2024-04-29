
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, Stack, Typography } from '@mui/material';
import OneTokenList from './onetokenList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: '100%'


  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
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
            <DialogTitle sx={{ m: 0, p: 2, pr: 4, fontWeight: 700 }} id="customized-dialog-title">
              Select a Token
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

            <DialogContent>
              <Stack direction="row" justifyContent="space-between" sx={{ pr: 2, pl: 2 }}>
                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                  Token
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                  My balance
                </Typography>

              </Stack>
              <OneTokenList onClose={handleListClose} data={data} />
            </DialogContent>
          </BootstrapDialog>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleClose} sx={{ left: '5px', right: '5px', borderRadius: '10px 10px 0 0' }}>
            <Box sx={{ width: 'auto', padding: '10px 10px 20px 10px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" pb="10px">
                <Typography sx={{ color: "#464646", fontSize: '17px', fontWeight: 400 }}>
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
              <Stack direction="row" justifyContent="space-between" sx={{ pr: 2, pl: 2 }}>
                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                  Token
                </Typography>
                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                  My balance
                </Typography>

              </Stack>
              <OneTokenList onClose={handleListClose} data={data} />
            </Box>
          </Drawer>


        )
      }

    </>
  );
}
