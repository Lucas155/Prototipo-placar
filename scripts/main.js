// Funções principais do sistema
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    addEventListeners();
    initializeTooltips();
});

// Inicialização de componentes
function initializeComponents() {
    // Inicializar navegação lateral
    initializeSidebar();
    
    // Inicializar modais
    initializeModals();
    
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar tabelas
    initializeTables();
}

// Navegação lateral
function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !mainContent) return;
    
    // Marcar item ativo na navegação
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = sidebar.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        }
    });
    
    // Toggle da sidebar em dispositivos móveis
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        background: var(--primary-500);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        display: none;
        box-shadow: var(--shadow-md);
    `;
    
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
    
    // Mostrar toggle apenas em mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
            mainContent.style.marginLeft = '0';
        } else {
            toggleButton.style.display = 'none';
            mainContent.style.marginLeft = '280px';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggleButton.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });
}

// Modais
function initializeModals() {
    // Fechar modal ao clicar fora
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                openModal.classList.remove('show');
            }
        }
    });
}

// Filtros
function initializeFilters() {
    const filterInputs = document.querySelectorAll('input[type="text"], select');
    
    filterInputs.forEach(input => {
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const filterButton = input.closest('.filters')?.querySelector('.btn');
                if (filterButton) {
                    filterButton.click();
                }
            }
        });
    });
}

// Tabelas
function initializeTables() {
    const tables = document.querySelectorAll('.table');
    
    tables.forEach(table => {
        // Adicionar ordenação
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, header);
            });
        });
        
        // Adicionar busca em tempo real
        const searchInput = table.closest('.card')?.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filterTable(table, e.target.value);
            });
        }
    });
}

// Event listeners
function addEventListeners() {
    // Formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
    
    // Links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
}

// Manipulação de formulários
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!validateForm(form)) {
        return;
    }
    
    // Simular envio
    showMessage('Dados salvos com sucesso!', 'success');
    
    // Fechar modal se estiver em um
    const modal = form.closest('.modal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    // Reset do formulário
    form.reset();
}

// Validação de formulários
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-500)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--neutral-300)';
        }
    });
    
    // Validação de email
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            field.style.borderColor = 'var(--error-500)';
            isValid = false;
        }
    });
    
    // Validação de senha
    const passwordFields = form.querySelectorAll('input[type="password"]');
    if (passwordFields.length === 2) {
        const [password, confirmPassword] = passwordFields;
        if (password.value !== confirmPassword.value) {
            confirmPassword.style.borderColor = 'var(--error-500)';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
    }
    
    return isValid;
}

// Manipulação de botões
function handleButtonClick(event) {
    const button = event.target;
    const action = button.dataset.action;
    
    switch (action) {
        case 'logout':
            logout();
            break;
        case 'export':
            exportData(button.dataset.type);
            break;
        case 'print':
            printPage();
            break;
        case 'filter':
            filterData(button.dataset.target);
            break;
        default:
            // Ações específicas podem ser definidas via onclick
            break;
    }
}

// Manipulação de links
function handleLinkClick(event) {
    const link = event.target;
    
    // Links internos com âncora
    if (link.hash) {
        event.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Funções de utilidade
function showMessage(message, type = 'info') {
    // Remover mensagens existentes
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${getMessageIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; cursor: pointer;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Inserir no topo do conteúdo principal
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
    }
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

function getMessageIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.dataset.tooltip;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--neutral-900);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    element.tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.target;
    if (element.tooltip) {
        element.tooltip.remove();
        element.tooltip = null;
    }
}

// Funções de sistema
function logout() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        showMessage('Logout realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    }
}

function exportData(type) {
    showMessage(`Exportando dados de ${type}...`, 'info');
    // Simular exportação
    setTimeout(() => {
        showMessage('Dados exportados com sucesso!', 'success');
    }, 2000);
}

function printPage() {
    window.print();
}

function filterData(target) {
    showMessage('Filtros aplicados!', 'success');
}

// Funções de tabela
function sortTable(table, header) {
    const column = Array.from(header.parentElement.children).indexOf(header);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const isAscending = header.classList.contains('sort-asc');
    
    rows.sort((a, b) => {
        const aValue = a.children[column].textContent.trim();
        const bValue = b.children[column].textContent.trim();
        
        if (isAscending) {
            return bValue.localeCompare(aValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });
    
    // Limpar classes de ordenação
    header.parentElement.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Adicionar classe de ordenação
    header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    
    // Reordenar linhas
    rows.forEach(row => tbody.appendChild(row));
}

function filterTable(table, searchTerm) {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        row.style.display = matches ? '' : 'none';
    });
}

// Funções de validação
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidDate(date) {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
}

// Funções de formatação
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('pt-BR');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Funções de armazenamento local
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao ler do localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Erro ao remover do localStorage:', error);
        return false;
    }
}

// Funções de API (simuladas)
async function apiCall(endpoint, method = 'GET', data = null) {
    // Simular chamada de API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: data || {},
                message: 'Operação realizada com sucesso'
            });
        }, 1000);
    });
}

// Funções específicas do sistema
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

function toggleUserStatus(userId) {
    showMessage('Status do usuário alterado!', 'success');
}

function filterUsers() {
    showMessage('Filtros aplicados!', 'success');
}

function saveUser(event) {
    event.preventDefault();
    showMessage('Usuário salvo com sucesso!', 'success');
    closeModal('userModal');
}

function editUser(userId) {
    // Simular carregamento de dados do usuário
    document.getElementById('modalTitle').textContent = 'Editar Usuário';
    document.getElementById('userName').value = 'João Silva';
    document.getElementById('userEmail').value = 'joao.silva@empresa.com';
    document.getElementById('userMatricula').value = 'EMP001';
    document.getElementById('userProfile').value = 'admin';
    document.getElementById('userStatus').value = 'ativo';
    document.getElementById('userPassword').required = false;
    document.getElementById('userPasswordConfirm').required = false;
    openModal('userModal');
}
