import React,{ useState, useEffect } from 'react'; 
import { Grid,Paper,Typography } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';  
import {evenementService} from '../../service/evenementService';
const useStyles = makeStyles({  
    root: {  
      width: '100%', 
      padding:20 
    },  
    container: {  
      maxHeight:500,  
      width:'100%', 
    },
  
    paper: {
        width: '100%',
       
    }
});
export default function ShowEvenement() { 

const classes = useStyles();
const [dateDebutEvent,setDateDebutEvent] =  useState('');
const [dateFinEvent,setDateFinEvent] =  useState('');
const [dateDebutBalisage,setDateDebutBalisage] =  useState('');
const [dateDeBalisage,setDateDeBalisage] =  useState('');
const [dateRemorquage,setDateRemorquage] =  useState('');
const [pka,setPka] =  useState('');
const [typeEvent,setTypeEvent] =  useState('');
const [heureBalisage,setHeureBalisage] = useState('');
const [heureRemorquage,setHeureRemorquage] = useState('');
const [matriculeVehicule,setMatriculeVehicule] = useState('');
const [categorie,setCategorie] = useState('');
const [position,setPosition] = useState('');
const [secteur,setSecteur] = useState('');
const [heureFinEvent,setHeureFinEvent] = useState('');
const [heureDebutEvent,setHeureDebutEvent] = useState('');
const [heureDeBalisage,setHeureDeBalisage] = useState('');
const [remorqueur,setRemorqueur] = useState('');
const [matriculeRemorque,setMatriculeRemorque]= useState('');
const [gareDepot,setGareDepot]= useState('');
const [etatRemorquage,setEtatRemorquage]= useState(false);





useEffect(() => {    
    
      evenementService.getEventById(window.localStorage.getItem("idEvent"))
      .then((res) => {
          let event = res;
       
          setDateDebutEvent(event.dateDebutEvent);
          setDateFinEvent(event.dateFinEvent)
          setHeureDebutEvent(event.heureDebutEvent)
          setHeureFinEvent(event.heureFinEvent)
          setDateDebutBalisage(event.dateDebutEvent)
 
            setHeureBalisage(event.balisage.heureBalisage)
            setCategorie(event.balisage.categorieVBalise)
            setMatriculeVehicule(event.balisage.matriculeVehicule)
          

          setDateDeBalisage(event.balisage.dateDeBalisage)
          setHeureDeBalisage(event.balisage.heureDeBalisage)
         
          setPka(event.pointKilometrique)
          setTypeEvent(event.typeEvenement)
          setPosition(event.position)
          setSecteur(event.secteur)
          setEtatRemorquage(false)
          if(event.etatRemorquage === true){
                setDateRemorquage(event.remorquage.dateRemorquage)
                setHeureRemorquage(event.remorquage.heureRemorquage)
                setRemorqueur(event.remorquage.remorqueur)
                setMatriculeRemorque(event.remorquage.matriculeRemorque)
                setGareDepot(event.remorquage.gareDepot)
                setEtatRemorquage(true)
          }else{
              
          }

       
      });           
  
}, []);  

    return( 
     <Grid container alignItems="center" justify="center">
            <Grid item className={classes.root} >
             <Paper className={classes.paper}>
             <Typography variant="h4" style={{ display: 'flex',justifyContent:'center' ,marginBottom:'30px', marginTop:'30px'}} >Détails Evenements </Typography>
             <Grid container alignItems="center" justify="center">
             <Grid item  >
             
             <Typography variant="h5" >Type Evenement :  {typeEvent}</Typography>
    <Typography variant="h6" >Date Heure Debut   : {dateDebutEvent} {heureDebutEvent}</Typography> 
    <Typography variant="h6" >Date Heure Fin   : {dateFinEvent} {heureFinEvent}</Typography> 
             <Typography variant="h6" >Vehicule  : {matriculeVehicule}</Typography> 
             <Typography variant="h6" >Categorie  : {categorie}</Typography> 
             <Typography variant="h6" >Pka  : {pka}</Typography> 
             <Typography variant="h6" >Postion  : {position}</Typography> 
             <Typography variant="h6" >Secteur  : {secteur}</Typography> 
             <br></br>
             <Typography variant="h5" >Balisage :</Typography> 
             <Typography variant="h6" >Heure Balisage  : {heureBalisage}</Typography> 
             <Typography variant="h6" >Date Heure Debalisage : {dateDeBalisage} {heureDeBalisage}</Typography> 
            <br></br>

              <Typography variant="h5" >Remorquage :</Typography> 
              {etatRemorquage ? (
                  <div>
              
                    <Typography variant="h6" >Date  : {dateRemorquage}</Typography>
                    <Typography variant="h6" >Heure Remorquage  : {heureRemorquage}</Typography> 
                    <Typography variant="h6" >Depanneur  :{remorqueur}</Typography> 
                    <Typography variant="h6" >Remorque : {matriculeRemorque}</Typography>
                    <Typography variant="h6" >Gare dépot  : {gareDepot}</Typography> 
                    </div>
              ):(
                <Typography variant="h6" >assisté et reparti seul</Typography>
              )
              }
              
                       
            </Grid>
            </Grid>
</Paper>

    </Grid>
    </Grid>
)


} 