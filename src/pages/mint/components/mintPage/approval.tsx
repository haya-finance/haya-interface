
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Drawer, Stack } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import { ButtonProps } from '@mui/material/Button';
// import Web3 from 'web3';
import { useEffect, useState } from 'react';
import basicIssAbi from 'abi/basicIssuance.json'
import tokenAbi from 'abi/token.json'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi';
import { BasicIssuanceModule, H30_Address } from 'config';
import InfoIcon from '@mui/icons-material/Info';
import { FaCheck } from "react-icons/fa";
import WarningIcon from '@mui/icons-material/Warning';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { LoadingButton } from '@mui/lab';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';
import Confirm from './confirm';
import Seed from './send';
import Succeed from './succeed';


// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"














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
  handleApprovalClose: () => void;
  data: dataType[];
  inputNum: string;
  name?: string;
  windowWidth: number;
  windowHeight: number;
  onChange: (update: boolean) => void;
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
  padding: '12px 0',
  boxShadow: 'none',
  fontSize: '18px',
  fontWeight: 600,
  borderRadius: '20px',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#1AAE70',
    color: '#fff',
  },
}));



export default function ApprovalTokens({ open, handleApprovalClose, data, inputNum, name, windowWidth, windowHeight, onChange }: TypeProps) {

  const [update, setUpdate] = useState(false)

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({

    '.MuiDialog-paper': {
      width: '600px',
      borderRadius: '20px',
      padding: '20px 20px'
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


  const ApprovalButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    backgroundColor: '#1AAE70',
    borderRadius: '20px',
    color: '#fff',
    boxShadow: 'none',
    fontSize: windowWidth >= 600 ? '16px' : '14px',
    lineHeight: '14px',
    padding: windowWidth >= 600 ? '10px 20px' : '5px 10px',
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






  const [disable, setDisabled] = useState<boolean>(true)

  const [approval, setApproval] = useState<boolean[]>([])
  const [loading, setLoading] = useState<boolean[]>([])

  const [doneLoading, setDoneLoading] = useState<boolean>(false)





  // const provider = new ethers.BrowserProvider(window.ethereum)
  const { address } = useAccount();
  const [openSend, setOpenSend] = useState(false)
  const [openSucced, setOpenSucced] = useState(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)


  const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({


    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    width: '100%',
    backgroundColor: disable ? '#9B9B9B' : '#1AAE70',
    color: '#fff',
    boxShadow: 'none',
    "&.Mui-disabled": {
      color: doneLoading ? 'transparent' : '#fff',

    },
    ".MuiLoadingButton-loadingIndicator": {
      color: '#fff'

    },
    "&.MuiLoadingButton-loading": {
      opacity: 'inherit',
      zIndex: 100,
      backgroundColor: '#1AAE70',

    },
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
    },
  }));

  const [hash, setHash] = useState('')

  useEffect(() => {

  }, [hash])



  const handleDone = async () => {
    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)
    const MintContract = new ethers.Contract(BasicIssuanceModule, basicIssAbi, await provider)
    setDoneLoading(true)
    setOpenConfirm(true)
    handleApprovalClose()
    MintContract.issue(H30_Address, String(Number(inputNum) * (10 ** 18)), address).then(async (res) => {

      // console.log('结果222222222222', res)
      // setOpenConfirm(false)
      // setOpenSend(true)



      const res1 = await res.wait()

      if (res1.blockNumber == null) {
        // console.log('nulllllllllll')
      } else {
        setHash(String(res1.hash))
        setOpenConfirm(false)
        setOpenSucced(true)

        setDoneLoading(false)
        // handleApprovalClose()
      }


    }).catch((err) => {
      // console.log("错误结果", err)
      openNotification('top')
      setOpenConfirm(false)
      handleApprovalClose()
      setDoneLoading(false)
    })







  }

  const OnApproval = async (index: number, num: string, tokenAddress: any) => {

    // const number = String((Number(num) * Number(inputNum)) * (10 ** 18))
    // console.log(number)

    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)




    const ApproveContract = new ethers.Contract(tokenAddress, tokenAbi, await provider)











    setLoading((pre) => {
      const newloading = [...pre]
      newloading[index] = true
      return newloading
    })


    await ApproveContract.approve(BasicIssuanceModule, ethers.MaxUint256).then(async (res) => {





      const res1 = await res.wait()

      if (res1.blockNumber == null) {
        // console.log('nulllllllllll')
      } else {

        setLoading((pre) => {
          const newloading = [...pre]
          newloading[index] = false
          return newloading
        })

        setApproval((pre) => {
          const newPre = [...pre]
          newPre[index] = true;
          return newPre
        })

      }

    }).catch((err) => {
      // console.log('err', err)
      openNotification('top')
      handleApprovalClose()
      setLoading((pre) => {
        const newloading = [...pre]
        newloading[index] = false
        return newloading
      })

    })












  }



  useEffect(() => {

  }, [loading])

  useEffect(() => {

  }, [doneLoading])

  useEffect(() => {
    if (approval.length == data.length && data.length !== 0) {

      if (approval.every(item => item == true)) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }

    }

  }, [approval, disable, data])

  const handleConfirmClose = () => {
    setOpenConfirm(false)
  }

  const handleSeedClose = () => {
    setOpenSend(false)
  }

  const handleSucceedClose = () => {
    setUpdate(!update)
    onChange(update)
    setOpenSucced(false)
  }

  useEffect(() => {

  }, [openConfirm])
  useEffect(() => {

  }, [openSend])
  useEffect(() => {

  }, [openSucced])




  useEffect(() => {

    for (let i = 0; i < data.length; i++) {
      if (BigInt(data[i].allowance) > BigInt(Math.round((Number(data[i].num) * Number(inputNum)) * (10 ** Number(data[i].decimals))))) {
        // console.log('111111111111111111111')

        setApproval((pre) => {
          const newPre = [...pre]
          newPre[i] = true;
          return newPre
        })


      } else {
        setApproval((pre) => {
          const newPre = [...pre]
          newPre[i] = false;
          return newPre
        })

      }
    }

  }, [data])
















  return (
    <>
      <Confirm windowWidth={windowWidth} open={openConfirm} handleConfirmClose={handleConfirmClose} data={data} inputNum={inputNum} />
      <Seed windowWidth={windowWidth} open={openSend} handleConfirmClose={handleSeedClose} data={data} inputNum={inputNum} />
      <Succeed hash={hash} windowWidth={windowWidth} open={openSucced} handleConfirmClose={handleSucceedClose} data={data} inputNum={inputNum} />
      {contextHolder}
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleApprovalClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >

              <Stack direction="row" justifyContent="space-between" alignItems="center" padding="0 10px" mb="20px">
                <Typography sx={{ color: "#000", fontSize: '20px', fontWeight: 700 }}>
                  Approve Your Tokens
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleApprovalClose}
                  sx={{ color: "#9b9b9b" }}

                >
                  <CloseIcon />
                </IconButton>
              </Stack>

              <DialogContent >
                <Box sx={{ p: '0px 20px', mb: '20px' }}>

                  {
                    data.map((item, index) => {
                      return (
                        <>
                          {/* <Box display={BigInt(item.allowance) > BigInt(Math.round((Number(item.num) * Number(inputNum)) * (10 ** Number(item.decimals)))) ? 'none' : 'block'}> */}
                          <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '12px' }}>
                            <Stack direction="row" spacing="12px" alignItems="center" key={index}>
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={36} />
                              <Typography sx={{ color: "#000", fontSize: '20px', fontWeight: 600 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            {
                              !approval[index] ? (
                                <ApprovalButton key={index} loading={loading[index]} onClick={() => OnApproval(index, item.num, item.address)}>Approval</ApprovalButton>

                              ) : (
                                <Stack direction="row" spacing="8px" alignItems="center" key={index}>
                                  <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 600 }}>
                                    Approved
                                  </Typography>
                                  <FaCheck color='#1AAE70' size={22} />
                                </Stack>


                              )
                            }

                          </Stack>
                          {/* </Box> */}
                        </>
                      )
                    })
                  }




                </Box>
              </DialogContent>
              <DialogActions>
                <Stack width="100%">
                  <Stack direction="row" spacing="8px" pb="20px" pt='12px' alignItems="center">
                    <InfoIcon sx={{ color: '#6f6f6f', width: '22px', height: '22px' }} />
                    <Typography sx={{ color: '#6f6f6f', fontSize: '15px', fontWeight: 600, lineHeight: '20px' }}>
                      Tip: Approve your tokens before use. Each Token requires a separate one-time approval.
                    </Typography>

                  </Stack>
                  <SwapButton disabled={disable} onClick={handleDone} loading={doneLoading}>
                    Done
                  </SwapButton>
                </Stack>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleApprovalClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ width: '100%' }}>

                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="10px">
                  <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 400 }}>
                    Approve Your Tokens
                  </Typography>
                  <IconButton
                    aria-label="close"
                    onClick={handleApprovalClose}
                    sx={{ color: "#6f6f6f" }}

                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Box p="0 10px" mb="10px">

                  {
                    data.map((item, index) => {
                      return (
                        <>
                          {/* <Box display={BigInt(item.allowance) > BigInt(Math.round((Number(item.num) * Number(inputNum)) * (10 ** Number(item.decimals)))) ? 'none' : 'block'}> */}
                          <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '12px' }}>
                            <Stack direction="row" spacing="6px" alignItems="center" key={index}>
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={36} />
                              <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 600 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            {
                              !approval[index] ? (
                                <ApprovalButton key={index} loading={loading[index]} onClick={() => OnApproval(index, item.num, item.address)}>Approval</ApprovalButton>

                              ) : (
                                <Stack direction="row" spacing="4px" alignItems="center" key={index}>
                                  <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 600 }}>
                                    Approved
                                  </Typography>
                                  <FaCheck color='#1AAE70' size={22} />
                                </Stack>


                              )
                            }

                          </Stack>
                          {/* </Box> */}
                        </>
                      )
                    })
                  }




                </Box>
                <Stack width="100%">
                  <Stack direction="row" spacing="8px" pb="10px" pt='12px' alignItems="center">
                    <InfoIcon sx={{ color: '#6f6f6f', width: '22px', height: '22px' }} />
                    <Typography sx={{ color: '#6f6f6f', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
                      Tip: Approve your tokens before use. Each Token requires a separate one-time approval.
                    </Typography>

                  </Stack>
                  <SwapButton disabled={disable} onClick={handleDone} loading={doneLoading}>
                    Done
                  </SwapButton>
                </Stack>

              </Box>
            </Box>
          </Drawer>
        )
      }
    </>
  );
}