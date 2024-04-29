import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Balances from './components/Balancess';
import Deposit from './components/Deposit';
import Withdraws from './components/Withdraw';
import Historys from './components/History';
import { styled } from '@mui/material/styles';
import { useIntl } from 'react-intl';




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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  backgroundColor: '#fff',
  '& .MuiTabs-indicator': {
    height: '0px',
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,

    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
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
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      // color: '#40a9ff',
      color: '#fff',
      backgroundColor: '#1890ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      // color: '#1890ff',
      color: '#fff',
      backgroundColor: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

export default function FullWidthTabs() {
  const [value, setValue] = React.useState(0);
  const intl = useIntl();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} mt={2}>
        <Box sx={{ bgcolor: 'background.paper', width: '100%', margin: '0 auto' }}>
          <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>

            <AntTabs centered variant="fullWidth" value={value} onChange={handleChange} aria-label="lab API tabs example" >
              <AntTab label={`${intl.formatMessage({ id: "acc-balances" })}`} />
              <AntTab label={`${intl.formatMessage({ id: "acc-deposit" })}`} />
              <AntTab label={`${intl.formatMessage({ id: "acc-withdraw" })}`} />
              <AntTab label={`${intl.formatMessage({ id: "history" })}`} />
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
            <Balances />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Deposit />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Withdraws />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Historys />
          </CustomTabPanel>

        </Box>
      </Grid>
    </Grid>
  );
}