# 📋 Sistema de Cadastro de Tripulantes

## Visão Geral

O Sistema de Cadastro de Tripulantes é uma solução completa para gerenciar informações de tripulantes aeronáuticos com verificação automática de conformidade para escalas. O sistema garante que apenas tripulantes com documentação e treinamentos válidos possam ser escalados.

## 🎯 Funcionalidades Principais

### 1. Cadastro Completo de Tripulantes
- **Informações Pessoais**: Nome, CPF, RG, data de nascimento, contatos, endereço
- **Dados Profissionais**: Cargo, status na empresa, base de lotação, data de admissão
- **Licenças e Habilitações**: Sistema de múltiplas licenças com tipos, números, categorias e validades
- **Treinamentos**: Simulador, CRM, Emergência com datas e validades
- **Experiência Recente**: Último voo, horas acumuladas, horas dos últimos 90 dias e 12 meses
- **Documentação**: Passaporte, vistos múltiplos, CMA com anexos de arquivos
- **Vacinas Obrigatórias**: Sistema de seleção com data da vacina e validade
- **Histórico**: Observações e histórico de alterações

### 2. Sistema de Múltiplas Licenças
O sistema agora permite cadastrar **múltiplas licenças** para cada tripulante:
- ✅ **Adicionar licenças**: Botão para incluir novas licenças
- ✅ **Remover licenças**: Botão para excluir licenças desnecessárias
- ✅ **Validação individual**: Cada licença é validada separadamente
- ✅ **Verificação de conformidade**: Sistema verifica todas as licenças

**Tipos de Licença Disponíveis:**
- CIV - Comercial
- CHT - Helicóptero
- CPL - Piloto Privado
- ATPL - Transporte de Linha

### 3. Sistema de Anexos de Documentos
A seção de documentação agora permite **anexar arquivos**:
- 📎 **Passaporte**: Anexar cópia digitalizada
- 📎 **Vistos**: Sistema de múltiplos vistos com anexos
- 📎 **CMA**: Anexar certificado médico
- 📎 **Outros documentos**: Múltiplos arquivos permitidos

**Formatos Aceitos:**
- PDF (recomendado)
- JPG/JPEG
- PNG
- **Tamanho máximo**: 5MB por arquivo

### 4. Sistema de Múltiplos Vistos
O sistema agora permite cadastrar **múltiplos vistos** para cada tripulante:
- ✅ **Adicionar vistos**: Botão para incluir novos vistos
- ✅ **Remover vistos**: Botão para excluir vistos desnecessários
- ✅ **Anexos individuais**: Cada visto pode ter seu próprio arquivo anexado
- ✅ **Validação independente**: Cada visto é validado separadamente
- ✅ **Identificação por país**: Campo obrigatório para identificar o país do visto
- ✅ **Tipo de visto**: Classificação por categoria (turismo, negócios, trabalho, etc.)

**Campos de Cada Visto:**
- **País do Visto** * (obrigatório) - Lista completa de países
- **Número do Visto** - Número de identificação
- **Validade** - Data de vencimento
- **Tipo de Visto** - Categoria (turismo, negócios, trabalho, estudo, etc.)
- **Anexo** - Arquivo digitalizado do visto

### 5. Sistema de Vacinas Obrigatórias
Campo de vacina convertido para **sistema de seleção** com:
- 💉 **Tipo de Vacina**: Seleção de lista predefinida
- 📅 **Data da Vacina**: Data de aplicação
- 📅 **Validade da Vacina**: Data de vencimento

**Vacinas Disponíveis:**
- Febre Amarela
- Hepatite A e B
- Meningite
- Tétano
- Difteria
- Sarampo
- COVID-19
- Outras (campo personalizado)

### 6. Verificação Automática de Conformidade
O sistema verifica automaticamente se um tripulante pode ser escalado baseado em:

- ✅ **Jornada disponível**: Tripulante deve estar disponível para trabalho
- ✅ **Licenças em dia**: Todas as licenças válidas com margem de segurança de 30 dias
- ✅ **Treinamentos válidos**: Todos os treinamentos obrigatórios em dia
- ✅ **Experiência recente**: Voo nos últimos 90 dias e horas mínimas
- ✅ **Documentação válida**: ICAO, CMA, passaporte e outros documentos em dia
- ✅ **Vacinas em dia**: Todas as vacinas obrigatórias com validade

### 7. Sistema de Validação Inteligente
- Verificação em tempo real durante o preenchimento
- Alertas visuais para itens pendentes
- Status de conformidade automático
- Relatórios detalhados de não conformidade

## 🚀 Como Usar

### Acesso ao Sistema
1. Acesse o **Portal Administrativo**
2. No Dashboard, clique em **"Cadastro de Tripulantes"**
3. Preencha todas as informações obrigatórias (marcadas com *)
4. O sistema verifica automaticamente a conformidade
5. Salve o tripulante

### Adicionando Múltiplas Licenças
1. Preencha a primeira licença
2. Clique em **"Adicionar Outra Licença"**
3. Preencha os dados da nova licença
4. Repita conforme necessário
5. Use **"Remover Licença"** para excluir licenças desnecessárias

### Adicionando Múltiplos Vistos
1. Preencha o primeiro visto (país obrigatório)
2. Clique em **"Adicionar Outro Visto"**
3. Preencha os dados do novo visto
4. Repita conforme necessário
5. Use **"Remover Visto"** para excluir vistos desnecessários

### Anexando Documentos
1. Preencha os dados do documento
2. Clique em **"Escolher arquivo"**
3. Selecione o arquivo (PDF, JPG, PNG)
4. O arquivo será anexado ao cadastro

### Cadastrando Vacinas
1. Selecione o **Tipo de Vacina** da lista
2. Informe a **Data da Vacina**
3. Informe a **Validade da Vacina**
4. Use **"Adicionar Outra Vacina"** para múltiplas vacinas

### Verificação de Conformidade
O sistema mostra em tempo real:
- **Verde (✓)**: Item aprovado
- **Vermelho (✗)**: Item reprovado
- **Status geral**: APROVADO ou REPROVADO para escala

## 📁 Estrutura de Arquivos

```
admin/
├── cadastro-tripulantes.html    # Interface de cadastro
├── dashboard.html               # Dashboard com link para cadastro
└── ...

scripts/
├── tripulante-validation.js     # Sistema de validação
└── main.js                      # Scripts principais

styles/
└── main.css                     # Estilos do sistema
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e formulários
- **CSS3**: Estilos responsivos e modernos
- **JavaScript ES6+**: Lógica de validação e interatividade
- **Font Awesome**: Ícones para melhor UX
- **Grid CSS**: Layout responsivo e organizado

## 📊 Regras de Validação

### Jornada de Trabalho
- Deve estar marcada como "Disponível"
- Outros status (Restrição, Folga) impedem escalação

### Licenças (Múltiplas)
- **Todas** as licenças devem ter validade futura
- Margem de segurança de 30 dias antes do vencimento
- ICAO Inglês obrigatório com validade
- Sistema verifica cada licença individualmente

### Vistos (Múltiplos)
- **Todos** os vistos devem ter validade futura
- **País do visto é obrigatório** para identificação
- Cada visto pode ter seu próprio arquivo anexado
- Sistema verifica cada visto individualmente

### Treinamentos
- Simulador, CRM e Emergência devem estar válidos
- Validade baseada na data atual

### Experiência Recente
- Último voo deve ser nos últimos 90 dias
- Mínimo de 3 horas nos últimos 90 dias
- Total de horas acumuladas para referência

### Documentação
- CMA (Certificado Médico Aeronáutico) válido
- Passaporte válido (quando aplicável)
- **Anexos obrigatórios** para documentos importantes
- Sistema de validação de arquivos

### Vacinas Obrigatórias
- **Todas** as vacinas obrigatórias devem estar em dia
- Validade baseada na data atual
- Sistema verifica cada vacina individualmente

## 🚨 Alertas e Notificações

### Tripulante Aprovado
- ✅ Status verde
- Mensagem: "APROVADO para escala"
- Pode ser incluído em escalas

### Tripulante Reprovado
- ❌ Status vermelho
- Mensagem: "REPROVADO - Não pode ser escalado"
- Lista de itens pendentes
- Recomendações para correção

## 🔄 Integração com Escalas

O sistema está preparado para integração com o módulo de escalas:

```javascript
// Exemplo de uso na criação de escalas
const resultado = validarTripulanteParaEscala(dadosTripulante);

if (resultado.aprovado) {
    // Incluir tripulante na escala
    adicionarTripulanteEscala(tripulante);
} else {
    // Bloquear inclusão e mostrar motivo
    mostrarAlertaConformidade(resultado.motivo);
}
```

## 📈 Benefícios do Sistema

1. **Segurança Operacional**: Evita escalação de tripulantes não qualificados
2. **Conformidade Regulatória**: Garante cumprimento das normas aeronáuticas
3. **Eficiência**: Verificação automática em tempo real
4. **Rastreabilidade**: Histórico completo de alterações
5. **Prevenção de Erros**: Validação antes da confirmação de escalas

## 🔮 Funcionalidades Futuras

- [ ] Integração com banco de dados
- [ ] Sistema de notificações para vencimentos
- [ ] Relatórios de conformidade por base
- [ ] API para integração com outros sistemas
- [ ] App mobile para tripulantes
- [ ] Sistema de backup e auditoria

## 📞 Suporte

Para dúvidas ou sugestões sobre o sistema:
- Consulte a documentação técnica
- Entre em contato com a equipe de desenvolvimento
- Reporte bugs através do sistema de tickets

---

**Desenvolvido para garantir a segurança e conformidade das operações aeronáuticas** ✈️

