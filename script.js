const items = document.querySelectorAll('.carousel-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.carousel-item.active')
      .classList.remove('active');

    item.classList.add('active');
  });
});


const form = document.getElementById('whatsappForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  const telefone = '5511943789843'; // seu número com DDI
  const texto = 
`Olá! Me chamo ${nome}.

Email: ${email}

Mensagem:
${mensagem}`;

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
});


function animatePrice(element, finalValue) {
  let start = 0;
  const duration = 1200;
  const increment = finalValue / (duration / 16);

  function update() {
    start += increment;
    if (start >= finalValue) {
      element.textContent = finalValue.toFixed(2).replace('.', ',');
    } else {
      element.textContent = start.toFixed(2).replace('.', ',');
      requestAnimationFrame(update);
    }
  }

  update();
}

// Observer para animar quando aparecer na tela
const prices = document.querySelectorAll('.price-number');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const value = parseFloat(entry.target.dataset.price);
      animatePrice(entry.target, value);
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.6 });

prices.forEach(price => observer.observe(price));
