import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
//material ui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
//assets
// import logo from '@app/assets/images/header-logo.png';
//actions
import { setLoginUser } from '@app/store/auth/AuthSlice';
//selectors
import { getIsLoginLoading } from '@app/store/auth/AuthSelectors';
import {
  getForgetPasswordPageUrl,
} from '@app/routing/routingConstants/AppUrls';
import { LocaleContext } from '@app/routing/LanguageRouter';
import { useAppDispatch, useAppSelector } from '@app/lib/hooks/useStore';
import { InputField } from '@app/ui/InputField';
import Button from '@app/ui/Button/Button';
import { Grid } from '@mui/material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => getIsLoginLoading({ state }));
  const { locale } = useContext(LocaleContext);

  //if user logged in and the companyId that returns in token less than or equal "0"
  //user will redirect to register-company to complete the steps
  const loginUser = () => {
    dispatch(setLoginUser({ email, password }));
  };

  return (

    <Grid container item>
      <Grid item sm={12} md={7} textAlign={'center'} overflow={'hidden'}>
        <div className={styles.formWrapper}>
          <Card className={styles.formCard} >
            <CardContent className={styles.cardContent}>
              <Typography fontWeight={'bold'} mb={3} variant="h4" component="h1" color={'var(--primary-color)'}>
                Login Account
              </Typography>
              <Typography mb={4} color={'var(--text-color)'} variant='h5'>
                Sign in to your account
              </Typography>
              <Grid item sm={12} mb={2}>
                <InputField
                  className={styles.inputField}
                  id="outlined-basic1"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  bgColor='#F7F7F7'
                />
              </Grid>
              <Grid item sm={12} mb={2}>
                <InputField
                  className={styles.inputField}
                  id="outlined-basic2"
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  label='Password'
                  bgColor='#F7F7F7'
                />

              </Grid>
              <CardActions className={styles.cardActions}>
                <Grid item sm={6} textAlign={'start'}>
                  <div>
                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16, color: '#62727D' } }} />
                    <span className={styles.rememberMe}>Remember me</span>
                  </div>
                </Grid>
                <Grid item sm={6} textAlign={'end'}>

                  <Button
                    to={getForgetPasswordPageUrl(locale)}
                  >
                    Forgot password
                  </Button>
                </Grid>
              </CardActions>
              <Button onClick={loginUser}
                style={{ width: '100%' }}
                disabled={isLoading || !email || !password}
                label={'login'}
                buttonStyle='primary'
                size='md'
                cases='upper'
                rounded='md'
              />
            </CardContent>
          </Card>

        </div>
      </Grid>
      <Grid item sm={12} md={5} display={{ xs: "none", lg: "block" }}>
        <div className={styles.formBg}>
          <div className={styles.overlayText}>
            <Typography textTransform={'uppercase'} sx={{ fontWeight: 'bold', mt: 3 }} variant="h2" component="h1" color={'var(--white-color)'}>
              Welcome back
            </Typography>
            <Typography color={'var(--white-color)'} variant='h5'>
              Sign in to your account
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
