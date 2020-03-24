import axios from '../axios/axios';

export const patrouilleService = {

  getAllPatrouille,
  getPatrouilleById,
  createPatrouille,
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
function createPatrouille(patrouille) {
  
  return axios.post('/patrouille/openPatrouille',patrouille).then(handleRegisterResponse)
    .then(patrouille => patrouille);
}
function getAllPatrouille() {
    return axios.get('/patrouille/getAllPatrouille').then(handleRegisterResponse)
      .then(patrouilles => patrouilles);
  }


function getPatrouilleById(id){
    return axios.get('/patrouille/getPatrouilleById/' + id).then(handleRegisterResponse)
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
