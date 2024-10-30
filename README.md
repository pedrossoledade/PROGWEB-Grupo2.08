# PELIKA

Bem-vindo ao repositório do **PELIKA**, um e-commerce focado na venda de produtos eletrônicos. Este documento fornece uma visão geral do projeto, funcionalidades principais, além de atualizações das entregas.

## 1. Visão Geral do Projeto
**Nome do Projeto:** PELIKA  
**Descrição:** O PELIKA é uma plataforma de e-commerce focada na venda de produtos eletrônicos, oferecendo uma experiência de compra prática e segura para o usuário final.  
**Documentos relacionados:**  
- [Protótipo do PELIKA](/Grupo2.08_prototipo.pdf)  
- [Documento de Requisitos](/Grupo2.08_requisitos.pdf)  
- [Plano de Projeto](/Grupo2.08_plano.pdf) 

## 2. Escopo do Projeto
### Funcionalidades Principais
1. **Página de Navegação de Produtos:** Permite ao usuário navegar por categorias de produtos eletrônicos.
2. **Sistema de Busca:** Possibilita a busca de produtos específicos com base em nome, marca ou categoria.
3. **Carrinho de Compras:** Funcionalidade para adicionar e remover produtos, além de calcular o valor total da compra.
4. **Pagamento e Checkout:** Integrado com provedores de pagamento para garantir um processamento seguro das transações.
5. **Cadastro e Login do Usuário:** Sistema de autenticação que permite ao usuário criar uma conta para salvar histórico de compras e informações pessoais.
6. **Cadastro de Produtos:** Ferramenta que permite ao vendedor adicionar, atualizar e remover produtos do inventário.
7. **Relatório de Pedidos:** Geração de relatórios detalhados de pedidos para análise de transações e gestão de estoque.
8. **Relatório de Vendas:** Geração de relatórios de vendas para que o vendedor possa monitorar o desempenho e volume de vendas.

## 3. Tecnologias Utilizadas
- **Biblioteca Frontend:** React.js
- **Framework de Estilo:** Bootstrap
- **Backend:** Node.js
- **Frontend:** HTML e CSS
- **Banco de Dados:** PostgreSQL
- **Controle de Versão:** Git e GitHub
- **Ferramenta de Design:** Figma

## 4. Riscos
| Risco                                         | Probabilidade | Impacto |
|-----------------------------------------------|---------------|---------|
| Falta de conformidade com os requisitos       | Alta          | Alto    |
| Bugs críticos próximos ao lançamento          | Média         | Alto    |
| Atraso na entrega                             | Baixa         | Alto    |

## 5. Atualização de Entregas

| Data       | Entrega                              | Descrição                                           |
|------------|--------------------------------------|-----------------------------------------------------|
| 14/10/2024 | Protótipo no Figma                   | Protótipo inicial concluído e revisado              |
| 14/10/2024 | Documento de Requisitos              | Requisitos do sistema documentados                  |
| 14/10/2024 | Plano de Projeto                     | Plano de Projeto documentado                        |


## 6. GitHub Flow para Colaboração

Para o desenvolvimento do projeto, adotamos o **GitHub Flow**. Ele ajuda a organizar o trabalho em equipe e manter o código limpo e sem conflitos. 

### Passo a Passo do GitHub Flow
1. **Comece na `main`**  
   Sempre inicie qualquer tarefa a partir da branch `main`, que contém a versão mais recente e estável do projeto.

2. **Crie uma nova branch para cada tarefa**  
   Use uma nova branch para cada funcionalidade ou correção de bug.  
   
   **Padrão de nome para branches:**
   - Funcionalidade nova: `feat/nome-da-tarefa` (ex.: `feature/cadastro-produto`)
   - Correção de erro: `fix/descrição-do-erro` (ex.: `fix/corrigir-login`)
   - Mudança na documentação: `docs/nome-do-documento` (ex.: `docs/README`)

   **Como criar uma nova branch:**
   ```bash
   git checkout main
   git pull origin main        
   git checkout -b feature/nome-da-tarefa
   ```

3. **Faça commits frequentes**  
   Realize commits com mensagens descritivas sempre que uma parte importante da tarefa for concluída:
   ```bash
   git add .
   git commit -m "Descrição da sua mudança"
   ```

4. **Envie sua branch para o GitHub**  
   Envie seu progresso para o GitHub:
   ```bash
   git push origin feature/nome-da-tarefa
   ```

5. **Abra um Pull Request (PR)**  
   No GitHub, abra um Pull Request (PR) da sua branch para a `main` para que outros possam revisar suas mudanças.

6. **Revise e Mescle (Merge)**  
   Após a revisão e aprovação do PR, mescle as mudanças na `main`. A funcionalidade ou correção agora está incorporada ao projeto.
