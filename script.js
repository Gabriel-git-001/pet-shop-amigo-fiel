// JavaScript do Pet Shop Amigo Fiel

document.addEventListener("DOMContentLoaded", () => {
  // Atualiza automaticamente o ano do rodapé.
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Abre e fecha o menu em telas pequenas.
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu");

  if (toggle && menu) {
    const fecharMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };

    toggle.addEventListener("click", () => {
      const aberto = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(aberto));
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu depois que uma opção é selecionada.
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });

    // Fecha o menu com a tecla Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") fecharMenu();
    });

    // Se a tela voltar ao tamanho de computador, remove o menu aberto.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) fecharMenu();
    });
  }

  // Rolagem suave para os links internos da página.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const destino = link.getAttribute("href");
      if (!destino || destino === "#") return;

      const secao = document.querySelector(destino);
      if (secao) {
        event.preventDefault();
        secao.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", destino);
      }
    });
  });

  // Aviso ao clicar no botão de e-mail demonstrativo.
  const linkEmail = document.querySelector('a[href^="mailto:contato@exemplo.com"]');
  if (linkEmail) {
    linkEmail.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Este e-mail é apenas demonstrativo. O responsável pelo site precisa substituí-lo pelo contato real do pet shop.");
    });
  }
});
