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
  const token = getToken() || '';

  console.log(666666666666);
  console.log(`NS_${key}_${token}`);
  console.log(666666666666);

  return `NS_${key}_${token}`;
};
