import React, { Fragment } from 'react';
import {Route, Switch } from 'react-router-dom';
import UserList from '../components/User/UserListComponent' ;
import AddUser  from'../components/User/UserAddComponent';
import EditUser  from'../components/User/UserEditComponent';
import Dashboard  from '../components/Dashboard/Dashboard';
import NotFound from '../components/NotFound/NotFound';
import NavBar from '../components/Layout/NavBar/NavBar'
import Container from '@material-ui/core/Container';


import VehiculeList from '../components/Vehicule/VehiculeListComponent' ;
import AddVehicule  from'../components/Vehicule/VehiculeAddComponent';

// import PatrouilleList from '../components/Rapport/Patrouille/PatrouilleListComponent' ;
import Rapport from '../components/Rapport/Rapport';

import ListPatrouilleur from '../components/Patrouilleur/ListPatrouilleur';
import AddPatrouille from '../components/Rapport/Patrouille/PatrouilleAddComponent' ;
import EditPatrouille from '../components/Rapport/Patrouille/PatrouilleEditComponent';

import ListPatrouiller from '../components/Patrouiller/ListPatrouiller';
import AddPatrouiller from '../components/Patrouiller/AddPatrouiller' ;

import ListEvent from '../components/Evenement/ListEvenement';
import AddEvent from '../components/Evenement/AddEvenement';
import ShowEvent from '../components/Evenement/ShowEvenement'








const PrivateRoutes = ({ match}) => (
	<Fragment>
	 <NavBar/>
	<Container>
		<Switch>
			<Route path="/app/users" exact component={UserList} />
			<Route path="/"  exact component={Dashboard} />
			<Route path="/app" exact component={Dashboard} />
			<Route path="/app/dashboard" exact component={Dashboard} />
            <Route path="/app/add-user"  exact component={AddUser} />
			<Route path="/app/edit-user" exact component={EditUser} />
			<Route path="/app/rapport" exact component={Rapport} />
			<Route path="/app/add-patrouille" exact component={AddPatrouille} />
			<Route path="/app/edit-patrouille" exact component={EditPatrouille} />

			<Route path="/app/patrouilleur" exact component={ListPatrouilleur} />
            <Route path="/app/patrouiller" exact component={ListPatrouiller} />
			<Route path="/app/add-patrouiller" exact component={AddPatrouiller} />

			<Route path="/app/evenement" exact component={ListEvent} />
            <Route path="/app/add-event" exact component={AddEvent} />
			<Route path="/app/show-event" exact component={ShowEvent} />


			<Route path="/app/vehicule" exact component={VehiculeList} />
			<Route path="/app/add-vehicule" exact component={AddVehicule} />

			<Route component={NotFound} />
		</Switch>
	</Container>
	</Fragment>
);
export default PrivateRoutes;