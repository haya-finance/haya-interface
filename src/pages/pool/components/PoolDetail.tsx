import { Box, Card, Stack, Typography } from "@mui/material"
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button'
import { useEffect, useState } from "react";
import PriceFeedAbi from 'abi/priceFeeds.json'
import pairAbi from 'abi/pair.json'
import { ETH_Price_ARB, pair_Address, sepolia_rpc } from "config";
import { ethers } from "ethers";
import { useNavigate } from "react-router";


import ETHH20 from 'assets/images/token/H20_ETH.svg'


type DataType = {
  tvl: string;
  price: string;
  liq: string;
  ETHAmount: string;
  H20Amount: string;
  h20Price: string
}


const provider = new ethers.JsonRpcProvider(sepolia_rpc)




function ValueNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.round(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 10000
    num = Math.round(num)
    num /= 10000

    return String(num)

  }
}

function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.round(num)
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

const PoolDetail = () => {

  const [data, setData] = useState<DataType[]>([{
    tvl: '0',
    price: '0',
    h20Price: '0',
    liq: '0',
    ETHAmount: '0',
    H20Amount: '0'
  }])
  const navigate = useNavigate()


  // const [tokenName, setTokenName] = useState([{ H20: 1, ETH: 0 }])



  // const getTokens = async () => {
  //   const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
  //   await pairContract.token1().then(async (res: any) => {
  //     const tokenContract = new ethers.Contract(res, tokenAbi, provider)
  //     await tokenContract.symbol().then((res1) => {
  //       // console.log('1111111', res1)
  //       if (res1 == 'H20') {
  //         setTokenName((pre) => pre.map((item) => { return { H20: 1, ETH: 0 } }))
  //       } else {
  //         setTokenName((pre) => pre.map((item) => { return { H20: 0, ETH: 1 } }))
  //       }

  //     })
  //     // console.log('结果', res)
  //     // setInputReValue(String(Number(res[1]) / (10 ** 18)))
  //   }).catch(err => {
  //     // console.log('错误输出', err)
  //   })

  // }





  const getData = async () => {

    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);


    const res1 = await pairContract.getReserves()
    const res2 = await priceFeed.latestRoundData()
    const res3 = await pairContract.totalSupply()
    const res4 = await pairContract.decimals()


    Promise.all([res1, res2, res3, res4]).then((result) => {

      const newtvl = String((Number(result[0][1]) / (10 ** 18)) * (Number(result[1][1]) / (10 ** 8)) * 2)
      const h20_price = String((Number(result[0][1]) / (10 ** 18)) * (Number(result[1][1]) / (10 ** 8)) / (Number(result[0][0]) / (10 ** 18)))
      const arr = [{ tvl: newtvl, h20Price: h20_price, price: String(Number(result[1][1]) / (10 ** 8)), liq: String(Number(result[2]) / (10 ** Number(result[3]))), ETHAmount: String(Number(result[0][1]) / (10 ** 18)), H20Amount: String(Number(result[0][0]) / (10 ** 18)) }]
      // setData((pre) => pre.map((item) => {
      //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
      // }))
      setData(arr)

    })

    // await pairContract.getReserves().then(async (res: any) => {
    //   // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
    //   await priceFeed.latestRoundData().then(async (res1) => {
    //     await priceFeed.decimals().then(async (res2) => {
    //       const newtvl = String((Number(res[tokenName[0].ETH]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2))) * 2)
    //       const h20_price = String((Number(res[tokenName[0].ETH]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2))) / (Number(res[tokenName[0].H20]) / (10 ** 18)))
    //       await pairContract.totalSupply().then(async (res3) => {
    //         await pairContract.decimals().then((res4) => {
    //           const arr = [{ tvl: newtvl, h20Price: h20_price, price: String(Number(res1[1]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[tokenName[0].ETH]) / (10 ** 18)), H20Amount: String(Number(res[tokenName[0].H20]) / (10 ** 18)) }]
    //           // setData((pre) => pre.map((item) => {
    //           //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
    //           // }))
    //           setData(arr)
    //         })
    //       })
    //     })

    //   })

    // }).catch(err => {
    //   // console.log('错误输出', err)
    // })


  }



  const [windowWidth, setWindowWidth] = useState(window.innerWidth)


  useEffect(() => {
    getData()
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    width: '100%',
    color: '#fff',
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

  const SwapButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    width: '100%',
    color: '#000',
    // padding: '10px 0',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '20px',
    border: 0,
    borderRadius: '20px',
    backgroundColor: '#F6F6F6',
    "&.Mui-disabled": {
      zIndex: 100,
      color: '#fff',

    },

    '&:hover': {
      backgroundColor: '#F6F6F6',
      color: '#000',
    },
  }));








  const addLiquity = () => {
    navigate('/add_pool')

  }

  const goSwap = () => {
    navigate('/swap')

  }

  useEffect(() => {
    // console.log('data', data)

  }, [data])

  const GoBack = () => {
    navigate(-1)

  }

  return (
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
              <>
                <Box sx={{ padding: "20px", width: "600px", margin: "0 auto" }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '20px' }} onClick={GoBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Pool Detail
                      </Typography>

                    </Stack>
                  </Box>
                  <Box sx={{ padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" padding="10px 0 20px 0">
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <img src={ETHH20} />
                        <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                          H20/ETH
                        </Typography>
                      </Stack>
                      <Box sx={{ backgroundColor: 'transparent', border: '1px solid rgba(192, 192, 192, 0.5)', borderRadius: '20px', padding: '4px' }}>
                        <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                          LP fee 0.3%
                        </Typography>
                      </Box>

                    </Stack>
                    {/* <Stack direction="row" alignItems="start" spacing="110px" padding="10px 0" >
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 24h
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                6.55%
              </Typography>

            </Stack>
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 7d
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                36.6%
              </Typography>

            </Stack>
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 30d
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                11.49%
              </Typography>

            </Stack>
          </Stack> */}
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Token rates
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        ETH per H20
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {ValueNumber(Number((1 * Number(data[0]?.ETHAmount)) / Number(data[0]?.H20Amount)))}
                      </Typography>


                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        H20 per ETH
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {ValueNumber(Number((1 * Number(data[0]?.H20Amount)) / Number(data[0]?.ETHAmount)))}
                      </Typography>


                    </Stack>
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Token rates
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        TVL
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {`$ ${ValueNumber(Number(data[0]?.tvl))}`}
                      </Typography>


                    </Stack>
                    {/* <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        Volume
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {`$ ${ValueNumber(Number(Number(data[0]?.ETHAmount) * Number(data[0]?.price)) + Number(Number(data[0]?.H20Amount) * Number(data[0]?.h20Price)))}`}
                      </Typography>


                    </Stack> */}
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Pool reserve
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        H20
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {formatNumber(Number(data[0]?.H20Amount))}
                      </Typography>


                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        ETH
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {formatNumber(Number(data[0]?.ETHAmount))}
                      </Typography>


                    </Stack>




                  </Box>
                  <AddButton onClick={addLiquity} sx={{ margin: '20px 0' }}>
                    Add Liquidity
                  </AddButton>
                  <SwapButton onClick={goSwap}>Swap</SwapButton>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ padding: "20px 10px", width: `${windowWidth}px` }}>
                  <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }} onClick={GoBack}>
                    <Stack direction="row" alignItems="center" spacing="4px">
                      <MdOutlineArrowBackIosNew />
                      <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                        Pool Detail
                      </Typography>

                    </Stack>
                  </Box>
                  <Box sx={{ padding: '20px 10px', backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" padding="12px 0 22px 0">
                      <Stack direction="row" alignItems="center" spacing="12px">
                        <img src={ETHH20} />
                        <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                          H20/ETH
                        </Typography>
                      </Stack>
                      <Box sx={{ backgroundColor: 'transparent', border: '1px solid rgba(192, 192, 192, 0.5)', borderRadius: '20px', padding: '4px' }}>
                        <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                          LP fee 0.3%
                        </Typography>
                      </Box>

                    </Stack>
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Token rates
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        ETH per H20
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {ValueNumber(Number((1 * Number(data[0]?.ETHAmount)) / Number(data[0]?.H20Amount)))}
                      </Typography>


                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        H20 per ETH
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {ValueNumber(Number((1 * Number(data[0]?.H20Amount)) / Number(data[0]?.ETHAmount)))}
                      </Typography>


                    </Stack>
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Token rates
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        TVL
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {`$ ${ValueNumber(Number(data[0]?.tvl))}`}
                      </Typography>


                    </Stack>
                    {/* <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        Volume
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {`$ ${ValueNumber(Number(Number(data[0]?.ETHAmount) * Number(data[0]?.price)) + Number(Number(data[0]?.H20Amount) * Number(data[0]?.h20Price)))}`}
                      </Typography>


                    </Stack> */}
                    <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
                    <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
                      Pool reserve
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        H20
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {formatNumber(Number(data[0]?.H20Amount))}
                      </Typography>


                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
                      <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                        ETH
                      </Typography>
                      <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                        {formatNumber(Number(data[0]?.ETHAmount))}
                      </Typography>


                    </Stack>




                  </Box>
                  <AddButton onClick={addLiquity} sx={{ margin: '20px 0' }}>
                    Add Liquidity
                  </AddButton>
                  <SwapButton onClick={goSwap}>Swap</SwapButton>
                </Box>
              </>
            )
          }

        </Card>


      </Box >
    </Box>
  )
}


export default PoolDetail