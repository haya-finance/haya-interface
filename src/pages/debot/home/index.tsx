import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { GoArrowUpRight, GoArrowDownLeft } from 'react-icons/go';
import Bots from './components/bots';

const Home = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} mt={2}>
        <Typography variant="h3" textAlign="left" sx={{ mb: 2 }}>
          <FormattedMessage id="Overview" />
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', width: '100%', margin: '0 auto', padding: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="inherit" textAlign="left" sx={{ color: 'text.secondary' }}>
                <FormattedMessage id="total_asset_value" />
              </Typography>
            </Grid>
            <Grid item>
              <Stack spacing={1} alignItems="flex-end">
                <div>
                  <Button variant="contained">Ethereum</Button>
                </div>
              </Stack>
            </Grid>
          </Grid>

          <Typography variant="h3" textAlign="left" sx={{ mb: 2 }}>
            0.00 USD
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              borderRadius: 1,
              bgcolor: 'background.paper',
              marginTop: 1.5
            }}
          >
            <Typography variant="inherit" sx={{ display: 'inline-block', mr: 1 }}>
              0
            </Typography>
            <Typography variant="inherit" sx={{ display: 'inline-block', mr: 1, color: 'text.secondary' }}>
              TOKENS
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="inherit" sx={{ display: 'inline-block', ml: 1 }}>
              0
            </Typography>
            <Typography variant="inherit" sx={{ display: 'inline-block', ml: 1, color: 'text.secondary' }}>
              NFTS
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              borderRadius: 1,
              bgcolor: 'background.paper',
              marginTop: 3
            }}
          >
            <Button variant="outlined" sx={{ mr: 1, pl: 3, pr: 3 }} startIcon={<GoArrowUpRight />}>
              Send
            </Button>
            <Button variant="outlined" sx={{ pl: 3, pr: 3 }} startIcon={<GoArrowDownLeft />}>
              Receive
            </Button>
          </Box>
        </Box>
        <Bots />
      </Grid>
    </Grid>
  );
};

export default Home;
