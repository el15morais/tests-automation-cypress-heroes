# Pesquisa de heróis (observação)

**Pré-condições**
- Usuário autenticado.

**Observação importante**
- Nesta versão do frontend pode não haver campo de busca na UI. Se não houver, execute a verificação via API.

**Passos (se houver campo de busca)**
1. Digitar um termo no campo de busca da lista de heróis.
2. Verificar que a listagem é filtrada conforme o termo.

**Resultado esperado**
- Resultados filtrados correspondem ao termo pesquisado; caso não haja campo de busca, use a API `GET /heroes?search=...`.