import { Avatar, AvatarGroup, Box, Stack, Typography } from "@mui/material"
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button'
const avatarImage = require.context('assets/images/token', true);


type TypepProps = {
  windowWidth: number
}


const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  color: '#fff',
  // padding: '10px 0',
  fontWeight: 700,
  fontSize: '18px',
  border: 0,
  backgroundColor: '#1aae70',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#1aae70',
    color: '#fff',
  },
}));

const SwapButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  color: '#000',
  // padding: '10px 0',
  fontWeight: 700,
  fontSize: '18px',
  border: 0,
  borderRadius: '20px',
  backgroundColor: '#F6F6F6',
  '&:hover': {
    backgroundColor: '#F6F6F6',
    color: '#000',
  },
}));



const PoolLpDetail = ({ windowWidth }: TypepProps) => {

  const addLiquity = () => {

  }

  const goSwap = () => {

  }

  return (
    <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
      <Box sx={{ padding: "20px", width: "600px", margin: "0 auto" }}>
        <Box component="button" sx={{ cursor: 'pointer', padding: '0', width: '100%', backgroundColor: 'transparent', border: 'none', marginBottom: '20px' }}>
          <Stack direction="row" alignItems="center" spacing="4px">
            <MdOutlineArrowBackIosNew />
            <Typography sx={{ color: "#000", fontSize: '14px', fontWeight: 500 }}>
              Pool Detail
            </Typography>

          </Stack>
        </Box>
        <Box sx={{ padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '20px' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" padding="10px 0 20px 0">
            <Stack direction="row" alignItems="center" spacing="12px">
              <AvatarGroup>
                <Avatar alt="H20" src={avatarImage('./H20.png')} sx={{ width: '30px', height: '30px' }} />
                <Avatar alt="ETH" src={avatarImage('./ETH.png')} sx={{ width: '30px', height: '30px' }} />
              </AvatarGroup>
              <Typography sx={{ color: "#000", fontSize: '18px', fontWeight: 700 }}>
                H20/ETH
              </Typography>
            </Stack>
            <Box sx={{ backgroundColor: 'transparent', border: '1px solid rgba(192, 192, 192, 0.5)', borderRadius: '20px', padding: '4px' }}>
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                LP fee 0.1%
              </Typography>
            </Box>

          </Stack>

          <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
          <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
            Token rates
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              ETH per H20
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              2898.44
            </Typography>


          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              H20 per ETH
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              0.0000353014
            </Typography>


          </Stack>
          <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
          <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
            Token rates
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              TVL
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              $583.995
            </Typography>


          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              Volume
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              $88.059
            </Typography>


          </Stack>
          <Box sx={{ height: '0.5px', backgroundColor: '#c0c0c0', width: '100%' }}></Box>
          <Typography sx={{ color: "#464646", fontSize: '12px', padding: '10px 0', fontWeight: 600 }}>
            Pool reserve
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              H20
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              50,552.9296
            </Typography>


          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom="10px">
            <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
              ETH
            </Typography>
            <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 500 }}>
              49,285.6488
            </Typography>


          </Stack>
        </Box>
        <Box sx={{ padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '20px', marginTop: '20px' }}>
          <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500, marginBottom: '10px' }}>
            My Liquidity
          </Typography>
          <Typography sx={{ color: "#000", fontSize: '22px', fontWeight: 700, marginBottom: '10px', lineHeight: '22px' }}>
            0.026 LP-H20/ETH
          </Typography>
          <Typography sx={{ color: "#9B9B9B", fontSize: '12px', fontWeight: 500 }}>
            $ 0.00
          </Typography>
        </Box>
        <AddButton onClick={addLiquity} sx={{ margin: '20px 0' }}>
          Supply More
        </AddButton>
        <SwapButton onClick={goSwap}>Withdraw</SwapButton>
      </Box>


    </Box >
  )
}


export default PoolLpDetail