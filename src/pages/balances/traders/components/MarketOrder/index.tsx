
import { Grid, Stack, Typography } from "@mui/material"
import { Select } from "antd";
import React, { useEffect } from "react";
import BuyOrders from "./components/BuyOrders";
import SellOrders from "./components/SellOrders";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
        <Box sx={{ pt: 2 }}>
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
      color: '#000',
      backgroundColor: '#f5f5f5',
      opacity: 1,
    },
    '&.Mui-selected': {
      // color: '#1890ff',
      color: '#000',
      backgroundColor: '#f5f5f5',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

const MarketOrders = () => {
  const [value, setValue] = React.useState(0);

  const [orderCurrency, setOrderCurrency] = React.useState('BTC');





  const SelectOrderChange = (value: any) => {
    console.log('value', value)
    setOrderCurrency(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {

    console.log(orderCurrency)

  }, [orderCurrency])
  return (
    <>
      <Grid container sx={{ width: '100%' }}>
        <Stack spacing={0.5} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <Stack spacing={0.5} sx={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" sx={{ width: '100%', alignItems: 'center', justifyContent: "space-evenly" }}>
              <Select
                defaultValue={{ value: 'BTC', label: 'BTCUSDT' }}
                style={{ fontWeight: 700, color: 'rgba(0,0,0,1)', zIndex: 1 }}
                onChange={SelectOrderChange}

                bordered={false}
                options={[
                  { value: 'BTC', label: 'BTCUSDT' },
                  { value: 'ETH', label: 'ETHUSDT' },
                  { value: 'DAI', label: 'DAIUSDT' },
                  { value: 'BNB', label: 'BNBUSDT' },
                ]}
              />
              <Stack direction="row" spacing={2} sx={{ flex: 1, alignItems: 'center', justifyContent: "right" }}>
                <Typography variant="h4"  >27,571.35 </Typography>
                <Typography sx={{ color: 'red' }} variant="body2">{`+ 0.51%`}</Typography>

              </Stack>

            </Stack>

            <Stack sx={{ alignItems: 'center', justifyContent: "center", width: '100%' }}>
              {/* <TabContext > */}
              <Box sx={{ width: '100%' }}>
                <AntTabs value={value} onChange={handleChange} aria-label="lab API tabs example" >
                  <AntTab label={`Buy ${orderCurrency}`} />
                  <AntTab label={`Sell ${orderCurrency}`} />
                </AntTabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BuyOrders value={orderCurrency} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SellOrders value={orderCurrency} />
              </CustomTabPanel>

              {/* <TabPanel sx={{ width: '100%' }} value="1"><BuyOrders value={orderCurrency} /></TabPanel>
                <TabPanel sx={{ width: '100%' }} value="2"><SellOrders value={orderCurrency} /></TabPanel> */}
              {/* </TabContext> */}
            </Stack>
          </Stack>




        </Stack>









      </Grid>
    </>
  )
}

export default MarketOrders