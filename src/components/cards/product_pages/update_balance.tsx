// material-ui  Box,
import { Chip, ChipProps, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Input, message, Modal } from 'antd';
// import { getToken } from 'utils/token';
// import { updateOriBalance } from 'store/reducers/updateBalance';
// import { useDispatch } from 'store';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  title: string;
  count?: string;
  percentage?: number;
  isLoss?: boolean;
  color?: ChipProps['color'];
  router: string
  value: string
  name: string
  // extra: string;
}

const UpdateOriBalance = ({ color = 'primary', title, count, percentage, isLoss, router, value, name }: Props) => {
  // const dispatch = useDispatch()
  // console.log("id", id)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    setIsModalOpen(false);
    if (balance.length !== 0) {
      // console.log('name', name, balance)
      // const params = {
      //   type: 'updateBalance',
      //   token: getToken().token,
      //   tra_id: name,
      //   ori_balance: balance
      // }
      // dispatch(updateOriBalance(params))
      messageApi.open({
        type: 'success',
        content: '添加账户份额成功',
        style: {
          marginTop: '20vh',
        },
      });
      setBalance('')
    } else {
      messageApi.open({
        type: 'error',
        content: '添加账户份额失败',
        style: {
          marginTop: '20vh',
        },
      });
      setBalance('')
    }


  };

  // useEffect(() => {
  //   const params = {
  //     tra_id: id,
  //     type: 'openOrder',
  //     token: getToken().token

  //   }
  //   dispatch(getOpenOrders(params))
  // }, [dispatch])
  const GoDeltail = (env: any) => {
    // console.log("点击", env.target.id)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setBalance('')
  };

  const balanceChange = (value: any) => {
    setBalance(value.target.value)
  }

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit" display="initial">
              {count}
            </Typography>
          </Grid>
          {contextHolder}
          <Grid item>
            <Stack spacing={1} alignItems="flex-end">
              {/* <Typography variant="h4" color="#3f8600" display="initial">
              {count}
            </Typography> */}
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input addonBefore="账户份额" defaultValue="账户份额" value={balance} onChange={(value) => balanceChange(value)} style={{ marginBottom: '4px' }} allowClear />
              </Modal>
              <Typography
                component={Link}
                to={router}
                color="InfoText"
                variant="h6"
                textAlign="center"
                display="initial"
                onClick={(env) => GoDeltail(env)}
                id={name}
              // sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
              >
                {value}
              </Typography>
            </Stack>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      {/* <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        You made an extra{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Box> */}
    </MainCard>
  )

};

export default UpdateOriBalance;
