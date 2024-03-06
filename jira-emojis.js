// ==UserScript==
// @name         My Shiny Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-06
// @description  try to take over the world!
// @author       You
// @match        https://<add here your url>
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         Jira userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-05
// @description  try to take over the world!
// @author       You
// @match        https://www.tampermonkey.net/index.php?version=5.0.1&ext=dhdg&updated=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
(function () {
  function isElementSelected(element) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return false; // No selection
    }

    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      if (range && range.intersectsNode(element)) {
        return true; // Element is selected
      }
    }

    return false; // Element is not selected
  }
  function toggleEmoji(clickedEmoji) {
    console.log(clickedEmoji, 'clicked one')
    const imgElement = clickedEmoji.querySelector("img");
    if (!imgElement) {
      console.error("No img element found within the clicked emoji.");
      return; // Exit the function if no image is found
    }

    // Get the current state of the clicked emoji
    const currentEmojiId = clickedEmoji.getAttribute("data-emoji-id");

    // Toggle the emoji state based on the current state
    if (currentEmojiId === "atlassian-cross_mark") {
      // Change from cross mark to check mark
      clickedEmoji.setAttribute("data-emoji-id", "atlassian-check_mark");
      clickedEmoji.setAttribute("data-emoji-short-name", ":check_mark:");
      clickedEmoji.setAttribute("data-emoji-text", ":check_mark:");
      imgElement.src =
        "https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/atlassian/check_mark_64.png";
      imgElement.alt = ":check_mark:";
    } else {
      // Change from check mark to cross mark
      clickedEmoji.setAttribute("data-emoji-id", "atlassian-cross_mark");
      clickedEmoji.setAttribute("data-emoji-short-name", ":cross_mark:");
      clickedEmoji.setAttribute("data-emoji-text", ":cross_mark:");
      imgElement.src =
        "https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net/atlassian/cross_mark_64.png";
      imgElement.alt = ":cross_mark:";
    }
  }
  function selectText(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.addEventListener("click", (event) => {
    const { target } = event;
    // Check if the clicked element has the class .emoji
    if (target.classList.contains("emoji")) {
      // Apply your logic here
      // For example:
      if (isElementSelected(target)) {
        toggleEmoji(target.parentNode.parentNode);
      } else {
        selectText(target);
      }
      console.log("Clicked emoji:", target);
    }
  });
  // Your code here...
})();
