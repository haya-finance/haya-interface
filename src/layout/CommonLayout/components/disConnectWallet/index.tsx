

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Drawer, Stack, Typography } from '@mui/material';
import { useAccount, useDisconnect } from 'wagmi';
import { TbCopy } from "react-icons/tb";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useState } from 'react';
import { MdCheck } from "react-icons/md";
const avatarImage = require.context('assets/wallet', true);

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


interface Props {
  open: boolean;
  handleClose: () => void;
  windowWidth: number
}

export default function DisConnectWallet({ open, handleClose, windowWidth }: Props) {
  const { disconnect } = useDisconnect();

  const { address, connector } = useAccount();
  const [copy, setCopy] = useState(false)

  // const CopyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   // width: '100%',
  //   color: '#fff',
  //   backgroundColor: '#242d2f',
  //   '&:hover': {
  //     backgroundColor: '#F8FAFF',
  //     transform: 'scale(1.025)'
  //   },
  //   "&:active": {
  //     transform: 'scale(1)'
  //   }
  // }));



  const OnDisconnect = () => {

    disconnect({ connector })
  }

  const onCopy = () => {
    // const textArea = document.createElement('textarea');
    // textArea.value = address as string
    // document.body.appendChild(textArea);
    // textArea.select();
    // document.execCommand('copy')
    // document.body.removeChild(textArea);
    navigator.clipboard.writeText(address as string)
    setCopy(true)

    setTimeout(() => {
      setCopy(false)

    }, 2000)

  }

  return (
    // <React.Fragment>
    <>
      {
        windowWidth >= 600 ? (
          <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" sx={{ width: '100%' }}>
            <Box sx={{ backgroundColor: '#0f1717', borderBottom: '1px solid #1e1f1f', width: '100%' }}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  right: 12,
                  top: 12,
                  color: '#8c97a4',
                  borderRadius: '10px',
                  backgroundColor: '#253333',
                  "&:hover": {
                    backgroundColor: '#253333',
                    transform: 'scale(1.1)'

                  }
                }}
              >
                <CloseIcon sx={{ fontSize: '0.8rem', fontWeight: 700 }} />
              </IconButton>
              <Stack alignItems="center" justifyContent="center" mt="20px">
                <Avatar src={avatarImage(`./${connector?.name}.png`)} sx={{ width: '2.25rem', height: '2.25rem' }} />
                <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#fff">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" p='10px' spacing={2} pt="20px" pb="15px">
                <Box component="button" sx={{
                  width: '100%',
                  color: '#fff',
                  padding: '4px 0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#242d2f',
                  '&:hover': {
                    backgroundColor: '#4c4e51',
                    transform: 'scale(1.025)'
                  },
                  "&:active": {
                    transform: 'scale(1)'
                  }
                }} onClick={onCopy}>
                  <Stack alignItems="center" justifyContent="center">
                    {
                      !copy ? (
                        <>
                          <TbCopy color='#fff' />
                          <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                            复制地址
                          </Typography>
                        </>

                      ) : (
                        <>
                          <MdCheck color='#fff' />
                          <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                            已复制
                          </Typography>
                        </>

                      )
                    }

                  </Stack>


                </Box>
                <Box component="button" sx={{
                  width: '100%',
                  color: '#fff',
                  backgroundColor: '#242d2f',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#4c4e51',
                    transform: 'scale(1.025)'
                  },
                  "&:active": {
                    transform: 'scale(1)'
                  }
                }} onClick={OnDisconnect}>
                  <Stack alignItems="center" justifyContent="center" >
                    <HiArrowRightOnRectangle color='#fff' />
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                      断开连接
                    </Typography>

                  </Stack>


                </Box>


              </Stack>
            </Box>
          </BootstrapDialog>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#0f1717', left: '5px', right: '5px', borderRadius: '10px 10px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '10px 10px 20px 10px' }}>
              <Box sx={{ backgroundColor: '#0f1717', borderBottom: '1px solid #1e1f1f', width: '100%' }}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    right: 12,
                    top: 12,
                    color: '#8c97a4',
                    borderRadius: '10px',
                    backgroundColor: '#253333',
                    "&:hover": {
                      backgroundColor: '#253333',
                      transform: 'scale(1.1)'

                    }
                  }}
                >
                  <CloseIcon sx={{ fontSize: '0.8rem', fontWeight: 700 }} />
                </IconButton>
                <Stack alignItems="center" justifyContent="center" mt="20px">
                  <Avatar src={avatarImage(`./${connector?.name}.png`)} sx={{ width: '2.25rem', height: '2.25rem' }} />
                  <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#fff">
                    {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" p='10px' spacing={2} pt="20px" pb="15px">
                  <Box component="button" sx={{
                    width: '100%',
                    color: '#fff',
                    padding: '4px 0',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#242d2f',
                    '&:hover': {
                      backgroundColor: '#4c4e51',
                      transform: 'scale(1.025)'
                    },
                    "&:active": {
                      transform: 'scale(1)'
                    }
                  }} onClick={onCopy}>
                    <Stack alignItems="center" justifyContent="center">
                      {
                        !copy ? (
                          <>
                            <TbCopy color='#fff' />
                            <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                              复制地址
                            </Typography>
                          </>

                        ) : (
                          <>
                            <MdCheck color='#fff' />
                            <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                              已复制
                            </Typography>
                          </>

                        )
                      }

                    </Stack>


                  </Box>
                  <Box component="button" sx={{
                    width: '100%',
                    color: '#fff',
                    backgroundColor: '#242d2f',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#4c4e51',
                      transform: 'scale(1.025)'
                    },
                    "&:active": {
                      transform: 'scale(1)'
                    }
                  }} onClick={OnDisconnect}>
                    <Stack alignItems="center" justifyContent="center" >
                      <HiArrowRightOnRectangle color='#fff' />
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#fff">
                        断开连接
                      </Typography>

                    </Stack>


                  </Box>


                </Stack>
              </Box>
            </Box>
          </Drawer>



        )
      }
    </>
  );
}
