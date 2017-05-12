var trackingCookie = (function () {
  var cookieName = 'DXVisitor';
  var backUrl = document.location.origin + '/devextreme-reactive/track/';
  var cookieSource = 'https://js.devexpress.com/track?backUrl=' + backUrl;

  function getUrlQueryParam(name) {
      var url = window.location.href;
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var params = regex.exec(url);
      
      if (!params) return null;
      if (!params[2]) return '';

      return decodeURIComponent(params[2].replace(/\+/g, " "));
  }  

  function checkDXVisitorCookie() {
      var visitor = Cookies.get(cookieName);
      if (!visitor) {
          var iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = cookieSource;
          document.body.appendChild(iframe);
      }
  }

  function setupDXVisitorCookie() {
      var visitor = getUrlQueryParam(cookieName);
      if (visitor) {
        Cookies.set(cookieName, visitor, { expires: 365 * 2 });
      }
  }

  return {
    check: checkDXVisitorCookie,
    setup: setupDXVisitorCookie
  }
})();
