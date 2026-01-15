const items = document.querySelectorAll('.carousel-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.carousel-item.active')
      .classList.remove('active');

    item.classList.add('active');
  });
});
