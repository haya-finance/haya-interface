import { Grid } from "@mui/material"
import { DatePicker } from "antd"
import zh_local from 'antd/es/date-picker/locale/zh_CN'
import en_local from 'antd/es/date-picker/locale/en_US'
import { useEffect } from "react";
import useConfig from "hooks/useConfig";
import 'dayjs/locale/zh-cn';
// import { Table } from "antd"
// import type { ColumnsType } from 'antd/es/table';
// import { FormattedMessage } from "react-intl";

// interface DataType {
//   key?: React.Key;
//   date_time: string;
//   order_type: string;
//   symbol: string;
//   side: string;
//   qty: string;
//   limit_price: string;
//   execution_price: string;
//   duration: string;
//   status: string;
// }



const CustomizeQuery = () => {
  const { i18n } = useConfig()

  console.log('local', zh_local)

  useEffect(() => {

    console.log('i18n', i18n)

  }, [i18n])


  // const rows: DataType[] = [
  //   {
  //     date_time: '2023/07/10 12:30',
  //     order_type: 'Algo',
  //     symbol: 'BTCUSDT',
  //     side: 'Buy',
  //     qty: '102.0',
  //     limit_price: '27500.0',
  //     execution_price: '27102.12',
  //     duration: '30 min',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     order_type: 'Quote',
  //     symbol: 'ETHUSDT',
  //     side: 'Buy',
  //     qty: '5000.0',
  //     limit_price: 'NA',
  //     execution_price: '1812.90',
  //     duration: 'NA',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     order_type: 'Limit',
  //     symbol: 'SOLUSDT',
  //     side: 'Buy',
  //     qty: '100.0',
  //     limit_price: '25.12',
  //     execution_price: 'NA',
  //     duration: '6 min',
  //     status: 'Cancelled'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     order_type: 'Market',
  //     symbol: 'XRPUSDT',
  //     side: 'Sell',
  //     qty: '50.0',
  //     limit_price: 'NA',
  //     execution_price: '0.3210',
  //     duration: 'NA',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/10 12:30',
  //     order_type: 'Algo',
  //     symbol: 'BTCUSDT',
  //     side: 'Buy',
  //     qty: '102.0',
  //     limit_price: '27500.0',
  //     execution_price: '27102.12',
  //     duration: '30 min',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     order_type: 'Quote',
  //     symbol: 'ETHUSDT',
  //     side: 'Buy',
  //     qty: '5000.0',
  //     limit_price: 'NA',
  //     execution_price: '1812.90',
  //     duration: 'NA',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     order_type: 'Limit',
  //     symbol: 'SOLUSDT',
  //     side: 'Buy',
  //     qty: '100.0',
  //     limit_price: '25.12',
  //     execution_price: 'NA',
  //     duration: '6 min',
  //     status: 'Cancelled'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     order_type: 'Market',
  //     symbol: 'XRPUSDT',
  //     side: 'Sell',
  //     qty: '50.0',
  //     limit_price: 'NA',
  //     execution_price: '0.3210',
  //     duration: 'NA',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/10 12:30',
  //     order_type: 'Algo',
  //     symbol: 'BTCUSDT',
  //     side: 'Buy',
  //     qty: '102.0',
  //     limit_price: '27500.0',
  //     execution_price: '27102.12',
  //     duration: '30 min',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     order_type: 'Quote',
  //     symbol: 'ETHUSDT',
  //     side: 'Buy',
  //     qty: '5000.0',
  //     limit_price: 'NA',
  //     execution_price: '1812.90',
  //     duration: 'NA',
  //     status: 'Filled'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     order_type: 'Limit',
  //     symbol: 'SOLUSDT',
  //     side: 'Buy',
  //     qty: '100.0',
  //     limit_price: '25.12',
  //     execution_price: 'NA',
  //     duration: '6 min',
  //     status: 'Cancelled'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     order_type: 'Market',
  //     symbol: 'XRPUSDT',
  //     side: 'Sell',
  //     qty: '50.0',
  //     limit_price: 'NA',
  //     execution_price: '0.3210',
  //     duration: 'NA',
  //     status: 'Filled'
  //   }
  // ];

  // const columns: ColumnsType<DataType> = [
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="date_time" />,
  //     align: 'center',
  //     dataIndex: 'date_time',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="order_type" />,
  //     align: 'center',
  //     dataIndex: 'order_type',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="symbol" />,
  //     align: 'center',
  //     dataIndex: 'symbol',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="side" />,
  //     align: 'center',
  //     dataIndex: 'side',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="qty" />,
  //     align: 'center',
  //     dataIndex: 'qty',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="limit_price" />,
  //     align: 'center',
  //     dataIndex: 'limit_price',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="execution_price" />,
  //     align: 'center',
  //     dataIndex: 'execution_price',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="duration" />,
  //     align: 'center',
  //     dataIndex: 'duration',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="status" />,
  //     align: 'center',
  //     dataIndex: 'status',
  //   },

  // ];
  const { RangePicker } = DatePicker;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} mt={2}>
        <RangePicker locale={i18n == "en" ? en_local : zh_local} />
        {/* <Table columns={columns} dataSource={rows} /> */}
      </Grid>
    </Grid>
  )
}

export default CustomizeQuery