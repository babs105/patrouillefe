import React from 'react';
import { makeStyles } from '@material-ui/core/styles';  
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RapportPatrouille from './Patrouille/PatrouilleListComponent';
import RapportRemorquage from './Remorquage/RapportRemorquage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

export default function Dashboard () {
  const classes = useStyles();

  return (
    <div
    //  className={classes.root}
     >
      <Grid container
        spacing={5}
      >
   
     

       
       
        <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xl={3}
          xs={12}
        >
        </Grid>
       
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={3}
          xs={12}
        >
          < RapportPatrouille/>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={3}
          xs={12}
        >
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xl={3}
          xs={12}
        >
           <RapportRemorquage/>
        </Grid>
         <Grid item
          lg={6}
          md={6}
          sm={6}
          xl={12}
          xs={12}>
             
          
          
      </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xl={12}
          xs={12}> 
             
           
        </Grid>
        
      </Grid>
    </div>
  );
}
