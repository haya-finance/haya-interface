import { Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import WithdrawCrypto from "./components/withdraw_crypto"
import WithdrawFiat from "./components/withdraw_fiat"
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { FormattedMessage } from 'react-intl'


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
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  '&:focus': {
    boxShadow: 'none',
  },
}));


const Withdraws = () => {
  const [withdraw_fiat, setWithdraw_fiat] = useState(false)

  const [withdraw_crypto, setWithdraw_crypto] = useState(false)
  const [hide, setHide] = useState('block')

  const GoWithdrawList = () => {
    setWithdraw_fiat(true)
    setHide('none')
  }

  const GoWithdrawCrypto = () => {
    setWithdraw_crypto(true)
    setHide('none')
  }

  const GoBack = () => {
    setHide('block')
    setWithdraw_crypto(false)
    setWithdraw_fiat(false)
  }

  useEffect(() => {


  }, [withdraw_fiat])

  useEffect(() => {


  }, [withdraw_crypto])

  useEffect(() => {


  }, [hide])


  return (
    <Grid container>
      <Grid sx={{ width: '100%', display: hide }}>
        <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
          <ColorButton variant="contained" onClick={GoWithdrawList} sx={{ alignItems: 'center', width: '30%', }}><FormattedMessage id="withdraw-fiat" /></ColorButton>
          <ColorButton variant="contained" onClick={GoWithdrawCrypto} sx={{ alignItems: 'center', width: '30%', }}><FormattedMessage id="withdraw-crypto" /></ColorButton>
          {/* <Button variant="outlined" onClick={GoWithdrawList} sx={{ alignItems: 'center', width: '21%' }}>Withdraw Fiat</Button>
          <Button variant="outlined" onClick={GoWithdrawCrypto} sx={{ alignItems: 'center', width: '21%' }}>Withdraw Crypto</Button> */}
        </Stack>
      </Grid>
      {
        withdraw_fiat == true ? (
          <>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Typography
                component={Link}
                to='#'
                color="InfoText"
                variant="h6"
                display="initial"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
                onClick={GoBack}

              >
                <FormattedMessage id="withdraw-fiat-back" />
              </Typography>
              <WithdrawFiat />
            </Stack>
          </>
        ) : (
          <></>
        )
      }

      {
        withdraw_crypto == true ? (
          <>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Typography
                component={Link}
                to='#'
                color="InfoText"
                variant="h6"
                display="initial"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
                onClick={GoBack}

              >
                <FormattedMessage id="withdraw-crypto-currency-back" />
              </Typography>
              <WithdrawCrypto />
            </Stack>
          </>
        ) : (
          <></>
        )
      }
    </Grid>

  )
}

export default Withdraws

