(function() {
    const fields = Array.from(document.querySelectorAll('.order-field'));
    
    function revealFields() {
        fields.forEach(function(f, i) {
            setTimeout(function() {
                f.classList.add('visible');
            }, i * 220);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', revealFields);
    } else {
        revealFields();
    }

    function getParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name) || '';
    }
    
    var destField = document.getElementById('destination');
    var accField = document.getElementById('accompagnateur');
    var destValue = getParam('destination');
    var accValue = getParam('accompagnateur');
    
    if (destField && destValue) destField.value = destValue;
    if (accField && accValue) accField.value = accValue;

    const form = document.getElementById('orderForm');
    const confirmation = document.getElementById('confirmation-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        confirmation.innerHTML = '<div style="font-size:1.4em;font-weight:800;margin-bottom:8px;">Merci !</div><div style="font-size:1.05rem;">Votre réservation a été validée.</div>';

        var btn = document.querySelector('.btn-order');
        var btnBg = btn ? window.getComputedStyle(btn).background : 'linear-gradient(90deg,#00796b,#00bfa5)';

        confirmation.style.position = 'fixed';
        confirmation.style.left = '50%';
        confirmation.style.top = '50%';
        confirmation.style.transform = 'translate(-50%, -50%)';
        confirmation.style.zIndex = '9999';
        confirmation.style.display = 'block';
        confirmation.style.minWidth = '420px';
        confirmation.style.maxWidth = '88%';
        confirmation.style.padding = '22px 32px';
        confirmation.style.borderRadius = '14px';
        confirmation.style.textAlign = 'center';
        confirmation.style.boxShadow = '0 22px 64px rgba(0,0,0,0.28)';
        confirmation.style.color = '#fff';
        confirmation.style.opacity = '0';
        confirmation.style.transition = 'opacity 300ms ease, transform 260ms ease';
        confirmation.style.background = btnBg;

        confirmation.style.transform = 'translate(-50%, -50%) scale(1.02)';
        requestAnimationFrame(function() {
            confirmation.style.opacity = '1';
            confirmation.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        setTimeout(function() {
            confirmation.style.opacity = '0';
            setTimeout(function() {
                confirmation.style.display = 'none';
            }, 360);
        }, 4500);

        form.reset();
    });
})();
