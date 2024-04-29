import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  // Link,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useAuth from 'hooks/useAuth';
// import useScriptRef from 'hooks/useScriptRef';
// import FirebaseSocial from './FirebaseSocial';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch } from 'store';
import { goLogin } from 'store/reducers/login';
import { isAuth } from 'utils/token';

// ============================|| FIREBASE - LOGIN ||============================ //

// type Values = {
//   email: string;
//   password: string;
//   submit: null;
// }

// type LoginData = {
//   name: string
//   token: string
// }
// type Login = {
//   status: number,
//   data: LoginData
// }

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const [capsWarning, setCapsWarning] = React.useState(false);

  const { login } = useAuth();

  const intl = useIntl();
  // const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {

  // }, [i18n])

  // const onSubmit = (values: Values) => {
  //   console.log('登录', values.email, values.password)
  //   const params = {
  //     name: values.email,
  //     password: values.password
  //   }
  //   dispatch(goLogin(params))
  //   console.log('登录成功')
  //   if (res.)
  // }

  // const { t, i18n } = useTranslation()

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(`${intl.formatMessage({ id: 'email-error' })}`)
            .max(255)
            .required(`${intl.formatMessage({ id: 'login-email-required' })}`),
          password: Yup.string()
            .max(255)
            .required(`${intl.formatMessage({ id: 'login-password-required' })}`)
        })}
        // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        //   // try {
        //   //   await firebaseEmailPasswordSignIn(values.email, values.password).then(
        //   //     () => {
        //   //       // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
        //   //       // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
        //   //       // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        //   //       // github issue: https://github.com/formium/formik/issues/2430
        //   //     },
        //   //     (err: any) => {
        //   //       setStatus({ success: false });
        //   //       setErrors({ submit: err.message });
        //   //       setSubmitting(false);
        //   //     }
        //   //   );
        //   // } catch (err: any) {
        //   //   console.error(err);
        //   //   if (scriptedRef.current) {
        //   //     setStatus({ success: false });
        //   //     setErrors({ submit: err.message });
        //   //     setSubmitting(false);
        //   //   }
        //   // }
        //   try {
        //     await
        //   }
        // }}

        // onSubmit={(values) => onSubmit(values)}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const params = {
              name: values.email,
              password: values.password
            };
            console.log('params', isAuth());
            await dispatch(goLogin(params));
            if (isAuth()) {
              console.log('传参');
              await login(isAuth());
              navigate('/debot/home', { replace: true });
            }

            // navigate('/product/product_1', { replace: true })
          } catch (e) {
            const error = e;
            console.log('error', error);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">
                    <FormattedMessage id="login-email-address" />
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={`${intl.formatMessage({ id: 'login-enter-email-address' })}`}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">
                    <FormattedMessage id="login-password" />
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(event: React.FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
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
                    placeholder={`${intl.formatMessage({ id: 'login-enter-password' })}`}
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      <FormattedMessage id="login-caps-lock" />
                    </Typography>
                  )}
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">
                        <FormattedMessage id="login-keep-me-sign-in" />
                      </Typography>
                    }
                  />
                  <Link variant="h6" component={RouterLink} to={'/forgot-password'} color="text.primary">
                    <FormattedMessage id="login-forget-password" />
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    <FormattedMessage id="lang-login" />
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">
                    {' '}
                    <FormattedMessage id="lang-login" />
                  </Typography>
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

export default AuthLogin;
