import { Box, Stack, Typography } from '@mui/material';
import TokenColorIcon from 'assets/tokens';


type DataProps = {
  data: any[];
  inputNum?: string;
  windowWidth: number
}

function formatNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.floor(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");



      }
    }
  } else {
    return num.toLocaleString()

  }
}







export default function RedeemTokensList({ data, inputNum, windowWidth }: DataProps) {

  return (
    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%', p: "10px 16px", display: inputNum !== '' && inputNum !== "0" ? 'block' : 'none' }}>
            <Box>
              <Typography sx={{ color: '#9b9b9b', fontSize: '12px' }}>
                You receive the <span style={{ color: '#1AAE70' }}>{data.length}</span>  constituent tokens in set ratios when redeeming one H20 token.
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
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={20} />
                              <Typography sx={{ color: '#464646', fontSize: '11px' }}>
                                {item.symbol.split('-')[0]}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack alignItems="end" width="40%">
                            {
                              index == 0 ? (
                                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                  Receive
                                </Typography>
                              ) : null
                            }
                            <Stack direction="row" spacing="4px">
                              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                                {String(formatNumber(Number(item.num) * Number(inputNum)))}
                              </Typography>
                              <Typography sx={{ color: "#464646", fontSize: '12px', fontWeight: 700 }}>
                                {item.symbol.split('-')[0]}
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

          </Box>
        ) : (
          <Box sx={{ width: '100%', p: "2px", display: inputNum !== '' && inputNum !== "0" ? 'block' : 'none' }}>
            <Box>
              <Typography sx={{ color: '#9b9b9b', fontSize: '11px' }}>
                You receive the <span style={{ color: '#1AAE70' }}>{data.length}</span>  constituent tokens in set ratios when redeeming one H20 token.
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
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={20} />
                              <Typography sx={{ color: '#464646', fontSize: '10px' }}>
                                {item.symbol.split('-')[0]}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack alignItems="end" width="40%">
                            {
                              index == 0 ? (
                                <Typography variant='body1' sx={{ fontSize: '11px', fontWeight: 600, pb: "6px" }} color="#979797">
                                  Receive
                                </Typography>
                              ) : null
                            }
                            <Stack direction="row" spacing="2px">
                              <Typography sx={{ color: "#464646", fontSize: '10px', fontWeight: 700 }}>
                                {String(formatNumber(Number(item.num) * Number(inputNum)))}
                              </Typography>
                              <Typography sx={{ color: "#464646", fontSize: '10px', fontWeight: 700 }}>
                                {item.symbol.split('-')[0]}
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

          </Box>
        )
      }
    </>
  );
}
