import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box, IconButton } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import SelectTOToken from './select_to_token';
import SelectFromToken from './select_from_token';
import InputBase from '@mui/material/InputBase';
import ShowSwap from './showSwap';
import SwapReviewSwap from './ReviewSwap';
import { ethers } from 'ethers';
import SwapAbi from 'abi/swap.json'
import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';


import swap from 'assets/images/icon/swap.svg'

// import Select, { components } from 'react-select'


const provider = new ethers.JsonRpcProvider(sepolia_rpc)



type typeProps = {
  data: any[];
  windowWeight: number;
  windowHeight: number;
  OnChange: () => void;
  slippage: string;
}



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: 0,
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 700,
    height: '30px',
    padding: 0,
    width: '100%',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: 'none',
      border: 0
    },
  },
}));



// function formatNumber(num: number) {

//   if (num % 1 !== 0) {
//     const decimalPart = num.toString().split('.')[1]

//     for (let i = 0; i < decimalPart.length; i++) {
//       if (Number(decimalPart[i]) !== 0) {
//         num *= 10 ** (i + 4)
//         num = Math.round(num)
//         num /= 10 ** (i + 4)
//         var parts = num.toString().split(".");
//         parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         return parts.join(".");
//       }
//     }
//   } else {
//     return num.toLocaleString()

//   }
// }

function formatNumber(num: number) {

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







const SwapSons = ({ data, windowWeight, OnChange, slippage, windowHeight }: typeProps) => {

  // console.log('data', data)




  const { address, chain } = useAccount();
  const [disable, setDisable] = React.useState(true)














  // console.log('arrs', arrs)




  useEffect(() => {
    if (chain?.id !== undefined) {
      setDisable(false)
    } else {
      setDisable(true)
    }

  }, [chain?.id])




  const [open, setOpen] = React.useState(false);

  const [reOpen, setReOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)




  const [inputToValue, setInputValue] = useState('')
  const [inputToShowValue, setInputShowValue] = useState('')


  const [pay, setPay] = React.useState('Select token')

  const [balance, setBalance] = React.useState('0')
  const [reBalance, setReBalance] = React.useState('0')


  const [inputReValue, setInputReValue] = useState('')
  const [inputReShowValue, setInputReShowValue] = useState('')

  const [oneValue, setOneValue] = useState('0')


  const [receive, setReceive] = React.useState('H20')

  const handleSwapOpen = () => {
    setOpenSwap(true)
  }

  const onUpdate = () => {
    OnChange()
    setInputValue('')
    setInputReValue('')
    setInputShowValue('')
    setInputReShowValue('')


  }


  const handleSwapClose = () => {

    setOpenSwap(false)

  }

  const handleClickFromOpen = () => {
    setReOpen(true)

  }

  const handleReClose = () => {
    setReOpen(false)
  }

  const handleFromToken = (value: string) => {

    const fromToke = receive
    setReOpen(false)
    setReceive(value)

    if (value === pay) {
      setPay(fromToke)
    }
  }



  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToToken = (value: string) => {

    const toToken = pay


    setOpen(false)
    setPay(value)

    if (value === receive) {
      setReceive(toToken)
    }

  }


  const IndexTokenButton = styled(Button)<ButtonProps>(({ theme }) => ({
    // width: '%',
    padding: '6px 8px 6px 10px',
    color: '#fff',
    backgroundColor: '#9b9b9b',
    border: 0,
    marginRight: 0,
    '.MuiStack-root>:not(style)+:not(style)': {
      marginRight: 0,
      zIndex: 10
    }
  }));

  const SelectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    padding: windowWeight >= 600 ? '18px 0' : '15px 0',
    fontSize: '18px',
    lineHeight: '20px',
    borderRadius: '20px',
    fontWeight: 500,
    width: '100%',
    color: '#fff',
    border: 0,
    backgroundColor: '#9b9b9b',
    '&:hover': {
      backgroundColor: '#9b9b9b',
      color: '#fff',
    },
  }));


  const EnterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    padding: windowWeight >= 600 ? '18px 0' : '15px 0',
    fontSize: '18px',
    lineHeight: '20px',
    borderRadius: '20px',
    fontWeight: 500,
    width: '100%',
    color: '#fff',
    border: 0,
    backgroundColor: '#1aae70',
    '&:hover': {
      backgroundColor: '#1aae70',
      color: '#fff',
    },
  }));

  const [WETHAmount, setWETHAmount] = useState('')


  const Swap = async (value: any) => {
    // console.log(value)

    // console.log(signer)

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    // console.log(data.filter(item => item.symbol == pay)[0].address, data.filter(item => item.symbol == receive)[0].address, swapContract)

    if (pay == 'USDT' || receive == 'USDT' || pay == 'USDC' || receive == 'USDC') {
      await swapContract.getAmountsOut(BigInt(Math.round(Number(Number(value) * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === 'WETH')[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
        // console.log('结果', res, String(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))))
        setInputReValue(String(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))))
        setInputReShowValue(ValueNumber(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
        setWETHAmount(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === 'WETH')[0].decimasl))))
      }).catch(err => {
        // console.log('err', err)
        setInputReValue('')
        setInputReShowValue('')
        // console.log('错误输出', err)
      })
    } else {
      await swapContract.getAmountsOut(BigInt(Math.round(Number(Number(value)) * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl)))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
        // console.log('结果', res)
        setInputReValue(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))))
        setInputReShowValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
      }).catch(err => {
        // console.log('err', err)
        setInputReValue('')
        setInputReShowValue('')
        // console.log('错误输出', err)
      })
    }

  }


  const ReSwap = async (value: any) => {
    // console.log('value', value)

    // console.log(signer)

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    // console.log(BigInt(Number(value) * (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))), [data.filter(item => item.symbol === receive)[0].address, data.filter(item => item.symbol === pay)[0].address])

    if (pay == 'USDT' || receive == 'USDT' || pay == 'USDC' || receive == 'USDC') {
      await swapContract.getAmountsOut(BigInt(Math.round(Number(Number(value)) * (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl)))), [data.filter(item => item.symbol === receive)[0].address, data.filter(item => item.symbol === 'WETH')[0].address, data.filter(item => item.symbol === pay)[0].address]).then((res: any) => {
        // console.log('结果', res)
        setInputValue(String(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))))
        setInputShowValue(ValueNumber(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))) ?? '')
        setWETHAmount(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === 'WETH')[0].decimasl))))
      }).catch(err => {
        // console.log('错误输出', err)
        setInputValue('')
        setInputShowValue('')

      })

    } else {
      await swapContract.getAmountsOut(BigInt(Math.round(Number(Number(value)) * (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl)))), [data.filter(item => item.symbol === receive)[0].address, data.filter(item => item.symbol === pay)[0].address]).then((res: any) => {
        // console.log('结果', res)
        setInputValue(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))))
        setInputShowValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))) ?? '')
      }).catch(err => {
        // console.log('错误输出', err)
        setInputValue('')
        setInputShowValue('')

      })
    }



  }


  useEffect(() => {

  }, [inputReShowValue, inputToShowValue])

  const OneSwap = async () => {

    // const signer = await provider.getSigner()

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    if (pay == 'USDT' || receive == 'USDT' || pay == 'USDC' || receive == 'USDC') {
      await swapContract.getAmountsOut(BigInt(Number(1) * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === 'WETH')[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
        // console.log('结果', res)
        setOneValue(ValueNumber(Number(res[2]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
      })

    } else {
      await swapContract.getAmountsOut(BigInt(Number(1) * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {

        setOneValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
      })
    }



  }

  useEffect(() => {

  }, [WETHAmount])

  const InputChange = (event: any) => {
    const newValue = event.target.value.replace(/[^0-9.]/g, '')
    setInputValue(newValue)
    setInputShowValue(newValue)

    if (pay !== 'Select token' && receive !== "Select token" && !isNaN(Number(newValue))) {
      console.log(newValue)
      Swap(newValue)
    }
    // if (String(event.target.value) == "") {
    //   console.log('1111')
    //   setInputReShowValue("")
    //   setInputReValue("")
    // } else {
    //   if (pay !== 'Select token' && receive !== "Select token") {
    //     console.log('value', newValue, event.target.value)
    //     Swap(newValue)
    //   }
    // }



  }

  const InputFromChange = (event: any) => {
    const newValue = event.target.value.replace(/[^0-9.]/g, '')
    setInputReValue(newValue)
    setInputReShowValue(newValue)
    if (pay !== 'Select token' && receive !== "Select token" && !isNaN(Number(newValue))) {
      // console.log('数量', newValue)
      ReSwap(String(Number(newValue)))
    }


  }

  const onFocus = () => {
    // console.log('111111111111111')
  }

  const handleBlur = () => {
    // console.log('111')
    const parsedValue = parseFloat(inputToValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputValue(String(Math.abs(parsedValue)))
      setInputShowValue(String(Math.abs(parsedValue)))
    }
  }

  const handleReBlur = () => {
    const parsedValue = parseFloat(inputReValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputReValue(String(Math.abs(parsedValue)))
      setInputReShowValue(String(Math.abs(parsedValue)))
    }
  }


  useEffect(() => {
    // console.log('自己账户的钱', balance, reBalance)

  }, [balance, reBalance])

  useEffect(() => {
    // console.log('自己账户的钱', balance)



    if (address !== undefined && pay !== "Select token") {
      // setDisable(false)
      const tokens = data.filter(item => item.symbol === pay)
      setBalance(String(Number(tokens[0]?.balance)))
    } else {
      setBalance('0')

    }


    if (address !== undefined && receive !== "Select token") {
      const Retokens = data.filter(item => item.symbol === receive)
      setReBalance(String(Number(Retokens[0]?.balance)))


    } else {
      setReBalance('0')

    }

  }, [address, data, receive, pay, balance, reBalance])







  const OnExchange = () => {
    const to = pay
    setPay(receive)
    setReceive(to)
    const toValue = inputToValue
    const toShowValue = inputToShowValue
    setInputValue(inputReValue)
    setInputShowValue(inputReShowValue)
    setInputReValue(toValue)
    setInputReShowValue(toShowValue)
  }





  useEffect(() => {

    if (pay !== 'Select token' && receive !== 'Select token') {

      OneSwap()
      if (inputToValue !== "" && inputReValue == "") {
        // console.log('11111')
        Swap(inputToValue)
      } else if (inputReValue !== "" && inputToValue == "") {
        ReSwap(inputReValue)
      } else if (inputReValue !== "" && inputToValue !== "") {
        Swap(inputToValue)
      }
    }

  }, [pay, receive, data, balance, reBalance])










  useEffect(() => {
    // console.log(inputReValue)

  }, [inputReValue, inputToShowValue, inputReShowValue, inputToValue])


  const onMax = () => {
    if (pay !== 'Select token') {
      const tokens = data.filter(item => item?.symbol === pay)
      setInputValue(String(Number(tokens[0]?.balance)))
      setInputShowValue(ValueNumber(Number(tokens[0]?.balance)) ?? '0')
      Swap(String(Number(tokens[0]?.balance)))
    } else {
      setInputValue('0')
      setInputShowValue('0')

    }

  }


  const onReMax = () => {
    if (receive !== 'Select token') {
      const tokens = data.filter(item => item?.symbol === receive)
      setInputReValue(String(Number(tokens[0]?.balance)))
      setInputReShowValue(ValueNumber(Number(tokens[0]?.balance)) ?? '0')
      ReSwap(String(Number(tokens[0]?.balance)))

    } else {
      setInputReValue('0')
      setInputReShowValue('0')

    }


  }



  return (
    <>

      <Box sx={{ width: '100%' }}>
        <SwapReviewSwap WETHAmount={WETHAmount} onUpdate={onUpdate} windowHeight={windowHeight} slippage={slippage} open={openSwap} handleSwapClose={handleSwapClose} data={data} inputFromNum={inputReValue} inputToNum={inputToValue} toToken={pay} fromToken={receive} windowWidth={windowWeight} />
        {
          windowWeight >= 600 ? (
            <>
              <Box >
                <Box
                  sx={{
                    p: "12px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                    width: "600px", margin: "0 auto", marginBottom: "10px", position: "relative"
                  }}
                >
                  <SelectTOToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                  <Box >
                    <IconButton onClick={OnExchange} sx={{ position: 'absolute', bottom: '-17%', left: '47%' }}>
                      <img src={swap} />

                    </IconButton>



                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        You pay
                      </Typography>

                      <Stack direction="row" spacing="10px" alignItems="center">
                        <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                          Balance: <span style={{ color: '#000', fontWeight: 700, fontSize: '13px' }}>{`${ValueNumber(Number(balance))}`}</span>
                        </Typography>
                        <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '12px', fontWeight: 700 }} onClick={onMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>

                    </Stack>



                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0' }} justifyContent="space-between" spacing={2}>
                      <Stack flex={1} >
                        <BootstrapInput onFocus={onFocus} onBlur={handleBlur} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#000' : '#EE3354', fontSize: '32px' }} />
                      </Stack>

                      {
                        pay === "Select token" ? (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                fontWeight: 500,
                                color: '#fff',
                                fontSize: '14px',
                                "&:hover": {
                                  backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                  color: '#fff',
                                }
                              }}
                              onClick={handleClickToOpen}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {pay}
                            </IndexTokenButton>
                          </>

                        ) : (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: '#fff',
                                border: 'none',
                                color: '#000',
                                fontWeight: 600,
                                fontSize: '14px',
                                "&:hover": {
                                  backgroundColor: '#fff',
                                  color: '#000',
                                }
                              }}
                              onClick={handleClickToOpen}
                              startIcon={<TokenColorIcon size={22} name={pay} />}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {pay}
                            </IndexTokenButton>
                          </>

                        )

                      }

                    </Stack>

                    <Stack direction="row" alignItems="start">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        {inputToValue !== "" ? `$ ${formatNumber(Number(data?.filter((item) => item.symbol == pay)[0]?.price) * Number(inputToValue))}` : '$ 0.00'}
                      </Typography>

                    </Stack>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: "12px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                    width: "600px", margin: "0 auto", marginBottom: "10px"
                  }}
                >
                  <SelectFromToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                  <Box>



                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        You receive
                      </Typography>
                      <Stack direction="row" spacing="10px">
                        <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                          Balance: <span style={{ color: '#000', fontWeight: 700, fontSize: '13px' }}>{`${ValueNumber(Number(reBalance))}`}</span>
                        </Typography>
                        <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '12px', fontWeight: 700 }} onClick={onReMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>

                    </Stack>
                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0' }} justifyContent="space-between" spacing={2}>
                      <Stack flex={1}>
                        <BootstrapInput onBlur={handleReBlur} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', fontSize: '32px', color: '#000' }} placeholder="0" />
                      </Stack>

                      {
                        receive === "Select token" ? (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                fontWeight: 500,
                                color: '#fff',
                                fontSize: '14px',
                                "&:hover": {
                                  backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                  color: '#fff',

                                }
                              }}
                              onClick={handleClickFromOpen}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {receive}
                            </IndexTokenButton>
                          </>

                        ) : (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: '#fff',
                                border: 'none',
                                color: '#000',
                                fontWeight: 600,
                                fontSize: '14px',
                                "&:hover": {
                                  backgroundColor: '#fff',
                                  color: '#000',

                                }
                              }}
                              onClick={handleClickFromOpen}
                              startIcon={<TokenColorIcon size={22} name={receive} />}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {receive}
                            </IndexTokenButton>
                          </>

                        )

                      }

                    </Stack>
                    <Stack direction="row" alignItems="start">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        {inputReValue == "" ? '$ 0.00' : `$ ${formatNumber(Number(data?.filter((item) => item.symbol == receive)[0]?.price) * Number(inputReValue))}`}
                      </Typography>
                    </Stack>
                  </Box>






                </Box>
              </Box>

              {
                pay === "Select token" || receive === "Select token" ? (
                  <></>
                ) : (<ShowSwap liquidity={slippage} windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} />

                )
              }
              {
                address !== undefined && chain?.id !== undefined ? (
                  <>
                    {
                      pay === "Select token" || receive === "Select token" ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto' }}>
                            <SelectButton >Select a Token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputToValue === '' || inputReValue === '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto' }}>
                                <SelectButton >Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(balance) >= Number(inputToValue) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto' }}>
                                      <EnterButton onClick={handleSwapOpen}>Swap</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "600px", margin: '0 auto' }}>
                                      <SelectButton >Insufficient balane</SelectButton>
                                    </Box>

                                  )

                                }

                              </>

                            )
                          }

                        </>

                      )

                    }

                  </>



                ) : (
                  <>

                  </>



                )
              }
            </>
          ) : (
            <>
              <Box>
                <Box
                  sx={{
                    p: "12px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                    width: "100%", marginBottom: "10px", position: "relative"
                  }}
                >
                  <SelectTOToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                  <Box >
                    <IconButton onClick={OnExchange} sx={{ position: 'absolute', bottom: '-17%', left: '45%' }}>
                      <img src={swap} />
                    </IconButton>


                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        You pay
                      </Typography>
                      <Stack direction="row" spacing="10px">
                        <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                          Balance: <span style={{ color: '#000', fontWeight: 700, fontSize: '13px' }}>{`${ValueNumber(Number(balance))}`}</span>
                        </Typography>
                        <Typography component={Button} variant='body1' sx={{ textDecoration: "none", fontSize: '12px', minWidth: 0, p: 0, fontWeight: 700 }} onClick={onMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>


                    </Stack>
                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0' }} justifyContent="space-between">
                      <Stack flex={1} >
                        <BootstrapInput onBlur={handleBlur} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', fontSize: '32px', color: Number(balance) >= Number(inputToValue) ? '#000' : '#EE3354' }} />
                      </Stack>

                      {
                        pay === "Select token" ? (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',

                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#fff',
                                "&:hover": {
                                  backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                  color: '#fff',

                                }
                              }}
                              onClick={handleClickToOpen}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {pay}
                            </IndexTokenButton>
                          </>

                        ) : (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: '#fff',
                                border: 'none',
                                fontSize: '14px',
                                color: '#000',
                                fontWeight: 600,
                                "&:hover": {
                                  backgroundColor: '#fff',
                                  color: '#000',

                                }
                              }}
                              disabled={disable}
                              onClick={handleClickToOpen}
                              startIcon={<TokenColorIcon size={22} name={pay} />}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {pay}
                            </IndexTokenButton>
                          </>

                        )

                      }

                    </Stack>
                    <Stack direction="row" alignItems="start">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        {inputToValue == "" ? '$ 0.00' : `$ ${formatNumber(Number(data?.filter((item) => item.symbol == pay)[0]?.price) * Number(inputToValue))}`}
                      </Typography>


                    </Stack>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: "12px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                    width: "100%", marginBottom: "10px"
                  }}
                >
                  <SelectFromToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                  <Box >



                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        You receive
                      </Typography>
                      <Stack direction="row" spacing="10px">
                        <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                          Balance: <span style={{ color: '#000', fontSize: '13px', fontWeight: 700 }}>{`${ValueNumber(Number(reBalance))}`}</span>
                        </Typography>
                        <Typography component={Button} variant='body1' sx={{ textDecoration: "none", fontSize: '12px', minWidth: 0, p: 0, fontWeight: 700 }} onClick={onReMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>

                    </Stack>
                    <Stack alignItems="center" direction="row" sx={{ padding: '10px 0' }} justifyContent="space-between" >
                      <Stack flex={1}>
                        <BootstrapInput onBlur={handleReBlur} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', fontSize: '32px', color: '#000' }} placeholder="0" />
                      </Stack>

                      {
                        receive === "Select token" ? (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#fff',
                                "&:hover": {
                                  backgroundColor: address !== undefined && chain?.id == undefined ? '#9B9B9B' : '#1AAE70',
                                  color: '#fff',
                                }

                              }}
                              onClick={handleClickFromOpen}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {receive}
                            </IndexTokenButton>
                          </>

                        ) : (
                          <>
                            <IndexTokenButton
                              variant="text"
                              sx={{
                                borderRadius: '100px',
                                backgroundColor: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                color: '#000',
                                "&:hover": {
                                  backgroundColor: '#fff',
                                  color: '#000',
                                }
                              }}
                              startIcon={<TokenColorIcon size={22} name={receive} />}
                              onClick={handleClickFromOpen}
                              endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                            >
                              {receive}
                            </IndexTokenButton>
                          </>

                        )

                      }

                    </Stack>
                    <Stack direction="row" alignItems="start">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        {inputReValue == "" ? '$ 0.00' : `$ ${formatNumber(Number(data?.filter((item) => item.symbol == receive)[0]?.price) * Number(inputReValue))}`}
                      </Typography>
                    </Stack>
                  </Box>






                </Box>
              </Box>

              {
                pay === "Select token" || receive === "Select token" ? (
                  <></>
                ) : (
                  <ShowSwap liquidity={slippage} windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} />

                )
              }
              {
                address !== undefined && chain?.id !== undefined ? (
                  <>
                    {
                      pay === "Select token" || receive === "Select token" ? (
                        <>
                          <Box sx={{ width: '100%' }}>
                            <SelectButton>Select a Token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputToValue === '' || inputReValue === '' ? (
                              <Box sx={{ width: '100%' }}>
                                <SelectButton >Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(balance) >= Number(inputToValue) ? (
                                    <Box sx={{ width: '100%' }}>
                                      <EnterButton onClick={handleSwapOpen}>Swap</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: '100%' }}>
                                      <SelectButton >Insufficient balane</SelectButton>
                                    </Box>

                                  )

                                }

                              </>

                            )
                          }

                        </>

                      )

                    }
                  </>



                ) : (
                  <>

                  </>



                )
              }
            </>
          )
        }




      </Box>
    </>
  )

}


export default SwapSons