import React from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {vehiculeService} from '../../service/vehiculeService';
import {evenementService} from '../../service/evenementService';
import {patrouilleurService} from '../../service/patrouilleurService';
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
        marginBottom: theme.spacing(1),
        width: 200,
      },
     selectEmpty: {
        marginTop: theme.spacing(2),
      }
});
class AddEvent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            idUser:'',
            debutEvent:new Date().toISOString().substring(0, 10),
            heureOuvertureEvement:'',
            typeEvenement:'',
            categorieV:'',
            autoroute:'' ,
            distance:'', 
            position:'',
            secteur:'',
            sens:'',
            typeBalisage:'',
            pointKilometrique:'',
            alertOpen:false,
            message: null,
            error:''
            
        }
        
        
    }
    componentDidMount() {
      this.setState({idUser: window.localStorage.getItem("idUser")}) ;
      this.reloadVehiculeList();
    //   this.reloadPatrouilleurs() ;
    }

    reloadVehiculeList = () => {
        vehiculeService.getAllVehicules()
            .then(res => {
                this.setState({vehicules:res});
                console.log("data",this.state.vehicules);
            })            
    }

    //   reloadPatrouilleurs = () => {
    //     patrouilleurService.getAllPatrouilleur()
    //         .then(res => {
    //             this.setState({patrouilleurs:res});
    //             console.log("data",this.state.patrouilleurs);
    //         })
         
            
    // }
    openEvent = (e) => {
        e.preventDefault();
        let heureOuvertureEvement = this.state.heureOuvertureEvement;
        let err='';
        if(heureOuvertureEvement ===''){
            err = <strong>Ne doit pas etre VIDE</strong>;
            this.setState({error:err})
        }else{
            this.setState({error:err})    
            let event = {
                idUser:this.state.idUser,
                debutEvent:this.state.debutEvent,
                heureOuvertureEvement:this.state.heureOuvertureEvement,
                typeEvenement:this.state.typeEvenement,
                categorieV : this.state.categorieV,
                typeBalisage:this.state.typeBalisage,
                secteur: this.state.secteur,
                position:this.state.position,
                pointKilometrique :this.state.autoroute+" "+this.state.distance+" "+this.state.sens,
               };
        evenementService.openEvent(event)
            .then(res => {
                if(res.error){
                this.setState({message : 'Erreur ouverture Evenement'});
                this.setState({alertOpen : true});
            }else {
                    this.setState({message : 'Ouverture evenement avec succes'});
                    this.setState({alertOpen : true});
            }
                // 
                
            });
         console.log("evenement",event);
        }
        
}
    handleClose = () => {
            this.setState({ alertOpen:false})
            this.props.history.push('/app/evenement');
        
      };

    onChange = (e) =>{
        let name = e.target.name;
        let val =  e.target.value
        let err='';
        if(name ==='distance'){
           if (val ===''){
            
             err = <strong>Your age must be a number</strong>;
             this.setState({error:err})
            
           }
            else{
            this.setState({error:err})    
            this.setState({ [e.target.name]: e.target.value })
            }
        }
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center" spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
            <Paper className={classes.paper }>
                <div className={classes.margin}>
                <form >
                <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px'}} >Ouverture Evenement</Typography>
                    <Grid container spacing={4} alignItems="center">
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                                id="date"
                                variant="outlined"
                                label="Date Evenement"
                                name="debutEvent"
                                type="date"
                                defaultValue={this.state.debutEvent}
                                value={this.state.date}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{shrink: true, }}
                            />
                             <TextField
                                id="heureOuvertureEvement"
                                variant="outlined"
                                label="Heure Debut"
                                name="heureOuvertureEvement"
                                type="time"
                                value={this.state.heureOuvertureEvement}
                                onChange={this.onChange}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            {this.state.error}
                           
                           
                    </Grid>
                    <Grid item md={12}  sm={12} xs={12}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='typeEvenement'>Type Evenement </InputLabel>
                                <Select  
                                    name='typeEvenement'
                                    id='typeEvenement'  
                                    value={this.state.typeEvenement} 
                                    onChange={this.onChange}
                                    >
                                    <MenuItem value="PANNE" key={1} name="typeEvenement">PANNE</MenuItem>
                                    <MenuItem value="ACCIDENT"key={2} name="typeEvenement">ACCIDENT</MenuItem> 
                                    <MenuItem value="INTRUSION PIETON "key={3} name="typeEvenement">INTRUSION PIETON</MenuItem>
                                    <MenuItem value="INTRUSION ANIMAL"key={4} name="typeEvenement">INTRUSION ANIMAL</MenuItem>
                                    <MenuItem value="FEUX" key={5} name="typeEvenement">FEUX</MenuItem> 
                                    <MenuItem value="RAMASSAGE" key={6} name="typeEvenement">RAMASSAGE</MenuItem>
                                    <MenuItem value="REPARATION GRILLAGE" key={7} name="typeEvenement">REPARATION GRILLAGE</MenuItem>
                                    <MenuItem value="NETTOYAGE" key={8} name="typeEvenement">NETTOYAGE</MenuItem>
                                    <MenuItem value="BALAYAGE MANUEL" key={9} name="typeEvenement">BALAYAGE MANUEL</MenuItem> 
                                    <MenuItem value="BALAYAGE MECANIQUE" key={10} name="typeEvenement">BALAYAGE MECANIQUE</MenuItem>     
                                    {/* <MenuItem value="SINDIA-MBOUR"key={3} name="typeEvenement">SINDIA-MBOUR</MenuItem>
                                     <MenuItem value="BAMBEY-DIOURBEL-TOUBA"key={4} name="typeEvenement">BAMBEY-DIOURBEL-TOUBA</MenuItem>    */}
                            </Select>
                        </FormControl> 
                        
                    </Grid>
                    
                        <Grid item md={12} sm={12} xs={12}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='autoroute'>Autoroute </InputLabel>
                                <Select  
                                    name='autoroute'
                                    id='autoroute'  
                                    value={this.state.autoroute} 
                                    onChange={this.onChange}
                                    >
                                    <MenuItem value="A1"key={1} name="autoroute">A1</MenuItem>
                                    <MenuItem value="A2"key={2} name="autoroute">A2</MenuItem>  
                                    {/* <MenuItem value="SINDIA-MBOUR"key={3} name="typeEvenement">SINDIA-MBOUR</MenuItem>
                                     <MenuItem value="BAMBEY-DIOURBEL-TOUBA"key={4} name="typeEvenement">BAMBEY-DIOURBEL-TOUBA</MenuItem>    */}
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
                                // type="number"
                                value={this.state.distance}
                                onChange={this.onChange}
                                className={classes.textField}
                            
                            />
                             
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='sens'>Sens </InputLabel>
                                <Select  
                                    name='sens'
                                    id='sens'  
                                    value={this.state.sens} 
                                    onChange={this.onChange}
                                    >
                                    <MenuItem value="SENS-1"key={1} name="sens">SENS-1</MenuItem>
                                    <MenuItem value="SENS-2"key={2} name="sens">SENS-2</MenuItem>  
                                    {/* <MenuItem value="SINDIA-MBOUR"key={3} name="typeEvenement">SINDIA-MBOUR</MenuItem>
                                     <MenuItem value="BAMBEY-DIOURBEL-TOUBA"key={4} name="typeEvenement">BAMBEY-DIOURBEL-TOUBA</MenuItem>    */}
                            </Select>
                        </FormControl> 
                   </Grid>
                   <Grid item md={4} sm={4} xs={4}>
                    <FormControl  className={classes.formControl}>
                                <InputLabel   id='sens'>Position </InputLabel>
                                <Select  
                                    name='position'
                                    id='position'  
                                    value={this.state.position} 
                                    onChange={this.onChange}
                                    >
                                    <MenuItem value="Voie Rapide" key={1} name="position">Voie Rapide</MenuItem>
                                    <MenuItem value="Voie Lente" key={2} name="position">Voie Lente</MenuItem>  
                                    <MenuItem value="BAU" key={3} name="position">BAU</MenuItem>
                                    <MenuItem value="Accotement" key={4} name="position">Accotement</MenuItem>
                                    <MenuItem value="Canalisation" key={4} name="position">Canalisation</MenuItem>
                            </Select>
                        </FormControl> 
                    </Grid>


                   {(this.state.typeEvenement==='ACCIDENT'||this.state.typeEvenement==='PANNE'||this.state.typeEvenement==='FEUX')?
                    <Grid item md={12}  sm={12} xs={12}>
                         <FormControl  className={classes.formControl}>
                                <InputLabel   id='categorieV'>Categorie </InputLabel>
                                <Select  
                                    name='categorieV'
                                    id='categorieV'  
                                    value={this.state.categorieV} 
                                    onChange={this.onChange}
                                    >
                                    <MenuItem value="MOTO"key={1} name="categorieV">MOTO</MenuItem>
                                    <MenuItem value="VL"key={2} name="categorieV">VL</MenuItem>  
                                    <MenuItem value="PL"key={3} name="categorieV">PL</MenuItem>
                                    <MenuItem value="TC"key={4} name="categorieV">TC</MenuItem>   
                            </Select>
                        </FormControl> 
                        </Grid>
                        :null
                  }


{
(this.state.typeEvenement ==='BALAYAGE MECANIQUE' || this.state.typeEvenement ==='BALAYAGE MANUEL')?(
    <Grid item md={12} sm={12} xs={12}> 
    <FormControl  className={classes.formControl}>
        <InputLabel   id='typeBalisage'>Type Balisage </InputLabel>
        <Select  
            name='typeBalisage'
            id='typeBalisage'  
            value={this.state.typeBalisage} 
            onChange={this.onChange}
            >
             <MenuItem value="Mobile" key={3} name="typeBalisage">Mobile</MenuItem>
             <MenuItem value="Fixe" key={4} name="typeBalisage">Fixe</MenuItem>  

    
    
    </Select>
</FormControl> 
</Grid> 
):null
}             
{
(this.state.typeEvenement ==='BALAYAGE MECANIQUE' || this.state.typeEvenement ==='BALAYAGE MANUEL')?(
    (this.state.autoroute ==='A1' ||this.state.autoroute ==='A2')?(
        <Grid item md={12} sm={12} xs={12}> 
            <FormControl  className={classes.formControl}>
                <InputLabel   id='secteur'>Secteur </InputLabel>
                <Select  
                    name='secteur'
                    id='secteur'  
                    value={this.state.secteur} 
                    onChange={this.onChange}
                    >
   
           <MenuItem value="AMT"key={1} name="secteur">AMT</MenuItem>
          <MenuItem value="ILA TOUBA"key={2} name="secteur">ILA TOUBA</MenuItem>   
            
            
            </Select>
        </FormControl> 
    </Grid> 

):null)
:(this.state.autoroute ==='A1'?(
    <Grid item md={12} sm={12} xs={12}> 
        <FormControl  className={classes.formControl}>
            <InputLabel   id='secteur'>Secteur </InputLabel>
            <Select  
                name='secteur'
                id='secteur'  
                value={this.state.secteur} 
                onChange={this.onChange}
                >

       <MenuItem value="AIBD-NGUEKHOKH"key={1} name="secteur">AIBD-NGUEKHOKH</MenuItem>
      <MenuItem value="NGUEKHOKH-MBOUR"key={2} name="secteur">NGUEKHOKH-MBOUR</MenuItem>   
        
        
        </Select>
    </FormControl> 
</Grid> 
):this.state.autoroute ==='A2'?(
<Grid item md={12} sm={12} xs={12}> 
<FormControl  className={classes.formControl}>
<InputLabel   id='secteurid'>Secteur </InputLabel>
<Select  
name='secteur'
id='secteurid'  
value={this.state.secteur} 
onChange={this.onChange}
>
<MenuItem value="AIBD-BAMBEY" key={3} name="secteur">AIBD-BAMBEY</MenuItem>
<MenuItem value="BAMBEY-TOUBA" key={4} name="secteur">BAMBEY-TOUBA</MenuItem>  



</Select>
</FormControl> 
</Grid> 
):null
)

}                   

                        <Grid item md={12} sm={12} xs={12}> 
                         {/* <TextField id="cuvename" variant="outlined" label="Imma" type="text" name="cuveName" value={this.state.cuveName} onChange={this.onChange} fullWidth  autoFocus disabled required /> */}
                       
                    </Grid> 
                    </Grid>  
                    <Grid container justify="center" spacing={3} alignItems="center">
                        <Grid item md={6} sm={4} xs={12}>
                          <Button variant="contained"  color="primary" fullWidth onClick={this.openEvent} >Valider</Button>
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
export default withStyles(styles)(AddEvent);
