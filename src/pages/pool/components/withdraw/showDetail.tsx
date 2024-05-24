import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useEffect } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type DataType = {
  liq: string;
  ETHAmount: string;
  H20Amount: string
}

type DataProps = {
  windowWeight: number,
  LpToken?: string,
  data: DataType[]


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


function ValueNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart?.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= (10 ** (i + 4))
        num = Math.round(num)
        num /= (10 ** (i + 4))
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 10000
    num = Math.round(num)
    num /= 10000

    return String(num)

  }
}








export default function ShowDetail({ windowWeight, LpToken, data }: DataProps) {

  const [hidden, setHidden] = React.useState(true)
  const handleChange = () => {
    setHidden(!hidden)
  }

  useEffect(() => {

  }, [data])

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
                  1ETH ≈ {ValueNumber(Number((1 * Number(data[0]?.H20Amount)) / Number(data[0]?.ETHAmount)))} H20
                </Typography>
              </Stack>
            </Stack>
            {/* <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '10px' }} >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}>
                  Estimated Gas fee
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ color: "#464646", fontSize: '14px', fontWeight: 600 }}>
                  0.003 ETH
                </Typography>
              </Stack>
            </Stack> */}
          </Box>
        </Box>

      </Box>
    </>

  );
}
