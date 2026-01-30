document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     MENU MOBILE
  ================================================== */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* ==================================================
     REVEAL ON SCROLL
  ================================================== */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("active");
          obs.unobserve(entry.target); // performance: revela uma vez e para
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* ==================================================
     FORM WHATSAPP
  ================================================== */
  const form = document.getElementById("whatsappForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nomeEl = document.getElementById("nome");
      const emailEl = document.getElementById("email"); // pode não existir
      const mensagemEl = document.getElementById("mensagem");

      const nome = nomeEl ? nomeEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const mensagem = mensagemEl ? mensagemEl.value.trim() : "";

      const telefone = "5511943789843"; // seu número com DDI

      const texto = [
        `Olá! Me chamo ${nome || "—"}.`,
        email ? `\nEmail: ${email}` : "",
        `\nMensagem:\n${mensagem || "—"}`,
      ].join("");

      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  /* ==================================================
     CURSOR RING
  ================================================== */
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
