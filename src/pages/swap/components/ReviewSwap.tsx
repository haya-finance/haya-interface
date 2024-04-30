
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Drawer, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TokenColorIcon from 'assets/tokens';
import { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Web3 from 'web3';
import { useState } from 'react';
import { ethers } from 'ethers'
import SwapAbi from 'abi/swap.json'
import { useAccount } from 'wagmi';
import tokenAbi from 'abi/token.json'
import { UniswapSepoliaRouterContract } from 'config';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';





const OkButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  color: '#fff',
  boxShadow: 'none',
  borderRadius: '10px',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#1AAE70',
    color: '#fff',
  },
}));

// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: '100%'


  },

  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .customized-dialog-title': {
    borderBottom: 0
  }
}));


const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#1AAE70',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: "#fff",
    color: '#1aae70',
  },
  '&:active': {
    boxShadow: 'none',

  },
}));


const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
  width: '100%',
  backgroundColor: '#1AAE70',
  borderRadius: '10px',
  color: '#fff',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: "#1AAE70",
    color: '#fff',
  },
}));


type TypeProps = {
  open: boolean;
  handleSwapClose: () => void;
  data: any[];
  inputToNum: string;
  inputFromNum: string;
  toToken: string;
  fromToken: string;
  windowWidth: number
}



export default function SwapReviewSwap({ open, windowWidth, handleSwapClose, data, inputToNum, inputFromNum, toToken, fromToken }: TypeProps) {


  const [hidder, setHidder] = useState(false)

  const { address } = useAccount()

  const onShowMore = () => {
    setHidder(!hidder)
  }

  // const provider = new ethers.BrowserProvider(window.ethereum)
  // const notificonfig = {
  //   top: windowHeight / 2 + 100
  // }


  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Box>
        <Stack width="100%" alignItems="center" textAlign="center" padding="12px 0" spacing="6px">
          <WarningIcon style={{ color: '#9b9b9b' }} fontSize="large" />
          <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px' }} color="#000">
            The transaction submission was either cancelled or failed.
          </Typography>
        </Stack>
        <OkButton onClick={() => api.destroy()}>
          OK
        </OkButton>
      </Box>
    );



    api.open({
      message: '',
      description: btn,
      className: 'custom-class',
      style: {
        width: '280px',
        padding: '20px 24px',
        borderRadius: '20px'
      },
      // btn,
      key,
      placement,
      duration: 0,
    });
  };
  // const { address } = useAccount();

  const [loading, setLoading] = useState(false)



  const handleSwap = async () => {
    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)
    const ApproveContract = new ethers.Contract(data.filter(item => item.symbol === toToken)[0].address, tokenAbi, await provider)
    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, await provider)
    // BigInt(Number(inputToNum) * (10 ** 18))

    await ApproveContract.approve(UniswapSepoliaRouterContract, ethers.MaxUint256).then(async (res) => {
      setLoading(true)

      await res.wait()
      await swapContract.swapExactTokensForTokens(BigInt(Number(inputToNum) * (10 ** 18)), BigInt((1 - 0.005) * Number(inputFromNum) * (10 ** 18)), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

        // console.log('结果swap', res)
        await res.wait()
        setLoading(false)
        handleSwapClose()
      }).catch((_err) => {
        openNotification('top')
        handleSwapClose()
        // console.log('错误1', err)
      })




    }).catch((err) => {
      openNotification('top')
      handleSwapClose()
      // console.log('错误1', err)

    })


    // if (toToken == "WETH") {
    //   await swapContract.swapExactTokensForTokens(BigInt(Number(inputToNum) * (10 ** 18)),BigInt(Number(inputFromNum) * (10 ** 18)), [data.filter(item => item.symbol == toToken)[0].address, data.filter(item => item.symbol == fromToken)[0].address], address, new Date().getTime() + 10000, { from: '0xEBC004b6bB06E85c5111e41C460712CeDD1680FC', value: ethers.parseEther(String(0.01)) }).then((res: any) => {
    //     console.log('结果swap', res)
    //     handleSwapClose()
    //   }).catch((err) => {
    //     console.log('错误1', err)
    //   })
    // } else {
    //   await swapContract.swapExactTokensForETH(BigInt(Number(inputToNum) * (10 ** 18)), BigInt(Number(inputFromNum) * (10 ** 18)), [data.filter(item => item.symbol == toToken)[0].address, data.filter(item => item.symbol == fromToken)[0].address], address, new Date().getTime() + 10000).then((res: any) => {
    //     console.log('结果swap', res)
    //     handleSwapClose()
    //   }).catch((err) => {
    //     console.log('错误2', err)
    //   })
    // }


  }


  const gotoContract = () => {
    window.location.assign(`https://sepolia.etherscan.io/address/${UniswapSepoliaRouterContract}`)
  }






  return (
    <>
      {contextHolder}
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleSwapClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2, color: '#000', fontWeight: 700, fontSize: '18px', backgroundColor: 'transparent' }} id="customized-dialog-title">
                Review Swap
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleSwapClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent >

                <Box sx={{ marginBottom: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>

                    <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      $35.1
                    </Typography>
                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {inputToNum} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={40} />



                    </Stack>
                  </Box>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>

                    <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      $35.1
                    </Typography>
                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {inputFromNum} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={40} />
                    </Stack>
                  </Box>
                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>{!hidder ? `Show more` : `Fold`}</ShowButton>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>
                <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Contract
                      </Typography>
                      <Typography sx={{ color: '#1aae70', }} component={Button} onClick={gotoContract} variant='body1' >
                        {UniswapSepoliaRouterContract.slice(0, 9)}
                      </Typography>

                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Transaction simulation
                      </Typography>
                      <Typography sx={{ color: '#464646' }} variant='body1' >
                        Auto
                      </Typography>

                    </Stack>

                  </Stack>
                  <Stack spacing={1} sx={{ display: !hidder ? 'none' : 'block', mt: '8px' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>

                  </Stack>
                </Box>


              </DialogContent>
              <DialogActions>
                <SwapButton loading={loading} onClick={handleSwap}>
                  Confirm Swap
                </SwapButton>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff' }, left: '5px', right: '5px', borderRadius: '10px 10px 0 0' }}>
            <Box sx={{ width: 'auto', padding: '10px 10px 20px 10px' }}>
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" pb="10px">
                  <Typography sx={{ color: "#464646", fontSize: '17px', fontWeight: 700 }}>
                    Review Swap
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleSwapClose}
                    sx={{ color: "#9b9b9b" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <Box sx={{ marginBottom: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>

                    <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      $35.1
                    </Typography>
                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {inputToNum} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={30} />



                    </Stack>
                  </Box>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>

                    <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      $35.1
                    </Typography>
                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {inputFromNum} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={30} />
                    </Stack>
                  </Box>
                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>{!hidder ? `Show more` : `Fold`}</ShowButton>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>
                <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Contract
                      </Typography>
                      <Typography sx={{ color: '#1aae70', }} component={Button} onClick={gotoContract} variant='body1' >
                        {UniswapSepoliaRouterContract.slice(0, 9)}
                      </Typography>

                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Transaction simulation
                      </Typography>
                      <Typography sx={{ color: '#464646' }} variant='body1' >
                        Auto
                      </Typography>

                    </Stack>

                  </Stack>
                  <Stack spacing={1} sx={{ display: !hidder ? 'none' : 'block', mt: '8px' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Type
                      </Typography>
                      <Typography sx={{ color: '#464646' }}  >
                        Name
                      </Typography>

                    </Stack>

                  </Stack>
                </Box>


                <SwapButton loading={loading} onClick={handleSwap}>
                  Confirm Swap
                </SwapButton>

              </Box>
            </Box>
          </Drawer>


        )

      }
    </>
  );
}