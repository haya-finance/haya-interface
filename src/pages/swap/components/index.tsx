
import { SettingOutlined } from '@ant-design/icons';
import { Box, Card, IconButton, InputAdornment, Popover, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';
import SwapSons from './swapPage';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import { ethers } from 'ethers';
import { PiWarningBold } from "react-icons/pi";

// const web3 = new Web3(sepolia_rpc)
const provider = new ethers.JsonRpcProvider(sepolia_rpc)


type PropsType = {
  windowWidth: number;
  windowHeight: number
}

type TokenListType = {
  symbol: string;
  address: string;
  balance: string;
  network: string;
  decimasl: string;
  allowance: string
}

export default function SwapPage({ windowHeight, windowWidth }: PropsType) {


  const { address, chain } = useAccount()



  // 第一个weth地址，第二个h30地址,  第四个 USDT， 第五个USDC
  const [tokenList, setTokenList] = useState<TokenListType[]>([
    {
      symbol: 'WETH',
      address: '0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: ''
    },
    {
      symbol: 'H20',
      address: '0x19cb7Ac5E56Fa4ea4da5F20e27097903dd07aF52',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: ''

    },
    {
      symbol: 'USDT',
      address: '0xD7fbE1d17b8bAB5e94377428fcDC04904f39c4F4',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: ''

    },
    {
      symbol: 'USDC',
      address: '0x3b88ef38959aC57f69eF2798e03c0E8994F1a3aa',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: ''
    },
    {
      symbol: 'ETH',
      address: '0x0d05D33Ab10870069DE5Aa7Ddcd42fbEB8C44dCd',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: ''
    }
  ])






  const getBalance = async (add: any) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)




    await contract.balanceOf(address).then(async (res2: any) => {
      await contract.decimals().then(async (decimasl: any) => {
        await contract.allowance(address, UniswapSepoliaRouterContract).then((allow: any) => {

          setTokenList((pre) => pre.map((item) => item.address === add ? { ...item, balance: String(Number(res2) / (10 ** Number(decimasl))), decimasl: decimasl, allowance: String(BigInt(allow) / BigInt((10 ** Number(decimasl)))) } : item))


        })



      })


    }).catch((_err) => {

    })
  }

  const [value, setValue] = useState(0)

  const OnCheckTitel = (v: number) => {
    setValue(v)

  }

  const OnChange = async () => {

    if (address !== undefined) {
      for (let i = 0; i < tokenList.length; i++) {
        if (tokenList[i].symbol == 'ETH') {
          getEthBalance(tokenList[i]?.address)




        } else {
          getBalance(tokenList[i]?.address)
        }

      }
    }
  }



  const getEthBalance = async (add: string) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)
    const balance = await provider.getBalance(address ?? '')
    setTokenList((pre) => pre.map((item) => item.symbol === 'ETH' ? { ...item, balance: String(Number(balance) / (10 ** 18)), decimasl: String(18), allowance: String(ethers.MaxUint256) } : item))
    await contract.decimals().then(async (decimasl: any) => {
      await contract.allowance(address, UniswapSepoliaRouterContract).then((allow: any) => {

        setTokenList((pre) => pre.map((item) => item.address === add ? { ...item, decimasl: decimasl, allowance: String(BigInt(allow) / BigInt((10 ** Number(decimasl)))) } : item))


      })



    })

  }




  useEffect(() => {

    for (let i = 0; i < tokenList.length; i++) {




      if (address !== undefined) {
        if (tokenList[i].symbol == 'ETH') {
          getEthBalance(tokenList[i]?.address)




        } else {
          getBalance(tokenList[i]?.address)
        }
      }
    }

  }, [address])

  const [openWallet, setOpenWallet] = useState(false)


  const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#1AAE70',
    },
  }));



  const walletConnect = () => {
    setOpenWallet(true);
  };

  const onClose = () => {
    setOpenWallet(false);
  };


  const [slippage, setSlippage] = useState('auto')
  const [inputValue, setInputValue] = useState('')
  const [show, setShow] = useState(false)




  const OnCheckSlipage = (value: string) => {
    setSlippage(value)

  }

  useEffect(() => {
    if (Number(inputValue) < 0.05 && inputValue !== '') {
      setShow(true)
    } else {
      setShow(false)

    }

  }, [slippage, show, inputValue])
  const [firstChange, setFirstChange] = useState(false);

  useEffect(() => {
    console.log(firstChange)
    if (!firstChange) {
      // 首次变化时执行的操作
      if (inputValue !== '') {
        // console.log('111111111111')
        setSlippage('custom')
      }
      setFirstChange(true);
    }


  }, [inputValue, firstChange, slippage])

  const InputChange = (event: any) => {
    setSlippage('custom')


    const newValue = event.target.value.replace(/-/, '')
    setInputValue(newValue)
  }

  const handleBlur = () => {
    const parsedValue = parseFloat(inputValue)
    if (!isNaN(parsedValue) && parsedValue < 0) {
      setInputValue(String(Math.abs(parsedValue)))
    }
  }


  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;







  return (
    <>
      <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
        <Card sx={{ p: windowWidth >= 600 ? 1 : '14px', boxShadow: 'none' }}>
          {
            windowWidth >= 600 ? (
              <Stack direction="row" justifyContent="space-between" width="600px" margin="0 auto" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={{ border: 0, backgroundColor: 'transparent' }} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box >


                  <IconButton onClick={handleClick} aria-describedby={id}><SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /></IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{ "& .MuiPaper-root": { backgroundColor: '#f6f6f6', borderRadius: '20px', padding: '12px 20px' } }}
                  >
                    <Stack spacing="12px">
                      <Typography sx={{ color: "#464646", cursor: 'default', fontSize: '18px', fontWeight: 700 }}>
                        Max Slippage
                      </Typography>
                      <Stack direction="row" spacing="10px" justifyContent="space-evenly">
                        <Stack direction="row" sx={{ backgroundColor: '#fff', borderRadius: '100px', p: '4px' }}>
                          <Box sx={slippage == 'auto' ? ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckSlipage('auto')}>
                            Auto
                          </Box>
                          <Box sx={slippage == 'custom' ? ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckSlipage('custom')}>
                            Custom
                          </Box>
                        </Stack>
                        <Box>
                          <TextField sx={{ backgroundColor: '#fff', border: 0, width: '80px', padding: '2px 4px', borderRadius: '100px', '& .MuiOutlinedInput-notchedOutline': { border: 0, padding: 0 }, "& .MuiInputBase-input": { fontSize: '12px', textAlign: 'end', padding: '5px 0 5px', color: '#6f6f6f', fontWeight: 700 }, "& .MuiInputBase-root": { paddingRight: 0 } }} placeholder='0.5' value={inputValue} onChange={InputChange} onBlur={handleBlur} InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ color: '#6f6f6f', fontWeight: 700 }}>%</InputAdornment>
                          }} />
                          {/* <SlippageInput placeholder='0.5' value={inputValue} onChange={InputChange} endAdornment={<InputAdornment position="end" sx={{ color: '#6f6f6f', fontWeight: 700 }}>%</InputAdornment>} /> */}

                        </Box>
                      </Stack>
                      {
                        !show ? (
                          <>


                          </>
                        ) : (
                          <>
                            <Stack direction="row" spacing="10px" alignItems="center" sx={{ width: '218px' }}>
                              <PiWarningBold color='#f1c44e' size={30} />
                              <Typography sx={{ color: "#f1c44e", fontSize: '12px', fontWeight: 500 }}>
                                Slippage below 0.05% may result in a failed transaction
                              </Typography>

                            </Stack>

                          </>
                        )
                      }

                    </Stack>
                  </Popover>


                </Box>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={{ border: 0, backgroundColor: 'transparent' }} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box >


                  <IconButton onClick={handleClick} aria-describedby={id}><SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /></IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{ "& .MuiPaper-root": { backgroundColor: '#f6f6f6', borderRadius: '20px', padding: '12px 20px' } }}
                  >
                    <Stack spacing="12px">
                      <Typography sx={{ color: "#464646", cursor: 'default', fontSize: '18px', fontWeight: 700 }}>
                        Max Slippage
                      </Typography>
                      <Stack direction="row" spacing="10px" justifyContent="space-evenly">
                        <Stack direction="row" sx={{ backgroundColor: '#fff', borderRadius: '100px', p: '4px' }}>
                          <Box sx={slippage == 'auto' ? ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckSlipage('auto')}>
                            Auto
                          </Box>
                          <Box sx={slippage == 'custom' ? ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '6px 12px', fontWeight: 700, backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckSlipage('custom')}>
                            Custom
                          </Box>
                        </Stack>
                        <Box>
                          <TextField sx={{ backgroundColor: '#fff', border: 0, width: '80px', padding: '2px 4px', borderRadius: '100px', '& .MuiOutlinedInput-notchedOutline': { border: 0, padding: 0 }, "& .MuiInputBase-input": { fontSize: '12px', textAlign: 'end', padding: '5px 0 5px', color: '#6f6f6f', fontWeight: 700 }, "& .MuiInputBase-root": { paddingRight: 0 } }} placeholder='0.5' value={inputValue} onChange={InputChange} onBlur={handleBlur} InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ color: '#6f6f6f', fontWeight: 700 }}>%</InputAdornment>
                          }} />
                          {/* <SlippageInput placeholder='0.5' value={inputValue} onChange={InputChange} endAdornment={<InputAdornment position="end" sx={{ color: '#6f6f6f', fontWeight: 700 }}>%</InputAdornment>} /> */}

                        </Box>
                      </Stack>
                      {
                        !show ? (
                          <>


                          </>
                        ) : (
                          <>
                            <Stack direction="row" spacing="10px" alignItems="center" sx={{ width: '218px' }}>
                              <PiWarningBold color='#f1c44e' size={30} />
                              <Typography sx={{ color: "#f1c44e", fontSize: '12px', fontWeight: 500 }}>
                                Slippage below 0.05% may result in a failed transaction
                              </Typography>

                            </Stack>

                          </>
                        )
                      }

                    </Stack>
                  </Popover>


                </Box>
              </Stack>
            )
          }
          {
            value === 0 ? (
              <Box sx={{ width: '100%' }}>
                <SwapSons slippage={inputValue !== '' ? inputValue : '0.5'} data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />
                {
                  address !== undefined ? (
                    <></>


                  ) : (
                    <>
                      {
                        windowWidth >= 600 ? (
                          <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        ) : (
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        )
                      }
                    </>

                  )
                }
              </Box>
            ) : (
              <></>
            )
          }

        </Card>

      </Box>
    </>
  );
}