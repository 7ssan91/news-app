import React from 'react';
import { Grid } from '@mui/material';
import classes from './Styles.module.scss';
import { useTranslator } from '@app/lib/hooks/useTranslator';


const DashboardPage = (): JSX.Element => {
  const { __T } = useTranslator()
  return (
    <div className={classes.dashboardWrapper}>
      <Grid container>
        {__T('Dashboard')}
      </Grid>
    </div>
  );
};

export default DashboardPage;