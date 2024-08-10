
const thebutton = document.getElementById("extractButton");
thebutton.addEventListener("click", buttonPush);


//do i need to find the element within the callback? or can it be preset?
const linksEl = document.getElementById("links");

const setLinksInfo = (linksArray) => {

  console.log(linksArray);

  //guard links
  if (linksArray == null || !Array.isArray(linksArray)) {
    console.log("received empty list");
    return;
  }

  //we'll get back an array of link strings, set these as <ul><li> stuff
  const linkInfo = document.createElement("ul");

  //append children based on the array of links
  linksArray.forEach(link => {
    const newLink = document.createElement("li");
    newLink.innerHTML = link;
    linkInfo.appendChild(newLink);
  });

  //clear the inner, then make it the links.
  linksEl.innerText = '';
  linksEl.appendChild(linkInfo);
}

function buttonPush() {
  // document.getElementById("links").innerHTML = "Stuff popped in!";

  //get the active tab, message to give me links.
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
      //send a message to the tabs to do this thing for me.
      chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'extractLinks'},
        //callback
        setLinksInfo
      );
  });
}
