import axios from '../axios/axios';

export const evenementService = {

  // getAllPatrouiller,
  getPatrouilleById,
  getAllEvenementEnCoursNoBaliser,
  // getAllEvenementEnCoursBaliser,
  getAllEvenementEnCoursToAssister,
  getAllEvenementEnCoursToRemorquer,
  getAllEvenementAdeBaliser,
  getAllEvenementTerminer,
  getEventById,
  openEvent,
  closeEvent,
  baliserEvent,
  deBaliserEvent,
  annulerEvent,
  toRemorkEvent,
  remorkVehicule,
  assisterAccident,
  infosAccident,
  annulerRemorquage,
  deBaliserAccident

  // getCuveByCuveName,
  // searchRavitaillementByImmatricule,
  // deleteCuveByCuveName,
  // getAllOperationsCuveInPreviousMonth,
  // getAllOperationsCuveInCurrentMonth
};
// function ravitaillerVehicule(ravitaille) {
  
//   return axios.post('/patrouille/ravitaillerVehicule',ravitaille).then(handleRegisterResponse)
//     .then(ravitaille => ravitaille);
// }
function openEvent(evenement) {
  
  return axios.post('/evenement/openEvent',evenement).then(handleRegisterResponse)
    .then(event => event);
}
function closeEvent(evenement) {
  
  return axios.post('/evenement/closeEvent',evenement).then(handleRegisterResponse)
    .then(event => event);
}

function baliserEvent(event) {
  
  return axios.post('/evenement/baliserEvent',event).then(handleRegisterResponse)
    .then(event => event);
}

function assisterAccident(event) {
  
  return axios.post('/evenement/assisterAccident',event).then(handleRegisterResponse)
    .then(event => event);
}
function infosAccident(event) {
  
  return axios.post('/evenement/infosAccident',event).then(handleRegisterResponse)
    .then(event => event);
}


function annulerEvent(event) {
  
  return axios.post('/evenement/annulerEvent',event).then(handleRegisterResponse)
    .then(event => event);
}

function annulerRemorquage(event) {
  
  return axios.post('/evenement/annulerRemorquage',event).then(handleRegisterResponse)
    .then(event => event);
}

function deBaliserEvent(event) {
  
  return axios.post('/evenement/deBaliserEvent',event).then(handleRegisterResponse)
    .then(event => event);
}
function deBaliserAccident(event) {
  
  return axios.post('/evenement/deBaliserAccident',event).then(handleRegisterResponse)
    .then(event => event);
}


function remorkVehicule(event) {
  
  return axios.post('/evenement/remorkVehicule',event).then(handleRegisterResponse)
    .then(event => event);
}


function toRemorkEvent(event) {
  
  return axios.post('/evenement/toRemorkEvent',event).then(handleRegisterResponse)
    .then(event => event);
}

function getAllEvenementEnCoursNoBaliser() {
    return axios.get('/evenement/getAllEvenementEnCoursNoBaliser').then(handleRegisterResponse)
    .then(evenements => evenements);

  }
// function getAllEvenementEnCoursBaliser() {
//     return axios.get('/evenement/getAllEvenementEnCoursBaliser').then(handleRegisterResponse)
//       .then(evenements => evenements);
//   }
function getAllEvenementEnCoursToAssister() {
    return axios.get('/evenement/getAllEvenementEnCoursToAssister').then(handleRegisterResponse)
      .then(evenements => evenements);
  }  
  
  function getAllEvenementEnCoursToRemorquer() {
    return axios.get('/evenement/getAllEvenementEnCoursToRemorquer').then(handleRegisterResponse)
      .then(evenements => evenements);
  }

  function getAllEvenementAdeBaliser() {
    return axios.get('/evenement/getAllEvenementAdeBaliser').then(handleRegisterResponse)
      .then(evenements => evenements);
  }
  function getAllEvenementTerminer() {
    return axios.get('/evenement/getAllEvenementTerminer').then(handleRegisterResponse)
      .then(evenements => evenements);
  }  
  
function getPatrouilleById(id){
    return axios.get('/evenement/getPatrouilleById/' + id).then(handleRegisterResponse)
      .then(ravitaillement => ravitaillement);
  }
  function getEventById(id){
    return axios.get('/evenement/getEvenementById/' + id).then(handleRegisterResponse)
      .then(evenement => evenement);
  }
  
function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log('handleRegisterResponse => error');
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
