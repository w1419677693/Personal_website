    (function () {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      window.addEventListener('load', function () {
        window.scrollTo(0, 0);
      });

      const modal = document.getElementById('project-modal');
      const modalContent = document.getElementById('project-modal-content');
      const projectsSection = document.getElementById('projects');
      const templates = {
        1: document.getElementById('project-detail-template-1'),
        2: document.getElementById('project-detail-template-2'),
        3: document.getElementById('project-detail-template-3'),
      };
      let lastFocus = null;

      function openProjectModal(id) {
        const key = String(id);
        const tpl = templates[key];
        if (!tpl || !modal || !modalContent) return;

        lastFocus = document.activeElement;
        modalContent.replaceChildren();
        modalContent.appendChild(tpl.content.cloneNode(true));

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const closeBtn = modal.querySelector('.project-modal__close');
        requestAnimationFrame(() => closeBtn && closeBtn.focus());
      }

      function closeProjectModal() {
        if (!modal || !modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocus && typeof lastFocus.focus === 'function') {
          lastFocus.focus();
        }
        lastFocus = null;
      }

      projectsSection?.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-open-project]');
        if (!btn) return;
        e.preventDefault();
        openProjectModal(btn.getAttribute('data-open-project'));
      });

      modal?.addEventListener('click', function (e) {
        if (e.target.closest('[data-close-modal]')) {
          e.preventDefault();
          closeProjectModal();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
          e.preventDefault();
          closeProjectModal();
        }
      });
    })();

    (function () {
      function setSkillTexts(texts) {
        var block = document.querySelector('#skills .skill-block:nth-child(3)');
        if (!block) return;

        while (block.children.length - 1 < texts.length) {
          block.appendChild(document.createElement('span'));
        }

        Array.from(block.querySelectorAll('span')).forEach(function (el, i) {
          if (texts[i]) {
            el.textContent = texts[i];
          }
        });
      }

      function applySkillMatrixOverrides() {
        var lang = document.documentElement.lang === 'en' ? 'en' : 'zh';
        if (lang === 'en') {
          setSkillTexts(['Figma', 'Axure', 'MasterGo', 'Balsamiq', 'Information Architecture', 'Mid/High-fidelity Prototypes']);
          return;
        }

        setSkillTexts(['Figma', 'Axure', 'MasterGo', 'Balsamiq', '信息架构', '中高保真原型']);
      }

      window.addEventListener('load', applySkillMatrixOverrides);

      var langToggle = document.getElementById('langToggle');
      langToggle?.addEventListener('click', function () {
        window.requestAnimationFrame(applySkillMatrixOverrides);
      });
    })();

    (function () {
      'use strict';

      !function(){"use strict";var r=.5*(Math.sqrt(3)-1),e=(3-Math.sqrt(3))/6,t=1/6,a=(Math.sqrt(5)-1)/4,o=(5-Math.sqrt(5))/20;function i(r){var e;e="function"==typeof r?r:r?function(){var r=0,e=0,t=0,a=1,o=(i=4022871197,function(r){r=r.toString();for(var e=0;e<r.length;e++){var t=.02519603282416938*(i+=r.charCodeAt(e));t-=i=t>>>0,i=(t*=i)>>>0,i+=4294967296*(t-=i)}return 2.3283064365386963e-10*(i>>>0)});var i;r=o(" "),e=o(" "),t=o(" ");for(var n=0;n<arguments.length;n++)(r-=o(arguments[n]))<0&&(r+=1),(e-=o(arguments[n]))<0&&(e+=1),(t-=o(arguments[n]))<0&&(t+=1);return o=null,function(){var o=2091639*r+2.3283064365386963e-10*a;return r=e,e=t,t=o-(a=0|o)}}(r):Math.random,this.p=n(e),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var t=0;t<512;t++)this.perm[t]=this.p[255&t],this.permMod12[t]=this.perm[t]%12}function n(r){var e,t=new Uint8Array(256);for(e=0;e<256;e++)t[e]=e;for(e=0;e<255;e++){var a=e+~~(r()*(256-e)),o=t[e];t[e]=t[a],t[a]=o}return t}i.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(t,a){var o,i,n=this.permMod12,f=this.perm,s=this.grad3,v=0,h=0,l=0,u=(t+a)*r,d=Math.floor(t+u),p=Math.floor(a+u),M=(d+p)*e,m=t-(d-M),c=a-(p-M);m>c?(o=1,i=0):(o=0,i=1);var y=m-o+e,w=c-i+e,g=m-1+2*e,A=c-1+2*e,x=255&d,q=255&p,D=.5-m*m-c*c;if(D>=0){var S=3*n[x+f[q]];v=(D*=D)*D*(s[S]*m+s[S+1]*c)}var U=.5-y*y-w*w;if(U>=0){var b=3*n[x+o+f[q+i]];h=(U*=U)*U*(s[b]*y+s[b+1]*w)}var F=.5-g*g-A*A;if(F>=0){var N=3*n[x+1+f[q+1]];l=(F*=F)*F*(s[N]*g+s[N+1]*A)}return 70*(v+h+l)},noise3D:function(r,e,a){var o,i,n,f,s,v,h,l,u,d,p=this.permMod12,M=this.perm,m=this.grad3,c=(r+e+a)*(1/3),y=Math.floor(r+c),w=Math.floor(e+c),g=Math.floor(a+c),A=(y+w+g)*t,x=r-(y-A),q=e-(w-A),D=a-(g-A);x>=q?q>=D?(s=1,v=0,h=0,l=1,u=1,d=0):x>=D?(s=1,v=0,h=0,l=1,u=0,d=1):(s=0,v=0,h=1,l=1,u=0,d=1):q<D?(s=0,v=0,h=1,l=0,u=1,d=1):x<D?(s=0,v=1,h=0,l=0,u=1,d=1):(s=0,v=1,h=0,l=1,u=1,d=0);var S=x-s+t,U=q-v+t,b=D-h+t,F=x-l+2*t,N=q-u+2*t,C=D-d+2*t,P=x-1+.5,T=q-1+.5,_=D-1+.5,j=255&y,k=255&w,z=255&g,B=.6-x*x-q*q-D*D;if(B<0)o=0;else{var E=3*p[j+M[k+M[z]]];o=(B*=B)*B*(m[E]*x+m[E+1]*q+m[E+2]*D)}var G=.6-S*S-U*U-b*b;if(G<0)i=0;else{var H=3*p[j+s+M[k+v+M[z+h]]];i=(G*=G)*G*(m[H]*S+m[H+1]*U+m[H+2]*b)}var I=.6-F*F-N*N-C*C;if(I<0)n=0;else{var J=3*p[j+l+M[k+u+M[z+d]]];n=(I*=I)*I*(m[J]*F+m[J+1]*N+m[J+2]*C)}var K=.6-P*P-T*T-_*_;if(K<0)f=0;else{var L=3*p[j+1+M[k+1+M[z+1]]];f=(K*=K)*K*(m[L]*P+m[L+1]*T+m[L+2]*_)}return 32*(o+i+n+f)},noise4D:function(r,e,t,i){var n,f,s,v,h,l,u,d,p,M,m,c,y,w,g,A,x,q=this.perm,D=this.grad4,S=(r+e+t+i)*a,U=Math.floor(r+S),b=Math.floor(e+S),F=Math.floor(t+S),N=Math.floor(i+S),C=(U+b+F+N)*o,P=r-(U-C),T=e-(b-C),_=t-(F-C),j=i-(N-C),k=0,z=0,B=0,E=0;P>T?k++:z++,P>_?k++:B++,P>j?k++:E++,T>_?z++:B++,T>j?z++:E++,_>j?B++:E++;var G=P-(l=k>=3?1:0)+o,H=T-(u=z>=3?1:0)+o,I=_-(d=B>=3?1:0)+o,J=j-(p=E>=3?1:0)+o,K=P-(M=k>=2?1:0)+2*o,L=T-(m=z>=2?1:0)+2*o,O=_-(c=B>=2?1:0)+2*o,Q=j-(y=E>=2?1:0)+2*o,R=P-(w=k>=1?1:0)+3*o,V=T-(g=z>=1?1:0)+3*o,W=_-(A=B>=1?1:0)+3*o,X=j-(x=E>=1?1:0)+3*o,Y=P-1+4*o,Z=T-1+4*o,$=_-1+4*o,rr=j-1+4*o,er=255&U,tr=255&b,ar=255&F,or=255&N,ir=.6-P*P-T*T-_*_-j*j;if(ir<0)n=0;else{var nr=q[er+q[tr+q[ar+q[or]]]]%32*4;n=(ir*=ir)*ir*(D[nr]*P+D[nr+1]*T+D[nr+2]*_+D[nr+3]*j)}var fr=.6-G*G-H*H-I*I-J*J;if(fr<0)f=0;else{var sr=q[er+l+q[tr+u+q[ar+d+q[or+p]]]]%32*4;f=(fr*=fr)*fr*(D[sr]*G+D[sr+1]*H+D[sr+2]*I+D[sr+3]*J)}var vr=.6-K*K-L*L-O*O-Q*Q;if(vr<0)s=0;else{var hr=q[er+M+q[tr+m+q[ar+c+q[or+y]]]]%32*4;s=(vr*=vr)*vr*(D[hr]*K+D[hr+1]*L+D[hr+2]*O+D[hr+3]*Q)}var lr=.6-R*R-V*V-W*W-X*X;if(lr<0)v=0;else{var ur=q[er+w+q[tr+g+q[ar+A+q[or+x]]]]%32*4;v=(lr*=lr)*lr*(D[ur]*R+D[ur+1]*V+D[ur+2]*W+D[ur+3]*X)}var dr=.6-Y*Y-Z*Z-$*$-rr*rr;if(dr<0)h=0;else{var pr=q[er+1+q[tr+1+q[ar+1+q[or+1]]]]%32*4;h=(dr*=dr)*dr*(D[pr]*Y+D[pr+1]*Z+D[pr+2]*$+D[pr+3]*rr)}return 27*(n+f+s+v+h)}},i._buildPermutationTable=n,"undefined"!=typeof define&&define.amd&&define(function(){return i}),"undefined"!=typeof exports?exports.SimplexNoise=i:"undefined"!=typeof window&&(window.SimplexNoise=i),"undefined"!=typeof module&&(module.exports=i)}();

      const { PI, cos, sin, abs, random } = Math;
      const TAU = 2 * PI;
      const rand = n => n * random();
      const randRange = n => n - rand(2 * n);
      const fadeInOut = (t, m) => {
        const hm = 0.5 * m;
        return abs((t + hm) % m - hm) / hm;
      };
      const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

      const particleCount = 700;
      const particlePropCount = 9;
      const particlePropsLength = particleCount * particlePropCount;
      const rangeY = 100;
      const baseTTL = 50;
      const rangeTTL = 150;
      const baseSpeed = 0.1;
      const rangeSpeed = 2;
      const baseRadius = 1;
      const rangeRadius = 4;
      const baseHue = 220;
      const rangeHue = 100;
      const noiseSteps = 8;
      const xOff = 0.00125;
      const yOff = 0.00125;
      const zOff = 0.0005;
      const backgroundColor = 'hsla(260,40%,5%,1)';

      let container;
      let canvas;
      let ctx;
      let center;
      let tick;
      let simplex;
      let particleProps;

      function setupSwirlBackground() {
        container = document.querySelector('.content--canvas');
        if (!container) return;
        if (container.querySelector('canvas')) return;

        createCanvas();
        resizeCanvas();
        initParticles();
        drawSwirl();
      }

      function initParticles() {
        tick = 0;
        simplex = new SimplexNoise();
        particleProps = new Float32Array(particlePropsLength);

        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
          initParticle(i);
        }
      }

      function initParticle(i) {
        const x = rand(canvas.a.width);
        const y = center[1] + randRange(rangeY);
        const vx = 0;
        const vy = 0;
        const life = 0;
        const ttl = baseTTL + rand(rangeTTL);
        const speed = baseSpeed + rand(rangeSpeed);
        const radius = baseRadius + rand(rangeRadius);
        const hue = baseHue + rand(rangeHue);

        particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
      }

      function updateParticles() {
        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
          updateParticle(i);
        }
      }

      function updateParticle(i) {
        const i2 = i + 1;
        const i3 = i + 2;
        const i4 = i + 3;
        const i5 = i + 4;
        const i6 = i + 5;
        const i7 = i + 6;
        const i8 = i + 7;
        const i9 = i + 8;
        const x = particleProps[i];
        const y = particleProps[i2];
        const n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
        const vx = lerp(particleProps[i3], cos(n), 0.5);
        const vy = lerp(particleProps[i4], sin(n), 0.5);
        const life = particleProps[i5];
        const ttl = particleProps[i6];
        const speed = particleProps[i7];
        const x2 = x + vx * speed;
        const y2 = y + vy * speed;
        const radius = particleProps[i8];
        const hue = particleProps[i9];

        drawParticle(x, y, x2, y2, life, ttl, radius, hue);

        particleProps[i] = x2;
        particleProps[i2] = y2;
        particleProps[i3] = vx;
        particleProps[i4] = vy;
        particleProps[i5] = life + 1;

        if (checkBounds(x, y) || particleProps[i5] > ttl) {
          initParticle(i);
        }
      }

      function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
        ctx.a.save();
        ctx.a.lineCap = 'round';
        ctx.a.lineWidth = radius;
        ctx.a.strokeStyle = 'hsla(' + hue + ',100%,60%,' + fadeInOut(life, ttl) + ')';
        ctx.a.beginPath();
        ctx.a.moveTo(x, y);
        ctx.a.lineTo(x2, y2);
        ctx.a.stroke();
        ctx.a.closePath();
        ctx.a.restore();
      }

      function checkBounds(x, y) {
        return x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0;
      }

      function createCanvas() {
        canvas = {
          a: document.createElement('canvas'),
          b: document.createElement('canvas')
        };
        canvas.b.style = '\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t';
        container.appendChild(canvas.b);
        ctx = {
          a: canvas.a.getContext('2d'),
          b: canvas.b.getContext('2d')
        };
        center = [];
      }

      function resizeCanvas() {
        if (!canvas || !ctx) return;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        canvas.a.width = innerWidth;
        canvas.a.height = innerHeight;
        ctx.a.drawImage(canvas.b, 0, 0);

        canvas.b.width = innerWidth;
        canvas.b.height = innerHeight;
        ctx.b.drawImage(canvas.a, 0, 0);

        center[0] = 0.5 * canvas.a.width;
        center[1] = 0.5 * canvas.a.height;
      }

      function renderGlow() {
        ctx.b.save();
        ctx.b.filter = 'blur(8px) brightness(200%)';
        ctx.b.globalCompositeOperation = 'lighter';
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();

        ctx.b.save();
        ctx.b.filter = 'blur(4px) brightness(200%)';
        ctx.b.globalCompositeOperation = 'lighter';
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();
      }

      function renderToScreen() {
        ctx.b.save();
        ctx.b.globalCompositeOperation = 'lighter';
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();
      }

      function drawSwirl() {
        tick += 1;

        ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
        ctx.b.fillStyle = backgroundColor;
        ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

        updateParticles();
        renderGlow();
        renderToScreen();

        window.requestAnimationFrame(drawSwirl);
      }

      window.addEventListener('load', setupSwirlBackground);
      window.addEventListener('resize', resizeCanvas);
    })();

    (function () {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const navBar = document.querySelector('.nav');
      const navIndicator = document.querySelector('.nav-indicator');
      const langToggle = document.getElementById('langToggle');
      const modal = document.getElementById('project-modal');
      const modalCloseBtn = document.querySelector('.project-modal__close');
      const template1 = document.getElementById('project-detail-template-1');
      const template2 = document.getElementById('project-detail-template-2');
      const template3 = document.getElementById('project-detail-template-3');
      const zhState = {
        title: document.title,
        lang: document.documentElement.lang || 'zh-CN',
        template1: template1 ? template1.innerHTML : '',
        template2: template2 ? template2.innerHTML : '',
        template3: template3 ? template3.innerHTML : ''
      };

      function setText(selector, value, root) {
        const el = (root || document).querySelector(selector);
        if (el && typeof value === 'string') el.textContent = value;
      }

      function setAttr(selector, attr, value, root) {
        const el = (root || document).querySelector(selector);
        if (el && typeof value === 'string') el.setAttribute(attr, value);
      }

      function applyEnglish() {
        document.documentElement.lang = 'en';
        document.title = 'Congli Wang | Product Manager · Product Operations · Global Products';
        if (langToggle) {
          langToggle.textContent = '中文';
          langToggle.setAttribute('aria-label', 'Switch language');
          langToggle.dataset.lang = 'en';
        }
        setText('.nav-links a[data-nav-section="about"]', 'Education');
        setText('.nav-links a[data-nav-section="strengths"]', 'Strengths');
        setText('.nav-links a[data-nav-section="skills"]', 'Skills');
        setText('.nav-links a[data-nav-section="experience"]', 'Experience');
        setText('.nav-links a[data-nav-section="projects"]', 'Portfolio');
        setText('.landing-title', 'Congli Wang Personal Website');
        setText('.landing-scroll', 'Scroll down to view the content');
        setText('.hero .eyebrow', 'Product Manager / Product Operations / Global Products · Portfolio');
        setText('.hero-title-line', 'Congli Wang');
        setText('.hero-title-role', 'Product Manager / Global Products');
        setText('.intro-label', 'Overview');
        setText('.lead', 'With a bachelor’s degree in Design Computing and current master’s study in Interaction Design at the University of Sydney, I work on requirements, data diagnosis, and feature iteration for overseas AI web products. I independently drove five AI web features from requirements through testing and launch, and contributed to AI image generation configuration, prompt optimization, and SEO research. I use user research, prototyping, frontend code, and AI coding tools to validate product ideas quickly.');
        setText('.hero-actions .btn-primary', 'View Projects');
        setText('.hero-actions .btn:not(.btn-primary)', 'Experience');
        setText('.hero-contact .contact-chip:nth-child(1) small', 'Phone');
        setText('.hero-contact .contact-chip:nth-child(2) small', 'Email');
        setText('.hero-contact .contact-chip:nth-child(3) small', 'WeChat');
        setText('.hero-side .stat:nth-of-type(2) small', 'Education');
        setText('.hero-side .stat:nth-of-type(2) strong', 'University of Sydney');
        setText('.hero-side .stat:nth-of-type(2) div', 'B.Des. in Interaction Design / M.Des. in Interaction Design');
        setText('.hero-side .stat:nth-of-type(3) small', 'Target Role');
        setText('.hero-side .stat:nth-of-type(3) strong', 'Product Manager / Product Operations / Global Products');
        setText('.hero-side .stat:nth-of-type(3) div', 'AI web products, data-led iteration, user research');
        setText('.hero-side .stat:nth-of-type(4) small', 'Keywords');
        ['Requirement Analysis', 'User Research', 'AI Agent / RAG', 'Prompt Engineering', 'Data Analysis', 'AI Coding'].forEach(function (text, i) {
          setText('.hero-side .stat:nth-of-type(4) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setText('#about .section-title', 'Education');
        setText('#about .item:nth-child(1) h4', 'Bachelor of Interaction Design');
        setText('#about .item:nth-child(1) .meta', '2022 – 2024 · University of Sydney');
        setText('#about .item:nth-child(1) li:nth-child(1)', 'Studied JavaScript, HTML, CSS, and Adobe tools in a systematic way.');
        setText('#about .item:nth-child(1) li:nth-child(2)', 'Built strong skills in Figma, prototyping, user testing, and iterative design.');
        setText('#about .item:nth-child(2) h4', 'Master of Interaction Design (In Progress)');
        setText('#about .item:nth-child(2) .meta', '2025 – 2026 · University of Sydney');
        setText('#about .item:nth-child(2) li:nth-child(1)', 'Deepening work in UI/UX optimization, testing methods, and design improvement paths.');
        setText('#about .item:nth-child(2) li:nth-child(2)', 'Strengthening the full loop from research to implementation.');
        setText('#strengths .section-title', 'Core Strengths');
        setText('#strengths .section-desc', 'I connect business goals and user behavior with data analysis, research, and quick implementation to improve AI web products.');
        setText('#strengths .strength-card:nth-child(1) h3', 'Data-led Product Iteration');
        setText('#strengths .strength-card:nth-child(1) p', 'I use traffic, conversion data, and session recordings to identify drop-off points, then turn findings into PRDs, page improvements, and feature recommendations.');
        setText('#strengths .strength-card:nth-child(2) h3', 'AI Capability Configuration');
        setText('#strengths .strength-card:nth-child(2) p', 'I have contributed to model configuration, prompt design, and integration of AI image generation, packaging capabilities into usable templates.');
        setText('#strengths .strength-card:nth-child(3) h3', 'Research and Rapid Validation');
        setText('#strengths .strength-card:nth-child(3) p', 'I clarify problems through interviews, usability testing, and competitor research, then validate ideas with Figma, frontend code, and AI coding tools.');
        setText('#skills .section-title', 'Skill Matrix');
        setText('#skills .section-desc', 'Skills across product requirements, AI applications, user research, prototyping, and frontend validation.');
        setText('#skills .skill-block:nth-child(1) strong', 'Product Skills');
        ['Requirement Analysis', 'PRDs', 'Conversion Funnel Analysis', 'Product Iteration'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(1) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(2) strong', 'Research and Testing');
        ['User Interviews', 'Think Aloud', 'Usability Testing', 'SUS'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(2) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(3) strong', 'Prototyping and Communication');
        ['Figma', 'Axure', 'MasterGo', 'Balsamiq', 'Information Architecture', 'Mid/High-fidelity Prototypes'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(3) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(4) strong', 'AI and Technology');
        ['Prompt Engineering', 'RAG', 'AI Agent', 'Dify', 'Workflow', 'AI Image Generation', 'HTML', 'CSS', 'JavaScript', 'Python / Git'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(4) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#experience .section-title', 'Internships');
        setText('#experience .section-desc', 'Experience in overseas AI product iteration and enterprise UI design, covering requirements, cross-functional delivery, and validation.');
        setText('#experience .item:nth-child(1) .meta', 'Jun 2026 – Present · Chuangzhe (Duomai Group)');
        setText('#experience .item:nth-child(1) h4', 'Overseas AI Business Team | Product Specialist / Product Intern');
        setText('#experience .item:nth-child(1) li:nth-child(1)', 'Used traffic and conversion data plus session recordings to identify drop-off, interaction, and comprehension issues in overseas AI web products; produced PRDs and iteration recommendations.');
        setText('#experience .item:nth-child(1) li:nth-child(2)', 'Independently drove five overseas AI web features from requirements and solution design through testing and launch, using AI coding tools to adjust layouts, CTAs, and key interactions.');
        setText('#experience .item:nth-child(1) li:nth-child(3)', 'Contributed to model and prompt configuration and Semrush-based SEO research. During the page optimization period, monthly registrations grew from several hundred to 1,000+, and registration conversion improved by about 10% versus before the redesign.');
        setText('#experience .item:nth-child(2) .meta', 'Nov 2025 – Jan 2026 · Vancheer');
        setText('#experience .item:nth-child(2) h4', 'R&D UI Team | Product / UI Intern');
        setText('#experience .item:nth-child(2) li:nth-child(1)', 'Contributed to interface design and requirements gathering, translating feedback from business teams into clearer page and interaction proposals.');
        setText('#experience .item:nth-child(2) li:nth-child(2)', 'Supported requirements communication, design handoff, and version iteration in a B2B product and engineering environment.');
        setText('#experience .item:nth-child(2) li:nth-child(3)', 'Improved interaction logic and visual design in an older UI to improve usability.');
        setText('#projects .section-title', 'Selected Projects');
        setText('#projects .section-desc', 'From AI Agent and RAG applications to interaction design and data storytelling, these projects show how I turn research into usable experiences.');
        setText('#projects .ai-project__eyebrow', 'AI Product Practice');
        setText('#projects .ai-project h3', 'Personal AI Twin and RAG Knowledge Base');
        setText('#projects .ai-project .project-top p', 'Built a personal knowledge base and AI Agent with Dify so recruiters can explore my education, projects, skills, and portfolio through conversation.');
        setText('#projects .ai-project .bullet-list li:nth-child(1)', 'Structured résumé and portfolio content and connected RAG retrieval to provide the Agent with personal knowledge.');
        setText('#projects .ai-project .bullet-list li:nth-child(2)', 'Designed its role, system prompt, answer boundaries, and conversation strategy, iterating on accuracy and clarity through question testing.');
        setText('#projects .ai-project .bullet-list li:nth-child(3)', 'Integrated the Agent into my portfolio site to explore a conversational way to learn about my work.');
        setAttr('#projects .project-card:nth-child(1) .cover', 'alt', 'Project 1 cover image');
        setText('#projects .project-card:nth-child(1) h3', 'Project 1 | Focus Improvement / Food Delivery UI Design');
        setText('#projects .project-card:nth-child(1) .project-top p', 'An individual university project completed from background research and user interviews through two rounds of testing and final UI iteration.');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(1)', 'Started from background research and user study to build a mid-fidelity structure and overall information architecture.');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(2)', 'Used Think Aloud, SUS, and post-test interviews across multiple rounds of testing.');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(3)', 'Synthesized issues through affinity diagrams and testing feedback to guide iteration.');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(4)', 'Continuously improved onboarding, filtering efficiency, and comprehension from landing page to merchant detail pages.');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(5)', 'Delivered a complete UI color system and interaction logic to improve learnability and usability.');
        ['Independent Project', 'User Testing', 'Affinity Analysis', 'Mid-fi to Final UI'].forEach(function (text, i) {
          setText('#projects .project-card:nth-child(1) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setAttr('#projects .project-card:nth-child(2) .cover', 'alt', 'Project 2 cover image');
        setText('#projects .project-card:nth-child(2) h3', 'Project 2 | Water-saving Pop-up UI / UX Design');
        setText('#projects .project-card:nth-child(2) .project-top p', 'A four-person team project where I defined research direction and user study methods, contributed to the full UI/UX flow, and independently completed the 3D modeling.');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(1)', 'Conducted early research, concept generation, prototyping, and two rounds of user testing around a water-saving theme.');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(2)', 'Designed an interactive pop-up installation and information flow, combining LED, rewards, and quiz screens to enhance engagement.');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(3)', 'Improved the experience through Think Aloud, observation, post-test interviews, and heuristic evaluation.');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(4)', 'The final prototype was suitable for a live pop-up setting and supported both participants and observers.');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(5)', 'Demonstrated a hybrid skill set across UI visuals, interaction flow, physical installation, and 3D modeling.');
        ['Team Collaboration', 'Experience Design', '3D Modeling', 'Prototype Iteration'].forEach(function (text, i) {
          setText('#projects .project-card:nth-child(2) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setAttr('#projects .project-card--feature .cover', 'aria-label', 'Project 3 cover image');
        setText('#projects .project-card--feature h3', 'Project 3 | Social Media Storytelling Under COVID-19 (Hand-coded, not vibecoding)');
        setText('#projects .project-card--feature .project-top p', 'A long-form data storytelling webpage about social media usage, misinformation, and social impact during the COVID-19 period.');
        setText('#projects .project-card--feature .bullet-list li:nth-child(1)', 'Organized the research into a narrative sequence from introduction and treemap to maps and line charts.');
        setText('#projects .project-card--feature .bullet-list li:nth-child(2)', 'Used a fixed sidebar navigation to help users jump between sections in a long scrolling page.');
        setText('#projects .project-card--feature .bullet-list li:nth-child(3)', 'Connected treemap, global growth map, and hate-crime trend chart into a clear logic of growth, harmful discourse, and social impact.');
        setText('#projects .project-card--feature .bullet-list li:nth-child(4)', 'Used a dark, wine-red visual atmosphere to reinforce the emotional tone and density of the topic.');
        setText('#projects .project-card--feature .bullet-list li:nth-child(5)', 'Works well as a portfolio piece for data visualization, information design, and web-based narrative expression.');
        ['Data Visualization', 'Editorial Web Page', 'Interactive Storytelling', 'Information Design'].forEach(function (text, i) {
          setText('#projects .project-card--feature .tag:nth-child(' + (i + 1) + ')', text);
        });
        document.querySelectorAll('.project-open-btn').forEach(function (btn) {
          btn.textContent = 'View Full Case Study';
        });
        if (template1) {
          setText('.modal-project-title', 'Project 1 | Focus Improvement / Food Delivery UI Design', template1.content);
          setText('.modal-project__lead', 'A university UI project completed independently from kickoff and background research to user research, mid-fidelity structuring, two rounds of testing, and final screens.', template1.content);
          ['Independent Project', 'Think Aloud · SUS · Post-test Interview', 'Affinity Diagram', 'Mid-fi to Final UI'].forEach(function (text, i) {
            setText('.tags .tag:nth-child(' + (i + 1) + ')', text, template1.content);
          });
          template1.content.querySelector('.detail-block:nth-child(1)').innerHTML = '<strong>Project Context and Problem</strong>This project focused on interface design for food-delivery task flows. The challenge was to understand realistic usage contexts, define key pages and information architecture, and help new users move efficiently between merchant lists and detailed decision-making.';
          template1.content.querySelector('.detail-block:nth-child(2)').innerHTML = '<strong>Process Overview</strong>Kickoff → Background research → User research → Mid-fidelity structure → Round 1: prototype refinement and testing summary → Round 2: prototype refinement and testing summary → Final UI including information architecture, interface structure, and color system.';
          template1.content.querySelector('.detail-block:nth-child(3)').innerHTML = '<strong>Research / Testing Methods</strong>I combined Think Aloud, SUS, and post-test interviews to align observed behavior with subjective feedback, and used structured records across both testing rounds to support design decisions.';
          template1.content.querySelector('.detail-block:nth-child(4)').innerHTML = '<strong>Analysis and Iteration Logic</strong>Issues from both rounds were grouped using affinity diagrams, and SUS trends helped determine the scope and priority of each iteration rather than reacting to isolated comments.';
          template1.content.querySelector('.detail-block:nth-child(5)').innerHTML = '<strong>Key Screens and Improvements</strong><p class="subsection-title">Landing / Onboarding</p><ul class="mini-list"><li>Refined the tutorial-style onboarding based on user feedback to lower first-use friction.</li></ul><p class="subsection-title">Main Interface</p><ul class="mini-list"><li>Presented merchants and essential information to support quick scanning and early-stage filtering.</li></ul><p class="subsection-title">Merchant Interface</p><ul class="mini-list"><li>Adjusted hierarchy and presentation logic to address testing findings and make the path from list to detail clearer.</li></ul>';
          template1.content.querySelector('.detail-block:nth-child(6)').innerHTML = '<strong>My Role and Outcome</strong>I independently built the interface from mid-fidelity to high-fidelity, completed the color and component hierarchy, and iterated through two usability cycles to deliver a coherent, demo-ready UI.';
          setText('.modal-pdf-section > h3', 'Portfolio 1 Full Pages', template1.content);
          setText('.modal-pdf-hint', 'The following images are page exports from "Portfolio 1.pdf" and preserve the original prototype screenshots, flow diagrams, and annotations for reference.', template1.content);
          setAttr('.modal-gallery figure:nth-child(1) img', 'alt', 'Portfolio PDF page 1: UI design and project overview', template1.content);
          setText('.modal-gallery figure:nth-child(1) figcaption', 'Page 1 · Cover and project overview', template1.content);
          setAttr('.modal-gallery figure:nth-child(2) img', 'alt', 'Portfolio PDF page 2: process, testing methods, and affinity analysis', template1.content);
          setText('.modal-gallery figure:nth-child(2) figcaption', 'Page 2 · Process framework, user testing methods, affinity diagram, and SUS analysis', template1.content);
          setAttr('.modal-gallery figure:nth-child(3) img', 'alt', 'Portfolio PDF page 3: onboarding and main interface', template1.content);
          setText('.modal-gallery figure:nth-child(3) figcaption', 'Page 3 · Tutorial onboarding and merchant browsing interface', template1.content);
          setAttr('.modal-gallery figure:nth-child(4) img', 'alt', 'Portfolio PDF page 4: merchant interface', template1.content);
          setText('.modal-gallery figure:nth-child(4) figcaption', 'Page 4 · Merchant interface', template1.content);
        }
        if (template2) {
          setText('.modal-project-title', 'Project 2 | Water-saving Pop-up UI / UX Design', template2.content);
          setText('.modal-project__lead', 'A four-person university project combining digital UI with a physical installation around a water-saving theme, with research direction, testing planning, and 3D modeling led by me.', template2.content);
          ['Team Project', 'Pop-up / Physical Installation', '3D · Large Display', 'Multi-method Validation'].forEach(function (text, i) {
            setText('.tags .tag:nth-child(' + (i + 1) + ')', text, template2.content);
          });
          template2.content.querySelector('.detail-block:nth-child(1)').innerHTML = '<strong>Project Background</strong>This project designed a water-saving themed pop-up experience that went beyond on-screen UI to include an installation, audience flow, and reward mechanisms, creating a loop of understanding, action, and feedback.';
          template2.content.querySelector('.detail-block:nth-child(2)').innerHTML = '<strong>Role and Responsibilities</strong>The project was developed as a team effort. My main responsibilities were framing the research direction, planning research and testing, contributing deeply to interface and interaction design, and independently producing the 3D modeling and spatial expression needed for the final exhibition piece.';
          template2.content.querySelector('.detail-block:nth-child(3)').innerHTML = '<strong>Process Overview</strong>Initial research and early concepts → Multi-round prototyping → Information architecture and UI palette → Round 1 testing and feedback analysis → First / second prototype iterations → Round 2 testing → Final iteration and event-ready prototype.';
          template2.content.querySelector('.detail-block:nth-child(4)').innerHTML = '<strong>Installation and Interaction Structure</strong><ul class="mini-list"><li>Created an interactive display module whose components could detach from the main body while remaining connected for easy assembly and presentation.</li><li>Integrated LED lighting into leaf-shaped structures to strengthen the environmental storytelling.</li><li>Linked the reward-drop mechanism with the quiz flow so behavioral motivation and knowledge feedback reinforced one another.</li></ul>';
          template2.content.querySelector('.detail-block:nth-child(5)').innerHTML = '<strong>Core User Flows</strong><ul class="mini-list"><li><strong>Flow 1 — Tree planting:</strong> a low-barrier interaction for people with weak water-saving awareness.</li><li><strong>Flow 2 — Growing flower:</strong> extends participation and reinforces positive feedback and completion.</li></ul>';
          template2.content.querySelector('.detail-block:nth-child(6)').innerHTML = '<strong>User Testing Methods</strong>I used Think Aloud, SUS, on-site observation, post-test interviews, and heuristic evaluation to validate whether the experience was understandable, usable, and engaging across multiple prototype stages.';
          template2.content.querySelector('.detail-block:nth-child(7)').innerHTML = '<strong>Interface and Content Modules</strong><p class="subsection-title">Quiz Screen</p><ul class="mini-list"><li>A lightweight quiz around water-saving knowledge, with corrective feedback and a physical reward at the end to encourage participation.</li></ul><p class="subsection-title">Final Prototype Scale and On-site Experience</p><ul class="mini-list"><li>The final large-scale prototype, documented with dimensions such as 2.5m / 3m / 0.5m, was designed for a real pop-up event.</li><li>A large side display remained readable even without direct interaction, supporting both participants and bystanders.</li></ul>';
          template2.content.querySelector('.detail-block:nth-child(8)').innerHTML = '<strong>Outcome</strong>The final result was an event-ready experience solution with coordinated digital UI and physical installation, a clear test-driven iteration path, and a level of interaction suitable for real-world pop-up deployment.';
          setText('.modal-pdf-section > h3', 'Portfolio 2 Full Pages', template2.content);
          setText('.modal-pdf-hint', 'The following images are page exports from "Portfolio 2.pdf" and include installation diagrams, user flows, testing methods, quiz interfaces, and final exhibition visuals.', template2.content);
          setAttr('.modal-gallery figure:nth-child(1) img', 'alt', 'Portfolio PDF page 1: UI/UX design and project overview', template2.content);
          setText('.modal-gallery figure:nth-child(1) figcaption', 'Page 1 · Cover and project overview', template2.content);
          setAttr('.modal-gallery figure:nth-child(2) img', 'alt', 'Portfolio PDF page 2: process stages and project notes', template2.content);
          setText('.modal-gallery figure:nth-child(2) figcaption', 'Page 2 · Research and testing stages, design structure, and color overview', template2.content);
          setAttr('.modal-gallery figure:nth-child(3) img', 'alt', 'Portfolio PDF page 3: installation and mid-fidelity prototype', template2.content);
          setText('.modal-gallery figure:nth-child(3) figcaption', 'Page 3 · Interactive display, LED and leaf structure, and user flow diagram', template2.content);
          setAttr('.modal-gallery figure:nth-child(4) img', 'alt', 'Portfolio PDF page 4: user testing methods', template2.content);
          setText('.modal-gallery figure:nth-child(4) figcaption', 'Page 4 · Think Aloud, SUS, observation, post-test interview, and heuristic evaluation', template2.content);
          setAttr('.modal-gallery figure:nth-child(5) img', 'alt', 'Portfolio PDF page 5: water-saving quiz interface', template2.content);
          setText('.modal-gallery figure:nth-child(5) figcaption', 'Page 5 · Water-saving quiz and reward interface', template2.content);
          setAttr('.modal-gallery figure:nth-child(6) img', 'alt', 'Portfolio PDF page 6: final prototype and dimensions', template2.content);
          setText('.modal-gallery figure:nth-child(6) figcaption', 'Page 6 · Final exhibition prototype, dimensions, and spectator display experience', template2.content);
        }
        if (template3) {
          setText('.modal-project-title', 'Project 3 | Social Media Storytelling Under COVID-19 (Hand-coded, not vibecoding)', template3.content);
          setText('.modal-project__lead', 'A long-form editorial webpage about the role of social media during COVID-19, combining immersive visuals, fixed navigation, and multiple charts to build a clear social narrative.', template3.content);
          ['Data Visualization', 'Long-form Narrative', 'Research Communication', 'Web Information Architecture'].forEach(function (text, i) {
            setText('.tags .tag:nth-child(' + (i + 1) + ')', text, template3.content);
          });
          template3.content.querySelector('.detail-block:nth-child(1)').innerHTML = '<strong>Project Theme</strong>This webpage explores the dual role of social media during the pandemic: it became an essential channel for communication and companionship, while also amplifying misinformation, hate speech, and negative effects on specific groups.';
          template3.content.querySelector('.detail-block:nth-child(2)').innerHTML = '<strong>Information Structure</strong>The page follows a long-form editorial structure with a fixed left navigation. The main content moves chapter by chapter through Introduction, Tree map, Global growth, Screen time, Twitter hashtag, Fake news on Twitter, Hate crimes in England, Literature review, and Conclusion.';
          template3.content.querySelector('.detail-block:nth-child(3)').innerHTML = '<strong>Key Visualizations</strong><ul class=\"mini-list\"><li>Treemap: shows the hierarchical relationship between increased social media use and its consequences.</li><li>Global growth map: highlights country-level growth in social networking users during 2020.</li><li>Hate-crime line chart: connects online negative discourse to measurable offline social impact.</li></ul>';
          template3.content.querySelector('.detail-block:nth-child(4)').innerHTML = '<strong>Interaction and Reading Experience</strong>The fixed sidebar navigation reduces the cost of browsing a long page. Each section combines a clear title, a short explanation, and one main visualization, creating a readable pattern of text, chart, and takeaway.';
          template3.content.querySelector('.detail-block:nth-child(5)').innerHTML = '<strong>Visual Direction</strong>The interface uses a dark charcoal-to-wine-red gradient background, white typography, and strong chart contrast, which gives the topic both atmosphere and readability.';
          template3.content.querySelector('.detail-block:nth-child(6)').innerHTML = '<strong>Why It Fits the Portfolio</strong>This project demonstrates web implementation, data storytelling, information architecture, and research communication, making it a strong addition as a data-visualization-focused portfolio piece.';
          setText('.modal-actions .btn', 'Open Live Website', template3.content);
        }
        setAttr('#project-modal', 'aria-label', 'Project details');
        setAttr('.project-modal__close', 'aria-label', 'Close');
        setText('footer.footer', 'Congli Wang Personal Website');
      }

      function restoreChinese() {
        document.documentElement.lang = zhState.lang;
        document.title = zhState.title;
        if (langToggle) {
          langToggle.textContent = 'EN';
          langToggle.setAttribute('aria-label', '切换语言');
          langToggle.dataset.lang = 'zh';
        }
        setText('.nav-links a[data-nav-section="about"]', '教育背景');
        setText('.nav-links a[data-nav-section="strengths"]', '核心优势');
        setText('.nav-links a[data-nav-section="skills"]', '技能');
        setText('.nav-links a[data-nav-section="experience"]', '项目经验');
        setText('.nav-links a[data-nav-section="projects"]', '作品集');
        setText('.landing-title', '王淙立的个人主页');
        setText('.landing-scroll', '向下滚动查看内容');
        setText('.hero .eyebrow', '产品经理 / 产品运营 / 出海产品 · 个人求职主页');
        setText('.hero-title-line', '王淙立');
        setText('.hero-title-role', '产品经理 / 出海产品');
        setText('.intro-label', '简要介绍');
        setText('.lead', '悉尼大学交互设计本科、硕士在读，现于 AI 出海业务组参与 Web 产品需求分析、数据诊断与功能迭代。曾独立推进 5 个海外 AI Web 功能从需求分析到测试上线，并参与 AI 图像生成能力配置、Prompt 优化与 SEO 研究。熟悉用户研究、原型设计和可用性测试，也能使用 HTML、CSS、JavaScript 与 AI Coding 工具快速验证产品想法。');
        setText('.hero-actions .btn-primary', '查看作品');
        setText('.hero-actions .btn:not(.btn-primary)', '项目经验');
        setText('.hero-contact .contact-chip:nth-child(1) small', '电话');
        setText('.hero-contact .contact-chip:nth-child(2) small', '邮箱');
        setText('.hero-contact .contact-chip:nth-child(3) small', '微信');
        setText('.hero-side .stat:nth-of-type(2) small', '教育背景');
        setText('.hero-side .stat:nth-of-type(2) strong', '悉尼大学');
        setText('.hero-side .stat:nth-of-type(2) div', '交互设计本科 / 交互设计硕士在读');
        setText('.hero-side .stat:nth-of-type(3) small', '求职方向');
        setText('.hero-side .stat:nth-of-type(3) strong', '产品经理 / 产品运营 / 出海产品');
        setText('.hero-side .stat:nth-of-type(3) div', 'AI Web 产品、数据驱动迭代、用户研究');
        setText('.hero-side .stat:nth-of-type(4) small', '关键词');
        ['需求分析', '用户研究', 'AI Agent / RAG', 'Prompt Engineering', '数据分析', 'AI Coding'].forEach(function (text, i) {
          setText('.hero-side .stat:nth-of-type(4) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setText('#about .section-title', '教育背景');
        setText('#about .item:nth-child(1) h4', '交互设计本科');
        setText('#about .item:nth-child(1) .meta', '2022 – 2024 · 悉尼大学');
        setText('#about .item:nth-child(1) li:nth-child(1)', '系统学习 JavaScript、HTML、CSS 与 Adobe 系列工具。');
        setText('#about .item:nth-child(1) li:nth-child(2)', '重点掌握 Figma、原型搭建、用户测试与迭代方法。');
        setText('#about .item:nth-child(2) h4', '交互设计硕士（在读）');
        setText('#about .item:nth-child(2) .meta', '2025 – 2026 · 悉尼大学');
        setText('#about .item:nth-child(2) li:nth-child(1)', '进一步深入 UI / UX 体验优化、测试方法与设计改进路径。');
        setText('#about .item:nth-child(2) li:nth-child(2)', '强化从研究到落地的设计闭环能力。');
        setText('#strengths .section-title', '核心优势');
        setText('#strengths .section-desc', '从业务目标与用户行为出发，结合数据分析、研究验证与快速实现，推动 AI Web 产品持续迭代。');
        setText('#strengths .strength-card:nth-child(1) h3', '数据驱动的产品迭代');
        setText('#strengths .strength-card:nth-child(1) p', '结合访问、转化数据与用户行为录屏定位页面流失点，输出 PRD、页面优化方案和功能迭代建议。');
        setText('#strengths .strength-card:nth-child(2) h3', 'AI 能力配置与产品化');
        setText('#strengths .strength-card:nth-child(2) p', '参与 AI 图像生成产品的模型配置、Prompt 设计与能力接入，将生成能力整理为用户可直接使用的功能模板。');
        setText('#strengths .strength-card:nth-child(3) h3', '研究验证与快速落地');
        setText('#strengths .strength-card:nth-child(3) p', '通过用户访谈、可用性测试和竞品研究明确问题，再用 Figma、前端代码及 AI Coding 工具完成原型与验证。');
        setText('#skills .section-title', '技能矩阵');
        setText('#skills .section-desc', '覆盖产品需求、AI 应用、用户研究、原型设计与前端验证。');
        setText('#skills .skill-block:nth-child(1) strong', '产品能力');
        ['需求分析', 'PRD', '转化漏斗分析', '产品迭代'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(1) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(2) strong', '用户研究与测试');
        ['用户访谈', 'Think Aloud', '可用性测试', 'SUS'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(2) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(3) strong', '原型与表达');
        ['Figma', 'Axure', 'MasterGo', 'Balsamiq', '信息架构', '中高保真原型'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(3) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#skills .skill-block:nth-child(4) strong', 'AI 与技术');
        ['Prompt Engineering', 'RAG', 'AI Agent', 'Dify', 'Workflow', 'AI 图像生成', 'HTML', 'CSS', 'JavaScript', 'Python / Git'].forEach(function (text, i) {
          setText('#skills .skill-block:nth-child(4) span:nth-child(' + (i + 2) + ')', text);
        });
        setText('#experience .section-title', '实习经历');
        setText('#experience .section-desc', '从 AI 出海产品迭代到企业 UI 设计，积累需求分析、跨团队协作与上线验证经验。');
        setText('#experience .item:nth-child(1) .meta', '2026.06 – 至今 · 创作者（多麦集团旗下公司）');
        setText('#experience .item:nth-child(1) h4', 'AI 出海业务组｜产品专员 / 产品实习生');
        setText('#experience .item:nth-child(1) li:nth-child(1)', '结合后台访问、转化数据与用户行为录屏，定位海外 AI Web 产品的页面流失、操作阻塞和信息理解问题，输出 PRD 与迭代建议。');
        setText('#experience .item:nth-child(1) li:nth-child(2)', '独立推进 5 个海外 AI Web 功能从需求分析、方案设计到测试上线，并使用 AI Coding 辅助调整页面布局、CTA 与关键交互。');
        setText('#experience .item:nth-child(1) li:nth-child(3)', '参与模型能力配置与 Prompt 迭代，同时开展 Semrush 关键词和 SEO 研究；参与的页面优化期间，月注册用户由数百增长至 1,000+，注册转化率较改版前提升约 10%。');
        setText('#experience .item:nth-child(2) .meta', '2025.11 – 2026.01 · 达实智能');
        setText('#experience .item:nth-child(2) h4', '研发部 UI 组｜产品 / UI 实习');
        setText('#experience .item:nth-child(2) li:nth-child(1)', '参与产品界面设计与需求整理，收集不同业务部门的反馈，将模糊需求转化为更明确的页面和交互方案。');
        setText('#experience .item:nth-child(2) li:nth-child(2)', '协助需求沟通、设计交付与版本迭代，积累 B 端产品与研发团队的协作经验。');
        setText('#experience .item:nth-child(2) li:nth-child(3)', '改进旧版 UI 的交互逻辑与图形设计，优化使用体验。');
        setText('#projects .section-title', '代表项目');
        setText('#projects .section-desc', '从 AI Agent / RAG 应用到交互设计与数据叙事，展示我如何将研究转化为可使用的产品体验。');
        setText('#projects .ai-project__eyebrow', 'AI 产品实践');
        setText('#projects .ai-project h3', 'AI 个人分身与 RAG 知识库');
        setText('#projects .ai-project .project-top p', '基于 Dify 构建个人知识库与 AI Agent，让招聘者能围绕教育背景、项目经历、技能和作品集进行对话式了解。');
        setText('#projects .ai-project .bullet-list li:nth-child(1)', '将简历与作品集内容结构化整理，接入 RAG 检索，为 Agent 提供个人知识来源。');
        setText('#projects .ai-project .bullet-list li:nth-child(2)', '设计角色定位、System Prompt、回答边界与对话策略，并通过问答测试迭代准确性和表达。');
        setText('#projects .ai-project .bullet-list li:nth-child(3)', '将 Agent 集成到作品集网站，探索“作品集 + AI 数字分身”的信息获取方式。');
        setAttr('#projects .project-card:nth-child(1) .cover', 'alt', '项目一封面图');
        setText('#projects .project-card:nth-child(1) h3', '项目一｜专注度提升 / 外卖场景 UI 设计');
        setText('#projects .project-card:nth-child(1) .project-top p', '独立完成从背景调查、用户调研到两轮用户测试与最终 UI 迭代的校内项目。');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(1)', '以背景调查与用户研究为起点，建立中保真框架与整体信息架构。');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(2)', '采用 Think Aloud、SUS、Post-test Interview 等方法进行多轮测试。');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(3)', '基于亲和图（Affinity Diagram）与测试反馈进行问题归纳与版本迭代。');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(4)', '从起始页、主界面到商家界面，持续优化新手引导、筛选效率与理解成本。');
        setText('#projects .project-card:nth-child(1) .bullet-list li:nth-child(5)', '最终形成完整 UI 配色体系与交互逻辑，提升易学性与可用性。');
        ['独立完成', '用户测试', '亲和图分析', '中保真到最终 UI'].forEach(function (text, i) {
          setText('#projects .project-card:nth-child(1) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setAttr('#projects .project-card:nth-child(2) .cover', 'alt', '项目二封面图');
        setText('#projects .project-card:nth-child(2) h3', '项目二｜节水主题快闪活动 UI / UX 设计');
        setText('#projects .project-card:nth-child(2) .project-top p', '四人小组合作项目，负责研究方向、用户调研方法制定，并参与完整 UI / UX 设计，3D 建模独立完成。');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(1)', '围绕节水主题进行早期调研、概念生成、原型设计与两轮用户测试。');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(2)', '设计互动式快闪装置与信息展示逻辑，结合 LED、奖励模块与问答页面强化参与感。');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(3)', '通过 Think Aloud、Observation、Post-test Interview、Heuristic Evaluation 等方法优化流程。');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(4)', '迭代后的最终原型适用于快闪活动现场，兼顾互动者与围观者的观看体验。');
        setText('#projects .project-card:nth-child(2) .bullet-list li:nth-child(5)', '具备 UI 视觉、交互路径、实体装置与 3D 建模的复合设计能力。');
        ['团队协作', '活动体验设计', '3D 建模', '原型迭代'].forEach(function (text, i) {
          setText('#projects .project-card:nth-child(2) .tag:nth-child(' + (i + 1) + ')', text);
        });
        setAttr('#projects .project-card--feature .cover', 'aria-label', '项目三封面图');
        setText('#projects .project-card--feature h3', '项目三｜疫情背景下的社交媒体数据叙事网页（纯手打非vibecoding）');
        setText('#projects .project-card--feature .project-top p', '围绕 COVID-19 时期社交媒体使用、负面话语扩散与仇恨犯罪影响制作的长滚动数据可视化网页。');
        setText('#projects .project-card--feature .bullet-list li:nth-child(1)', '以专题叙事结构组织信息，从引言、树图到地图与折线图逐步展开研究结论。');
        setText('#projects .project-card--feature .bullet-list li:nth-child(2)', '使用固定侧边导航帮助用户在长页面中快速定位不同图表章节。');
        setText('#projects .project-card--feature .bullet-list li:nth-child(3)', '通过 treemap、全球增长地图与英格兰仇恨犯罪折线图串联“使用增长—负面传播—社会影响”的逻辑。');
        setText('#projects .project-card--feature .bullet-list li:nth-child(4)', '整体视觉采用深色背景与酒红色渐变，强化疫情语境下的沉浸感与信息密度。');
        setText('#projects .project-card--feature .bullet-list li:nth-child(5)', '适合作为“数据可视化 + 网页叙事表达”方向的代表作品展示。');
        ['数据可视化', '专题网页', '交互叙事', '信息设计'].forEach(function (text, i) {
          setText('#projects .project-card--feature .tag:nth-child(' + (i + 1) + ')', text);
        });
        document.querySelectorAll('.project-open-btn').forEach(function (btn) {
          btn.textContent = '查看详细作品';
        });
        if (template1) template1.innerHTML = zhState.template1;
        if (template2) template2.innerHTML = zhState.template2;
        if (template3) template3.innerHTML = zhState.template3;
        setAttr('#project-modal', 'aria-label', '作品详情');
        setAttr('.project-modal__close', 'aria-label', '关闭');
        setText('footer.footer', '王淙立的个人网站');
      }

      document.querySelectorAll('.reveal-group').forEach(function (group) {
        group.querySelectorAll('.reveal').forEach(function (el, i) {
          el.style.setProperty('--reveal-delay', i * 72 + 'ms');
        });
      });

      if (!reduceMotion) {
        const revealIo = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealIo.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '0px 0px -7% 0px', threshold: 0.05 }
        );
        document.querySelectorAll('.reveal').forEach(function (el) {
          revealIo.observe(el);
        });
      } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      }

      const navLinks = document.querySelectorAll('.nav-links a[data-nav-section]');
      const sectionIds = ['about', 'strengths', 'skills', 'experience', 'projects'];
      const progressBar = document.getElementById('scrollProgressBar');

      function moveNavIndicator(link) {
        if (!navIndicator || !link || window.innerWidth <= 980) {
          if (navIndicator) navIndicator.style.opacity = '0';
          return;
        }
        const parentRect = link.parentElement.getBoundingClientRect();
        const rect = link.getBoundingClientRect();
        navIndicator.style.width = rect.width + 'px';
        navIndicator.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
        navIndicator.style.opacity = '1';
      }

      function updateNavFromScroll() {
        const navH = navBar ? navBar.getBoundingClientRect().height : 72;
        const y = navH + 14;
        let active = '';
        sectionIds.forEach(function (id) {
          const el = document.getElementById(id);
          if (!el) return;
          if (el.getBoundingClientRect().top <= y) active = id;
        });
        navLinks.forEach(function (a) {
          const on = a.getAttribute('data-nav-section') === active;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
        moveNavIndicator(document.querySelector('.nav-links a.is-active'));
        navBar?.classList.toggle('is-scrolled', (window.scrollY || window.pageYOffset || 0) > 24);
      }

      function updateScrollProgress() {
        if (!progressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = Math.max(0, Math.min(progress, 100)) + '%';
      }

      function syncOpenModalContent() {
        const modalContent = document.getElementById('project-modal-content');
        if (!modal?.classList.contains('is-open') || !modalContent) return;
        const currentId = modalContent.querySelector('.modal-project__index')?.textContent?.trim();
        const currentTemplate = currentId && document.getElementById('project-detail-template-' + currentId);
        if (currentTemplate) {
          modalContent.replaceChildren();
          modalContent.appendChild(currentTemplate.content.cloneNode(true));
        }
      }

      let navTick = false;
      function requestNavUpdate() {
        if (navTick) return;
        navTick = true;
        requestAnimationFrame(function () {
          updateNavFromScroll();
          updateScrollProgress();
          navTick = false;
        });
      }

      window.addEventListener('scroll', requestNavUpdate, { passive: true });
      window.addEventListener('resize', requestNavUpdate);
      updateNavFromScroll();
      updateScrollProgress();

      const savedLanguage = (function () {
        try {
          return localStorage.getItem('site-language') || 'zh';
        } catch (err) {
          return 'zh';
        }
      })();

      if (savedLanguage === 'en') {
        applyEnglish();
        syncOpenModalContent();
      } else {
        restoreChinese();
      }

      langToggle?.addEventListener('click', function () {
        const nextLang = langToggle.dataset.lang === 'en' ? 'zh' : 'en';
        if (nextLang === 'en') {
          applyEnglish();
        } else {
          restoreChinese();
        }
        syncOpenModalContent();
        try {
          localStorage.setItem('site-language', nextLang);
        } catch (err) {}
      });

      navLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          moveNavIndicator(link);
        });
      });
      navBar?.querySelector('.nav-links')?.addEventListener('mouseleave', requestNavUpdate);

      if (!reduceMotion && supportsFinePointer) {
        document.querySelectorAll('.card, .item, .strength-card, .skill-block, .contact-chip, .stat').forEach(function (el) {
          el.addEventListener('pointermove', function (e) {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--spot-x', x + '%');
            el.style.setProperty('--spot-y', y + '%');
          });
        });

        document.querySelectorAll('.btn, .project-open-btn').forEach(function (btn) {
          btn.addEventListener('pointermove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            btn.style.transform = 'translate(' + (x * 0.08).toFixed(2) + 'px, ' + (y * 0.08).toFixed(2) + 'px)';
          });
          btn.addEventListener('pointerleave', function () {
            btn.style.transform = '';
          });
        });

        const avatarCard = document.querySelector('.avatar-card');
        const avatarImage = avatarCard?.querySelector('img');
        avatarCard?.addEventListener('pointermove', function (e) {
          const rect = avatarCard.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rotateY = (px - 0.5) * 14;
          const rotateX = (0.5 - py) * 14;
          avatarCard.style.setProperty('--avatar-x', (px * 100).toFixed(2) + '%');
          avatarCard.style.setProperty('--avatar-y', (py * 100).toFixed(2) + '%');
          avatarCard.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
          if (avatarImage) {
            avatarImage.style.transform = 'translateZ(18px) scale(1.025)';
          }
        });
        avatarCard?.addEventListener('pointerleave', function () {
          avatarCard.style.transform = '';
          if (avatarImage) avatarImage.style.transform = '';
        });

        document.querySelectorAll('.project-card').forEach(function (card) {
          const cover = card.querySelector('.cover');
          card.addEventListener('pointermove', function (e) {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rotateY = (px - 0.5) * 8;
            const rotateX = (0.5 - py) * 8;
            card.style.transform = 'perspective(1200px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-10px) scale(1.01)';
            if (cover) {
              cover.style.transform = 'scale(1.045) translate(' + ((px - 0.5) * 12).toFixed(2) + 'px, ' + ((py - 0.5) * 10).toFixed(2) + 'px)';
            }
          });
          card.addEventListener('pointerleave', function () {
            card.style.transform = '';
            if (cover) cover.style.transform = '';
          });
        });
      }
    })();
