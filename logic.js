const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const commentTextarea = document.getElementById('commentTextarea');
const keys = Object.keys(jsonData);
let currentIndex = 0;
const buttonsContainer = document.getElementById('buttonsContainer');

function appendToTextarea(text, newline) {
    commentTextarea.value += (newline ? '\n' : '') + text;
}

function createButton(text, newline) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-sm');
    button.classList.add('btn-secondary');
    button.classList.add('mb-2');
    button.textContent = text;
    button.addEventListener('click', () => appendToTextarea(text, newline));
    return button;
}

function createDropdown(part) {
    // const dropdownContainer = document.createElement('div');
    // dropdownContainer.classList.add('dropdown-container');

    const dropdownSelect = document.createElement('div');
    dropdownSelect.classList.add('dropdown', 'mb-2');
    const dropdownButton = document.createElement('button');
    dropdownButton.classList.add('btn', 'btn-sm', 'btn-secondary', 'dropdown-toggle');
    dropdownButton.setAttribute('type', 'button');
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.innerHTML = part.description;
    dropdownSelect.appendChild(dropdownButton);
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');

    // dropdownSelect.classList.add('dropdown-select');
    part.choices.forEach(choice => {
        const dropdownItemLi = document.createElement('li');
        const dropdownItem = document.createElement('a');
        dropdownItem.setAttribute('href', '#');
        dropdownItem.classList.add('dropdown-item');
        dropdownItem.textContent = choice;
        dropdownItem.addEventListener('click', () => {
            appendToTextarea(dropdownItem.textContent, part.newline);
        });
        dropdownItemLi.appendChild(dropdownItem);
        dropdownMenu.appendChild(dropdownItemLi);
    });
    dropdownSelect.appendChild(dropdownMenu);
    // dropdownContainer.appendChild(dropdownSelect);

    return dropdownSelect;
}

function updateSlide() {
    slider.textContent = keys[currentIndex];
    buttonsContainer.innerHTML = ''; // Remove previous buttons

    const slide = jsonData[keys[currentIndex]];
    if (slide) {
        slide.forEach(item => {
            item.parts.forEach(part => {
                if (part.text) {
                    buttonsContainer.appendChild(createButton(part.text, part.newline));
                    buttonsContainer.appendChild(document.createElement("br"));
                } else if (part.choices) {
                    buttonsContainer.appendChild(createDropdown(part));
                }
            });
        });
    }

    // commentTextarea.insertAdjacentElement('afterend', buttonsContainer);
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === keys.length - 1;
}

function changeSlide(step) {
    currentIndex = (currentIndex + step + keys.length) % keys.length;
    updateSlide();
}

prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));

window.addEventListener('keydown', function (event) {
    // Check if the F5 key (key code 116) was pressed
    if (event.keyCode === 116) {
      event.preventDefault(); // Prevent the default browser refresh action
    }
  });

updateSlide();