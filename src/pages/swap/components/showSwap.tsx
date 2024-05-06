import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import React from 'react';
import exchange from 'assets/images/Exchange.png'
import { UniswapSepoliaRouterContract } from 'config';


type DataProps = {
  toToken: string,
  fromToken: string,
  windowWeight: number,
  oneSwap: string
}




const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  border: 'none',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));



export default function ShowSwap({ toToken, fromToken, windowWeight, oneSwap }: DataProps) {

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">


      <Stack direction="row" alignItems="center" spacing={1} flex={1}>
        <img style={{ width: 22, height: 22 }} src={exchange} />
        <Box sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
          <Stack direction="row" sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
            <Typography sx={{ display: 'inline' }}>{`1 ${toToken} = ${oneSwap} ${fromToken}`} </Typography>
            {/* <Typography sx={{ display: 'inline', color: '#9b9b9b', fontSize: '12px' }}>{`($3513.18)`}</Typography> */}

          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} >
        <Typography>Uniswap</Typography>
        <MuiAccordionSummary
          sx={{ padding: 0 }}
          expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.8rem' }} />}
          {...props}
        />
      </Stack>
    </Stack>
  ))(({ theme }) => ({
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    }
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 0,
    borderTop: 'none',
    paddingBottom: '30px'
  }));


  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Box sx={{ width: '100%' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mr: 2 }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                Max Slippage
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                0.5%
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mr: 2 }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                Contract
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                {UniswapSepoliaRouterContract.slice(0, 6)}...{UniswapSepoliaRouterContract.slice(-4)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mr: 2 }} >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: '#9B9B9B', fontSize: '12px' }}>
                Offered from
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                Uniswap_v2
              </Typography>
            </Stack>
          </Stack>


        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
