import { Grid } from "@mui/material"
import { DatePicker } from "antd"
// import type { ColumnsType } from 'antd/es/table';
// import { FormattedMessage } from "react-intl";
import zh_local from 'antd/es/date-picker/locale/zh_CN'
import en_local from 'antd/es/date-picker/locale/en_US'
import { useEffect } from "react";
import useConfig from "hooks/useConfig";
import 'dayjs/locale/zh-cn';

// interface DataType {
//   key?: React.Key;
//   id: string;
//   date_time: string;
//   operation: string;
//   fiat_crypto: string;
//   currency: string;
//   amount: string;
//   balance: string
// }



const CustomizeQuery = () => {


  // const rows: DataType[] = [
  //   {
  //     id: '1',
  //     date_time: '2023/07/10 12:30',
  //     operation: 'Deposit',
  //     fiat_crypto: 'Fiat',
  //     currency: 'USD',
  //     amount: '250,000',
  //     balance: '250,000'
  //   },
  //   {
  //     id: '2',
  //     date_time: '2023/07/12 09:24',
  //     operation: 'Deposit',
  //     fiat_crypto: 'Crypto',
  //     currency: 'BTC',
  //     amount: '20,1200',
  //     balance: '20,1200'
  //   },
  //   {
  //     id: '3',
  //     date_time: '2023/07/12 15:20',
  //     operation: 'Deposit',
  //     fiat_crypto: 'Fiat',
  //     currency: 'USD',
  //     amount: '1,200,000',
  //     balance: '1,450,000'
  //   },
  //   {
  //     id: '4',
  //     date_time: '2023/08/20 09:40',
  //     operation: 'Withdraw',
  //     fiat_crypto: 'Fiat',
  //     currency: 'USD',
  //     amount: '290,000',
  //     balance: '1,300,000'
  //   }
  // ];

  // const GoDetails = (id: string) => {
  //   console.log('详情', id)

  // }

  const { i18n } = useConfig()

  // console.log('local', zh_local)

  useEffect(() => {

    // console.log('i18n', i18n)

  }, [i18n])

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
  //     title: <FormattedMessage id="fiat_crypto" />,
  //     align: 'center',
  //     dataIndex: 'fiat_crypto',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="his_currency" />,
  //     align: 'center',
  //     dataIndex: 'currency',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="amount" />,
  //     align: 'center',
  //     dataIndex: 'amount',
  //   },
  //   {
  //     width: 100,
  //     title: <FormattedMessage id="balance" />,
  //     align: 'center',
  //     dataIndex: 'balance',
  //   },
  //   {
  //     title: '',
  //     width: 80,
  //     align: 'center',
  //     dataIndex: 'id',
  //     render: (_, record: { id: string }) =>
  //       <Button variant="text" onClick={() => GoDetails(record.id)}><FormattedMessage id="details" />,</Button>
  //   },
  // ];
  const { RangePicker } = DatePicker;

  return (
    <Grid container >
      <Grid item xs={12} mt={2}>
        <RangePicker locale={i18n == "en" ? en_local : zh_local} />
        {/* <Table columns={columns} dataSource={rows} /> */}
      </Grid>
    </Grid>
  )
}

export default CustomizeQuery