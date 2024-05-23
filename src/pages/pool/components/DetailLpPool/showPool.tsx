import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useEffect } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdInfo } from "react-icons/md";

type DataType = {
  tvl: string;
  price: string;
  liq: string;
  ETHAmount: string;
  H20Amount: string
}


type DataProps = {
  windowWeight: number,
  data: DataType[],
  balanceOf: string;



}


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








export default function ShowPool({ windowWeight, balanceOf, data }: DataProps) {

  const [hidden, setHidden] = React.useState(true)
  const handleChange = () => {
    setHidden(!hidden)
  }

  useEffect(() => {

  }, [data, balanceOf])

  return (
    <>
      <Box sx={windowWeight >= 600 ? {
        p: '10px 20px', backgroundColor: "#fff",
        marginTop: "20px"
      } : {
        p: '10px 10px', backgroundColor: "#fff",
        marginTop: "10px"
      }}>

        <Box sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing="6px">
              <Typography sx={{ color: '#464646', fontWeight: 600 }}>In the pool  </Typography>
              <MdInfo color='#6F6F6F' style={{ width: '16px', height: '16px', marginTop: '2px' }} />

            </Stack>
            <ShowButton endIcon={!hidden ? <KeyboardArrowUpIcon style={{ width: '20px', height: '20px' }} /> : <KeyboardArrowDownIcon />} onClick={handleChange}>{`$ ${formatNumber((Number(Number(balanceOf) / Number(data[0]?.liq) * Number(data[0]?.ETHAmount)) * Number(data[0]?.price)) * 2)}`}</ShowButton>
          </Stack>
          <Box width="100%" sx={{ display: hidden ? 'none' : 'block' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                  Pool share
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 600 }}>
                  {`${ValueNumber(Number(Math.sqrt(Number(Number(balanceOf) / Number(data[0]?.liq) * Number(data[0]?.ETHAmount)) * Number(Number(balanceOf) / Number(data[0]?.liq) * Number(data[0]?.H20Amount))) / Math.sqrt(Number(data[0]?.ETHAmount) * Number(data[0]?.H20Amount))) * 100)}%`}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                  ETH provided
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 600 }}>
                  {ValueNumber(Number(Number(balanceOf) / Number(data[0]?.liq) * Number(data[0]?.ETHAmount)))}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                  H20 provided
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 600 }}>
                  {ValueNumber(Number(Number(balanceOf) / Number(data[0]?.liq) * Number(data[0]?.H20Amount)))}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                  LP tokens
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 600 }}>
                  {ValueNumber(Number(balanceOf))}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

      </Box>
    </>

  );
}
