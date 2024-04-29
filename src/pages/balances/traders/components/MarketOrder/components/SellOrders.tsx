import { Grid, InputAdornment, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { AiFillInfoCircle } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

type Props = {
  value: string
}

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: '#fff',
  '& .MuiToggleButton-root': {
    padding: '2px 10px',
    fontSize: '0.800rem',

    '&.Mui-selected': {
      backgroundColor: '#60d937',
      color: '#000',
      '&:hover': {
        backgroundColor: '#60d937',
      }
    },
    '&:hover': {
      backgroundColor: '#60d937',

    },


  },
  '& .MuiToggleButtonGroup-grouped': {
    // margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderWidth: '0px',
    padding: '15px 12px 15px ',
    fontSize: '0.800rem',
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
      borderWidth: '0px'
    },
    '&:before': {
      borderWidth: '0px'
    },
    '&:after': {
      borderWidth: '0px'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderWidth: '0px'

    },
    // '& input:valid + fieldset': {
    //   borderColor: '#E0E3E7',
    //   borderWidth: 1,
    // },
    // '& input:invalid + fieldset': {
    //   borderColor: 'red',
    //   borderWidth: 1,
    // },
    // '& input:valid:focus + fieldset': {
    //   borderLeftWidth: 4,
    //   padding: '4px !important', // override inline-style
    // },
  },
}));

const PriceTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderWidth: '0px',
    padding: '10px 12px 10px ',
    fontSize: '0.800rem',
    '&.Mui-disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',

    },
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
      borderWidth: '0px'
    },
    '&:before': {
      borderWidth: '0px'
    },
    '&:after': {
      borderWidth: '0px'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderWidth: '0px'
    },
    // '& input:valid + fieldset': {
    //   borderColor: '#E0E3E7',
    //   borderWidth: 1,
    // },
    // '& input:invalid + fieldset': {
    //   borderColor: 'red',
    //   borderWidth: 1,
    // },
    // '& input:valid:focus + fieldset': {
    //   borderLeftWidth: 4,
    //   padding: '4px !important', // override inline-style
    // },
  },
}));



const SellOrders = (props: Props) => {

  const [alignment, setAlignment] = React.useState('BTC');
  useEffect(() => {
    setAlignment(props.value)

  }, [props])

  useEffect(() => {

  }, [alignment])


  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  return (
    <>
      <Grid sx={{ width: '100%' }}>

        <Stack spacing={2} sx={{ width: '100%' }}>

          <RedditTextField
            fullWidth
            label={`Amount(${alignment})`}
            defaultValue="0.00"
            placeholder="0.00"
            id="filled-multiline-static"
            variant="filled"
            size="small"
            style={{ marginTop: 11 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <StyledToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  size="small"
                >
                  <ToggleButton value={props.value}>{props.value}</ToggleButton>
                  <ToggleButton value="USDT">USDT</ToggleButton>
                </StyledToggleButtonGroup>
              </InputAdornment>,


              // startAdornment: <InputAdornment position="start">
              //   ≈0.00 USDT &nbsp;&nbsp; <AiFillInfoCircle />
              // </InputAdornment>
            }}
          >
            <Typography variant="body2" sx={{ color: '#64605f', fontSize: 14, position: "absolute" }}>≈0.00 USDT &nbsp;&nbsp; <AiFillInfoCircle /></Typography>
          </RedditTextField>






          <PriceTextField
            fullWidth
            id="filled-multiline"
            multiline
            variant="filled"
            disabled
            placeholder="Optional"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                Limit Price (USDT)

              </InputAdornment>
            }}
          />

          <ColorButton variant="contained" sx={{ width: '100%' }}><FormattedMessage id="place-order" /></ColorButton>


          {/* <Stack direction="row" spacing={2} sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Grid sx={{ width: '33.5%' }}>

              

            </Grid>
          </Stack> */}

        </Stack>




      </Grid>
    </>
  )
}

export default SellOrders