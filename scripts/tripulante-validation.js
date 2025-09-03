/**
 * Sistema de Validação de Conformidade para Tripulantes
 * Verifica automaticamente se um tripulante pode ser escalado
 */

class TripulanteValidator {
    constructor() {
        this.checks = {
            jornada: false,
            licencas: false,
            treinamentos: false,
            experiencia: false,
            documentacao: false
        };
    }

    /**
     * Verifica se a jornada está disponível
     */
    verificarJornada(jornada) {
        this.checks.jornada = jornada === 'disponivel';
        return this.checks.jornada;
    }

    /**
     * Verifica se as licenças estão em dia
     */
    verificarLicencas(validadeLicenca) {
        if (!validadeLicenca) return false;
        
        const hoje = new Date();
        const validade = new Date(validadeLicenca);
        
        // Adiciona margem de segurança de 30 dias
        const margemSeguranca = new Date(validade);
        margemSeguranca.setDate(margemSeguranca.getDate() - 30);
        
        this.checks.licencas = validade > hoje && validade > margemSeguranca;
        return this.checks.licencas;
    }

    /**
     * Verifica se os treinamentos estão válidos
     */
    verificarTreinamentos(treinamentos) {
        if (!treinamentos || Object.keys(treinamentos).length === 0) {
            this.checks.treinamentos = false;
            return false;
        }

        const hoje = new Date();
        let todosValidos = true;

        // Verifica cada treinamento
        Object.values(treinamentos).forEach(treinamento => {
            if (treinamento.validade) {
                const validade = new Date(treinamento.validade);
                if (validade <= hoje) {
                    todosValidos = false;
                }
            }
        });

        this.checks.treinamentos = todosValidos;
        return this.checks.treinamentos;
    }

    /**
     * Verifica se a experiência recente está em dia
     */
    verificarExperiencia(ultimoVoo, horas90dias, horas12meses) {
        if (!ultimoVoo) {
            this.checks.experiencia = false;
            return false;
        }

        const hoje = new Date();
        const ultimoVooDate = new Date(ultimoVoo);
        const noventaDiasAtras = new Date();
        noventaDiasAtras.setDate(noventaDiasAtras.getDate() - 90);

        // Verifica se voou nos últimos 90 dias
        const vooRecente = ultimoVooDate > noventaDiasAtras;
        
        // Verifica se tem horas suficientes (mínimo 3 horas nos últimos 90 dias)
        const horasSuficientes = horas90dias >= 3;

        this.checks.experiencia = vooRecente && horasSuficientes;
        return this.checks.experiencia;
    }

    /**
     * Verifica se a documentação está válida
     */
    verificarDocumentacao(documentos) {
        if (!documentos) {
            this.checks.documentacao = false;
            return false;
        }

        const hoje = new Date();
        let todosValidos = true;

        // Verifica ICAO
        if (documentos.icaoValidade) {
            const validadeICAO = new Date(documentos.icaoValidade);
            if (validadeICAO <= hoje) {
                todosValidos = false;
            }
        }

        // Verifica CMA
        if (documentos.cmaValidade) {
            const validadeCMA = new Date(documentos.cmaValidade);
            if (validadeCMA <= hoje) {
                todosValidos = false;
            }
        }

        // Verifica passaporte (se aplicável)
        if (documentos.passaporteValidade) {
            const validadePassaporte = new Date(documentos.passaporteValidade);
            if (validadePassaporte <= hoje) {
                todosValidos = false;
            }
        }

        this.checks.documentacao = todosValidos;
        return this.checks.documentacao;
    }

    /**
     * Executa todas as verificações
     */
    executarVerificacoes(dadosTripulante) {
        this.verificarJornada(dadosTripulante.jornada);
        this.verificarLicencas(dadosTripulante.validadeLicenca);
        this.verificarTreinamentos(dadosTripulante.treinamentos);
        this.verificarExperiencia(
            dadosTripulante.ultimoVoo,
            dadosTripulante.horas90dias,
            dadosTripulante.horas12meses
        );
        this.verificarDocumentacao(dadosTripulante.documentos);

        return this.obterResultado();
    }

    /**
     * Obtém o resultado geral da validação
     */
    obterResultado() {
        const totalChecks = Object.keys(this.checks).length;
        const checksAprovados = Object.values(this.checks).filter(check => check).length;
        const aprovado = checksAprovados === totalChecks;

        return {
            aprovado,
            checksAprovados,
            totalChecks,
            percentual: Math.round((checksAprovados / totalChecks) * 100),
            detalhes: this.checks,
            mensagem: aprovado ? 
                'APROVADO para escala' : 
                `REPROVADO - ${totalChecks - checksAprovados} item(s) pendente(s)`
        };
    }

    /**
     * Gera relatório detalhado de conformidade
     */
    gerarRelatorioConformidade() {
        const resultado = this.obterResultado();
        const relatorio = {
            timestamp: new Date().toISOString(),
            resultado: resultado,
            recomendacoes: []
        };

        // Adiciona recomendações baseadas nos checks que falharam
        if (!this.checks.jornada) {
            relatorio.recomendacoes.push('Tripulante não está disponível para jornada');
        }

        if (!this.checks.licencas) {
            relatorio.recomendacoes.push('Licenças vencidas ou próximas do vencimento');
        }

        if (!this.checks.treinamentos) {
            relatorio.recomendacoes.push('Treinamentos vencidos ou pendentes');
        }

        if (!this.checks.experiencia) {
            relatorio.recomendacoes.push('Experiência recente insuficiente');
        }

        if (!this.checks.documentacao) {
            relatorio.recomendacoes.push('Documentação vencida ou pendente');
        }

        return relatorio;
    }
}

/**
 * Função para validar tripulante antes de incluí-lo em uma escala
 */
function validarTripulanteParaEscala(dadosTripulante) {
    const validator = new TripulanteValidator();
    const resultado = validator.executarVerificacoes(dadosTripulante);
    
    if (!resultado.aprovado) {
        console.warn('Tripulante não aprovado para escala:', resultado);
        return {
            aprovado: false,
            motivo: resultado.mensagem,
            detalhes: resultado.detalhes,
            relatorio: validator.gerarRelatorioConformidade()
        };
    }

    return {
        aprovado: true,
        mensagem: 'Tripulante aprovado para escala',
        detalhes: resultado.detalhes
    };
}

/**
 * Função para verificar conformidade em tempo real no formulário
 */
function verificarConformidadeTempoReal() {
    const validator = new TripulanteValidator();
    
    // Coleta dados do formulário
    const dados = {
        jornada: document.getElementById('jornada')?.value,
        validadeLicenca: document.getElementById('validadeLicenca')?.value,
        ultimoVoo: document.getElementById('ultimoVoo')?.value,
        horas90dias: parseFloat(document.getElementById('horas90dias')?.value || 0),
        horas12meses: parseFloat(document.getElementById('horas12meses')?.value || 0),
        treinamentos: {
            simulador: {
                validade: document.getElementById('treinamentoSimuladorValidade')?.value
            },
            crm: {
                validade: document.getElementById('treinamentoCRMValidade')?.value
            },
            emergencia: {
                validade: document.getElementById('treinamentoEmergenciaValidade')?.value
            }
        },
        documentos: {
            icaoValidade: document.getElementById('icaoValidade')?.value,
            cmaValidade: document.getElementById('cmaValidade')?.value,
            passaporteValidade: document.getElementById('passaporteValidade')?.value
        }
    };

    // Executa verificações
    const resultado = validator.executarVerificacoes(dados);
    
    // Atualiza interface
    atualizarInterfaceConformidade(resultado);
    
    return resultado;
}

/**
 * Atualiza a interface com os resultados da verificação
 */
function atualizarInterfaceConformidade(resultado) {
    // Atualiza cada check individual
    const checks = {
        'checkJornada': resultado.detalhes.jornada,
        'checkLicencas': resultado.detalhes.licencas,
        'checkTreinamentos': resultado.detalhes.treinamentos,
        'checkExperiencia': resultado.detalhes.experiencia,
        'checkDocumentacao': resultado.detalhes.documentacao
    };

    Object.entries(checks).forEach(([elementId, aprovado]) => {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            if (aprovado) {
                elemento.innerHTML = '<span style="color: #27ae60;">✓ Aprovado</span>';
            } else {
                elemento.innerHTML = '<span style="color: #e74c3c;">✗ Reprovado</span>';
            }
        }
    });

    // Atualiza status geral
    const statusElement = document.getElementById('statusConformidade');
    if (statusElement) {
        statusElement.innerHTML = `<span style="color: ${resultado.aprovado ? '#27ae60' : '#e74c3c'};">${resultado.mensagem}</span>`;
    }

    // Atualiza alerta de status
    const statusContainer = document.getElementById('complianceStatus');
    if (statusContainer) {
        if (resultado.aprovado) {
            statusContainer.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <strong>Status de Conformidade:</strong> <span style="color: #27ae60;">${resultado.mensagem}</span>
                </div>
            `;
        } else {
            statusContainer.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Status de Conformidade:</strong> <span style="color: #e74c3c;">${resultado.mensagem}</span>
                </div>
            `;
        }
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TripulanteValidator, validarTripulanteParaEscala };
}

