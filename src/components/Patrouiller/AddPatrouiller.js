import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {vehiculeService} from '../../service/vehiculeService';
import {patrouillerService} from '../../service/patrouillerService';

import {userService} from '../../service/userService';
import { Paper, withStyles, Grid, TextField, Button,Select,MenuItem,InputLabel,FormControl} from '@material-ui/core';

const styles = theme => ({
    margin: {
        margin: theme.spacing(2) ,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
      },
    paper: {
        padding: theme.spacing(1),
      
       
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
     selectEmpty: {
        marginTop: theme.spacing(2),
      },
       
      widthDialog:{
        width:300,
      } 
});
class AddPatrouiller extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            vehicules:[],
            patrouilleurs:[],
            idPatrouille:'',
            matricule:'',
            date:new Date().toISOString().substring(0, 10),
            heureDebutPatrouille:'',
            kilometrageDebutPatrouille: '',
            itineraire:'',
            matriculePat1:'',
            matriculePat2:'',
            alertOpen:false,
            message: null
        }
        
    }
    componentDidMount() {
      this.setState({matriculePat1: window.localStorage.getItem("loginMatricule")}) ;
      this.reloadVehiculeList();
      this.reloadPatrouilleurs() ;
    }

    reloadVehiculeList = () => {
        vehiculeService.getAllVehicules()
            .then(res => {
                this.setState({vehicules:res});
                console.log("data",this.state.vehicules);
            })  
         
            
    }

    reloadPatrouilleurs = () => {
        userService.getAllUsersPatrouilleurs()
            .then(res => {
                this.setState({patrouilleurs:res});
                console.log("data",this.state.patrouilleurs);
            })  
         
            
     }

    // getUserPatrouilleurById = () => {
    //     userService.getUserById(window.localStorage.getItem('idUser'))
    //         .then(res => {
    //             this.setState({idPatrouille:res.idPatrouille});
    //             console.log("idPatrouille",this.state.idPatrouille);
    //         })  
         
            
    // }


    demarrerPatrouiller = (e) => {
        e.preventDefault();
        let patrouiller = {
             date: this.state.date,
             matricule: this.state.matricule,
             heureDebutPatrouille: this.state.heureDebutPatrouille,
             kilometrageDebutPatrouille: this.state.kilometrageDebutPatrouille,
             itineraire:this.state.itineraire,
             matriculePat1:this.state.matriculePat1,
             matriculePat2:this.state.matriculePat2
            };

        patrouillerService.demarrerPatrouiller(patrouiller)
            .then(res => {
                if(res.error){
                this.setState({message : 'Patrouille NON enregistrée'});
                this.setState({alertOpen : true});
            }else{
                
                // window.localStorage.setItem('idPatrouille', res.patrouille.id);
                // window.localStorage.setItem('idTeam', res.patrouille.equipePatrouille);
                this.setState({message : 'Patrouille enregistrée'});
                this.setState({alertOpen : true});
                // this.getUserPatrouilleurById();
            }
                //||||||||||||||||||||||
                
            });
        // console.log("patrouille",patrouiller);
      
}
    handleClose = () => {
            this.setState({ alertOpen:false})
            this.props.history.push('/app/patrouiller');
        
      };

    onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
            <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Démarrer Patrouille</Typography>
                <br/>
                    <Grid container alignItems="center" justify="center" spacing={8}>
                   < div>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                                id="date"
                                variant="outlined"
                                label="Date Patrouille"
                                name="date"
                                type="date"
                                defaultValue={this.state.date}
                                value={this.state.date}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                             <TextField
                                id="heuredebut"
                                variant="outlined"
                                label="Heure Debut Patrouille"
                                name="heureDebutPatrouille"
                                type="time"
                                value={this.state.heureDebutPatrouille}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    </Grid>
                    <br/>
                
                      
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField  className={classes.textField} id="kilometragedebut" variant="outlined" label="Kilometrage Début " type="number" name="kilometrageDebutPatrouille" value={this.state.kilometrageDebutPatrouille} onChange={this.onChange}  required />
                        
                        {/* <TextField  className={classes.textField} id="kilometragefin" variant="outlined" label="Kilometrage Fin" type="number" name="kilometrageFinPatrouille" value={this.state.kilometrageFinPatrouille} onChange={this.onChange}  required /> */}
                        </Grid>
                        <br/>
                        <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='immatriculeId'>Matricule Vehicule</InputLabel>
                                <Select  
                                    name='matricule'
                                    id='immatriculeId' 
    
                                    value={this.state.matricule} 
                                    onChange={this.onChange}
                                    >
                                {this.state.vehicules.map((dt, i) =>  (
                                    <MenuItem
                                        value={dt.immatricule}
                                        key={i} name={dt.immatricule}>{dt.immatricule}
                                    </MenuItem>     
                                ))
                            }
                            </Select>
                        </FormControl> 
                    </Grid> 
                    <br/>
                        <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='itineraire'>Itineraire </InputLabel>
                                <Select  
                                    name='itineraire'
                                    id='itineraire'  
                                    value={this.state.itineraire} 
                                    onChange={this.onChange}
                                    >
                        <MenuItem value="AIBD-BAMBEY" key={1} name="itineraire">AIBD-BAMBEY</MenuItem>
                        <MenuItem value="BAMBEY-TOUBA" key={2} name="itineraire">BAMBEY-TOUBA</MenuItem>  
                        <MenuItem value="AIBD-NGUEKHOKH" key={3} name="itineraire">AIBD-NGUEKHOKH</MenuItem>
                        <MenuItem value="BAMBEY-TOUBA" key={4} name="itineraire">BAMBEY-TOUBA</MenuItem>   
                            
                            }
                            </Select>
                        </FormControl> 
                    </Grid> 
                    <br/>
                    <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='matriculePat2'>Matricule Patrouilleur 2</InputLabel>
                                <Select  
                                    name='matriculePat2'
                                    id='matriculePat2' 
    
                                    value={this.state.matriculePat2} 
                                    onChange={this.onChange}
                                    >
                                {this.state.patrouilleurs.map((dt, i) =>  (
                                    <MenuItem
                                        value={dt.username}
                                        key={i} name={dt.username}>{dt.username}
                                    </MenuItem>     
                                ))
                            }
                            </Select>
                        </FormControl> 
                    </Grid>
                   
                    <br/>
                    <Grid item md={12} sm={12} xs={12}> 
                         <TextField id="matriculePat1" variant="outlined" label="Matricule Patrouilleur 1" type="text" name="matriculePat1" value={this.state.matriculePat1} onChange={this.onChange}  disabled required /> 
                            
                    </Grid>
                    <br/>  
                    <br/>
                    </div>
                    </Grid> 
                   
                    <Grid container justify="center" spacing={3} alignItems="center" s>
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={this.demarrerPatrouiller} >Valider</Button>
                       </Grid>
                    </Grid>
                  
                

                </form>
                </div>
            </Paper>
            </Grid>
            
            <Dialog
                    open={this.state.alertOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"INFORMATION"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {this.state.message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                   FERMER
                </Button>
        </DialogActions>
      </Dialog>
            </Grid>
            
        );
    }
}
export default withStyles(styles)(AddPatrouiller);
