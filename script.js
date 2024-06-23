document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    window.showSidebar = () => sidebar.style.display = 'flex';
    window.hideSidebar = () => sidebar.style.display = 'none';
});