var trackingCookie = (function () {
  var cookieName = 'DXVisitor';
  var backUrl = document.location.origin + '/devextreme-reactive/track/';
  var cookieSource = 'https://js.devexpress.com/track?backUrl=' + backUrl;

  function createCookiePolicyContent(cookieKey) {
    return $('<div class="cookie-policy">\
      <div class="container">\
        <div class="title"><strong>Why We Use Cookies</strong></div>\
        <div class="text">This site uses cookies to make your browsing experience more convenient and personal. Cookies store useful information on your computer to help us improve the efficiency and relevance of our site for you. In some cases, they are essential to making the site work properly. By accessing this site, you consent to the use of cookies. For more information, refer to DevExpress’ <a href="https://www.devexpress.com/AboutUs/privacy-policy.xml" target="_blank">privacy policy</a> and <a href="https://www.devexpress.com/AboutUs/cookie-policy.xml" target="_blank">cookie policy</a>.</div>\
        <div class="cookie-policy-button btn btn-default btn-lg" onclick="document.cookie = \'' + cookieKey + '=\' + escape(new Date()) + \';expires=\' + new Date(2100, 0, 1).toGMTString() + \';path=/\'; $(\'.cookie-policy\').remove();">I Understand</div>\
      </div>\
      </div>');
  }

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

  function noticeVisitor() {
    var cookieKey = 'dx-cookie-policy';
    if (!Cookies.get(cookieKey)) {
      var content = createCookiePolicyContent(cookieKey);
      content.appendTo('body');
    }
  }

  return {
    check: checkDXVisitorCookie,
    setup: setupDXVisitorCookie,
    notice: noticeVisitor,
  }
})();
