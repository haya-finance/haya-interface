import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import { MdAdd } from "react-icons/md";
import InputBase from '@mui/material/InputBase';
import ShowSwap from './showSwap';
// import { ethers } from 'ethers';
// import SwapAbi from 'abi/swap.json'
// import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import ReviewSupply from './reviewSupply';
import SelectAddOneToken from './select_add_token_one';
import SelectAddTwoToken from './select_add_token_two';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';

// import Select, { components } from 'react-select'






type typeProps = {
  data: any[];
  windowWeight: number;
  windowHeight: number;
  OnChange: () => void;
  slippage: string;
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



function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.floor(num)
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







const PoolSons = ({ data, windowWeight, OnChange, windowHeight, slippage }: typeProps) => {


  // const provider = new ethers.JsonRpcProvider(sepolia_rpc)

  const { address, chain } = useAccount();








  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(true)

  const [reOpen, setReOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)




  const [inputToValue, setInputValue] = useState('')
  const [inputToShowValue, setInputShowValue] = useState('')


  const [pay, setPay] = React.useState('H20')

  const [balance, setBalance] = React.useState('0')

  const [reBalance, setReBalance] = React.useState('0')


  const [inputReValue, setInputReValue] = useState('')
  const [inputReShowValue, setInputReShowValue] = useState('')


  const [receive, setReceive] = React.useState('ETH')

  useEffect(() => {
    if (chain?.id !== undefined) {
      setDisable(false)
    }

    if (address !== undefined) {
      setDisable(false)
    }

  }, [chain?.id, address])




  const handleSwapOpen = () => {
    setOpenSwap(true)
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

  const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#1AAE70',
    },
  }));

  const [openWallet, setOpenWallet] = useState(false)



  const walletConnect = () => {
    setOpenWallet(true);
  };

  const onClose = () => {
    setOpenWallet(false);
  };

  const InputChange = (event: any) => {
    const newValue = event.target.value.replace(/-/, '')
    setInputValue(newValue)
    setInputShowValue(newValue)
    const toToken = data.filter(item => item.symbol === pay)
    const fromToken = data.filter(item => item.symbol === receive)
    const num = (Number(fromToken[0].proportion) * Number(newValue)) / Number(toToken[0].proportion)
    setInputReValue(String(num))
    setInputReShowValue(ValueNumber(num) ?? '0')

  }

  const InputFromChange = (event: any) => {
    const newValue = event.target.value.replace(/-/, '')
    setInputReValue(newValue)
    setInputReShowValue(newValue)
    const toToken = data.filter(item => item.symbol === pay)
    const fromToken = data.filter(item => item.symbol === receive)
    const num = (Number(toToken[0].proportion) * Number(newValue)) / Number(fromToken[0].proportion)
    setInputValue(String(num))
    setInputShowValue(ValueNumber(num) ?? '0')
  }


  const handleBlur = () => {
    const parsedValue = parseFloat(inputToValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputValue(String(Math.abs(parsedValue)))
    }
  }


  const handleReBlur = () => {
    const parsedValue = parseFloat(inputReValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputReValue(String(Math.abs(parsedValue)))
    }
  }


  useEffect(() => {
    // console.log('自己账户的钱', balance, reBalance)

  }, [balance, reBalance])













  useEffect(() => {

    // console.log('变化')

    if (address !== undefined) {
      const tokens = data.filter(item => item.symbol === pay)
      setBalance(String(Number(tokens[0]?.balance)))
      const reTokens = data.filter(item => item.symbol === receive)
      setReBalance(String(Number(reTokens[0]?.balance)))

    }
  }, [address, data])


  useEffect(() => {
    // console.log(inputReValue)

  }, [inputReValue, inputToValue, inputToShowValue, inputReShowValue])


  const onMax = () => {
    if (pay !== 'Select token') {
      setInputValue(String(Number(data.filter(item => item.symbol === pay)[0]?.balance)))
    }

  }

  const { switchChain } = useSwitchChain()


  const onChangeNetwork = () => {
    switchChain({ chainId: 421614 })

  }

  const onChange = (change: boolean) => {
    setInputValue('')
    setInputReValue('')
    setInputShowValue('')
    setInputReShowValue('')
    OnChange()
  }



  return (
    <>

      <Box sx={{ width: '100%' }}>
        <ReviewSupply slippage={slippage} onChange={onChange} windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={data} inputFromNum={inputReValue} inputToNum={inputToValue} toToken={pay} fromToken={receive} windowWidth={windowWeight} />

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
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(balance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>



                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0 0 0', height: '56px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput onBlur={handleBlur} disabled={disable} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} />
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
                      disabled={disable}
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
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(reBalance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>


                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0 0 0', height: '56px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput disabled={disable} onBlur={handleReBlur} value={inputReValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(reBalance) >= Number(inputReValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} placeholder="0" />
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
                      disabled={disable}
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
                  <ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} />

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id !== undefined ? (
                        <>
                          {
                            inputToValue === '' || inputReValue === '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                                <SelectButton >Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(balance) >= Number(inputToValue) && Number(reBalance) >= Number(inputReValue) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                                      <EnterButton onClick={handleSwapOpen}>Supply</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
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
                          <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                            <ConnectButton onClick={onChangeNetwork} >Connect to Arbitrum Sepolia</ConnectButton>
                          </Box>

                        </>
                      )
                    }
                  </>



                ) : (
                  <>
                    <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                      <ConnectWallet windowWidth={windowWeight} open={openWallet} handleClose={onClose} />
                      <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                    </Box>

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
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(balance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>



                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0 0', height: '46px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput onBlur={handleBlur} disabled={disable} value={inputToValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} />
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
                      disabled={disable}
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
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(reBalance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Box>


                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0 0', height: '46px' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput onBlur={handleReBlur} disabled={disable} value={inputReValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(reBalance) >= Number(inputReValue) ? '#6f6f6f' : '#EE3354', fontSize: '26px' }} placeholder="0" />
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
                      disabled={disable}
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
                      width: "100%", marginBottom: "10px"
                    }}
                  ><ShowSwap windowWeight={windowWeight} toToken={pay} fromToken={receive} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id !== undefined ? (
                        <>
                          {
                            inputToValue === '' || inputReValue === '' ? (
                              <Box sx={{ width: "100%" }}>
                                <SelectButton >Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(balance) >= Number(inputToValue) && Number(reBalance) >= Number(inputReValue) ? (
                                    <Box sx={{ width: "100%" }}>
                                      <EnterButton onClick={handleSwapOpen}>Supply</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "100%" }}>
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
                          <Box sx={{ width: '100%' }}>
                            <ConnectButton onClick={onChangeNetwork}>
                              Connect to Arbitrum Sepolia
                            </ConnectButton>
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


export default PoolSons