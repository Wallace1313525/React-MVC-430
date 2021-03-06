"use strict";

//create premium pages.  Activate/deactivate premium based off button presses
var CustomizeWindow = function CustomizeWindow(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "infoStyle"
    }, /*#__PURE__*/React.createElement("h3", null, "Thanks for purchasing Premium!"), /*#__PURE__*/React.createElement("h3", null, "New features coming soon..."), /*#__PURE__*/React.createElement("h3", null, "...like profile customization :)"), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }))
  );
};

var InfoWindow = function InfoWindow(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "infoStyle"
    }, /*#__PURE__*/React.createElement("h3", null, "Want Premium?"), /*#__PURE__*/React.createElement("p", null, "Now only 9 dollars!"), /*#__PURE__*/React.createElement("label", {
      htmlFor: "namecard"
    }, "Cardholder Name: "), /*#__PURE__*/React.createElement("input", {
      id: "namecard",
      type: "text",
      name: "namecard",
      placeholder: "Jane Doe"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "cardnum"
    }, "Credit Card Number: "), /*#__PURE__*/React.createElement("input", {
      id: "cardnum",
      type: "text",
      name: "cardnum",
      placeholder: "XXXX-XXXX-XXXX-XXXX"
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
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }))
  );
};

var CreateCustomizeWindow = function CreateCustomizeWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CustomizeWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var CreateInfoWindow = function CreateInfoWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(InfoWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var actButton = document.querySelector("#actButton");
  var deactButton = document.querySelector("#deactButton");
  actButton.addEventListener("click", function (e) {
    e.preventDefault();
    CreateCustomizeWindow(csrf);
    return false;
  });
  deactButton.addEventListener("click", function (e) {
    e.preventDefault();
    CreateInfoWindow(csrf);
    return false;
  });
  CreateInfoWindow(csrf);
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
