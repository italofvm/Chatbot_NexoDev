# NexoBot - Assistente de IA

Chat inteligente com múltiplos agentes especializados, integrado com Google Gemini AI.

## 🚀 Deploy no Vercel

### Passo 1: Obter a Chave da API do Gemini

1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### Passo 2: Fazer Deploy no Vercel

1. Conecte seu repositório ao Vercel
2. Clique em "Deploy"
3. Aguarde o deploy finalizar

### Passo 3: Configurar a Variável de Ambiente

1. No painel do Vercel, vá em **Settings** → **Environment Variables**
2. Clique em **Add New**
3. Preencha:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Cole sua chave da API do Gemini
   - **Environments:** Marque todas (Production, Preview, Development)
4. Clique em **Save**

### Passo 4: Redeploy

1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Aguarde finalizar

✅ Pronto! Seu chat está funcionando de forma segura!

### Passo 3: Personalizar

Edite o arquivo `index.html` para personalizar:

- **Links de contato:** Procure por `https://wa.me/5599999999999` e `https://instagram.com/nexodev`
- **Agentes:** Modifique o array `RAW_AGENTS_DATA` com seus especialistas
- **Cores e estilos:** Ajuste as classes CSS no `<style>`

## 📱 Uso em Iframe

Para incorporar o chat em outra página:

```html
<iframe 
  src="https://seu-dominio.vercel.app" 
  width="400" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
</iframe>
```

## 🔒 Segurança

✅ **Implementação Segura:**
- A chave da API **NUNCA** é exposta no frontend
- Todas as chamadas passam pela API serverless (`/api/chat`)
- A chave fica protegida nas variáveis de ambiente do Vercel
- Impossível para usuários verem ou roubarem sua chave

## 🛠️ Tecnologias

- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Backend:** Vercel Serverless Functions
- **IA:** Google Gemini 2.0 Flash

## 📝 Estrutura

```
.
├── index.html          # Interface do chat
├── api/
│   └── chat.js        # API serverless (proxy seguro)
├── vercel.json        # Configuração do Vercel
└── README.md          # Este arquivo
```

## ⚠️ Troubleshooting

### Erro 401 (Unauthorized)
- Verifique se a variável `GEMINI_API_KEY` está configurada no Vercel
- Confirme se a chave da API está correta (sem espaços extras)
- Faça um **Redeploy** após adicionar a variável
- Teste a chave em: https://aistudio.google.com/app/apikey
- Verifique se há créditos disponíveis na sua conta do Google AI Studio

### Erro 500 (Internal Server Error)
- Verifique os logs no Vercel Dashboard
- Confirme se o arquivo `api/chat.js` está presente
- Verifique se a variável de ambiente está acessível

### Chat não responde
- Abra o Console do navegador (F12) para ver erros
- Verifique se a URL `/api/chat` está acessível
- Confirme se há créditos disponíveis na sua conta do Google AI Studio

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
