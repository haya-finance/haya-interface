

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
    window.location.assign(url)
  }

  return (
    <Box sx={windowWidth >= 600 ? { width: '100%', backgroundColor: '#1b1b1b', } : { width: `${windowWidth}px`, backgroundColor: '#1b1b1b', }} >
      {
        windowWidth >= 600 ? (
          <Container>

            <Stack direction="row" justifyContent="space-between" p="100px 0">
              <Box sx={{ maxWidth: '700px' }}>
                <FootLogo />
                <Typography variant="body1" textAlign="start" sx={{ color: '#c0c0c0', fontSize: "16px", fontWeight: '24px' }}  >
                  Haya aspires to become a leading provider of innovative decentralized financial solutions,driving the development of ZKML DeFi and setting new industry standards.
                </Typography>
                <Stack direction="row" spacing="10px" pt="20px">
                  <IconButton onClick={() => goTo('https://twitter.com/haya_finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
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
                    <Typography variant="body1" textAlign="start" sx={{ color: '#fff', fontSize: "15px", lineHeight: '21px' }}  >
                      App
                    </Typography>
                    <Link to="/swap" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Swap
                    </Link>
                    <Link to="/mint" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Mint
                    </Link>

                  </Stack>
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#fff', fontSize: "15px", lineHeight: '21px' }}  >
                      Resource
                    </Typography>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      White Paper
                    </Link>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Medium
                    </Link>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Brand Kit
                    </Link>

                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Box sx={{ height: '100px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#c0c0c0', lineHeight: '100px' }}  >
                © 2024 Haya. All rights reserved
              </Typography>
            </Box>
            <Box >
              <Typography variant="body1" textAlign="center" sx={{ color: '#c0c0c0', lineHeight: '60px', fontSize: '12px' }}  >
                {`(V1.0.0) 2024/04/30`}
              </Typography>
            </Box>
          </Container>
        ) : (
          <>
            <Stack sx={{ width: '100%', p: "60px 20px 60px 20px" }}>
              <Box>
                <FootLogo />
                <Typography variant="body1" textAlign="start" sx={{ color: '#c0c0c0', fontSize: "14px", fontWeight: '24px' }}  >
                  Haya aspires to become a leading provider of innovative decentralized financial solutions,driving the development of ZKML DeFi and setting new industry standards.
                </Typography>
                <Stack direction="row" spacing="10px" pt="20px">
                  <IconButton onClick={() => goTo('https://twitter.com/haya_finance')} sx={{ padding: '0', width: '32px', height: '32px' }}>
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
                    <Typography variant="body1" textAlign="start" sx={{ color: '#fff', fontSize: "15px", lineHeight: '21px' }}  >
                      App
                    </Typography>
                    <Link to="/swap" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Swap
                    </Link>
                    <Link to="/mint" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Mint
                    </Link>

                  </Stack>
                  <Stack spacing="20px">
                    <Typography variant="body1" textAlign="start" sx={{ color: '#fff', fontSize: "15px", lineHeight: '21px' }}  >
                      Resource
                    </Typography>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      White Paper
                    </Link>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Medium
                    </Link>
                    <Link to="/" sx={{ fontSize: '13px', lineHeight: '18px', p: 0, color: '#c0c0c0' }} component={RouterLink} underline="none">
                      Brand Kit
                    </Link>

                  </Stack>
                </Stack>

              </Box>
            </Stack>
            <Box sx={{ height: '60px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#c0c0c0', lineHeight: '60px' }}  >
                © 2024 Haya. All rights reserved
              </Typography>
            </Box>
            <Box >
              <Typography variant="body1" textAlign="center" sx={{ color: '#c0c0c0', lineHeight: '60px', fontSize: '12px' }}  >
                {`(V1.0.0) 2024/04/30`}
              </Typography>
            </Box>

          </>
        )
      }

    </Box>
  );
};

export default FooterBlock;
