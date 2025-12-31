(function(){
    const header = document.querySelector('header');
    function onScrollHeader(){
        if(window.scrollY === 0){
            header.classList.add('at-top');
            header.classList.remove('scrolled');
        } else {
            header.classList.remove('at-top');
            header.classList.add('scrolled');
        }
    }
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();

    function computeAverageColorFromUrl(url, cb){
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        img.onload = function(){
            try{
                const w = 32, h = 32;
                const canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const data = ctx.getImageData(0,0,w,h).data;
                let r=0,g=0,b=0,count=0;
                for(let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++; }
                r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
                cb && cb({r,g,b});
            }catch(e){ cb && cb(null); }
        };
        img.onerror = function(){ cb && cb(null); };
    }

    computeAverageColorFromUrl('../images/LogoRycks.png', function(c){
        if(!c) return;
        const rgb = `${c.r}, ${c.g}, ${c.b}`;
        document.documentElement.style.setProperty('--accent-rgb', rgb);
        document.documentElement.style.setProperty('--nav-border-color', `rgba(${rgb}, 0.9)`);
    });
})();