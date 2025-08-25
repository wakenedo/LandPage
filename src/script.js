async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadSection(sectionName) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = `<div id="${sectionName}"></div>`;
  await loadComponent(sectionName, `${sectionName}.html`);
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

  // Adiciona o event listener após carregar o git section
  document.addEventListener("click", (e) => {
    if (e.target.id === "git-btn") {
      loadSection("git-section");
    }
  });
}

init();
