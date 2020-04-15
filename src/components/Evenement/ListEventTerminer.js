import React from 'react';  
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import { Grid,TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';    
import Typography from '@material-ui/core/Typography';
import { history } from '../../routage/ExtBrowserRouter';
import {evenementService} from '../../service/evenementService'

import Loader from '../loader/Loader';
import { useState, useEffect } from 'react';
  
const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 440,  
  },  
});  
const style ={
    display: 'flex',
    justifyContent: 'center'
}
export default function ListClosedEvents() {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]); 
  const [loader,setLoader] = useState(false);  
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  useEffect(() => {   
    setLoader(true) 
            evenementService.getAllEvenementTerminer()
            .then((res) => {
                setData(res);
                setLoader(false);
            });           
        
}, []);   
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
//         ravitailleService.searchRavitaillementByImmatricule(event.target.value)
//         .then((res) => {
//             console.log("result",res);
//             setData(res);
//             setLoader(false)
//             console.log("FOUND",data);  
//         }); 
//     } else {
//       setLoader(true)
//       ravitailleService.getAllOperationsCuve()
//       .then((res) => {
//           setData(res);
//           setLoader(false)
//           console.log(data);  
//       });  
        
//     }
   
// };
const showEvenement= (id) =>{
    window.localStorage.setItem("idEvent", id);
    history.push('/app/show-event');
   }
let i=0;
  
  return (  
      <div>
        
    <Paper  style={{marginTop:'20px'}}className={classes.root}>  
     
            
            <Typography variant="h5" style={{ display: 'flex',justifyContent:'center' ,paddingTop:'30px',marginBottom:'30px'}} >Evenements Fermés</Typography>
            {/* <Grid container alignItems="center" justify="center" >
   <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Rechercher"   
                            margin="normal"
                            onChange={onSearchInputChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <SearchIcon />
                                </InputAdornment>
                               )
                              }}
                            />
                           
     </Grid> */}
      
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
          {loader ?(
            <Grid container alignItems="center" justify="center" >
                    
                <Grid item md={12}>
                  <Paper className={classes.paper } >
                  <div className={classes.margin}>
                    <Loader/>
                  </div> 
                </Paper>
                </Grid>
          </Grid>)
        :(
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
                {/* <TableCell align="right" > <Button variant="contained" color="primary" onClick={()=>handleOpen(row.id,row.typeEvenement)}> 
                 Suivre
            </Button></TableCell> */}
                <TableCell align="right" onClick={() => showEvenement(row.id)}> <VisibilityIcon/> </TableCell>
                <TableCell align="right" onClick={() => {}}></TableCell> 
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


    