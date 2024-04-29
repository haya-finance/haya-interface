import { Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link } from 'react-router-dom';
import DepositCrypto from './components/deposit_crypto';
import DepositList from './components/deposit_list';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#fff',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#000',
  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: '#000'
  },
  '&:focus': {
    boxShadow: 'none'
  }
}));

const Deposit = () => {
  const [deposit_list, setDeposit_list] = useState(false);

  const [deposit_crypto, setDeposit_crypto] = useState(false);
  const [hide, setHide] = useState('block');

  const GoDepositList = () => {
    setDeposit_list(true);
    setHide('none');
  };

  const GoDepositCrypto = () => {
    setDeposit_crypto(true);
    setHide('none');
  };

  const GoBack = () => {
    setHide('block');
    setDeposit_crypto(false);
    setDeposit_list(false);
  };

  useEffect(() => { }, [deposit_list]);

  useEffect(() => { }, [hide]);

  return (
    <Grid container>
      <Grid sx={{ width: '100%', display: hide }}>
        <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          {/* <Typography variant="button" onClick={GoDepositList} sx={{ alignItems: 'center', width: '30%', borderColor: '#000' }}> </Typography> */}
          <ColorButton variant="contained" onClick={GoDepositList} sx={{ alignItems: 'center', width: '30%' }}>
            <FormattedMessage id="deposit-fiat" />
          </ColorButton>
          <ColorButton variant="contained" onClick={GoDepositCrypto} sx={{ alignItems: 'center', width: '30%' }}>
            <FormattedMessage id="deposit-crypto" />
          </ColorButton>
        </Stack>
      </Grid>
      {deposit_list == true ? (
        <>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography
              component={Link}
              to="#"
              color="InfoText"
              variant="h6"
              display="initial"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
              onClick={GoBack}
            >
              <FormattedMessage id="deposit-fiat-back" />
            </Typography>
            <DepositList />
          </Stack>
        </>
      ) : (
        <></>
      )}

      {deposit_crypto == true ? (
        <>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography
              component={Link}
              to="#"
              color="InfoText"
              variant="h6"
              display="initial"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
              onClick={GoBack}
            >
              <FormattedMessage id="deposit-crypto-currency-back" />
            </Typography>
            <DepositCrypto />
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Deposit;
