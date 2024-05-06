
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
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
import { UniswapSepoliaRouterContract } from 'config';
import { LoadingButton } from '@mui/lab';
import { MdAdd } from 'react-icons/md';
import ApprovalTokens from './approveToken';






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
  windowWidth: number;
  windowHeight: number;
  onChange: (update: boolean) => void;
}



export default function ReviewSupply({ open, windowWidth, handleSwapClose, data, inputToNum, inputFromNum, toToken, fromToken, windowHeight, onChange }: TypeProps) {


  const [hidder, setHidder] = useState(false)

  const onShowMore = () => {
    setHidder(!hidder)
  }

  // const provider = new ethers.BrowserProvider(window.ethereum)


  const [openApproval, setOpenApproval] = useState(false)


  // const { address } = useAccount();

  // const [loading, setLoading] = useState(false)



  const handleSwap = async () => {
    // const signer = await provider.getSigner()
    handleSwapClose()
    setOpenApproval(true)

  }

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
      <ApprovalTokens windowHeight={windowHeight} open={openApproval} handleApprovalClose={handleApprovalClose} data={data} toToken={toToken} fromToken={fromToken} inputFromNum={inputFromNum} inputToNum={inputToNum} windowWidth={windowWidth} />

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
                        {inputToNum} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={40} />



                    </Stack>
                    <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '24px' }}>
                        {inputFromNum} {fromToken}
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
                        0.001 LP-H30/ETH
                      </Typography>

                      <TokenColorIcon name="ETH" size={40} />
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
                <SwapButton onClick={handleSwap}>
                  Confirm Swap
                </SwapButton>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ left: '5px', right: '5px', borderRadius: '10px 10px 0 0' }}>
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
                  <Box position="relative">
                    <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>


                    <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 700, fontSize: '16px' }}>
                        {inputToNum} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={30} />



                    </Stack>
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


                <SwapButton onClick={handleSwap}>
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