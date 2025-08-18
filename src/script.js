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

async function init() {
  document.getElementById("app").innerHTML = `
    <div id="header"></div>
    <main>
    <div id="equipe-section" />
    </main>
    <div id="footer"></div>
  `;

  await loadComponent("header", "header.html");
  await loadComponent("equipe-section", "equipe-section.html");
}

init();
