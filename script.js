const gridContainer = document.querySelector('.grid-container');
const gridItems = [];

function createGrid(size) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    gridItems.length = 0;

    const cellSize = 832 / size;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.style.width = `${cellSize}px`;
        gridItem.style.height = `${cellSize}px`;

        gridContainer.appendChild(gridItem);
        gridItems.push(gridItem);
    }

    gridItems.forEach((item) => {
        item.addEventListener('mouseover', () => {
            // Randomize color on first interaction
            if (item.style.backgroundColor === '' || item.style.backgroundColor === "white") {
                console.log("Randomizing color");
                let randomHex = Math.floor(Math.random() * 16777215).toString(16);
                const randomColor = `#${randomHex}`;
                item.style.backgroundColor = randomColor;
            }

            // Initialize interaction count if not already set
            if (!item.dataset.interactionCount) {
                item.dataset.interactionCount = "0";
            }

            // Increment interaction count
            let interactionCount = parseInt(item.dataset.interactionCount);
            if (interactionCount < 10) {
                interactionCount++;
                item.dataset.interactionCount = interactionCount.toString();

                // Extract RGB values from the current background color
                const rgb = item.style.backgroundColor.match(/\d+/g).map(Number);
                const darkenFactor = 0.1;

                // Calculate new RGB values based on darken factor
                const newRgb = rgb.map(value => Math.floor(value * (1 - darkenFactor)));

                // Set the new background color
                item.style.backgroundColor = `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`;
            }

            // If interaction count reaches 10, set to black
            if (interactionCount === 10) {
                item.style.backgroundColor = 'black';
                console.log("Interaction count reached 10, setting to black");
            }
        });
    });
}

// Initial 16x16
createGrid(16);

// New Grid Button
document.querySelector('.new-grid-button').addEventListener('click', () => {
    const newSize = prompt("Enter new grid size (1-100):");
    const parsedSize = parseInt(newSize);
    if (parsedSize > 0 && parsedSize <= 100) {
        createGrid(parsedSize);
    } else {
        alert("Please enter a valid number between 1 and 100.");
    }
});
