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
    
  }  ,
  widthDialog:{
    width:300,
  } 
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
let intervalID;
export default function ListForRemorquage(props) {  
  const classes = useStyles();  
  const data2 = props.remorquer;
  const [page, setPage] = React.useState(0);  
  const [data1, setData1] = useState([]);  
  const [idEvent,setIdEvent] = useState('');
  const [gareDepot,setGareDepot] = useState('');
  const [lieu,setLieu] = useState('');
  const [matriculeRemorque,setMatriculeRemorque] = useState('');
  const [heureDarriveRemorque,setHeureDarriveRemorque] = useState('');
  const [date,setDate] = useState();
  const [typeEvent,setTypeEvent] =  useState('');
  const [heureDepGen,setHeureDepGen] = useState('');
  const [heureDepSap,setHeureDepSap] = useState('');
  const [motif,setMotif] = useState('');
 
  const [heureRemorquage,setHeureRemorquage] = useState('');
  const [action,setAction] = useState('');
  const [loader,setLoader] = useState(false)
  const [alertOpen,setAlertOpen]= useState(false);
  const [message,setMessage] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
          // setLoader(true)
//           // setIdPatrouille(window.localStorage.getItem('idPatrouille'));
          // intervalID = setInterval(
          //   () => {  
          //            loadAllEvenementEnCoursToRemorquer();
          //           },10000);
          // loadAllEvenementEnCoursToRemorquer();
                 
        
}, []); 

// useEffect(() => {
//   return () => {
//     clearInterval(intervalID);
//   }
// }, []);

// const loadAllEvenementEnCoursToRemorquer = () => {
//  setLoader(true);
//   evenementService.getAllEvenementEnCoursToRemorquer()
//   .then((res) => {
//       setData1(res);
//       setLoader(false);
      
//   });   
// }



 const handleOpen = (idEvent,typeEvent) => {
    setIdEvent(idEvent);
    setTypeEvent(typeEvent);
    setAlertOpen(true);
    setMessage('');
    setGareDepot('')
    setHeureRemorquage('')
    setMotif('')
    setMatriculeRemorque('')
    setAction('')
    setHeureDarriveRemorque('')
    setHeureDepSap('')
    setHeureDepGen('')
    };  

const handleClose = () => {
      setAlertOpen(false);
      // loadAllEvenementEnCoursToAssister();
      //  history.push('/app/evenement');
     // window.location.reload();
    
    };  

  
    const onChangeHeure = event => {  
      setHeureRemorquage(event.target.value);  
    
    };
    const onChangeHeureDarriveRemorque = event => {  
      setHeureDarriveRemorque(event.target.value);  
    
    };
    
    const onChangeDate = event => {  
      setDate(event.target.value);  
    
    }
  const onChangeAction = event => {  
    setAction(event.target.value);  
  };
  
  const onChangeLieu = event => {  
    setLieu(event.target.value);  
  };
  const onChangeMatriculeRemorque = event => {  
    setMatriculeRemorque(event.target.value);  
  };
  
  const onChangeGareDepot = event => {  
    setGareDepot(event.target.value);  
  };

  const onChangeHeureDepGen = event => {  
    setHeureDepGen(event.target.value);  
  };
  const onChangeHeureDepSap = event => {  
    setHeureDepSap(event.target.value);  
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
const remorkVehicule = () =>{
  setLoader(true)
      let data = {
        idEvent:idEvent,
        dateRemorquage:date,
        idUser:window.localStorage.getItem('idUser'),
        heureRemorquage:heureRemorquage,
        heureDarriveRemorque:heureDarriveRemorque,
        matriculeRemorque:matriculeRemorque,
        gareDepot:lieu+" "+ gareDepot,
      }
  evenementService.remorkVehicule(data)
  .then((res) => {
    if(res.error){
      setMessage("Erreur Erreur  réesseyez");
      setLoader(false)
    }else{
      setMessage("REMORQUAGE avec succes");
      setLoader(false)
    }
  
}); 
    // console.log("data",data);
  
}

const annulerRemorquage = () =>{
  setLoader(true)
  let data = {
    idEvent:idEvent,
    action:action,
    dateRemorquage:date,
    heureDarriveRemorque:heureDarriveRemorque,
    matriculeRemorque:matriculeRemorque,
    idUser:window.localStorage.getItem('idUser'),
    motif:motif
  }
evenementService.annulerRemorquage(data)
.then((res) => {
if(res.error){
  setMessage("Erreur Erreur  réesseyez");
  setLoader(false)
}else{
  setMessage("Remorquage Annulé ");
  setLoader(false)
}

}); 
// console.log("data",data);

}

const infosAccident = () =>{
  setLoader(true)
  let data = {
    idEvent:idEvent,
    heureDepGen:heureDepGen,
    heureDepSap:heureDepSap,
    
  }
evenementService.infosAccident(data)
.then((res) => {
if(res.error){
  setMessage("Erreur Erreur  réesseyez");
  setLoader(false)
}else{
  setMessage("Autres info ajoutés avec succes");
  setLoader(false)
}

}); 
//  console.log("data",data);

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
    <Typography variant="h5"  style={{ color:'#FF7F50',display: 'flex',justifyContent: 'center'}}>Evenements à Remorquer</Typography>
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
    //       loader?(
    //    <Grid container alignItems="center" justify="center" >
               
    //       <Grid item md={12}>
    //         <Paper className={classes.paper } >
    //         <div className={classes.margin}>
    //           <Loader/>
    //         </div> 
    //        </Paper>
    //       </Grid>
    //  </Grid>
    //  )
    //    :(
            data2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
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
                <TableCell align="right" > <Button variant="contained" color="primary" onClick={() => handleOpen(row.id,row.typeEvenement)}> 
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
        count={data2.length}  
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
                <DialogContent className={classes.widthDialog}>
                <DialogContentText id="alert-dialog-description">
                {/* {message} */}
                </DialogContentText>
                <form >
                    <Grid container justify="center" spacing={4}>
                     {typeEvent ==='ACCIDENT'
                      ?(
                        <div>
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='action'>Action à Faire</InputLabel>
                            <Select  
                                name='action'
                                id='action'  
                                value={action} 
                                onChange={onChangeAction}
                               
                                >
                              <MenuItem value="remorquer" key={1} name="action">Remorquer</MenuItem>
                              {/* <MenuItem value="infos" key={2} name="action">Autres Info</MenuItem>   */}
                       
                        </Select>
                    </FormControl> 
                   </Grid>
                   <br/>
                   {action === 'remorquer' ?
                      ( 
                        <div> 
                        <Grid item md={12} sm={12} xs={12}>
                         <TextField
                                 id="dateRemork"
                                 variant="outlined"
                                 label="Date Remorquage"
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
                                 id="heureDarriveRemorque"
                                 variant="outlined"
                                 label="Heure d'arrivée"
                                 name="heureDarriveRemorque"
                                 type="time"
                                 value={heureDarriveRemorque}
                                 onChange={onChangeHeureDarriveRemorque}
                                 className={classes.textField}
                                 InputLabelProps={{
                                 shrink: true,
                                 }}
                             /> 
                     </Grid>
                     <br/>
                     <Grid item md={12}  sm={12} xs={12}>
                         <TextField
                                 id="heureRemorquage"
                                 variant="outlined"
                                 label="Heure Remorquée"
                                 name="heureRemorquage"
                                 type="time"
                                 value={heureRemorquage}
                                 onChange={onChangeHeure}
                                 className={classes.textField}
                                 InputLabelProps={{
                                 shrink: true,
                                 }}
                             /> 
                     </Grid>
                     <br/>
                     <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='matriculeRemorque'>Matricule Remorque</InputLabel>
                                  <Select  
                                      name='matriculeRemorque'
                                      id='matriculeRemorque'  
                                      value={matriculeRemorque} 
                                      onChange={onChangeMatriculeRemorque}
                                      >
                                    <MenuItem value="DPL" key={2} name="matriculeRemorque">DPL</MenuItem>  
                                    <MenuItem value="DK 9180 BE" key={1} name="matriculeRemorque">DK 9180 BE</MenuItem>
                                    <MenuItem value="LG 6275 C" key={2} name="matriculeRemorque"> LG 6275 C</MenuItem>  
                                    <MenuItem value="LG 5182 C" key={2} name="matriculeRemorque"> LG 5182 C</MenuItem>  
                                    <MenuItem value="DK 2642 BC" key={2} name="matriculeRemorque">DK 2642 BC</MenuItem>  
                                    <MenuItem value="LG 6617 C" key={2} name="matriculeRemorque">LG 6617 C</MenuItem>  
                              </Select>
                            </FormControl>
                          </Grid>
                          <br/>
                     <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='lieu'>Lieu de Dépot</InputLabel>
                                  <Select  
                                      name='lieu'
                                      id='lieu'  
                                      value={lieu} 
                                      onChange={onChangeLieu}
                                      >
                                    <MenuItem value="GARE" key={1} name="lieu">GARE</MenuItem>
                                    <MenuItem value="SORTIE" key={2} name="lieu">SORTIE</MenuItem>  
                              </Select>
                            </FormControl>
                          </Grid>
                          <br/>
                     {lieu ==='GARE'? 
                           (   
                          <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='gareDepot'>Choisir GARE</InputLabel>
                                  <Select  
                                      name='gareDepot'
                                      id='gareDepot'  
                                      value={gareDepot} 
                                      onChange={onChangeGareDepot}
                                     
                                      >
                                    <MenuItem value="BPV THIES" key={1} name="gareDepot">BPV THIES</MenuItem>
                                    <MenuItem value="KEUR MADAROU" key={2} name="gareDepot">KEUR MADAROU</MenuItem>  
                                    <MenuItem value="KHOMBOLE" key={3} name="gareDepot">KHOMBOLE</MenuItem>
                                    <MenuItem value="DIOURBEL" key={4} name="gareDepot">DIOURBEL </MenuItem>  
                                    <MenuItem value="TOUBA" key={5} name="gareDepot">TOUBA </MenuItem>  
                                    <MenuItem value="KIRENE" key={6} name="gareDepot">KIRENE </MenuItem> 
                                    <MenuItem value="SINDIA" key={7} name="gareDepot">SINDIA </MenuItem>  
                                    <MenuItem value="SOUNE" key={8} name="gareDepot">SOUNE </MenuItem>  
                                    <MenuItem value="THIAMBOKH" key={9} name="gareDepot">THIAMBOKH </MenuItem>   
                                    <MenuItem value="NGUEKHOKH" key={10} name="gareDepot">NGUEKHOKH </MenuItem>  
                                    <MenuItem value="MBOUR" key={11} name="gareDepot">MBOUR </MenuItem>  
                                    <MenuItem value="MALICOUNDA" key={12} name="gareDepot">MALICOUNDA </MenuItem>  
                                    <MenuItem value="AIBD" key={13} name="gareDepot">AIBD </MenuItem>
                                 
                              </Select>
                          </FormControl> 
                      </Grid>
                      ):lieu ==='SORTIE'?(
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='gareDepot'>Choisir SORTIE</InputLabel>
                            <Select  
                                name='gareDepot'
                                id='gareDepot'  
                                value={gareDepot} 
                                onChange={onChangeGareDepot}
                               
                                >
                                <MenuItem value="BPV THIES" key={1} name="gareDepot">BPV THIES</MenuItem>
                                    {/* <MenuItem value="KEUR MADAROU" key={2} name="gareDepot">KEUR MADAROU</MenuItem>   */}
                                    <MenuItem value="KHOMBOLE" key={3} name="gareDepot">KHOMBOLE</MenuItem>
                                    <MenuItem value="DIOURBEL" key={4} name="gareDepot">DIOURBEL </MenuItem>  
                                    <MenuItem value="TOUBA" key={5} name="gareDepot">TOUBA </MenuItem>  
                                    <MenuItem value="KIRENE" key={6} name="gareDepot">KIRENE </MenuItem> 
                                    <MenuItem value="SINDIA" key={7} name="gareDepot">SINDIA </MenuItem>  
                                    <MenuItem value="SOUNE" key={8} name="gareDepot">SOUNE </MenuItem>  
                                    <MenuItem value="THIAMBOKH" key={9} name="gareDepot">THIAMBOKH </MenuItem>   
                                    <MenuItem value="NGUEKHOKH" key={10} name="gareDepot">NGUEKHOKH </MenuItem>  
                                    <MenuItem value="MBOUR" key={11} name="gareDepot">MBOUR </MenuItem>  
                                    <MenuItem value="MALICOUNDA" key={12} name="gareDepot">MALICOUNDA </MenuItem>  
                                    <MenuItem value="AIBD" key={13} name="gareDepot">AIBD </MenuItem>
                        
                           
                        </Select>
                    </FormControl> 
                   
                </Grid>
  
               
                      ):
                      null
                      }  
                      <br/>
                      </div> 
                  
                      )
                      // :(action ==='infos'
                      //            ?(
                      //             <Grid>
                      //             <Grid item md={12}  sm={12} xs={12}>
                      //              <TextField
                      //                      id="heureDepGen"
                      //                      variant="outlined"
                      //                      label="Heure départ Gendarmes"
                      //                      name="heureDepGen"
                      //                      type="time"
                      //                      value={heureDepGen}
                      //                      onChange={onChangeHeureDepGen}
                      //                      className={classes.textField}
                      //                      InputLabelProps={{
                      //                      shrink: true,
                      //                      }}
                      //                  /> 
                                   
                      //          </Grid>
                      //          <br/>
                      //          <Grid item md={12}  sm={12} xs={12}>
                      //              <TextField
                      //                      id="heureDepSap"
                      //                      variant="outlined"
                      //                      label="Heure départ Sapeurs"
                      //                      name="heureDepSap"
                      //                      type="time"
                      //                      value={heureDepSap}
                      //                      onChange={onChangeHeureDepSap}
                      //                      className={classes.textField}
                      //                      InputLabelProps={{
                      //                      shrink: true,
                      //                      }}
                      //                  /> 
                      //          </Grid> 
                      //       </Grid>
                      //      ):null 
                      //   )
                      :null
                      }
                 
                 </div>
                      )
                      :typeEvent ==='PANNE'?
                      (
                        <div> 
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='action'>Action à Faire</InputLabel>
                            <Select  
                                name='action'
                                id='action'  
                                value={action} 
                                onChange={onChangeAction}
                                >
                              <MenuItem value="remorquer" key={1} name="action">Remorquer</MenuItem>
                              <MenuItem value="annuler" key={2} name="action">Annuler</MenuItem>  
                       
                           </Select>
                       </FormControl> 
                      </Grid>
                  <br/>
                  {action === 'remorquer' ?
                      ( 
                        <div> 
                        <Grid item md={12} sm={12} xs={12}>
                         <TextField
                                 id="dateRemork"
                                 variant="outlined"
                                 label="Date Remorquage"
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
                                 id="heureDarriveRemorque"
                                 variant="outlined"
                                 label="Heure d'arrivée"
                                 name="heureDarriveRemorque"
                                 type="time"
                                 value={heureDarriveRemorque}
                                 onChange={onChangeHeureDarriveRemorque}
                                 className={classes.textField}
                                 InputLabelProps={{
                                 shrink: true,
                                 }}
                             /> 
                     </Grid>
                     <br/>
                     <Grid item md={12}  sm={12} xs={12}>
                         <TextField
                                 id="heureRemorquage"
                                 variant="outlined"
                                 label="Heure Remorquée"
                                 name="heureRemorquage"
                                 type="time"
                                 value={heureRemorquage}
                                 onChange={onChangeHeure}
                                 className={classes.textField}
                                 InputLabelProps={{
                                 shrink: true,
                                 }}
                             /> 
                     </Grid>
                     <br/>
                     <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='matriculeRemorque'>Matricule Remorque</InputLabel>
                                  <Select  
                                      name='matriculeRemorque'
                                      id='matriculeRemorque'  
                                      value={matriculeRemorque} 
                                      onChange={onChangeMatriculeRemorque}
                                      >
                                    <MenuItem value="DPL" key={2} name="matriculeRemorque">DPL</MenuItem>  
                                    <MenuItem value="DK 9180 BE" key={1} name="matriculeRemorque">DK 9180 BE</MenuItem>
                                    <MenuItem value="LG 6275 C" key={2} name="matriculeRemorque"> LG 6275 C</MenuItem>  
                                    <MenuItem value="LG 5182 C" key={2} name="matriculeRemorque"> LG 5182 C</MenuItem>  
                                    <MenuItem value="DK 2642 BC" key={2} name="matriculeRemorque">DK 2642 BC</MenuItem>  
                                    <MenuItem value="LG 6617 C" key={2} name="matriculeRemorque">LG 6617 C</MenuItem>  
                              </Select>
                            </FormControl>
                          </Grid>
                          <br/>
                     <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='lieu'>Lieu de Dépot</InputLabel>
                                  <Select  
                                      name='lieu'
                                      id='lieu'  
                                      value={lieu} 
                                      onChange={onChangeLieu}
                                      >
                                    <MenuItem value="GARE" key={1} name="lieu">GARE</MenuItem>
                                    <MenuItem value="SORTIE" key={2} name="lieu">SORTIE</MenuItem>  
                              </Select>
                            </FormControl>
                          </Grid>
                          <br/>
                     {lieu ==='GARE'? 
                           (   
                          <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='gareDepot'>Choisir GARE</InputLabel>
                                  <Select  
                                      name='gareDepot'
                                      id='gareDepot'  
                                      value={gareDepot} 
                                      onChange={onChangeGareDepot}
                                     
                                      >
                                    <MenuItem value="BPV THIES" key={1} name="gareDepot">BPV THIES</MenuItem>
                                    <MenuItem value="KEUR MADAROU" key={2} name="gareDepot">KEUR MADAROU</MenuItem>  
                                    <MenuItem value="KHOMBOLE" key={3} name="gareDepot">KHOMBOLE</MenuItem>
                                    <MenuItem value="DIOURBEL" key={4} name="gareDepot">DIOURBEL </MenuItem>  
                                    <MenuItem value="TOUBA" key={5} name="gareDepot">TOUBA </MenuItem>  
                                    <MenuItem value="KIRENE" key={6} name="gareDepot">KIRENE </MenuItem> 
                                    <MenuItem value="SINDIA" key={7} name="gareDepot">SINDIA </MenuItem>  
                                    <MenuItem value="SOUNE" key={8} name="gareDepot">SOUNE </MenuItem>  
                                    <MenuItem value="THIAMBOKH" key={9} name="gareDepot">THIAMBOKH </MenuItem>   
                                    <MenuItem value="NGUEKHOKH" key={10} name="gareDepot">NGUEKHOKH </MenuItem>  
                                    <MenuItem value="MBOUR" key={11} name="gareDepot">MBOUR </MenuItem>  
                                    <MenuItem value="MALICOUNDA" key={12} name="gareDepot">MALICOUNDA </MenuItem>  
                                    <MenuItem value="AIBD" key={13} name="gareDepot">AIBD </MenuItem>
                                 
                              </Select>
                          </FormControl> 
                      </Grid>
                      
                      ):lieu ==='SORTIE'?(
                        <Grid item md={12} sm={12} xs={12}> 
                        <FormControl  className={classes.formControl}>
                            <InputLabel   id='gareDepot'>Choisir SORTIE</InputLabel>
                            <Select  
                                name='gareDepot'
                                id='gareDepot'  
                                value={gareDepot} 
                                onChange={onChangeGareDepot}
                               
                                >
                                <MenuItem value="BPV THIES" key={1} name="gareDepot">BPV THIES</MenuItem>
                                    {/* <MenuItem value="KEUR MADAROU" key={2} name="gareDepot">KEUR MADAROU</MenuItem>   */}
                                    <MenuItem value="KHOMBOLE" key={3} name="gareDepot">KHOMBOLE</MenuItem>
                                    <MenuItem value="DIOURBEL" key={4} name="gareDepot">DIOURBEL </MenuItem>  
                                    <MenuItem value="TOUBA" key={5} name="gareDepot">TOUBA </MenuItem>  
                                    <MenuItem value="KIRENE" key={6} name="gareDepot">KIRENE </MenuItem> 
                                    <MenuItem value="SINDIA" key={7} name="gareDepot">SINDIA </MenuItem>  
                                    <MenuItem value="SOUNE" key={8} name="gareDepot">SOUNE </MenuItem>  
                                    <MenuItem value="THIAMBOKH" key={9} name="gareDepot">THIAMBOKH </MenuItem>   
                                    <MenuItem value="NGUEKHOKH" key={10} name="gareDepot">NGUEKHOKH </MenuItem>  
                                    <MenuItem value="MBOUR" key={11} name="gareDepot">MBOUR </MenuItem>  
                                    <MenuItem value="MALICOUNDA" key={12} name="gareDepot">MALICOUNDA </MenuItem>  
                                    <MenuItem value="AIBD" key={13} name="gareDepot">AIBD </MenuItem>
                        
                           
                        </Select>
                    </FormControl> 
                   
                </Grid>
  
               
                      ):null}  
                      <br/>
                      </div> 
                  
                      ):(action ==='annuler'
                                 ?(
                          <div>
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
                                                  <MenuItem value="Remorquage Annuler"key={2} name="motif">Remorquage Annulé</MenuItem>  
                                                  <MenuItem value="Non Localiser"key={2} name="motif">Non Localiser</MenuItem>
                                              
                                            </Select>
                                        </FormControl> 
                                    </Grid>
                                    <br/>
                              <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                        id="dateRemork"
                                        variant="outlined"
                                        label="Date"
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
                                      id="heureDarriveRemorque"
                                      variant="outlined"
                                      label="Heure d'arrivée"
                                      name="heureDarriveRemorque"
                                      type="time"
                                      value={heureDarriveRemorque}
                                      onChange={onChangeHeureDarriveRemorque}
                                      className={classes.textField}
                                      InputLabelProps={{
                                      shrink: true,
                                      }}
                                  /> 
                            </Grid>
                            <br/>
                            <Grid item md={12} sm={12} xs={12}> 
                              <FormControl  className={classes.formControl}>
                                  <InputLabel   id='matriculeRemorque'>Matricule Remorque</InputLabel>
                                  <Select  
                                      name='matriculeRemorque'
                                      id='matriculeRemorque'  
                                      value={matriculeRemorque} 
                                      onChange={onChangeMatriculeRemorque}
                                      >
                                    <MenuItem value="DPL" key={2} name="matriculeRemorque">DPL</MenuItem>  
                                    <MenuItem value="DK 9180 BE" key={1} name="matriculeRemorque">DK 9180 BE</MenuItem>
                                    <MenuItem value="LG 6275 C" key={2} name="matriculeRemorque"> LG 6275 C</MenuItem>  
                                    <MenuItem value="LG 5182 C" key={2} name="matriculeRemorque"> LG 5182 C</MenuItem>  
                                    <MenuItem value="DK 2642 BC" key={2} name="matriculeRemorque">DK 2642 BC</MenuItem>  
                                    <MenuItem value="LG 6617 C" key={2} name="matriculeRemorque">LG 6617 C</MenuItem>  
                              </Select>
                            </FormControl>
                          </Grid>
                          <br/>
                              </div>
                            
                                  ):null 
                              )}
                              </div>
                                    )
                               :null
                             } 
                      
                
                    </Grid>
                    <Grid container justify="center" style={{marginTop:'10px'}} spacing={4} alignItems="center">
                        <Grid item md={6} sm={12} xs={12}>
                          <Button variant="contained"  color ="primary" fullWidth 
                          onClick =
                              {
                              typeEvent ==='PANNE'?
                                  action === 'remorquer'? remorkVehicule : annulerRemorquage
                              :typeEvent ==='ACCIDENT'? 
                                  action === 'remorquer'? remorkVehicule : infosAccident
                              :null
                              }
                           > Valider
                        </Button>
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
    </Grid>
  );  
} 


    