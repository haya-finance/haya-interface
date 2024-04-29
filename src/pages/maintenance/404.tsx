import { Link } from 'react-router-dom';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import { APP_DEFAULT_PATH } from 'config';

// assets
// import error404 from 'assets/images/maintenance/Error404.png';
import TwoCone from 'assets/images/maintenance/TwoCone.png';
import error403 from 'assets/images/maintenance/Error403.png';

// ==============================|| ERROR 404 - MAIN ||============================== //

function Error404() {
  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden' }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
                <img src={error403} alt="mantis" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
            <Grid item sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 60, left: -40, width: { xs: 130, sm: 390 }, height: { xs: 115, sm: 330 } }}>
                <img src={TwoCone} alt="mantis" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h1">您的权限不足</Typography>
            <Typography color="textSecondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
              很抱歉，您没有权限访问此页面，若有疑问请联系管理员
            </Typography>
            <Button component={Link} to={APP_DEFAULT_PATH} variant="contained">
              返回到首页
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Error404;
