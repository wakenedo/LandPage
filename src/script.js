async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadSection(sectionName) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = `<div id="${sectionName}"></div>`;
  await loadComponent(sectionName, `${sectionName}.html`);
  // after loading, run UI bits
  initInteractiveExamples(sectionName);
  handleHeaderButtons(sectionName);
  if (sectionName === 'HTML-section') injectHtmlInfoCards();
}

document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".nav-toggle");
  if (toggle) {
    document.querySelector("header nav").classList.toggle("open");
  }
});

async function init() {
  document.getElementById("app").innerHTML = `
    <header id="header"></header>
    <main>
    <div id="equipe-section"></div>
    </main>
    <div id="footer"></div>
  `;

  await loadComponent("header", "header.html");
  await loadComponent("equipe-section", "equipe-section.html");
}

// intercept links with hash to load sections dynamically
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    const hash = link.getAttribute('href').slice(1);
    if (hash && hash !== 'equipe-section') {
      e.preventDefault();
      await loadSection(hash);
      // initialize interactive bits if present
      initInteractiveExamples(hash);
    }
  }
});

// initialize page
// if URL has a hash, load that section; otherwise init default
const initialHash = location.hash ? location.hash.slice(1) : null;
if (initialHash) {
  init().then(async () => {
    if (initialHash === 'equipe-section') return;
    await loadSection(initialHash);
  });
} else {
  init();
}

function initInteractiveExamples(sectionName) {
  if (sectionName === 'HTML-section') {
    const btn = document.getElementById('insert-paragraph');
    if (btn) {
      btn.addEventListener('click', () => {
        const root = document.getElementById('example-root');
        const p = document.createElement('p');
        p.textContent = 'Parágrafo inserido dinamicamente.';
        root.appendChild(p);
      });
    }
  }
}

// show/hide back button and inject cards for HTML-section
function handleHeaderButtons(sectionName) {
  const backBtn = document.querySelector('.back-btn');
  if (!backBtn) return;
  if (sectionName && sectionName !== 'equipe-section') {
    backBtn.style.display = 'inline-block';
  } else {
    backBtn.style.display = 'none';
  }

  backBtn.onclick = async () => {
    await loadSection('equipe-section');
    initInteractiveExamples('equipe-section');
    handleHeaderButtons('equipe-section');
  };
}

// inject HTML info cards to match team cards style
function injectHtmlInfoCards() {
  const section = document.getElementById('HTML-section');
  if (!section) return;
  const container = section.querySelector('.container');
  const grid = document.createElement('div');
  grid.className = 'html-info-grid';

  const cards = [
    {title: 'O que é HTML', text: 'Linguagem de marcação usada para estruturar conteúdos na web.'},
    {title: 'Estrutura', text: 'Tags como <html>, <head>, <body>, <h1>, <p> e <a>.'},
    {title: 'HTML5', text: 'Inclui elementos semânticos e APIs para multimídia.'}
  ];

  cards.forEach(c => {
    const card = document.createElement('div');
    card.className = 'html-info-card';
    card.innerHTML = `<h4>${c.title}</h4><p>${c.text}</p>`;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

