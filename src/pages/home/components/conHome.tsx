

// material-ui
import { Box, Container, IconButton, Skeleton, Stack, Typography } from '@mui/material';

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
import copyIcon from 'assets/images/icon/Copy.svg';
import { FaRegSquareCheck } from "react-icons/fa6";
import AddToWallet from './addToWallet';

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
        // num *= 10 ** (i + 2)
        // num = Math.floor(num)
        // num /= 10 ** (i + 2)
        var parts = num.toFixed(2).split(".");
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



  // const getData = async () => {
  //   const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
  //   const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);

  //   await pairContract.token1().then(async (res: any) => {
  //     const tokenContract = new ethers.Contract(res, tokenAbi, provider)
  //     await tokenContract.symbol().then(async (res1) => {
  //       // console.log('1111111', res1)
  //       if (res1 == 'H20') {
  //         await pairContract.getReserves().then(async (res: any) => {
  //           // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
  //           await priceFeed.latestRoundData().then(async (res1) => {
  //             // console.log(res1)
  //             await priceFeed.decimals().then(async (res2) => {
  //               // console.log(res2)
  //               const newtvl = String((Number(res[0]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2))) * 2)
  //               // console.log(newtvl)
  //               setTvl(newtvl)
  //               const price = String((Number(((Number(res[0]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2)))) / (Number(res[1]) / (10 ** 18)))))
  //               // console.log('price', price)
  //               setCurrPrice(price)

  //             })

  //           })

  //         }).catch(err => {
  //           // console.log('错误输出', err)
  //         })
  //       } else {
  //         await pairContract.getReserves().then(async (res: any) => {
  //           // console.log('结果', res, Number(res[0]) / (10 ** 18), Number(res[1]) / (10 ** 18), Number(res[2]) / (10 ** 18))
  //           await priceFeed.latestRoundData().then(async (res1) => {
  //             // console.log(res1)
  //             await priceFeed.decimals().then(async (res2) => {
  //               // console.log(res2)
  //               const newtvl = String((Number(res[1]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2))) * 2)
  //               // console.log(newtvl)
  //               setTvl(newtvl)
  //               const price = String((Number(((Number(res[1]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2)))) / (Number(res[0]) / (10 ** 18)))))
  //               // console.log('price', price)
  //               setCurrPrice(price)

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


  const getData = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    const priceFeed = new ethers.Contract(ETH_Price_ARB, PriceFeedAbi, provider);


    const res = await pairContract.getReserves()
    const res1 = await priceFeed.latestRoundData()
    Promise.all([res, res1]).then((result) => {
      const newtvl = String((Number(result[0][1]) / (10 ** 18)) * (Number(result[1][1]) / (10 ** 8)) * 2)
      // console.log(newtvl)
      setTvl(newtvl)
      const price = String((Number(((Number(result[0][1]) / (10 ** 18)) * (Number(result[1][1]) / (10 ** 8))) / (Number(result[0][0]) / (10 ** 18)))))
      // console.log('price', price)
      setCurrPrice(price)
    })


    // const newtvl = String((Number(res[1]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2))) * 2)
    //     // console.log(newtvl)
    //     setTvl(newtvl)
    //     const price = String((Number(((Number(res[1]) / (10 ** 18)) * (Number(res1[1]) / (10 ** Number(res2)))) / (Number(res[0]) / (10 ** 18)))))
    //     // console.log('price', price)
    //     setCurrPrice(price)






  }


  useEffect(() => {
    getData()

  }, [])


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

  const [copy, setCopy] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(H30_Address as string)

    setCopy(true)

    setTimeout(() => {
      setCopy(false)

    }, 2000)
  }

  const [openAdd, setOpenAdd] = useState(false)

  const onCloseAdd = () => {
    setOpenAdd(false)
  }



  const onAddClick = () => {
    setOpenAdd(true)

  }

  return (
    <>
      <AddToWallet windowWidth={windowWidth} open={openAdd} handleConfirmClose={onCloseAdd} />
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
                      $H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
                    </Typography>
                    <Stack alignItems="start" spacing="16px">
                      <BuyButton onClick={goToSwap}>Buy $H20</BuyButton>
                      <Box component="button" onClick={onAddClick} sx={{ color: '#1aae70', fontSize: '16px', lineHeight: '20px', backgroundColor: 'transparent', border: 0, cursor: 'pointer' }}>{`Add to Metamask >`}</Box>
                    </Stack>
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

                      {
                        Number(currPrice) == 0 ? (
                          <Skeleton variant="text" sx={{ fontSize: '18px', lineHeight: '20px', width: '100px', height: '20px' }} />

                        ) : (
                          <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                            {`$ ${formatNumber(Number(currPrice))}`}
                          </Typography>


                        )
                      }

                    </Stack>
                    <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>


                    <Stack spacing="10px" alignItems="center">

                      <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                        Total Value Locked
                      </Typography>

                      {
                        Number(tvl) == 0 ? (
                          <Skeleton variant="text" sx={{ fontSize: '18px', lineHeight: '20px', width: '100px', height: '20px' }} />

                        ) : (
                          <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                            {`$ ${formatNumber(Number(tvl))}`}
                          </Typography>


                        )
                      }


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
                      <Stack direction="row" alignItems="center" >
                        <Typography component="button" onClick={goCrantract} variant="body1" sx={{ cursor: 'pointer', color: '#000', backgroundColor: 'transparent', border: 0, fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                          {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}

                        </Typography>
                        {
                          !copy ? (
                            <IconButton sx={{ width: '24px', height: '24px' }} onClick={onCopy}>
                              <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                            </IconButton>
                          ) : (
                            // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                            <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                          )
                        }
                      </Stack>

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
                      $H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
                    </Typography>
                    <Stack alignItems="start" spacing="16px">
                      <OneBuyButton onClick={goToSwap}>Buy $H20</OneBuyButton>
                      <Box component="button" onClick={onAddClick} sx={{ color: '#1aae70', fontSize: '16px', lineHeight: '20px', backgroundColor: 'transparent', border: 0, cursor: 'pointer' }}>{`Add to Metamask >`}</Box>
                    </Stack>

                  </Stack>

                </Stack>
                <Box mt="30px" mb="60px" sx={{ boxShadow: '0 0 50px 0 rgba(25, 0, 61, 0.1)', borderRadius: '20px', width: '100%', padding: '20px 30px' }}>
                  {/* <Stack> */}
                  <Stack spacing="16px" alignItems="center" padding="20px 0px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Current Price
                    </Typography>
                    {
                      Number(currPrice) == 0 ? (
                        <Skeleton variant="text" sx={{ fontSize: '20px', lineHeight: '20px', width: '100px', height: '20px' }} />

                      ) : (
                        <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                          {`$ ${formatNumber(Number(currPrice))}`}
                        </Typography>


                      )
                    }


                  </Stack>
                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>


                  <Stack spacing="16px" alignItems="center" padding="20px 0px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Total Value Locked
                    </Typography>
                    {
                      Number(tvl) == 0 ? (
                        <Skeleton variant="text" sx={{ fontSize: '20px', lineHeight: '20px', width: '100px', height: '20px' }} />

                      ) : (
                        <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                          {`$ ${formatNumber(Number(tvl))}`}
                        </Typography>


                      )
                    }


                  </Stack>

                  <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', height: '1px' }}></Box>

                  <Stack spacing="16px" alignItems="center" padding="20px 0px">

                    <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 100, fontSize: '18px', lineHeight: '12px' }}  >
                      Token Address
                    </Typography>
                    <Stack direction="row" alignItems="center" >
                      <Typography variant="body1" onClick={goCrantract} component="button" sx={{ cursor: 'pointer', backgroundColor: 'transparent', border: 0, color: '#000', fontWeight: 700, fontSize: '20px', lineHeight: '12px' }}  >
                        {H30_Address?.substring(0, 6)}...{H30_Address?.substring(H30_Address.length - 6)}
                      </Typography>
                      {
                        !copy ? (
                          <IconButton sx={{ width: '24px', height: '24px' }} onClick={onCopy}>
                            <img style={{ width: '20px', height: '20px' }} src={copyIcon} />
                          </IconButton>
                        ) : (
                          // <IconButton sx={{ width: '24px', height: '24px', padding: 0 }} onClick={onCopy}>
                          <FaRegSquareCheck size={20} style={{ color: '#9B9B9B' }} />

                        )
                      }

                    </Stack>

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
