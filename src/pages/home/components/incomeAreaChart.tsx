
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { BTCNum, BTCYearData, Daydata, H20Num, H20YearData, Spx500Num, SPXYearData, Yeardata } from './data';
import './index.css'

// ==============================|| INCOME AREA CHART ||============================== //

interface Props {
  slot: string;
  windowWidth: number;
  SpxShow: boolean;
  BtcShow: boolean

}
// interface Data {
//   time: string,
//   equity: string,
//   name: string
// }

const IncomeAreaChart = ({ slot, SpxShow, BtcShow, windowWidth }: Props) => {
  const [BTCData, setBtcData] = useState<Number[]>([])
  const [H20Data, setH20Data] = useState<Number[]>([])
  const [SPXData, setSPXData] = useState<Number[]>([])
  const [YearY, setYearY] = useState<String[]>([])


  useEffect(() => {
    if (slot == "Year") {
      setBtcData(BTCYearData)
      setH20Data(H20YearData)
      setSPXData(SPXYearData)
      setYearY(Yeardata)
    } else if (slot == "allTime") {
      setBtcData(BTCNum)
      setH20Data(H20Num)
      setSPXData(Spx500Num)
      setYearY(Yeardata)
      setYearY(Daydata)
    }


  }, [slot])


  useEffect(() => {

  }, [BTCData, H20Data, SPXData, YearY])
  // const params = useParams()


  const option = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt: any[]) {
      //   return [pt[0], '10%'];
      // }
    },
    title: {
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: YearY,
      boundaryGap: false,
      splitLine: {
        show: false
      }
      // nameTextStyle: {
      //   padding: [0, 2, 0, 8]
      // }
    },
    grid: {
      top: windowWidth >= 600 ? '10%' : '10%',
      left: windowWidth >= 600 ? '4%' : '12%',
      right: windowWidth >= 600 ? '2%' : '2%',
      bottom: windowWidth >= 600 ? '10%' : '10%',
      contaionLabel: true

    },
    yAxis: {
      type: 'value',
      // boundaryGap: ['10%', '10%'],
      splitLine: {
        show: false
      },
      data: [0, 20, 40, 60, 80, 100, 120, 140]
      // data: equity_list,
      // min: (Math.min.apply(null, equity_list.map(item => {
      //   if (item < 0 && item < -10) {
      //     console.log('小于0')
      //     return item - (item / (item / 1000))
      //   } else if (item > 10000) {
      //     return item - (item / 1000)
      //   } else if (item < 0 && item > -10) {
      //     console.log('小于10')
      //     return item - (item / (item - 2))
      //   }
      //   else {
      //     return item - (item / 30)

      //   }
      // })) - 0.001).toFixed(2),
    },
    series: [
      {
        color: '#0DC82B',
        name: 'H20',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        data: H20Data
      },
      {
        color: '#F7931A',
        name: 'BTC',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        // areaStyle: {
        //   origin: 'start'
        // },

        data: BTCData
      },
      {
        color: '#C4162E',
        name: 'spx500',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        // areaStyle: {
        //   origin: 'start'
        // },
        data: SPXData
      }
    ]
  };


  const BTCoption = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt: any[]) {
      //   return [pt[0], '10%'];
      // }
    },
    title: {
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: YearY,
      boundaryGap: false,
      splitLine: {
        show: false
      }
      // nameTextStyle: {
      //   padding: [0, 2, 0, 8]
      // }
    },
    grid: {
      top: windowWidth >= 600 ? '10%' : '10%',
      left: windowWidth >= 600 ? '4%' : '12%',
      right: windowWidth >= 600 ? '2%' : '2%',
      bottom: windowWidth >= 600 ? '10%' : '10%',
      contaionLabel: true

    },
    yAxis: {
      type: 'value',
      // boundaryGap: ['10%', '10%'],
      splitLine: {
        show: false
      },
      data: [0, 20, 40, 60, 80, 100, 120, 140]
      // data: equity_list,
      // min: (Math.min.apply(null, equity_list.map(item => {
      //   if (item < 0 && item < -10) {
      //     console.log('小于0')
      //     return item - (item / (item / 1000))
      //   } else if (item > 10000) {
      //     return item - (item / 1000)
      //   } else if (item < 0 && item > -10) {
      //     console.log('小于10')
      //     return item - (item / (item - 2))
      //   }
      //   else {
      //     return item - (item / 30)

      //   }
      // })) - 0.001).toFixed(2),
    },
    series: [
      {
        color: '#0DC82B',
        name: 'H20',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        data: H20Data
      },
      {
        color: '#F7931A',
        name: 'BTC',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        // areaStyle: {
        //   origin: 'start'
        // },

        data: BTCData
      },
    ]
  };

  const SPXoption = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt: any[]) {
      //   return [pt[0], '10%'];
      // }
    },
    title: {
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: YearY,
      boundaryGap: false,
      splitLine: {
        show: false
      }
      // nameTextStyle: {
      //   padding: [0, 2, 0, 8]
      // }
    },
    grid: {
      top: windowWidth >= 600 ? '10%' : '10%',
      left: windowWidth >= 600 ? '4%' : '12%',
      right: windowWidth >= 600 ? '2%' : '2%',
      bottom: windowWidth >= 600 ? '10%' : '10%',
      contaionLabel: true

    },
    yAxis: {
      type: 'value',
      // boundaryGap: ['10%', '10%'],
      splitLine: {
        show: false
      },
      data: [0, 20, 40, 60, 80, 100, 120, 140]
      // data: equity_list,
      // min: (Math.min.apply(null, equity_list.map(item => {
      //   if (item < 0 && item < -10) {
      //     console.log('小于0')
      //     return item - (item / (item / 1000))
      //   } else if (item > 10000) {
      //     return item - (item / 1000)
      //   } else if (item < 0 && item > -10) {
      //     console.log('小于10')
      //     return item - (item / (item - 2))
      //   }
      //   else {
      //     return item - (item / 30)

      //   }
      // })) - 0.001).toFixed(2),
    },
    series: [
      {
        color: '#0DC82B',
        name: 'H20',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        data: H20Data
      },
      {
        color: '#C4162E',
        name: 'spx500',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        // areaStyle: {
        //   origin: 'start'
        // },
        data: SPXData
      }
    ]
  };

  const H20option = {
    tooltip: {
      trigger: 'axis',
      // position: function (pt: any[]) {
      //   return [pt[0], '10%'];
      // }
    },
    title: {
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: YearY,
      boundaryGap: false,
      splitLine: {
        show: false
      }
      // nameTextStyle: {
      //   padding: [0, 2, 0, 8]
      // }
    },
    grid: {
      top: windowWidth >= 600 ? '10%' : '10%',
      left: windowWidth >= 600 ? '4%' : '12%',
      right: windowWidth >= 600 ? '2%' : '2%',
      bottom: windowWidth >= 600 ? '10%' : '10%',
      contaionLabel: true

    },
    yAxis: {
      type: 'value',
      // boundaryGap: ['10%', '10%'],
      splitLine: {
        show: false
      },
      data: [0, 20, 40, 60, 80, 100, 120, 140]
      // data: equity_list,
      // min: (Math.min.apply(null, equity_list.map(item => {
      //   if (item < 0 && item < -10) {
      //     console.log('小于0')
      //     return item - (item / (item / 1000))
      //   } else if (item > 10000) {
      //     return item - (item / 1000)
      //   } else if (item < 0 && item > -10) {
      //     console.log('小于10')
      //     return item - (item / (item - 2))
      //   }
      //   else {
      //     return item - (item / 30)

      //   }
      // })) - 0.001).toFixed(2),
    },
    series: [
      {
        color: '#0DC82B',
        name: 'H20',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        data: H20Data
      }
    ]
  };

  useEffect(() => {

  }, [windowWidth])






  return (
    <>
      <div>
        {
          SpxShow && !BtcShow ? (
            <ReactEcharts option={SPXoption} style={{ height: windowWidth >= 600 ? 400 : 300 }} />
          ) : (
            <></>
          )
        }
        {
          !SpxShow && BtcShow ? (
            <ReactEcharts option={BTCoption} style={{ height: windowWidth >= 600 ? 400 : 300 }} />
          ) : (
            <></>
          )
        }
        {
          SpxShow && BtcShow ? (
            <ReactEcharts option={option} style={{ height: windowWidth >= 600 ? 400 : 300 }} />
          ) : (
            <></>
          )
        }
        {
          !SpxShow && !BtcShow ? (
            <ReactEcharts option={H20option} style={{ height: windowWidth >= 600 ? 400 : 300 }} />
          ) : (
            <></>
          )
        }
      </div>
    </>
  );
};

export default IncomeAreaChart;
