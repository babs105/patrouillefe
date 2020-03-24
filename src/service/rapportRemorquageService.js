import axios from '../axios/axios';

export const rapportRemorquageService = {
    getRapportRemorquage,
};

function getRapportRemorquage() {
    return axios.get('/rapport/getRapportRemorquage').then(handleRegisterResponse)
      .then(rapports => rapports);
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
