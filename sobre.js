document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MENU MOBILE
  // =========================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // =========================
  // SLIDES HORIZONTAIS
  // =========================
  const scroller = document.getElementById("hScroll");
  const panels = Array.from(document.querySelectorAll(".panel"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let current = 0;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
  }

  function updateArrows() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.classList.toggle("is-disabled", current === 0);
    nextBtn.classList.toggle("is-disabled", current === panels.length - 1);
  }

  function goTo(index) {
    if (!scroller || panels.length === 0) return;
    current = clamp(index, 0, panels.length - 1);
    panels[current].scrollIntoView({ behavior: "smooth", inline: "start" });
    updateArrows();
  }

  prevBtn?.addEventListener("click", () => {
    if (current === 0) return;
    goTo(current - 1);
  });

  nextBtn?.addEventListener("click", () => {
    if (current === panels.length - 1) return;
    goTo(current + 1);
  });

  if (scroller) {
    scroller.addEventListener("scroll", () => {
      const w = scroller.clientWidth || 1;
      current = clamp(Math.round(scroller.scrollLeft / w), 0, panels.length - 1);
      updateArrows();
    });
  }

  updateArrows();

  // =========================
  // REVEAL (SÓ 1 ATIVO POR VEZ)
  // =========================
  const panelsForReveal = document.querySelectorAll(".panel");

  function revealSequence(panel) {
    const items = panel.querySelectorAll(".reveal");

    // reseta quando entrar (pra sempre tocar bonito)
    items.forEach((el) => el.classList.remove("active"));

    // revela um por vez
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add("active"), i * 140);
    });
  }

  const panelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSequence(entry.target);
        }
      });
    },
    {
      threshold: 0.6,
      root: scroller || null,
    }
  );

  panelsForReveal.forEach((p) => panelObserver.observe(p));

  // =========================
  // WHATSAPP FORM
  // =========================
  const form = document.getElementById("whatsappForm");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const mensagem = document.getElementById("mensagem")?.value || "";

    const telefone = "5511943789843";
    const texto = `Olá! Me chamo ${nome}.

Email: ${email}

Mensagem:
${mensagem}`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // =========================
  // CURSOR RING (IGUAL AO INÍCIO)
  // =========================
(() => {
    const ring = document.createElement("div");
    ring.className = "mc-ring";
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const LERP = 0.18;

    function tick() {
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;

      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      ring.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
      ring.style.opacity = "0";
    });

    ring.style.position = "fixed";
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    ring.style.transform = "translate(-50%, -50%)";
    ring.style.zIndex = "999999";
    ring.style.pointerEvents = "none";
    ring.style.opacity = "0";

    requestAnimationFrame(tick);
  })();
});
