

import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts/lib/echarts';
import { useEffect, useState } from 'react';
import { BTCNum, BTCYearData, Daydata, H20Num, H20YearData, Spx500Num, SPXYearData, Yeardata } from './data';
import './index.css'

// ==============================|| INCOME AREA CHART ||============================== //

interface Props {
  slot: string;
  windowWidth: number;
  SpxShow: boolean;
  onData: (data: DataType[]) => void
  BtcShow: boolean



}

interface DataType {
  name: string;
  value: string;
  time: string;
  color: string;
}

// interface Data {
//   time: string,
//   equity: string,
//   name: string
// }

const IncomeAreaChart = ({ slot, SpxShow, BtcShow, windowWidth, onData }: Props) => {
  const [BTCData, setBtcData] = useState<Number[]>([])
  const [H20Data, setH20Data] = useState<Number[]>([])
  const [SPXData, setSPXData] = useState<Number[]>([])
  const [YearY, setYearY] = useState<String[]>([])

  const [hoverData, setHoverData] = useState<any>([])


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

  const GetTooltipFormatter = (p: any, params: any) => {
    let arr: DataType[] = []
    // setHoverData(params);
    // 返回自定义的formatter内容，这里简单返回params的name
    for (let i = 0; i < params.length; i++) {
      arr.push({
        name: params[i].seriesName,
        value: String(params[i].value),
        time: params[i].name,
        color: params[i].color
      })
    }

    setHoverData(arr)



  };





  const option = {
    tooltip: {
      trigger: 'axis',
      position: GetTooltipFormatter,
      transitionDuration: 1,
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
      left: windowWidth >= 600 ? '4%' : '18%',
      right: windowWidth >= 600 ? '2%' : '10%',
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
      },
      {
        event: {
          mouseover: function (event: any) {
            console.log('event1111', event)
          }

        }
      }
    ]
  };


  const BTCoption = {
    tooltip: {
      trigger: 'axis',
      position: GetTooltipFormatter,
      transitionDuration: 1,
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
      left: windowWidth >= 600 ? '4%' : '18%',
      right: windowWidth >= 600 ? '2%' : '10%',
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
      position: GetTooltipFormatter,
      transitionDuration: 1,
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
      left: windowWidth >= 600 ? '4%' : '18%',
      right: windowWidth >= 600 ? '2%' : '10%',
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
      position: GetTooltipFormatter,
      transitionDuration: 1,
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
      left: windowWidth >= 600 ? '4%' : '18%',
      right: windowWidth >= 600 ? '2%' : '10%',
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

  // const chartRef = useRef<any>(null);

  // useEffect(() => {
  //   const chartInstance = echarts.getInstanceByDom(chartRef.current);

  //   if (chartInstance) {
  //     chartInstance.setOption(option);
  //     chartInstance.on('mouseover', function (params: { componentType?: any; data?: any; seriesIndex?: any; dataIndex?: any; }) {
  //       if (params.componentType === 'series') {
  //         const { seriesIndex, dataIndex } = params;
  //         // 获取鼠标悬停点的数据
  //         const dataPoint = params.data;
  //         // 打印或处理数据
  //         console.log(`Series ${seriesIndex}, Data Index ${dataIndex}:`, dataPoint);
  //       }
  //     });
  //   }
  // }, []);



  useEffect(() => {
    onData(hoverData)

  }, [hoverData])







  return (
    <>

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
    </>
  );
};

export default IncomeAreaChart;
