
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
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
import { ethers } from 'ethers'
import SwapAbi from 'abi/swap.json'
import { useAccount } from 'wagmi';
import { arb_url, UniswapSepoliaRouterContract } from 'config';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { getEthersSigner } from 'contract/getEthersSigner';
import { config } from 'contexts/wagmiConfig';
import ApprovalTokens from './approve';
import Confirm from './confirm';
import Seed from './send';
import Succeed from './succeed';


function formatTwoNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 2)
        num = Math.floor(num)
        num /= 10 ** (i + 2)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    return num.toLocaleString()

  }
}

function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
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
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: "#fff",
    color: '#1aae70',
  },
  '&:active': {
    boxShadow: 'none',

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
  slippage: string;
  windowHeight: number;
  onUpdate: () => void;
  WETHAmount: string;
  re: boolean
}



export default function SwapReviewSwap({ slippage, open, windowWidth, WETHAmount, handleSwapClose, data, inputToNum, inputFromNum, toToken, fromToken, windowHeight, onUpdate, re }: TypeProps) {


  const SwapButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    width: '100%',
    backgroundColor: '#1AAE70',
    color: '#fff',
    boxShadow: 'none',
    ".MuiLoadingButton-loadingIndicator": {
      color: '#fff'

    },
    "&.MuiLoadingButton-loading": {
      zIndex: 100,
      opacity: 'inherit',
      backgroundColor: '#1AAE70',

    },
    '&:hover': {
      backgroundColor: "#19A56A",
      color: '#fff',
    },
  }));


  const [hidder, setHidder] = useState(true)

  const { address } = useAccount()
  const [hash, setHash] = useState('')

  useEffect(() => {

  }, [hash])

  const onShowMore = () => {
    setHidder(!hidder)
  }



  // const provider = new ethers.BrowserProvider(window.ethereum)
  // const notificonfig = {
  //   top: windowHeight / 2 + 100
  // }

  const notificonfig = {
    top: windowHeight * 0.4,

  }

  const [errValue, setErrValue] = useState('The transaction submission was either cancelled or failed.')


  useEffect(() => {

  }, [errValue])


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
                  {errValue}
                </Typography>
              </Stack>
              <OkButton onClick={() => api.destroy()}>
                OK
              </OkButton>
            </>
          ) : (
            <>
              <Stack padding="10px 0" width="100%" alignItems="center" textAlign="center" spacing="10px">
                <WarningIcon style={{ color: '#9b9b9b', width: '24px', height: '24px' }} fontSize="large" />
                <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '18px' }} color="#000">
                  {errValue}
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
  // const { address } = useAccount();

  const [loading, setLoading] = useState(false)

  const [openSend, setOpenSend] = useState(false)
  const [openSucced, setOpenSucced] = useState(false)
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)


  const handleConfirmClose = () => {
    setOpenConfirm(false)
  }

  const handleSeedClose = () => {
    setOpenSend(false)
  }

  const handleSucceedClose = () => {
    onUpdate()
    setOpenSucced(false)
  }

  useEffect(() => {

  }, [openConfirm])
  useEffect(() => {

  }, [openSend])
  useEffect(() => {

  }, [openSucced])
  // console.log(data)



  const handleSwap = async () => {
    // const signer = await provider.getSigner()
    const provider = getEthersSigner(config)
    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, await provider)
    // BigInt(Number(inputToNum) * (10 ** 18))

    // console.log(new Date().getTime() + 10000)


    if (toToken !== 'ETH' && fromToken !== 'ETH') {
      if (toToken !== 'WETH' && fromToken !== 'WETH') {

        if (re) {

          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {

            handleSwapClose()
            setOpenApproval(true)

          } else {
            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapTokensForExactTokens(BigInt(Math.floor(Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), BigInt(Math.floor((1 + (Number(slippage) / 100)) * Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === 'WETH')[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // setOpenConfirm(false)
              // setOpenSend(true)

              // console.log('结果swap', res)
              const res1 = await res.wait()

              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
                // handleSwapClose()
              }
            }).catch((err) => {
              setErrValue(err.revert['args'][0])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)
              // console.log('错误1', err)
            })




          }

        } else {
          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {

            handleSwapClose()
            setOpenApproval(true)

          } else {
            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapExactTokensForTokens(BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === 'WETH')[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // setOpenConfirm(false)
              // setOpenSend(true)

              // console.log('结果swap', res)
              const res1 = await res.wait()

              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
                // handleSwapClose()
              }
            }).catch((err) => {
              setErrValue(err.revert['args'][0])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)
              // console.log('错误1', err)
            })




          }

        }


      } else {
        if (re) {
          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {

            handleSwapClose()
            setOpenApproval(true)

          } else {
            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapTokensForExactTokens(BigInt(Math.floor(Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), BigInt(Math.floor((1 + (Number(slippage) / 100)) * Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // setOpenConfirm(false)
              // setOpenSend(true)

              // console.log('结果swap', res)
              const res1 = await res.wait()


              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
                // handleSwapClose()
              }
            }).catch((err) => {
              setErrValue(err.revert['args'][0])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)
              // console.log('错误1', err)
            })




          }
        } else {
          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {

            handleSwapClose()
            setOpenApproval(true)

          } else {
            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapExactTokensForTokens(BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // setOpenConfirm(false)
              // setOpenSend(true)


              // console.log('结果swap', res)
              const res1 = await res.wait()
              console.log('res1', res1)
              console.log('res1.loga', res1.logs[res1.logs.length - 1].getTransaction())
              console.log('res1.loga', res1.logs[res1.logs.length - 1].toJSON())
              console.log('res1.loga', res1.logs[res1.logs.length - 1].getTransactionReceipt())
              console.log(res1.logs[res1.logs.length - 1].data)
              console.log(parseInt(res1.logs[res1.logs.length - 1].data, 16))


              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
                // handleSwapClose()
              }
            }).catch((err) => {
              // console.log('错误1', err)
              setErrValue(err.revert['args'][0])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)

            })




          }
        }
      }


    } else {
      if (toToken !== 'ETH') {
        if (re) {
          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {
            handleSwapClose()
            setOpenApproval(true)

          } else {

            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapTokensForExactETH(BigInt(Math.floor(Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), BigInt(Math.floor((1 + (Number(slippage) / 100)) * Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // console.log('结果swap', res)
              // setOpenConfirm(false)
              // setOpenSend(true)
              const res1 = await res.wait()
              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
              }

            }).catch((err) => {
              setErrValue(err.info["error"]['message'])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)
              // console.log('错误1', err)
            })





            // await swapContract.swapExactTokensForTokens(BigInt(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))),
            //   BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))),
            //   [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address],
            //   address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {
            //     setLoading(true)

            //     console.log('结果swap', res)
            //     // await res.wait()
            //     const tokenContract = new ethers.Contract(data.filter(item => item.symbol === fromToken)[0].address, wethAbi, await provider)
            //     await tokenContract.withdraw(BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl))))).then(async (res2) => {
            //       await res2.wait()
            //       setLoading(false)
            //       handleSwapClose()
            //       onUpdate()



            //     }).catch((err) => {
            //       // console.log(err)
            //       openNotification('top')
            //       handleSwapClose()
            //       setLoading(false)

            //     })


            //   }).catch((err) => {
            //     openNotification('top')
            //     handleSwapClose()
            //     setLoading(false)
            //     // console.log('错误1', err)
            //   })




          }
        } else {
          if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {
            handleSwapClose()
            setOpenApproval(true)

          } else {

            setLoading(true)
            setOpenConfirm(true)
            handleSwapClose()
            await swapContract.swapExactTokensForETH(BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl)))), BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {

              // console.log('结果swap', res)
              // setOpenConfirm(false)
              // setOpenSend(true)
              const res1 = await res.wait()
              if (res1.blockNumber == null) {
                // console.log('nulllllllllll')
              } else {
                setHash(String(res1.hash))
                setOpenConfirm(false)
                setOpenSucced(true)
                setLoading(false)
              }

            }).catch((err) => {
              setErrValue(err.info["error"]['message'])
              openNotification('top')
              handleSwapClose()
              setLoading(false)
              setOpenConfirm(false)
              // console.log('错误1', err)
            })





            // await swapContract.swapExactTokensForTokens(BigInt(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))),
            //   BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))),
            //   [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address],
            //   address, new Date().getTime() + 1000 * 60 * 5).then(async (res: any) => {
            //     setLoading(true)

            //     console.log('结果swap', res)
            //     // await res.wait()
            //     const tokenContract = new ethers.Contract(data.filter(item => item.symbol === fromToken)[0].address, wethAbi, await provider)
            //     await tokenContract.withdraw(BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl))))).then(async (res2) => {
            //       await res2.wait()
            //       setLoading(false)
            //       handleSwapClose()
            //       onUpdate()



            //     }).catch((err) => {
            //       // console.log(err)
            //       openNotification('top')
            //       handleSwapClose()
            //       setLoading(false)

            //     })


            //   }).catch((err) => {
            //     openNotification('top')
            //     handleSwapClose()
            //     setLoading(false)
            //     // console.log('错误1', err)
            //   })




          }
        }

      } else {

        if (re) {
          setLoading(true)
          setOpenConfirm(true)
          handleSwapClose()
          await swapContract.swapETHForExactTokens(BigInt(Math.floor(Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5, {
            from: address,
            value: BigInt(Math.floor(((1 + (Number(slippage) / 100)) * Number(inputToNum) * (10 ** 18))))
          }).then(async (res) => {

            // setOpenConfirm(false)
            // setOpenSend(true)
            const res1 = await res.wait()

            if (res1.blockNumber == null) {
              // console.log('nulllllllllll')
            } else {
              setHash(String(res1.hash))
              setOpenConfirm(false)
              setOpenSucced(true)

              setLoading(false)
            }

          }).catch((err) => {
            setErrValue(err.info["error"]['message'])
            // console.log(err)
            openNotification('top')
            handleSwapClose()
            setLoading(false)
            setOpenConfirm(false)
          })
        } else {
          setLoading(true)
          setOpenConfirm(true)
          handleSwapClose()
          await swapContract.swapExactETHForTokens(BigInt(Math.floor((1 - (Number(slippage) / 100)) * Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl)))), [data.filter(item => item.symbol === toToken)[0].address, data.filter(item => item.symbol === fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5, {
            from: address,
            value: BigInt(Math.floor((Number(inputToNum) * (10 ** 18))))
          }).then(async (res) => {

            // setOpenConfirm(false)
            // setOpenSend(true)
            const res1 = await res.wait()

            if (res1.blockNumber == null) {
              // console.log('nulllllllllll')
            } else {
              setHash(String(res1.hash))
              setOpenConfirm(false)
              setOpenSucced(true)

              setLoading(false)
            }

          }).catch((err) => {
            setErrValue(err.info["error"]['message'])

            // console.log(err.info["error"]['message'])
            openNotification('top')
            handleSwapClose()
            setLoading(false)
            setOpenConfirm(false)
          })
        }

        // if (BigInt(data.filter(item => item.symbol === toToken)[0].allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data.filter(item => item.symbol === toToken)[0].decimasl))))) {
        //   handleSwapClose()
        //   setOpenApproval(true)


        // } else {



        // }


        // const tokenContract = new ethers.Contract(data.filter(item => item.symbol === toToken)[0].address, wethAbi, await provider)

        // await tokenContract.deposit({
        //   from: address,
        //   value: String(Number(inputToNum) * (10 ** 18))
        // }).then(async (result) => {
        //   setLoading(true)
        //   await result.wait()




        // })




        // await swapContract.swapExactETHForTokens(String(Number(inputFromNum) * (10 ** Number(data.filter(item => item.symbol === fromToken)[0].decimasl))), ['0x0000D00000000000000000000000000000000000', data.filter(item => item.symbol == fromToken)[0].address], address, new Date().getTime() + 1000 * 60 * 5, {
        //   from: address,
        //   value: String(Number(inputToNum) * (10 ** 18))
        // }).then((res: any) => {
        //   // console.log('结果swap', res)
        //   res.wait()
        //   setLoading(false)
        //   handleSwapClose()
        // }).catch((err) => {
        //   console.log('错误2', err)
        //   openNotification('top')
        //   handleSwapClose()
        // })

      }

    }





    // if (toToken == "WETH") {
    //   await swapContract.swapExactTokensForTokens(BigInt(Number(inputToNum) * (10 ** 18)),BigInt(Number(inputFromNum) * (10 ** 18)), [data.filter(item => item.symbol == toToken)[0].address, data.filter(item => item.symbol == fromToken)[0].address], address, new Date().getTime() + 10000, { from: '0xEBC004b6bB06E85c5111e41C460712CeDD1680FC', value: ethers.parseEther(String(0.01)) }).then((res: any) => {
    //     console.log('结果swap', res)
    //     handleSwapClose()
    //   }).catch((err) => {
    //     console.log('错误1', err)
    //   })
    // } else {
    //   
    // }


  }

  const [openApproval, setOpenApproval] = useState(false)


  const gotoContract = () => {
    window.location.assign(`${arb_url}${UniswapSepoliaRouterContract}`)
  }

  const handleApprovalClose = () => {
    setOpenApproval(false)
  }

  useEffect(() => {

  }, [data])









  return (
    <>
      <ApprovalTokens re={re} WETHAmount={WETHAmount} onUpdate={onUpdate} slippage={slippage} windowHeight={windowHeight} open={openApproval} handleApprovalClose={handleApprovalClose} data={data} toToken={toToken} fromToken={fromToken} inputFromNum={inputFromNum} inputToNum={inputToNum} windowWidth={windowWidth} />

      {contextHolder}
      <Confirm WETHAmount={WETHAmount} windowWidth={windowWidth} open={openConfirm} handleConfirmClose={handleConfirmClose} inputFromNum={inputFromNum} inputToNum={inputToNum} toToken={toToken} fromToken={fromToken} />
      <Seed windowWidth={windowWidth} open={openSend} handleConfirmClose={handleSeedClose} inputFromNum={inputFromNum} inputToNum={inputToNum} toToken={toToken} fromToken={fromToken} />
      <Succeed WETHAmount={WETHAmount} hash={hash} windowWidth={windowWidth} open={openSucced} handleConfirmClose={handleSucceedClose} inputFromNum={inputFromNum} inputToNum={inputToNum} toToken={toToken} fromToken={fromToken} />

      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleSwapClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="20px">
                <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
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
              <DialogContent >

                <Box sx={{ p: '12px 20px' }}>



                  <Stack alignItems="start" spacing="10px">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {formatNumber(Number(inputToNum))} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={36} />



                    </Stack>

                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      {inputToNum == "" ? '$ 0.00' : `$ ${formatTwoNumber(Number(data?.filter((item) => item.symbol == toToken)[0]?.price) * Number(inputToNum))}`}

                    </Typography>

                  </Stack>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>

                <Box sx={{ p: '12px 20px', marginBottom: '10px', marginTop: '10px' }}>



                  <Stack alignItems="start" spacing="10px">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {formatNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={36} />
                    </Stack>
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      {inputFromNum == "" ? '$ 0.00' : `$ ${formatTwoNumber(Number(data?.filter((item) => item.symbol == fromToken)[0]?.price) * Number(inputFromNum))}`}
                    </Typography>

                  </Stack>

                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>{!hidder ? `Show more` : `Fold`}</ShowButton>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>
                <Box sx={{ p: '0 20px', marginBottom: '20px' }}>
                  <Stack spacing={1}>
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
                </Box>


              </DialogContent>
              <DialogActions>
                <SwapButton loading={loading} onClick={handleSwap}>
                  {
                    toToken == 'ETH' ? (
                      <>
                        Confirm Swap
                      </>

                    ) : (
                      <>
                        {
                          data?.filter(item => item.symbol === toToken)[0]?.allowance !== undefined && Math.floor(Number(inputToNum) * (10 ** Number(data?.filter(item => item.symbol === toToken)[0]?.decimasl))) !== undefined ?
                            (
                              <>
                                {
                                  BigInt(data?.filter(item => item.symbol === toToken)[0]?.allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data?.filter(item => item.symbol === toToken)[0]?.decimasl)))) ?
                                    (
                                      <>
                                        Approve & Confirm Swap
                                      </>

                                    ) : (
                                      <>Confirm Swap</>
                                    )
                                }
                              </>

                            ) :
                            (
                              <></>
                            )

                        }

                      </>

                    )
                  }

                </SwapButton>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleSwapClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" p="0 10px" mb="10px">
                  <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
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

                <Box sx={{ marginBottom: '10px', p: '12px 10px' }}>



                  <Stack alignItems="start" spacing="10px">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You pay
                    </Typography>

                    <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {formatNumber(Number(inputToNum))} {toToken}
                      </Typography>

                      <TokenColorIcon name={toToken} size={36} />



                    </Stack>

                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      {inputToNum == "" ? '$ 0.00' : `$ ${formatTwoNumber(Number(data?.filter((item) => item.symbol == toToken)[0]?.price) * Number(inputToNum))}`}
                    </Typography>

                  </Stack>

                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ArrowDownwardIcon sx={{ color: '#1aae70', padding: '0 1px' }} />
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>

                <Box sx={{ marginBottom: '10px', p: '12px 10px' }}>



                  <Stack alignItems="start" spacing="10px">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      You receive
                    </Typography>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">

                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {formatNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                      <TokenColorIcon name={fromToken} size={36} />
                    </Stack>
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#9b9b9b">
                      {inputFromNum == "" ? '$ 0.00' : `$ ${formatTwoNumber(Number(data?.filter((item) => item.symbol == fromToken)[0]?.price) * Number(inputFromNum))}`}
                    </Typography>

                  </Stack>

                </Box>


                <Stack direction="row" alignItems="center" justifyContent="space-between" p="0 20px">
                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                  <ShowButton variant="text" onClick={onShowMore} endIcon={!hidder ? <KeyboardArrowUpIcon sx={{ color: '1aae70' }} /> : <KeyboardArrowDownIcon sx={{ color: '1aae70' }} />}>{!hidder ? `Show more` : `Fold`}</ShowButton>

                  <Box sx={{ flex: 1, backgroundColor: '#c0c0c0', height: '1px' }}></Box>
                </Stack>
                <Box sx={{ p: '0 10px', marginBottom: '10px', mt: '10px' }}>
                  <Stack spacing={1}>
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
                  {/* <Stack spacing={1} sx={{ display: !hidder ? 'none' : 'block', mt: '8px' }}>
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

                  </Stack> */}
                </Box>


                <SwapButton loading={loading} onClick={handleSwap}>
                  {
                    toToken == 'ETH' ? (
                      <>
                        Confirm Swap
                      </>

                    ) : (
                      <>
                        {
                          data?.filter(item => item.symbol === toToken)[0]?.allowance !== undefined && Math.floor(Number(inputToNum) * (10 ** Number(data?.filter(item => item.symbol === toToken)[0]?.decimasl))) !== undefined ?
                            (
                              <>
                                {
                                  BigInt(data?.filter(item => item.symbol === toToken)[0]?.allowance) < BigInt(Math.floor(Number(inputToNum) * (10 ** Number(data?.filter(item => item.symbol === toToken)[0]?.decimasl)))) ?
                                    (
                                      <>
                                        Approve & Confirm Swap
                                      </>

                                    ) : (
                                      <>Confirm Swap</>
                                    )
                                }
                              </>

                            ) :
                            (
                              <></>
                            )

                        }

                      </>

                    )
                  }
                </SwapButton>

              </Box>
            </Box>
          </Drawer>


        )

      }
    </>
  );
}