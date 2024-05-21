import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useEffect } from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import Button, { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type DataProps = {
  toToken: string,
  fromToken: string,
  windowWeight: number,
  toLiquidty: string,
  fromLiquidty: string,
  inputValue: string


}

const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#1AAE70',
  boxShadow: 'none',
  padding: 0,
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: "#fff",
    color: '#1aae70',
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


function InputNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 2)
        num = Math.round(num)
        num /= 10 ** (i + 2)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 100
    num = Math.round(num)
    num /= 100

    return String(num)

  }
}








export default function ShowSwap({ toToken, fromToken, windowWeight, toLiquidty, fromLiquidty, inputValue }: DataProps) {

  const [hidden, setHidden] = React.useState(true)
  const handleChange = () => {
    setHidden(!hidden)
  }

  useEffect(() => {


  }, [toToken, fromToken, toLiquidty, fromLiquidty])

  return (
    <>
      {
        windowWeight >= 600 ? (
          <>
            <Box sx={{
              p: '0px 20px', backgroundColor: "#fff",
              width: "600px", margin: "0 auto", marginBottom: "20px"
            }}>

              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: '#464646', fontWeight: 600 }}>Prices and pool share</Typography>
                  <ShowButton endIcon={!hidden ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleChange}>Uniswap</ShowButton>
                </Stack>
                <Box sx={{ display: hidden ? 'block' : 'none' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 700 }}>
                        ETH per H20
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 700 }}>
                        {
                          toToken === 'ETH' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}>
                        H20 per ETH
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 600 }}>
                        {
                          toToken === 'H20' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}>
                        Share of Pool
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 600 }}>
                        {
                          toToken == 'ETH' ? (
                            <>{Number(InputNumber(Number(Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))) / Number(Math.sqrt(Number(toLiquidty) * Number(fromLiquidty)) + Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))))) * 100)) ?? 0.00} %</>

                          ) : (
                            <>{Number(InputNumber(Number(Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))) / Math.sqrt(Number(toLiquidty) * Number(fromLiquidty))) * 100)) ?? 0.00}%</>
                          )
                        }

                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>

            </Box>
            <Box>
              <Stack direction="row" spacing="6px" pb="12px" pt='8px' alignItems="center">
                <InfoIcon sx={{ color: '#6f6f6f', width: '22px', height: '22px' }} />
                <Typography sx={{ color: '#6f6f6f', fontSize: '14px', fontWeight: 600 }}>
                  Tip: When you add liquidity,you will receive pool tokens representing your position.
                  These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at time.
                </Typography>

              </Stack>
            </Box>
          </>

        ) : (
          <>
            <Box sx={{
              p: '0px ', backgroundColor: "#fff",
              width: "100%", margin: "0 auto", marginBottom: "10px"
            }}>

              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: '#464646', fontWeight: 600 }}>Prices and pool share</Typography>
                  <ShowButton endIcon={!hidden ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleChange}>Uniswap</ShowButton>
                </Stack>
                <Box sx={{ display: hidden ? 'block' : 'none' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '13px', fontWeight: 600 }}>
                        ETH per H20
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '13px', fontWeight: 600 }}>
                        {
                          toToken === 'ETH' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '13px', fontWeight: 600 }}>
                        H20 per ETH
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '13px', fontWeight: 600 }}>
                        {
                          toToken === 'H20' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: '#9B9B9B', fontSize: '13px', fontWeight: 600 }}>
                        Share of Pool
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" >
                      <Typography sx={{ color: "#464646", fontSize: '13px', fontWeight: 600 }}>
                        {
                          toToken == 'ETH' ? (
                            <>{Number(InputNumber(Number(Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))) / Number(Math.sqrt(Number(toLiquidty) * Number(fromLiquidty)) + Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))))) * 100)) ?? 0.00} %</>

                          ) : (
                            <>{Number(InputNumber(Number(Math.sqrt(Number(inputValue) * Number((1 * Number(fromLiquidty)) / Number(toLiquidty))) / Math.sqrt(Number(toLiquidty) * Number(fromLiquidty))) * 100)) ?? 0.00}%</>
                          )
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>

            </Box>
            <Box>
              <Stack direction="row" spacing="6px" pb="10px" pt='8px' alignItems="center">
                <InfoIcon sx={{ color: '#6f6f6f', width: '22px', height: '22px' }} />
                <Typography sx={{ color: '#6f6f6f', fontSize: '12px', fontWeight: 600 }}>
                  Tip: When you add liquidity,you will receive pool tokens representing your position.
                  These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at time.
                </Typography>

              </Stack>
            </Box>


          </>
        )
      }
    </>

  );
}
