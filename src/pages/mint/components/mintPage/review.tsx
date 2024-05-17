
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Drawer, Stack } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TokenColorIcon from 'assets/tokens';
import { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { BasicIssuanceModule, H30_Address } from 'config';
import ApprovalTokens from './approval';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';
import { ethers } from 'ethers';
import basicIssAbi from 'abi/basicIssuance.json'
import { useAccount } from 'wagmi';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { LoadingButton } from '@mui/lab';


// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"




const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  '.MuiDialog-paper': {
    width: '600px',
    borderRadius: '20px',
    padding: '20px 20px',
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


const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#1AAE70',
  boxShadow: 'none',
  padding: 0,
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: "#fff",
    color: '#1aae70',
  },
  '&:active': {
    boxShadow: 'none',

  },
}));




type dataType = {
  num: string;
  symbol: string;
  address: string;
  balance: string;
  allowance: string;
  decimals: string
}


type TypeProps = {
  open: boolean;
  handleSwapClose: () => void;
  data: dataType[];
  inputNum: string;
  name?: string;
  onChange: (update: boolean) => void;
  windowWidth: number
  windowHeight: number
}

function ChangeNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.round(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");



      }
    }
  } else {
    return num.toLocaleString()

  }
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



export default function ReviewSwap({ open, handleSwapClose, data, inputNum, name, onChange, windowWidth, windowHeight }: TypeProps) {
  const { address } = useAccount();
  const [doneLoading, setDoneLoading] = useState<boolean>(false)



  const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    width: '100%',
    backgroundColor: '#1AAE70',
    color: '#fff',
    boxShadow: 'none',
    ".MuiLoadingButton-loadingIndicator": {
      color: '#fff'

    },
    "&.MuiLoadingButton-loading": {
      opacity: 'inherit',
      backgroundColor: "#1AAE70"

    },
    '&:hover': {
      backgroundColor: "#19A56A",
      color: '#fff',
    },
  }));


  const notificonfig = {
    top: windowHeight * 0.4,

  }


  const [api, contextHolder] = notification.useNotification(notificonfig);

  const openNotification = (placement: NotificationPlacement) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Box sx={{ marginTop: '-8px' }}>
        {
          windowWidth >= 600 ? (
            <>
              <Stack width="100%" alignItems="center" textAlign="center" padding="20px 0" spacing="10px">
                <WarningIcon style={{ color: '#9b9b9b' }} fontSize="large" />
                <Typography variant='body1' sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '24px' }} color="#000">
                  The transaction submission was either cancelled or failed.
                </Typography>
              </Stack>
              <OkButton onClick={() => api.destroy()}>
                OK
              </OkButton>
            </>
          ) : (
            <>
              <Stack direction="row" width="100%" alignItems="center" textAlign="center" spacing="10px">
                <WarningIcon style={{ color: '#9b9b9b', width: '24px', height: '24px' }} fontSize="large" />
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px' }} color="#000">
                  Coming soon
                </Typography>
              </Stack>
            </>
          )
        }
      </Box>
    );

    const mess = (
      <Box sx={{ m: 0, p: 0, '& .ant-notification-notice': { "& .ant-notification-notice-message": { mb: 0 } } }}></Box>
    )



    api.open({
      message: mess,
      description: btn,
      closeIcon: windowWidth >= 600 ? true : false,
      className: 'custom-class',
      style: {
        width: windowWidth >= 600 ? '400px' : '160px',
        padding: '20px 20px',
        borderRadius: '20px'
      },
      key,
      placement,

    });
  };






  const [hidder, setHidder] = useState(true)
  const [openApproval, setOpenApproval] = useState(false)
  const [update, setUpdate] = useState(false)

  const onShowMore = () => {
    setHidder(!hidder)
  }

  useEffect(() => {

  }, [doneLoading])




  const handleSwap = async () => {

    if (data.every((item) => BigInt(item.allowance) > BigInt(Math.floor((Number(item.num) * Number(inputNum)) * (10 ** Number(item.decimals)))))) {
      const provider = getEthersSigner(config)
      const MintContract = new ethers.Contract(BasicIssuanceModule, basicIssAbi, await provider)
      setDoneLoading(true)
      MintContract.issue(H30_Address, String(Number(inputNum) * (10 ** 18)), address).then(async (res) => {

        // console.log('结果222222222222', res)



        const res1 = await res.wait()

        if (res1.blockNumber == null) {
          // console.log('nulllllllllll')
        } else {
          // console.log('成功')

          setDoneLoading(false)
          handleSwapClose()
          setUpdate(!update)
          onChange(update)
        }


      }).catch((err) => {
        // console.log("错误结果", err)
        openNotification('top')
        handleSwapClose()
        setDoneLoading(false)
      })


    } else {
      handleSwapClose()
      setOpenApproval(true)
    }


  }


  const handleApprovalClose = () => {
    setOpenApproval(false)
    setUpdate(!update)
    onChange(update)
  }

  const gotoContract = () => {
    window.location.assign(`https://sepolia.etherscan.io/address/${BasicIssuanceModule}`)
  }


  useEffect(() => {
    // console.log('传过来的数据', data)



  }, [data])






  return (
    <>
      {
        windowWidth >= 600 ? (
          <>
            {contextHolder}
            <Box sx={{ width: '100%' }}>
              <ApprovalTokens windowHeight={windowHeight} open={openApproval} handleApprovalClose={handleApprovalClose} data={data} name={name} inputNum={inputNum} windowWidth={windowWidth} />
              <BootstrapDialog
                onClose={handleSwapClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                {/* <DialogTitle sx={{ m: 0, p: 2, color: '#000', fontWeight: 700, fontSize: '18px', backgroundColor: 'transparent' }} id="customized-dialog-title">
            Review Swap
          </DialogTitle> */}

                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="20px">
                  <Typography sx={{ color: "#000", fontSize: '22px', fontWeight: 700 }}>
                    Review Mint
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
                  <Box sx={{ p: '12px 20px' }}>
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>

                    {
                      data.map((item, index) => {
                        return (
                          <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '10px' }}>
                              <Stack direction="row" alignItems="center" key={index}>
                                <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                                  {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                                </Typography>

                              </Stack>
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={36} />
                            </Stack>
                          </>
                        )
                      })
                    }

                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600, mt: '10px' }} color="#9b9b9b">
                      ≈ $ 0.00
                    </Typography>


                  </Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px" m="10px 0">
                    <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                    <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                    <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  </Stack>

                  <Box sx={{ p: '12px 20px', marginBottom: '10px' }}>
                    <Stack alignItems="start" spacing="10px">
                      <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                        You receive
                      </Typography>
                      <Stack width="100%" alignItems="center" direction="row" justifyContent="space-between">

                        <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                          {inputNum} {name}
                        </Typography>

                        <TokenColorIcon name={name} size={36} />



                      </Stack>
                      <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                        $0.00
                      </Typography>

                    </Stack>
                  </Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                    <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                    <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>Show more</ShowButton>

                    <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  </Stack>
                  <Box sx={{ marginTop: '8px', mb: '20px', p: '0 20px', display: !hidder ? 'none' : 'block' }}>
                    <Stack spacing="10px">
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ color: '#6F6F6F' }}>
                          Contract
                        </Typography>
                        <Typography sx={{
                          color: '#1aae70', padding: 0, '&:hover': {
                            color: "#19A56A",
                            backgroundColor: 'transparent'
                          }
                        }} component={Button} onClick={gotoContract} variant='body1' >
                          {BasicIssuanceModule.slice(0, 9)}
                        </Typography>

                      </Stack>

                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ color: '#6F6F6F' }}>
                          Transaction simulation
                        </Typography>
                        <Typography sx={{ color: '#464646', fontWeight: 600 }} variant='body1' >
                          Auto
                        </Typography>

                      </Stack>

                    </Stack>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <SwapButton loading={doneLoading} onClick={handleSwap}>
                    Confirm Mint
                  </SwapButton>
                </DialogActions>
              </BootstrapDialog>

            </Box>

          </>
        ) : (
          <>
            <ApprovalTokens windowHeight={windowHeight} open={openApproval} handleApprovalClose={handleApprovalClose} data={data} name={name} inputNum={inputNum} windowWidth={windowWidth} />

            <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
              <Box width="auto" padding="20px 10px">
                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="10px">
                  <Typography sx={{ color: "#000", fontSize: '20px', fontWeight: 700 }}>
                    Review Mint
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleSwapClose}
                    sx={{ color: "#9b9b9b" }}

                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <Box sx={{ marginBottom: '10px', p: '12px 10px' }}>
                  <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                    You pay <span style={{ color: '#1AAE70' }}>{data.length}</span> tokens
                  </Typography>

                  {
                    data.map((item, index) => {
                      return (
                        <>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '10px' }}>
                            <Stack direction="row" spacing="4px" alignItems="center" key={index}>
                              <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            <TokenColorIcon name={item.symbol.split('-')[0]} size={36} />
                          </Stack>
                        </>
                      )
                    })
                  }

                  <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600, mt: '10px' }} color="#9b9b9b">
                    ≈ $0.00
                  </Typography>


                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
                  <Stack alignItems="start" spacing="10px">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {inputNum} {name}
                      </Typography>

                      <TokenColorIcon name={name} size={36} />



                    </Stack>
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      $ 0.00
                    </Typography>

                  </Stack>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>Show more</ShowButton>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>
                <Box sx={{ p: '0 10px', marginTop: '10px', marginBottom: '10px', display: !hidder ? 'none' : 'block' }}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ color: '#6F6F6F' }}>
                        Contract
                      </Typography>
                      <Typography sx={{
                        color: '#1aae70', padding: 0, '&:hover': {
                          color: "#19A56A",
                          backgroundColor: 'transparent'
                        }
                      }} component={Button} onClick={gotoContract} variant='body1' >
                        {BasicIssuanceModule.slice(0, 9)}
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
                </Box>
                <SwapButton loading={doneLoading} onClick={handleSwap}>
                  Confirm Mint
                </SwapButton>

              </Box>


            </Drawer>
          </>
        )
      }
    </>
  );
}