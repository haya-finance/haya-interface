

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
                  <IconButton sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Twitter" size={32} />
                  </IconButton >
                  <IconButton sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Des" size={32} />
                  </IconButton>
                  <IconButton sx={{ padding: '0', width: '32px', height: '32px' }}>
                    <FootIcon name="Telegram" size={32} />
                  </IconButton>
                  <IconButton sx={{ padding: '0', width: '32px', height: '32px' }}>
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
          </Container>
        ) : (
          <>
            <Stack sx={{ width: '100%', p: "60 20 60 20" }}>
              <Box>
                <FootLogo />
                <Typography variant="body1" textAlign="start" sx={{ color: '#c0c0c0', fontSize: "16px", fontWeight: '24px' }}  >
                  Haya aspires to become a leading provider of innovative decentralized financial solutions,driving the development of ZKML DeFi and setting new industry standards.
                </Typography>
                <Stack direction="row" mt="20px">
                  <IconButton>
                    <FootIcon name="Twitter" size={32} />
                  </IconButton>
                  <IconButton>
                    <FootIcon name="Des" size={32} />
                  </IconButton>
                  <IconButton>
                    <FootIcon name="Telegram" size={32} />
                  </IconButton>
                  <IconButton>
                    <FootIcon name="GitHub" size={32} />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing="60px" p="30px 0">
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
          </>
        )
      }

    </Box>
  );
};

export default FooterBlock;
