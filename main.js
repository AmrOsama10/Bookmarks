var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var tBody = document.getElementById("tBody");
var validText = document.getElementById("validText");
var validTextUrl = document.getElementById("validTextUrl");

var bookmarksList;

if (localStorage.getItem("list") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("list"));
  display();
} else {
  bookmarksList = [];
}

btnSubmit.onclick = function () {
  siteValue();
  display();
};

function siteValue() {
  if (validationName() && validationUrl()) {
    var siteObj = {
      sName: siteName.value,
      sUrl: siteUrl.value,
      urlSite: `https://www.${siteUrl.value}`,
    };
    bookmarksList.push(siteObj);
    localStorage.setItem("list", JSON.stringify(bookmarksList));
    clearForm();
  }
}

function display() {
  var box = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    box += `
        <tr>
            <th>${i + 1}</th>
            <th>${bookmarksList[i].sName}</th>
            <th> <a href="${bookmarksList[i].urlSite}" target="_blank">
            <button class="btn btn-success" id="btnVisit"><i class="fa-regular fa-eye me-1"></i>Visit</button>
            </a></th>
            <th><button class="btn btn-danger" id="btnDelete" onclick="deleteFun(${i})"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></th>
        </tr>
    `;
  }
  tBody.innerHTML = box;
}

function clearForm() {
  siteName.value = null;
  siteUrl.value = null;
}

function deleteFun(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(bookmarksList));
  display();
}

function validationName() {
  var RegExp = /^[a-zA-Z0-9]{3,}$/;
  if (RegExp.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    validText.classList.replace("d-block", "d-none");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    validText.classList.replace("d-none", "d-block");
    return false;
  }
}

function validationUrl() {
  var RegExp =
    /^[-a-zA-Z0-9@:%._\+~#=]{1,}\.[a-zA-Z0-9()]{2,}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
  if (RegExp.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    validTextUrl.classList.replace("d-block", "d-none");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    validTextUrl.classList.replace("d-none", "d-block");
    return false;
  }
}
