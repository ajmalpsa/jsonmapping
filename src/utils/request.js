import 'whatwg-fetch';
import auth from './auth';
import { CONNECT_TO_SERVER, ERROR_403, LOCK_PATH, LOGIN_PATH } from "./Apis";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1)
        return response.json ? response.json() : response;
    else
        return response;

}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response, checkToken = true) {
    if ((response.status >= 200 && response.status < 300) || response.status === 0) {
        return response;
    }

    // TODO handle 403...

    if (response.status === 401) {
        const server = auth.get(CONNECT_TO_SERVER)
        //auth.logout()
        // Temporary fix until we create a new request helper
        auth.clearAppStorage();
        auth.set(server, CONNECT_TO_SERVER)
        window.accumexs.goTo(LOGIN_PATH)
    }

    if (response.status === 406 && window.location.pathname !== LOCK_PATH) {
        auth.set("true", "isLocked")
        window.accumexs.goTo(LOCK_PATH)

    }
    if (response.status === 403) {
        window.accumexs.goTo(ERROR_403)
    }

    return parseJSON(response)
        .then(responseFormatted => {
            const error = new Error(response.statusText);
            error.response = response;
            error.response.payload = responseFormatted;
            throw error;
        })
        .catch((e) => {
            // console.log(response.statusText, e);
            const error = new Error(response.statusText);
            error.response = response;

            throw error;
        });
}

/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
function formatQueryParams(params) {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(...args) {
    let [url, options = {}, stringify = true, ...rest] = args;
    let noAuth;

    try {
        [{ noAuth }] = rest;
    } catch (err) {
        noAuth = false;
    }

    // Set headers
    if (!options.headers) {
        options.headers = Object.assign(
            {
                'Content-Type': 'application/json',
            },
            options.headers
        );
    }

    const server = auth.get(CONNECT_TO_SERVER)
    if (server && Object.keys(server).length) {
        options.headers = Object.assign(
            {
                "DBkey": server.code,
            },
            options.headers
        );
    }

    const token = auth.getToken();

    if (token && !noAuth) {
        options.headers = Object.assign(
            {
                Authorization: `Bearer ${token}`,
            },
            options.headers
        );
    }

    // Add parameters to url

    if (options && options.params) {
        const params = formatQueryParams(options.params);
        url = `${url}?${params}`;
    }

    // Stringify body object
    if (options && options.body && stringify) {
        options.body = JSON.stringify(options.body);
    }

    const excludePath = [LOGIN_PATH, LOCK_PATH]

    let purl = auth.get("current_url")
    // console.log(excludePath.indexOf(purl), purl, window.location.pathname, excludePath);

    auth.set(window.location.pathname, "current_url")

    if (purl !== window.location.pathname && excludePath.indexOf(purl) < 0)
        auth.set(purl, "prev_url")

    const setTimeStamp = (timeStamp) => {
        if (timeStamp)
            localStorage.setItem('responseTime', timeStamp);
    }


    return new Promise(function (resolve, reject) {
        fetch(url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then(response => {
                setTimeStamp(response.timeStamp);
                resolve(response)
            }).catch(e => {
                reject(e)
            });
    });

}
