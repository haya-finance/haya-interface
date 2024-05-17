import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type DataProps = {
  windowWeight: number,
  LpToken?: string


}

const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#464646',
  boxShadow: 'none',
  fontSize: '12px',
  fontWeight: 600,
  padding: 0,
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: "#fff",
    color: '#464646',
  },
  "&:active": {
    boxShadow: 'none',
  },
  "&:focus": {
    boxShadow: 'none',
  }
}));








export default function ShowDetail({ windowWeight, LpToken }: DataProps) {

  const [hidden, setHidden] = React.useState(true)
  const handleChange = () => {
    setHidden(!hidden)
  }

  return (
    <>
      <Box sx={windowWeight >= 600 ? {
        p: '10px 20px', backgroundColor: "#fff",
        marginBottom: "20px"
      } : {
        p: '10px 10px', backgroundColor: "#fff",
        marginBottom: "10px"
      }}>

        <Box sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing="6px">
              <Typography sx={{ color: '#464646', fontWeight: 600 }}>Detail </Typography>

            </Stack>
            <ShowButton endIcon={!hidden ? <KeyboardArrowUpIcon style={{ width: '20px', height: '20px' }} /> : <KeyboardArrowDownIcon />} onClick={handleChange}>Uniswap V2</ShowButton>
          </Stack>
          <Box width="100%" sx={{ display: hidden ? 'none' : 'block' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}>
                  Price
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 600 }}>
                  1ETH ≈ 100.234 H20
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}>
                  Estimated Gas fee
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 600 }}>
                  0.00035 ETH
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

      </Box>
    </>

  );
}
