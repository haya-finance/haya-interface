import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import SelectTOToken from './select_to_token';
import SelectFromToken from './select_from_token';
import { AiOutlineArrowDown } from "react-icons/ai";
import InputBase from '@mui/material/InputBase';
import ShowSwap from './showSwap';
import SwapReviewSwap from './ReviewSwap';
import { ethers } from 'ethers';
import SwapAbi from 'abi/swap.json'
import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';

// import Select, { components } from 'react-select'






type typeProps = {
  data: any[];
  windowWeight: number;
  windowHeight: number;
  OnChange: () => void
}



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 22,
    fontWeight: 700,
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



function formatNumber(num: number) {

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


function ValueNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.round(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 10000
    num = Math.round(num)
    num /= 10000

    return String(num)

  }
}







const SwapSons = ({ data, windowWeight, OnChange }: typeProps) => {

  // console.log('data', data)


  const provider = new ethers.JsonRpcProvider(sepolia_rpc)

  const { address, chain } = useAccount();
  const [disable, setDisable] = React.useState(true)








  // console.log('arrs', arrs)




  useEffect(() => {
    if (chain?.id !== undefined) {
      setDisable(false)
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


  const handleSwapClose = () => {
    OnChange()
    setOpenSwap(false)
    setInputValue('')
    setInputReValue('')
    setInputShowValue('')
    setInputReShowValue('')
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
    color: '#fff',
    backgroundColor: '#9b9b9b',
    border: 0,
    marginRight: 0,
    '.MuiStack-root>:not(style)+:not(style)': {
      marginRight: 0,
      zIndex: 10
    },
    '&:hover': {
      backgroundColor: '#9b9b9b',
      color: '#fff'
    },
  }));

  const SelectButton = styled(Button)<ButtonProps>(({ theme }) => ({
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
    width: '100%',
    color: '#fff',
    border: 0,
    backgroundColor: '#1aae70',
    '&:hover': {
      backgroundColor: '#1aae70',
      color: '#fff',
    },
  }));


  const ConnectNetorkButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#1AAE70',
    },
  }));

  const Swap = async (value: any) => {

    // console.log(signer)

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    // console.log(data.filter(item => item.symbol == pay)[0].address, data.filter(item => item.symbol == receive)[0].address, swapContract)

    await swapContract.getAmountsOut(BigInt(Number(value) * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
      // console.log('结果', res)
      setInputReValue(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))))
      setInputReShowValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
    }).catch(err => {
      setInputReValue('0')
      setInputReShowValue('0')
      // console.log('错误输出', err)
    })

  }


  const ReSwap = async (value: any) => {

    // console.log(signer)

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    // console.log(BigInt(Number(value) * (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))), [data.filter(item => item.symbol === receive)[0].address, data.filter(item => item.symbol === pay)[0].address])

    await swapContract.getAmountsOut(BigInt(Number(value) * (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))), [data.filter(item => item.symbol === receive)[0].address, data.filter(item => item.symbol === pay)[0].address]).then((res: any) => {
      // console.log('结果', res)
      setInputValue(String(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))))
      setInputShowValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))) ?? '')
    }).catch(err => {
      setInputValue('0')
      setInputShowValue('0')
      // console.log('错误输出', err)
    })

  }


  useEffect(() => {

  }, [inputReShowValue, inputToShowValue])

  const OneSwap = async () => {

    // const signer = await provider.getSigner()

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    await swapContract.getAmountsOut(BigInt(Number('1') * (10 ** Number(data.filter(item => item.symbol === pay)[0].decimasl))), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
      // console.log('结果', res)
      setOneValue(ValueNumber(Number(res[1]) / (10 ** Number(data.filter(item => item.symbol === receive)[0].decimasl))) ?? '')
    })

  }

  const InputChange = (event: any) => {
    const newValue = event.target.value.replace(/-/, '')
    setInputValue(newValue)
    setInputShowValue(newValue)
    if (pay !== 'Select token' && receive !== "Select token") {
      Swap(newValue)
      OneSwap()
    }


  }

  const InputFromChange = (event: any) => {
    const newValue = event.target.value.replace(/-/, '')
    setInputReValue(newValue)
    setInputReShowValue(newValue)
    if (pay !== 'Select token' && receive !== "Select token") {
      // console.log('数量', newValue)
      ReSwap(newValue)
      OneSwap()
    }

  }

  const handleBlur = () => {
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
    // console.log('自己账户的钱', balance)

  }, [balance, reBalance])

  useEffect(() => {
    // console.log('自己账户的钱', balance)
    if (address !== undefined && pay !== "Select token") {
      setDisable(false)
      const tokens = data.filter(item => item.symbol === pay)
      const Retokens = data.filter(item => item.symbol === receive)
      setBalance(String(Number(tokens[0]?.balance)))
      setReBalance(String(Number(Retokens[0]?.balance)))
    }

  }, [address])



  const OnExchange = () => {
    const to = pay
    setPay(receive)
    setReceive(to)
  }





  useEffect(() => {



    if (pay !== "Select token" && address !== undefined) {
      const tokens = data.filter(item => item.symbol === pay)
      // console.log('tokens', tokens)
      setBalance(String(Number(tokens[0]?.balance)))
    }

    if (pay !== 'Select token' && receive !== 'Select token') {

      OneSwap()
      if (inputToValue !== "") {
        Swap(inputToValue)
      } else if (inputReValue !== "") {
        ReSwap(inputReValue)

      }
    }
  }, [pay, receive])






  useEffect(() => {
    // console.log(inputReValue)

  }, [inputReValue])


  const onMax = () => {
    if (pay !== 'Select token') {
      const tokens = data.filter(item => item.symbol === pay)
      setInputValue(String(Number(tokens[0]?.balance) / Number(tokens[0]?.decimasl)))
      setInputShowValue(String(Number(tokens[0]?.balance) / Number(tokens[0]?.decimasl)))
    }

  }

  const { switchChain } = useSwitchChain()


  const onChangeNetwork = () => {
    switchChain({ chainId: 421614 })

  }


  return (
    <>

      <Box sx={{ width: '100%' }}>
        <SwapReviewSwap open={openSwap} handleSwapClose={handleSwapClose} data={data} inputFromNum={inputReValue} inputToNum={inputToValue} toToken={pay} fromToken={receive} windowWidth={windowWeight} />
        {
          windowWeight >= 600 ? (
            <>
              <Box
                sx={{
                  p: "0.5rem", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "600px", margin: "0 auto", marginBottom: "9px"
                }}
              >
                <SelectTOToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box sx={{ position: "relative" }}>

                  <Box sx={{ backgroundColor: '#fff', position: 'absolute', bottom: '-46%', left: '46%', borderRadius: '4px' }}>
                    <Box component="button" sx={{ backgroundColor: '#f6f6f6', m: '5px 6px', p: '5px 6px', borderRadius: '4px', cursor: 'pointer', border: 'none' }} onClick={OnExchange}>
                      <AiOutlineArrowDown color='#333' size={15} />
                    </Box>

                  </Box>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You pay
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    $ 0.00
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px', display: pay === 'Select token' ? 'none' : "block" }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span>{`${formatNumber(Number(balance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px' }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>



                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput disabled={disable} onBlur={handleBlur} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '22px' }} />
                    </Stack>

                    {
                      pay === "Select token" ? (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#1AAE70',
                              fontWeight: '500',
                              color: '#fff',
                              fontSize: '14px',
                            }}
                            disabled={disable}
                            onClick={handleClickToOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {pay === 'Select token' ? <></> : <TokenColorIcon size={20} name={pay} />}
                            {pay}
                          </IndexTokenButton>
                        </>

                      ) : (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#fff',
                              border: 'none',
                              color: '#000',
                              fontSize: '14px',
                            }}
                            disabled={disable}
                            onClick={handleClickToOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {pay === 'Select token' ? <></> : <TokenColorIcon size={20} name={pay} />}
                            {pay}
                          </IndexTokenButton>
                        </>

                      )

                    }

                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "0.5rem", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "600px", margin: "0 auto", marginBottom: "10px"
                }}
              >
                <SelectFromToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box sx={{ position: "relative" }}>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You receive
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    $ 0.00
                  </Typography>
                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput disabled={disable} onBlur={handleReBlur} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', fontSize: '22px', color: '#6f6f6f' }} placeholder="0" />
                    </Stack>

                    {
                      receive === "Select token" ? (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#1AAE70',
                              fontWeight: '500',

                              color: '#fff',
                              fontSize: '14px',
                            }}
                            disabled={disable}
                            onClick={handleClickFromOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {receive === 'Select token' ? <></> : <TokenColorIcon size={20} name={receive} />}
                            {receive}
                          </IndexTokenButton>
                        </>

                      ) : (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#fff',
                              border: 'none',
                              color: '#000',
                              fontSize: '14px',
                            }}
                            disabled={disable}
                            onClick={handleClickFromOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {receive === 'Select token' ? <></> : <TokenColorIcon size={20} name={receive} />}
                            {receive}
                          </IndexTokenButton>
                        </>

                      )

                    }

                  </Stack>
                </Box>






              </Box>

              {
                pay === "Select token" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      pl: "0.7rem", pr: '0.3rem', backgroundColor: "#fff",
                      width: "600px", margin: "0 auto", marginBottom: "10px"
                    }}
                  ><ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id === undefined ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto' }}>
                            <ConnectNetorkButton onClick={onChangeNetwork}>
                              Connect to Arbitrum Sepolia
                            </ConnectNetorkButton>
                          </Box>

                        </>

                      ) : (
                        <>
                          {
                            pay === "Select token" ? (
                              <>
                                <Box sx={{ width: "600px", margin: '0 auto' }}>
                                  <SelectButton >Select a token</SelectButton>
                                </Box>
                              </>

                            ) : (
                              <>
                                {
                                  inputToValue === '' && inputReValue === '' ? (
                                    <Box sx={{ width: "600px", margin: '0 auto' }}>
                                      <SelectButton >Enter amount</SelectButton>
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
              <Box
                sx={{
                  p: "0.5rem", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "100%", marginBottom: "9px"
                }}
              >
                <SelectTOToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box sx={{ position: "relative" }}>

                  <Box sx={{ backgroundColor: '#fff', position: 'absolute', bottom: '-46%', left: '46%', borderRadius: '4px' }}>
                    <Box component="button" sx={{ backgroundColor: '#f6f6f6', m: '5px 6px', p: '5px 6px', borderRadius: '4px', cursor: 'pointer', border: 'none' }} onClick={OnExchange}>
                      <AiOutlineArrowDown color='#333' size={15} />
                    </Box>

                  </Box>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You pay
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    $ 0.00
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px' }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000' }}>{`${balance}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", fontSize: '11px', minWidth: 0, p: 0 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput disabled={disable} onBlur={handleBlur} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', fontSize: '22px', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354' }} />
                    </Stack>

                    {
                      pay === "Select token" ? (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#1AAE70',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#fff',
                            }}
                            disabled={disable}
                            onClick={handleClickToOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {pay === 'Select token' ? <></> : <TokenColorIcon size={20} name={pay} />}
                            {pay}
                          </IndexTokenButton>
                        </>

                      ) : (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#fff',
                              border: 'none',
                              fontSize: '14px',
                              color: '#000',
                            }}
                            disabled={disable}
                            onClick={handleClickToOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {pay === 'Select token' ? <></> : <TokenColorIcon size={20} name={pay} />}
                            {pay}
                          </IndexTokenButton>
                        </>

                      )

                    }

                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "0.5rem", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "100%", marginBottom: "9px"
                }}
              >
                <SelectFromToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box sx={{ position: "relative" }}>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You receive
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    $ 0.00
                  </Typography>
                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput disabled={disable} onBlur={handleReBlur} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', fontSize: '22px', color: '#6f6f6f' }} placeholder="0" />
                    </Stack>

                    {
                      receive === "Select token" ? (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#1AAE70',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#fff',
                            }}
                            disabled={disable}
                            onClick={handleClickFromOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {receive === 'Select token' ? <></> : <TokenColorIcon size={20} name={receive} />}
                            {receive}
                          </IndexTokenButton>
                        </>

                      ) : (
                        <>
                          <IndexTokenButton
                            variant="text"
                            sx={{
                              borderRadius: '1.12rem',
                              backgroundColor: '#fff',
                              fontSize: '14px',
                              border: 'none',
                              color: '#000',
                            }}
                            disabled={disable}
                            onClick={handleClickFromOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {receive === 'Select token' ? <></> : <TokenColorIcon size={20} name={receive} />}
                            {receive}
                          </IndexTokenButton>
                        </>

                      )

                    }

                  </Stack>
                </Box>






              </Box>

              {
                pay === "Select token" ? (
                  <></>
                ) : (
                  <Box
                    pl="0.7rem" sx={{
                      mt: '10px', mb: 2, pl: '0.7rem', bg: "#fff", pr: "0.3rem",
                      width: "100%"
                    }}
                  ><ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id !== undefined ? (
                        <>
                          {
                            pay === "Select token" ? (
                              <>
                                <Box sx={{ width: '100%' }}>
                                  <SelectButton>Select a token</SelectButton>
                                </Box>
                              </>

                            ) : (
                              <>
                                {
                                  inputToValue === '' && inputReValue === '' ? (
                                    <Box sx={{ width: '100%' }}>
                                      <SelectButton >Enter amount</SelectButton>
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
                          <Box sx={{ width: '100%' }}>
                            <ConnectNetorkButton onClick={onChangeNetwork}>
                              Connect to Arbitrum Sepolia
                            </ConnectNetorkButton>
                          </Box>


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