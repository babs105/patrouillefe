import axios from '../axios/axios';

export const patrouillerService = {

  // getAllPatrouiller,
  getPatrouilleById,
  getAllPatrouillerEnCours,
  demarrerPatrouiller,
  terminerPatrouiller
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
function demarrerPatrouiller(patrouille) {
  
  return axios.post('/patrouiller/debuter',patrouille).then(handleRegisterResponse)
    .then(patrouille => patrouille);
}

function terminerPatrouiller(patrouille) {
  
  return axios.post('/patrouiller/terminer',patrouille).then(handleRegisterResponse)
    .then(patrouille => patrouille);
}
function getAllPatrouillerEnCours() {
    return axios.get('/patrouiller/getAllPatrouillerEnCours').then(handleRegisterResponse)
      .then(patrouillers => patrouillers);
  }


function getPatrouilleById(id){
    return axios.get('/patrouiller/getPatrouilleById/' + id).then(handleRegisterResponse)
      .then(ravitaillement => ravitaillement);
  }
// function getAllOperationsCuveInPreviousMonth() {
//     return axios.get('/operationsCuve/getAllOperationsCuveInInPreviousMonth').then(handleRegisterResponse)
//       .then(operations => operations);
//   }
//   function getAllOperationsCuveInCurrentMonth() {
//     return axios.get('/operationsCuve/getAllOperationsCuveInCurrentMonth').then(handleRegisterResponse)
//       .then(operations => operations);
//   }
 
  // function searchRavitaillementByImmatricule(critere){
  //   return axios.get('/operationsCuve/searchRavitaillementByImmatricule/' + critere).then(handleRegisterResponse)
  //     .then(ravitaillement => ravitaillement);
  // }
  // function getCuveByCuveName(cuveName) {
  //   return axios.get('/cuve/getCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
  //     .then(cuve => cuve);
  // }
  // function deleteCuveByCuveName(cuveName) {
  //   return axios.delete('/cuve/deleteCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
  //     .then(cuve => cuve);
  // }

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
