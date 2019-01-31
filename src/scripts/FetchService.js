export function performFetch(url, method, withCredentials, callbackIfUnauthenticated, body) {
  let headers = {
    mode: 'cors',
    method: method
  };

  if (withCredentials) {
    headers.credentials = 'include';
    headers.withCredentials = true;
  }

  headers.headers = {
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  };

  if (body) {
    headers.body = body;
  }

  let fetchPromise = fetch(url, headers);
  if (withCredentials) {
    fetchPromise.then(res => {
      if (res.status === 401) {
        callbackIfUnauthenticated();
      }
    }).catch(() => callbackIfUnauthenticated());
  }

  return fetchPromise;
}