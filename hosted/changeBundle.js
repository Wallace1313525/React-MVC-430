"use strict";

//change your password and send data to account controller
var handleNewPass = function handleNewPass(e) {
  e.preventDefault();
  $("#contactMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RING! All field required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RING! Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
  return false;
};

var ChangePassWindow = function ChangePassWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "changePassForm",
      name: "changePassForm",
      onSubmit: handleNewPass,
      action: "/maker",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("h3", null, "Change your password"), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "new password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Retype New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Change"
    }))
  );
};

var createChangeWindow = function createChangeWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  createChangeWindow(csrf);
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

//if there is an error, bring out the phone image and display the error
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
