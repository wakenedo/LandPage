async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function init() {
  document.getElementById("app").innerHTML = `
    <div id="header"></div>
    <main>
      
    </main>
    <div id="footer"></div>
  `;

  await loadComponent("header", "header.html");
}

init();
