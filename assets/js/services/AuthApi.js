import Axios from "axios";
import InvoicesAPI from "./InvoicesAPI";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

/**
 * Déconnexion (suppr du token du localStorage et sur Axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
}

/**
 * Requete http auth et stockage token dans le sotrate et sur axios
 * @param {object} credentials
 * @returns
 */
function Authenticate(credentials) {
  return Axios.post(LOGIN_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // Je stocke le token dans mon local token
      window.localStorage.setItem("authToken", token);

      //on previent axios qu'on a maintenant un header par défaut sur toutes nos requêtes http
      setAxiosToken(token);
    });
}

/**
 * positionne le token JWT sur axios
 * @param {string} token le token JWT
 */
function setAxiosToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
  // voir si on a un token
  const token = window.localStorage.getItem("authToken");

  // si le token est encore valide alors on va donner le token à axios
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Permet de savoir si on est auth
 * @returns boolean
 */
function isAuthenticated() {
  // voir si on a un token
  const token = window.localStorage.getItem("authToken");

  // si le token est encore valide alors on va donner le token à axios
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }

  return false;
}

export default {
  Authenticate,
  logout,
  setup,
  isAuthenticated,
};
