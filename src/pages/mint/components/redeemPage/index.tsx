import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
// import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { useAccount, useSwitchChain } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
// import Web3 from 'web3'
import RedeemTokensList from './tokenList';
import RedeemReviewSwap from './review';
import RedeemSelectIndexToken from './selectIndexToken';
// import { sepolia_rpc} from 'config';
import InputBase from '@mui/material/InputBase';
// import { MdAddBox, MdIndeterminateCheckBox } from 'react-icons/md';

// import Select, { components } from 'react-select'
// const web3 = new Web3(sepolia_rpc)


type DataType = {
  symbol: string;
  address: any;
  num: string;
  balance: string;
  allowance: string;
  decimals: string

}

type HType = {
  symbol: string;
  balance: string;

}




type PropsType = {
  windowWidth: number;
  tokensData: DataType[];
  H30Data: HType[];
  OnChange: (update: boolean) => void
  windowHeight: number
}


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '32px',
    lineHeight: '25px',
    height: '30px',
    padding: 0,
    fontWeight: 700,
    width: '99%',
    textAlign: 'start',
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





const RedeemSon = ({ windowWidth, tokensData, H30Data, OnChange, windowHeight }: PropsType) => {

  // const [data, setData] = useState<DataType[]>([])
  const { address, chain } = useAccount();
  // const [tokenData, setTokenData] = useState<any[]>([])


  const [inputValue, setInputValue] = useState('')

  const InputChange = (event: any) => {
    const newValue = event.target.value.replace(/-/, '')
    setInputValue(newValue)

  }


  const handleBlur = () => {
    const parsedValue = parseFloat(inputValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputValue(String(Math.abs(parsedValue)))
    }
  }

  function formatNumber(num: number) {

    if (num % 1 !== 0) {
      num *= 100000
      num = Math.floor(num)
      num /= 100000
      var parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return num.toLocaleString()

    }
  }

  const ConnectNetorkButton = styled(Button)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff'
    },
  }));


  function ValueNumber(num: number) {

    if (num % 1 !== 0) {
      const decimalPart = num.toString().split('.')[1]

      for (let i = 0; i < decimalPart.length; i++) {
        if (Number(decimalPart[i]) !== 0) {
          num *= 10 ** (i + 4)
          num = Math.floor(num)
          num /= 10 ** (i + 4)
          console.log(num)

          // num = Number(parseFloat(String(num)).toFixed((i + 4)))
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

  // const onDec = () => {
  //   setInputValue((pre) => String(Number(pre) - 1))
  // }


  // const onInc = () => {
  //   setInputValue((pre) => String(Number(pre) + 1))
  // }



  // const [hNum, setHNum] = useState('')







  useEffect(() => {
    // console.log('data', tokensData, H30Data)

  }, [tokensData, H30Data, inputValue])


  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)

  const [update, setUpdate] = React.useState(false)






  // const { status } = useEnsName({ address });

  const [indexToken, setIndexToken] = React.useState('H20');

  const handleSwapOpen = () => {
    setOpenSwap(true)
  }


  const handleSwapClose = () => {

    setOpenSwap(false)

  }

  const onUpdate = () => {
    setUpdate(!update)
    OnChange(update)
    setInputValue('')

  }




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListIndexToken = (value: string) => {
    setOpen(false)
    setIndexToken(value)

  }


  const IndexTokenButton = styled(Button)<ButtonProps>(({ theme }) => ({
    // width: '%',
    padding: '6px 8px 6px 10px',
    color: '#fff',
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
    textTransform: 'none',
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '20px',
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
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
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

  const onMax = () => {
    setInputValue(ValueNumber(Number(H30Data[0]?.balance)) ?? '0')
  }

  const [disable, setDisable] = React.useState(true)








  // console.log('arrs', arrs)




  useEffect(() => {
    if (chain?.id !== undefined) {
      setDisable(false)
    } else {
      setDisable(true)
    }

  }, [chain?.id])


  const { switchChain } = useSwitchChain()


  const onChangeNetwork = () => {
    switchChain({ chainId: 421614 })

  }







  return (
    <>
      {
        windowWidth >= 600 ? (
          <>


            <Box sx={{ width: '100%' }}>
              <RedeemReviewSwap windowHeight={windowHeight} onChange={onUpdate} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} name='H20' windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "12px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto"
                }}
              >
                <RedeemSelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box position="relative">


                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                      You redeem
                    </Typography>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        Balance:
                      </Typography>
                      <Typography variant='body1' sx={{ fontSize: '13px', fontWeight: 700 }} color="#464646">
                        {`${formatNumber(Number(H30Data[0]?.balance))}`}
                      </Typography>
                    </Stack>


                  </Stack>
                  <Stack alignItems="center" direction="row" sx={{ padding: '10px 0' }} justifyContent="space-between" >
                    <BootstrapInput minRows={0} value={inputValue} onChange={InputChange} onBlur={handleBlur} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#000' : '#ee3354', fontSize: '20px' }} placeholder="0" />

                    {/* <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '30px', height: '30px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput  value={inputValue} onChange={InputChange} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#464646' : '#ee3354', fontSize: '20px' }} placeholder="0" />
                      <IconButton onClick={onInc} size="large" sx={{ p: 0, width: '30px', height: '30px' }}><MdAddBox color="#9b9b9b" size={30} /></IconButton>
                    </Stack> */}
                    <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, mr: '10px', fontSize: '13px', fontWeight: 600, color: '#007AFF', "&:hover": { backgroundColor: 'transparent', color: '#007AFF' } }} onClick={onMax} color="primary">
                      MAX
                    </Typography>




                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: '#fff',
                          color: '#000',

                        }

                      }}
                      onClick={handleClickOpen}
                      startIcon={<TokenColorIcon size={22} name={indexToken} />}
                      endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                    >
                      {indexToken}
                    </IndexTokenButton>
                  </Stack>
                  <Stack direction="row" alignItems="start">
                    {/* <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                      $ 0.00
                    </Typography> */}

                  </Stack>
                </Box>



              </Box>
              {
                address !== undefined && indexToken == "Select Index" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "600px", margin: "0 auto", mt: '20px'
                    }}
                  ><RedeemTokensList data={tokensData} inputNum={inputValue} windowWidth={windowWidth} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>

                    {
                      chain?.id === undefined ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                            <ConnectNetorkButton onClick={onChangeNetwork}>
                              Switch to Arbitrum Sepolia
                            </ConnectNetorkButton>
                          </Box>
                        </>
                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                <SelectButton disabled>Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(H30Data[0]?.balance) >= Number(inputValue) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                      <EnterButton onClick={handleSwapOpen}> {`Redeem H20`}</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                      <SelectButton disabled>Insufficient balane</SelectButton>
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
            </Box>
          </>
        ) : (
          <>


            <Box sx={{ width: '100%' }}>
              <RedeemReviewSwap windowHeight={windowHeight} onChange={onUpdate} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} name='H20' windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "12px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "100%"
                }}
              >
                <RedeemSelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box >




                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                      You redeem
                    </Typography>
                    <Stack direction="row" spacing="10px" alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                        Balance:
                      </Typography>
                      <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 700 }} color="#464646">
                        {`${formatNumber(Number(H30Data[0]?.balance))}`}
                      </Typography>
                    </Stack>

                  </Stack>
                  <Stack alignItems="center" direction="row" sx={{ padding: '6px 0px' }} justifyContent="space-between" >
                    <BootstrapInput disabled={disable} minRows={0} value={inputValue} onChange={InputChange} onBlur={handleBlur} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#000' : '#ee3354', fontSize: '20px' }} placeholder="0" />

                    {/* <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '20px', height: '20px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput minRows={0} value={inputValue} onChange={InputChange} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#464646' : '#ee3354', fontSize: '20px' }} placeholder="0" />
                      <IconButton onClick={onInc} size="large" sx={{ p: 0, width: '20px', height: '20px' }}><MdAddBox color="#9b9b9b" size={30} /></IconButton>
                    </Stack> */}
                    <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, mr: "10px", fontWeight: 600, fontSize: '13px', color: '#007AFF', "&:hover": { backgroundColor: 'transparent', color: '#007AFF' } }} onClick={onMax} color="primary">
                      MAX
                    </Typography>




                    <IndexTokenButton
                      variant="text"
                      sx={{
                        borderRadius: '100px',
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: '#fff',
                          color: '#000',

                        }
                      }}
                      onClick={handleClickOpen}
                      startIcon={<TokenColorIcon size={20} name={indexToken} />}
                      endIcon={<ChevronDownIcon style={{ fontSize: "1.37rem", cursor: "pointer", fontWeight: 700 }} />}
                    >
                      {indexToken}
                    </IndexTokenButton>
                  </Stack>
                  <Stack direction="row" alignItems="start">
                    {/* <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 600 }} color="#9b9b9b">
                      $ 0.00
                    </Typography> */}

                  </Stack>
                </Box>



              </Box>
              {
                address !== undefined && indexToken == "Select Index" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "100%", mt: '20px'
                    }}
                  ><RedeemTokensList data={tokensData} inputNum={inputValue} windowWidth={windowWidth} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      chain?.id == undefined ? (
                        <>
                          <Box sx={{ width: '100%' }}>
                            <ConnectNetorkButton onClick={onChangeNetwork}>
                              Switch to Arbitrum Sepolia
                            </ConnectNetorkButton>
                          </Box>
                        </>
                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: '100%', mt: '10px' }}>
                                <SelectButton disabled>Enter an Amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(H30Data[0]?.balance) >= Number(inputValue) ? (
                                    <Box sx={{ width: '100%', mt: '10px' }}>
                                      <EnterButton onClick={handleSwapOpen}>{`Redeem H20`}</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: '100%', mt: '10px' }}>
                                      <SelectButton disabled>Insufficient balane</SelectButton>
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
            </Box>
          </>
        )

      }
    </>
  )

}


export default RedeemSon