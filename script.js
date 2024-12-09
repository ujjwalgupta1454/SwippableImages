const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: false,
    on: {
        slideChange: () => {
            document.querySelector('.swiper-button-next').style.display = 'block';
            document.querySelector('.swiper-button-prev').style.display = 'block';
        },
        reachEnd: () => {
            document.querySelector('.swiper-button-next').style.display = 'none';
        },
        reachBeginning: () => {
            document.querySelector('.swiper-button-prev').style.display = 'none';
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const leftTextElements = document.querySelectorAll('.swiper-slide .draggable-text');
    const blessingMessage = document.getElementById('blessing-message');

    // Sync text from the left to right in real time
    leftTextElements.forEach(element => {
        element.addEventListener('input', (e) => {
            blessingMessage.value = e.target.innerText;
        });
    });

    // Sync text from the right to left in real time
    blessingMessage.addEventListener('input', (e) => {
        if (selectedTextBox) {
            selectedTextBox.innerText = e.target.value;
        }
    });
    

    // Synchronize font style, size, weight, color, etc.
    const fontStyleSelector = document.getElementById('font-style');
    const fontWeightSelector = document.getElementById('font-weight');
    const fontSizeSelector = document.getElementById('font-size');
    const fontColorSelector = document.getElementById('font-color');
    const alignmentSelector = document.getElementById('alignment-dropdown');
    const lineHeightSelector = document.getElementById('line-height');

    // Sync the style attributes to both the left and right text
    function syncTextStyle() {
        const fontStyle = fontStyleSelector.value;
        const fontWeight = fontWeightSelector.value;
        const fontSize = fontSizeSelector.value;
        const fontColor = fontColorSelector.value;
        const alignment = alignmentSelector.value;
        const lineHeight = lineHeightSelector.value;

        leftTextElements.forEach(element => {
            element.style.fontFamily = fontStyle;
            element.style.fontWeight = fontWeight;
            element.style.fontSize = fontSize + 'px';
            element.style.color = fontColor;
            element.style.textAlign = alignment;
            element.style.lineHeight = lineHeight;
        });

    blessingMessage.style.fontFamily = 'inherit';
    blessingMessage.style.fontWeight = 'normal';
    blessingMessage.style.fontSize = '14px';
    blessingMessage.style.color = '#000';
    blessingMessage.style.textAlign = 'left';
    blessingMessage.style.lineHeight = 'normal';
}
    // Set initial dropdown values on page load
    fontSizeSelector.value = '16';
    alignmentSelector.value = 'center';


    // Add event listeners for style changes
    fontStyleSelector.addEventListener('change', syncTextStyle);
    fontWeightSelector.addEventListener('change', syncTextStyle);
    fontSizeSelector.addEventListener('change', syncTextStyle);
    fontColorSelector.addEventListener('input', syncTextStyle);
    alignmentSelector.addEventListener('change', syncTextStyle);
    lineHeightSelector.addEventListener('change', syncTextStyle);
    
    // Initialize with the correct styles
    syncTextStyle();
});
  
// Function to enable dragging for text elements
const enableDragging = (draggable) => {
    draggable.addEventListener('mousedown', (e) => {
        const rect = draggable.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const onMouseMove = (event) => {
            const parent = draggable.closest('.swiper-slide');
            const parentRect = parent.getBoundingClientRect();

            // Calculate new position within boundaries
            const newX = event.clientX - parentRect.left - offsetX;
            const newY = event.clientY - parentRect.top - offsetY;

            const maxX = parentRect.width - draggable.offsetWidth;
            const maxY = parentRect.height - draggable.offsetHeight;

            draggable.style.left = `${Math.min(Math.max(newX, 0), maxX)}px`;
            draggable.style.top = `${Math.min(Math.max(newY, 0), maxY)}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Dynamically adjust size to fit content
    const adjustSize = () => {
        draggable.style.width = 'auto';
        draggable.style.height = 'auto';
        const rect = draggable.getBoundingClientRect();
        draggable.style.width = `${Math.max(rect.width, draggable.scrollWidth)}px`;
        draggable.style.height = `${Math.max(rect.height, draggable.scrollHeight)}px`;
    };

    draggable.addEventListener('input', adjustSize);
    adjustSize();
};
  
const blessingTextarea = document.getElementById('blessing-message');

blessingTextarea.addEventListener('input', () => {
    blessingTextarea.style.height = 'auto';
    blessingTextarea.style.height = `${blessingTextarea.scrollHeight}px`;
});

// Function to change line height based on dropdown selection
document.getElementById('line-height').addEventListener('change', function() {
    if (selectedTextBox) {
        selectedTextBox.style.lineHeight = this.value;
    }
});

// Track the currently selected text box
let selectedTextBox = null;

const defaultTextProperties = [
    { text: "We invite you and your family's gracious presence and blessing", fontFamily: "charm", fontSize: "16px", fontColor: "#000000", textAlign: "center" }, // Image 1
    { text: "Click here to edit text...", fontFamily: "charm", fontSize: "16px", fontColor: "#000000", textAlign: "center" }, // Image 2
    { text: "Sujata Pradhan weds Atul Kashyap", fontFamily: "charm", fontSize: "16px", fontColor: "#000000", textAlign: "center" } // Image 3
];

// Function to reset text options to default for the current image
const resetTextOptionsToDefault = () => {
    const activeSlideIndex = swiper.activeIndex;
    const defaultProperties = defaultTextProperties[activeSlideIndex];
    
    document.getElementById('blessing-message').value = defaultProperties.text;
    document.getElementById('font-style').value = defaultProperties.fontFamily === 'Arial' ? 'arial' : 'charm';
    document.getElementById('font-size').value = parseInt(defaultProperties.fontSize);
    document.getElementById('font-color').value = defaultProperties.fontColor;
    document.getElementById('alignment').value = defaultProperties.textAlign;
};

const updateTextOptions = (textBox) => {
    selectedTextBox = textBox;

    // Update the properties in the right-hand side text box
    document.getElementById('blessing-message').value = textBox.innerHTML;

    const fontFamily = window.getComputedStyle(textBox).fontFamily;
    document.getElementById('font-style').value = fontFamily.includes('Arial') ? 'arial' : 'charm';

    const fontSize = window.getComputedStyle(textBox).fontSize;
    document.getElementById('font-size').value = parseInt(fontSize);

    const fontColor = window.getComputedStyle(textBox).color;
    document.getElementById('font-color').value = fontColor;

    const textAlign = window.getComputedStyle(textBox).textAlign;
    document.getElementById('alignment-dropdown').value = textAlign;
};

// Add click event listeners to all draggable text elements
document.querySelectorAll('.draggable-text').forEach((textBox) => {
    textBox.addEventListener('click', () => {
        updateTextOptions(textBox);
    });
    
    enableDragging(textBox);
});

// Call resetTextOptionsToDefault when no text box is selected
swiper.on('slideChange', () => {
    if (!selectedTextBox) {
        resetTextOptionsToDefault();
    }
});

// Update the properties of the selected text box when the options change
document.getElementById('language').addEventListener('change', () => {
    if (selectedTextBox) {
        selectedTextBox.innerHTML = document.getElementById('blessing-message').value;
    }
});

document.getElementById('font-style').addEventListener('change', () => {
    if (selectedTextBox) {
        selectedTextBox.style.fontFamily = document.getElementById('font-style').value;
    }
});

document.getElementById('font-size').addEventListener('input', () => {
    if (selectedTextBox) {
        selectedTextBox.style.fontSize = document.getElementById('font-size').value + 'px';
    }
});

document.getElementById('font-color').addEventListener('input', () => {
    if (selectedTextBox) {
        selectedTextBox.style.color = document.getElementById('font-color').value;
    }
});

document.getElementById('alignment-dropdown').addEventListener('change', function() {
    if (selectedTextBox) {
        selectedTextBox.style.textAlign = this.value;
    }
});

// Add Text Functionality
document.getElementById('add-text').addEventListener('click', () => {
    const activeSlide = document.querySelector('.swiper-slide-active');
    const newText = document.createElement('div');
    newText.classList.add('draggable-text');
    newText.contentEditable = true;
    newText.textContent = 'New Text';
    newText.style.position = 'absolute';
    newText.style.left = '10px';
    newText.style.top = '10px';
    newText.style.cursor = 'move'; 
    activeSlide.querySelector('.text-container').appendChild(newText);

    // Enable dragging and auto-sizing for the new text element
    enableDragging(newText);

    // Add click event listener for the new text box
    newText.addEventListener('click', () => {
        updateTextOptions(newText);
    });
});