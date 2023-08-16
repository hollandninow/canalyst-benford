export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}

export const displayAlert = (parentEl, type, message) => {
  hideAlert();
  parentEl.innerHTML = '';

  const msg = parseAlertMessage(message);

  const markup = `<div class="alert alert--${type}">${msg}<div>`;
  parentEl.insertAdjacentHTML('afterbegin', markup);
}

const parseAlertMessage = markup => {
  if (markup.indexOf('<pre>') === -1 )
    return markup;

  const messageIndexStart = markup.indexOf('<pre>') + '<pre>'.length;
  const messageIndexEnd = markup.indexOf('<br>');

  return markup.slice(messageIndexStart, messageIndexEnd);
}