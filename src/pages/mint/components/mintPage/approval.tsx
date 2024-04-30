
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


// const sepolia_rpc = "https://sepolia.infura.io/v3/0edd253962184b628e0cfabc2f91b0ae"














type dataType = {
  num: string;
  symbol: string;
  address: string;
  balance: string
}


type TypeProps = {
  open: boolean;
  handleApprovalClose: () => void;
  data: dataType[];
  inputNum: string;
  name?: string;
  windowWidth: number;
  windowHeight: number
}

function ChangeNumber(num: number) {

  if (num % 1 !== 0) {
    num *= 10000000000
    num = Math.round(num)
    num /= 10000000000
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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



export default function ApprovalTokens({ open, handleApprovalClose, data, inputNum, name, windowWidth, windowHeight }: TypeProps) {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({

    '.MuiDialog-paper': {
      width: '100%',
      padding: windowWidth >= 600 ? '10px 19px' : '5px 8px',
      borderRadius: '10px'
    },

    '& .MuiDialogContent-root': {
      padding: windowWidth >= 600 ? "14px 24px" : '10px 14px',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
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
    fontSize: '14px',
    lineHeight: '14px',
    padding: windowWidth >= 600 ? '10px 20px' : '5px 10px',
    '&:hover': {
      backgroundColor: "#1AAE70",
      color: '#fff',
    },
  }));

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
      duration: 0,

    });
  };






  const [disable, setDisabled] = useState<boolean>(false)

  const [approval, setApproval] = useState<boolean[]>([])
  const [loading, setLoading] = useState<boolean[]>([])

  const [doneLoading, setDoneLoading] = useState<boolean>(false)





  // const provider = new ethers.BrowserProvider(window.ethereum)
  const { address } = useAccount();


  const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    width: '100%',
    backgroundColor: disable ? '#9B9B9B' : '#1AAE70',

    borderRadius: '10px',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#1AAE70',
      color: '#fff',
    },
  }));



  const handleDone = async () => {
    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)
    const MintContract = new ethers.Contract(BasicIssuanceModule, basicIssAbi, await provider)
    MintContract.issue(H30_Address, String(Number(inputNum) * (10 ** 18)), address).then(async (res) => {

      // console.log('结果222222222222', res)
      setDoneLoading(true)


      const res1 = await res.wait()

      if (res1.blockNumber == null) {
        // console.log('nulllllllllll')
      } else {

        setDoneLoading(false)
        handleApprovalClose()
      }


    }).catch((err) => {
      // console.log("错误结果", err)
      openNotification('top')
      handleApprovalClose()
    })







  }

  const OnApproval = async (index: number, num: string, tokenAddress: any) => {

    // const number = String((Number(num) * Number(inputNum)) * (10 ** 18))
    // console.log(number)

    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)



    const ApproveContract = new ethers.Contract(tokenAddress, tokenAbi, await provider)













    await ApproveContract.approve(BasicIssuanceModule, ethers.MaxUint256).then(async (res) => {


      setLoading((pre) => {
        const newloading = [...pre]
        newloading[index] = true
        return newloading
      })


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
      }

    }

  }, [approval, disable, data])











  return (
    <>
      {contextHolder}
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleApprovalClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ color: "#464646", fontSize: '20px', fontWeight: 700 }}>
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
                <Box >

                  {
                    data.map((item, index) => {
                      return (
                        <>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '6px' }}>
                            <Stack direction="row" spacing="4px" alignItems="center" key={index}>
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={30} />
                              <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 700 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))}
                              </Typography>
                              <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 700 }}>
                                {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            {
                              !approval[index] ? (
                                <ApprovalButton key={index} loading={loading[index]} onClick={() => OnApproval(index, item.num, item.address)}>Approval</ApprovalButton>

                              ) : (
                                <Stack direction="row" spacing="8px" alignItems="center" key={index}>
                                  <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 700 }}>
                                    Approved
                                  </Typography>
                                  <FaCheck color='#1AAE70' size={20} />
                                </Stack>


                              )
                            }

                          </Stack>
                        </>
                      )
                    })
                  }




                </Box>
              </DialogContent>
              <DialogActions>
                <Stack width="100%">
                  <Stack direction="row" spacing="6px" pb="12px" pt='8px' alignItems="center">
                    <InfoIcon sx={{ color: '#6f6f6f', width: '20px', height: '20px' }} />
                    <Typography sx={{ color: '#6f6f6f', fontSize: windowWidth >= 600 ? '14px' : '11px' }}>
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
          <Drawer anchor='bottom' open={open} onClose={handleApprovalClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff' }, left: '5px', right: '5px', borderRadius: '10px 10px 0 0' }}>
            <Box sx={{ width: 'auto', padding: '10px 10px 20px 10px' }}>
              <Box sx={{ width: '100%' }}>

                <Stack direction="row" justifyContent="space-between" alignItems="center" pb="10px">
                  <Typography sx={{ color: "#464646", fontSize: '17px', fontWeight: 400 }}>
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
                <Box >

                  {
                    data.map((item, index) => {
                      return (
                        <>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ mt: '6px' }}>
                            <Stack direction="row" spacing="4px" alignItems="center" key={index}>
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={30} />
                              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))}
                              </Typography>
                              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                                {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            {
                              !approval[index] ? (
                                <ApprovalButton key={index} loading={loading[index]} onClick={() => OnApproval(index, item.num, item.address)}>Approval</ApprovalButton>

                              ) : (
                                <Stack direction="row" spacing="8px" alignItems="center" key={index}>
                                  <Typography sx={{ color: "#464646", fontSize: '11px', fontWeight: 700 }}>
                                    Approved
                                  </Typography>
                                  <FaCheck color='#1AAE70' size={20} />
                                </Stack>


                              )
                            }

                          </Stack>
                        </>
                      )
                    })
                  }




                </Box>
                <Stack width="100%">
                  <Stack direction="row" spacing="6px" pb="12px" pt='8px' alignItems="center">
                    <InfoIcon sx={{ color: '#6f6f6f', width: '20px', height: '20px' }} />
                    <Typography sx={{ color: '#6f6f6f', fontSize: '11px' }}>
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