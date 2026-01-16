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
