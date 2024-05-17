
import { Box, Card, IconButton, InputAdornment, Popover, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';
import SwapSons from './swapPage';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { H30_Address, sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import { ethers } from 'ethers';
import { PiWarningBold } from "react-icons/pi";
import Setting from 'assets/images/icon/Setting.svg';

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
  allowance: string;
  contract?: string;
  price?: string;
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
      allowance: '',
      contract: '0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165',
      price: '0.00'
    },
    {
      symbol: 'H20',
      address: H30_Address,
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: '',
      price: '0.00',
      contract: 'H20',

    },
    {
      symbol: 'USDT',
      address: '0xD7fbE1d17b8bAB5e94377428fcDC04904f39c4F4',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: '',
      contract: '0x80EDee6f667eCc9f63a0a6f55578F870651f06A4',
      price: '0.00'


    },
    {
      symbol: 'USDC',
      address: '0x3b88ef38959aC57f69eF2798e03c0E8994F1a3aa',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: '',
      contract: '0x0153002d20B96532C639313c2d54c3dA09109309',
      price: '0.00'

    },
    {
      symbol: 'ETH',
      address: '0x0d05D33Ab10870069DE5Aa7Ddcd42fbEB8C44dCd',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      decimasl: '',
      allowance: '',
      contract: '0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165',
      price: '0.00'

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

  }, [address, chain])

  const [openWallet, setOpenWallet] = useState(false)


  const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
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


  const { switchChain } = useSwitchChain()


  const onChangeNetwork = () => {
    switchChain({ chainId: 421614 })

  }







  return (
    <>
      <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
        <Card sx={{ p: windowWidth >= 600 ? "20px 20px" : '20px 10px', boxShadow: 'none' }}>
          {
            windowWidth >= 600 ? (
              <Stack direction="row" justifyContent="space-between" width="600px" margin="0 auto" mb="20px">
                <Stack direction="row" spacing={1}>
                  <Box sx={{ p: '4px 12px', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '13px', fontWeight: 600, borderRadius: "20px", cursor: 'pointer', border: 0 }} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box >


                  <IconButton onClick={handleClick} aria-describedby={id}><img src={Setting} /></IconButton>
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
              <Stack direction="row" justifyContent="space-between" mb="10px">
                <Stack direction="row" spacing={1}>
                  <Box sx={{ border: 0, backgroundColor: '#f6f6f6', color: '#1aae70', fontSize: '14px', borderRadius: '20px', padding: '0px 14px', lineHeight: '12px', fontWeight: 500 }} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box >


                  <IconButton onClick={handleClick} aria-describedby={id}><img src={Setting} /></IconButton>
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
                    <>
                      {
                        windowWidth >= 600 ? (
                          <>
                            {
                              chain?.id === undefined ? (
                                <>
                                  <Box sx={{ width: "600px", margin: '0 auto' }}>
                                    <ConnectButton onClick={onChangeNetwork}>
                                      Switch to Arbitrum Sepolia
                                    </ConnectButton>
                                  </Box>
                                </>

                              ) : (
                                <></>
                              )
                            }
                          </>
                        ) : (
                          <>
                            {
                              chain?.id === undefined ? (
                                <Box sx={{ width: "100%" }}>
                                  <ConnectButton onClick={onChangeNetwork}>
                                    Switch to Arbitrum Sepolia
                                  </ConnectButton>
                                </Box>


                              ) : (
                                <>
                                </>
                              )
                            }
                          </>

                        )
                      }

                    </>


                  ) : (
                    <>
                      {
                        windowWidth >= 600 ? (
                          <>
                            <Box sx={{ width: "600px", margin: '0 auto' }}>
                              <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                              <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box sx={{ width: '100%' }}>
                              <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                              <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                            </Box>
                          </>

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