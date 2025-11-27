(function(){
    document.querySelectorAll('.btn-reveal').forEach(function(btn){
        btn.addEventListener('click', function(){
            const card = btn.closest('.reveal-card');
            card.classList.toggle('open');
        });
    });

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
})();
