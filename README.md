# Pokédex - Ionic Angular

## Sobre o Projeto

Este é um aplicativo Pokédex desenvolvido com **Ionic 8** e **Angular 19**, utilizando a API pública PokeAPI para exibir informações sobre Pokémon. O projeto demonstra boas práticas de desenvolvimento mobile-first com componentes standalone e arquitetura modular.

## Abordagem e Estilo de Codificação

**Arquitetura Modular**: O projeto segue uma estrutura modular com separação clara de responsabilidades, utilizando serviços dedicados para comunicação com APIs (`PokemonService`), gerenciamento de estado local (`FavoritesService`) e utilitários (`HelpersService`). 

**Componentes Standalone**: Todos os componentes foram desenvolvidos como standalone components do Angular, eliminando a necessidade de módulos tradicionais e facilitando a manutenção e reutilização de código. 

**Padrão de Design Responsivo**: Implementei um design mobile-first com grid responsivo que se adapta a diferentes tamanhos de tela, utilizando as classes utilitárias do Ionic para breakpoints (`size-md`, `size-lg`). 

**Gerenciamento de Estado Local**: Os favoritos são gerenciados localmente através do `localStorage` com `BehaviorSubject` para reatividade, garantindo persistência de dados sem dependência de backend. 

**Padrões de Navegação**: Utilizei lazy loading para as rotas e navegação baseada em parâmetros para detalhes dos Pokémon, seguindo as melhores práticas do Angular Router. 

**Tratamento de Estados**: Implementei estados de loading, erro e vazio em todas as páginas, proporcionando uma experiência de usuário consistente e informativa. 

**Reutilização de Código**: Criei componentes reutilizáveis como `PokemonCardComponent` e serviços utilitários para evitar duplicação de código e manter consistência visual. 

**TypeScript Strict**: Utilizei tipagem forte do TypeScript com interfaces bem definidas para garantir type safety e facilitar a manutenção do código. 

**Ionic Design System**: Segui rigorosamente o design system do Ionic, utilizando componentes nativos como `ion-card`, `ion-chip` e `ion-progress-bar` para uma experiência visual consistente. 

**Performance Otimizada**: Implementei carregamento infinito na listagem principal e lazy loading de imagens, garantindo boa performance mesmo com grandes volumes de dados.

