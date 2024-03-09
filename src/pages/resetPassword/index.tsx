
import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik'; // import useFormik hook
import classes from './Styles.module.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '@app/assets/images/header-logo.png';
import { getLoginPageUrl } from '@app/routing/routingConstants/AppUrls';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useValidations } from '@app/lib/hooks/useValidation';
import AuthService from '@app/services/AuthService';
import { toast } from 'react-toastify';
import { LocaleContext } from '@app/routing/LanguageRouter';
import { useTranslation } from 'react-i18next';


const ResetPasswordPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const payload = urlSearchParams.get('payload');
    //if the type is '1' meaning this is confirm email token
    // check if the token that returns in url in "payload" param is valid or not
    const handleVerifyToken = async () => {
        try {
            const res = await AuthService.verifyToken({ payload: payload });
            toast.success(res?.data?.message);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // Handle 400 error response
                toast.error(error?.response?.data?.message || 'Invalid token');
                navigate(-1)
                console.log('Error 400: Bad Request');
            } else {
                // Handle other error responses
            }
        }
    };
    useEffect(() => {
        handleVerifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);
    const handleSubmit = async () => {
        const data = {
            newPassword: formik.values.password,
            token: payload
        }
        const res = await AuthService.resetPassword(data);
        toast.success(res?.data?.message || 'Password reset successfully')
        navigate(getLoginPageUrl(locale))
    }
    const { validations } = useValidations();
    const defaultData = {
        password: '',
        confirmPassword: '',
    }
    const validationSchema = Yup.object().shape({
        password: validations.password,
        confirmPassword: validations.passwordConfirmation,
    });

    const formik = useFormik({
        initialValues: defaultData,
        onSubmit: handleSubmit,
        validationSchema,
    });
    return (
        <div className={classes.formWrapper}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, mb: 2 }}
            >
                <img src={logo} alt="kibreet logo" loading="lazy" />
            </Typography>
            <Card className={classes.formCard}>
                <CardContent className={classes.cardContent}>
                    <Typography sx={{ fontWeight: 'bold', mt: 0 }} variant="h5" component="div">
                        Reset Password
                    </Typography>
                    <Typography sx={{ mb: 5 }} color="text.secondary">
                        Please reset password
                    </Typography>
                    <form className={classes.formClass} onSubmit={formik.handleSubmit}>

                        <Typography variant="h5" component="div">
                            <TextField
                                className={classes.inputField}
                                name="password"
                                label={t('Password')}
                                variant="outlined"
                                type="password"
                                defaultValue={formik.values?.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <div className={classes.error}>
                                {formik.errors?.password && formik.touched?.password && (
                                    <li> {formik.errors?.password}</li>
                                )}
                            </div>
                        </Typography>
                        <Typography variant="h5" component="div">
                            <TextField
                                className={classes.inputField}
                                name="confirmPassword"
                                label={t('Confirm_Password')}
                                variant="outlined"
                                type="password"
                                defaultValue={formik.values?.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className={classes.error}>
                                {formik.errors?.confirmPassword && formik.touched?.confirmPassword && (
                                    <li> {formik.errors?.confirmPassword}</li>
                                )}
                            </div>
                        </Typography>

                        <CardActions>
                            <Button variant="contained" className={classes.formBtn} type="submit" disabled={!formik.errors}>
                                Send
                            </Button>
                        </CardActions>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
};
export default ResetPasswordPage;