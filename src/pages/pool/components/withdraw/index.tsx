

import { Box, Button, ButtonProps, Card, Slider, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import Web3 from 'web3'
import { pair_Address, sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import { ethers } from 'ethers';
import pairAbi from 'abi/pair.json'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { styled } from '@mui/material/styles';
import TokenColorIcon from 'assets/tokens';
import ShowDetail from './showDetail';
import { useNavigate } from 'react-router';
import tokenAbi from 'abi/token.json'
import ReviewWithdraw from './ReviewWithdraw';
import ETHH20 from 'assets/images/token/selETH_H20.svg'
// import PoolTotal from './pool';

// const web3 = new Web3(sepolia_rpc)
const provider = new ethers.JsonRpcProvider(sepolia_rpc)






const PrettoSlider = styled(Slider)({
  color: '#C0C0C0',
  height: 5,
  '& .MuiSlider-rail': {
    color: '#C0C0C0',

  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
    color: '#1AAE70'
  },
  '& .MuiSlider-thumb.MuiSlider-thumbColorPrimary': {
    border: 'none',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',

  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-mark.MuiSlider-markActive': {
    width: '10px',
    height: '10px',
    backgroundColor: '#1aae70',
    borderWidth: '0px'

  },
  '& .MuiSlider-mark': {
    width: '10px',
    height: '10px',
    border: 'none',
    backgroundColor: '#c0c0c0'

  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: '0px',
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});



const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function ValueNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= (10 ** (i + 4))
        num = Math.floor(num)
        num /= (10 ** (i + 4))
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

type DataType = {
  liq: string;
  ETHAmount: string;
  H20Amount: string
}

// type TokenListType = {
//   symbol: string;
//   address: string;
//   balance: string;
//   network: string;

// }



export default function WithdrawPoolPage() {


  const { address } = useAccount()




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

  const WithdrawButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    width: '100%',
    color: '#fff',
    textTransform: 'none',
    // padding: '10px 0',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '20px',
    border: 0,
    backgroundColor: '#1aae70',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
    },
  }));

  const SelectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    width: '100%',
    color: '#fff',
    border: 0,
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '20px',
    borderRadius: '20px',
    backgroundColor: '#9b9b9b',
    textTransform: 'none',
    "&.Mui-disabled": {
      zIndex: 100,
      color: '#fff',

    },
    '&:hover': {
      backgroundColor: '#9b9b9b',
      color: '#fff',
    },
  }));

  const [data, setData] = useState<DataType[]>([{

    liq: '0',
    ETHAmount: '0',
    H20Amount: '0'
  }])

  const [balance, setBalance] = useState('0')

  const [allowance, setAllowance] = useState<string>('0')


  const getPairBalanceOf = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    await pairContract.balanceOf(address).then(async (res1) => {

      await pairContract.decimals().then((res2) => {


        if (Number(ValueNumber(Number(String(Number(res1) / (10 ** Number(res2)))))) !== 0) {

          setBalance(String(Number(res1) / (10 ** Number(res2))))


        } else {
          navigate('/pool')


        }


      }).catch((err) => {

      })




    }).catch((err) => {

    })



  }

  const getData = async () => {

    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)





    const res1 = await pairContract.getReserves()
    const res3 = await pairContract.totalSupply()
    const res4 = await pairContract.decimals()



    Promise.all([res1, res3, res4]).then((result) => {

      const arr = [{ liq: String(Number(result[1]) / (10 ** Number(result[2]))), ETHAmount: String(Number(result[0][1]) / (10 ** 18)), H20Amount: String(Number(result[0][0]) / (10 ** 18)) }]
      // setData((pre) => pre.map((item) => {
      //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
      // }))
      setData(arr)

    })


  }




  // const getData = async () => {

  //   const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)

  //   await pairContract.token1().then(async (res: any) => {
  //     const tokenContract = new ethers.Contract(res, tokenAbi, provider)
  //     await tokenContract.symbol().then(async (res1) => {
  //       // console.log('1111111', res1)
  //       if (res1 == 'H20') {
  //         await pairContract.getReserves().then(async (res: any) => {
  //           // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
  //           await pairContract.totalSupply().then(async (res3) => {
  //             await pairContract.decimals().then((res4) => {
  //               const arr = [{ liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }]
  //               // setData((pre) => pre.map((item) => {
  //               //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
  //               // }))
  //               setData(arr)
  //             })
  //           })

  //         }).catch(err => {
  //           // console.log('错误输出', err)
  //         })
  //       } else {
  //         await pairContract.getReserves().then(async (res: any) => {
  //           // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
  //           await pairContract.totalSupply().then(async (res3) => {
  //             await pairContract.decimals().then((res4) => {
  //               const arr = [{ liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[1]) / (10 ** 18)), H20Amount: String(Number(res[0]) / (10 ** 18)) }]
  //               // setData((pre) => pre.map((item) => {
  //               //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
  //               // }))
  //               setData(arr)
  //             })
  //           })

  //         }).catch(err => {
  //           // console.log('错误输出', err)
  //         })
  //       }

  //     })
  //     // console.log('结果', res)
  //     // setInputReValue(String(Number(res[1]) / (10 ** 18)))
  //   }).catch(err => {
  //     // console.log('错误输出', err)
  //   })





  // }


  const getAllowance = async () => {
    const ApproveContract = new ethers.Contract(pair_Address, tokenAbi, provider)
    await ApproveContract.allowance(address, UniswapSepoliaRouterContract).then((res) => {
      setAllowance(String(BigInt(res)))

    })


  }


  useEffect(() => {

  }, [allowance])










  useEffect(() => {

  }, [data])







  useEffect(() => {

    getData()
    if (address !== undefined) {
      getPairBalanceOf()
      getAllowance()
    }


  }, [address])

  // const [openWallet, setOpenWallet] = useState(false)



  const OnChange = () => {
    getAllowance()
    getData()
    getPairBalanceOf()
    setValue(0)
    setInputValue('')

  }








  const [inputValue, setInputValue] = useState('0%')
  const [value, setValue] = useState<number>(0)
  const [openSwap, setOpenSwap] = useState(false)


  useEffect(() => {

  }, [inputValue])



  const onMax = () => {
    setInputValue('100%')
    setValue(100)

  }


  const handleSwapClose = () => {

    setOpenSwap(false)
  }

  const onWithdraw = () => {
    setOpenSwap(true)

  }

  const navigate = useNavigate()


  const goBack = () => {
    navigate(-1)

  }

  const valuetext = (even: any, newValue: number | number[]) => {
    // console.log(newValue)
    setInputValue(`${newValue}%`)
    setValue(newValue as number)

  }

  useEffect(() => {

  }, [value])









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
            <ReviewWithdraw open={openSwap} handleSwapClose={handleSwapClose} windowHeight={windowHeight} windowWidth={windowWidth} balance={balance} data={data} num={value} allowance={allowance} onChange={OnChange} />
            {
              windowWidth >= 600 ? (
                <Box sx={{ width: '600px', margin: '0 auto', p: '20px' }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '20px' }} onClick={goBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Withdraw liquidity
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ backgroundColor: '#F6F6F6', padding: '12px 20px', borderRadius: '20px', marginBottom: '10px' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '13px', fontWeight: 600 }}>
                        You withdraw
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="10px">
                        <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 600 }}>
                          Balance: <span style={{ fontSize: '12px', color: '#000', fontWeight: 700, marginLeft: '2px' }}>{ValueNumber(Number(balance))}</span>
                        </Typography>
                        <Typography component="button" variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }} onClick={onMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>

                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <BootstrapInput placeholder='0' /> */}
                      <Typography sx={{ color: "#000", fontSize: '22px', fontWeight: 700 }}>
                        {inputValue}
                      </Typography>
                      <Box sx={{ backgroundColor: '#fff', borderRadius: '100px', padding: '8px 8px', border: 'none' }}>
                        <Stack direction="row" alignItems="center" spacing="8px">
                          <img src={ETHH20} />
                          <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                            ETH/H20
                          </Typography>

                        </Stack>


                      </Box>
                    </Stack>



                  </Box>
                  <Box sx={{ padding: '7px 16px', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
                    <PrettoSlider
                      // valueLabelDisplay="auto"
                      onChange={valuetext}
                      value={value}
                      aria-label="pretto slider"
                      defaultValue={0}
                      marks={marks}
                    />
                  </Box>
                  <Box sx={{ padding: '12px 20px', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
                    <Typography sx={{ color: "#9B9B9B", fontSize: '12px', textAlign: 'start', fontWeight: 500, marginBottom: '10px' }}>
                      You receive
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <TokenColorIcon name="ETH" size={30} />
                        <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                          ETH
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                        {ValueNumber(Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.ETHAmount) * Number(value / 100)))}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <TokenColorIcon name="H20" size={30} />
                        <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                          H20
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                        {ValueNumber(Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.H20Amount) * Number(value / 100)))}

                      </Typography>
                    </Stack>

                  </Box>
                  <ShowDetail windowWeight={windowWidth} />
                  {
                    value == 0 ? (
                      <>
                        <SelectButton>Enter an Amount</SelectButton>

                      </>
                    ) : (
                      <>
                        <WithdrawButton onClick={onWithdraw}>Withdraw</WithdrawButton>
                      </>
                    )
                  }



                </Box>
              ) : (
                <Box sx={{ width: `${windowWidth}px`, p: '20px 10px' }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }} onClick={goBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Withdraw liquidity
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ backgroundColor: '#F6F6F6', padding: '12px 12px', borderRadius: '20px', marginBottom: '10px' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '13px', fontWeight: 600 }}>
                        You withdraw
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing="10px">
                        <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 600 }}>
                          Balance: <span style={{ fontSize: '12px', color: '#000', fontWeight: 700, marginLeft: '2px' }}>{ValueNumber(Number(balance))}</span>
                        </Typography>
                        <Typography component="button" variant='body1' sx={{ textDecoration: "none", minWidth: 0, p: 0, fontSize: '11px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }} onClick={onMax} color="primary">
                          MAX
                        </Typography>
                      </Stack>

                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <BootstrapInput placeholder='0' /> */}
                      <Typography sx={{ color: "#000", fontSize: '30px', lineHeight: '22px', fontWeight: 700 }}>
                        {inputValue}
                      </Typography>
                      <Box sx={{ backgroundColor: '#fff', borderRadius: '100px', padding: '8px 8px', border: 'none' }}>
                        <Stack direction="row" alignItems="center" spacing="8px">
                          <img src={ETHH20} />
                          <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                            ETH/H20
                          </Typography>

                        </Stack>


                      </Box>
                    </Stack>



                  </Box>
                  <Box sx={{ padding: '7px 16px', width: '100%', backgroundColor: 'transparent', border: 'none' }}>
                    <PrettoSlider
                      // valueLabelDisplay="auto"
                      onChange={valuetext}
                      value={value}
                      aria-label="pretto slider"
                      defaultValue={0}
                      marks={marks}
                    />
                  </Box>
                  <Box sx={{ padding: '12px 12px', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '5px' }}>
                    <Typography sx={{ color: "#9B9B9B", fontSize: '12px', textAlign: 'start', fontWeight: 500, marginBottom: '5px' }}>
                      You receive
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <TokenColorIcon name="ETH" size={30} />
                        <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                          ETH
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                        {ValueNumber(Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.ETHAmount) * Number(value / 100)))}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <TokenColorIcon name="H20" size={30} />
                        <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                          H20
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: "#000", fontSize: '16px', fontWeight: 700 }}>
                        {ValueNumber(Number((Number(balance) / Number(data[0]?.liq)) * Number(data[0]?.H20Amount) * Number(value / 100)))}

                      </Typography>
                    </Stack>

                  </Box>
                  <ShowDetail windowWeight={windowWidth} />
                  {
                    value == 0 ? (
                      <>
                        <SelectButton>Enter an Amount</SelectButton>

                      </>
                    ) : (
                      <>
                        <WithdrawButton onClick={onWithdraw}>Withdraw</WithdrawButton>
                      </>
                    )
                  }



                </Box>

              )
            }



          </Card>

        </Box>
      </Box >
      {/* <PoolTotal windowHeight={windowHeight} windowWidth={windowWidth} /> */}
    </>
  );
}