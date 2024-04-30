import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import { MdAdd } from "react-icons/md";
import InputBase from '@mui/material/InputBase';
import ShowSwap from './showSwap';
import { ethers } from 'ethers';
import SwapAbi from 'abi/swap.json'
import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import ReviewSupply from './reviewSupply';
import SelectAddOneToken from './select_add_token_one';
import SelectAddTwoToken from './select_add_token_two';

// import Select, { components } from 'react-select'






type typeProps = {
  data: any[];
  windowWeight: number;
  windowHeight: number;
  OnChange: () => void
}



const BootstrapInput = styled(InputBase)(({ theme }) => ({

  '& .MuiInputBase-input': {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '26px',
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







const PoolSons = ({ data, windowWeight, OnChange }: typeProps) => {


  const provider = new ethers.JsonRpcProvider(sepolia_rpc)

  const { address } = useAccount();








  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);

  const [reOpen, setReOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)




  const [inputToValue, setInputValue] = useState('')


  const [pay, setPay] = React.useState('H3_test')

  const [balance, setBalance] = React.useState('0')


  const [inputReValue, setInputReValue] = useState('')

  const [oneValue, setOneValue] = useState('0')


  const [receive, setReceive] = React.useState('WETH')

  const handleSwapOpen = () => {
    setOpenSwap(true)
  }


  const handleSwapClose = () => {
    OnChange()
    setOpenSwap(false)
    setInputValue('')
    setInputReValue('')
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
    padding: '6px 12px',
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

  const InputChange = (event: any) => {
    setInputValue(event.target.value)

  }

  const InputFromChange = (event: any) => {
    setInputReValue(event.target.value)

  }


  useEffect(() => {
    // console.log('自己账户的钱', balance)

  }, [balance])





  const Swap = async (value: any) => {

    // console.log(signer)

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    // console.log(data.filter(item => item.symbol == pay)[0].address, data.filter(item => item.symbol == receive)[0].address, swapContract)

    await swapContract.getAmountsOut(BigInt(Number(value) * (10 ** 18)), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
      // console.log('结果', res)
      setInputReValue(String(Number(res[1]) / (10 ** 18)))
    }).catch(err => {
      setInputReValue('0')
      // console.log('错误输出', err)
    })

  }

  const OneSwap = async () => {

    // const signer = await provider.getSigner()

    const swapContract = new ethers.Contract(UniswapSepoliaRouterContract, SwapAbi, provider)

    await swapContract.getAmountsOut(BigInt(Number('1') * (10 ** 18)), [data.filter(item => item.symbol === pay)[0].address, data.filter(item => item.symbol === receive)[0].address]).then((res: any) => {
      // console.log('结果', res)
      setOneValue(String(Number(res[1]) / (10 ** 18)))
    })

  }


  useEffect(() => {

    // console.log('变化')

    if (inputToValue !== '0' && pay !== 'Select token') {
      Swap(inputToValue)
    }

    if (address !== undefined) {
      const tokens = data.filter(item => item.symbol === pay)
      setBalance(String(Number(tokens[0]?.balance) / 10 ** 18))
    }

    if (pay !== "Select token") {
      OneSwap()

    }
  }, [pay, inputToValue, balance])


  useEffect(() => {
    // console.log(inputReValue)

  }, [inputReValue])


  const onMax = () => {
    if (pay !== 'Select token') {
      setInputValue(String(Number(data.filter(item => item.symbol === pay)[0]?.balance) / (10 ** 18)))
    }

  }


  return (
    <>

      <Box sx={{ width: '100%' }}>
        <ReviewSupply open={openSwap} handleSwapClose={handleSwapClose} data={data} inputFromNum={inputReValue} inputToNum={inputToValue} toToken={pay} fromToken={receive} windowWidth={windowWeight} />
        {
          windowWeight >= 600 ? (
            <>
              <Box
                sx={{
                  p: "10px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto", marginBottom: "10px", height: '88px'
                }}
              >
                <SelectAddOneToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box sx={{ position: "relative" }}>

                  <Box sx={{ backgroundColor: '#fff', position: 'absolute', bottom: '-72%', left: '44%', borderRadius: '10px', width: '40px', height: '40px' }}>
                    <Box sx={{ backgroundColor: '#f6f6f6', m: '5px 4px', p: '2px 2px', borderRadius: '6px', border: 'none', textAlign: 'center', lineHeight: '26px' }}>
                      < MdAdd color='#333' />
                    </Box>

                  </Box>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You add
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px' }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${balance}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>



                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0 0 0', height: '56px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput value={inputToValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} />
                    </Stack>
                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        fontWeight: '500',
                        border: 'none',
                        color: '#000',
                        fontSize: '13px',
                      }}
                      startIcon={<TokenColorIcon size={20} name={pay} />}
                      onClick={handleClickToOpen}
                      endIcon={<ChevronDownIcon width="13px" height="13px" cursor="pointer" color="#333" />}
                    >

                      {pay}
                    </IndexTokenButton>
                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto", marginBottom: "10px", height: '88px'
                }}
              >
                <SelectAddTwoToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box sx={{ position: "relative" }}>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You add
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px' }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${balance}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>


                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0 0 0', height: '56px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput value={inputReValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} placeholder="0" />
                    </Stack>
                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        fontWeight: 500,
                        border: 'none',
                        color: '#000',
                        fontSize: '13px',
                      }}
                      onClick={handleClickFromOpen}
                      startIcon={<TokenColorIcon size={20} name={receive} />}
                      endIcon={<ChevronDownIcon height="13px" width="13px" cursor="pointer" color="#333" />}
                    >
                      {receive}
                    </IndexTokenButton>

                  </Stack>
                </Box>
              </Box>

              {
                inputToValue === '' && inputReValue === '' ? (
                  <></>
                ) : (
                  <ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} />

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      inputToValue === '' && inputReValue === '' ? (
                        <Box sx={{ width: "600px", margin: '0 auto' }}>
                          <SelectButton >Enter an Amount</SelectButton>
                        </Box>

                      ) : (
                        <>
                          {
                            Number(balance) >= Number(inputToValue) ? (
                              <Box sx={{ width: "600px", margin: '0 auto' }}>
                                <EnterButton onClick={handleSwapOpen}>Supply</EnterButton>
                              </Box>

                            ) : (
                              <Box sx={{ width: "600px", margin: '0 auto' }}>
                                <SelectButton >Insufficient Balance</SelectButton>
                              </Box>

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
                  p: "12px 10px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "100%", marginBottom: "10px"
                }}
              >
                <SelectAddOneToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box sx={{ position: "relative" }}>

                  <Box sx={{ backgroundColor: '#fff', position: 'absolute', bottom: '-72%', left: '44%', borderRadius: '10px' }}>
                    <Box sx={{ backgroundColor: '#f6f6f6', m: '5px 4px', p: '4px 5px', borderRadius: '6px', border: 'none' }}>
                      < MdAdd color='#333' />
                    </Box>

                  </Box>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You add
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px' }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${balance}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>



                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0 0', height: '46px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput value={inputToValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} />
                    </Stack>
                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        fontWeight: '500',
                        border: 'none',
                        color: '#000',
                        fontSize: '13px',
                      }}
                      startIcon={<TokenColorIcon size={20} name={pay} />}
                      onClick={handleClickToOpen}
                      endIcon={<ChevronDownIcon width="13px" height="13px" cursor="pointer" color="#333" />}
                    >

                      {pay}
                    </IndexTokenButton>
                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "12px 10px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto", marginBottom: "10px", height: '88px'
                }}
              >
                <SelectAddTwoToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box sx={{ position: "relative" }}>
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '11px', fontWeight: 600 }} color="#979797">
                    You add
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 0, right: '2px' }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${balance}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>


                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0 0', height: '46px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput value={inputReValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} placeholder="0" />
                    </Stack>
                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        fontWeight: 500,
                        border: 'none',
                        color: '#000',
                        fontSize: '13px',
                      }}
                      onClick={handleClickFromOpen}
                      startIcon={<TokenColorIcon size={20} name={receive} />}
                      endIcon={<ChevronDownIcon height="13px" width="13px" cursor="pointer" color="#333" />}
                    >
                      {receive}
                    </IndexTokenButton>

                  </Stack>
                </Box>
              </Box>

              {
                inputToValue === '' && inputReValue === '' ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      p: '10px 12px', backgroundColor: "#fff",
                      width: "600px", margin: "0 auto", marginBottom: "10px"
                    }}
                  ><ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} oneSwap={oneValue} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      inputToValue === '' && inputReValue === '' ? (
                        <Box sx={{ width: "600px", margin: '0 auto' }}>
                          <SelectButton >Enter an Amount</SelectButton>
                        </Box>

                      ) : (
                        <>
                          {
                            Number(balance) >= Number(inputToValue) ? (
                              <Box sx={{ width: "600px", margin: '0 auto' }}>
                                <EnterButton onClick={handleSwapOpen}>Supply</EnterButton>
                              </Box>

                            ) : (
                              <Box sx={{ width: "600px", margin: '0 auto' }}>
                                <SelectButton >Insufficient Balance</SelectButton>
                              </Box>

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


export default PoolSons