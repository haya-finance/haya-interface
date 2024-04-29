import { Autocomplete, Box, Divider, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"


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

const WithdrawFiat = () => {

  const [selectFiatCurrency, setSelectFiatCurrency] = React.useState('')
  const tran_rows: DataTypeFiatCurrency[] = [
    { fiat_currency: 'USD' },
    { fiat_currency: 'EUR' },
    { fiat_currency: 'JPY' },
    { fiat_currency: 'GBP' },

  ];

  const intl = useIntl()

  console.log(selectFiatCurrency)


  const SelectFiatCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectFiatCurrency(value)
  }
  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="currency" /></Typography>


          <Autocomplete
            id="country-select-demo"
            options={tran_rows}
            size='small'
            // fullWidth
            sx={{ flex: 35 }}
            autoHighlight
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
              <TextField  {...params} placeholder={`${intl.formatMessage({ id: "choose-with-fiat-currency" })}`}

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
              placeholder="Please choose Withdraw currency"
              size="small"
              fullWidth
              multiline
            /> */}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="amount" /></Typography>

          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-withdraw-amount" })}`}
            size="small"
            // fullWidth
            sx={{ flex: 35 }}
            multiline
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="bank-account" /></Typography>

          <Stack sx={{ flex: 35, alignItems: 'end' }}>
            <Button variant="outlined" disabled size='small' sx={{ width: '50%' }}>
              <FormattedMessage id="choose-bank-acc" />
            </Button>
          </Stack>
          {/* <TextField
              id="outlined-textarea"
              placeholder="Choose from saved accounts"
              size="small"
              fullWidth
              multiline
            /> */}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="bank" /></Typography>

          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-bank" })}`}
            size="small"
            // fullWidth
            sx={{ flex: 35 }}
            multiline
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="swift-code" /></Typography>

          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-swift-code" })}`}
            size="small"
            // fullWidth
            sx={{ flex: 35 }}
            multiline
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="acc-name" /></Typography>

          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-acc-name" })}`}
            size="small"
            // fullWidth
            sx={{ flex: 35 }}
            multiline
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}></Typography>
          <ColorButton sx={{ flex: 35 }} variant="contained"><FormattedMessage id="submit" /></ColorButton>

          {/* <Button variant="contained" sx={{ width: '90%' }}>Submit</Button> */}
        </Stack>
      </Stack>




    </Grid>
  )
}

export default WithdrawFiat