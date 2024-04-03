chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});


const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://devloper.chrome.com/docs/extensions';

chrome.action.onClicked.addListener(async (tab) => {

  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    //retrieve action badge state to see if on/off.
    const prevState = await chrome.action.getBadgeText({tabId: tab.id});

    //nextState will always be opposite.
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    }

    //set badge to new state.
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  }
});
