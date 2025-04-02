function viewerTemplate(src, alt) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
}

function viewHandler(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'IMG') {
        // Use the original image source directly
        const originalSrc = clickedElement.src;
        document.body.insertAdjacentHTML('afterbegin', viewerTemplate(originalSrc, clickedElement.alt));
        
        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', closeViewer);
    }
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', viewHandler);