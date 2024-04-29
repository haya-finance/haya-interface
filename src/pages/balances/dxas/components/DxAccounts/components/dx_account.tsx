import { Button, Grid } from "@mui/material"
import { Table } from "antd"
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key?: React.Key;
  id: string;
  exchange: string;
  account: string;
  api_key: string;
  whitelist_ip: string
}



const DxAccountTable = () => {


  const rows: DataType[] = [
    {
      id: 'BN954522',
      exchange: 'Binance',
      account: 'h1342@dodo.com',
      api_key: '4f2d****542d',
      whitelist_ip: '61.124.93.122'
    },
    {
      id: 'OK234595',
      exchange: 'Okx',
      account: 'fen542@dodo.com',
      api_key: '4f2d****542d',
      whitelist_ip: '61.124.93.122'
    },
    {
      id: 'BY456265',
      exchange: 'Bybit',
      account: 'gogo12@dodo.com',
      api_key: '4f2d****542d',
      whitelist_ip: '61.124.93.122'
    },
    {
      id: 'GT698234',
      exchange: 'Gate',
      account: 'rod1235@dodo.com',
      api_key: '4f2d****542d',
      whitelist_ip: '61.124.93.122'
    }
  ];

  const GoDetails = (id: string) => {
    console.log('详情', id)

  }

  const columns: ColumnsType<DataType> = [
    {
      width: 100,
      title: '#ID',
      align: 'center',
      dataIndex: 'id',
    },
    {
      width: 100,
      title: 'Exchange',
      align: 'center',
      dataIndex: 'exchange',
    },
    {
      width: 100,
      title: 'Account',
      align: 'center',
      dataIndex: 'account',
    },
    {
      width: 100,
      title: 'Api Key',
      align: 'center',
      dataIndex: 'api_key',
    },
    {
      width: 100,
      title: 'Whitelist IP',
      align: 'center',
      dataIndex: 'whitelist_ip',
    },
    {
      title: '',
      width: 80,
      align: 'center',
      dataIndex: 'id',
      render: (_, record: { id: string }) =>
        <Button variant="text" onClick={() => GoDetails(record.id)}>Details</Button>
    },
  ];

  return (
    <Grid item xs={12} mt={2}>
      <Table columns={columns} dataSource={rows} />
    </Grid>
  )
}

export default DxAccountTable