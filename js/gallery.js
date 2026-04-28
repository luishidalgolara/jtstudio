const properties = {
  '1501': {
    title: '1501 EDIFICIO RODRIGUEZ PINTO',
    location: 'CONCEPCIÓN',
    images: [
      'imagen/1501/1.jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.18.jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.19.jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.21.jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.22(1).jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.22.jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.23(1).jpeg',
      'imagen/1501/WhatsApp Image 2026-04-28 at 07.21.23.jpeg'
    ]
  },
  '1701': {
    title: '1701 EDIFICIO RODRIGUEZ PINTO',
    location: 'CONCEPCIÓN',
    images: [
      'imagen/1701/1.jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.31 (1).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.32.jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.33 (1).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.33 (3).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.33 (4).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.33 (5).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.33 (6).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (1).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (3).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (4).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (5).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (8).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (9).jpeg',
      'imagen/1701/WhatsApp Image 2026-04-28 at 07.19.34 (10).jpeg'
    ]
  }
};

// ── Hotspots: posición (%) e información de cada punto ────────────────────────
// Para actualizar: usa el editor (editor.html), exporta el JSON y reemplaza
// el contenido de esta variable con el resultado.
const galleryHotspots = {
  '1501': {
    0: [
      { x: 61.56, y: 53.8,  name: 'Mesón Central',       material: 'Mármol Carrara Pulido',          desc: 'Mesón de mármol natural pulido de 3 cm de espesor. Veta única e irrepetible, resistente al calor y uso diario.',           price: '$1.200.000' }
    ],
    1: [
      { x: 12.31, y: 28.03, name: 'Bisagras',             material: 'Acero Inoxidable — Blum',        desc: 'Sistema de cierre suave Blum Clip Top. Apertura de 110° con amortiguación silenciosa integrada.',                        price: '$85.000'     }
    ],
    2: [
      { x: 38.12, y: 58.43, name: 'Cubierta de Mármol',  material: 'Mármol Blanco Statuario',        desc: 'Cubierta de mármol importado con acabado pulido espejo. Alta resistencia a temperaturas y uso intensivo.',               price: '$980.000'    }
    ]
  },
  '1701': {
    1: [
      { x: 45,    y: 60,    name: 'Muebles Altos',        material: 'Melamina Roble Natural',         desc: 'Alacenas con iluminación LED interior y vidrio templado fumé.',                                                          price: '$920.000'    }
    ],
    2: [
      { x: 79.04, y: 48.1,  name: 'Encimera Eléctrica',  material: 'Vitrocerámica — Bosch',          desc: 'Encimera vitrocerámica de 4 zonas con control táctil. Superficie plana de fácil limpieza y alta eficiencia energética.', price: '$420.000'    },
      { x: 78.95, y: 29.1,  name: 'Extractor Campana',   material: 'Acero Inoxidable Cepillado',     desc: 'Campana extractora de 90 cm con motor de 650 m³/h. Iluminación LED y filtros de aluminio lavables.',                    price: '$380.000'    },
      { x: 41.36, y: 44.3,  name: 'Lavaplatos',          material: 'Acero Inoxidable 18/10',         desc: 'Poceta simple bajo cubierta de 50 cm, acabado satinado antirrayaduras. Incluye escurridor integrado.',                  price: '$195.000'    }
    ],
    9: [
      { x: 50.09, y: 74.94, name: 'Horno Eléctrico',     material: 'Acero Inoxidable — Teka',        desc: 'Horno empotrado de 70 litros con 9 funciones de cocción, limpieza catalítica y display digital.',                       price: '$520.000'    },
      { x: 50.09, y: 50.24, name: 'Encimera Eléctrica',  material: 'Vitrocerámica — Smeg',           desc: 'Encimera de 60 cm con 4 zonas de calor residual. Control por mandos frontales y superficie de fácil mantención.',       price: '$360.000'    }
    ]
  }
};

let currentProperty   = null;
let currentPropertyId = null;
let currentIndex      = 0;

function openGallery(id) {
  const prop = properties[id];
  if (!prop) return;

  currentProperty   = prop;
  currentPropertyId = id;
  currentIndex      = 0;

  document.getElementById('galleryModalTitle').textContent    = prop.title;
  document.getElementById('galleryModalLocation').textContent = prop.location;

  renderThumbs();
  setImage(0, false);

  document.getElementById('galleryModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = '';
  clearGalleryDots();
}

function setImage(index, animate = true) {
  const img   = document.getElementById('galleryMainImg');
  const total = currentProperty.images.length;
  currentIndex = (index + total) % total;

  const updateSrc = () => {
    clearGalleryDots();
    img.src = encodeURI(currentProperty.images[currentIndex]);
    img.classList.remove('fade-out');
    updateCounter();
    updateActivThumb();
    scrollThumbIntoView(currentIndex);

    img.addEventListener('load', renderGalleryDots, { once: true });
    setTimeout(renderGalleryDots, 120);
  };

  if (animate) {
    img.classList.add('fade-out');
    setTimeout(updateSrc, 300);
  } else {
    updateSrc();
  }
}

function updateCounter() {
  const total = currentProperty.images.length;
  document.getElementById('galleryCounter').innerHTML =
    `<span>${currentIndex + 1}</span> / ${total}`;
}

function renderThumbs() {
  const container = document.getElementById('galleryThumbs');
  container.innerHTML = currentProperty.images.map((src, i) => `
    <img
      src="${encodeURI(src)}"
      class="gallery-modal__thumb${i === 0 ? ' active' : ''}"
      onclick="setImage(${i})"
      alt=""
    >
  `).join('');
}

function updateActivThumb() {
  document.querySelectorAll('.gallery-modal__thumb').forEach((t, i) => {
    t.classList.toggle('active', i === currentIndex);
  });
}

function scrollThumbIntoView(index) {
  const thumbs = document.getElementById('galleryThumbs');
  const thumb  = thumbs.children[index];
  if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ── Hotspots ──────────────────────────────────────────────────────────────────
function clearGalleryDots() {
  const layer = document.getElementById('galleryDotsLayer');
  if (layer) layer.innerHTML = '';
}

function renderGalleryDots() {
  const layer = document.getElementById('galleryDotsLayer');
  if (!layer) return;
  layer.innerHTML = '';

  const dots = (galleryHotspots[currentPropertyId] || {})[currentIndex] || [];
  if (dots.length === 0) return;

  const img       = document.getElementById('galleryMainImg');
  const imgRect   = img.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();

  if (imgRect.width === 0) return;

  dots.forEach(hs => {
    const el = document.createElement('div');
    el.className = 'gallery-dot' + (hs.x > 55 ? ' gallery-dot--left' : '');
    el.style.left = (imgRect.left - layerRect.left + (hs.x / 100) * imgRect.width)  + 'px';
    el.style.top  = (imgRect.top  - layerRect.top  + (hs.y / 100) * imgRect.height) + 'px';
    el.innerHTML = `
      <div class="gallery-dot__ring"></div>
      <div class="gallery-dot__core"></div>
      <div class="gallery-dot__popup">
        <p class="gallery-dot__popup-name">${hs.name}</p>
        <p class="gallery-dot__popup-mat">${hs.material}</p>
        <p class="gallery-dot__popup-desc">${hs.desc}</p>
        <p class="gallery-dot__popup-price">${hs.price}</p>
      </div>
    `;
    el.addEventListener('click', e => {
      e.stopPropagation();
      const isActive = el.classList.contains('active');
      layer.querySelectorAll('.gallery-dot').forEach(d => d.classList.remove('active'));
      if (!isActive) el.classList.add('active');
    });
    layer.appendChild(el);
  });
}

window.addEventListener('resize', () => {
  if (document.getElementById('galleryModal').classList.contains('open')) {
    renderGalleryDots();
  }
});

// ── Navegación por teclado ────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (!document.getElementById('galleryModal').classList.contains('open')) return;
  if (e.key === 'ArrowRight') setImage(currentIndex + 1);
  if (e.key === 'ArrowLeft')  setImage(currentIndex - 1);
  if (e.key === 'Escape')     closeGallery();
});

// ── Swipe táctil + cierre de popups al tocar fuera ───────────────────────────
let touchStartX = 0;
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('galleryModal');

  modal.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  modal.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? setImage(currentIndex + 1) : setImage(currentIndex - 1);
    }
  });

  modal.addEventListener('click', e => {
    if (!e.target.closest('.gallery-dot')) {
      document.querySelectorAll('.gallery-dot').forEach(d => d.classList.remove('active'));
    }
  });
});

// ── PDF Modal ─────────────────────────────────────────────────────────────────
function openPDF() {
  document.getElementById('pdfFrame').src = 'imagen/PDF/1.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH';
  document.getElementById('pdfModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePDF() {
  document.getElementById('pdfModal').classList.remove('open');
  document.getElementById('pdfFrame').src = '';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePDF();
});
