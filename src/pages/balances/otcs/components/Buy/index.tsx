import { Autocomplete, Box, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"


import React from "react";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage, useIntl } from "react-intl";
import CryptoColorIcon from "assets/icons/color/crypto";
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

interface DataTypeCryptoCurrency {
  crypto_currency: string;
}

const Buy = () => {

  const [selectCryptoCurrency, setSelectCryptoCurrency] = React.useState('')
  const tran_rows: DataTypeCryptoCurrency[] = [
    { crypto_currency: 'BTC' },
    { crypto_currency: 'ETH' },
    { crypto_currency: 'DAI' },
    { crypto_currency: 'USDT' },
    { crypto_currency: 'USDC' },
    { crypto_currency: 'BNB' },
    { crypto_currency: 'SOL' },
    { crypto_currency: 'XRP' }

  ];

  console.log(selectCryptoCurrency)


  const SelectCryptoCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectCryptoCurrency(value)
  }


  const [selectFiatCurrency, setSelectFiatCurrency] = React.useState('')
  const piat_rows: DataTypeFiatCurrency[] = [
    { fiat_currency: 'USD' },
    { fiat_currency: 'EUR' },
    { fiat_currency: 'JPY' },
    { fiat_currency: 'GBP' },

  ];

  console.log(selectFiatCurrency)


  const SelectFiatCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectFiatCurrency(value)
  }

  const intl = useIntl()
  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2} sx={{ width: '30%', alignItems: 'center', justifyContent: 'start' }}>
            <Typography variant="h6" sx={{ color: '#64605f', width: '100%' }}><FormattedMessage id="buy" /></Typography>
            {/* <Grid sx={{ width: 200 }}> */}
            <TextField
              id="outlined-textarea"
              placeholder={`${intl.formatMessage({ id: "amount" })}`}
              size="small"
              fullWidth
              multiline
            />
            {/* </Grid> */}
          </Stack>
          <Stack spacing={2} sx={{ width: '30%', alignItems: 'center', justifyContent: 'start' }}>
            <Typography variant="h6" sx={{ color: '#64605f', width: '100%' }}><FormattedMessage id="crypto" /></Typography>
            {/* <Grid sx={{ width: 200 }}>
              <TextField
                id="outlined-textarea"
                placeholder="Select Currency"
                size="small"
                fullWidth
                multiline
              />
            </Grid> */}
            <Autocomplete
              id="country-select-demo"
              options={tran_rows}
              fullWidth
              autoHighlight
              size="small"
              onInputChange={SelectCryptoCurrency}
              getOptionLabel={(option) => option.crypto_currency}
              renderOption={(props, option) => (
                <>
                  <Box component="li" {...props}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                      <CryptoColorIcon name={option.crypto_currency} size={20} />
                      <Box>
                        {option.crypto_currency}
                      </Box>
                    </Stack>


                  </Box>
                </>
              )}
              renderInput={(params) => (
                <TextField  {...params} placeholder={`${intl.formatMessage({ id: "select-crypto-currency" })}`}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <InputAdornment position="start">
                      <CryptoColorIcon name={selectCryptoCurrency} size={20} />
                    </InputAdornment>
                  }}



                />
              )}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2} sx={{ width: '30%', alignItems: 'center', justifyContent: 'start' }}>
            <Typography variant="h6" sx={{ color: '#64605f', width: '100%' }}><FormattedMessage id="pay" /></Typography>
            {/* <Grid sx={{ width: 200 }}> */}
            <TextField
              id="outlined-textarea"
              placeholder={`${intl.formatMessage({ id: "amount" })}`}
              size="small"
              fullWidth
              multiline
            />
            {/* </Grid> */}
          </Stack>
          <Stack spacing={2} sx={{ width: '30%', alignItems: 'center', justifyContent: 'start' }}>
            <Typography variant="h6" sx={{ color: '#64605f', width: '100%' }}><FormattedMessage id="fiat" /></Typography>
            <Autocomplete
              id="country-select-demo"
              options={piat_rows}
              fullWidth
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
            {/* <Grid sx={{ width: 200 }}> */}
            {/* <TextField
              id="outlined-textarea"
              placeholder="Select Currency"
              size="small"
              fullWidth
              multiline
            /> */}
            {/* </Grid> */}

          </Stack>

        </Stack>

        <Stack sx={{ justifyContent: 'left', width: '61%' }}>
          <Typography variant="body1" sx={{ color: '#64605f' }}><FormattedMessage id="buy-foot" /></Typography>
        </Stack>

        <ColorButton sx={{ width: '30%' }} variant="contained"><FormattedMessage id="get-quote" /></ColorButton>

        {/* <Stack sx={{ justifyContent: 'center', width: '50%' }}>
          
        </Stack> */}
      </Stack>
    </Grid>
  )
}

export default Buy