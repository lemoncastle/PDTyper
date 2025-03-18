// Code to display the progress bar on the top of the page (on scroll)

const scrollContainer = document.getElementById('c');

scrollContainer.addEventListener('scroll', () => {
    const progressBar = document.getElementById('page-top-bar');
    const totalHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    const progress = (scrollContainer.scrollTop / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
});