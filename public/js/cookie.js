exports.setCookie = (name, value, days) => {
  this.deleteCookie();
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

exports.getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

exports.deleteCookie = () => {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}