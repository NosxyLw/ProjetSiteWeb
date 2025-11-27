(function(){
    const header = document.querySelector('header');
    function onScrollHeader(){ 
        if(window.scrollY > 50) header.classList.add('scrolled'); 
        else header.classList.remove('scrolled'); 
    }
    window.addEventListener('scroll', onScrollHeader, { passive: true }); 
    onScrollHeader();

    function createSelectButtons(){
        const cards = document.querySelectorAll('.destination-card');
        cards.forEach(function(card){
            if(card.querySelector('.select-btn')) return;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'select-btn';
            btn.setAttribute('aria-pressed','false');
            btn.innerHTML = '<span class="select-label">Sélectionner</span><span class="select-icon" aria-hidden="true"></span>';

            btn.addEventListener('click', function(e){
                e.stopPropagation();
                const selected = btn.classList.toggle('selected');
                const icon = btn.querySelector('.select-icon');
                if(selected){
                    btn.setAttribute('aria-pressed','true');
                    card.classList.add('selected');
                    icon.textContent = '✓';
                } else {
                    btn.setAttribute('aria-pressed','false');
                    card.classList.remove('selected');
                    icon.textContent = '';
                }
            });

            card.addEventListener('click', function(ev){
                if(ev.target.closest('.select-btn')) return;
                btn.click();
            });

            card.appendChild(btn);
        });
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', createSelectButtons);
    } else {
        createSelectButtons();
    }

    document.getElementById('order-link').addEventListener('click', function(e){
        e.preventDefault();
        var destinations = [];
        var accompagnateurs = [];
        document.querySelectorAll('.destination-card.selected').forEach(function(card){
            var h3 = card.querySelector('h3');
            if(!h3) return;
            var type = card.getAttribute('data-type');
            if(type === 'accompagnateur') {
                accompagnateurs.push(h3.textContent.trim());
            } else {
                destinations.push(h3.textContent.trim());
            }
        });
        var params = [];
        if(destinations.length > 0) params.push('destination=' + encodeURIComponent(destinations.join(', ')));
        if(accompagnateurs.length > 0) params.push('accompagnateur=' + encodeURIComponent(accompagnateurs.join(', ')));
        var url = 'commande.html';
        if(params.length > 0) url += '?' + params.join('&');
        window.location.href = url;
    });
})();
