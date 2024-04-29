import { Autocomplete, Box, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import ColorFiatIcon from "assets/icons/color/fiat";

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

interface DataTypeFiatCurrency {
  fiat_currency: string;
}

const Transfer = () => {

  const intl = useIntl()

  const [selectFiatCurrency, setSelectFiatCurrency] = React.useState('')
  const tran_rows: DataTypeFiatCurrency[] = [
    { fiat_currency: 'USD' },
    { fiat_currency: 'EUR' },
    { fiat_currency: 'JPY' },
    { fiat_currency: 'GBP' },

  ];

  console.log(selectFiatCurrency)


  const SelectFiatCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectFiatCurrency(value)
  }
  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 5 }}>From</Typography>

          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "select-acc" })}`}
            size="small"
            sx={{ flex: 37 }}
            multiline
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 5 }}>To</Typography>


          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "select-acc" })}`}
            size="small"
            sx={{ flex: 37 }}
            multiline
          />

        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 5 }}><FormattedMessage id="currency" /></Typography>


          <Autocomplete
            id="country-select-demo"
            options={tran_rows}
            sx={{ flex: 37 }}
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
              <TextField  {...params} placeholder={`${intl.formatMessage({ id: "select-currency" })}`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <InputAdornment position="start">
                    <ColorFiatIcon name={selectFiatCurrency} size={20} />
                  </InputAdornment>
                }}


              />
            )}
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 5 }}><FormattedMessage id="quantity" /></Typography>


          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-quantity" })}`}
            size="small"
            sx={{ flex: 37 }}
            multiline
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 5 }}></Typography>

          <ColorButton sx={{ flex: 37 }} variant="contained"><FormattedMessage id="submit" /></ColorButton>

        </Stack>
      </Stack>




    </Grid>
  )
}

export default Transfer