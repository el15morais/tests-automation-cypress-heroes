# Criar novo herói

**Pré-condições**
- Usuário autenticado com permissão admin (ou acesso direto a `/heroes/new`).

**Passos**
1. Acessar a página de criação de herói (`/heroes/new` ou via botão "Create New Hero").
2. Preencher os campos do formulário: nome, preço, número de fãs e número de saves.
3. Selecionar os poderes desejados.
4. (Opcional) Anexar uma imagem/avatar.
5. Submeter o formulário (Submit).

**Resultado esperado**
- Após submissão, retornar à listagem de heróis e ver o novo herói com os dados fornecidos.
- O registro é persistido no backend (verificável via API se necessário).