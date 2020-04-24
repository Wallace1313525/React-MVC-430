"use strict";

var customizeWindow = function customizeWindow(props) {
  console.log("customize"); //return(
  //<div>
  //<p>customize</p>
  //<input type="hidden" name="_csrf" value={props.csrf} />
  //</div>
  //);
};

var infoWindow = function infoWindow(props) {
  console.log("info"); //return(
  //<div>
  //<h3>Want Premium?</h3>       
  //<label htmlFor="namecard">Cardholder Name: </label>
  //<input id="namecard" type="text" name="namecard" placeholder="Jane Doe"/>
  //<label htmlFor="expdate">Expiration Date: </label>
  // <input id="expdate" type="month" name="expdate" min="2020-03" value="2020-03"/>
  //<label htmlFor="code">Security code: </label>
  //<input id="code" type="text" name="code" placeholder="XXX"/> 
  //<input className="formSubmit" type="submit" value="Premium"/>
  //<input type="hidden" name="_csrf" value={props.csrf} />
  //</div>
  //);
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
