"use strict";

var customizeWindow = function customizeWindow(props) {
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "customize"), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }))
  );
};

var infoWindow = function infoWindow(props) {
  return (/*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Want Premium?"), /*#__PURE__*/React.createElement("label", {
      htmlFor: "namecard"
    }, "Cardholder Name: "), /*#__PURE__*/React.createElement("input", {
      id: "namecard",
      type: "text",
      name: "namecard",
      placeholder: "Jane Doe"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "expdate"
    }, "Expiration Date: "), /*#__PURE__*/React.createElement("input", {
      id: "expdate",
      type: "month",
      name: "expdate",
      min: "2020-03",
      value: "2020-03"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "code"
    }, "Security code: "), /*#__PURE__*/React.createElement("input", {
      id: "code",
      type: "text",
      name: "code",
      placeholder: "XXX"
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Premium"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }))
  );
};

var createCustomizeWindow = function createCustomizeWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement("customizeWindow", {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createInfoWindow = function createInfoWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement("infoWindow", {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var actButton = document.querySelector("#actButton");
  var deactButton = document.querySelector("#deactButton");
  actButton.addEventListener("click", function (e) {
    e.preventDefault();
    createCustomizeWindow(csrf);
    return false;
  });
  deactButton.addEventListener("click", function (e) {
    e.preventDefault();
    createInfoWindow(csrf);
    return false;
  });
  createInfoWindow(csrf);
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
