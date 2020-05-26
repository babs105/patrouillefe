
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import React from 'react';  

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
import {patrouilleService} from '../../../service/patrouilleService';
import {rapportRemorquageService} from '../../../service/rapportRemorquageService';
import { history } from '../../../routage/ExtBrowserRouter';
import { useState, useEffect } from 'react';
import {ExportXlsx} from '../ExportXlsx';
import Loader from '../../loader/Loader';
  
const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight:500,  
    width:'100%', 
  },  
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default function RapportRemorquage() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);  
  const [loader,setLoader] = useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {    
          setLoader(true)
          rapportRemorquageService.getRapportRemorquage()
            .then((res) => {
                setData(res);
                setLoader(false)
                console.log(data);  
            });           
        
}, []);   
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  
  
  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);  
  };
  const onSearchInputChange = (event) => {
    console.log("Search changed ..." + event.target.value)
    if (event.target.value) {
        // this.setState({searchString: event.target.value})
        patrouilleService.searchPatrouilleByImmatricule(event.target.value)
        .then((res) => {
            console.log("result",res);
            setData(res);
            setLoader(false)
            console.log("FOUND",data);  
        }); 
    } else {
      setLoader(true)
      patrouilleService.getAllPatrouille()
      .then((res) => {
          setData(res);
          setLoader(false)
          console.log(data);  
      });  
        
    }
   
};

  
  const editPatrouille= (id) =>{
  window.localStorage.setItem("idPatrouille", id);
  history.push('/app/edit-patrouille');
 }
let i=0;
  
  return (  
   
      <div>
    <Typography variant="h4"  style={style}>Rapport Remorquage</Typography>
   <Paper>
   <Grid container alignItems="center" justify="center" >
   
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
    <ExportXlsx csvData={data} fileName={"RAPPORT_REMORQUAGE"}/>         
    
     </Grid>
     </Paper>
  
    <Paper  style={{marginTop:'20px'}}className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
        <TableRow>
        <TableCell align="center" style={{fontFamily:'bold'}}>N°: </TableCell>
            <TableCell align="center">DATE  </TableCell>
            <TableCell align="center">H.D'ANNONCE </TableCell>
            <TableCell align="center">H.DEPART </TableCell>
            <TableCell align="center">T.REACTION </TableCell>
            <TableCell align="center">H.D'ARRIVEE </TableCell>
            <TableCell align="center">D.TRAJET </TableCell>
            <TableCell align="center">H.FIN INTERVENTION  </TableCell>
            <TableCell align="center">D.INTERVENTION </TableCell>
            <TableCell align="center">DEPANNEUR</TableCell>
            <TableCell align="center">REMORQUE </TableCell>
            <TableCell align="center">DISTANCE PARCOURUE </TableCell> 
            <TableCell align="center">PKA </TableCell> 
            <TableCell align="center">OBJET ENLEVEMENT </TableCell>
            <TableCell align="center">MATRICULE  </TableCell>
            <TableCell align="center">CATEGORIE </TableCell>
            <TableCell align="center">GARE DEPOT </TableCell> 
            <TableCell align="center">H.ARRIVE GEN  </TableCell>
            <TableCell align="center">H.DEPART GEN </TableCell>
            <TableCell align="center">H.ARRIVE SAP  </TableCell>
            <TableCell align="center">H.DEPART SAP </TableCell>
            
            
           
        </TableRow>
          </TableHead>  
          <TableBody>  
          {loader?
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
                    {row.date}
                </TableCell>
                <TableCell align="center">{row.heureAnnonce}</TableCell>
                <TableCell align="center">{row.heureDepart}</TableCell>
                <TableCell align="center">{row.tempsReaction}</TableCell>
                <TableCell align="center">{row.heureDarriveDepanneur}</TableCell>
                <TableCell align="center">{row.dureeTrajet}</TableCell>
                <TableCell align="center">{row.heureFinIntervention}</TableCell>
                <TableCell align="center">{row.dureeIntervention}</TableCell>
                <TableCell align="center">{row.remorqueur}</TableCell>
                <TableCell align="center">{row.matriculeRemorqueur}</TableCell>
                <TableCell align="center">{row.kmParcouru}</TableCell>
                <TableCell align="center">{row.pk}</TableCell>
                <TableCell align="center">{row.objetEnlevement}</TableCell>
                <TableCell align="center">{row.numeroMatricule}</TableCell>
                <TableCell align="center">{row.categorieVehicule}</TableCell>
                <TableCell align="center">{row.gareDepot}</TableCell>
                <TableCell align="center">{row.heureArriveGendarmes}</TableCell>
                <TableCell align="center">{row.heureDepartGendarmes}</TableCell>
                <TableCell align="center">{row.heureArriveSapeurs}</TableCell>
                <TableCell align="center">{row.heureDepartSapeurs}</TableCell>
                  
                <TableCell align="right" onClick={() => editPatrouille(row.id)}><CreateIcon /></TableCell>
                <TableCell align="right" onClick={() => this.deletePatrouille(row.immatricule)}><DeleteIcon /></TableCell> 
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
    </div>
  );  
} 


    