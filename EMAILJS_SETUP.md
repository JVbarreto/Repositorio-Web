# Configuração do EmailJS

Para ativar o envio de emails do formulário de contato, siga estes passos:

## 1. Criar Conta no EmailJS

1. Acesse https://www.emailjs.com/
2. Clique em "Sign Up" (Cadastro)
3. Crie uma conta com seu email

## 2. Obter Credenciais

1. Após fazer login, vá para o painel de controle
2. Clique em "Account" (Conta)
3. Copie seu **User ID** (ID de Usuário)

## 3. Criar Email Service

1. No menu lateral, clique em "Email Services"
2. Clique em "Add Service"
3. Escolha o provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. Copie o **Service ID**

## 4. Criar Email Template

1. No menu lateral, clique em "Email Templates"
2. Clique em "Create New Template"
3. Configure o template com as seguintes variáveis:

```
Para: {{to_email}}
De: {{from_email}}
Nome: {{from_name}}

Mensagem:
{{message}}
```

5. Copie o **Template ID**

## 5. Atualizar o Código

No arquivo `js/script.js`, procure pela função de inicialização do EmailJS:

```javascript
(function() {
    const SERVICE_ID = 'seu_service_id'; // Substitua
    const TEMPLATE_ID = 'seu_template_id'; // Substitua
    const USER_ID = 'seu_user_id'; // Substitua
    
    if (SERVICE_ID && USER_ID) {
        try {
            emailjs.init(USER_ID);
        } catch (error) {
            console.warn('EmailJS não configurado');
        }
    }
})();
```

## 6. Testar

1. Abra seu portfólio no navegador
2. Preencha o formulário de contato
3. Envie a mensagem
4. Verifique seu email para confirmar o recebimento

## Segurança

⚠️ **IMPORTANTE**: Nunca commite suas credenciais reais no GitHub!

Alternativas seguras:
- Use variáveis de ambiente
- Use um backend proxy
- Configure as credenciais apenas no seu servidor de produção

## Solução de Problemas

### Erro: "Rate limit exceeded"
- Aguarde alguns minutos e tente novamente
- Para uso frequente, use um token de autenticação

### Email não recebido
- Verifique se o template está correto
- Confira se o service está ativado
- Verifique a pasta de spam

### Credenciais inválidas
- Revise o User ID, Service ID e Template ID
- Certifique-se de copiar exatamente como está no painel
