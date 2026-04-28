// ── Propiedades e imágenes ────────────────────────
const PROPERTIES = {
  '1701': {
    label: '1701 Edificio Rodriguez Pinto',
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
  },
  '1501': {
    label: '1501 Edificio Rodriguez Pinto',
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
  }
};

// ── Hotspots demo (información de muestra) ────────
const hotspots = {
  '1701': {
    0: [
      { x: 28, y: 52, name: 'Cocina Modular', material: 'MDF Lacado Blanco Mate', desc: 'Módulos de cocina con apertura sin tirador. Bisagras Blum de cierre suave.', price: '$1.850.000' },
      { x: 62, y: 45, name: 'Encimera', material: 'Granito Negro Zimbabwe', desc: 'Encimera de granito natural pulido de 3cm de espesor. Resistente al calor.', price: '$680.000' }
    ],
    1: [
      { x: 45, y: 60, name: 'Muebles Altos', material: 'Melamina Roble Natural', desc: 'Alacenas con iluminación LED interior y vidrio templado fumé.', price: '$920.000' }
    ],
    2: [
      { x: 35, y: 55, name: 'Campana Extractora', material: 'Acero Inoxidable', desc: 'Campana decorativa de 90cm con motor silencioso de 800m³/h.', price: '$420.000' },
      { x: 70, y: 48, name: 'Refrigerador Empotrado', material: 'Acero Inoxidable / MDF', desc: 'Panel de integración total. Capacidad 380 litros. No-Frost.', price: '$1.200.000' }
    ]
  },
  '1501': {
    0: [
      { x: 32, y: 58, name: 'Cocina Integral', material: 'MDF Lacado Gris Piedra', desc: 'Diseño en L con isla central. Herrajes Hettich de alta resistencia.', price: '$2.100.000' },
      { x: 68, y: 42, name: 'Mesón Central', material: 'Cuarzo Blanco Carrara', desc: 'Mesón de cuarzo engineered de 2cm. Superficie no porosa y antibacterial.', price: '$750.000' }
    ],
    1: [
      { x: 50, y: 65, name: 'Muebles Bajos', material: 'Melamina Blanco Ártico', desc: 'Módulos con cajones de extracción total y sistema push-to-open.', price: '$640.000' }
    ],
    2: [
      { x: 40, y: 50, name: 'Lavaplatos', material: 'Acero Inoxidable 18/10', desc: 'Doble poceta bajo cubierta con escurridor integrado. Marca Franke.', price: '$280.000' }
    ]
  }
};

// ── Estado ────────────────────────────────────────
let currentProp = '1701';
let currentImg  = 0;
let pendingX    = null;
let pendingY    = null;
let selectedHsIndex = null;
let editingIndex    = null;

// ── Init ──────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildPropertyTabs();
  selectProperty('1701');
});

// ── Tabs de propiedad ─────────────────────────────
function buildPropertyTabs() {
  const container = document.getElementById('propTabs');
  container.innerHTML = Object.entries(PROPERTIES).map(([id, prop]) => `
    <button class="prop-tab${id === currentProp ? ' active' : ''}" onclick="selectProperty('${id}')">
      ${id}
    </button>
  `).join('');
}

function selectProperty(id) {
  currentProp = id;
  currentImg  = 0;
  selectedHsIndex = null;
  editingIndex    = null;
  cancelForm();

  // Inicializar hotspots si no existen
  if (!hotspots[id]) hotspots[id] = {};
  const imgs = PROPERTIES[id].images;
  imgs.forEach((_, i) => { if (!hotspots[id][i]) hotspots[id][i] = []; });

  document.querySelectorAll('.prop-tab').forEach(t => {
    t.classList.toggle('active', t.textContent.trim() === id);
  });

  document.getElementById('editorPropLabel').textContent = PROPERTIES[id].label;

  buildThumbs();
  selectImage(0);
}

function buildThumbs() {
  const container = document.getElementById('thumbContainer');
  const images = PROPERTIES[currentProp].images;
  container.innerHTML = images.map((src, i) => `
    <div class="editor-thumb-item${i === currentImg ? ' active' : ''}" id="thumb-${i}" onclick="selectImage(${i})">
      <img src="${encodeURI(src)}" alt="">
      <span class="editor-thumb-item__num">${i + 1}</span>
      <span class="editor-thumb-item__dot-count${(hotspots[currentProp][i] || []).length > 0 ? ' visible' : ''}" id="dotCount-${i}">
        ${(hotspots[currentProp][i] || []).length}
      </span>
    </div>
  `).join('');
}

function selectImage(index) {
  currentImg = index;
  selectedHsIndex = null;
  editingIndex    = null;
  cancelForm();

  document.querySelectorAll('.editor-thumb-item').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });

  const img = document.getElementById('canvasImg');
  img.src = encodeURI(PROPERTIES[currentProp].images[index]);

  if (!hotspots[currentProp][index]) hotspots[currentProp][index] = [];

  renderDots();
  renderList();
}

// ── Canvas click ──────────────────────────────────
document.getElementById('editorCanvas').addEventListener('click', function(e) {
  if (e.target.closest('.hs-dot')) return;

  const rect = document.getElementById('canvasImg').getBoundingClientRect();
  pendingX = parseFloat(((e.clientX - rect.left) / rect.width  * 100).toFixed(2));
  pendingY = parseFloat(((e.clientY - rect.top)  / rect.height * 100).toFixed(2));
  editingIndex    = null;
  selectedHsIndex = null;

  showForm('', '', '', '');
  renderDots();
});

// ── Formulario ────────────────────────────────────
function showForm(name, material, desc, price) {
  document.getElementById('editorForm').classList.remove('hidden');
  document.getElementById('hsName').value     = name;
  document.getElementById('hsMaterial').value = material;
  document.getElementById('hsDesc').value     = desc;
  document.getElementById('hsPrice').value    = price;
  document.getElementById('hsName').focus();
}

function cancelForm() {
  document.getElementById('editorForm').classList.add('hidden');
  pendingX = null;
  pendingY = null;
  editingIndex = null;
  renderDots();
}

function saveHotspot() {
  const name     = document.getElementById('hsName').value.trim();
  const material = document.getElementById('hsMaterial').value.trim();
  const desc     = document.getElementById('hsDesc').value.trim();
  const price    = document.getElementById('hsPrice').value.trim();

  if (!name) { document.getElementById('hsName').focus(); return; }

  if (editingIndex !== null) {
    hotspots[currentProp][currentImg][editingIndex] = {
      ...hotspots[currentProp][currentImg][editingIndex], name, material, desc, price
    };
  } else {
    hotspots[currentProp][currentImg].push({ x: pendingX, y: pendingY, name, material, desc, price });
  }

  pendingX = null;
  pendingY = null;
  editingIndex = null;
  document.getElementById('editorForm').classList.add('hidden');

  updateDotCount(currentImg);
  renderDots();
  renderList();
}

// ── Dots ──────────────────────────────────────────
function renderDots() {
  const canvas = document.getElementById('editorCanvas');
  canvas.querySelectorAll('.hs-dot').forEach(d => d.remove());

  const img        = document.getElementById('canvasImg');
  const rect       = img.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  (hotspots[currentProp][currentImg] || []).forEach((hs, i) => {
    const dot = document.createElement('div');
    dot.className = 'hs-dot' + (i === selectedHsIndex ? ' selected' : '');
    dot.innerHTML = `
      <div class="hs-dot__ring"></div>
      <div class="hs-dot__core"></div>
      <div class="hs-dot__label">${hs.name}</div>
    `;
    dot.style.left = (rect.left - canvasRect.left + (hs.x / 100) * rect.width)  + 'px';
    dot.style.top  = (rect.top  - canvasRect.top  + (hs.y / 100) * rect.height) + 'px';
    dot.addEventListener('click', e => { e.stopPropagation(); selectHotspot(i); });
    canvas.appendChild(dot);
  });

  if (pendingX !== null) {
    const dot = document.createElement('div');
    dot.className = 'hs-dot';
    dot.style.opacity = '0.45';
    dot.innerHTML = `<div class="hs-dot__ring"></div><div class="hs-dot__core"></div>`;
    dot.style.left = (rect.left - canvasRect.left + (pendingX / 100) * rect.width)  + 'px';
    dot.style.top  = (rect.top  - canvasRect.top  + (pendingY / 100) * rect.height) + 'px';
    canvas.appendChild(dot);
  }
}

function selectHotspot(i) {
  selectedHsIndex = i;
  editingIndex    = i;
  const hs = hotspots[currentProp][currentImg][i];
  pendingX = hs.x;
  pendingY = hs.y;
  showForm(hs.name, hs.material, hs.desc, hs.price);
  renderDots();
  renderList();
}

function deleteHotspot(i) {
  hotspots[currentProp][currentImg].splice(i, 1);
  editingIndex    = null;
  pendingX        = null;
  pendingY        = null;
  document.getElementById('editorForm').classList.add('hidden');
  updateDotCount(currentImg);
  renderDots();
  renderList();
}

// ── Lista lateral ─────────────────────────────────
function renderList() {
  const list  = document.getElementById('hsList');
  const items = hotspots[currentProp][currentImg] || [];

  if (items.length === 0) {
    list.innerHTML = '<p class="hs-list-empty">Haz clic sobre la imagen<br>para agregar un punto.</p>';
    return;
  }

  list.innerHTML = items.map((hs, i) => `
    <div class="hs-item${i === selectedHsIndex ? ' selected' : ''}" onclick="selectHotspot(${i})">
      <div class="hs-item__info">
        <span class="hs-item__name">${hs.name || '—'}</span>
        <span class="hs-item__pos">${hs.x}% · ${hs.y}%</span>
      </div>
      <button class="hs-item__del" onclick="event.stopPropagation(); deleteHotspot(${i})">✕</button>
    </div>
  `).join('');
}

function updateDotCount(imgIndex) {
  const count = (hotspots[currentProp][imgIndex] || []).length;
  const el = document.getElementById(`dotCount-${imgIndex}`);
  if (!el) return;
  el.textContent = count;
  el.classList.toggle('visible', count > 0);
}

window.addEventListener('resize', () => renderDots());
document.getElementById('canvasImg').addEventListener('load', () => renderDots());

// ── Exportar ──────────────────────────────────────
function openExport() {
  const data = {};
  Object.entries(hotspots).forEach(([propId, images]) => {
    const filtered = {};
    Object.entries(images).forEach(([imgIdx, pts]) => {
      if (pts.length > 0) filtered[imgIdx] = pts;
    });
    if (Object.keys(filtered).length > 0) data[propId] = filtered;
  });

  document.getElementById('exportOutput').value = JSON.stringify(data, null, 2);
  document.getElementById('exportOverlay').classList.add('open');
}

function closeExport() {
  document.getElementById('exportOverlay').classList.remove('open');
}

function copyExport() {
  const ta = document.getElementById('exportOutput');
  ta.select();
  document.execCommand('copy');
  const btn = document.getElementById('copyBtn');
  btn.textContent = '¡ Copiado !';
  setTimeout(() => btn.textContent = 'Copiar', 2000);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('exportOverlay').classList.contains('open')) closeExport();
    else cancelForm();
  }
});
