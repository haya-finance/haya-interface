import { Grid } from '@mui/material';
import BotsList from './bots_list';

const Bots = () => {
  return (
    <Grid container sx={{ mb: 4 }}>
      <BotsList />
    </Grid>
  );
};

export default Bots;
