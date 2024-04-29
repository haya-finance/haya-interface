import { Autocomplete, Box, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"


import React from "react";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage, useIntl } from 'react-intl'
import CryptoColorIcon from "assets/icons/color/crypto";
import NetworkIcon from "assets/icons/color/network";

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

interface DataTypeCryptoCurrency {
  crypto_currency: string;
}

interface DataTypeCryptoNetwork {
  crypto_network: string;
}

const WithdrawCrypto = () => {

  const intl = useIntl()

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


  const [selectCryptoNetwork, setSelectCryptoNetwork] = React.useState('')
  const network_rows: DataTypeCryptoNetwork[] = [
    { crypto_network: 'Ethereum' },
    { crypto_network: 'BNB chain' },

  ];

  console.log(selectCryptoCurrency, selectCryptoNetwork)


  const SelectCryptoNetwork = (_event: React.SyntheticEvent, value: string) => {
    setSelectCryptoNetwork(value)
  }



  const SelectCryptoCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectCryptoCurrency(value)
  }
  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="crypto" /></Typography>

          <Autocomplete
            id="country-select-demo"
            options={tran_rows}
            sx={{ flex: 35 }}
            autoHighlight
            size="small"
            onInputChange={SelectCryptoCurrency}
            getOptionLabel={(option) => option.crypto_currency}
            renderOption={(props, option) => (
              <>
                <Box component="li"  {...props}>

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
              <TextField  {...params} placeholder={`${intl.formatMessage({ id: "choose-with-currency" })}`} />
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
            sx={{ flex: 35 }}
            multiline
          />

        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="address" /></Typography>


          {/* <TextField
            id="outlined-textarea"
            placeholder="Choose from address book"
            size="small"
            fullWidth
            multiline
          /> */}

          <Stack sx={{ flex: 35, justifyContent: "end", alignItems: 'end' }}>
            <Button variant="outlined" disabled size="small" sx={{ width: '50%' }} >
              <FormattedMessage id="choose-address" />
            </Button>
          </Stack>

        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="address" /></Typography>


          <TextField
            id="outlined-textarea"
            placeholder={`${intl.formatMessage({ id: "input-address" })}`}
            size="small"
            sx={{ flex: 35 }}
            multiline
          />

        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}><FormattedMessage id="network" /></Typography>


          <Autocomplete
            id="country-select-demo"
            options={network_rows}
            sx={{ flex: 35 }}
            size="small"
            autoHighlight
            onInputChange={SelectCryptoNetwork}
            getOptionLabel={(option) => option.crypto_network}
            renderOption={(props, option) => (
              <>
                <Box component="li"  {...props}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                    <NetworkIcon name={option.crypto_network} size={20} />



                    <Box>
                      {option.crypto_network}
                    </Box>
                  </Stack>
                </Box>
              </>
            )}
            renderInput={(params) => (
              <TextField  {...params} placeholder={`${intl.formatMessage({ id: "choose-network" })}`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <InputAdornment position="start">
                    <NetworkIcon name={selectCryptoNetwork} size={20} />
                  </InputAdornment>
                }}
              />
            )}
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

export default WithdrawCrypto