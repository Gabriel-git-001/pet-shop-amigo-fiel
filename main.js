```javascript
// ==========================================
// PET SHOP AMIGO FIEL
// JavaScript principal
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTOS DO SITE
    const menu = document.querySelector("header nav");
    const cabecalho = document.querySelector("header");

    // ==========================================
    // 1. MENU RESPONSIVO
    // ==========================================

    if (cabecalho && menu) {
        let botaoMenu = document.querySelector(".menu-mobile");

        if (!botaoMenu) {
            botaoMenu = document.createElement("button");
            botaoMenu.className = "menu-mobile";
            botaoMenu.textContent = "☰ Menu";
            botaoMenu.setAttribute("aria-expanded", "false");
            cabecalho.insertBefore(botaoMenu, menu);
        }

        botaoMenu.addEventListener("click", function () {
            menu.classList.toggle("menu-aberto");

            const aberto = menu.classList.contains("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", aberto);
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menu.classList.remove("menu-aberto");
                botaoMenu.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ==========================================
    // 2. NOTIFICAÇÕES
    // ==========================================

    function mostrarMensagem(mensagem) {
        let notificacao = document.querySelector(".notificacao");

        if (!notificacao) {
            notificacao = document.createElement("div");
            notificacao.className = "notificacao";

            Object.assign(notificacao.style, {
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#155438",
                color: "#ffffff",
                padding: "15px 22px",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                zIndex: "2000",
                maxWidth: "90%",
                fontSize: "15px"
            });

            document.body.appendChild(notificacao);
        }

        notificacao.textContent = mensagem;
        notificacao.style.display = "block";

        clearTimeout(notificacao.timer);

        notificacao.timer = setTimeout(function () {
            notificacao.style.display = "none";
        }, 3000);
    }

    // ==========================================
    // 3. CARRINHO DE COMPRAS
    // ==========================================

    let carrinho = [];
    const botoesCompra = document.querySelectorAll(
        ".produto button, .produto .botao"
    );

    function atualizarCarrinho() {
        let totalItens = 0;
        let totalPreco = 0;

        carrinho.forEach(function (item) {
            totalItens += item.quantidade;
            totalPreco += item.preco * item.quantidade;
        });

        let resumo = document.querySelector("#resumo-carrinho");

        if (!resumo) {
            resumo = document.createElement("div");
            resumo.id = "resumo-carrinho";
            resumo.className = "contato";

            const secaoProdutos = document.querySelector(
                "#produtos, .produtos"
            );

            if (secaoProdutos) {
                secaoProdutos.appendChild(resumo);
            } else {
                document.body.appendChild(resumo);
            }
        }

        resumo.innerHTML = `
            <h3>🛒 Meu carrinho</h3>
            <p>Quantidade de itens: ${totalItens}</p>
            <p class="preco">
                Total: ${totalPreco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </p>
            <button type="button" id="ver-carrinho">
                Ver produtos
            </button>
            <button type="button" id="limpar-carrinho">
                Limpar carrinho
            </button>
        `;

        document.querySelector("#ver-carrinho")
            .addEventListener("click", mostrarItensCarrinho);

        document.querySelector("#limpar-carrinho")
            .addEventListener("click", function () {
                if (carrinho.length === 0) {
                    mostrarMensagem("O carrinho já está vazio.");
                    return;
                }

                carrinho = [];
                atualizarCarrinho();
                mostrarMensagem("Carrinho limpo com sucesso!");
            });
    }

    function mostrarItensCarrinho() {
        if (carrinho.length === 0) {
            mostrarMensagem("Seu carrinho está vazio.");
            return;
        }

        let mensagem = "Produtos no carrinho:\n";

        carrinho.forEach(function (item) {
            mensagem +=
                `${item.nome} - ${item.quantidade} unidade(s)\n`;
        });

        alert(mensagem);
    }

    botoesCompra.forEach(function (botao) {
        botao.addEventListener("click", function (evento) {
            evento.preventDefault();

            const produto = botao.closest(".produto");

            if (!produto) return;

            const nomeElemento = produto.querySelector("h3");
            const precoElemento = produto.querySelector(".preco");

            if (!nomeElemento || !precoElemento) {
                mostrarMensagem(
                    "Adicione o nome e o preço ao produto no HTML."
                );
                return;
            }

            const nome = nomeElemento.textContent.trim();

            const precoTexto = precoElemento.textContent
                .replace(/[^\d,.-]/g, "")
                .replace(/\./g, "")
                .replace(",", ".");

            const preco = Number(precoTexto);

            if (!Number.isFinite(preco) || preco <= 0) {
                mostrarMensagem("O preço deste produto é inválido.");
                return;
            }

            const itemExistente = carrinho.find(function (item) {
                return item.nome === nome;
            });

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({
                    nome: nome,
                    preco: preco,
                    quantidade: 1
                });
            }

            atualizarCarrinho();
            mostrarMensagem(nome + " adicionado ao carrinho!");
        });
    });

    // ==========================================
    // 4. PESQUISA DE PRODUTOS
    // ==========================================

    const campoPesquisa = document.querySelector("#pesquisa-produtos");

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", function () {
            const termo = campoPesquisa.value.toLowerCase();

            document.querySelectorAll(".produto").forEach(
                function (produto) {
                    const texto = produto.textContent.toLowerCase();

                    produto.style.display = texto.includes(termo)
                        ? ""
                        : "none";
                }
            );
        });
    }

    // ==========================================
    // 5. FORMULÁRIO DE CONTATO
    // ==========================================

    const formulario = document.querySelector("#form-contato");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const nome = formulario.querySelector(
                '[name="nome"]'
            );

            const email = formulario.querySelector(
                '[name="email"]'
            );

            const mensagem = formulario.querySelector(
                '[name="mensagem"]'
            );

            if (
                !nome || !email || !mensagem ||
                !nome.value.trim() ||
                !email.checkValidity() ||
                !mensagem.value.trim()
            ) {
                mostrarMensagem(
                    "Preencha corretamente todos os campos."
                );
                return;
            }

            mostrarMensagem(
                "Obrigado pelo contato, " +
                nome.value.trim() + "!"
            );

            formulario.reset();
        });
    }

    // ==========================================
    // 6. ANO AUTOMÁTICO NO RODAPÉ
    // ==========================================

    const ano = document.querySelector("#ano-atual");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    console.log("Pet Shop Amigo Fiel carregado com sucesso!");

});
```
