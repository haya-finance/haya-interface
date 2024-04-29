import { Autocomplete, Box, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import React from "react";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage, useIntl } from "react-intl";
import ColorFiatIcon from "assets/icons/color/fiat";


interface DataTypeFiatCurrency {
  fiat_currency: string;
}

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#60d937',
  fontSize: 16,
  padding: '6px 12px',
  border: '0px solid',
  lineHeight: 1.5,
  borderColor: '#000',
  '&:hover': {
    backgroundColor: '#00ff00',
    opacity: 1,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    // backgroundColor: '#fff',
    // borderColor: '#000',
  },
  '&:focus': {
    boxShadow: 'none',
  },
  '&:after': {
    boxShadow: '0 0 5px 5px rgba(96, 217, 55, 0.9)'
  }
}));

const DepositList = () => {
  const intl = useIntl()

  const [selectFiatCurrency, setSelectFiatCurrency] = React.useState('')
  const tran_rows: DataTypeFiatCurrency[] = [
    { fiat_currency: 'USD' },
    { fiat_currency: 'EUR' },
    { fiat_currency: 'JPY' },
    { fiat_currency: 'GBP' },

  ];




  const SelectFiatCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectFiatCurrency(value)
  }

  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="currency" /></Typography>
          <Autocomplete
            id="country-select-demo"
            options={tran_rows}
            sx={{ flex: 35 }}
            autoHighlight
            size="small"
            onInputChange={SelectFiatCurrency}
            getOptionLabel={(option) => option.fiat_currency}
            renderOption={(props, option) => (
              <>
                <Box component="li"  {...props}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                    <ColorFiatIcon name={option.fiat_currency} size={20} />
                    <Box>
                      {option.fiat_currency}
                    </Box>
                  </Stack>
                </Box>
              </>
            )}
            renderInput={(params) => (
              <TextField  {...params} placeholder={`${intl.formatMessage({ id: "choose-currency" })}`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <InputAdornment position="start">
                    <ColorFiatIcon name={selectFiatCurrency} size={20} />
                  </InputAdornment>
                }}


              />
            )}
          />
          {/* <TextField
            id="outlined-textarea"
            placeholder="Please choose deposit currency"
            size="small"
            fullWidth
            multiline
          /> */}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="amount" /></Typography>


          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-deposit-amount" })}`}
            size="small"
            sx={{ flex: 35 }}
            multiline
          />

        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}></Typography>

          <ColorButton sx={{ flex: 35 }} variant="contained"><FormattedMessage id="deposit" /></ColorButton>
        </Stack>
        <Typography variant="body1" sx={{ color: '#64605f', pt: 4 }}><FormattedMessage id="deposit-fiat-foot" /></Typography>
      </Stack>




    </Grid>
  )
}

export default DepositList