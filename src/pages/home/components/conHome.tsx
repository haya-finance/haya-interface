

// material-ui
import { Box, Container, Stack, Typography } from '@mui/material';

import FooterBlock from 'layout/CommonLayout/FooterBlock';
// import ConnectPage from './listProduct';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import titlePng from 'assets/actionImg/title.png'
import Methodology from './methodology';
import HistoryNotial from './growth';

// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //

type PropsType = {
  windowWidth: number
}

const BuyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '15px 24px',
  fontSize: '22px',
  lineHeight: '25px',
  borderRadius: '20px',
  color: '#fff',
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#1AAE70',
    color: '#fff',
  },
}));
const HeaderPage = ({ windowWidth }: PropsType) => {

  return (
    <>
      <Container sx={{ backgroundColor: '#fff', width: '100%' }}>
        <Box sx={{ paddingTop: windowWidth >= 600 ? '70px' : '80px', paddingLeft: '36px', paddingRight: '36px' }}>

          <Stack direction="row" alignItems='start' justifyContent='space-evenly' spacing="2px" >
            <Stack alignItems="start" justifyContent="center" height="290px" width="60%">
              <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '60px', lineHeight: '60px' }}  >
                Invest <span style={{ color: '#1aae70' }}>$H20,</span>
              </Typography>
              <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '60px', lineHeight: '60px' }}  >
                Buy the Crypto.
              </Typography>
              <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '24px', mt: '20px', mb: '30px' }}  >
                H20 is an entirely data-driven on-chain index token consisting of 20 top-tier crypto market assets.It is fully open-source and represents the growth of the crypto market.
              </Typography>
              <BuyButton>Buy $H20</BuyButton>
            </Stack>
            <Box flex={1} textAlign="right">
              <img
                style={{ width: '290px' }}
                src={titlePng}
                loading="lazy"
              />
            </Box>

          </Stack>
          <Box mt="60px" mb="60px" sx={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)', borderRadius: '20px', width: '100%', padding: '20px 0' }}>
            <Stack direction="row" justifyContent="space-around" alignItems="center" padding="10px 20px">
              <Stack spacing="10px" alignItems="center">

                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                  Current Price
                </Typography>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                  $279.3
                </Typography>

              </Stack>
              <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>


              <Stack spacing="10px" alignItems="center">

                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                  Market Cap
                </Typography>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                  $13,732,910.1
                </Typography>

              </Stack>
              <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>

              <Stack spacing="10px" alignItems="center">

                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                  APY
                </Typography>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                  $105.1%
                </Typography>

              </Stack>
              <Box sx={{ width: '1px', backgroundColor: '#9b9b9b', height: '40px' }}></Box>

              <Stack spacing="10px" alignItems="center">

                <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '16px', lineHeight: '14px' }}  >
                  TVL
                </Typography>
                <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '18px', lineHeight: '18px' }}  >
                  $3,732,910.1
                </Typography>

              </Stack>


            </Stack>

          </Box>
          <HistoryNotial windowWidth={windowWidth} />
          <Methodology windowWidth={windowWidth} />

        </Box>
      </Container>

      {/* <ConnectPage windowWidth={windowWidth} /> */}

      <FooterBlock windowWidth={windowWidth} />
    </>
  );
};

export default HeaderPage;
