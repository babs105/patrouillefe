import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import {getCookie,setCookie,delCookies } from '../../../utils/Cookie';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EvStationIcon from '@material-ui/icons/EvStation';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { history } from '../../../routage/ExtBrowserRouter';
import {userService} from '../../../service/userService';
import logo from '../../../../src/static/images/route.png';


const style = {
    flexGrow: 1

}

  
class NavBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            user:''
        }
        
    }


    componentDidMount(){
    this.getLoggedUser();

    }
     getLoggedUser = () =>{
        let cookie =  getCookie('PATROUILLE_COOKIE');
        
         if(cookie) {
            userService.loginExistingUser(cookie)
                .then(data =>{
                    this.setState({user:data.user});
                        window.localStorage.setItem("role", data.user.role);
                        window.localStorage.setItem("idUser", data.user.id);
                        window.localStorage.setItem("loginMatricule", data.user.username
                        );
            });
         }
      }
      
goToUsers = () => {
       
            history.push('/app/users');
     }
goToDashboard = () => {
       
    history.push('/app/dashboard');
   }
    goToPatrouille = () => {
        
        history.push('/app/patrouille');
    }
    // goToPatrouilleur = () => {
        
    //     history.push('/app/patrouilleur');
    // }
    goToRapports= () => {
        
        history.push('/app/rapport');
    }

    goToEvent = () => {
        
        history.push('/app/evenement');
    }
    goToPatrouiller = () => {
       
    history.push('/app/patrouiller');
    }

    goToVehecule = () => {
        
        history.push('/app/vehicule');
    }
     goToLogout = () => {

        //    deleteAllCookies();
        //    setCookie('APPCARBU_COOKIE','');
        delCookies();
        setCookie('PATROUILLE_COOKIE','');
        
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("idUser");
        window.localStorage.removeItem("loginMatricule");
        this.setState({user:''});
        console.log('DECONNEXION');
        history.push('/');

        }
        
    render(){
    return (
        <div>
            <AppBar position="static" style={{marginBottom:'30px'}}>
                <Toolbar>
                    <Avatar src={logo}/>
                    <Typography variant="h6"  style={style}>
                        SASTRANS
                    </Typography>
                        {this.state.user.role === "Admin"
                           ? (
                            <div>
                                <Button color="inherit" onClick={this.goToDashboard}>
                                    <DashboardIcon/>Tableau de bord
                                </Button>
                                <Button color="inherit"  onClick={this.goToUsers}>
                                     <PeopleAltIcon/>Utilisateurs
                                </Button>
                                <Button color="inherit" onClick={this.goToEvent}>
                                     <DriveEtaIcon/> Evenements
                               </Button>
                               
                                <Button color="inherit" onClick={this.goToVehecule}>
                                     <DriveEtaIcon/> Vehicules
                               </Button> 
                                <Button color="inherit" onClick={this.goToPatrouiller}>
                                    <DriveEtaIcon/>Patrouilles
                                </Button>
                                <Button color="inherit" onClick={this.goToRapports}>
                                    <LocalGasStationIcon/>Rapports
                                </Button>

                                <Button color="inherit" onClick={this.goToLogout}>
                                     <ExitToAppIcon/>
                                     Deconnexion
                                     </Button>
                            </div>
                            )
                            :this.state.user.role === "Superviseur"?(
                                    <div>
                                        <Button color="inherit" onClick={this.goToDashboard}>
                                    <DashboardIcon/>Tableau de bord
                                </Button>
                                        
                                <Button color="inherit" onClick={this.goToPatrouiller}>
                                    <LocalGasStationIcon/>Patrouilles
                                </Button>
                                                
                                <Button color="inherit" onClick={this.goToPatrouilleur}>
                                    <LocalGasStationIcon/>Patrouilleurs
                                </Button>
                                        <Button color="inherit" onClick={this.goToLogout}>
                                            <ExitToAppIcon/>
                                            Deconnexion
                                    </Button>
                             </div>
                             ):this.state.user.role === "Patrouilleur"?(
                                <div>
                                      <Button color="inherit" onClick={this.goToDashboard}>
                                    <DashboardIcon/>Tableau de bord
                                </Button>
                                        
                                <Button color="inherit" onClick={this.goToPatrouiller}>
                                    <LocalGasStationIcon/>Patrouilles
                                </Button>
                                        <Button color="inherit" onClick={this.goToLogout}>
                                            <ExitToAppIcon/>
                                            Deconnexion
                                    </Button>
                         </div>
                         ):null
                        }
                     
                </Toolbar>
            </AppBar>
        </div>
    );
}
}
export default NavBar;