// This will be a content script for accessing dom.


function extractLinks() {

  let links = [];
  //get dom elements with a tag within content...

  let root = document;
  const mains = document.getElementsByTagName("main")
  if (mains != null) {
    root = mains[0];
  }
  
  let atags = Array.from(root.getElementsByTagName("a"));

  //iterate over dom, any "a" tags add their href or redirect to links
  atags.forEach(atag => {
    let theLink = atag.getAttribute("href");
    // console.log(theLink);
    
    //skip over empty
    if (theLink == null) return;

    links.push(theLink);
  });
  
  // console.log("Did I make links?", links);

  //since i'm passing through the message listener, just return from this call.
  return links;
}


//if I receive a message from the popup, perform and respond to it with data from "extract".
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  //validate message came with my format.
  if (msg.subject !== "extractLinks" || msg.from !== 'popup') return;

  //sender is my extension ID, might need to change it later.
  if (sender.id !== "hdcbnhnbdlefojnmmmcpofmfnmcehmli") return;

  //now grab the tags...
  const links = extractLinks();

  sendResponse(links);
});


