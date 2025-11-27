(function() {
    const header = document.querySelector('header');
    
    function onScrollHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
})();
