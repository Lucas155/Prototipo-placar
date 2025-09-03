# Sistema de Gestão de Tripulação

Um sistema completo de gestão de escalas e incidentes para empresas de aviação, desenvolvido em HTML, CSS e JavaScript.

## 📋 Descrição

Este sistema foi desenvolvido para atender às necessidades de gestão de tripulação em empresas de aviação, oferecendo dois portais distintos:

- **Portal Administrativo**: Para administradores e gestores
- **Portal do Tripulante**: Para tripulantes consultarem suas informações

## 🚀 Funcionalidades

### Portal Administrativo

#### 1. **Dashboard**
- Indicadores em tempo real
- Visão geral de incidentes e escalas
- Atalhos rápidos para módulos principais
- Atividade recente do sistema

#### 2. **Gestão de Usuários**
- Criar, editar e gerenciar usuários
- Definição de perfis e permissões
- Controle de status (ativo/inativo)
- Histórico de alterações

#### 3. **Gestão de Escalas**
- Criação e edição de escalas
- Controle de versões
- Publicação e arquivamento
- Histórico detalhado de alterações
- Seleção de tripulantes

#### 4. **Gestão de Incidentes**
- Acompanhamento de incidentes
- Designação de responsáveis
- Alteração de status
- Anexo de evidências
- Histórico completo

#### 5. **Relatórios e Auditorias**
- Relatórios filtrados por período
- Exportação em PDF/Excel
- Log de auditoria completo
- Estatísticas gerais

### Portal do Tripulante

#### 1. **Dashboard**
- Informações pessoais
- Escala atual
- Incidentes recentes
- Notificações

#### 2. **Minha Escala**
- Visualização da escala atual
- Histórico de versões
- Comparação entre versões
- Exportação em PDF

#### 3. **Registro de Incidentes**
- Formulário completo de registro
- Seleção de prioridade
- Upload de anexos
- Validação de dados

#### 4. **Histórico Pessoal**
- Histórico de incidentes
- Histórico de escalas
- Filtros avançados
- Estatísticas pessoais

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna e responsiva
- **JavaScript**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Design Responsivo**: Compatível com mobile

## 📁 Estrutura do Projeto

```
te/
├── index.html                 # Página inicial
├── styles/
│   └── main.css              # Estilos principais
├── scripts/
│   └── main.js               # JavaScript principal
├── admin/                    # Portal Administrativo
│   ├── login.html
│   ├── dashboard.html
│   ├── usuarios.html
│   ├── escalas.html
│   ├── incidentes.html
│   └── relatorios.html
├── tripulante/               # Portal do Tripulante
│   ├── login.html
│   ├── dashboard.html
│   ├── escala.html
│   ├── incidente.html
│   └── historico.html
└── README.md
```

## 🎨 Design e UX

### Características do Design
- **Interface Moderna**: Design limpo e profissional
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Acessível**: Navegação intuitiva
- **Consistente**: Padrão visual unificado

### Paleta de Cores
- **Primária**: #667eea (Azul)
- **Secundária**: #764ba2 (Roxo)
- **Sucesso**: #27ae60 (Verde)
- **Aviso**: #f39c12 (Laranja)
- **Erro**: #e74c3c (Vermelho)

## 🔐 Segurança e Regras de Negócio

### Histórico de Alterações
- Todas as modificações geram registro detalhado
- Rastreabilidade completa de ações
- Log de auditoria para compliance

### Controle de Versões
- Escalas com controle de versão
- Destaque de alterações entre versões
- Histórico completo de modificações

### Permissões Granulares
- Controle de acesso por perfil
- Permissões específicas por funcionalidade
- Segregação entre portais

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Interface completa
- **Tablet**: Layout adaptado
- **Mobile**: Navegação otimizada

## 🚀 Como Usar

### 1. Acesso ao Sistema
1. Abra `index.html` no navegador
2. Escolha entre Portal Administrativo ou Portal do Tripulante
3. Faça login com suas credenciais

### 2. Portal Administrativo
- **Dashboard**: Visão geral do sistema
- **Usuários**: Gestão completa de usuários
- **Escalas**: Criação e gestão de escalas
- **Incidentes**: Acompanhamento de incidentes
- **Relatórios**: Geração de relatórios

### 3. Portal do Tripulante
- **Dashboard**: Informações pessoais
- **Minha Escala**: Consulta da escala atual
- **Registrar Incidente**: Formulário de registro
- **Histórico**: Consulta de histórico pessoal

## 🔧 Funcionalidades Técnicas

### Validação de Formulários
- Validação em tempo real
- Mensagens de erro claras
- Prevenção de envio incompleto

### Filtros e Busca
- Filtros avançados em todas as listas
- Busca por texto
- Filtros por data, status, tipo, etc.

### Upload de Arquivos
- Suporte a múltiplos arquivos
- Validação de tipo e tamanho
- Preview de arquivos selecionados

### Notificações
- Sistema de mensagens em tempo real
- Feedback visual para ações
- Confirmações de operações

## 📊 Dados de Exemplo

O sistema inclui dados de exemplo para demonstração:
- Usuários com diferentes perfis
- Escalas com histórico de versões
- Incidentes em diferentes status
- Relatórios e estatísticas

## 🔄 Funcionalidades Futuras

### Melhorias Planejadas
- **Integração com APIs**: Conexão com sistemas externos
- **Notificações Push**: Alertas em tempo real
- **App Mobile**: Aplicativo nativo
- **Dashboard Avançado**: Gráficos interativos
- **Relatórios Customizáveis**: Relatórios personalizados

### Recursos Adicionais
- **Chat Interno**: Comunicação entre usuários
- **Calendário Integrado**: Sincronização com calendários
- **Backup Automático**: Backup automático de dados
- **Multi-idioma**: Suporte a múltiplos idiomas

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e demonstrativos.

## 👥 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no repositório
- Consulte a documentação
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para a gestão eficiente de tripulação aeronáutica**
