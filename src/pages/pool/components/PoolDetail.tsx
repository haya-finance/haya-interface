import { Avatar, AvatarGroup, Box, Stack, Typography } from "@mui/material"
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button'
import { useEffect, useState } from "react";
import PriceFeedAbi from 'abi/priceFeeds.json'
import pairAbi from 'abi/pair.json'
import { ETH_Price_ARB, pair_Address, sepolia_rpc } from "config";
import { ethers } from "ethers";
import { useNavigate } from "react-router";


const avatarImage = require.context('assets/images/token', true);


type DataType = {
  tvl: string;
  price: string;
  liq: string;
  ETHAmount: string;
  H20Amount: string
}


const provider = new ethers.JsonRpcProvider(sepolia_rpc)


const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  color: '#fff',
  // padding: '10px 0',
  fontWeight: 700,
  fontSize: '18px',
  border: 0,
  backgroundColor: '#1aae70',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#1aae70',
    color: '#fff',
  },
}));

const SwapButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  color: '#000',
  // padding: '10px 0',
  fontWeight: 700,
  fontSize: '18px',
  border: 0,
  borderRadius: '20px',
  backgroundColor: '#F6F6F6',
  '&:hover': {
    backgroundColor: '#F6F6F6',
    color: '#000',
  },
}));

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

const PoolDetail = () => {

  const [data, setData] = useState<DataType[]>([{
    tvl: '0',
    price: '0',
    liq: '0',
    ETHAmount: '0',
    H20Amount: '0'
  }])
  const navigate = useNavigate()



  const getData = async () => {

    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);


    await pairContract.getReserves().then(async (res: any) => {
      // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
      await priceFeed.latestRoundData().then(async (res1) => {
        await priceFeed.decimals().then(async (res2) => {
          const newtvl = String((Number(res[0]) / (10 ** 18)) * (Number(res1[2]) / (10 ** Number(res2))) * 2)
          await pairContract.totalSupply().then(async (res3) => {
            await pairContract.decimals().then((res4) => {
              const arr = [{ tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }]
              // setData((pre) => pre.map((item) => {
              //   return { tvl: newtvl, price: String(Number(res1[2]) / (10 ** Number(res2))), liq: String(Number(res3) / (10 ** Number(res4))), ETHAmount: String(Number(res[0]) / (10 ** 18)), H20Amount: String(Number(res[1]) / (10 ** 18)) }
              // }))
              setData(arr)
            })
          })
        })

      })

    }).catch(err => {
      // console.log('错误输出', err)
    })


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








  const addLiquity = () => {
    navigate('/add_pool')

  }

  const goSwap = () => {
    navigate('/swap')

  }

  useEffect(() => {
    console.log('data', data)

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
        <Box sx={{ padding: "20px", width: "600px", margin: "0 auto" }}>
          <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '20px' }} onClick={GoBack}>
            <Stack direction="row" alignItems="center" spacing="4px">
              <MdOutlineArrowBackIosNew />
              <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 500 }}>
                Pool Detail
              </Typography>

            </Stack>
          </Box>
          <Box sx={{ padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" padding="10px 0 20px 0">
              <Stack direction="row" alignItems="center" spacing="12px">
                <AvatarGroup>
                  <Avatar alt="H20" src={avatarImage('./H20.png')} sx={{ width: '30px', height: '30px' }} />
                  <Avatar alt="ETH" src={avatarImage('./ETH.png')} sx={{ width: '30px', height: '30px' }} />
                </AvatarGroup>
                <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                  H20/ETH
                </Typography>
              </Stack>
              <Box sx={{ backgroundColor: 'transparent', border: '1px solid rgba(192, 192, 192, 0.5)', borderRadius: '20px', padding: '4px' }}>
                <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                  LP fee 0.1%
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
              <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
                Volume
              </Typography>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                {`$ ${ValueNumber(Number(Number(data[0]?.tvl) / 2))}`}
              </Typography>


            </Stack>
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


      </Box >
    </Box>
  )
}


export default PoolDetail