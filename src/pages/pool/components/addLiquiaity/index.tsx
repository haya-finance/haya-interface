
import { Box, Card, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { H30_Address, pair_Address, sepolia_rpc, UniswapSepoliaRouterContract, WETH_address } from 'config';
import { ethers } from 'ethers';
import PoolSons from './poolPage';
import pairAbi from 'abi/pair.json'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router';
// import PoolTotal from './pool';

// const web3 = new Web3(sepolia_rpc)
const provider = new ethers.JsonRpcProvider(sepolia_rpc)




type TokenListType = {
  symbol: string;
  address: string;
  balance: string;
  network: string;
  allowance: string;
  proportion: string;

}

export default function AddPool() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight)

    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)

  }, [])


  const { address, chain } = useAccount()

  // 第一个H30地址，第二个Weh地址
  const [tokenList, setTokenList] = useState<TokenListType[]>([
    {
      symbol: 'H20',
      address: H30_Address,
      balance: '0',
      network: chain?.name ?? 'Arbitrum One',
      allowance: '',
      proportion: ''
    },
    {
      symbol: 'ETH',
      address: WETH_address,
      balance: '0',
      network: chain?.name ?? 'Arbitrum One',
      allowance: '',
      proportion: ''

    }
  ])

  const [tokenName, setTokenName] = useState([{ H20: 1, ETH: 0 }])



  const getTokens = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    await pairContract.token1().then(async (res: any) => {
      const tokenContract = new ethers.Contract(res, tokenAbi, provider)
      await tokenContract.symbol().then((res1) => {
        // console.log('1111111', res1)
        if (res1 == 'H20') {
          setTokenName((pre) => pre.map((item) => { return { H20: 1, ETH: 0 } }))
        }

      })
      // console.log('结果', res)
      // setInputReValue(String(Number(res[1]) / (10 ** 18)))
    }).catch(err => {
      // console.log('错误输出', err)
    })

  }







  // 获取池子的比例
  const getPairProportion = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)

    await pairContract.getReserves().then(async (res: any) => {
      setTokenList((pre) => pre.map((item) => item.symbol === 'H20' ? { ...item, proportion: String(Number(res[1]) / (10 ** 18)) } : item))
      setTokenList((pre) => pre.map((item) => item.symbol === 'ETH' ? { ...item, proportion: String(Number(res[0]) / (10 ** 18)) } : item))
    })

  }




  const getBalance = async (add: any) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)

    await contract.balanceOf(address).then(async (res2: any) => {
      // console.log('数据', res2)
      await contract.allowance(address, UniswapSepoliaRouterContract).then((res3: any) => {

        setTokenList((pre) => pre.map((item) => item.address === add ? { ...item, balance: String(Number(res2) / (10 ** 18)), allowance: String(BigInt(res3) / BigInt(10 ** 18)) } : item))
      })



    }).catch((_err) => {

    })
  }


  const getEthBalance = async () => {
    const balance = await provider.getBalance(address ?? '')
    // console.log("balance", balance)
    setTokenList((pre) => pre.map((item) => item.symbol === 'ETH' ? { ...item, balance: String(Number(balance) / (10 ** 18)), allowance: String(ethers.MaxUint256) } : item))

  }



  const OnChange = async () => {



    for (let i = 0; i < tokenList.length; i++) {
      getTokens()
      getPairProportion()
      if (address !== undefined) {
        if (tokenList[i].symbol == 'ETH') {

          getEthBalance()

        } else {
          getBalance(tokenList[i].address)

        }


      }
    }
  }


  useEffect(() => {

  }, [tokenList])

  useEffect(() => {

  }, [tokenName])







  useEffect(() => {

    for (let i = 0; i < tokenList.length; i++) {
      getTokens()
      getPairProportion()

      if (address !== undefined) {

        if (tokenList[i].symbol == 'ETH') {
          getEthBalance()

        } else {
          getBalance(tokenList[i].address)
        }
      }
    }

  }, [address])

  // const [openWallet, setOpenWallet] = useState(false)

  const navigate = useNavigate()

  const GoBack = () => {
    navigate(-1)

  }








  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            bgcolor: "#fff",
            overflow: 'hidden',
            height: windowWidth >= 600 ? '8vh' : 0,
            '&>*': {
              position: 'relative',
              zIndex: 5
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              boxShadow: 'inherit',
              top: 0,
              left: 0,
              zIndex: 2,
            }
          }}
        >

        </Box>
        <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
          <Card sx={{ boxShadow: 'none' }}>
            {
              windowWidth >= 600 ? (
                <Box sx={{ width: '600px', margin: '0 auto', p: '20px' }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '20px' }} onClick={GoBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Add Liquidity
                      </Typography>

                    </Stack>
                  </Box>



                  <PoolSons data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />
                </Box>
              ) : (
                <Box sx={{ width: `${windowWidth}px`, p: '20px 10px' }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }} onClick={GoBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Add Liquidity
                      </Typography>

                    </Stack>
                  </Box>

                  <PoolSons data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />

                </Box>

              )
            }



          </Card>

        </Box>
      </Box>
      {/* <PoolTotal windowHeight={windowHeight} windowWidth={windowWidth} /> */}
    </>
  );
}



// const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)


//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const open = Boolean(anchorEl)
//   const id = open ? 'simple-popover' : undefined





//   const [slippage, setSlippage] = useState('auto')
//   const [inputValue, setInputValue] = useState('')
//   const [show, setShow] = useState(false)




//   const OnCheckSlipage = (value: string) => {
//     setSlippage(value)

//   }

//   useEffect(() => {
//     if (Number(inputValue) < 0.05 && inputValue !== '') {
//       setShow(true)
//     } else {
//       setShow(false)

//     }

//   }, [slippage, show, inputValue])
//   const [firstChange, setFirstChange] = useState(false);

//   useEffect(() => {
//     console.log(firstChange)
//     if (!firstChange) {
//       // 首次变化时执行的操作
//       if (inputValue !== '') {
//         // console.log('111111111111')
//         setSlippage('custom')
//       }
//       setFirstChange(true);
//     }


//   }, [inputValue, firstChange, slippage])

//   const InputChange = (event: any) => {
//     setSlippage('custom')


//     const newValue = event.target.value.replace(/-/, '')
//     setInputValue(newValue)
//   }

//   const handleBlur = () => {
//     const parsedValue = parseFloat(inputValue)
//     if (!isNaN(parsedValue) && parsedValue < 0) {
//       setInputValue(String(Math.abs(parsedValue)))
//     }
//   }





{/* <Stack direction="row" justifyContent="space-between" width="100%" >
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: "#000", fontSize: '15px', fontWeight: 700 }}>
                      Add Liquidity
                    </Typography>
                  </Stack>
                  <Box>
                    <IconButton aria-describedby={id} onClick={handleClick}><SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /></IconButton>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
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

//           </Box>
//         </Stack>
//         {
//           !show ? (
//             <>


//             </>
//           ) : (
//             <>
//               <Stack direction="row" spacing="10px" alignItems="center" sx={{ width: '218px' }}>
//                 <PiWarningBold color='#f1c44e' size={30} />
//                 <Typography sx={{ color: "#f1c44e", fontSize: '12px', fontWeight: 500 }}>
//                   Slippage below 0.05% may result in a failed transaction
//                 </Typography>

//               </Stack>

//             </>
//           )
//         }

//       </Stack>

//     </Popover>

//   </Box>
// </Stack> */}




{/* <Stack direction="row" justifyContent="space-between" width="600px" >
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: "#000", fontSize: '15px', fontWeight: 700 }}>
                      Add Liquidity
                    </Typography>
                  </Stack> */}
{/* <Box>
                    <IconButton aria-describedby={id} onClick={handleClick}><SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /></IconButton>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
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

{/* </Box> */ }
{/* // </Stack> */ }
                //         {
                //           !show ? (
                //             <>


                //             </>
                //           ) : (
                //             <>
                //               <Stack direction="row" spacing="10px" alignItems="center" sx={{ width: '218px' }}>
                //                 <PiWarningBold color='#f1c44e' size={30} />
                //                 <Typography sx={{ color: "#f1c44e", fontSize: '12px', fontWeight: 500 }}>
                //                   Slippage below 0.05% may result in a failed transaction
                //                 </Typography>

                //               </Stack>

                //             </>
                //           )
                //         }

                //       </Stack>

                //     </Popover>

                //   </Box> */}
                // </Stack>