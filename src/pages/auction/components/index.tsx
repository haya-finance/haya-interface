

// material-ui
import { Box, ButtonGroup, ButtonGroupProps, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import titlePng from 'assets/actionImg/title.png'
import { useState } from 'react';

// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //

type PropsType = {
  windowWidth: number
}


const WorkButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1b1b1b',
  padding: '10px 20px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#1b1b1b',
    color: '#fff',
  },
}));



const CusButtonGroup = styled(ButtonGroup)<ButtonGroupProps>(({ theme }) => ({
  color: '#000',
  backgroundColor: '#767680',
  padding: '10px 20px',
  borderRadius: '10px',
  border: 0,
  '&:hover': {
    backgroundColor: '#fff',
    color: '#000',
  },
}));
const ActionPage = ({ windowWidth }: PropsType) => {
  const [value, setValue] = useState(0)

  const OnCheckTitel = (v: number) => {
    setValue(v)

  }



  return (
    <>
      <Container sx={{ backgroundColor: '#f6f6f6', width: '100%' }}>
        <Box sx={{ paddingTop: windowWidth >= 600 ? '70px' : '80px' }}>

          <Stack direction="row" alignItems='start' justifyContent='space-evenly' spacing="2px" padding="0 24px" >
            <Stack alignItems="start" justifyContent="center" spacing="32px" height="290px" width="65%">
              <Typography variant="body1" sx={{ color: '#000', fontWeight: 700, fontSize: '60px', lineHeight: '60px' }}  >
                What is an <span style={{ color: '#1aae70' }}>Auction</span>?
              </Typography>
              <Typography variant="body1" sx={{ color: '#6f6f6f', fontWeight: 600, fontSize: '21px', lineHeight: '28px' }}  >
                Lorem ipsum dolor sit amet consectetur.Malesuada dictumst nunc egestas elementum.Egetauge urna laoreet facilisis.
              </Typography>
              <WorkButton>How it work?</WorkButton>
            </Stack>
            <Box flex={1} textAlign="right">
              <img
                style={{ width: '290px' }}
                src={titlePng}
                loading="lazy"
              />
            </Box>

          </Stack>

          {
            windowWidth >= 600 ? (
              <Stack direction="row" justifyContent="space-between" width="100%" mb={1} padding="10px 24px">
                <Stack direction="row" spacing="8px">
                  <Box sx={value == 0 ? ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#000', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0, padding: '10px 20px' }) : ({ p: '0 0.7rem', backgroundColor: 'transparent', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    {`Active & Upcoming`}
                  </Box>
                  <Box sx={value == 1 ? ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#000', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0, padding: '10px 20px' }) : ({ p: '0 0.7rem', backgroundColor: 'transparent', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    {`Past`}
                  </Box>
                </Stack>
                <Box>
                  <CusButtonGroup>

                  </CusButtonGroup>


                </Box>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={value == 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    {`Active & Upcoming`}
                  </Box>
                  <Box sx={value == 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    {`Past`}
                  </Box>
                </Stack>
                <Box>

                </Box>
              </Stack>
            )
          }
          {
            value == 0 ? (
              <Box sx={{ width: '100%' }}>
              </Box>
            ) : (
              <></>
            )
          }
        </Box>
      </Container>

    </>
  );
};

export default ActionPage;
