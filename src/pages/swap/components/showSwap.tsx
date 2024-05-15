import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import exchange from 'assets/images/Exchange.svg'
import { UniswapSepoliaRouterContract } from 'config';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type DataProps = {
  toToken: string,
  fromToken: string,
  windowWeight: number,
  oneSwap: string;
  liquidity: string;
}






export default function ShowSwap({ toToken, fromToken, windowWeight, oneSwap, liquidity }: DataProps) {


  const [hidder, setHidder] = React.useState(true)
  const handleChange = () => {
    setHidder(!hidder)
  }

  return (
    <Box sx={windowWeight >= 600 ? {
      p: "10px 20px", backgroundColor: "#fff",
      width: "600px", margin: "0 auto", marginTop: '20px'
    } : {
      p: "10px 10px", backgroundColor: "#fff",
      width: "100%", marginTop: '10px'
    }}>

      <Box sx={{ width: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1} flex={1}>
            <img style={{ width: 22, height: 22 }} src={exchange} />
            <Box sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
              <Stack direction="row" sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
                <Typography sx={{ display: 'inline', color: '#464646' }}>{`1 ${toToken} ≈ ${oneSwap} ${fromToken}`} </Typography>

              </Stack>
            </Box>
          </Stack>
          <Box component="button" sx={{ backgroundColor: 'transparent', padding: 0, border: 0, cursor: 'pointer', "&:hover": { backgroundColor: 'transparent' } }} onClick={handleChange}>
            <Stack direction="row" alignItems="center" spacing="2px">
              <Typography variant='body1' sx={{ fontSize: '14px', fontWeight: 500, color: '#464646', cursor: 'pointer' }} >
                Uniswap
              </Typography>
              {!hidder ? <KeyboardArrowUpIcon style={{ width: '20px', height: '20px' }} /> : <KeyboardArrowDownIcon style={{ width: '20px', height: '20px' }} />}
            </Stack>
          </Box>
        </Stack>
        <Box width="100%" sx={{ display: hidder ? 'none' : 'block' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px', fontWeight: 500 }}>
                Max Slippage
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                {liquidity}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px', fontWeight: 500 }}>
                Contract
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                {UniswapSepoliaRouterContract.slice(0, 6)}...{UniswapSepoliaRouterContract.slice(-4)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: " 10px" }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px', fontWeight: 500 }}>
                Offered from
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
                Uniswap_v2
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
