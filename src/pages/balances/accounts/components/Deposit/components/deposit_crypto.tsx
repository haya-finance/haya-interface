import { Autocomplete, Box, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CryptoColorIcon from 'assets/icons/color/crypto';
import NetworkIcon from 'assets/icons/color/network';

interface DataTypeCryptoCurrency {
  crypto_currency: string;
}
interface DataTypeCryptoNetwork {
  crypto_network: string;
}

const DepositCrypto = () => {
  const [selectCryptoCurrency, setSelectCryptoCurrency] = React.useState('');

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

  const intl = useIntl();

  const SelectCryptoCurrency = (_event: React.SyntheticEvent, value: string) => {
    setSelectCryptoCurrency(value);
  };

  const [selectCryptoNetwork, setSelectCryptoNetwork] = React.useState('');
  const network_rows: DataTypeCryptoNetwork[] = [{ crypto_network: 'Ethereum' }, { crypto_network: 'BNB chain' }];



  const SelectCryptoNetwork = (_event: React.SyntheticEvent, value: string) => {
    setSelectCryptoNetwork(value);
  };
  return (
    <Grid container sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}>
            <FormattedMessage id="crypto" />
          </Typography>
          <Autocomplete
            id="country-select-demo"
            options={tran_rows}
            sx={{ flex: 35 }}
            size="small"
            autoHighlight
            onInputChange={SelectCryptoCurrency}
            getOptionLabel={(option) => option.crypto_currency}
            renderOption={(props, option) => (
              <>
                <Box component="li" {...props}>
                  {/* <img
                    loading="lazy"
                    width="20"
                    src={option.img}
                    alt=""
                  /> */}

                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'start' }}>
                    <CryptoColorIcon name={option.crypto_currency} size={20} />

                    <Box>{option.crypto_currency}</Box>
                  </Stack>
                </Box>
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={`${intl.formatMessage({ id: 'choose-deposit-cryptocurrency' })}`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CryptoColorIcon name={selectCryptoCurrency} size={20} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {/* <TextField
            id="outlined-textarea"
            placeholder="Please choose deposit cryptocurrency"
            size="small"
            fullWidth
            multiline
          /> */}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: '#64605f', textAlign: 'center', flex: 6 }}>
            <FormattedMessage id="network" />
          </Typography>
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
                <Box component="li" {...props}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'start' }}>
                    <NetworkIcon name={option.crypto_network} size={20} />

                    <Box>{option.crypto_network}</Box>
                  </Stack>
                </Box>
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={`${intl.formatMessage({ id: 'choose-network' })}`}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <NetworkIcon name={selectCryptoNetwork} size={20} />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          {/* <TextField
            id="outlined-textarea"
            placeholder="Please choose network"
            size="small"
            fullWidth
            multiline
          /> */}
        </Stack>
        <Typography variant="body1" sx={{ color: '#64605f', pt: 4 }}>
          <FormattedMessage id="deposit-foot" />
        </Typography>
      </Stack>
    </Grid>
  );
};

export default DepositCrypto;
