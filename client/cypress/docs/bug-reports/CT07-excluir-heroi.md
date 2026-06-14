# Bug Report: CT07 - Exclusão de herói não exibe feedback e mantém tela de edição

## Resumo
Ao excluir um herói na tela de edição, o herói é removido com sucesso do backend, mas o frontend não fornece feedback claro ao usuário e permanece na página de edição do herói já excluído.

## Localização
- Projeto: `tests-automation-cypress-heroes`
- Pasta: `client/cypress/e2e`
- Caso de teste: `07 - Excluir herói`

## Passos para reproduzir
1. Logar como usuário admin.
2. Acessar a listagem de heróis.
3. Abrir a edição de um herói existente.
4. Clicar no botão `Delete Hero`.
5. Confirmar a exclusão.

## Comportamento atual
- O herói é excluído no backend.
- Não é exibida mensagem de sucesso ou confirmação clara para o usuário.
- A tela permanece na página de edição do herói excluído.
- O usuário precisa sair manualmente da página para continuar.

## Comportamento esperado
- Exibir mensagem clara de confirmação como `Herói excluído com sucesso`.
- Redirecionar automaticamente para a listagem de heróis ou outra tela apropriada.
- Não manter o usuário na página de edição de um registro que não existe mais.

## Impacto
- Experiência do usuário prejudicada.
- Sensação de falha ou inconsistência, apesar da exclusão ter ocorrido corretamente.
- Pode gerar dúvidas e ações desnecessárias do usuário.

## Observações
Esse bug afeta diretamente a usabilidade da funcionalidade de exclusão e deve ser corrigido para garantir consistência entre ação e feedback visual.
