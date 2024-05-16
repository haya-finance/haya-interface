

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
    num: '25.13%',
    color: '#F7931a'
  },
  {
    key: '2',
    name: 'ETH',
    num: '24.16%',
    color: '#627eea'
  },
  {
    key: '3',
    name: 'BNB',
    num: '14.92%',
    color: '#f3ba2f'
  },
  {
    key: '4',
    name: 'SOL',
    num: '10.39%',
    color: '#8d4ef7'
  },
  {
    key: '5',
    name: 'DOGE',
    num: '3.56%',
    color: '#fff'
  },
  {
    key: '6',
    name: 'TON',
    num: '3.17%',
    color: '#fff'
  },
  {
    key: '7',
    name: 'ADA',
    num: '2.76%',
    color: '#fff'
  },
  {
    key: '8',
    name: 'SHIB',
    num: '2.40%',
    color: '#fff'
  },
  {
    key: '9',
    name: 'AVAX',
    num: '2.16%',
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
    num: '1.62%',
    color: '#fff'
  },
  {
    key: '12',
    name: 'LINK',
    num: '1.36%',
    color: '#fff'
  },
  {
    key: '13',
    name: 'NEAR',
    num: '1.26%',
    color: '#fff'
  },
  {
    key: '14',
    name: 'MATIC',
    num: '1.20%',
    color: '#fff'
  },
  {
    key: '15',
    name: 'LTC',
    num: '1.05%',
    color: '#fff'
  },
  {
    key: '16',
    name: 'UNI',
    num: '0.79%',
    color: '#fff'
  },
  {
    key: '17',
    name: 'RNDR',
    num: '0.51%',
    color: '#fff'
  },
  {
    key: '18',
    name: 'APT',
    num: '0.64%',
    color: '#fff'
  },
  {
    key: '19',
    name: 'FIL',
    num: '0.54%',
    color: '#fff'
  },
  {
    key: '20',
    name: 'ARB',
    num: '0.49%',
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
                <Box sx={{ backgroundColor: '#F7931A', width: '25.14%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#627EEA', width: '24.16%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#F3BA2F', width: '14.93%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#8D4EF7', width: '10.40%', height: '30px' }}>

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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                  <Box sx={{ backgroundColor: '#F7931A', width: '25.14%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#627EEA', width: '24.16%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#F3BA2F', width: '14.93%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#8D4EF7', width: '10.40%', height: '30px' }}>

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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px" alignItems="center">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
                                <Stack direction="row" spacing="10px">
                                  <TokenColorIcon name={item.name} size={20} />
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                    {item.name}
                                  </Typography>

                                </Stack>
                                <Stack direction="row" spacing="6px">
                                  <Box sx={{ width: '12px', height: '12px', backgroundColor: `${item.color}` }}>

                                  </Box>
                                  <Typography variant="body1" textAlign="start" sx={{ color: '#9B9B9B', fontSize: '12px' }}  >
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
