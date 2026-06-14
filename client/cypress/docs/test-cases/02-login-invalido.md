# Login inválido

**Pré-condições**
- Aplicação em execução (acesse `/heroes`).

**Passos**
1. Acessar `/heroes` e abrir o modal de login através do botão de login.
2. Preencher o campo de e-mail (pode ser válido ou inválido para o teste).
3. Preencher o campo de senha com uma senha incorreta.
4. Clicar no botão de entrar (Sign in).

**Resultado esperado**
- Exibir mensagem de erro indicando credenciais inválidas (por exemplo: "Invalid email or password").
- `localStorage` não deve conter um `auth_result` válido.
- O usuário permanece no modal/página de login.