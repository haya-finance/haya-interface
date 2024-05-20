

// material-ui
import { Box, Container, Stack, Typography } from '@mui/material';

import FooterBlock from 'layout/CommonLayout/FooterBlock';
// import ConnectPage from './listProduct';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import titlePng from 'assets/actionImg/title.png'
import Methodology from './methodology';
import HistoryNotial from './growth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { arb_url, ETH_Price_ARB, H30_Address, pair_Address, sepolia_rpc } from 'config';
import pairAbi from 'abi/pair.json'
import PriceFeedAbi from 'abi/priceFeeds.json';
import tokenAbi from 'abi/token.json'

// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //

type PropsType = {
  windowWidth: number
}

function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 2)
        num = Math.floor(num)
        num /= 10 ** (i + 2)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    return num.toLocaleString()

  }
}

const provider = new ethers.JsonRpcProvider(sepolia_rpc)

const BuyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '20px 40px',
  fontSize: '16px',
  lineHeight: '18px',
  borderRadius: '20px',
  fontWeight: 600,
  color: '#fff',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#19A56A',
    color: '#fff',
  },
}));

const OneBuyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '15px 35px',
  fontSize: '18px',
  lineHeight: '18px',
  borderRadius: '20px',
  fontWeight: 600,
  color: '#fff',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#19A56A',
    color: '#fff',
  },
}));
const HeaderPage = ({ windowWidth }: PropsType) => {
  const navigate = useNavigate()

  const [tvl, setTvl] = useState('0')
  const [currPrice, setCurrPrice] = useState('0')
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

  const getData = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);


    await pairContract.getReserves().then(async (res: any) => {
      // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
      await priceFeed.latestRoundData().then(async (res1) => {
        // console.log(res1)
        await priceFeed.decimals().then(async (res2) => {
          // console.log(res2)
          const newtvl = String((Number(res[tokenName[0].ETH]) / (10 ** 18)) * (Number(res1[2]) / (10 ** Number(res2))) * 2)
          // console.log(newtvl)
          setTvl(newtvl)
          const price = String((Number(((Number(res[tokenName[0].ETH]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2)))) / (Number(res[tokenName[0].H20]) / (10 ** 18)))))
          // console.log('price', price)
          setCurrPrice(price)

        })

      })

    }).catch(err => {
      // console.log('错误输出', err)
    })


  }

  useEffect(() => {
    getTokens()
    getData()

  }, [])

  useEffect(() => {

  }, [tokenName])

  useEffect(() => {

  }, [tvl, currPrice])


  const goToSwap = () => {
    navigate('/swap')

  }
  useEffect(() => {

  }, [windowWidth])

  const goCrantract = () => {
    window.open(`${arb_url}${H30_Address}`, '_blank')

  }

  return (
    <>
      <Container sx={{ backgroundColor: '#fff', width: '100%' }}>
        {
          windowWidth >= 600 ? (
            <>
              <Box sx={{ paddingTop: '100px', paddingLeft: '36px', paddingRight: '36px' }}>

                <Stack direction="row" alignItems='start' justifyContent='space-evenly' spacing="2px" >
                  <Stack alignItems="start" justifyContent="center" height="290px" width="60%">
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '60px', lineHeight: '60px' }}  >
                      Invest <span style={{ color: '#1aae70' }}>$H20,</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '60px', lineHeight: '60px' }}  >
                      Buy the Crypto.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '24px', mt: '20px', mb: '30px' }}  >
                      H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
                    </Typography>
                    <BuyButton onClick={goToSwap}>Buy $H20</BuyButton>
                  </Stack>
                  <Box flex={1} textAlign="right">
                    <img
                      style={{ width: '290px' }}
                      src={titlePng}
                      loading="lazy"
                    />
                  </Box>

                </Stack>
                <Box mt="60px" mb="60px" sx={{ boxShadow: '0 0 50px 0 rgba(25, 0, 61, 0.1)', borderRadius: '20px', width: '100%', padding: '20px 0' }}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center" padding="10px 20px">
                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Current Price
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        {`$ ${formatNumber(Number(currPrice))}`}
                      </Typography>

                    </Stack>
                    <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>


                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Market Cap
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        {`$ ${formatNumber(Number(tvl))}`}
                      </Typography>

                    </Stack>
                    <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>

                    {/* <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        APY
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        $105.1%
                      </Typography>

                    </Stack> */}
                    {/* <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box> */}

                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Token Address
                      </Typography>
                      <Typography component="button" onClick={goCrantract} variant="body1" sx={{ cursor: 'pointer', color: '#000', backgroundColor: 'transparent', border: 0, fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}

                      </Typography>

                    </Stack>


                  </Stack>

                </Box>
                <HistoryNotial windowWidth={windowWidth} />
                <Methodology windowWidth={windowWidth} />

              </Box>
            </>
          ) : (
            <>
              <Box sx={{ paddingTop: '40px' }}>

                <Stack direction="row" alignItems='start' justifyContent='space-evenly' spacing="2px" >
                  <Stack alignItems="start" justifyContent="center" width="100%">
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '34px', lineHeight: '38px' }}  >
                      Invest <span style={{ color: '#1aae70' }}>$H20,</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '34px', lineHeight: '38px' }}  >
                      Buy the Crypto.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '12px', lineHeight: '18px', mt: '10px', mb: '20px' }}  >
                      H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
                    </Typography>
                    <OneBuyButton onClick={goToSwap}>Buy $H20</OneBuyButton>
                  </Stack>

                </Stack>
                <Box mt="30px" mb="60px" sx={{ boxShadow: '0 0 50px 0 rgba(25, 0, 61, 0.1)', borderRadius: '20px', width: '100%', padding: '20px 30px' }}>
                  {/* <Stack> */}
                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Current Price
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      {`$ ${formatNumber(Number(currPrice))}`}
                    </Typography>

                  </Stack>
                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>


                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Market Cap
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      {`$ ${formatNumber(Number(tvl))}`}
                    </Typography>

                  </Stack>

                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>

                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Token Address
                    </Typography>
                    <Typography variant="body1" onClick={goCrantract} component="button" sx={{ cursor: 'pointer', backgroundColor: 'transparent', border: 0, color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}
                    </Typography>

                  </Stack>

                  {/* </Stack> */}

                </Box>
                <HistoryNotial windowWidth={windowWidth} />
                <Methodology windowWidth={windowWidth} />

              </Box>
            </>
          )
        }
      </Container>

      {/* <ConnectPage windowWidth={windowWidth} /> */}

      <FooterBlock windowWidth={windowWidth} />
    </>
  );
};

export default HeaderPage;
