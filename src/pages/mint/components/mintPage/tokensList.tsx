import { Box, Skeleton, Stack, Typography } from '@mui/material';
// import exchange from 'assets/images/Exchange.png'
import TokenColorIcon from 'assets/tokens';


type DataProps = {
  data: any[];
  inputNum?: string;
  name: string;
  windowWidth: number
}

function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    // console.log(decimalPart)

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {

        // num *= (10 ** (i + 4))
        // console.log(num)
        // num = Math.round(num)
        // console.log(num)
        // num /= (10 ** (i + 4))
        // console.log(num)
        // console.log(num.toFixed(i + 4))
        // num = Number(num.toFixed(i + 4))
        var parts = num.toFixed(i + 4).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");



      }
    }
  } else {
    return num.toLocaleString()

  }
}


// function ChangeNumber(num: number) {

//   if (num % 1 !== 0) {
//     num *= 100000000
//     num = Math.round(num)
//     num /= 100000000
//     var parts = num.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
//   } else {
//     return num.toLocaleString()

//   }
// }


// const ShowButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: '#1AAE70',
//   boxShadow: 'none',
//   fontSize: '0.7rem',
//   fontWeight: 700,
//   '&:hover': {
//     backgroundColor: "transparent",
//     color: '#1aae70',
//   },
//   '&:active': {
//     boxShadow: 'none',
//     backgroundColor: "transparent",

//   },
// }));




export default function TokensList({ data, inputNum, name, windowWidth }: DataProps) {



  // let nf = new Intl.NumberFormat('en-US')



  return (
    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%', p: '10px 16px', display: inputNum !== '' && inputNum !== "0" ? 'block' : 'none' }}>
            {
              data.length == 0 ? (
                <Skeleton variant="rectangular" width='100%' height='20px' sx={{ borderRadius: '20px' }} />
              ) : (
                <Box>
                  <Typography sx={{ color: '#9b9b9b', fontSize: '12px' }}>
                    To mint one H20 token, you need to deposit the <span style={{ color: '#1AAE70' }}>{data.length}</span> constituent tokens in set ratios.
                  </Typography>
                  <Box>
                    {
                      data.map((item, index) => {
                        return (
                          <>
                            <Stack direction="row" justifyContent="space-between" sx={{ pt: '8px' }}>

                              <Stack flex={1}>
                                {
                                  index == 0 ? (
                                    <Stack direction="row" spacing={2} pb="6px">
                                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                                        #
                                      </Typography>
                                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                                        Token
                                      </Typography>
                                    </Stack>
                                  ) : null
                                }
                                <Stack direction="row" alignItems="center" spacing="4px">
                                  <TokenColorIcon name={item.symbol.split('-')[0]} size={22} />
                                  <Typography sx={{ color: "#000", fontSize: '11px', fontWeight: 600 }}>
                                    {item.symbol.split('-')[0]}
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Stack alignItems="end" width="40%">
                                {
                                  index == 0 ? (
                                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                      My balance
                                    </Typography>
                                  ) : null
                                }
                                <Typography sx={{ color: "#000", fontSize: '11px', fontWeight: 600 }}>
                                  {formatNumber(Number(item.balance))}
                                </Typography>
                              </Stack>
                              <Stack alignItems="end" width="40%">
                                {
                                  index == 0 ? (
                                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                      Requires
                                    </Typography>
                                  ) : null
                                }
                                <Stack direction="row" spacing="4px">
                                  <Typography sx={{ color: Number(item.balance) >= Number(Number(item.num)) * Number(inputNum) ? "#000" : '#ee3354', fontSize: '12px', fontWeight: 600 }}>
                                    {String(formatNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                                  </Typography>

                                </Stack>

                              </Stack>






                            </Stack>
                          </>
                        )
                      })
                    }

                  </Box>

                </Box>

              )
            }



          </Box>
        ) : (
          <Box sx={{ width: '100%', p: '2px', display: inputNum !== '' && inputNum !== "0" ? 'block' : 'none' }}>
            {
              data.length == 0 ? (
                <Skeleton variant="rectangular" width='100%' height='20px' sx={{ borderRadius: '20px' }} />
              ) : (
                <Box>
                  <Typography sx={{ color: '#9b9b9b', fontSize: '11px' }}>
                    To mint one H20 token, you need to deposit the <span style={{ color: '#1AAE70' }}>{data.length}</span> constituent tokens in set ratios.
                  </Typography>
                  <Box>
                    {
                      data.map((item, index) => {
                        return (
                          <>
                            <Stack direction="row" justifyContent="space-between" sx={{ pt: '8px' }}>

                              <Stack flex={1}>
                                {
                                  index == 0 ? (
                                    <Stack direction="row" spacing={2} pb="6px">
                                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                                        #
                                      </Typography>
                                      <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600 }} color="#979797">
                                        Token
                                      </Typography>
                                    </Stack>
                                  ) : null
                                }
                                <Stack direction="row" alignItems="center" spacing="2px">
                                  <TokenColorIcon name={item.symbol.split('-')[0]} size={22} />
                                  <Typography sx={{ color: '#000', fontSize: '10px', fontWeight: 600 }}>
                                    {item.symbol.split('-')[0]}
                                  </Typography>
                                </Stack>
                              </Stack>
                              <Stack alignItems="end" width="40%">
                                {
                                  index == 0 ? (
                                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                      My balance
                                    </Typography>
                                  ) : null
                                }
                                <Typography sx={{ color: '#000', fontSize: '10px', fontWeight: 600 }}>
                                  {formatNumber(Number(item.balance))}
                                </Typography>
                              </Stack>
                              <Stack alignItems="end" width="40%">
                                {
                                  index == 0 ? (
                                    <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                      Requires
                                    </Typography>
                                  ) : null
                                }
                                <Stack direction="row" spacing="2px">
                                  <Typography sx={{ color: Number(item.balance) >= Number(Number(item.num)) * Number(inputNum) ? "#000" : '#ee3354', fontSize: '10px', fontWeight: 600 }}>
                                    {String(formatNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                                  </Typography>

                                </Stack>

                              </Stack>






                            </Stack>
                          </>
                        )
                      })
                    }

                  </Box>

                </Box>

              )
            }


          </Box>
        )
      }
    </>

  );
}
