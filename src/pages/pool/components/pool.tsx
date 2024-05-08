import { Box, Card, Stack, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import poolImg from 'assets/images/Union.png'


type PropsType = {
  windowWidth: number;
  windowHeight: number
}


const AddButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '20px 20px',
  fontSize: '25px',
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
  return (
    <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
      <Card sx={{ boxShadow: 'none' }}>
        {
          windowWidth >= 600 ? (
            <>
              <Box sx={{ width: '600px', margin: '0 auto', p: '20px', height: '240px' }}>
                <Box sx={{ backgroundColor: '#F6F6F6', padding: '20px 30px', borderRadius: '20px' }}>
                  <Box sx={{ position: "relative" }}>
                    <img style={{ position: 'absolute', top: '-20px', right: '10px' }} src={poolImg} />
                    <Stack alignItems="start" spacing="20px" sx={{ maxWidth: '400px' }}>
                      <Typography sx={{ color: "#000", fontSize: '40px', lineHeight: '50px', fontWeight: 700 }}>
                        Provide liquidity and earn fees
                      </Typography>
                      <AddButton> Add Liquidity</AddButton>
                    </Stack>
                  </Box>


                </Box>

              </Box>

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