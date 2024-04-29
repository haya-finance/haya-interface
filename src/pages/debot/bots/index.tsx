import { AppBar, Box, Grid, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MyBots from './components/my_bots';
import AllBots from './components/all_bots';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ width: '100%' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface StyledTabProps {
  label: string;
}

const AntTabs = styled(Tabs)({
  borderBottom: '0px solid #e8e8e8',
  backgroundColor: '#f0f0f0',
  width: '30%',
  '& .MuiTabs-indicator': {
    height: '0px',
    backgroundColor: '#f0f0f0'
  }
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,

  [theme.breakpoints.up('sm')]: {
    minWidth: 0
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    // color: '#40a9ff',
    borderBottom: '1px solid #000',
    color: '#000',
    backgroundColor: '#f0f0f0',
    opacity: 1
  },
  '&.Mui-selected': {
    // color: '#1890ff',
    borderBottom: '1px solid #000',
    color: '#000',
    backgroundColor: '#f0f0f0',
    fontWeight: theme.typography.fontWeightMedium
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#f0f0f0'
  }
}));

const BotsRoot = () => {
  const [value, setValue] = React.useState(0);
  const intl = useIntl();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} mt={2}>
        <Typography variant="h3" textAlign="left" sx={{ mb: 2 }}>
          <FormattedMessage id="Explore the Debot ecosystem" />
        </Typography>
        <Typography variant="caption" textAlign="left" sx={{ mb: 2 }}>
          <FormattedMessage id="Connect to vour favourite bots with vour Smart Wallet. securelv and efficientlv." />
        </Typography>
        <Box sx={{ bgcolor: '#f0f0f0', width: '100%', margin: '0 auto', padding: 2 }}>
          <AppBar position="static" sx={{ backgroundColor: '#f0f0f0', boxShadow: 'none' }}>
            <AntTabs centered variant="fullWidth" value={value} onChange={handleChange} aria-label="lab API tabs example">
              <AntTab label={`${intl.formatMessage({ id: 'all_bots' })}`} />
              <AntTab label={`${intl.formatMessage({ id: 'my_bots' })}`} />
            </AntTabs>
          </AppBar>
          {/* <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
<Tabs
  value={value}
  onChange={handleChange}
  indicatorColor="secondary"
  textColor="inherit"
  centered
  variant="fullWidth"
  aria-label="full width tabs example"

>
  <Tab label="Balances" {...a11yProps(0)} />
  <Tab label="Deposit" {...a11yProps(1)} />
  <Tab label="Withdraw" {...a11yProps(2)} />
  <Tab label="History" {...a11yProps(3)} />
</Tabs>
</AppBar> */}

          <CustomTabPanel value={value} index={0}>
            <AllBots />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MyBots />
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BotsRoot;
