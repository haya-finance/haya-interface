import { Button, Grid, Stack, Typography } from "@mui/material"
import { createSvgIcon } from '@mui/material/utils';
import { FormattedMessage } from "react-intl";
import DxAccountTable from "./components/dx_account";


const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

const DxAccounts = () => {

  const NewAccounts = () => {
    console.log('添加新的账户')
  }
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h3" textAlign='center'></Typography>
        </Grid>
        <Grid item>
          <Stack spacing={1} alignItems="flex-end">
            <div>
              <Button variant="outlined" startIcon={<PlusIcon />} size="medium" onClick={NewAccounts}><FormattedMessage id="new-acc" /></Button>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Grid container >
        <DxAccountTable />
      </Grid>
    </>
  )
}

export default DxAccounts