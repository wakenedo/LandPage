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
    <div id="HTML-section"></div>
    <div id="css-section"></div>
    <div id="git-section"></div>
    </main>
    <div id="footer"></div>
  `;

  await loadComponent("header", "header.html");
  await loadComponent("git-section", "git-section.html");
  await loadComponent("equipe-section", "equipe-section.html");
  await loadComponent("HTML-section", "HTML-section.html");
  await loadComponent("css-section", "css-section.html");

  const { SkySystem, DynamicGradient } = window.DynamicSky;

  DynamicGradient.init("#hero", {
    type: "linear",
    direction: "to right",
    colors: ["#ff7e5f", "#feb47b", "#86A8E7"],
    transitionDuration: 1500, // ms
    schedule: [
      { time: "6:00", colors: ["#a2ff5fff", "#FFC371", "#e9b56bff"] },

      { time: "18:00", colors: ["#ff5fbcff", "#a371ffff", "#86A8E7"] },

      { time: "1:00", colors: ["#fffa5fff", "#FFC371", "#e7bd86ff"] },
    ],
  });

  SkySystem.init(document.body, {
    withClouds: true,
    withStars: true,
    phase: "moon",
    setHour: 24.5, // 14:30
    manual: false,
  });
}

init();
