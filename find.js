let backgroundPage = browser.extension.getBackgroundPage();

document.getElementById("find-form").addEventListener("submit", function(e) {
  // Send the query from the form to the background page.
  backgroundPage.find(document.getElementById("find-input").value);
  e.preventDefault();
});

let results = document.getElementById("result-list");

function handleMessage(request, sender, response) {
  // Handle responses coming back from the background page.
  if (request.msg === "clear-results") {
    results.innerHTML = "";
  }
  if (request.msg === "found-result") {
    // List out responses from the background page as they come in.
    let li = document.createElement("li");
    
    li.innerHTML = `<table width=‘500’ ><tr><td>${request.id}&nbsp;&nbsp;</td><td style="width:100%"><a href=${request.url}>${request.url}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td><td style="width:100%">${request.count} hits.</td><br/></tr></table>`;

    
    results.appendChild(li);
  }
}

browser.runtime.onMessage.addListener(handleMessage);
