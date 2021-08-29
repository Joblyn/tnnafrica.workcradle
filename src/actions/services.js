// import axios from "axios";
import * as nprogress from "nprogress";

import { baseUrl } from "../apiConstants/apiConstants";
import * as ActionTypes from "./Types";
import onErrors from "./errorHandler";

nprogress.configure({ showSpinner: false, easing: "ease", speed: 500 });

export const getData = (url, done) => {
  const endpoint = baseUrl + url;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
      });
  };
};

export const getDataWithToken = (url, done) => {
  const endpoint = baseUrl + url;
  const token = JSON.parse(localStorage.getItem("tokens")).access.token;
  const bearerToken = "Bearer " + token;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
      });
  };
};

export const patchDataWithToken = (url, payload, done) => {
  const endpoint = baseUrl + url;
  const token = JSON.parse(localStorage.getItem("tokens")).access.token;
  const bearerToken = "Bearer " + token;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
      });
  };
};

export const deleteData = (url, done) => {
  const endpoint = baseUrl + url;
  const token = JSON.parse(localStorage.getItem("tokens")).access.token;
  const bearerToken = "Bearer " + token;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
      });
  };
};

export const postData = (url, payload, done) => {
  const endpoint = baseUrl + url;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        console.log(data);
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        console.log(err);
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
        alert(
          "An error occured, please check internet connection and try again!"
        );
      });
  };
};

export const postDataWithToken = (url, payload, done) => {
  const endpoint = baseUrl + url;
  const token = JSON.parse(localStorage.getItem("tokens")).access.token;
  const bearerToken = "Bearer " + token;
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        nprogress.done();
        nprogress.remove();
        dispatch(done(data));

        dispatch(onErrors(ActionTypes.NO_ERRORS, false));
      })
      .catch((err) => {
        nprogress.done();
        nprogress.remove();
        dispatch(onErrors(ActionTypes.GET_ERRORS, err));
      });
  };
};
