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
import ListEventForAssistance  from './ListEventAssister';
import ListEventForRemorquage from './ListEventForRemor';
import ListEventAdeBaliser from './ListEventAdeBaliser';
import ListEventFermer from './ListEvenementFermer';

import {userService} from '../../service/userService';
// import {ExportXlsx} from './ExportXlsx';
import Loader from '../loader/Loader';
  
const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    // height:'100%',  
    // width:'100%', 
  },
  formControl: {
  width:200,
  },
  textField:{
    width:200,

    
  }  ,
  widthDialog:{
    width:300,
    
  }
});  

let intervalID;
export default function ListCurrentEvent() {  
  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  const [data, setData] = useState([]); 
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [typeEvent,setTypeEvent] =  useState('');
  const [heureBalisage,setHeureBalisage] = useState('');
  const [matriculeVehicule,setMatriculeVehicule] = useState('');
  const [categorie,setCategorie] = useState('');
  const [originePanne,setOriginePanne] = useState('');
  const [action,setAction] = useState('');
  const [sens,setSens] = useState('');
  const [heureFinEvent,setHeureFinEvent] = useState('');
  const [autoroute,setAutoroute] = useState('');
  const [distance,setDistance] = useState('');
  const [operation,setOperation] = useState('');
  const [idEvent,setIdEvent] = useState('');
  const [motif,setMotif] = useState('');
  const [idPat,setIdPat] = useState('');
  const [loader,setLoader] = useState(false)
  const [alertOpen,setAlertOpen]= useState(false);
  const [dialogPanne,setDialogPanne]= useState(false);
  const [dialogAccident,setDialogAccident]= useState(false);
  const [message,setMessage] = useState('');
 

  useEffect(() => {    
          
        
          intervalID = setInterval(
            () => { 
              // getUserPatrouilleurById();
               loadAllEvenementEnCoursNoBaliser();
               loadAllEvenementEnCoursToAssister();
               loadAllEvenementEnCoursToRemorquer();
               loadAllEvenementAdeBaliser();
              console.log("reload");
                    },
                    10000
          );
          getUserPatrouilleurById();
          loadAllEvenementEnCoursNoBaliser();
          loadAllEvenementEnCoursToAssister();
          loadAllEvenementEnCoursToRemorquer();
          loadAllEvenementAdeBaliser();
          
        
        
},[]); 


useEffect(() => {
  return () => {
    clearInterval(intervalID);
  }
}, []);


const getUserPatrouilleurById = () => {
  userService.getUserById(window.localStorage.getItem('idUser'))
      .then(res => {
         let idPatrouille = res.idPatrouille;
         console.log("idPatrouille",idPatrouille);
        setIdPat(idPatrouille);
        
      }) ;
      
    };

const loadAllEvenementEnCoursNoBaliser = () => {
//  setLoader(true)
 
  evenementService.getAllEvenementEnCoursNoBaliser()
  .then((res) => {
      setData(res);
      //setLoader(false)
      // console.log("to balise",data);
     
  }); 

 
}

const loadAllEvenementEnCoursToAssister = () => {
  // setLoader(true)
   evenementService.getAllEvenementEnCoursToAssister()
   .then((res) => {
       setData1(res);
      //  setLoader(false)
       console.log("To assite",res);  
   });   
 }

 const loadAllEvenementEnCoursToRemorquer = () => {
  
   evenementService.getAllEvenementEnCoursToRemorquer()
   .then((res) => {
       setData2(res);
      //  setLoader(false);
       
   });   
 }
 const loadAllEvenementAdeBaliser = () => {
   evenementService.getAllEvenementAdeBaliser()
   .then((res) => {
       setData3(res);
      //  setLoader(false)
       console.log(data1);  
   });   
 }


const handleOpen = (idEvent,typeEvent) => {
  setIdEvent(idEvent);
  setTypeEvent(typeEvent);
  if(typeEvent==='PANNE'){
    setDialogPanne(true)
  }
  if(typeEvent==='ACCIDENT'){
    setDialogAccident(true)
  }
  setAlertOpen(true);
  setMessage('');
  setHeureBalisage('');
  setMatriculeVehicule('');
  setCategorie('');
  setOperation('');
  }; 
 
const handleClose = () => {
      setAlertOpen(false);
      setDialogPanne(false)
      setDialogAccident(false)
      // setMessage('recharger');
      // loadAllEvenementEnCoursNoBaliser();
      // loadAllEvenementEnCoursToAssister();
      // window.location.reload();
      // history.push('/app/evenement');
    };  

  
  const onChangeHeure = event => {  
    setHeureBalisage(event.target.value);  
  
  };
  const onChangeCategorie = event => {  
    setCategorie(event.target.value);  
  };
  const onChangeDistance = event => {  
    setDistance(event.target.value);  
  };
  const onChangeSens = event => {  
    setSens(event.target.value);  
  };
  const onChangeAutoroute = event => {  
    setAutoroute(event.target.value);  
  };
  const onChangeMatriculeVehicule = event => {  
    setMatriculeVehicule(event.target.value);  
  };
  const onChangeAction = event => {  
    setAction(event.target.value);  
  };
  const onChangeHeureFinEvent = event => {  
    setHeureFinEvent(event.target.value);  
  };
  const onChangeOriginePanne = event =>{
   setOriginePanne(event.target.vzlue)
  };
  const onChangeOperation = event => {  
    setOperation(event.target.value);  
  };
  const onChangeMotif = event => {  
    setMotif(event.target.value);  
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
//             setData(res);
//             setLoader(false)
//             console.log("FOUND",data);  
//         }); 
//     } else {
//       setLoader(true)
//       evenementService.getAllEvenementEnCours()
//       .then((res) => {
//           setData(res);
//           setLoader(false)
//           console.log(data);  
//       });  
        
//     }
   
// };
const baliserEvent = () =>{
  setLoader(true)

  let data = {

     idEvent:idEvent,
     idPatrouille:idPat,
     heureBalisage:heureBalisage,
     operation:operation,
     originePanne:originePanne,
     categorieVBalise:categorie,
     matriculeVehicule:matriculeVehicule
  }
  evenementService.baliserEvent(data)
  .then((res) => {
    if(res.error){
      setMessage(res.message);
      setLoader(false)
      console.log("RES",res)
    }else{
      setLoader(false)
      setMessage("BALISAGE AVEC SUCCES");
      console.log("RES",res)
    }
  
}); 
    //  console.log("data",data)
  
}
const annulerEvent = () =>{
  setLoader(true)
  let data = {
    idEvent:idEvent,
    action:action,
    motif:motif
 }
 evenementService.annulerEvent(data)
  .then((res) => {
    if(res.error){
      setMessage("Erreur Erreur annuler evenement ");
      setLoader(false)
    }else{
      setMessage("Evenement annulé  avec succes");
      setLoader(false)

    }
  
}); 
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
   
    <div>
    <Typography variant="h4" style={{ display: 'flex',justifyContent: 'center'}}> Evenements</Typography>

    <Button variant="contained" color="primary" onClick={addEvenement}> 
       Annoncer Evènement
   </Button>
  {/* //  <Grid container alignItems="center" justify="center" >
  //  <Paper>
  //  <TextField style={{padding: 24}}
  //                           id="searchInput"
  //                           placeholder="Rechercher"  
  //                           onChange={onSearchInputChange}
  //                           InputProps={{
  //                             endAdornment: (
  //                               <InputAdornment>
  //                                 <SearchIcon />
  //                               </InputAdornment>
  //                              )
  //                             }}
  //                           />
  //                   <ExportXlsx csvData={data} fileName={"Liste-Patrouilles"}/>         
  //   </Paper>
  //    </Grid>  */}
  
  
    <Paper  style={{marginTop:'20px'}} className={classes.root}>  
    <Typography variant="h5" style={{ color:'red',display: 'flex',justifyContent: 'center'}} >Evenements Annocés en Cours</Typography>
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
          {
          // loader ?(
          //   <Grid container alignItems="center" justify="center" >
                    
          //       <Grid item md={12}>
          //         <Paper className={classes.paper } >
          //         <div className={classes.margin}>
          //           <Loader/> 
          //         </div> 
          //       </Paper>
          //       </Grid>
          // </Grid>)
          // :( 
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
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
                <TableCell align="right" > <Button variant="contained" color="primary" onClick={()=>handleOpen(row.id,row.typeEvenement)}> 
                 Suivre
            </Button></TableCell>
                <TableCell align="right" onClick={() => editEvenement(row.id)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deletePatrouille(row.id)}><DeleteIcon /></TableCell> 
        </TableRow>
                 
              );  
            })  

  //  )
   }
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
{/* 
       <Dialog open={alertOpen}
               
                onClose={handleClose}
                >
                <DialogTitle id="alert-dialog-title">{"SUIVI EVENEMENT"}</DialogTitle>
                <DialogContent  className={classes.widthDialog}>
                <DialogContentText id="alert-dialog-description">
                
                </DialogContentText>
                <form>
                <Grid container justify="center"spacing={4}>
                      {typeEvent==='ACCIDENT'?
                      (
                      <div>
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='action'>Action</InputLabel>
                            <Select  
                                name='action'
                                id='action'  
                                value={action} 
                                onChange={onChangeAction}
                                >
                                
                              <MenuItem value="Baliser" key={2} name="categorie">Baliser</MenuItem> 
                          </Select>
                         </FormControl> 
                    </Grid>
                   <br/>
                        {action ==='Baliser'?
                        (
                          <div>
                         <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                    id="heureBalisage"
                                    variant="outlined"
                                    label="Heure Balisage "
                                    name="heureBalisage"
                                    type="time"
                                    value={heureBalisage}
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
                                id="matriculeVehicule"
                                variant="outlined"
                                label="Matricule Vehicule"
                                name="matriculeVehicule"
                                
                                value={matriculeVehicule}
                                onChange={onChangeMatriculeVehicule}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                        <Grid item md={12} sm={12} xs={12}> 
                                <FormControl  className={classes.formControl}>
                                    <InputLabel   id='categorie'>Categorie </InputLabel>
                                    <Select  
                                        name='categorie'
                                        id='categorie'  
                                        value={categorie} 
                                        onChange={onChangeCategorie}
                                       
                                        >
                                      <MenuItem value="MOTO"key={1} name="categorie">MOTO</MenuItem>
                                      <MenuItem value="VL"key={2} name="categorie">VL</MenuItem>  
                                      <MenuItem value="PL"key={3} name="categorie">PL</MenuItem>
                                      <MenuItem value="TC"key={4} name="categorie">TC</MenuItem>   
                                
                                   
                                </Select>
                            </FormControl> 
                        </Grid>
                        <br/>
                        <Grid item md={12} sm={12} xs={12}> 
                      <FormControl  className={classes.formControl}>
                          <InputLabel   id='operation'>Autre Action  à faire </InputLabel>
                          <Select  
                              name='operation'
                              id='operation'  
                              value={operation} 
                              onChange={onChangeOperation}
                              >
                            <MenuItem value="assister"key={1} name="operation">A Assister</MenuItem>

                      </Select>
                  </FormControl> 
              </Grid>
              </div>
                      ):null}
                     
                   </div> 
                      ):typeEvent==='PANNE'?
                    (
                      <div>
                        <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='action'>Action</InputLabel>
                                <Select  
                                    name='action'
                                    id='action'  
                                    value={action} 
                                    onChange={onChangeAction}
                                    >
                                  <MenuItem value="Annuler" key={1} name="categorie">Annuler</MenuItem>
                                  <MenuItem value="Baliser" key={2} name="categorie">Baliser</MenuItem> 
                                  
                            </Select>
                        </FormControl> 
                      </Grid>
                    <br/>
                    {action ==='Baliser'?
                    (
                    <div>
                     <Grid item md={12}  sm={12} xs={12}>
                        <TextField
                                id="heureBalisage"
                                variant="outlined"
                                label="Heure Balisage "
                                name="heureBalisage"
                                type="time"
                                value={heureBalisage}
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
                                id="matriculeVehicule"
                                variant="outlined"
                                label="Matricule Vehicule"
                                name="matriculeVehicule"
                                
                                value={matriculeVehicule}
                                onChange={onChangeMatriculeVehicule}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                    <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='categorie'>Categorie </InputLabel>
                                <Select  
                                    name='categorie'
                                    id='categorie'  
                                    value={categorie} 
                                    onChange={onChangeCategorie}
                                   
                                    >
                                  <MenuItem value="MOTO"key={1} name="categorie">MOTO</MenuItem>
                                  <MenuItem value="VL"key={2} name="categorie">VL</MenuItem>  
                                  <MenuItem value="PL"key={3} name="categorie">PL</MenuItem>
                                  <MenuItem value="TC"key={4} name="categorie">TC</MenuItem>   
                            
                               
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}> 
                      <FormControl  className={classes.formControl}>
                          <InputLabel   id='operation'>Autre Action  à faire </InputLabel>
                          <Select  
                              name='operation'
                              id='operation'  
                              value={operation} 
                              onChange={onChangeOperation}
                              >
                            <MenuItem value="assister"key={1} name="operation">A Assister</MenuItem>
                            <MenuItem value="remorquer"key={2} name="operation"> A Remorquer</MenuItem>  
                            
                      
                         
                      </Select>
                  </FormControl> 
              </Grid>
              </div>

                    ):action ==='Annuler'?
                    (
                      <Grid container justify="center" spacing={4}>
                          <Grid item md={12} sm={12} xs={12}> 
                          <FormControl  className={classes.formControl}>
                          <InputLabel   id='motif'> Motif </InputLabel>
                          <Select  
                              name='motif'
                              id='motif'  
                              value={motif} 
                              onChange={onChangeMotif}
                              >
                            <MenuItem value="Reparti Seul"key={1} name="motif">Reparti Seul</MenuItem>
                            <MenuItem value="Non Localiser"key={2} name="motif">Non Localiser</MenuItem>  
                            
                      
                         
                      </Select>
                  </FormControl> 
              </Grid>
              </Grid>

              
                    ):null
                  }
                    
                    </div>
                       ):typeEvent ==='BALAYAGE MECANIQUE'?(
                  <div>
                        <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='action'>Action  à faire </InputLabel>
                                  <Select  
                                      name='action'
                                      id='action'  
                                      value={action} 
                                      onChange={onChangeAction}
                                      >
                                    <MenuItem value="fermer" key={1} name="action">Fermer</MenuItem>
                                  
                                </Select>
                            </FormControl> 
                        </Grid>
                        <br/>
                      {action === 'fermer' ?
                        (
                          <div>
                          <Grid item md={12}  sm={12} xs={12}>
                            <TextField
                                    id="heureFinEvent"
                                    variant="outlined"
                                    label="Heure Fin "
                                    name="heureFinEvent"
                                    type="time"
                                    value={heureFinEvent}
                                    onChange={onChangeHeureFinEvent}
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                /> 
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='autoroute'>Autoroute </InputLabel>
                                <Select  
                                    name='autoroute'
                                    id='autoroute'  
                                    value={autoroute} 
                                    onChange={onChangeAutoroute}
                                    >
                                    <MenuItem value="A1"key={1} name="autoroute">A1</MenuItem>
                                    <MenuItem value="A2"key={2} name="autoroute">A2</MenuItem>  
                                   
                            </Select>
                        </FormControl> 
                        </Grid>
                        <br/>
                        <Grid item md={12} sm={12} xs={12}>

                       <TextField
                                id="distance"
                                variant="outlined"
                                label="Distance"
                                name="distance"
                                
                                value={distance}
                                onChange={onChangeDistance}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='sens'>Sens </InputLabel>
                                <Select  
                                    name='sens'
                                    id='sens'  
                                    value={sens} 
                                    onChange={onChangeSens}
                                    >
                                    <MenuItem value="SENS-1"key={1} name="sens">SENS-1</MenuItem>
                                    <MenuItem value="SENS-2"key={2} name="sens">SENS-2</MenuItem>  
                                   
                            </Select>
                        </FormControl> 
                   </Grid>
                   </div>
                
                    
                       ):null}

                     </div>
                      ):null
                    }
                
                </Grid>
                    <Grid container justify="center"style={{marginTop:'5px'}} spacing={5} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={ action === 'Baliser'? baliserEvent:annulerEvent } >Valider</Button>
                       </Grid>
                    </Grid>
                 
                </form>
               
            
                </DialogContent>
                <DialogActions>
         
              <Typography variant="h6"style={{ color:'green'}}>
                {loader ? <Loader/> : message }
              </Typography>

                <Button onClick={handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog> */}

{/* dialogue Accident */}
<Dialog open={dialogAccident}
               
                onClose={handleClose}
                >
                <DialogTitle id="alert-dialog-title">{"SUIVI EVENEMENT"}</DialogTitle>
                <DialogContent  className={classes.widthDialog}>
                <DialogContentText id="alert-dialog-description">
                {/* {message} */}
                </DialogContentText>
                <form>
                <Grid container justify="center"spacing={4}>
                     
                      
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='action'>Action</InputLabel>
                            <Select  
                                name='action'
                                id='action'  
                                value={action} 
                                onChange={onChangeAction}
                                >
                                {/* <MenuItem value="Annuler" key={1} name="categorie">Annuler</MenuItem> */}
                              <MenuItem value="Baliser" key={2} name="categorie">Baliser</MenuItem> 
                          </Select>
                         </FormControl> 
                    </Grid>
                   <br/>
                        {action ==='Baliser'?
                        (
                          <div>
                         <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                    id="heureBalisage"
                                    variant="outlined"
                                    label="Heure Balisage "
                                    name="heureBalisage"
                                    type="time"
                                    value={heureBalisage}
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
                                id="matriculeVehicule"
                                variant="outlined"
                                label="Matricule Vehicule"
                                name="matriculeVehicule"
                                
                                value={matriculeVehicule}
                                onChange={onChangeMatriculeVehicule}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                        <Grid item md={12} sm={12} xs={12}> 
                                <FormControl  className={classes.formControl}>
                                    <InputLabel   id='categorie'>Categorie </InputLabel>
                                    <Select  
                                        name='categorie'
                                        id='categorie'  
                                        value={categorie} 
                                        onChange={onChangeCategorie}
                                       
                                        >
                                      <MenuItem value="MOTO"key={1} name="categorie">MOTO</MenuItem>
                                      <MenuItem value="VL"key={2} name="categorie">VL</MenuItem>  
                                      <MenuItem value="PL"key={3} name="categorie">PL</MenuItem>
                                      <MenuItem value="TC"key={4} name="categorie">TC</MenuItem>   
                                
                                   
                                </Select>
                            </FormControl> 
                        </Grid>
                        <br/>
                        <Grid item md={12} sm={12} xs={12}> 
                      <FormControl  className={classes.formControl}>
                          <InputLabel   id='operation'>Autre Action  à faire </InputLabel>
                          <Select  
                              name='operation'
                              id='operation'  
                              value={operation} 
                              onChange={onChangeOperation}
                              >
                            <MenuItem value="assister"key={1} name="operation">A Assister</MenuItem>

                      </Select>
                  </FormControl> 
              </Grid>
              </div>
                      ):null
                      }
                </Grid>
                    <Grid container justify="center"style={{marginTop:'5px'}} spacing={5} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={ action === 'Baliser'? baliserEvent:annulerEvent } >Valider</Button>
                       </Grid>
                    </Grid>
                 
                </form>
               
            
                </DialogContent>
                <DialogActions>
         
              <Typography variant="h6"style={{ color:'green'}}>
                {loader ? <Loader/> : message }
              </Typography>

                <Button onClick={handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
      
{/*  dialogAccident*/}


{/* dialogue panne*/}
<Dialog open={dialogPanne}
               
                onClose={handleClose}
                >
                <DialogTitle id="alert-dialog-title">{"SUIVI EVENEMENT"}</DialogTitle>
                <DialogContent  className={classes.widthDialog}>
                <DialogContentText id="alert-dialog-description">
                {/* {message} */}
                </DialogContentText>
                <form>
                <Grid container justify="center"spacing={4}>
                <div>
                        <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='action'>Action</InputLabel>
                                <Select  
                                    name='action'
                                    id='action'  
                                    value={action} 
                                    onChange={onChangeAction}
                                    >
                                  <MenuItem value="Annuler" key={1} name="categorie">Annuler</MenuItem>
                                  <MenuItem value="Baliser" key={2} name="categorie">Baliser</MenuItem> 
                                  {/* <MenuItem value="Remorquer " key={3} name="categorie">Remorquer</MenuItem>  */}
                            </Select>
                        </FormControl> 
                      </Grid>
                    <br/>
                    {action ==='Baliser'?
                    (
                    <div>
                     <Grid item md={12}  sm={12} xs={12}>
                        <TextField
                                id="heureBalisage"
                                variant="outlined"
                                label="Heure Balisage "
                                name="heureBalisage"
                                type="time"
                                value={heureBalisage}
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
                                id="matriculeVehicule"
                                variant="outlined"
                                label="Matricule Vehicule"
                                name="matriculeVehicule"
                                
                                value={matriculeVehicule}
                                onChange={onChangeMatriculeVehicule}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                    <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='categorie'>Categorie </InputLabel>
                                <Select  
                                    name='categorie'
                                    id='categorie'  
                                    value={categorie} 
                                    onChange={onChangeCategorie}
                                   
                                    >
                                  <MenuItem value="MOTO"key={1} name="categorie">MOTO</MenuItem>
                                  <MenuItem value="VL"key={2} name="categorie">VL</MenuItem>  
                                  <MenuItem value="PL"key={3} name="categorie">PL</MenuItem>
                                  <MenuItem value="TC"key={4} name="categorie">TC</MenuItem>   
                            
                               
                            </Select>
                        </FormControl> 
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}> 
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='categorie'>Nature Panne </InputLabel>
                                <Select  
                                    name='originePanne'
                                    id='originePanne'  
                                    value={originePanne} 
                                    onChange={onChangeOriginePanne}
                                   
                                    >
                                  <MenuItem value="Crevaision"key={1} name="originePanne">Crevaision</MenuItem>
                                  <MenuItem value="Carburant"key={2} name="originePanne">Carburant</MenuItem>  
                                  <MenuItem value="Chauffage"key={3} name="originePanne">Chauffage</MenuItem>
                                  <MenuItem value="Moteur"key={3} name="originePanne">Moteur</MenuItem>
                                  <MenuItem value="Autres"key={4} name="originePanne">Autres</MenuItem>   
                            
                               
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}> 
                      <FormControl  className={classes.formControl}>
                          <InputLabel   id='operation'>Autre Action  à faire </InputLabel>
                          <Select  
                              name='operation'
                              id='operation'  
                              value={operation} 
                              onChange={onChangeOperation}
                              >
                            <MenuItem value="assister"key={1} name="operation">A Assister</MenuItem>
                            <MenuItem value="remorquer"key={2} name="operation"> A Remorquer</MenuItem>  
                            
                      
                         
                      </Select>
                  </FormControl> 
              </Grid>
              </div>

                    ):action ==='Annuler'?
                    (
                      <Grid container justify="center" spacing={4}>
                          <Grid item md={12} sm={12} xs={12}> 
                          <FormControl  className={classes.formControl}>
                          <InputLabel   id='motif'> Motif </InputLabel>
                          <Select  
                              name='motif'
                              id='motif'  
                              value={motif} 
                              onChange={onChangeMotif}
                              >
                            <MenuItem value="Reparti Seul"key={1} name="motif">Reparti Seul</MenuItem>
                            <MenuItem value="Non Localiser"key={2} name="motif">Non Localiser</MenuItem>  
                            
                      
                         
                      </Select>
                  </FormControl> 
              </Grid>
              </Grid>

              
                    ):null
                  }
                    
                    </div>
                </Grid>
                    <Grid container justify="center"style={{marginTop:'5px'}} spacing={5} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={ action === 'Baliser'? baliserEvent:annulerEvent } >Valider</Button>
                       </Grid>
                    </Grid>
                 
                </form>
               
            
                </DialogContent>
                <DialogActions>
         
              <Typography variant="h6"style={{ color:'green'}}>
                {loader ? <Loader/> : message }
              </Typography>

                <Button onClick={handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
      
{/*  dialogue Panne*/}
      {data1?<ListEventForAssistance assister={data1} />:null} 
      {data2?<ListEventForRemorquage remorquer={data2} />:null} 
      {data3?<ListEventAdeBaliser debaliser={data3} />:null} 
      {/* <ListEventForRemorquage />
      <ListEventAdeBaliser/>  */}
     
    </div>
  );
} 


    