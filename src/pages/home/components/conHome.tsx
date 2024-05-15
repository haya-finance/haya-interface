

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
import { ETH_Price_ARB, pair_Address, sepolia_rpc } from 'config';
import pairAbi from 'abi/pair.json'
import PriceFeedAbi from 'abi/priceFeeds.json'

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

const provider = new ethers.JsonRpcProvider(sepolia_rpc)

const BuyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '10px 24px',
  fontSize: '18px',
  lineHeight: '18px',
  borderRadius: '20px',
  color: '#fff',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#1AAE70',
    color: '#fff',
  },
}));

const OneBuyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '10px 24px',
  fontSize: '18px',
  lineHeight: '18px',
  borderRadius: '20px',
  color: '#fff',
  backgroundColor: '#1B1B1B',
  '&:hover': {
    backgroundColor: '#1B1B1B',
    color: '#fff',
  },
}));
const HeaderPage = ({ windowWidth }: PropsType) => {
  const navigate = useNavigate()

  const [tvl, setTvl] = useState('0')

  const getData = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);


    await pairContract.getReserves().then(async (res: any) => {
      // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
      await priceFeed.latestRoundData().then(async (res1) => {
        await priceFeed.decimals().then(async (res2) => {
          const newtvl = String((Number(res[0]) / (10 ** 18)) * (Number(res1[2]) / (10 ** Number(res2))) * 2)
          setTvl(newtvl)
        })

      })

    }).catch(err => {
      // console.log('错误输出', err)
    })


  }

  useEffect(() => {
    getData()

  }, [])

  useEffect(() => {

  }, [tvl])


  const goToSwap = () => {
    navigate('/swap')

  }
  useEffect(() => {

  }, [windowWidth])

  return (
    <>
      <Container sx={{ backgroundColor: '#fff', width: '100%' }}>
        {
          windowWidth >= 600 ? (
            <>
              <Box sx={{ paddingTop: '70px', paddingLeft: '36px', paddingRight: '36px' }}>

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
                <Box mt="60px" mb="60px" sx={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)', borderRadius: '20px', width: '100%', padding: '20px 0' }}>
                  <Stack direction="row" justifyContent="space-around" alignItems="center" padding="10px 20px">
                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Current Price
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        $100.0
                      </Typography>

                    </Stack>
                    <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>


                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Market Cap
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        -----
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
                        TVL
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                        {`$ ${formatNumber(Number(tvl))}`}
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
              <Box sx={{ paddingTop: '20px' }}>

                <Stack direction="row" alignItems='start' justifyContent='space-evenly' spacing="2px" >
                  <Stack alignItems="start" justifyContent="center" width="100%">
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '34px', lineHeight: '38px' }}  >
                      Invest <span style={{ color: '#1aae70' }}>$H20,</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '34px', lineHeight: '38px' }}  >
                      Buy the Crypto.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '13px', lineHeight: '20px', mt: '10px', mb: '20px' }}  >
                      H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
                    </Typography>
                    <OneBuyButton onClick={goToSwap}>Buy $H20</OneBuyButton>
                  </Stack>

                </Stack>
                <Box mt="30px" mb="60px" sx={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)', borderRadius: '20px', width: '100%', padding: '20px 30px' }}>
                  {/* <Stack> */}
                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Current Price
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      $100.0
                    </Typography>

                  </Stack>
                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>


                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Market Cap
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      ------
                    </Typography>

                  </Stack>

                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>

                  <Stack spacing="16px" alignItems="center" padding="20px 20px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      TVL
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                      {`$ ${formatNumber(Number(tvl))}`}
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
