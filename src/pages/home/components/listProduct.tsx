

// material-ui
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import FrameAvatar from 'assets/homeConnect/FrameAvatar.png'
import ReadPage from './read';



// third party

// assets

// ==============================|| LANDING - HEADER PAGE ||============================== //


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}


// 定义要覆盖默认的 table 背景元素的组件
const components = {
  table: (props: any) => {
    const { style } = props;
    const customStyle = {
      ...style,
      backgroundColor: "#fff", // 设置表格的背景颜色
      padding: '0px 12px',
    };
    return <table {...props} style={customStyle} />;
  },
  header: {
    // 自定义头部行组件
    wrapper: (props: any) => (
      <thead style={{ color: '#9b9b9b', fontSize: '13px', borderBottom: '1px solid #f0f0f0' }}>
        {props.children}
      </thead>
    ),
  },
};
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    fixed: 'left',

    render: (_, record) => (
      <>
        <Stack direction="row" textAlign="center" width="100%" spacing={1} alignItems="center">
          <Avatar src={FrameAvatar} />
          <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700 }}  >
            {record.name}
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ color: '#9b9b9b', fontWeight: 700 }}  >
            ETF
          </Typography>
        </Stack>
      </>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'age',
    align: 'center',
    key: 'age',
    width: 80,
    render: (_, _record) => (
      <>
        <Box component="div" sx={{ backgroundColor: '#f6f6f6', margin: '0 10px', borderRadius: '10px', fontWeight: 700, textAlign: 'center' }}>
          Index
        </Box>
      </>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: 100,
    render: (_, record) => (
      <>
        <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700 }}  >
          {`$${record.age}`}
        </Typography>
      </>
    )

  },
  {
    title: '24h Change',
    key: 'tags',
    dataIndex: 'tags',
    align: 'center',
    width: 100,
    render: (_, record) => (
      <>
        <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700 }}  >
          {`+${record.age}%`}
        </Typography>
      </>
    ),
  },
  {
    title: 'APY',
    key: 'action',
    align: 'center',
    width: 100,
    render: (_, _record) => (
      <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700 }}  >
        {`4.08%`}
      </Typography>
    ),
  },
  {
    title: 'TVL',
    key: 'action',
    align: 'center',
    width: 150,
    render: (_, _record) => (
      <Typography variant="body1" textAlign="center" sx={{ color: '#000', fontWeight: 700 }}  >
        $36.50M
      </Typography>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Crypto ETF Full Name',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Crypto ETF Full Name',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Crypto ETF Full Name',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

type TypeProps = {
  windowWidth: number
}

const ConnectPage = ({ windowWidth }: TypeProps) => {

  return (

    <Box sx={{ width: '100%', backgroundColor: '#f6f6f6', pb: '30px' }}>


      <Box sx={windowWidth >= 600 ? { width: '80%', margin: '0 auto' } : { width: `${windowWidth}px`, pl: '1rem', pr: '1rem' }} >
        <Stack sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Box sx={{ '& .ant-table-wrapper .ant-table-cell': { borderBottom: '1px solid #c0c0c0 ', padding: '8px 0px' }, '& .ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:first-child': { paddingLeft: 1 } }}>
              <Typography variant="body1" textAlign="start" sx={{ color: '#000', fontWeight: 700, ml: 1, mt: 8, mb: 1 }}  >
                All Product
              </Typography>
              <Table columns={columns} dataSource={data} components={components} scroll={{ x: 815 }} />


            </Box>
          </Grid>
        </Stack>
        <ReadPage windowWidth={windowWidth} />
      </Box>
    </Box>
  );
};

export default ConnectPage;
