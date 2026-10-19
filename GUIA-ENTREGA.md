# Guia de apresentação e entrega — Amigo Fiel

## 1. Criar e subir o repositório

Um integrante cria o repositório **pet-shop-amigo-fiel** no GitHub (sem adicionar README pelo site, pois este ZIP já inclui um), extrai os arquivos e, na pasta do projeto, executa:

```bash
git init
git branch -M main
git add .
git commit -m "chore: inicia projeto Amigo Fiel"
git remote add origin https://github.com/USUARIO/pet-shop-amigo-fiel.git
git push -u origin main
```

Troque `USUARIO` pela conta proprietária real do repositório. Convide os outros dois como colaboradores nas configurações de acesso. Cada participante deve configurar seu próprio Git (`user.name` e `user.email`) e clonar o repositório.

## 2. Criar três branches e distribuir alterações

Cada participante deve partir da `main` atualizada e trabalhar em **mudanças reais** diferentes. Por exemplo:

- Pessoa 1: `feature/servicos` — acrescentar detalhes reais de banho e tosa em `index.html`.
- Pessoa 2: `feature/produtos` — melhorar os cards e ajustar o CSS em `assets/css/style.css`.
- Pessoa 3: `feature/contato` — configurar horários, endereço e contato confirmados, e melhorar o menu JS.

Exemplo para cada integrante (substitua o nome da branch):

```bash
git clone https://github.com/USUARIO/pet-shop-amigo-fiel.git
cd pet-shop-amigo-fiel
git switch -c feature/servicos
# editar os arquivos correspondentes à funcionalidade
git add .
git commit -m "feat: detalha servicos de banho e tosa"
# realizar outra alteração independente e útil
git add .
git commit -m "docs: documenta os servicos oferecidos"
git push -u origin feature/servicos
```

Com o commit inicial e 2 commits de cada um dos 3 participantes, haverá pelo menos 7 commits, desde que os commits sejam de autores reais. Faça commits apenas após alterações efetivas.

## 3. Pull Requests e merges

No GitHub, para cada branch, clicar em **Compare & pull request**, revisar diferenças e fazer **Merge pull request** para `main`. Quando um PR é concluído, as mudanças vão para a `main`. Os outros participantes devem sincronizar sua branch com a `main` antes do merge, se necessário.

**Observação:** o professor pediu no mínimo 3 branches; a sugestão é ter `main` + as três branches de funcionalidade. Não exclua as branches de funcionalidade até registrar as evidências.

## 4. Conflitos reais

Se ocorrer um conflito de merge:

```bash
git fetch origin
git switch feature/contato
git merge origin/main
```

Abra os arquivos indicados pelo Git, examine os blocos marcados com `<<<<<<<`, `=======`, `>>>>>>>`, decida o conteúdo final em conjunto, remova as marcações e então:

```bash
git add .
git commit -m "fix: resolve conflito de integracao"
git push
```

Explique qual trecho estava em disputa, como combinaram as mudanças e qual teste fizeram depois. **Se nenhum conflito ocorrer, diga isso com clareza; não alegue uma resolução fictícia.**

## 5. Evidências por comando

```bash
git branch -a
git log --all --graph --oneline --decorate
git shortlog -sne --all
git status
```

Fotografe ou capture a tela do GitHub mostrando: 3 contas distintas nos commits, pelo menos 5 commits, branches, Pull Requests merged, README e a estrutura de arquivos.

## 6. Deploy Netlify (site estático)

1. Acesse Netlify e faça login.
2. Escolha **Add new project → Import an existing project** (o texto do menu pode variar).
3. Conecte o GitHub e selecione o repositório.
4. Configure a branch de produção como `main`.
5. Para este site estático, não há comando de build; pasta de publicação: `.` (raiz do projeto).
6. Publique e abra a URL HTTPS fornecida pela plataforma.
7. Teste o menu em tela pequena e confira todas as seções.

Alternativa Vercel: importe o repositório GitHub, selecione configuração de site estático/Other sem comando de build e publique a raiz do projeto.

## 7. Roteiro de apresentação (3–5 minutos)

- **Participante 1:** apresentar problema do cliente, arquitetura HTML/CSS/JS e seção de serviços.
- **Participante 2:** apresentar produtos, estilo e responsividade, explicar a branch e commits próprios.
- **Participante 3:** apresentar horários, localização, Pull Requests, merge e deploy.
- **Equipe:** mostrar `git log --all --graph --oneline --decorate`, aba de branches, PRs e URL pública em funcionamento.
- **Conflitos:** relatar se houve conflito e, caso tenha ocorrido, mostrar sua resolução registrada.

## Checklist

- [ ] Repositório GitHub criado pela equipe
- [ ] 3 colaboradores com commits próprios
- [ ] 5 ou mais commits reais e descritivos
- [ ] 3 ou mais branches no histórico/repositório
- [ ] Pull Requests e merge para `main`
- [ ] README atualizado com nomes e links reais
- [ ] Evidência de colaboração e conflitos (se houve)
- [ ] Site publicado no Netlify ou Vercel
- [ ] URL pública funcionando
