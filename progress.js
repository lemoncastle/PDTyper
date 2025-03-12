console.log('progress.js loaded');

const scrollContainer = document.getElementById('c');

scrollContainer.addEventListener('scroll', () => {
    console.log('Scroll event triggered');
    const progressBar = document.getElementById('progress-bar');
    const totalHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const progress = (scrollContainer.scrollTop / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
});