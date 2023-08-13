exports.autocomplete = (input, array) => {
  let currentFocus = 0;

  input.addEventListener('input', function(e) {
    let list, listItem, val = this.value;

    closeAllLists();

    if (!val) 
      return false;

    list = document.createElement('div');
    list.setAttribute('id', this.id + '-autocomplete-list');
    list.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(list);

    array.forEach( (item, index) => {
      if(item.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        listItem = document.createElement('div');

        listItem.innerHTML = `<strong>${item.substr(0, val.length)}</strong>${item.substr(val.length)}`;
        listItem.innerHTML += `<input type='hidden' value='${item}'>`;

        listItem.addEventListener('click', function(e) {
          input.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
        });

        list.appendChild(listItem);
      }
    });
  });

  input.addEventListener('keydown', function(e) {
    let x = document.getElementById(this.id + '-autocomplete-list');

    if (x)
      x = x.getElementsByTagName('div');

    // if DOWN key is pressed
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);

    // if UP key is pressed
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);

      // if ENTER key is pressed, prevent form from being submitted
    } else if (e.keyCode === 13) {
      if (currentFocus > -1) {
        e.preventDefault();
        if (x) x[currentFocus].click();
      }

      if (currentFocus === -1) {
        document.querySelector('.form__analysis').submit();
      }
    }
  });

  const addActive = x => {
    if (!x) return false;

    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add('autocomplete-active');
  }

  const removeActive = x => {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  const closeAllLists = el => {
    currentFocus = -1;
    let x = document.getElementsByClassName('autocomplete-items');

    for(let i = 0; i < x.length; i++) {
      if(el !== x[i] && el !== input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener('click', e => {
    closeAllLists(e.target);
  });
}