import { Grid, Stack, Typography } from "@mui/material"
import CryptoList from "./components/crypto"
import FiatList from "./components/fiat"
import { useIntl } from 'react-intl'

const Balances = () => {

  const intl = useIntl()
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
        <Grid item>
          <Typography variant="h3" textAlign='center'></Typography>
        </Grid>
        <Grid item>
          <Stack spacing={1} alignItems="flex-end">
            <Typography variant="h5" textAlign='center' sx={{ color: '#919193' }}>{`${intl.formatMessage({ id: "total-balance" })} ≈ $320,000,000`}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <FiatList />
      <CryptoList />
    </Grid>
  )
}

export default Balances