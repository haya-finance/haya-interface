

// material-ui
import { Box, Stack, Typography } from '@mui/material';
import TokenColorIcon from 'assets/tokens';




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
    num: '64.52%',
    color: '#F7931a'
  },
  {
    key: '2',
    name: 'ETH',
    num: '64.52%',
    color: '#627eea'
  },
  {
    key: '3',
    name: 'BNB',
    num: '64.52%',
    color: '#f3ba2f'
  },
  {
    key: '4',
    name: 'SOL',
    num: '64.52%',
    color: '#8d4ef7'
  },
  {
    key: '5',
    name: 'DOGE',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '6',
    name: 'TON',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '7',
    name: 'ADA',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '8',
    name: 'SHIB',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '9',
    name: 'AVAX',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '10',
    name: 'TRX',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '11',
    name: 'DOT',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '12',
    name: 'LINK',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '13',
    name: 'NEAR',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '14',
    name: 'MATIC',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '15',
    name: 'LTC',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '16',
    name: 'UNI',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '17',
    name: 'RNDR',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '18',
    name: 'APT',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '19',
    name: 'FIL',
    num: '64.52%',
    color: '#fff'
  },
  {
    key: '20',
    name: 'ARB',
    num: '64.52%',
    color: '#fff'
  },
];

type TypeProps = {
  windowWidth: number
}

const Methodology = ({ windowWidth }: TypeProps) => {

  return (

    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
            <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: '20px', mb: '20px', fontSize: '18px' }}  >
              Methodology
            </Typography>
            <Box sx={{ height: '30px', width: '100%', backgroundColor: 'transparent', mb: '20px' }}>
              <Stack direction="row">
                <Box sx={{ backgroundColor: '#F7931A', width: '60%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#627EEA', width: '15%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#F3BA2F', width: '8%', height: '30px' }}>

                </Box>
                <Box sx={{ backgroundColor: '#8D4EF7', width: '3%', height: '30px' }}>

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
              <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: '10px', mb: '10px', fontSize: '16px' }}  >
                Methodology
              </Typography>
              <Box sx={{ height: '30px', width: '100%', backgroundColor: 'transparent', mb: '20px' }}>
                <Stack direction="row">
                  <Box sx={{ backgroundColor: '#F7931A', width: '60%', height: '30px', borderRadius: '20px 0 0 20px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#627EEA', width: '15%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#F3BA2F', width: '8%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#8D4EF7', width: '3%', height: '30px' }}>

                  </Box>
                  <Box sx={{ backgroundColor: '#E9ECEA', flex: 1, height: '30px', borderRadius: '0 20px 20px 0' }}>

                  </Box>


                </Stack>
              </Box>
              <Box sx={{ width: '100%' }} mb="40px">
                <Stack direction="row" width="100%" justifyContent="space-between" padding="0" spacing="20px">
                  <Stack spacing="10px" width="50%">
                    {
                      data.map((item) => {
                        return (
                          <>
                            {
                              Number(item.key) <= 5 ? (
                                <Stack direction="row" justifyContent="space-between">
                                  <Stack direction="row" spacing="5px">
                                    <TokenColorIcon name={item.name} size={20} />
                                    <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                      {item.name}
                                    </Typography>

                                  </Stack>
                                  <Stack direction="row" spacing="4px" alignItems="center">
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
                  <Stack spacing="10px" width="50%">
                    {
                      data.map((item) => {
                        return (
                          <>
                            {
                              Number(item.key) > 5 && Number(item.key) <= 10 ? (
                                <Stack direction="row" justifyContent="space-between">
                                  <Stack direction="row" spacing="5px">
                                    <TokenColorIcon name={item.name} size={20} />
                                    <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                      {item.name}
                                    </Typography>

                                  </Stack>
                                  <Stack direction="row" spacing="4px">
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
                <Stack direction="row" width="100%" padding="0 " spacing="20px" marginTop="10px">

                  <Stack spacing="10px" width="50%">
                    {
                      data.map((item) => {
                        return (
                          <>
                            {
                              Number(item.key) > 10 && Number(item.key) <= 15 ? (
                                <Stack direction="row" justifyContent="space-between">
                                  <Stack direction="row" spacing="5px">
                                    <TokenColorIcon name={item.name} size={20} />
                                    <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                      {item.name}
                                    </Typography>

                                  </Stack>
                                  <Stack direction="row" spacing="4px">
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
                  <Stack spacing="10px" width="50%">
                    {
                      data.map((item) => {
                        return (
                          <>
                            {
                              Number(item.key) > 15 && Number(item.key) <= 20 ? (
                                <Stack direction="row" justifyContent="space-between">
                                  <Stack direction="row" spacing="5px">
                                    <TokenColorIcon name={item.name} size={20} />
                                    <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontSize: '12px' }}  >
                                      {item.name}
                                    </Typography>

                                  </Stack>
                                  <Stack direction="row" spacing="4px">
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
          </>
        )
      }
    </>
  );
};

export default Methodology;
