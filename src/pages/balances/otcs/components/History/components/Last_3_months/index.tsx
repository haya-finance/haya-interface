import { Grid } from "@mui/material"
import { Table } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { FormattedMessage } from "react-intl";

interface DataType {
  key?: React.Key;
  id: string;
  date_time: string;
  crypto: string;
  fiat: string;
  side: string;
  amt: string;
  amount: string;
  price: string;
  duration: string;
  status: string;
}


const LastThreeMonths = () => {


  const rows: DataType[] = [
    {
      id: '1',
      date_time: '2023/07/10 12:30',
      crypto: 'USDT',
      fiat: 'USD',
      side: 'Buy',
      amt: '1,000,000',
      amount: '1,002,000',
      price: '1.002',
      duration: '1 hour',
      status: 'Filled'
    },
    {
      id: '2',
      date_time: '2023/07/12 09:24',
      crypto: 'BTC',
      fiat: 'EUR',
      side: 'Sell',
      amt: '100.0',
      amount: '3,020,000',
      price: '30,200',
      duration: '30 min',
      status: 'Filled'
    },
    {
      id: '3',
      date_time: '2023/07/12 15:20',
      crypto: 'USDC',
      fiat: 'USD',
      side: 'Buy',
      amt: '100.0',
      amount: '1,002,000',
      price: '1.002',
      duration: '30 min',
      status: 'Filled'
    },
    {
      id: '4',
      date_time: '2023/08/20 09:40',
      crypto: 'BTC',
      fiat: 'USD',
      side: 'Sell',
      amt: '50.0',
      amount: '1,450,000',
      price: '29,000',
      duration: '2 hour',
      status: 'Filled'
    },
    {
      id: '5',
      date_time: '2023/07/10 12:30',
      crypto: 'USDT',
      fiat: 'USD',
      side: 'Buy',
      amt: '1,000,000',
      amount: '1,002,000',
      price: '1.002',
      duration: '1 hour',
      status: 'Filled'
    },
    {
      id: '6',
      date_time: '2023/07/12 09:24',
      crypto: 'BTC',
      fiat: 'EUR',
      side: 'Sell',
      amt: '100.0',
      amount: '3,020,000',
      price: '30,200',
      duration: '30 min',
      status: 'Filled'
    },
    {
      id: '7',
      date_time: '2023/07/12 15:20',
      crypto: 'USDC',
      fiat: 'USD',
      side: 'Buy',
      amt: '100.0',
      amount: '1,002,000',
      price: '1.002',
      duration: '30 min',
      status: 'Filled'
    },
    {
      id: '8',
      date_time: '2023/08/20 09:40',
      crypto: 'BTC',
      fiat: 'USD',
      side: 'Sell',
      amt: '50.0',
      amount: '1,450,000',
      price: '29,000',
      duration: '2 hour',
      status: 'Filled'
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      width: 100,
      title: <FormattedMessage id="date_time" />,
      align: 'center',
      dataIndex: 'date_time',
    },
    {
      width: 100,
      title: <FormattedMessage id="crypto" />,
      align: 'center',
      dataIndex: 'crypto',
    },
    {
      width: 100,
      title: <FormattedMessage id="fiat" />,
      align: 'center',
      dataIndex: 'fiat',
    },
    {
      width: 100,
      title: <FormattedMessage id="side" />,
      align: 'center',
      dataIndex: 'side',
    },
    {
      width: 100,
      title: <FormattedMessage id="amt_crypto" />,
      align: 'center',
      dataIndex: 'amt',
    },
    {
      width: 100,
      title: <FormattedMessage id="amount_fiat" />,
      align: 'center',
      dataIndex: 'amount',
    },
    {
      width: 100,
      title: <FormattedMessage id="price" />,
      align: 'center',
      dataIndex: 'price',
    },
    {
      width: 100,
      title: <FormattedMessage id="duration" />,
      align: 'center',
      dataIndex: 'duration',
    },
    {
      width: 100,
      title: <FormattedMessage id="status" />,
      align: 'center',
      dataIndex: 'status',
    },

  ];
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} mt={2}>
        <Table columns={columns} dataSource={rows} />
      </Grid>
    </Grid>
  )
}

export default LastThreeMonths