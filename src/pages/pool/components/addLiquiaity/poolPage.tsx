import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import InputBase from '@mui/material/InputBase';
import ShowSwap from './showSwap';
// import { ethers } from 'ethers';
// import SwapAbi from 'abi/swap.json'
// import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import ReviewSupply from './reviewSupply';
import SelectAddOneToken from './select_add_token_one';
import SelectAddTwoToken from './select_add_token_two';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';
import addIcon from 'assets/images/icon/add.svg'
import { network_Name, net_id } from 'config';

// import Select, { components } from 'react-select'






type typeProps = {
  data: any[];
  windowWeight: number;
  windowHeight: number;
  OnChange: () => void;
}



const BootstrapInput = styled(InputBase)(({ theme }) => ({


  '& .MuiInputBase-input': {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '30px',
    fontWeight: 700,
    width: '100%',
    height: '30px',
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

    for (let i = 0; i < decimalPart?.length; i++) {
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

    for (let i = 0; i < decimalPart?.length; i++) {
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







const PoolSons = ({ data, windowWeight, OnChange, windowHeight }: typeProps) => {


  // const provider = new ethers.JsonRpcProvider(sepolia_rpc)

  const { address, chain } = useAccount();








  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(false)

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
    if (chain?.id === undefined && address !== undefined) {
      setDisable(true)
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
    padding: windowWeight >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    textTransform: 'none',
    width: '100%',
    color: '#fff',
    border: 0,
    "&.Mui-disabled": {
      zIndex: 100,
      color: '#fff',

    },
    backgroundColor: '#9b9b9b',
    '&:hover': {
      backgroundColor: '#9b9b9b',
      color: '#fff',
    },
  }));


  const EnterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWeight >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    width: '100%',
    color: '#fff',
    border: 0,
    backgroundColor: '#1aae70',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
    },
  }));

  const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWeight >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
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
      // console.log(tokens)
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
      setInputValue(String(Number(data?.filter(item => item.symbol === pay)[0]?.balance)))
      setInputShowValue(ValueNumber(Number(data?.filter(item => item.symbol === pay)[0]?.balance)) ?? '0')
      const toToken = data?.filter(item => item.symbol === pay)
      const fromToken = data?.filter(item => item.symbol === receive)
      const num = (Number(fromToken[0]?.proportion) * Number(toToken[0]?.balance)) / Number(toToken[0]?.proportion)
      setInputReValue(String(num))
      setInputReShowValue(ValueNumber(num) ?? '0')
    }

  }

  const onReMax = () => {
    if (pay !== 'Select token') {
      setInputReValue(String(Number(data.filter(item => item.symbol === receive)[0]?.balance)))
      setInputReShowValue(ValueNumber(Number(data.filter(item => item.symbol === receive)[0]?.balance)) ?? '0')
      const toToken = data.filter(item => item.symbol === pay)
      const fromToken = data.filter(item => item.symbol === receive)
      const num = (Number(toToken[0]?.proportion) * Number(fromToken[0]?.balance)) / Number(fromToken[0]?.proportion)
      setInputValue(String(num))
      setInputShowValue(ValueNumber(num) ?? '0')
    }

  }

  const { switchChain } = useSwitchChain()


  const onChangeNetwork = () => {
    switchChain({ chainId: net_id })

  }

  const onChange = (change: boolean) => {
    setInputValue('')
    setInputReValue('')
    setInputShowValue('')
    setInputReShowValue('')
    OnChange()
  }

  useEffect(() => {
    if (inputToValue !== '' && inputReValue !== '') {
      const toToken = data.filter(item => item.symbol === pay)
      const fromToken = data.filter(item => item.symbol === receive)
      const num = (Number(fromToken[0].proportion) * Number(inputToValue)) / Number(toToken[0].proportion)
      setInputReValue(String(num))
      setInputReShowValue(ValueNumber(num) ?? '0')
    }


  }, [pay, receive])



  return (
    <>

      <Box sx={{ width: '100%' }}>
        <ReviewSupply onChange={onChange} windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={data} inputFromNum={inputReValue} inputToNum={inputToValue} toToken={pay} fromToken={receive} windowWidth={windowWeight} />

        {
          windowWeight >= 600 ? (
            <>
              <Box
                sx={{
                  p: "10px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto", marginBottom: "10px", position: "relative"
                }}
              >
                <SelectAddOneToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box>

                  <img src={addIcon} style={{ position: 'absolute', bottom: '-24%', left: '47%' }} />


                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#979797">
                      You add
                    </Typography>
                    <Stack direction="row" spacing="12px" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(balance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '13px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Stack>



                  <Stack alignItems="center" direction="row" sx={{ padding: '15px 0 15px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput onBlur={handleBlur} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#000' : '#EE3354', fontSize: '32px' }} />
                    </Stack>
                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        fontWeight: 500,
                        border: 'none',
                        color: '#000',
                        fontSize: '14px',
                        "&:hover": {
                          backgroundColor: '#fff',
                          color: '#000',
                        }
                      }}
                      startIcon={<TokenColorIcon size={22} name={pay} />}
                      onClick={handleClickToOpen}
                      endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                    >

                      {pay}
                    </IndexTokenButton>
                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto", marginBottom: "10px"
                }}
              >
                <SelectAddTwoToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#979797">
                      You add
                    </Typography>
                    <Stack direction="row" spacing="12px" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(reBalance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '13px', fontWeight: 600 }} onClick={onReMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Stack>


                  <Stack alignItems="center" direction="row" sx={{ padding: '15px 0 15px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput onBlur={handleReBlur} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(reBalance) >= Number(inputReValue) ? '#000' : '#EE3354', fontSize: '32px' }} placeholder="0" />
                    </Stack>
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

                  </Stack>
                </Box>
              </Box>

              {
                inputToValue === '' && inputReValue === '' ? (
                  <></>
                ) : (
                  <ShowSwap inputValue={inputToValue} toLiquidty={data.filter(item => item.symbol === pay)[0].proportion} fromLiquidty={data.filter(item => item.symbol === receive)[0].proportion} windowWeight={windowWeight} toToken={pay} fromToken={receive} />

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id == undefined ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                            <ConnectButton onClick={onChangeNetwork} >Switch to {`${network_Name}`}</ConnectButton>
                          </Box>
                        </>
                      ) : (
                        <>
                          {
                            inputToValue === '' || inputReValue === '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                <SelectButton >Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(balance) >= Number(inputToValue) && Number(reBalance) >= Number(inputReValue) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                      <EnterButton onClick={handleSwapOpen}>Supply</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                      <SelectButton >Insufficient Balance</SelectButton>
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
                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                      <ConnectWallet windowWidth={windowWeight} open={openWallet} handleClose={onClose} />
                      <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                    </Box>

                  </>



                )
              }
            </>
          ) : (
            <>
              <Box
                sx={{
                  p: "12px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "100%", marginBottom: "10px", position: "relative"
                }}
              >
                <SelectAddOneToken windowWidth={windowWeight} open={open} handleClose={handleClose} handleListClose={handleToToken} data={data} />
                <Box>

                  <img src={addIcon} style={{ position: 'absolute', bottom: '-24%', left: '41%' }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" >
                    <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#979797">
                      You add
                    </Typography>
                    <Stack direction="row" spacing="12px" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(balance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '12px', fontWeight: 600 }} onClick={onMax} color="primary">
                        MAX
                      </Typography>
                    </Stack>
                  </Stack>



                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 0px 0', }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} >
                      <BootstrapInput onBlur={handleBlur} disabled={disable} value={inputToShowValue} onChange={InputChange} placeholder="0" sx={{ width: '100%', color: Number(balance) >= Number(inputToValue) ? '#000' : '#EE3354', fontSize: '26px' }} />
                    </Stack>
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
                      disabled={disable}
                      startIcon={<TokenColorIcon size={22} name={pay} />}
                      onClick={handleClickToOpen}
                      endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                    >

                      {pay}
                    </IndexTokenButton>
                  </Stack>
                </Box>
              </Box>
              <Box
                sx={{
                  p: "12px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "100%", marginBottom: "10px",
                }}
              >
                <SelectAddTwoToken windowWidth={windowWeight} open={reOpen} handleClose={handleReClose} handleListClose={handleFromToken} data={data} />
                <Box>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#979797">
                      You add
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing="12px">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#979797">
                        Balance: <span style={{ color: '#000', fontWeight: 600 }}>{`${formatNumber(Number(reBalance))}`}</span>
                      </Typography>
                      <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '12px', fontWeight: 600 }} onClick={onReMax} color="primary">
                        MAX
                      </Typography>

                    </Stack>
                  </Stack>


                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0 10px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1}>
                      <BootstrapInput onBlur={handleReBlur} disabled={disable} value={inputReShowValue} onChange={InputFromChange} sx={{ width: '100%', color: Number(reBalance) >= Number(inputReValue) ? '#000' : '#EE3354', fontSize: '26px' }} placeholder="0" />
                    </Stack>
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
                      disabled={disable}
                      onClick={handleClickFromOpen}
                      startIcon={<TokenColorIcon size={22} name={receive} />}
                      endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
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
                  ><ShowSwap inputValue={inputToValue} toLiquidty={data?.filter(item => item.symbol === pay)[0]?.proportion} fromLiquidty={data?.filter(item => item.symbol === receive)[0]?.proportion} windowWeight={windowWeight} toToken={pay} fromToken={receive} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id == undefined ? (
                        <>
                          <Box sx={{ width: '100%' }}>
                            <ConnectButton onClick={onChangeNetwork}>
                              Switch to {`${network_Name}`}
                            </ConnectButton>
                          </Box>
                        </>
                      ) : (
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
                      )
                    }
                  </>



                ) : (
                  <>
                    <Box sx={{ width: '100%' }}>
                      <ConnectWallet windowWidth={windowWeight} open={openWallet} handleClose={onClose} />
                      <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                    </Box>

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