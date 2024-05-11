import { Avatar, AvatarGroup, Box, Stack, Typography } from "@mui/material"
import { MdOutlineArrowBackIosNew } from "react-icons/md";
const avatarImage = require.context('assets/images/token', true);


type TypepProps = {
  windowWidth: number
}

const PoolDetail = ({ windowWidth }: TypepProps) => {

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" padding="10px 0">
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
          <Stack direction="row" alignItems="start" spacing="110px" padding="10px 0" >
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 24h
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                6.55%
              </Typography>

            </Stack>
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 7d
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                36.6%
              </Typography>

            </Stack>
            <Stack alignItems="start" spacing="6px">
              <Typography sx={{ color: "#9b9b9b", fontSize: '12px', fontWeight: 700 }}>
                Pool APR 30d
              </Typography>
              <Typography sx={{ color: "#000", fontSize: '12px', fontWeight: 700 }}>
                11.49%
              </Typography>

            </Stack>
          </Stack>


        </Box>
      </Box>


    </Box >
  )
}


export default PoolDetail