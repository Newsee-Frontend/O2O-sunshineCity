import Cookies from 'js-cookie';

const TokenKey = 'app-token';

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const setToken = token => {
  return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
  return Cookies.remove(TokenKey);
};

export const storageFactory = key => {
  let token = getToken() || '';
  token = token.replace(/\-/g, '_').replace(/\./g, '_');
  const all = `NS_${key}_${token}`;

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlckFkbWluIiwianRpIjoiMSIsImlhdCI6MTU2MjkyMTI2NH0.JprDmZqzDf4iaome_pXXF_-fpeN_o5FEV_9J27ROTcM

  return all.substring(0, 80);
};
