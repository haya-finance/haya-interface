import { ReactNode, useMemo } from 'react';

// material-ui
import { Box, Grid, Stack } from '@mui/material';

// project import
// import AuthFooter from 'components/cards/AuthFooter';
import LoginLogo from 'components/logo/login_logo';
import AuthCard from './AuthCard';
import useConfig from 'hooks/useConfig';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';
import Localization from 'layout/MainLayout/Header/HeaderContent/Localization';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => {

  const { i18n } = useConfig()
  // const [age, setAge] = React.useState('');

  // const handleChange = (event: any) => {
  //   setAge(event.target.value);
  // };

  const localization = useMemo(() => <Localization />, [i18n]);



  return (
    <Box sx={{ minHeight: '50vh' }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '50vh'
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3, mr: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: "space-between" }}>
            <LoginLogo />
            {/* <FormControl sx={{ width: '10%' }}>
              <InputLabel id="demo-simple-select-label">Lang</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value='en'>En</MenuItem>
                <MenuItem value='zh'>Zh</MenuItem>
              </Select>
            </FormControl> */}

            <Box>
              {localization}
            </Box>

          </Stack>

        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          {/* <AuthFooter /> */}
        </Grid>
      </Grid>
    </Box>
  )
}
export default AuthWrapper;
