
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, AvatarGroup, Box, Drawer, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TokenColorIcon from 'assets/tokens';
import { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { H30_Address, UniswapSepoliaRouterContract } from 'config';
import { LoadingButton } from '@mui/lab';
import { MdAdd } from 'react-icons/md';
import ApprovalTokens from './approveToken';
import { useAccount } from 'wagmi';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';
import { ethers } from 'ethers';
import swapabi from 'abi/swap.json'
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { WarningIcon } from '@chakra-ui/icons';

const avatarImage = require.context('assets/images/token', true);






// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"


function ValueNumber(num: number) {

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
  windowWidth: number;
  windowHeight: number;
  onChange: (update: boolean) => void;
  slippage: string;
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



export default function ReviewSupply({ open, windowWidth, handleSwapClose, data, inputToNum, inputFromNum, toToken, fromToken, windowHeight, onChange, slippage }: TypeProps) {


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


  const [openApproval, setOpenApproval] = useState(false)


  // const { address } = useAccount();

  // const [loading, setLoading] = useState(false)
  const { address } = useAccount();



  const handleSwap = async () => {
    const provider = getEthersSigner(config)
    const poolContract = new ethers.Contract(UniswapSepoliaRouterContract, swapabi, await provider)

    // const signer = await provider.getSigner()

    if (toToken == 'ETH') {
      if (BigInt(data.filter(item => item.symbol == 'H20')[0].allowance) > BigInt(Math.floor(Number(inputFromNum) * (10 ** 18)))) {
        // console.log('111111111111111111111')
        await poolContract.addLiquidityETH(H30_Address, String(Number(inputFromNum) * (10 ** 18)), String(0), String(0), address, new Date().getTime() + 1000 * 60 * 5, {
          from: address,
          value: BigInt(Math.floor(Number(inputToNum) * (10 ** 18)))


        }).then(async (res) => {

          // console.log('结果222222222222', res)
          setDoneLoading(true)


          const res1 = await res.wait()

          if (res1.blockNumber == null) {
            // console.log('nulllllllllll')
          } else {

            setDoneLoading(false)
            handleSwapClose()
            setUpdate(!update)
            onChange(update)
          }


        }).catch((err) => {
          // console.log("错误结果", err)
          openNotification('top')
          handleSwapClose()
        })




      } else {
        handleSwapClose()
        setOpenApproval(true)

      }

    } else {
      if (BigInt(data.filter(item => item.symbol == 'H20')[0].allowance) > BigInt(Math.floor(Number(inputToNum) * (10 ** 18)))) {
        // console.log('111111111111111111111')

        await poolContract.addLiquidityETH(H30_Address, BigInt(Number(inputToNum) * (10 ** 18)), String(0), String(0), address, new Date().getTime() + 1000 * 60 * 5, {
          from: address,
          value: BigInt(Math.floor(Number(inputFromNum) * (10 ** 18)))
        }).then(async (res) => {

          // console.log('结果222222222222', res)
          setDoneLoading(true)


          const res1 = await res.wait()

          if (res1.blockNumber == null) {
            // console.log('nulllllllllll')
          } else {

            setDoneLoading(false)
            handleSwapClose()
            setUpdate(!update)
            onChange(update)
          }


        }).catch((err) => {
          // console.log("错误结果", err)
          openNotification('top')
          handleSwapClose()
        })


      } else {
        handleSwapClose()
        setOpenApproval(true)

      }
    }




  }


  useEffect(() => {

  }, [doneLoading])

  const [update, setUpdate] = useState(false)



  const handleApprovalClose = () => {
    setOpenApproval(false)
    setUpdate(!update)
    onChange(update)
  }


  const gotoContract = () => {
    window.location.assign(`https://sepolia.etherscan.io/address/${UniswapSepoliaRouterContract}`)
  }






  return (
    <>
      <ApprovalTokens slippage={slippage} windowHeight={windowHeight} open={openApproval} handleApprovalClose={handleApprovalClose} data={data} toToken={toToken} fromToken={fromToken} inputFromNum={inputFromNum} inputToNum={inputToNum} windowWidth={windowWidth} />
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
                Review Supply
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
                  <Stack alignItems="start" spacing="10px" width="100%" >
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>

                    <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(Number(inputToNum))} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={40} />



                    </Stack>
                    <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={40} />



                    </Stack>

                  </Stack>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '0.5px' }}></Box>
                  <MdAdd color='#333' style={{ padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '0.5px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>

                    <Stack alignItems="center" direction="row" justifyContent="space-between" pt="20px">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {ValueNumber(Number(Math.sqrt(Number(inputToNum) * Number(inputFromNum))))} H20/ETH
                      </Typography>

                      <AvatarGroup>
                        <Avatar alt="H20" src={avatarImage('./H20.png')} />
                        <Avatar alt="ETH" src={avatarImage('./ETH.png')} />
                      </AvatarGroup>
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
                <SwapButton loading={doneLoading} onClick={handleSwap}>
                  Confirm Swap
                </SwapButton>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '10px 10px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '10px 10px 20px 10px' }}>
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" pb="10px">
                  <Typography sx={{ color: "#464646", fontSize: '17px', fontWeight: 700 }}>
                    Review Supply
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
                  <Stack alignItems="start" spacing="6px" width='100%'>
                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>


                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0 0', width: '100%' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {ValueNumber(Number(inputToNum))} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={30} />



                    </Stack>
                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0', width: '100%' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {ValueNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={30} />



                    </Stack>
                  </Stack>
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

                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {ValueNumber(Number(Math.sqrt(Number(inputToNum) * Number(inputFromNum))))} {`${toToken} / ${fromToken}`}
                      </Typography>

                      <AvatarGroup>
                        <Avatar alt="H20" src={avatarImage('./H20.png')} sx={{ width: '30px', height: '30px' }} />
                        <Avatar alt="ETH" src={avatarImage('./ETH.png')} sx={{ width: '30px', height: '30px' }} />
                      </AvatarGroup>
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


                <SwapButton loading={doneLoading} onClick={handleSwap}>
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