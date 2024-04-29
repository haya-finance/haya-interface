import { Grid, IconButton, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useIntl } from 'react-intl';
import AllBotsList from './bots_listRoot';

const AllBots = () => {
  const intl = useIntl();
  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
      <Grid item>
        <Box>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={`${intl.formatMessage({ id: 'Search by name or category' })}`}
              inputProps={{ 'aria-label': 'search google maps' }}
            />
          </Paper>
        </Box>
        <Grid container>
          <AllBotsList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AllBots;
