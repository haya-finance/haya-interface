

// material-ui
import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import FootIcon from 'assets/footIcon';
import FootLogo from './footLogo';
import { Link as RouterLink } from 'react-router-dom';



// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //

type PropsType = {
  windowWidth: number
}


const FooterBlock = ({ windowWidth }: PropsType) => {


  const goTo = (url: string) => {
    window.open(`${url}`, '_blank')
  }

  return (
    <Box sx={windowWidth >= 600 ? { width: '100%', backgroundColor: '#F6F6F6', } : { width: `${windowWidth}px`, backgroundColor: '#F6F6F6', }} >
      {
        windowWidth >= 600 ? (
          <Container>

            <Stack direction="row" justifyContent="space-between" p="100px 36px 60px 36px">
              <Box sx={{ maxWidth: '700px' }}>
                <FootLogo />
                <Typography variant="body1" textAlign="start" sx={{ color: '#6F6F6F', fontSize: "16px", fontWeight: '24px' }}  >
                  Haya aspires to become a leading provider of innovative decentralized financial solutions,driving the development of ZKML DeFi and setting new industry standards.
                </Typography>
                <Stack direction="row" spacing="10px" pt="20px">
                  <IconButton onClick={() => goTo('https://twitter.com/HayaFinanceHQ')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Twitter" size={32} />
                  </IconButton >
                  {/* <IconButton sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Des" size={32} />
                  </IconButton> */}
                  <IconButton onClick={() => goTo('https://t.me/Haya_Finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Telegram" size={32} />
                  </IconButton>
                  <IconButton onClick={() => goTo('https://github.com/haya-finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="GitHub" size={32} />
                  </IconButton>


                </Stack>
              </Box>
              <Box>
                <Stack direction="row" spacing="60px">
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#000000', fontSize: "15px", lineHeight: '21px' }}  >
                      App
                    </Typography>
                    <Link to="/swap" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Swap
                    </Link>
                    <Link to="/pool" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Pool
                    </Link>
                    <Link to="/mint" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Mint
                    </Link>

                  </Stack>
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#000000', fontSize: "15px", lineHeight: '21px' }}  >
                      Resource
                    </Typography>
                    <Link onClick={() => goTo('https://docs.haya.finance/')} sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component="button" underline="none">
                      White Paper
                    </Link>
                    <Link onClick={() => goTo('https://medium.com/@HayaFinance')} sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component="button" underline="none">
                      Medium
                    </Link>
                    <Link onClick={() => goTo('https://drive.google.com/drive/folders/1oUCqCh6-DguiyMub08qpCFIIvjvtxWxa?usp=drive_link')} underline="none" sx={{ fontSize: '13px', textAlign: 'start', lineHeight: '18px', p: 0, color: '#464646' }} component="button">
                      Media Kit
                    </Link>

                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Box sx={{ pb: '30px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B' }}  >
                © 2024 Haya. All rights reserved
              </Typography>
            </Box>
          </Container>
        ) : (
          <>
            <Stack sx={{ width: '100%', p: "40px 20px 20px 20px" }}>
              <Box>
                <FootLogo />
                <Typography variant="body1" textAlign="start" sx={{ color: '#6F6F6F', fontSize: "14px", fontWeight: '24px' }}  >
                  Haya aspires to become a leading provider of innovative decentralized financial solutions,driving the development of ZKML DeFi and setting new industry standards.
                </Typography>
                <Stack direction="row" spacing="10px" pt="20px">
                  <IconButton onClick={() => goTo('https://twitter.com/HayaFinanceHQ')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Twitter" size={32} />
                  </IconButton >
                  {/* <IconButton  sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Des" size={32} />
                  </IconButton> */}
                  <IconButton onClick={() => goTo('https://t.me/Haya_Finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Telegram" size={32} />
                  </IconButton>
                  <IconButton onClick={() => goTo('https://github.com/haya-finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="GitHub" size={32} />
                  </IconButton>


                </Stack>
                <Stack direction="row" spacing="60px" pt="30px">
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#000000', fontSize: "15px", lineHeight: '21px' }}  >
                      App
                    </Typography>
                    <Link to="/swap" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Swap
                    </Link>
                    <Link to="/pool" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Pool
                    </Link>
                    <Link to="/mint" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} component={RouterLink} underline="none">
                      Mint
                    </Link>

                  </Stack>
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#000000', fontSize: "15px", lineHeight: '21px' }}  >
                      Resource
                    </Typography>
                    <Link onClick={() => goTo('https://docs.haya.finance/')} sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} underline="none" component="button" >
                      White Paper
                    </Link>
                    <Link onClick={() => goTo('https://medium.com/@HayaFinance')} sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#464646', textAlign: 'start' }} underline="none" component="button" >
                      Medium
                    </Link>
                    <Link onClick={() => goTo('https://drive.google.com/drive/folders/1oUCqCh6-DguiyMub08qpCFIIvjvtxWxa?usp=drive_link')} underline="none" sx={{ fontSize: '13px', textAlign: 'start', lineHeight: '18px', p: 0, color: '#464646' }} component="button" >
                      Media Kit
                    </Link>

                  </Stack>
                </Stack>

              </Box>
            </Stack>
            <Box sx={{ height: '60px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B', lineHeight: '60px' }}  >
                © 2024 Haya. All rights reserved
              </Typography>
            </Box>

          </>
        )
      }

    </Box>
  );
};

export default FooterBlock;
