import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Grid, Typography } from '@mui/material';
import LastDays from './components/Last_days';
import LastThreeMonths from './components/Last_3_months';
import LastTwelveMonths from './components/Last_12_months';
import CustomizeQuery from './components/Customize_query';
import Tabs from '@mui/material/Tabs';
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
      color: '#1890ff',
      // backgroundColor: '#f5f5f5',
      opacity: 1,
    },
    '&.Mui-selected': {
      // color: '#1890ff',
      color: '#1890ff',
      // backgroundColor: '#f5f5f5',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

export default function HistorysOst() {
  const [value, setValue] = React.useState(0);
  const intl = useIntl()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Box>
          <AntTabs value={value} onChange={handleChange} aria-label="lab API tabs example" >
            <AntTab label={`${intl.formatMessage({ id: "last-30-days" })}`} />
            <AntTab label={`${intl.formatMessage({ id: "last-30-months" })}`} />
            <AntTab label={`${intl.formatMessage({ id: "last-12-months" })}`} />
            <AntTab label={`${intl.formatMessage({ id: "customize-query" })}`} />
          </AntTabs>
        </Box>
        <CustomTabPanel value={value} index={0}><LastDays /></CustomTabPanel>
        <CustomTabPanel value={value} index={1}><LastThreeMonths /></CustomTabPanel>
        <CustomTabPanel value={value} index={2}><LastTwelveMonths /></CustomTabPanel>
        <CustomTabPanel value={value} index={3}><CustomizeQuery /></CustomTabPanel>
      </Box>

    </Grid>
  );
}