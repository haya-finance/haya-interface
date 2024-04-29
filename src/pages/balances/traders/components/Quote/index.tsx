import { Autocomplete, Box, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import React from "react";
import { MdSwapVerticalCircle } from 'react-icons/md'
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage } from "react-intl";
import CryptoColorIcon from "assets/icons/color/crypto";

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#60d937',
  fontSize: 16,
  padding: '6px 12px',
  border: '0px ',
  lineHeight: 1.5,
  '&:hover': {
    backgroundColor: '#00ff00',
    opacity: 1,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    // backgroundColor: '#fcd031'
  },
  '&:focus': {
    boxShadow: 'none',
    // backgroundColor: '#fcd031',
  },
  '&:after': {
    boxShadow: '0 0 5px 5px rgba(96, 217, 55, 0.9)'
  }
}));

interface DataTypeCryptoCurrency {
  crypto_currency: string;
}

const Quote = () => {



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

  const [buyToken, setBuyToken] = React.useState(tran_rows[0]);


  const [sellToken, setSellToken] = React.useState(tran_rows[3]);


  const handleBuyChange = (_event: React.SyntheticEvent, value: DataTypeCryptoCurrency) => {
    setBuyToken(value);
  };

  const handleSellChange = (_event: React.SyntheticEvent, value: DataTypeCryptoCurrency) => {
    setSellToken(value);
  };


  const OnSwap = () => {
    const buyTokens = buyToken
    setBuyToken(sellToken)
    setSellToken(buyTokens)
  }
  return (
    <>
      <Grid container sx={{ width: '100%' }}>

        <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <Stack spacing={0.5} sx={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" sx={{ width: "100%", alignItems: 'center', justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: '#64605f' }}>Sell Token</Typography>
              <Typography variant="body2" sx={{ color: '#64605f' }}>Total Balance: $0.00</Typography>
            </Stack>

            <TextField variant="outlined" placeholder="0.00" sx={{ backgroundColor: '#f4f4f4', width: '100%' }} InputProps={{
              endAdornment: <InputAdornment position="end">
                <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#fefefe', borderRadius: 20 }} size="small">
                  <Autocomplete
                    id="country-select-demo"
                    options={tran_rows}
                    disableClearable
                    size="small"
                    autoHighlight
                    value={buyToken}
                    onChange={handleBuyChange}
                    getOptionLabel={(option) => option.crypto_currency}
                    renderOption={(props, option) => (
                      <>
                        <Box component="li" sx={{ '& > img': { flexShrink: 0 } }} {...props}>
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
                      <TextField  {...params} InputProps={{
                        ...params.InputProps,
                        startAdornment: <InputAdornment position="start">
                          <CryptoColorIcon name={buyToken.crypto_currency} size={20} />
                        </InputAdornment>
                      }} />
                    )}
                  />
                </FormControl>
              </InputAdornment>
            }} />


          </Stack>
          <IconButton aria-label="Example" onClick={OnSwap}>
            <MdSwapVerticalCircle color="#9096a1" size={30} />

          </IconButton>




          <Stack spacing={0.5} sx={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" sx={{ width: '100%', justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: '#64605f' }}>Buy Token</Typography>
              <Typography variant="body2" sx={{ color: '#64605f' }}>Total Balance: $0.00</Typography>
            </Stack>
            <TextField variant="outlined" placeholder="0.00" sx={{ backgroundColor: '#f4f4f4', width: '100%' }} InputProps={{
              endAdornment: <InputAdornment position="end">
                <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: '#fefefe', borderRadius: 20 }} size="small">
                  <Autocomplete
                    id="country-select-demo"
                    options={tran_rows}
                    size="small"
                    autoHighlight
                    disableClearable
                    value={sellToken}
                    onChange={handleSellChange}
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
                      <TextField  {...params} InputProps={{
                        ...params.InputProps,
                        startAdornment: <InputAdornment position="start">
                          <CryptoColorIcon name={sellToken.crypto_currency} size={20} />
                        </InputAdornment>
                      }} />
                    )}
                  />
                </FormControl>
              </InputAdornment>
            }} />




          </Stack>


          <Stack direction="row" sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Grid sx={{ width: '33.5%' }}> */}
            <Stack spacing={0.5} sx={{ width: '100%' }}>
              <ColorButton sx={{ flex: 1 }} variant="contained"><FormattedMessage id="request-quote" /></ColorButton>
            </Stack>



            {/* </Grid> */}
          </Stack>

        </Stack>




      </Grid>
    </>
  )
}

export default Quote