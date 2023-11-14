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
    button.textContent = text;
    button.addEventListener('click', () => appendToTextarea(text, newline));
    return button;
}

function createDropdown(part) {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('dropdown-container');

    const dropdownSelect = document.createElement('select');
    dropdownSelect.classList.add('dropdown-select');
    part.choices.forEach(choice => {
        const option = document.createElement('option');
        option.value = choice;
        option.textContent = choice;
        dropdownSelect.appendChild(option);
    });
    dropdownContainer.appendChild(dropdownSelect);

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.classList.add('dropdown-button');
    okButton.addEventListener('click', () => {
        appendToTextarea(dropdownSelect.value, part.newline);
    });
    dropdownContainer.appendChild(okButton);

    return dropdownContainer;
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
                } else if (part.choices) {
                    buttonsContainer.appendChild(createDropdown(part));
                }
            });
            buttonsContainer.appendChild(document.createElement("br"));
            buttonsContainer.appendChild(document.createElement("br"));
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

updateSlide();