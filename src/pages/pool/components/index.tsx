import { Avatar, AvatarGroup, Box, Card, Stack, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import poolImg from 'assets/images/Union.png'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ETH_Price_ARB, pair_Address, sepolia_rpc } from "config";

import pairAbi from 'abi/pair.json'
import { useAccount } from "wagmi";
import PriceFeedAbi from 'abi/priceFeeds.json'
import { useNavigate } from "react-router";

const avatarImage = require.context('assets/images/token', true);



type PropsType = {
  windowWidth: number;
  windowHeight: number
}


const provider = new ethers.JsonRpcProvider(sepolia_rpc)

const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '15px 24px',
  fontSize: '22px',
  lineHeight: '25px',
  borderRadius: '20px',
  color: '#fff',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#1AAE70',
    color: '#fff',
  },
}));


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



const PoolTotal = ({ windowHeight, windowWidth }: PropsType) => {
  const [value, setValue] = useState(0)




  const OnCheckTitel = (v: number) => {
    setValue(v)
  }

  const [tvl, setTvl] = useState('0')

  const { address } = useAccount()
  const [balance, setBalance] = useState('0')


  const getPairBalanceOf = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)
    await pairContract.balanceOf(address).then(async (res1) => {
      await pairContract.decimals().then((res2) => {

        setBalance(String(Number(res1) / (10 ** Number(res2))))
      }).catch((err) => {

      })

    }).catch((err) => {

    })



  }

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
    console.log(tvl)

  }, [tvl])

  useEffect(() => {

  }, [value])


  useEffect(() => {
    getData()
    if (address !== undefined) {
      getPairBalanceOf()
    }

  }, [address])

  const navigate = useNavigate()



  const GoTODetail = () => {
    navigate('/pool_detail')

  }

  const GoTOLpDetail = () => {
    navigate('/pool_lp_detail')

  }

  const AddLiquidity = () => {
    navigate('/add_pool')
  }
  return (
    <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
      <Card sx={{ boxShadow: 'none' }}>
        {
          windowWidth >= 600 ? (
            <>
              <Box sx={{ width: '600px', margin: '0 auto', p: '20px' }}>
                <Box sx={{ backgroundColor: '#F6F6F6', padding: '20px 30px', borderRadius: '20px', height: '240px' }}>
                  <Box sx={{ position: "relative" }}>
                    <img style={{ position: 'absolute', top: '-20px', right: '10px' }} src={poolImg} />
                    <Stack alignItems="start" spacing="20px" sx={{ maxWidth: '400px' }}>
                      <Typography sx={{ color: "#000", fontSize: '35px', lineHeight: '50px', fontWeight: 700 }}>
                        Provide liquidity and earn fees
                      </Typography>
                      <AddButton onClick={AddLiquidity}> Add Liquidity</AddButton>
                    </Stack>
                  </Box>


                </Box>
                <Stack direction="row" justifyContent="space-between" mt="20px">
                  <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                    Liquidity Pool
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ backgroundColor: 'rgba(118, 118, 128, 0.12)', borderRadius: '16px', p: '2px' }}>
                    <Box sx={value == 0 ? ({ p: '3px 25px', backgroundColor: '#fff', color: '#000', fontWeight: 600, fontSize: '14px', borderRadius: '16px', cursor: 'pointer', border: 0 }) : ({ p: '3px 25px', backgroundColor: 'transparent', color: '#000', fontWeight: 600, fontSize: '14px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                      All Pool
                    </Box>
                    <Box sx={value == 1 ? ({ p: '3px 25px', backgroundColor: '#fff', color: '#000', fontWeight: 600, fontSize: '14px', borderRadius: '16px', cursor: 'pointer', border: 0 }) : ({ p: '3px 25px', backgroundColor: 'transparent', color: '#000', fontWeight: 600, fontSize: '14px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(1)}>
                      My Pool
                    </Box>
                  </Stack>
                </Stack>
                <Box sx={{ backgroundColor: '#fff', border: '0.5px solid rgba(192, 192, 192, 0.5)', borderRadius: '20px', mt: '20px', }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '12px 20px', borderBottom: '0.5px solid rgba(192, 192, 192, 0.5)' }}>
                    <Typography sx={{ color: "#9b9b9b", fontSize: '13px', fontWeight: 500 }}>
                      Pool name
                    </Typography>
                    <Typography sx={{ color: "#9b9b9b", fontSize: '13px', fontWeight: 500 }}>
                      TVL
                    </Typography>


                  </Stack>

                  {
                    value == 0 ? (
                      <Box component="button" sx={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', width: '100%' }} onClick={GoTODetail}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '12px 20px' }}>
                          <Stack direction="row" alignItems="center" spacing="2px">
                            <AvatarGroup>
                              <Avatar alt="H20" src={avatarImage('./H20.png')} />
                              <Avatar alt="ETH" src={avatarImage('./ETH.png')} />
                            </AvatarGroup>
                            <Stack alignItems="start">
                              <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                                H20/ETH
                              </Typography>
                              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 500 }}>
                                Uniswap V2
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                            {`$ ${formatNumber(Number(tvl))}`}
                          </Typography>


                        </Stack>
                      </Box>
                    ) : (
                      <>
                        {
                          Number(balance) > 0 ? (
                            <Box component="button" sx={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', width: '100%' }} onClick={GoTOLpDetail}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '12px 20px' }}>
                                <Stack direction="row" alignItems="center" spacing="2px">
                                  <AvatarGroup>
                                    <Avatar alt="H20" src={avatarImage('./H20.png')} />
                                    <Avatar alt="ETH" src={avatarImage('./ETH.png')} />
                                  </AvatarGroup>
                                  <Stack alignItems="start">
                                    <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                                      H20/ETH
                                    </Typography>
                                    <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 500 }}>
                                      Uniswap V2
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 700 }}>
                                  {`$ ${formatNumber(Number(tvl))}`}
                                </Typography>


                              </Stack>
                            </Box>
                          ) : (
                            <Box sx={{ backgroundColor: 'transparent', border: 'none', width: '100%', padding: '12px 20px' }}>
                              <Typography sx={{ color: "#9b9b9b", fontSize: '14px', fontWeight: 500, textAlign: 'center', padding: '10px 0' }}>
                                None
                              </Typography>
                            </Box>
                          )
                        }
                      </>
                    )
                  }




                </Box>
              </Box>

            </>

          ) : (
            <></>
          )
        }
      </Card>
    </Box>
  )
}


export default PoolTotal