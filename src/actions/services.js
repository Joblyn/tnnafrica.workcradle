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
      method: "GET"
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
  let endpoint = baseUrl + url;
  const token = JSON.parse(localStorage.getItem("tokens")).access.token;
  const bearerToken = "Bearer " + token;
  const credentials = {
    method: "GET",
    headers: {
      Authorization: bearerToken
    }
  };
  nprogress.start();
  return (dispatch) => {
    fetch(endpoint, credentials)
      .then((res) => res.json())
      .then((data) => {
        if (data.page) {
          let results = [...data.results];
          let page_num = 1;
          while (page_num < data.totalPages) {
            fetch(endpoint + `?page=${page_num + 1}`, credentials)
              .then((res) => res.json())
              .then((newData) => {
                results = results.concat(newData.results);
                dispatch(done(results));
                dispatch(onErrors(ActionTypes.NO_ERRORS, false));
              });
            page_num++;
          }
          nprogress.done();
          nprogress.remove();
          dispatch(done(results));
          dispatch(onErrors(ActionTypes.NO_ERRORS, false));
        } else {
          nprogress.done();
          nprogress.remove();
          dispatch(done(data));
          dispatch(onErrors(ActionTypes.NO_ERRORS, false));
        }
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
        Authorization: bearerToken
      }
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
        Authorization: bearerToken
      }
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
        "Content-Type": "application/json"
      }
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
        Authorization: bearerToken
      }
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
