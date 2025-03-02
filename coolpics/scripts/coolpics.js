const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('hide');
});

function handleResize() {
    if (window.innerWidth > 1000) {
        navigation.classList.remove('hide');
    } else {
        navigation.classList.add('hide');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); 

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
        const srcParts = clickedElement.src.split('-');
        const fullSrc = `${srcParts[0]}-full.jpeg`;
        document.body.insertAdjacentHTML('afterbegin', viewerTemplate(fullSrc, clickedElement.alt));
        
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