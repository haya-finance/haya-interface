

// material-ui
import { Box, Stack, Typography } from '@mui/material';
import FrameBanner from 'assets/banner/Frame.png'
import FooterBlock from 'layout/CommonLayout/FooterBlock';
import ConnectPage from './listProduct';

// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //

type PropsType = {
  windowWidth: number
}

const HeaderPage = ({ windowWidth }: PropsType) => {

  return (
    <>
      <Box sx={windowWidth >= 600 ? { height: '33rem', width: '100%', backgroundImage: `url(${FrameBanner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', alignItems: 'center' } : { height: '33rem', backgroundImage: `url(${FrameBanner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', alignItems: 'center' }} >

        <Stack sx={windowWidth >= 600 ? { height: '100%', width: '50%', margin: '0 auto' } : { height: '100%', width: `${windowWidth}px`, margin: '0 auto' }} alignItems='center' justifyContent='center'>
          <Typography variant="body1" textAlign="center" sx={{ color: '#fff', fontWeight: 700, fontSize: '6rem', lineHeight: '6rem' }}  >
            Trade Less,
          </Typography>

          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="body1" textAlign="center" sx={windowWidth >= 600 ? { color: '#99ff69', fontWeight: 700, fontSize: '6rem', lineHeight: '6rem' } : { color: '#99ff69', fontWeight: 700, fontSize: '5rem', lineHeight: '5rem' }}>
              Invest
            </Typography>
            <Typography variant="body1" textAlign="center" sx={windowWidth >= 600 ? { color: '#99ff69', fontWeight: 700, fontSize: '6rem', lineHeight: '6rem' } : { color: '#99ff69', fontWeight: 700, fontSize: '5rem', lineHeight: '5rem' }}>
              More
            </Typography>

          </Stack>
          <Typography variant="body1" textAlign="center" sx={{ color: '#fff', fontSize: windowWidth >= 600 ? 20 : 18, padding: '0 4px' }}  >
            In the long-term race against the market,few cross the finish line achead.Event expert investors commonly lag behind market averages over prolonged periods.
          </Typography>
        </Stack>
      </Box>

      <ConnectPage windowWidth={windowWidth} />

      <FooterBlock windowWidth={windowWidth} />
    </>
  );
};

export default HeaderPage;
