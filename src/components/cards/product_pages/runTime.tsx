// material-ui  Box,
import { Chip, ChipProps, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  title: string;
  count?: string;
  percentage?: number;
  isLoss?: boolean;
  color?: ChipProps['color'];
  // extra: string;
}

const RunTime = ({ color = 'primary', title, count, percentage, isLoss, }: Props) => {
  // const dispatch = useDispatch()
  // console.log("id", id)

  // useEffect(() => {
  //   const params = {
  //     tra_id: id,
  //     type: 'openOrder',
  //     token: getToken().token

  //   }
  //   dispatch(getOpenOrders(params))
  // }, [dispatch])

  // const GoDeltail = (env: any) => {
  //   console.log("点击", env.target.id)

  // }

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

export default RunTime;
