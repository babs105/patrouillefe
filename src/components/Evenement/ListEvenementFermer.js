import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';  
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { Grid,TextField } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';    
import {evenementService} from '../../service/evenementService';
import { history } from '../../routage/ExtBrowserRouter';
import { useState, useEffect } from 'react';

import {Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';

// import {ExportXlsx} from './ExportXlsx';
import Loader from '../loader/Loader';
  
const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight:500,  
    width:'100%', 
  },
  formControl: {
  width:200,
  },
  textField:{
    width:200,
    
  }  
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
let intervalID;
export default function MatPaginationTable() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data1, setData1] = useState([]);  
  const [heureFermetureEvement,setHeureFermetureEvement] = useState('');
  const [idEvent,setIdEvent] = useState('');
  const [action,setAction] = useState('');
  const [loader,setLoader] = useState(false)
  const [alertOpen,setAlertOpen]= useState(false);
  const [message,setMessage] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
          setLoader(true)
          intervalID = setInterval(
            () => {  
              loadAllEvenementTerminer();
            
              
                    },
            10000
          );
          
                 
        
}, []); 
useEffect(() => {
  return () => {
    clearInterval(intervalID);
  }
}, []);

const loadAllEvenementTerminer = () => {
 setLoader(true)
  evenementService.getAllEvenementTerminer()
  .then((res) => {
      setData1(res);
      setLoader(false)
      console.log(data1);  
  });   
}

 const handleOpen = (idEvent) => {
    setIdEvent(idEvent);
    setAlertOpen(true);
    };  

const handleClose = () => {
      setAlertOpen(false);
      // loadAllEvenementEnCoursToAssister();
      //  history.push('/app/evenement');
     // window.location.reload();
    
    };  

  
  const onChangeHeure = event => {  
    setHeureFermetureEvement(event.target.value);  
  
  };
//   const onChangeCategorie = event => {  
//     setCategorie(event.target.value);  
  
//   };
  const onChangeAction = event => {  
    setAction(event.target.value);  
  };



  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  }; 
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };
//   const onSearchInputChange = (event) => {
//     console.log("Search changed ..." + event.target.value)
//     if (event.target.value) {
//         // this.setState({searchString: event.target.value})
//         evenementService.searchPatrouilleByImmatricule(event.target.value)
//         .then((res) => {
//             console.log("result",res);
//             setData1(res);
//             setLoader(false)
//             console.log("FOUND",data1);  
//         }); 
//     } else {
//       setLoader(true)
//       evenementService.getAllEvenementEnCoursToAssister()
//       .then((res) => {
//           setData1(res);
//           setLoader(false)
//           console.log(data1);  
//       });  
        
//     }
   
// };
const closeEvent = () =>{
      let data = {
        idEvent:idEvent,
        heureFermetureEvement:heureFermetureEvement
      }
  evenementService.closeEvent(data)
  .then((res) => {
    if(res.error){
      setMessage("Erreur Erreur  réesseyez");
    }else{
      setMessage("Evenement fermé avec succes");
    }
  
}); 
    // console.log("data",data);
  
}
const toRemorquer = () =>{
    let data = {
      idEvent:idEvent,
      action:action,
   }
//    evenementService.toRemorquer(data)
//     .then((res) => {
//       if(res.error){
//         setMessage("Erreur Erreur  ");
//       }else{
//         setMessage(" Evenement à remorquer avec succes");
//       }
    
//   }); 
    console.log("data",data);
  
  }




   const addEvenement = () =>{
    window.localStorage.removeItem("idEvent");
    history.push('/app/add-event');
  }
  const editEvenement= (id) =>{
  window.localStorage.setItem("idEvent", id);
  history.push('/app/edit-event');
 }
let i=0;
  
  return (  
   
      <Grid>
    {/* <Typography variant="h4"  style={style}> Evenements</Typography> */}

    {/* <Button variant="contained" color="primary" onClick={addEvenement}> 
        Ouvrir Evenement
   </Button> */}
   {/* <Grid container alignItems="center" justify="center" >
   <Paper>
   <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Rechercher"  
                            onChange={onSearchInputChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <SearchIcon />
                                </InputAdornment>
                               )
                              }}
                            />
                     <ExportXlsx csvData={data} fileName={"Liste-Patrouilles"}/>          
    </Paper>
     </Grid> */}
  
  
    <Paper  style={{marginTop:'20px'}}className={classes.root}>  
    <Typography variant="h5"  style={style}>Evenements Fermés</Typography>
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
        <TableRow>
        <TableCell align="center">N°: </TableCell>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="center">HEURE DEBUT  </TableCell>
            <TableCell align="center">NATURE EVENEMENT</TableCell>
            <TableCell align="center">PK </TableCell>
            <TableCell align="center">CATEGORIE </TableCell>
            <TableCell align="center">SECTEUR </TableCell>
        </TableRow>
          </TableHead>  
          <TableBody>  
          {loader ?
       <Grid container alignItems="center" justify="center" >
               
    <Grid item >
      <Paper className={classes.paper } >
       {/* <div className={classes.margin}>
       <Loader/>
       </div> */}
    </Paper>
    </Grid>
   </Grid>:(
            data1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
                <TableRow key={row.id}>
                  <TableCell align="center">{i=i+1}</TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.dateDebutEvent}
                </TableCell>
                <TableCell align="center">{row.heureDebutEvent}</TableCell>
                <TableCell align="center">{row.typeEvenement}</TableCell>
                <TableCell align="center">{row.pointKilometrique}</TableCell>
                <TableCell align="center">{row.categorieV}</TableCell>
                <TableCell align="center">{row.secteur}</TableCell> 
                <TableCell align="right" > <Button variant="contained" color="primary" onClick={()=>handleOpen(row.id)}> 
        Suivre
   </Button></TableCell>
                <TableCell align="right" onClick={() => editEvenement(row.id)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deletePatrouille(row.id)}><DeleteIcon /></TableCell> 
            </TableRow>
                 
              );  
            })  

   )}
          </TableBody>  
        </Table>  
      </TableContainer>  
      <TablePagination  
        rowsPerPageOptions={[5, 10, 15]}  
        component="div"  
        count={data1.length}  
        rowsPerPage={rowsPerPage}  
        page={page}  
        onChangePage={handleChangePage}  
        onChangeRowsPerPage={handleChangeRowsPerPage}  
      />  
    </Paper>  
       <Dialog open={alertOpen}
                onClose={handleClose}
                >
                <DialogTitle id="alert-dialog-title">{"SUIVI EVENEMENT"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {message}
                </DialogContentText>
                <form >
                    <Grid container justify="center" spacing={4}>
                    <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='action'>Action à Faire</InputLabel>
                                <Select  
                                    name='action'
                                    id='action'  
                                    value={action} 
                                    onChange={onChangeAction}
                                   
                                    >
                                  <MenuItem value="Remorquer" key={1} name="action">Remorquer</MenuItem>
                                  <MenuItem value="Fermer" key={2} name="action">Fermer</MenuItem>  
                                 
                            
                               
                            </Select>
                        </FormControl> 
                    </Grid>
                    {action === 'Fermer' ?
                    ( 
                    <div> 
                    <Grid item md={12}  sm={12} xs={12}>
                        <TextField
                                id="heureFermetureEvement"
                                variant="outlined"
                                label="Heure Fin Evenement"
                                name="heureFermetureEvement"
                                type="time"
                                value={heureFermetureEvement}
                                onChange={onChangeHeure}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            /> 
                    </Grid>
                     </div> 
                    ): 
                    null }
               
                    </Grid>
                    <Grid container justify="center" style={{marginTop:'10px'}} spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color ="primary" fullWidth onClick={action === 'Fermer'? closeEvent :toRemorquer} >Valider</Button>
                       </Grid>
                    </Grid>
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );  
} 


    