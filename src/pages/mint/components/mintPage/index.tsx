import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, IconButton, Stack, Typography, Box } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import React, { useEffect, useState } from 'react';
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { useAccount } from 'wagmi';
import SelectIndexToken from './select_indexToken';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import TokensList from './tokensList';
import ReviewSwap from './review';
import InputBase from '@mui/material/InputBase';

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
  onUpdate: (ch: boolean) => void
  windowHeight: number
}



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  flex: 1,

  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: 22,
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


const MintSon = ({ windowWidth, tokensData, H30Data, onUpdate, windowHeight }: PropsType) => {


  const { address } = useAccount();

  const [inputValue, setInputValue] = useState('')

  const InputChange = (event: any) => {
    setInputValue(event.target.value)

  }

  const onDec = () => {
    setInputValue((pre) => String(Number(pre) - 1))
  }


  const onInc = () => {
    setInputValue((pre) => String(Number(pre) + 1))
  }












  useEffect(() => {
    // console.log('data', tokensData, H30Data)

  }, [tokensData, H30Data])


  // console.log('arrs', arrs)


  const [open, setOpen] = React.useState(false);

  const [openSwap, setOpenSwap] = React.useState(false)

  // const [update, setUpdate] = React.useState(false)


  const onChange = (change: boolean) => {
    setInputValue('')
    onUpdate(change)
  }






  // const { status } = useEnsName({ address });

  const [indexToken, setIndexToken] = React.useState(address !== undefined ? 'Select Index' : 'H3_test');

  const handleSwapOpen = () => {
    setOpenSwap(true)
  }


  const handleSwapClose = () => {
    setOpenSwap(false)
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

  const onMax = () => {
    // setInputValue()
    let arr = []
    for (let i = 0; i < tokensData.length; i++) {
      const num = Math.floor(Number(tokensData[i].balance) / Number(tokensData[i].num))
      arr.push(num)
    }


    const minNum = Math.min(...arr)
    setInputValue(String(minNum))

  }






  return (
    <>
      {
        windowWidth >= 600 ? (
          <>

            {
              address !== undefined && indexToken == "Select Index" ? (
                <></>
              ) : (
                <Box
                  sx={{
                    width: "600px", margin: "0 auto", mb: '20px'
                  }}
                ><TokensList data={tokensData} inputNum={inputValue} name={H30Data[0]?.symbol} windowWidth={windowWidth} /></Box>

              )
            }
            <Box sx={{ width: '100%' }}>
              <ReviewSwap windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} name={H30Data[0]?.symbol} onChange={onChange} windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "20px", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "600px", margin: "0 auto"
                }}
              >
                <SelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box position="relative">
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    You mint
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    $ 31.5
                  </Typography>
                  <Stack alignItems="center" direction="row" sx={{ padding: '12px 0' }} justifyContent="space-between" spacing={2}>
                    <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '30px', height: '30px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput value={inputValue} onChange={InputChange} sx={{ color: '#464646' }} placeholder="0" />
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
                address !== undefined ? (
                  <>
                    {
                      indexToken == "Select Index" ? (
                        <>
                          <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                            <SelectButton disabled>Select a index token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                <SelectButton disabled>Enter amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  tokensData.every(item => Number(item.balance) >= Number(item.num) * Number(inputValue)) ? (
                                    <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                                      <EnterButton onClick={handleSwapOpen}>{`Mint ${H30Data[0].symbol}`}</EnterButton>
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

            {
              address !== undefined && indexToken == "Select Index" ? (
                <></>
              ) : (
                <Box
                  sx={{
                    mb: '10px',
                    width: "100%"
                  }}
                ><TokensList data={tokensData} inputNum={inputValue} name={H30Data[0]?.symbol} windowWidth={windowWidth} /></Box>

              )
            }
            <Box sx={{ width: '100%' }}>
              <ReviewSwap windowHeight={windowHeight} open={openSwap} handleSwapClose={handleSwapClose} data={tokensData} inputNum={inputValue} onChange={onChange} name={H30Data[0]?.symbol} windowWidth={windowWidth} />
              <Box
                sx={{
                  p: "10px", backgroundColor: "#f6f6f6", borderRadius: "0.7rem",
                  width: "100%"
                }}
              >
                <SelectIndexToken open={open} handleClose={handleClose} handleListClose={handleListIndexToken} data={H30Data} windowWidth={windowWidth} />
                <Box position="relative">
                  <Typography variant='body1' sx={{ position: 'absolute', top: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    You mint
                  </Typography>

                  <Typography variant='body1' sx={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px', fontWeight: 600 }} color="#979797">
                    $ 31.5
                  </Typography>
                  <Stack alignItems="center" direction="row" sx={{ padding: '12px 0' }} justifyContent="space-between" spacing="4px">
                    <Stack flex={1} direction="row" alignItems="center" spacing="2px">
                      <IconButton onClick={onDec} size="large" sx={{ p: 0, width: '20px', height: '20px' }}><MdIndeterminateCheckBox color="#9b9b9b" size={30} /></IconButton>
                      <BootstrapInput value={inputValue} onChange={InputChange} sx={{ color: '#464646', fontSize: '20px' }} placeholder="0" />
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
                address !== undefined ? (
                  <>
                    {
                      indexToken == "Select Index" ? (
                        <>
                          <Box sx={{ width: '100%', mt: '10px' }}>
                            <SelectButton disabled>Select a index token</SelectButton>
                          </Box>
                        </>

                      ) : (
                        <>
                          {
                            inputValue == '' ? (
                              <Box sx={{ width: '100%', mt: '10px' }}>
                                <SelectButton disabled>Enter amount</SelectButton>
                              </Box>

                            ) : (
                              <>
                                {
                                  tokensData.every(item => Number(item.balance) >= Number(item.num) * Number(inputValue)) ? (
                                    <Box sx={{ width: '100%', mt: '10px' }}>
                                      <EnterButton onClick={handleSwapOpen}>{`Mint ${H30Data[0].symbol}`}</EnterButton>
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


export default MintSon