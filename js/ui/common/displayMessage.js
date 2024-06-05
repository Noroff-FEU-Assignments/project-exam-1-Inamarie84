export function displayMessage(targetElement, messageType, message) {
  const element = document.querySelector(targetElement);
  element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
