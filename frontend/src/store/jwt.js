async function jwtFetch(url, options = {}) {

  options.method = options.method || "GET";
  options.headers = options.headers || {};
  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;

  if (options.method.toUpperCase() !== "GET") {
    options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }

  if (options.method.toUpperCase() !== "GET" && url !== '/api/users/upload' && !(options.body instanceof FormData) &&
  !options.headers["Content-Type"]) {
    options.headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
  }

export default jwtFetch;
