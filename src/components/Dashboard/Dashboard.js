import React from 'react';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';

 import ListClosedEvent from '../Evenement/ListEventTerminer';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Dashboard () {
  const classes = useStyles();

   return (
  <div className={classes.root}>
      <Grid container  spacing={4}> 
         
        
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <ListClosedEvent/>
        </Grid>
        </Grid>
   </div>
  );
 }
