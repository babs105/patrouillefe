import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {vehiculeService} from '../../../service/vehiculeService'
import {patrouilleService} from '../../../service/patrouilleService';
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
      }
});
class PatrouilleAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            vehicules:[],
            immatricules:'',
            date:'',
            heureDebutPatrouille:'',
            heureFinPatrouille:'',
            kilometrageDebutPatrouille: '',
            kilometrageFinPatrouille: '',
            itineraire:'',
            moto:'',
            vl:'',
            pl:'',
            tc:'',
            alertOpen:false,
            message: null
        }
        
    }
    componentDidMount() {
           this.reloadVehiculeList();
    }

    reloadVehiculeList = () => {
        vehiculeService.getAllVehicules()
            .then(res => {
                this.setState({vehicules:res});
                console.log("data",this.state.vehicules);
            })  
         
            
    }
    createPatrouille = (e) => {
        e.preventDefault();
        let patrouille = {
             date: this.state.date,
             matricule: this.state.matricule,
             heureDebutPatrouille: this.state.heureDebutPatrouille,
             heureFinPatrouille: this.state.heureFinPatrouille,
             kilometrageDebutPatrouille: this.state.kilometrageDebutPatrouille,
             kilometrageFinPatrouille: this.state.kilometrageFinPatrouille,
             itineraire:this.state.itineraire,
             moto:this.state.moto,
             vl:this.state.vl,
             pl:this.state.pl,
             tc:this.state.tc
            };
        patrouilleService.createPatrouille(patrouille)
            .then(res => {
                if(res.error){
                this.setState({message : 'Patrouille NON enregistrée'});
                this.setState({alertOpen : true});
            }else {
                    this.setState({message : 'Patrouille enregistrée'});
                    this.setState({alertOpen : true});
            }
                // 
                
            });
        console.log("patrouille",patrouille);
       
    }
    handleClose= () => {
            this.setState({ alertOpen:false})
            this.props.history.push('/app/patrouille');
        
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
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Patrouille</Typography>
                    <Grid container spacing={4} alignItems="center">
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                                id="datePatrouille"
                                variant="outlined"
                                label="Date Patrouille"
                                name="date"
                                type="date"
                                value={this.state.date}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    </Grid>
                    <Grid item md={12}  sm={12} xs={12}>
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
                    
                        <TextField
                                id="heurefin"
                                variant="outlined"
                                label="Heure Fin Patrouille"
                                name="heureFinPatrouille"
                                type="time"
                                value={this.state.heureFinPatrouille}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                    </Grid>
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
                        <Grid item md={12} sm={12} xs={12}>
                        <TextField  className={classes.textField} id="kilometragedebut" variant="outlined" label="Kilometrage Début " type="number" name="kilometrageDebutPatrouille" value={this.state.kilometrageDebutPatrouille} onChange={this.onChange}  required />
                        
                        <TextField  className={classes.textField} id="kilometragefin" variant="outlined" label="Kilometrage Fin" type="number" name="kilometrageFinPatrouille" value={this.state.kilometrageFinPatrouille} onChange={this.onChange}  required />
                        </Grid>

                        <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                            <FormControl  className={classes.formControl}>
                                <InputLabel   id='itineraire'>Itineraire </InputLabel>
                                <Select  
                                    name='itineraire'
                                    id='itineraireid'  
                                    value={this.state.itineraire} 
                                    onChange={this.onChange}
                                    >
                        <MenuItem value="THIES-SOUNE-THIAMBOKH-BAMBEY"key={1} name="itineraire">THIES-SOUNE-THIAMBOKH-BAMBEY</MenuItem>
                        <MenuItem value="AIBD-SINDIA"key={2} name="itineraire">AIBD-SINDIA</MenuItem>  
                        <MenuItem value="SINDIA-MBOUR"key={3} name="itineraire">SINDIA-MBOUR</MenuItem>
                        <MenuItem value="BAMBEY-DIOURBEL-TOUBA"key={4} name="itineraire">BAMBEY-DIOURBEL-TOUBA</MenuItem>   
                            
                            }
                            </Select>
                        </FormControl> 
                    </Grid> 
                    
                    <Grid item md={12}  sm={12} xs={12}>
                     <TextField  className={classes.textField} id="mt" variant="outlined" label="nombre de MT" type="number" name="moto" value={this.state.moto} onChange={this.onChange}   required />
                     <TextField  className={classes.textField} id="vl" variant="outlined" label="nombre de VL" type="number" name="vl" value={this.state.vl} onChange={this.onChange}   required />
                     </Grid>
                     <Grid item md={12}  sm={12} xs={12}>
                     <TextField  className={classes.textField} id="pl" variant="outlined" label="nombre de PL" type="number" name="pl" value={this.state.pl} onChange={this.onChange}  required />
                     <TextField  className={classes.textField} id="tc" variant="outlined" label="nombre de TC" type="number" name="tc" value={this.state.tc} onChange={this.onChange}  required />
                    </Grid>
                    </Grid> 
                    <Grid container justify="center" spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={this.createPatrouille} >Valider</Button>
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
export default withStyles(styles)(PatrouilleAddComponent);
