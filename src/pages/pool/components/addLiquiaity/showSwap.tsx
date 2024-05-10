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
        num = Math.floor(num)
        num /= 10 ** (i + 2)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 100
    num = Math.floor(num)
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
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                      ETH per H30
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                      {
                        toToken === 'ETH' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                      }
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                      H30 per ETH
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                      {
                        toToken === 'H30' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                      }
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                      Share of Pool
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                      {InputNumber(Number(inputValue) / Number(toLiquidty)) ?? 0.00} %
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

            </Box>
            <Box>
              <Stack direction="row" spacing="6px" pb="12px" pt='8px' alignItems="center">
                <InfoIcon sx={{ color: '#6f6f6f', width: '20px', height: '20px' }} />
                <Typography sx={{ color: '#6f6f6f', fontSize: windowWeight >= 600 ? '14px' : '11px' }}>
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
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '11px' }}>
                      ETH per H30
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '11px', fontWeight: 700 }}>
                      {
                        toToken === 'ETH' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                      }
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '11px' }}>
                      H30 per ETH
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                      {
                        toToken === 'H30' ? ValueNumber(Number((1 * Number(toLiquidty)) / Number(fromLiquidty))) : ValueNumber(Number((1 * Number(fromLiquidty)) / Number(toLiquidty)))
                      }
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: '#9B9B9B', fontSize: '11px' }}>
                      Share of Pool
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "#464646", fontSize: '11px', fontWeight: 700 }}>
                      {InputNumber(Number(inputValue) / Number(toLiquidty)) ?? 0.00} %
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

            </Box>
            <Box>
              <Stack direction="row" spacing="4px" pb="10px" pt='8px' alignItems="center">
                <InfoIcon sx={{ color: '#6f6f6f', width: '20px', height: '20px' }} />
                <Typography sx={{ color: '#6f6f6f', fontSize: windowWeight >= 600 ? '14px' : '11px' }}>
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
