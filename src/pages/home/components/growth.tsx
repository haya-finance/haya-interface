import { Box, Typography, Stack } from "@mui/material"

import { useEffect, useState } from "react";
import IncomeAreaChart from "./incomeAreaChart";
import { MdOutlineCheck } from "react-icons/md";
import TokenColorIcon from "assets/tokens";
// import IncomeAreaChart from "./incomeAreaChart";

type PropsType = {
  windowWidth: number
}

interface DataType {
  name: string;
  value: string;
  time: string;
  color: string;
}

const HistoryNotial = ({ windowWidth }: PropsType) => {
  const [slot, setSlot] = useState('allTime');

  const [btcShow, setBTCShow] = useState(true)
  const [spxShow, setSPXShow] = useState(true)
  const [data, setData] = useState<DataType[]>([{
    name: 'H20',
    value: '108.5740044',
    time: '',
    color: ''
  },
  {
    name: 'BTC',
    value: '65.72836824',
    time: '',
    color: ''
  },
  {
    name: 'spx500',
    value: '2.247767641',
    time: '',
    color: ''
  }
  ])


  const onCheckBTC = () => {
    setBTCShow(!btcShow)

  }


  const onCheckSPX = () => {
    setSPXShow(!spxShow)

  }

  useEffect(() => {

  }, [btcShow, spxShow])

  useEffect(() => {

  }, [windowWidth])

  const onData = (value: DataType[]) => {
    setData(value)


  }

  useEffect(() => {

  }, [data])




  return (
    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%', backgroundColor: '#fff', m: "30px 0" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ borderBottom: '2px solid #CCD5E0', paddingBottom: '10px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700, fontSize: '20px' }}  >
                Growth of $H20
              </Typography>
              <Stack direction="row" alignItems="center" spacing="12px">
                {/* <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Month' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Month')} component="button" sx={{ cursor: 'pointer', fontSize: '12px', color: '#667085', border: 0, backgroundColor: 'transparent' }}>
                    Month
                  </Typography>


                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Quarter' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Quarter')} component="button" sx={{ cursor: 'pointer', fontSize: '12px', color: '#667085', border: 0, backgroundColor: 'transparent' }}>
                    Quarter
                  </Typography>


                </Stack> */}
                {/* <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Year' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Year')} component="button" sx={{ cursor: 'pointer', fontSize: '12px', color: '#667085', border: 0, backgroundColor: 'transparent' }}>
                    Year
                  </Typography>


                </Stack> */}
                <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'allTime' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('allTime')} component="button" sx={{ cursor: 'pointer', fontSize: '14px', color: '#667085', border: 0, backgroundColor: 'transparent' }}>
                    All Time
                  </Typography>


                </Stack>
              </Stack>




            </Stack>
            <IncomeAreaChart SpxShow={spxShow} BtcShow={btcShow} windowWidth={windowWidth} slot={slot} onData={onData} />
            <Typography sx={{ fontSize: '14px', color: '#717E91', marginBottom: '10px', fontWeight: 600 }}>
              Compare to:
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb="10px">
              <Stack direction="row" alignItems="center" spacing="12px">
                <Stack direction="row" alignItems="center" spacing="10px">
                  <Box component='button' onClick={onCheckBTC} sx={{ cursor: 'pointer', position: 'relative', width: '22px', borderRadius: '7px', height: '22px', border: btcShow ? '1px solid #5EAE4A' : 'none', backgroundColor: btcShow ? 'transparent' : '#E3E8EF' }}>
                    <MdOutlineCheck size={20} color="#5EAE4A" style={{ position: 'absolute', top: '0', right: '-1px', display: btcShow ? 'block' : 'none' }} />


                  </Box>
                  <TokenColorIcon name="BTC" size={22} />
                  <Typography sx={{ fontSize: '14px', color: '#F7931A' }}>
                    BTC
                  </Typography>

                </Stack>
                <Stack direction="row" alignItems="center" spacing="10px">
                  <Box component="button" onClick={onCheckSPX} sx={{ cursor: 'pointer', position: 'relative', width: '22px', height: '22px', borderRadius: '7px', border: spxShow ? '1px solid #5EAE4A' : 'none', backgroundColor: spxShow ? 'transparent' : '#E3E8EF' }}>
                    <MdOutlineCheck size={20} color="#5EAE4A" style={{ position: 'absolute', top: '0', right: '-1px', display: spxShow ? 'block' : 'none' }} />


                  </Box>
                  <TokenColorIcon name="SPX" size={22} />
                  <Typography sx={{ fontSize: '14px', color: '#C4162E' }}>
                    spx500
                  </Typography>

                </Stack>
              </Stack>

              <Typography sx={{ fontSize: '12px', color: '#A9A9A9' }}>
                *Past performance is not indicative of future results
              </Typography>


            </Stack>
            <Box sx={{ backgroundColor: '#F8FCF5', borderRadius: '20px', padding: '9px 10px' }}>
              <Stack direction="row" spacing="64px">
                <Stack>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    $H20 Performance
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    {isNaN(Number((Number(data.filter((item) => item.name == 'H20')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'H20')[0]?.value) - 1) * 100).toFixed(2)}%`}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    $BTC Performance
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    {isNaN(Number((Number(data.filter((item) => item.name == 'BTC')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'BTC')[0]?.value) - 1) * 100).toFixed(2)}%`}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    $SPY Performance
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                    {isNaN(Number((Number(data.filter((item) => item.name == 'spx500')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'spx500')[0]?.value) - 1) * 100).toFixed(2)}%`}
                  </Typography>
                </Stack>


              </Stack>

            </Box>
          </Box>
        ) : (
          <Box sx={{ width: '100%', backgroundColor: '#fff', mb: "30px" }}>
            <Stack direction="row" justifyContent="space-between" sx={{ borderBottom: '2px solid #CCD5E0', paddingBottom: '10px' }}>
              <Typography variant="body1" textAlign="center" sx={{ color: '#000', pl: '16px', fontWeight: 700, fontSize: '18px' }}  >
                Growth of $H20
              </Typography>
              <Stack direction="row" alignItems="center" spacing="4px">
                {/* <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Month' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Month')} component="button" sx={{ cursor: 'pointer', fontSize: '9px', color: '#667085', padding: '0 2px', border: 0, backgroundColor: 'transparent' }}>
                    Month
                  </Typography>


                </Stack>
                <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Quarter' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Quarter')} component="button" sx={{ cursor: 'pointer', fontSize: '9px', color: '#667085', border: 0, padding: '0 2px', backgroundColor: 'transparent' }}>
                    Quarter
                  </Typography>


                </Stack> */}
                {/* <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'Year' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('Year')} component="button" sx={{ cursor: 'pointer', fontSize: '11px', color: '#667085', padding: '0 4px', border: 0, backgroundColor: 'transparent' }}>
                    Year
                  </Typography>


                </Stack> */}
                <Stack direction="row" alignItems="center">
                  <Box width='8px' height="8px" borderRadius="8px" sx={{ backgroundColor: '#01D57E', display: slot === 'allTime' ? 'block' : 'none' }}>


                  </Box>
                  <Typography onClick={() => setSlot('allTime')} component="button" sx={{ cursor: 'pointer', fontSize: '14px', color: '#667085', padding: '0 4px', border: 0, backgroundColor: 'transparent' }}>
                    All Time
                  </Typography>


                </Stack>
              </Stack>




            </Stack>
            <IncomeAreaChart SpxShow={spxShow} BtcShow={btcShow} windowWidth={windowWidth} slot={slot} onData={onData} />


            <Stack padding="16px 16px">
              <Typography sx={{ fontSize: '13px', color: '#717E91', marginBottom: '10px', fontWeight: 600 }}>
                Compare to:
              </Typography>
              <Stack direction="row" alignItems="center" spacing="30px">
                <Stack direction="row" alignItems="center" spacing="6px">
                  <Box component='button' onClick={onCheckBTC} sx={{ cursor: 'pointer', position: 'relative', width: '22px', borderRadius: '7px', height: '22px', border: btcShow ? '1px solid #5EAE4A' : 'none', backgroundColor: btcShow ? 'transparent' : '#E3E8EF' }}>
                    <MdOutlineCheck size={20} color="#5EAE4A" style={{ position: 'absolute', top: '0', right: '-1px', display: btcShow ? 'block' : 'none' }} />


                  </Box>
                  <TokenColorIcon name="BTC" size={22} />
                  <Typography sx={{ fontSize: '14px', color: '#F7931A' }}>
                    BTC
                  </Typography>

                </Stack>
                <Stack direction="row" alignItems="center" spacing="6px">
                  <Box component="button" onClick={onCheckSPX} sx={{ cursor: 'pointer', position: 'relative', width: '22px', height: '22px', borderRadius: '7px', border: spxShow ? '1px solid #5EAE4A' : 'none', backgroundColor: spxShow ? 'transparent' : '#E3E8EF' }}>
                    <MdOutlineCheck size={20} color="#5EAE4A" style={{ position: 'absolute', top: '0', right: '-1px', display: spxShow ? 'block' : 'none' }} />


                  </Box>
                  <TokenColorIcon name="SPX" size={22} />
                  <Typography sx={{ fontSize: '14px', color: '#C4162E' }}>
                    spx500
                  </Typography>

                </Stack>
              </Stack>
            </Stack>

            <Box sx={{ backgroundColor: '#F8F8F8', borderRadius: '8px', padding: '5px 14px', m: '10px 16px' }}>
              <Typography sx={{ fontSize: '12px', color: '#A9A9A9', lineHeight: '16px' }}>
                *Past performance is not indicative of future results
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#F8FCF5', borderRadius: '20px', padding: '9px 16px', marginTop: '10px' }}>
              <Stack marginBottom="10px">
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  $H20 Performance
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  {isNaN(Number((Number(data.filter((item) => item.name == 'H20')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'H20')[0]?.value) - 1) * 100).toFixed(2)}%`}
                </Typography>
              </Stack>
              <Stack marginBottom="10px">
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  $BTC Performance
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  {isNaN(Number((Number(data.filter((item) => item.name == 'BTC')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'BTC')[0]?.value) - 1) * 100).toFixed(2)}%`}
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  $SPY Performance
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#717E91' }}>
                  {isNaN(Number((Number(data.filter((item) => item.name == 'spx500')[0]?.value) - 1) * 100)) ? '0.00%' : `${Number((Number(data.filter((item) => item.name == 'spx500')[0]?.value) - 1) * 100).toFixed(2)}%`}
                </Typography>
              </Stack>

            </Box>
          </Box>
        )
      }
    </>
  )
}


export default HistoryNotial