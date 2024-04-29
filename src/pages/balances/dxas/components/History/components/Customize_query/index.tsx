import { Grid } from "@mui/material"
import useConfig from "hooks/useConfig"
import { DatePicker } from "antd"
import zh_local from 'antd/es/date-picker/locale/zh_CN'
import en_local from 'antd/es/date-picker/locale/en_US'
import { useEffect } from "react";
import 'dayjs/locale/zh-cn';
// import { Table } from "antd"
// import type { ColumnsType } from 'antd/es/table';
// import { FormattedMessage } from "react-intl";

// interface DataType {
//   key?: React.Key;
//   date_time: string;
//   operation: string;
//   from: string;
//   to: string;
//   memo: string
// }



const CustomizeQuery = () => {

  const { i18n } = useConfig()

  console.log('local', zh_local)

  useEffect(() => {

    console.log('i18n', i18n)

  }, [i18n])

  const { RangePicker } = DatePicker;


  // const rows: DataType[] = [
  //   {
  //     date_time: '2023/07/10 12:30',
  //     operation: 'New account',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'NA',
  //     memo: 'NA'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'BTC 20.12'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     operation: 'Transfer',
  //     from: 'Okx: haha23@dodo.comm',
  //     to: 'Binance: fe9422@dodo.com',
  //     memo: 'USDT 1,200,000'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'USDT 290,000'
  //   },
  //   {
  //     date_time: '2023/07/10 12:30',
  //     operation: 'New account',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'NA',
  //     memo: 'NA'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'BTC 20.12'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     operation: 'Transfer',
  //     from: 'Okx: haha23@dodo.comm',
  //     to: 'Binance: fe9422@dodo.com',
  //     memo: 'USDT 1,200,000'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'USDT 290,000'
  //   },
  //   {
  //     date_time: '2023/07/10 12:30',
  //     operation: 'New account',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'NA',
  //     memo: 'NA'
  //   },
  //   {
  //     date_time: '2023/07/12 09:24',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'BTC 20.12'
  //   },
  //   {
  //     date_time: '2023/07/12 15:20',
  //     operation: 'Transfer',
  //     from: 'Okx: haha23@dodo.comm',
  //     to: 'Binance: fe9422@dodo.com',
  //     memo: 'USDT 1,200,000'
  //   },
  //   {
  //     date_time: '2023/08/20 09:40',
  //     operation: 'Transfer',
  //     from: 'Binance: fe9422@dodo.com',
  //     to: 'Okx: haha23@dodo.com',
  //     memo: 'USDT 290,000'
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
  //     title: <FormattedMessage id="operation" />,
  //     align: 'center',
  //     dataIndex: 'operation',
  //   },
  //   {
  //     width: 100,
  //     title: 'From',
  //     align: 'center',
  //     dataIndex: 'from',
  //   },
  //   {
  //     width: 100,
  //     title: 'To',
  //     align: 'center',
  //     dataIndex: 'to',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="memo" />,
  //     align: 'center',
  //     dataIndex: 'memo',
  //   },
  // ];

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