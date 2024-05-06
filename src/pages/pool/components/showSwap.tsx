import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import React from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import Button, { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type DataProps = {
  toToken: string,
  fromToken: string,
  windowWeight: number,

}

const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#1AAE70',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: "#fff",
    color: '#1aae70',
  },
}));








export default function ShowSwap({ toToken, fromToken, windowWeight, }: DataProps) {

  const [hidden, setHidden] = React.useState(true)
  const handleChange = () => {
    setHidden(!hidden)
  }

  return (
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
                2898.44
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                ETH per H30
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                2898.44
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
                0.0000353014
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
                13.5%
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

  );
}
