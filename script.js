document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    window.showSidebar = () => sidebar.style.display = 'flex';
    window.hideSidebar = () => sidebar.style.display = 'none';

    // scrollable slides for the services section
    const container = document.querySelector('.services-container');
    const items = Array.from(container.children);

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;

    function cloneItems() {
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add('cloned-card');
            container.appendChild(clone);
        });
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add('cloned-card');
            container.insertBefore(clone, container.firstChild);
        });
    }

    function setupInfiniteScroll() {
        const totalItemsWidth = items.length * items[0].offsetWidth;
        container.scrollLeft = totalItemsWidth;

        container.addEventListener('scroll', () => {
            if (container.scrollLeft <= 0) {
                container.scrollLeft += totalItemsWidth;
            } else if (container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
                container.scrollLeft -= totalItemsWidth;
            }
        });

        autoScroll();
    }

    function autoScroll() {
        autoScrollInterval = setInterval(() => {
            container.scrollLeft -= 1;
        }, 20);
    }

    function handleMouseDown(e) {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        clearInterval(autoScrollInterval);
    }

    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = x - startX;
        container.scrollLeft = scrollLeft - walk;
    }

    function handleMouseUpOrLeave() {
        isDown = false;
        autoScroll();
    }

    function handleTouchStart(e) {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        clearInterval(autoScrollInterval);
    }

    function handleTouchMove(e) {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = x - startX;
        container.scrollLeft = scrollLeft - walk;
    }

    function handleTouchEnd() {
        isDown = false;
        autoScroll();
    }

    cloneItems();
    setupInfiniteScroll();

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUpOrLeave);
    container.addEventListener('mouseleave', handleMouseUpOrLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
});