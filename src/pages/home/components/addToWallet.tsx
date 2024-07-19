import { Box, Button, ButtonProps, Dialog, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TokenColorIcon from "assets/tokens";
import { H30_Address, HAYA_Address, net_id } from "config";
import copyIcon from 'assets/images/icon/Copy.svg';
import { FaRegSquareCheck } from "react-icons/fa6";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";



type TypeProps = {
  windowWidth: Number;
  open: boolean;
  handleConfirmClose: () => void;

}

const ViewDetailButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1aae70',
  userSelect: 'none',
  padding: '20px 40px',
  fontSize: '24px',
  fontWeight: 600,
  width: '100%',
  lineHeight: '32px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#19A56A',
    color: '#fff',
  },
}));







const AddToWallet = ({ windowWidth, handleConfirmClose, open }: TypeProps) => {



  const BootstrapDialog = styled(Dialog)(({ theme }) => ({

    '.MuiDialog-paper': {
      width: windowWidth >= 600 ? '600px' : `${windowWidth}px`,
      borderRadius: '20px',
      padding: windowWidth >= 600 ? '20px' : '10px 10px 20px 10px',
      margin: '10px'
    },

    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .MuiDialogActions-root': {
      padding: 0,
    },
    '& .customized-dialog-title': {
      borderBottom: 0
    }
  }));

  const { chain, address } = useAccount()
  const { switchChain } = useSwitchChain()



  const goViewDetail = async () => {

    if (chain?.id == undefined && address !== undefined) {
      switchChain({ chainId: net_id })
      try {
        // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
        const wasAdded = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
          .sendAsync([
            {
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  // The address of the token.
                  address: H30_Address,
                  // A ticker symbol or shorthand, up to 5 characters.
                  symbol: 'H20',
                  // The number of decimals in the token.
                  decimals: 18,
                  // A string URL of the token logo.
                  image: 'https://s2.loli.net/2024/07/19/my7XGptNCnDkH3Y.png'
                },
              },
            },
            {
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  // The address of the token.
                  address: HAYA_Address,
                  // A ticker symbol or shorthand, up to 5 characters.
                  symbol: 'HAYA',
                  // The number of decimals in the token.
                  decimals: 18,
                  // A string URL of the token logo.
                  image: 'https://s2.loli.net/2024/07/19/EqSMQGYLRy3kIf7.png',
                },
              },
            }
          ])

        if (wasAdded) {
          handleConfirmClose()
        } else {
          console.log("Your loss!")
        }
      } catch (error) {
        console.log(error)
      }
    } else if (chain?.id !== undefined && address !== undefined) {
      try {
        // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
        const wasAdded = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
          .sendAsync([
            {
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  // The address of the token.
                  address: H30_Address,
                  // A ticker symbol or shorthand, up to 5 characters.
                  symbol: 'H20',
                  // The number of decimals in the token.
                  decimals: 18,
                  // A string URL of the token logo.
                  image: 'https://s2.loli.net/2024/07/19/my7XGptNCnDkH3Y.png'
                },
              },
            },
            {
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  // The address of the token.
                  address: HAYA_Address,
                  // A ticker symbol or shorthand, up to 5 characters.
                  symbol: 'HAYA',
                  // The number of decimals in the token.
                  decimals: 18,
                  // A string URL of the token logo.
                  image: 'https://s2.loli.net/2024/07/19/EqSMQGYLRy3kIf7.png',
                },
              },
            }
          ])

        if (wasAdded) {
          handleConfirmClose()
        } else {
          console.log("Your loss!")
        }
      } catch (error) {
        console.log(error)
      }
    }




  }

  const [copy, setCopy] = useState(false)

  const [H20copy, setH20Copy] = useState(false)

  const onhayaCopy = () => {
    navigator.clipboard.writeText(HAYA_Address as string)

    setCopy(true)

    setTimeout(() => {
      setCopy(false)

    }, 2000)
  }

  const onh20Copy = () => {
    navigator.clipboard.writeText(H30_Address as string)

    setH20Copy(true)

    setTimeout(() => {
      setH20Copy(false)

    }, 2000)

  }

  return (
    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleConfirmClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >

              <Stack p="0 10px" mb="20px" direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ color: "#000", fontSize: '22px', fontWeight: 700, lineHeight: '24px' }}>
                  Add to Wallet
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleConfirmClose}
                  sx={{ color: "#9b9b9b" }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>

              <DialogContent >
                <Box sx={{ p: '0px 0px 20px 0px' }}>
                  <Stack sx={{ backgroundColor: '#f6f6f6', padding: '10px', borderRadius: '20px', marginBottom: '10px' }} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <TokenColorIcon name="HayaToken" size={32} />
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        HAYA
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <Typography sx={{ color: "#6f6f6f", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        {HAYA_Address?.substring(0, 6)}...{HAYA_Address?.substring(HAYA_Address.length - 6)}
                      </Typography>
                      {
                        !copy ? (
                          <IconButton sx={{ width: '24px', height: '24px' }} onClick={onhayaCopy}>
                            <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                          </IconButton>
                        ) : (
                          // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                          <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                        )
                      }
                    </Stack>


                  </Stack>
                  <Stack sx={{ backgroundColor: '#f6f6f6', padding: '10px', borderRadius: '20px', marginBottom: '10px' }} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <TokenColorIcon name="H20Token" size={32} />
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        H20
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <Typography sx={{ color: "#6f6f6f", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}
                      </Typography>
                      {
                        !H20copy ? (
                          <IconButton sx={{ width: '24px', height: '24px' }} onClick={onh20Copy}>
                            <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                          </IconButton>
                        ) : (
                          // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                          <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                        )
                      }
                    </Stack>


                  </Stack>




                </Box>
              </DialogContent>
              <DialogActions>
                <Stack width="100%">
                  <ViewDetailButton onClick={goViewDetail}>One click to add</ViewDetailButton>
                </Stack>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleConfirmClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ width: '100%' }}>

                <Stack p="0 10px" mb="20px" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "#000", fontSize: '22px', fontWeight: 700, lineHeight: '24px' }}>
                    Add to Wallet
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleConfirmClose}
                    sx={{ color: "#9b9b9b" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Box sx={{ p: '0px 0px 20px 0px' }}>
                  <Stack sx={{ backgroundColor: '#f6f6f6', padding: '10px', borderRadius: '20px', marginBottom: '10px' }} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <TokenColorIcon name="HayaToken" size={32} />
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        HAYA
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <Typography sx={{ color: "#6f6f6f", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        {HAYA_Address?.substring(0, 6)}...{HAYA_Address?.substring(HAYA_Address.length - 6)}
                      </Typography>
                      {
                        !copy ? (
                          <IconButton sx={{ width: '24px', height: '24px' }} onClick={onhayaCopy}>
                            <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                          </IconButton>
                        ) : (
                          // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                          <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                        )
                      }
                    </Stack>


                  </Stack>
                  <Stack sx={{ backgroundColor: '#f6f6f6', padding: '10px', borderRadius: '20px', marginBottom: '10px' }} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <TokenColorIcon name="H20Token" size={32} />
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        H20
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="10px">
                      <Typography sx={{ color: "#6f6f6f", fontSize: '16px', fontWeight: 600, lineHeight: '32px' }}>
                        {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}
                      </Typography>
                      {
                        !H20copy ? (
                          <IconButton sx={{ width: '24px', height: '24px' }} onClick={onh20Copy}>
                            <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                          </IconButton>
                        ) : (
                          // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                          <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                        )
                      }
                    </Stack>


                  </Stack>




                </Box>
                <Stack width="100%">
                  <ViewDetailButton onClick={goViewDetail}>One click to add</ViewDetailButton>
                </Stack>

              </Box>
            </Box>
          </Drawer>
        )
      }

    </>
  )

}
export default AddToWallet