// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .kitchen-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'transparent';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'var(--gold)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'var(--gold)';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// Kitchen data
const kitchens = [
  {
    tag: 'Escandinava Moderna',
    title: 'Nordic Light',
    desc: 'Inspirada en la sencillez nórdica, esta cocina combina madera de roble claro con encimeras de granito gris perla. La iluminación empotrada y los acabados satinados crean un ambiente luminoso y cálido que invita a cocinar.',
    imgs: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80'
    ],
    specs: [
      { label: 'Estilo', value: 'Escandinavo' },
      { label: 'Superficie', value: 'Granito Gris Perla' },
      { label: 'Muebles', value: 'Roble Nórdico' },
      { label: 'Tiempo Proyecto', value: '6–8 semanas' }
    ]
  },
  {
    tag: 'Contemporánea',
    title: 'Serie Onyx',
    desc: 'Sofisticación absoluta en negro mate y acero inoxidable. Esta cocina de líneas puras y acabados oscuros proyecta un lujo contemporáneo sin igual. Perfecta para quienes buscan un espacio de alto impacto visual.',
    imgs: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80'
    ],
    specs: [
      { label: 'Estilo', value: 'Contemporáneo' },
      { label: 'Superficie', value: 'Mármol Negro' },
      { label: 'Muebles', value: 'Lacado Mate' },
      { label: 'Tiempo Proyecto', value: '8–10 semanas' }
    ]
  },
  {
    tag: 'Industrial Chic',
    title: 'Urban Loft',
    desc: 'La estética urbana llevada a la cocina. Cemento pulido, metal expuesto y madera recuperada conviven en un diseño que rinde homenaje a los grandes lofts de ciudad. Rústico y sofisticado a la vez.',
    imgs: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80'
    ],
    specs: [
      { label: 'Estilo', value: 'Industrial' },
      { label: 'Superficie', value: 'Cemento Pulido' },
      { label: 'Muebles', value: 'Metal y Madera' },
      { label: 'Tiempo Proyecto', value: '7–9 semanas' }
    ]
  },
  {
    tag: 'Lujo Minimalista',
    title: 'Mármol Blanco',
    desc: 'El lujo en su expresión más pura. Mármol de Carrara auténtico, herrajes de latón pulido y muebles lacados en blanco crean una composición de extraordinaria elegancia. Una cocina que es también una obra de arte.',
    imgs: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80'
    ],
    specs: [
      { label: 'Estilo', value: 'Minimalista Lux' },
      { label: 'Superficie', value: 'Mármol Carrara' },
      { label: 'Muebles', value: 'Lacado Blanco' },
      { label: 'Tiempo Proyecto', value: '10–12 semanas' }
    ]
  },
  {
    tag: 'Clásica Renovada',
    title: 'Serie Heritage',
    desc: 'La tradición reimaginada. Molduras clásicas, madera de cerezo y detalles en bronce crean una cocina con carácter y personalidad propia. Atemporal y funcional, pensada para durar generaciones.',
    imgs: [
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80'
    ],
    specs: [
      { label: 'Estilo', value: 'Clásico Moderno' },
      { label: 'Superficie', value: 'Granito Beige' },
      { label: 'Muebles', value: 'Cerezo Natural' },
      { label: 'Tiempo Proyecto', value: '8–10 semanas' }
    ]
  }
];

function openModal(idx) {
  const k = kitchens[idx];
  document.getElementById('modalTag').textContent = k.tag;
  document.getElementById('modalTitle').textContent = k.title;
  document.getElementById('modalDesc').textContent = k.desc;
  document.getElementById('modalMainImg').src = k.imgs[0];

  const specsEl = document.getElementById('modalSpecs');
  specsEl.innerHTML = k.specs.map(s => `
    <div class="spec">
      <div class="spec-label">${s.label}</div>
      <div class="spec-value">${s.value}</div>
    </div>
  `).join('');

  const thumbsEl = document.getElementById('modalThumbs');
  thumbsEl.innerHTML = k.imgs.map((img, i) => `
    <img src="${img}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="changeImg(${idx}, ${i})" alt="">
  `).join('');

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function changeImg(kitchenIdx, imgIdx) {
  const k = kitchens[kitchenIdx];
  document.getElementById('modalMainImg').src = k.imgs[imgIdx];
  document.querySelectorAll('.modal-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === imgIdx);
  });
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat, .kitchen-card, .featured-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
