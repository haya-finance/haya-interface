import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import LastDays from './components/Last_days';
import LastThreeMonths from './components/Last_3_months';
import LastTwelveMonths from './components/Last_12_months';
import CustomizeQuery from './components/Customize_query';
import { useIntl } from 'react-intl';

export default function HistoryTrader() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const intl = useIntl()

  return (
    <Grid container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={`${intl.formatMessage({ id: "last-30-days" })}`} value="1" />
              <Tab label={`${intl.formatMessage({ id: "last-30-months" })}`} value="2" />
              <Tab label={`${intl.formatMessage({ id: "last-12-months" })}`} value="3" />
              <Tab label={`${intl.formatMessage({ id: "customize-query" })}`} value="4" />
            </TabList>
          </Box>
          <TabPanel value="1"><LastDays /></TabPanel>
          <TabPanel value="2"><LastThreeMonths /></TabPanel>
          <TabPanel value="3"><LastTwelveMonths /></TabPanel>
          <TabPanel value="4"><CustomizeQuery /></TabPanel>
        </TabContext>
      </Box>

    </Grid>
  );
}