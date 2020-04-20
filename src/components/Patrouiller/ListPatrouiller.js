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
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';    
import {patrouillerService} from '../../service/patrouillerService';
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
  textField:{
    width:200,
    
  }  ,
  widthDialog:{
    width:300,
  } 
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default function ListPatrouille() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);  
  const [kilometrageFinPatrouille,setKilometrageFinPatrouille] = useState(0);
  const [heureFinPatrouille,setHeureFinPatrouille] = useState('');
  const [idPatrouiller,setIdPatrouiller] = useState();
  const [date,setDate] = useState();
  const [loader,setLoader] = useState(false)
  const [alertOpen,setAlertOpen]= useState(false);
  const [message,setMessage] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
          setLoader(true)
          loadAllPatrouillerEnCours();
            // patrouillerService.getAllPatrouillerEnCours()
            // .then((res) => {
            //     setData(res);
            //     setLoader(false)
            //     console.log(data);  
            // });           
        
}, []); 

const handleClose = () => {
  setAlertOpen(false);
  loadAllPatrouillerEnCours();
  // history.push('/app/patrouiller');

};  

const loadAllPatrouillerEnCours = () => {
  setLoader(true)
  patrouillerService.getAllPatrouillerEnCours()
  .then((res) => {
      //  if(res.equipePatrouille.)
      setData(res);
      setLoader(false)
      console.log(data);  
  });   
}

const handleOpen = (idPatrouiller) => {
  setIdPatrouiller(idPatrouiller);
  setAlertOpen(true);
};  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  const onChangeKilometrage = event => {  
    setKilometrageFinPatrouille(event.target.value);  
  
  };
  const onChangeHeure = event => {  
    setHeureFinPatrouille(event.target.value);  
  
  };
  const onChangeDate = event => {  
    setDate(event.target.value);  
  
  };
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };
  const onSearchInputChange = (event) => {
    console.log("Search changed ..." + event.target.value)
    if (event.target.value) {
        // this.setState({searchString: event.target.value})
        patrouillerService.searchPatrouilleByImmatricule(event.target.value)
        .then((res) => {
            console.log("result",res);
            setData(res);
            setLoader(false)
            console.log("FOUND",data);  
        }); 
    } else {
      setLoader(true)
      patrouillerService.getAllPatrouillerEnCours()
      .then((res) => {
          setData(res);
          setLoader(false)
          console.log(data);  
      });  
        
    }
   
};
const terminerPatrouiller = () =>{
  let data = {
     idPatrouille:idPatrouiller,
     dateFin:date,
     heureFinPatrouille:heureFinPatrouille,
     kilometrageFinPatrouille:kilometrageFinPatrouille
  }
  patrouillerService.terminerPatrouiller(data)
  .then((res) => {
    if(res.error){
      setMessage("Erreur Erreur réssèyez  plutard ");
    }else{
      setMessage("Patrouille Terminée avec succes");
    }
  
}); 
  
  
}
   const addPatrouiller = () =>{
    window.localStorage.removeItem("idPatrouiller");
    history.push('/app/add-patrouiller');
  }
  const editPatrouilleur= (id) =>{
  window.localStorage.setItem("idPatrouille", id);
  history.push('/app/edit-patrouilleur');
 }
let i=0;
  
  return (  
   
      <div>
    <Typography variant="h4"  style={style}>Liste des Patrouilles</Typography>

    <Button variant="contained" color="primary" onClick={addPatrouiller}> 
        Débuter Patrouille
   </Button>
   <Grid container alignItems="center" justify="center" >
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
                    {/* <ExportXlsx csvData={data} fileName={"Liste-Patrouilles"}/>          */}
    </Paper>
     </Grid>
  
  
    <Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
        <TableRow>
        <TableCell align="center">N°: </TableCell>
            <TableCell align="center">DATE  </TableCell>
            <TableCell align="center">HEURE DEBUT  </TableCell>
            <TableCell align="center">MATRICULE VEHICULE</TableCell>
            <TableCell align="center">ITINERAIRE </TableCell>
            <TableCell align="center">KILOMETRAGE DEBUT </TableCell>
            <TableCell align="center">PATROUILLEUR 1 </TableCell>
            <TableCell align="center">PATROUILLEUR 2 </TableCell>
        </TableRow>
          </TableHead>  
          <TableBody>  
          { loader ?
       <Grid container alignItems="center" justify="center" >
               
    <Grid item >
      <Paper className={classes.paper } >
       <div className={classes.margin}>
       <Loader/>
      
       </div>
    </Paper>
    </Grid>
   </Grid>:(
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
                <TableRow key={row.id}>
                  <TableCell align="center">{i=i+1}</TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.dateDebut}
                </TableCell>
                <TableCell align="center">{row.heureDebutPatrouille}</TableCell>
                <TableCell align="center">{row.matriculeVehicule}</TableCell>
                <TableCell align="center">{row.itineraire}</TableCell>
                <TableCell align="center">{row.kilometrageDebutPatrouille}</TableCell>
                <TableCell align="center">{row.equipePatrouille.patrouilleurs[0].firstName}</TableCell>
                <TableCell align="center">{row.equipePatrouille.patrouilleurs[1].firstName}</TableCell>
                <TableCell align="right" > <Button variant="contained" color="primary" onClick={()=>handleOpen(row.id)}> 
        Terminer Patrouille
   </Button></TableCell>
                <TableCell align="right" onClick={() => editPatrouilleur(row.id)}><CreateIcon /></TableCell>
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
        count={data.length}  
        rowsPerPage={rowsPerPage}  
        page={page}  
        onChangePage={handleChangePage}  
        onChangeRowsPerPage={handleChangeRowsPerPage}  
      />  
    </Paper>  
       <Dialog open={alertOpen}
                onClose={handleClose}
                >
                <DialogTitle id="alert-dialog-title">{"TERMINER PATROUILLE"}</DialogTitle>
                <DialogContent className={classes.widthDialog}>
                <DialogContentText id="alert-dialog-description">
                {message}
                </DialogContentText>
                <br/>
                <form >
                    <Grid container justify="center" spacing={4} >
                    <div>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                                id="datePatrouille"
                                variant="outlined"
                                label="Date Patrouille"
                                name="date"
                                type="date"
                                value={date}
                                onChange={onChangeDate}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />      
                    </Grid>
                    <br/>
                    <Grid item md={12}  sm={12} xs={12}>
                        <TextField
                                id="heureFinPatrouille"
                                variant="outlined"
                                label="Heure Fin Patrouille"
                                name="heureFinPatrouille"
                                type="time"
                                value={heureFinPatrouille}
                                onChange={onChangeHeure}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            /> 
                    </Grid>
                    <br/>
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField 
                               className={classes.textField}
                                id="kilometragefin" 
                                variant="outlined" 
                                label="Kilometrage Fin "
                                type="number" 
                                name="kilometrageFinPatrouille" 
                                value={kilometrageFinPatrouille}
                                onChange={onChangeKilometrage} 
                                required 
                             />
                        </Grid>
                        </div>
                    </Grid>  
                    <br/>
                    <Grid container justify="center" spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={terminerPatrouiller} >Valider</Button>
                       </Grid>
                    </Grid>
                    
           
                </form>
                <br/>
                </DialogContent>
               
                <DialogActions>
                <Typography variant="h6"style={{ color:'green'}}>
                {this.state.message}
                </Typography>
                <Button onClick={handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );  
} 


    