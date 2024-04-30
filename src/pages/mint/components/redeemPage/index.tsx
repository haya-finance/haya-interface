import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, IconButton, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
// import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { useAccount } from 'wagmi';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
// import Web3 from 'web3'
import RedeemTokensList from './tokenList';
import RedeemReviewSwap from './review';
import RedeemSelectIndexToken from './selectIndexToken';
// import { sepolia_rpc} from 'config';
import InputBase from '@mui/material/InputBase';
import { MdAddBox, MdIndeterminateCheckBox } from 'react-icons/md';

// import Select, { components } from 'react-select'
// const web3 = new Web3(sepolia_rpc)


type DataType = {
  symbol: string;
  address: any;
  num: string;
  balance: string;

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
    fontSize: '25px',
    lineHeight: '25px',
    fontWeight: 700,
    width: '99%',
    textAlign: 'center',
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
  const { address } = useAccount();
  // const [tokenData, setTokenData] = useState<any[]>([])


  const [inputValue, setInputValue] = useState('')

  const InputChange = (event: any) => {
    setInputValue(event.target.value)

  }

  function formatNumber(num: number) {

    if (num % 1 !== 0) {
      num *= 100000
      num = Math.round(num)
      num /= 100000
      var parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return num.toLocaleString()

    }
  }

  const onDec = () => {
    setInputValue((pre) => String(Number(pre) - 1))
  }


  const onInc = () => {
    setInputValue((pre) => String(Number(pre) + 1))
  }



  // const [hNum, setHNum] = useState('')







  useEffect(() => {
    // console.log('data', tokensData, H30Data)

  }, [tokensData, H30Data, inputValue])


  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)

  const [update, setUpdate] = React.useState(false)






  // const { status } = useEnsName({ address });

  const [indexToken, setIndexToken] = React.useState(address !== undefined ? 'Select Index' : 'H2_test');

  const handleSwapOpen = () => {
    setOpenSwap(true)
  }


  const handleSwapClose = () => {
    setUpdate(!update)
    OnChange(update)
    setOpenSwap(false)
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

  const onMax = () => {
    setInputValue(H30Data[0]?.balance)
  }







  return (
    <>
      {
        windowWidth >= 600 ? (
          <>


            <Box sx={{ width: '100%' }}>
              <RedeemReviewSwap windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} name={H30Data[0]?.symbol} windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "12px 20px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "600px", margin: "0 auto"
                }}
              >
                <RedeemSelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box position="relative">
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    You redeem
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    $ 31.5
                  </Typography>

                  <Box sx={{ position: 'absolute', top: 0, right: '4px' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                        Balance:
                      </Typography>
                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#464646">
                        {`${formatNumber(Number(H30Data[0]?.balance))}`}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack alignItems="center" direction="row" sx={{ padding: '20px 0 18px' }} justifyContent="space-between" spacing="4px">
                    <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '30px', height: '30px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput value={inputValue} onChange={InputChange} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#464646' : '#ee3354', fontSize: '20px' }} placeholder="0" />
                      <IconButton onClick={onInc} size="large" sx={{ p: 0, width: '30px', height: '30px' }}><MdAddBox color="#9b9b9b" size={30} /></IconButton>
                    </Stack>
                    <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px' }} onClick={onMax} color="primary">
                      MAX
                    </Typography>




                    {
                      address !== undefined ? (
                        <>
                          {
                            indexToken == "Select Index" ? (
                              <>
                                <IndexTokenButton
                                  variant="text"
                                  sx={{
                                    borderRadius: '1.12rem',
                                    backgroundColor: '#1AAE70',
                                    fontWeight: '500',
                                    color: '#fff',
                                    fontSize: '14px',
                                    padding: '4px 8px'
                                  }}
                                  onClick={handleClickOpen}
                                  endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                                >
                                  {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                                  {indexToken}
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
                                    padding: '4px 8px'
                                  }}
                                  onClick={handleClickOpen}
                                  endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                                >
                                  {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                                  {indexToken}
                                </IndexTokenButton>
                              </>

                            )

                          }
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
                              padding: '4px 8px'
                            }}
                            onClick={handleClickOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                            {indexToken}
                          </IndexTokenButton>
                        </>



                      )
                    }
                  </Stack>
                </Box>



              </Box>
              {
                address !== undefined && indexToken == "Select Index" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "600px", margin: "0 auto", mt: '8px'
                    }}
                  ><RedeemTokensList data={tokensData} inputNum={inputValue} windowWidth={windowWidth} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      indexToken == "Select Index" ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto', mt: '8px' }}>
                            <SelectButton disabled>Select a index token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto', mt: '8px' }}>
                                <SelectButton disabled>Enter amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(H30Data[0]?.balance) >= Number(inputValue) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '8px' }}>
                                      <EnterButton onClick={handleSwapOpen}> {`Redeem ${H30Data[0]?.symbol}`}</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '8px' }}>
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
              <RedeemReviewSwap windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} name={H30Data[0]?.symbol} windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "10px 12px", backgroundColor: "#f6f6f6", borderRadius: "20px",
                  width: "100%"
                }}
              >
                <RedeemSelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box position="relative">
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    You redeem
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    $ 31.5
                  </Typography>

                  <Box sx={{ position: 'absolute', top: 0, right: '4px' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant='body1' sx={{ fontSize: '10px', fontWeight: 600 }} color="#979797">
                        Balance:
                      </Typography>
                      <Typography variant='body1' sx={{ fontSize: '10px', fontWeight: 600 }} color="#464646">
                        {`${formatNumber(Number(H30Data[0].balance))}`}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack alignItems="center" direction="row" sx={{ padding: '12px 0 10px' }} justifyContent="space-between" spacing="4px">
                    <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '20px', height: '20px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput value={inputValue} onChange={InputChange} sx={{ color: Number(inputValue) <= Number(H30Data[0]?.balance) ? '#464646' : '#ee3354', fontSize: '20px' }} placeholder="0" />
                      <IconButton onClick={onInc} size="large" sx={{ p: 0, width: '20px', height: '20px' }}><MdAddBox color="#9b9b9b" size={30} /></IconButton>
                    </Stack>
                    <Typography component={Button} variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px' }} onClick={onMax} color="primary">
                      MAX
                    </Typography>




                    {
                      address !== undefined ? (
                        <>
                          {
                            indexToken == "Select Index" ? (
                              <>
                                <IndexTokenButton
                                  variant="text"
                                  sx={{
                                    borderRadius: '1.12rem',
                                    backgroundColor: '#1AAE70',
                                    fontWeight: '500',
                                    color: '#fff',
                                    fontSize: '14px',
                                    padding: '4px 8px'
                                  }}
                                  onClick={handleClickOpen}
                                  endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                                >
                                  {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                                  {indexToken}
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
                                    padding: '4px 8px'
                                  }}
                                  onClick={handleClickOpen}
                                  endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                                >
                                  {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                                  {indexToken}
                                </IndexTokenButton>
                              </>

                            )

                          }
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
                              padding: '4px 8px'
                            }}
                            onClick={handleClickOpen}
                            endIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}
                          >
                            {indexToken === 'Select Index' ? <></> : <TokenColorIcon size={20} name={indexToken} />}
                            {indexToken}
                          </IndexTokenButton>
                        </>



                      )
                    }
                  </Stack>
                </Box>



              </Box>
              {
                address !== undefined && indexToken == "Select Index" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "100%", mt: '8px'
                    }}
                  ><RedeemTokensList data={tokensData} inputNum={inputValue} windowWidth={windowWidth} /></Box>

                )
              }
              {
                address !== undefined ? (
                  <>
                    {
                      indexToken == "Select Index" ? (
                        <>
                          <Box sx={{ width: '100%', mt: '8px' }}>
                            <SelectButton disabled>Select a index token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: '100%', mt: '8px' }}>
                                <SelectButton disabled>Enter amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  Number(H30Data[0]?.balance) >= Number(inputValue) ? (
                                    <Box sx={{ width: '100%', mt: '8px' }}>
                                      <EnterButton onClick={handleSwapOpen}>{`Redeem ${H30Data[0].symbol}`}</EnterButton>
                                    </Box>

                                  ) : (
                                    <Box sx={{ width: '100%', mt: '8px' }}>
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