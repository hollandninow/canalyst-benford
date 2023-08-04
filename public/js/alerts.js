export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}

export const displayAlert = (parentEl, type, msg) => {
  hideAlert();
  parentEl.innerHTML = '';

  const markup = `<div class="alert alert--${type}">${msg}<div>`;
  parentEl.insertAdjacentHTML('afterbegin', markup);
}