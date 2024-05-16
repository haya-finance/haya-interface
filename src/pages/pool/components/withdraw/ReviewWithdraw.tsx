
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
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
import { useEffect, useState } from 'react';
import { H30_Address, pair_Address, UniswapSepoliaRouterContract, WETH_address } from 'config';
import { LoadingButton } from '@mui/lab';
import tokenAbi from 'abi/token.json'
import { useAccount } from 'wagmi';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';
import { ethers } from 'ethers';
import swapabi from 'abi/swap.json'
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { WarningIcon } from '@chakra-ui/icons';

import ETHH20 from 'assets/images/token/H20_ETH.svg'






// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"


type DataType = {
  liq: string;
  ETHAmount: string;
  H20Amount: string
}


function ValueNumber(num: number) {
  console.log('num', num)

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.floor(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 10000
    num = Math.floor(num)
    num /= 10000

    return String(num)

  }
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: '600px',
    borderRadius: '20px',


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





type TypeProps = {
  open: boolean;
  handleSwapClose: () => void;
  data: DataType[];
  windowWidth: number;
  windowHeight: number;
  onChange: () => void;
  balance: string;
  allowance: string
  num: number
}

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



export default function ReviewWithdraw({ open, windowWidth, handleSwapClose, data, windowHeight, onChange, allowance, num, balance }: TypeProps) {



  const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    fontWeight: 500,
    width: '100%',
    fontSize: '18px',
    lineHeight: '20px',
    backgroundColor: '#1AAE70',
    borderRadius: '20px',
    color: '#fff',
    boxShadow: 'none',
    ".MuiLoadingButton-loadingIndicator": {
      color: '#fff'

    },
    "&.MuiLoadingButton-loading": {
      opacity: 'inherit',
      zIndex: 100,
      backgroundColor: '#1AAE70',

    },
    '&:hover': {
      backgroundColor: "#19A56A",
      color: '#fff',
    },
  }));

  const [hidder, setHidder] = useState(false)

  const onShowMore = () => {
    setHidder(!hidder)
  }

  const [doneLoading, setDoneLoading] = useState<boolean>(false)

  // const provider = new ethers.BrowserProvider(window.ethereum)


  const notificonfig = {
    top: windowHeight / 2 + 100
  }


  const [api, contextHolder] = notification.useNotification(notificonfig);

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
      key,
      placement,

    });
  };




  // const { address } = useAccount();

  // const [loading, setLoading] = useState(false)
  const { address } = useAccount();



  const handleSwap = async () => {
    const provider = getEthersSigner(config)
    const poolContract = new ethers.Contract(UniswapSepoliaRouterContract, swapabi, await provider)

    if (BigInt(allowance) > BigInt(Math.floor(Number(Number(balance) * (num / 100)) * (10 ** 18)))) {
      setDoneLoading(true)
      await poolContract.removeLiquidity(H30_Address, WETH_address, String(Number(Number(balance) * (num / 100)) * (10 ** 18)), String(0), String(0), address, new Date().getTime() + 1000 * 60 * 5).then((res: any) => {
        // console.log('结果', res)
        // setInputReValue(String(Number(res[1]) / (10 ** 18)))

        setDoneLoading(false)
        handleSwapClose()
        // setInputReValue(String(Number(res[1]) / (10 ** 18)))
      }).catch(err => {
        openNotification('top')
        handleSwapClose()
      })

    } else {
      const ApproveContract = new ethers.Contract(pair_Address, tokenAbi, await provider)
      setDoneLoading(true)
      await ApproveContract.approve(UniswapSepoliaRouterContract, ethers.MaxUint256).then(async (res) => {




        await res.wait()

        await poolContract.removeLiquidity(H30_Address, WETH_address, String(Number(Number(balance) * (num / 100)) * (10 ** 18)), String(0), String(0), address, new Date().getTime() + 1000 * 60 * 5).then((res2: any) => {
          // console.log('结果', res)
          // setInputReValue(String(Number(res[1]) / (10 ** 18)))

          setDoneLoading(false)
          handleSwapClose()
          onChange()
        }).catch(err => {
          openNotification('top')
          handleSwapClose()
        })



      }).catch((err) => {
        // console.log('err', err)
        openNotification('top')
        handleSwapClose()

      })


    }




    // const signer = await provider.getSigner()




  }


  useEffect(() => {
    console.log(doneLoading)

  }, [doneLoading])




  const gotoContract = () => {
    window.location.assign(`https://sepolia.etherscan.io/address/${UniswapSepoliaRouterContract}`)
  }

  useEffect(() => {

  }, [data, balance, allowance, windowHeight, windowWidth])








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
              sx={{
                '.MuiDialog-paper': {
                  width: '600px', borderRadius: '20px', padding: '20px 20px'
                }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" marginBottom="10px">
                <Typography sx={{ color: "#000", fontSize: '17px', fontWeight: 700 }}>
                  Review Withdraw
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleSwapClose}
                  sx={{ color: "#9b9b9b" }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <DialogContent >

                <Box sx={{ marginBottom: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You withdraw
                    </Typography>

                    <Stack alignItems="center" direction="row" justifyContent="space-between" pt="20px">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(balance == '0' ? 0 : Number(balance) * (num / 100))} LP-H20/ETH
                      </Typography>

                      <img src={ETHH20} />
                    </Stack>
                  </Box>
                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '0.5px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '0.5px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  <Stack alignItems="start" spacing="6px" width="100%" >
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>

                    <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(balance !== '0' && data[0].ETHAmount !== '0' && data[0]?.liq !== "0" ? Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.ETHAmount) * Number(num / 100)) : 0)}ETH

                      </Typography>

                      <TokenColorIcon name="ETH" size={40} />



                    </Stack>
                    <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(balance !== '0' && data[0].H20Amount !== '0' && data[0]?.liq !== "0" ? Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.H20Amount) * Number(num / 100)) : 0)} H20
                      </Typography>

                      <TokenColorIcon name="H20" size={40} />



                    </Stack>

                  </Stack>
                </Box>




                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>

                  <Box component="button" sx={{ backgroundColor: 'transparent', padding: 0, border: 0, cursor: 'pointer' }} onClick={onShowMore}>
                    <Stack direction="row" alignItems="center" spacing="2px">
                      <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 500, color: '#1aae70', cursor: 'pointer' }} >
                        {!hidder ? `Show more` : `Fold`}
                      </Typography>
                      {!hidder ? <KeyboardArrowUpIcon sx={{ color: '#1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '#1aae70' }} />}
                    </Stack>
                  </Box>




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
                <SwapButton loading={doneLoading} onClick={handleSwap}>
                  Confirm Withdraw
                </SwapButton>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '10px 10px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" marginBottom="10px">
                  <Typography sx={{ color: "#000", fontSize: '17px', fontWeight: 700 }}>
                    Review Withdraw
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


                  <Stack alignItems="start" spacing="6px" padding="0px 12px">
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You withdraw
                    </Typography>

                    <Stack alignItems="center" direction="row" sx={{ width: '100%' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '18px' }}>
                        {ValueNumber(balance == '0' ? 0 : Number(balance) * (num / 100))} LP-H20/ETH

                      </Typography>

                      <img src={ETHH20} />
                    </Stack>
                  </Stack>
                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between" padding="0px 12px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px', padding: 0 }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px', padding: 0 }}></Box>
                </Stack>


                <Box >
                  <Stack alignItems="start" spacing="6px" width='100%' padding="0px 12px">
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>


                    <Stack alignItems="center" direction="row" sx={{ padding: '0', width: '100%' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '18px' }}>
                        {ValueNumber(balance !== '0' && data[0].ETHAmount !== '0' && data[0]?.liq !== "0" ? Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.ETHAmount) * Number(num / 100)) : 0)}ETH
                      </Typography>

                      <TokenColorIcon name="ETH" size={30} />



                    </Stack>
                    <Stack alignItems="center" direction="row" sx={{ width: '100%' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '18px' }}>
                        {ValueNumber(balance !== '0' && data[0].H20Amount !== '0' && data[0]?.liq !== "0" ? Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.H20Amount) * Number(num / 100)) : 0)} H20
                      </Typography>

                      <TokenColorIcon name="H20" size={30} />



                    </Stack>
                  </Stack>
                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between" padding="0px 12px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px', padding: 0 }}></Box>
                  <Box component="button" sx={{ backgroundColor: 'transparent', padding: 0, border: 0, cursor: 'pointer' }} onClick={onShowMore}>
                    <Stack direction="row" alignItems="center" spacing="2px">
                      <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 500, color: '#1aae70', cursor: 'pointer' }} >
                        {!hidder ? `Show more` : `Fold`}
                      </Typography>
                      {!hidder ? <KeyboardArrowUpIcon sx={{ color: '#1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '#1aae70' }} />}
                    </Stack>
                  </Box>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px', padding: 0 }}></Box>
                </Stack>
                <Box sx={{ marginBottom: '10px', padding: '0px 12px' }}>
                  <Stack spacing="10px">
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
                  <Stack spacing={1} sx={{ display: !hidder ? 'none' : 'block', mt: '10px' }}>
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


                <SwapButton loading={doneLoading} onClick={handleSwap}>
                  Confirm Withdraw
                </SwapButton>

              </Box>
            </Box>
          </Drawer>


        )

      }
    </>
  );
}