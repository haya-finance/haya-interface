

// material-ui
import { Box, Stack, Typography } from '@mui/material';
import TokenColorIcon from 'assets/tokens';
import { useEffect } from 'react';




// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //


interface DataType {
  key: string;
  name: string;
  num: string;
  color: string
}


const data: DataType[] = [
  {
    key: '1',
    name: 'BTC',
    num: '25.00%',
    color: '#F7931a'
  },
  {
    key: '2',
    name: 'ETH',
    num: '25.00%',
    color: '#627eea'
  },
  {
    key: '3',
    name: 'BNB',
    num: '13.33%',
    color: '#f3ba2f'
  },
  {
    key: '4',
    name: 'SOL',
    num: '12.00%',
    color: '#8d4ef7'
  },
  {
    key: '5',
    name: 'DOGE',
    num: '3.38%',
    color: '#fff'
  },
  {
    key: '6',
    name: 'TON',
    num: '3.41%',
    color: '#fff'
  },
  {
    key: '7',
    name: 'ADA',
    num: '2.62%',
    color: '#fff'
  },
  {
    key: '8',
    name: 'SHIB',
    num: '2.21%',
    color: '#fff'
  },
  {
    key: '9',
    name: 'AVAX',
    num: '2.14%',
    color: '#fff'
  },
  {
    key: '10',
    name: 'TRX',
    num: '1.79%',
    color: '#fff'
  },
  {
    key: '11',
    name: 'DOT',
    num: '1.57%',
    color: '#fff'
  },
  {
    key: '12',
    name: 'LINK',
    num: '1.53%',
    color: '#fff'
  },
  {
    key: '13',
    name: 'NEAR',
    num: '1.32%',
    color: '#fff'
  },
  {
    key: '14',
    name: 'MATIC',
    num: '1.06%',
    color: '#fff'
  },
  {
    key: '15',
    name: 'LTC',
    num: '0.96%',
    color: '#fff'
  },
  {
    key: '16',
    name: 'UNI',
    num: '0.72%',
    color: '#fff'
  },
  {
    key: '17',
    name: 'RNDR',
    num: '0.61%',
    color: '#fff'
  },
  {
    key: '18',
    name: 'APT',
    num: '0.55%',
    color: '#fff'
  },
  {
    key: '19',
    name: 'FIL',
    num: '0.48%',
    color: '#fff'
  },
  {
    key: '20',
    name: 'ARB',
    num: '0.41%',
    color: '#fff'
  },
];

type TypeProps = {
  windowWidth: number
}

const Methodology = ({ windowWidth }: TypeProps) => {
  useEffect(() => {

  }, [windowWidth])

  return (

    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
            <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: '20px', mb: '20px', fontSize: '20px', mt: '60px' }}  >
              Methodology
            </Typography>
            <Box sx={{ height: '30px', width: '100%', backgroundColor: 'transparent', mb: '20px' }}>
              <Stack direction="row">
                <Box sx={{ backgroundColor: '#F7931A', width: '25%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#627EEA', width: '25%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#F3BA2F', width: '13.33%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#8D4EF7', width: '12%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#E9ECEA', flex: 1, height: '30px', borderRadius: '0 20px 20px 0' }}>

                </Box>


              </Stack>
            </Box>
            <Box sx={{ width: '100%' }} mb="60px">
              <Stack direction="row" width="100%" justifyContent="space-between" padding="0 20px" spacing="40px">
                <Stack spacing="20px" width="100%">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) <= 5 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>
                <Stack spacing="20px" width="100%">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 5 && Number(item.key) <= 10 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>
                <Stack spacing="20px" width="100%">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 10 && Number(item.key) <= 15 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>
                <Stack spacing="20px" width="100%">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 15 && Number(item.key) <= 20 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>



              </Stack>
            </Box>


          </Box>
        ) : (
          <>
            <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
              <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: '30px', mb: '10px', fontSize: '18px' }}  >
                Methodology
              </Typography>
              <Box sx={{ height: '30px', width: '100%', backgroundColor: 'transparent', mb: '20px' }}>
                <Stack direction="row">
                  <Box sx={{ backgroundColor: '#F7931A', width: '25%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#627EEA', width: '25%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#F3BA2F', width: '13.33%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#8D4EF7', width: '12%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#E9ECEA', flex: 1, height: '30px', borderRadius: '0 20px 20px 0' }}>

                  </Box>


                </Stack>
              </Box>
              <Box sx={{ width: '100%' }} mb="40px" padding="0 20px">
                {/* <Stack direction="row" width="100%" justifyContent="space-between" padding="0" spacing="20px"> */}
                <Stack spacing="10px" marginBottom="10px">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) <= 5 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>
                <Stack spacing="10px" marginBottom="10px">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 5 && Number(item.key) <= 10 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>




                {/* </Stack> */}
                {/* <Stack direction="row" width="100%" padding="0 " spacing="20px" marginTop="10px"> */}

                <Stack spacing="10px" marginBottom="10px">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 10 && Number(item.key) <= 15 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>
                <Stack spacing="10px" marginBottom="10px">
                  {
                    data.map((item) => {
                      return (
                        <>
                          {
                            Number(item.key) > 15 && Number(item.key) <= 20 ? (
                              <Stack direction="row" justifyContent="space-between">
                                <Stack direction="row" spacing="10px" alignItems="center">
                                  <TokenColorIcon name={item.name} size={32} />
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontSize: '15px', fontWeight: 600 }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="center" sx={{ color: '#9B9B9B', fontSize: '14px', fontWeight: 600 }}  >
                                    {item.num}
                                  </Typography>

                                </Stack>


                              </Stack>

                            ) : (
                              <></>
                            )
                          }
                        </>
                      )
                    })
                  }
                </Stack>



                {/* </Stack> */}
              </Box>


            </Box>
          </>
        )
      }
    </>
  );
};

export default Methodology;
