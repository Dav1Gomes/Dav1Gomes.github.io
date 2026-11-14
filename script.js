"use strict";
const $ = (s) => document.querySelector(s);
const themeButton = $("#theme");
function syncTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.textContent = dark ? "☀" : "☾";
  themeButton.setAttribute(
    "aria-label",
    dark ? "Ativar tema claro" : "Ativar tema escuro",
  );
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#101014"
    : "#f7f7fa";
}
syncTheme();
themeButton.addEventListener("click", () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("dg-theme", document.documentElement.dataset.theme);
  } catch {}
  syncTheme();
});
$("#year").textContent = new Date().getFullYear();
const stories = {
  ia: {
    title: "IA da Família",
    type: "SAÚDE PÚBLICA / PROJETO DE EXTENSÃO",
    problem:
      "Como facilitar o acesso da população às informações e aos serviços do SUS em Juiz de Fora?",
    contribution:
      "Atuei no frontend em React, com componentização e hooks, no backend em Node.js/Express e na integração com um chatbot em Python. Também liderei uma equipe multidisciplinar durante o projeto de extensão.",
    choices:
      "Separação entre interface React, API Express e chatbot Python. Versionamento com Git para organizar mudanças e colaboração.",
    learning:
      "Integração entre tecnologias, organização de componentes, investigação de bugs e coordenação das etapas de desenvolvimento.",
    repo: "IA-da-Famlia",
  },
  valorant: {
    title: "Agentes Valorant",
    type: "GAMES / EXPERIÊNCIA WEB",
    problem:
      "Como apresentar os personagens de Valorant e facilitar a descoberta de suas funções e habilidades?",
    contribution:
      "Projeto acadêmico desenvolvido em colaboração com Thiago Schmitz. Uma experiência temática para explorar os agentes, pesquisar por nome ou função e consultar habilidades em modais.",
    choices:
      "HTML, CSS e JavaScript com módulos para buscar dados da Valorant API em português. A interface usa identidade visual inspirada no jogo e cores específicas para os agentes.",
    learning:
      "Consumo de API, filtragem de dados, organização do JavaScript em módulos, criação de modais e colaboração no desenvolvimento de uma interface temática.",
    repo: "Agentes-Valorant",
  },
  carteira: {
    title: "Carteira de Ações",
    type: "FINANÇAS / APLICATIVO MOBILE ACADÊMICO",
    problem:
      "Como reunir operações, dividendos e acompanhamento de uma carteira de investimentos em um aplicativo?",
    contribution:
      "Desenvolvimento acadêmico de um aplicativo React Native com registro de compras e vendas, histórico de movimentações, dividendos e dashboard.",
    choices:
      "React Native com Expo na interface, Node.js/Express e SQLite no backend, com integração à API Polygon.io para dados de mercado.",
    learning:
      "Navegação mobile, integração com APIs, autenticação e organização de dados para visualização da carteira.",
    repo: "ControleCarteiraAcoes",
  },
};
const dialog = $("#project-dialog");
document.querySelectorAll(".details").forEach((b) =>
  b.addEventListener("click", () => {
    const p = stories[b.dataset.project];
    $("#dialog-content").innerHTML =
      `<p class="eyebrow">${p.type}</p><h2>${p.title}</h2><h3>O problema</h3><p>${p.problem}</p><h3>Minha contribuição</h3><p>${p.contribution}</p><h3>Decisões técnicas</h3><p>${p.choices}</p><h3>Aprendizados na prática</h3><p>${p.learning}</p><a class="button primary" href="https://github.com/Dav1Gomes/${p.repo}" target="_blank" rel="noopener noreferrer">Explorar código ↗</a>`;
    dialog.showModal();
  }),
);
$("#recruiter").addEventListener("click", () =>
  $("#recruiter-dialog").showModal(),
);
document.querySelectorAll("dialog").forEach((d) => {
  d.querySelector(".dialog-close").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }
  });
});
$("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("davigcarvalho4@gmail.com");
    $("#copy-status").textContent = "E-mail copiado";
    $("#copy-email").innerHTML = "E-mail copiado! <span>✓</span>";
    setTimeout(
      () =>
        ($("#copy-email").innerHTML =
          "davigcarvalho4@gmail.com <span>⧉</span>"),
      2500,
    );
  } catch {
    $("#copy-status").textContent =
      "Não foi possível copiar. Use o endereço davigcarvalho4@gmail.com.";
    $("#copy-email").textContent = "davigcarvalho4@gmail.com";
  }
});
let repos = [],
  filter = "all";
const status = $("#repo-status");
function category(r) {
  if (r.name === "ControleCarteiraAcoes") return "mobile";
  if (["BrazukaZoo", "IA-da-Famlia"].includes(r.name)) return "backend";
  return "web";
}
function safeUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
}
function renderRepos() {
  const container = $("#repos");
  container.replaceChildren();
  const visible = repos.filter(
    (r) => filter === "all" || category(r) === filter,
  );
  for (const r of visible) {
    const card = document.createElement("article");
    card.className = "repo";
    const top = document.createElement("div");
    top.className = "repo-top";
    top.innerHTML = "<span>⌘</span><span>↗</span>";
    const heading = document.createElement("h4");
    heading.textContent = r.name;
    const desc = document.createElement("p");
    desc.textContent =
      r.description ||
      "Projeto de estudo e desenvolvimento. Explore o repositório para conhecer o código.";
    const bottom = document.createElement("div");
    bottom.className = "repo-bottom";
    const lang = document.createElement("span");
    lang.textContent = r.language || "Projeto";
    const a = document.createElement("a");
    a.textContent = "Repositório ↗";
    a.href = safeUrl(r.html_url) || "https://github.com/Dav1Gomes";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    bottom.append(lang, a);
    const home = safeUrl(r.homepage);
    if (home) {
      const demo = document.createElement("a");
      demo.textContent = "Demo ↗";
      demo.href = home;
      demo.target = "_blank";
      demo.rel = "noopener noreferrer";
      bottom.append(demo);
    }
    card.append(top, heading, desc, bottom);
    container.append(card);
  }
  if (!visible.length) {
    const p = document.createElement("p");
    p.textContent = "Nenhum projeto nesta categoria por enquanto.";
    container.append(p);
  }
}
document.querySelectorAll("[data-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    filter = b.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((x) => {
      const active = x === b;
      x.classList.toggle("active", active);
      x.setAttribute("aria-pressed", String(active));
    });
    renderRepos();
  }),
);
async function getRepos() {
  let fallback = null;
  try {
    const response = await fetch("assets/repos.json");
    if (response.ok) fallback = await response.json();
  } catch {}
  if (fallback) {
    repos = fallback;
    status.textContent =
      "Projetos públicos · seleção sincronizada em novembro de 2026";
    renderRepos();
  }
  try {
    const response = await fetch(
      "https://api.github.com/users/Dav1Gomes/repos?per_page=100&sort=updated",
      { signal: AbortSignal.timeout(7000) },
    );
    if (!response.ok) throw Error("GitHub indisponível");
    const data = await response.json();
    repos = data.filter(
      (r) => !r.fork && r.name !== "Dav1Gomes" && !r.archived,
    );
    status.textContent =
      "Projetos públicos · atualizados diretamente do GitHub";
    renderRepos();
  } catch {
    if (!fallback) {
      status.textContent =
        "Não foi possível carregar os projetos. Explore o perfil no GitHub.";
    } else {
      status.textContent =
        "Seleção salva dos projetos · atualização do GitHub indisponível no momento";
    }
  }
}
getRepos();
