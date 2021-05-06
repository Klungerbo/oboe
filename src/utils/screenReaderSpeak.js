/* srSpeak(text, priority)
    text: the message to be vocalised
    priority (non mandatory): "polite" (by default) or "assertive" */

/**
 * Make the screen reader say a message
 * 
 * Code adapted from:
 * https://a11y-guidelines.orange.com/en/web/components-examples/make-a-screen-reader-talk/
 * 
 * @param {String} text Text the screen reader should announce
 * @param {"polite"|"assertive"|"off"} priority Whether the screen reader should be interrupted
 */
export function srSpeak(text, priority) {
  var el = document.createElement("div");
  var id = "speak-" + Date.now();
  el.setAttribute("id", id);
  el.setAttribute("aria-live", priority || "polite");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id));
  }, 1000);
}