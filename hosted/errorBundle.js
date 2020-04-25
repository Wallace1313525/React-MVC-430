"use strict";

var errorWindow = function errorWindow(props) {
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Page Doesn't Exist"))
  );
};

var createErrorWindow = function createErrorWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement("errorWindow", {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  createErrorWindow(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#contactMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#contactMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};