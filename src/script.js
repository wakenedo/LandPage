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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function attachJavaScriptDemo() {
  const btn = document.getElementById("d20-btn");
  const output = document.getElementById("demo");

  if (btn && output) {
    btn.addEventListener("click", () => {
      output.textContent = getRndInteger(0, 20);
    });
  }
}

async function init() {
  document.getElementById("app").innerHTML = `
    <header id="header"></header>
    <main>
    <div id="equipe-section"></div>
    <div id="HTML-section"></div>
    <div id="css-section"></div>
    <div id="javascript-section"></div>
    <div id="git-section"></div>
    </main>
    <div id="footer"></div>
  `;

  await loadComponent("header", "header.html");
  await loadComponent("git-section", "git-section.html");
  await loadComponent("equipe-section", "equipe-section.html");
  await loadComponent("HTML-section", "HTML-section.html");
  await loadComponent("css-section", "css-section.html");
  await loadComponent("javascript-section", "javascript-section.html");
  attachJavaScriptDemo();
}
init();
