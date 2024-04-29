// material-ui  Box,
import { Chip, ChipProps, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'store';
import { isAdmin } from 'utils/token';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  title: string;
  count?: string;
  percentage?: number;
  isLoss?: boolean;
  color?: ChipProps['color'];
  router: string
  value: string
  id?: string
  // extra: string;
}

const Accounts = ({ color = 'primary', title, count, percentage, isLoss, router, value, id }: Props) => {
  // const dispatch = useDispatch()
  // console.log("id", id)



  const GoDeltail = (env: any) => {
    // console.log("点击", env.target.id)
    // const params = {
    //   tra_id: env.target.id,
    //   type: 'account',
    //   token: getToken().token

    // }
    // dispatch(getAssets(params))
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
          {
            isAdmin() ? (
              <Grid item>
                <Stack spacing={1} alignItems="flex-end">
                  {/* <Typography variant="h4" color="#3f8600" display="initial">
              {count}
            </Typography> */}
                  <Typography
                    component={Link}
                    to={router}
                    color="InfoText"
                    variant="h6"
                    textAlign="center"
                    display="initial"
                    onClick={(env) => GoDeltail(env)}
                    id={id}
                  // sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline', textDecoration: 'none' }}
                  >
                    {value}
                  </Typography>
                </Stack>
              </Grid>
            ) : (
              <></>
            )
          }
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

export default Accounts;
