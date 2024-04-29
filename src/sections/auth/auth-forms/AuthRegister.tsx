import { useEffect, useState, SyntheticEvent } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// types
import { StringColorProps } from 'types/password';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch } from 'store';
import { checkedInvitation } from 'store/reducers/checkInvitation';
import { AddAccounts } from 'store/reducers/addAccounts';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl'

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  // const { firebaseRegister } = useAuth();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const intl = useIntl()

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      {contextHolder}
      <Formik
        initialValues={{
          firstname: '',
          // lastname: '',
          email: '',
          code: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required(`${intl.formatMessage({ id: "sign-user-required" })}`),
          code: Yup.string().max(255).required(`${intl.formatMessage({ id: "sign-Invitation-code-required" })}`),
          email: Yup.string().email(`${intl.formatMessage({ id: "email-error" })}`).max(255).required(`${intl.formatMessage({ id: "sign-email-required" })}`),
          password: Yup.string().max(255).required(`${intl.formatMessage({ id: "sign-password-required" })}`)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            const params = {
              code: values.code
            }

            const params1 = {
              user_name: values.email,
              password: values.password
            }

            const res = await dispatch(checkedInvitation(params))
            const acc_res = await dispatch(AddAccounts(params1))
            messageApi.open({
              type: 'success',
              content: `${intl.formatMessage({ id: "sign-success" })}`,
            });
            navigate('/login')

            console.log('检查邀请码', res)
            console.log('增加账户', acc_res)





            // await firebaseRegister(values.email, values.password).then(
            //   () => {
            //     // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
            //     // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
            //     // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
            //     // github issue: https://github.com/formium/formik/issues/2430
            //   },
            //   (err: any) => {
            //     setStatus({ success: false });
            //     setErrors({ submit: err.message });
            //     setSubmitting(false);
            //   }
            // );
          } catch (err: any) {
            console.error(err);
            messageApi.open({
              type: 'error',
              content: `${intl.formatMessage({ id: "sign-Invitation-code-correct" })}`,
            });
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup"><FormattedMessage id="sign-user-name" /></InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup"><FormattedMessage id="sign-invitation-code" /></InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.code && errors.code)}
                    id="company-signup"
                    type="code"
                    value={values.code}
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={`${intl.formatMessage({ id: "sign-enter-invitation-code" })}`}
                  />
                  {touched.code && errors.code && (
                    <FormHelperText error id="helper-text-company-signup">
                      {errors.code}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup"><FormattedMessage id="sign-email-address" /></InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup"><FormattedMessage id="sign-password" /></InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    <FormattedMessage id="sign-create-account" />
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"><FormattedMessage id="sign-up" /></Typography>
                </Divider>
              </Grid>
              {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
