import axios from 'axios';

class Api {
  static headers = async function(contentType) {
    return {
      'Content-Type': contentType || 'application/json'
    };
  };

  static headers = async function(contentType) {
    const jwt = process.env.REACT_APP_ADMIN_TOKEN
    let auth_header = 'Bearer ' + jwt;
    return {
      Authorization: auth_header,
      'Content-Type': contentType || 'application/json'
    };
  };

  // Todas las llamadas pasan por aquí
  static xhr = async function(route, params, verb) {
    const host = `${process.env.REACT_APP_BASE_URL}/api/admin`;
    const url = `${host}${route}`;
    const headers = await this.headers();
    const options = {
      url: url,
      method: verb,
      headers: headers,
      data: params
    };
    return axios(options);
  };

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }
}

export default Api;
