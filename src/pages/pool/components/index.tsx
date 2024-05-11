import { Avatar, AvatarGroup, Box, Card, Stack, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import poolImg from 'assets/images/Union.png'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { pair_Address, sepolia_rpc } from "config";

import pairAbi from 'abi/pair.json'
import { useAccount } from "wagmi";
import PoolDetail from "./PoolDetail";

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

const PoolTotal = ({ windowHeight, windowWidth }: PropsType) => {
  const [value, setValue] = useState(0)

  const OnCheckTitel = (v: number) => {
    setValue(v)

  }

  const { address } = useAccount()

  const [balance, setBalance] = useState('0')


  const getPairBalanceOf = async () => {
    const pairContract = new ethers.Contract(pair_Address, pairAbi, provider)

    await pairContract.balanceOf(address).then(async (res) => {
      await pairContract.decimals().then((res1) => {
        setBalance(String(Number(res) / (10 ** Number(res1))))
      }).catch((err) => {

      })

    }).catch((err) => {

    })
  }

  useEffect(() => {

  }, [value])


  useEffect(() => {
    if (address !== undefined) {
      getPairBalanceOf()
    }

  }, [address])



  const GoTODetail = () => {

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
                      <AddButton> Add Liquidity</AddButton>
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
                            $151,225,4
                          </Typography>


                        </Stack>
                      </Box>
                    ) : (
                      <>
                        {
                          Number(balance) > 0 ? (
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
                                  $151,225,4
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
              <PoolDetail windowWidth={windowWidth} />

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