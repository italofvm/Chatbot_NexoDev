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

**Causa:** A chave da API não está configurada ou é inválida.

**Solução:**
1. Acesse o painel do Vercel → Seu projeto → Settings → Environment Variables
2. Verifique se existe a variável `GEMINI_API_KEY`
3. Se não existir, adicione:
   - Key: `GEMINI_API_KEY`
   - Value: Sua chave (obtenha em https://aistudio.google.com/app/apikey)
   - Environments: Marque todas ✓
4. **IMPORTANTE:** Após adicionar/modificar, faça um **Redeploy**:
   - Deployments → 3 pontinhos → Redeploy
5. Teste a chave diretamente em: https://aistudio.google.com/app/apikey

### Erro 500 (Internal Server Error)

**Causa:** Problema no servidor ou configuração incorreta.

**Solução:**
1. Verifique os logs no Vercel:
   - Deployments → Clique no deploy → Functions → Veja os logs
2. Confirme se o arquivo `api/chat.js` existe no repositório
3. Verifique se a variável `GEMINI_API_KEY` está acessível
4. Tente fazer um novo deploy do zero

### Erro 429 (Too Many Requests)

**Causa:** Limite de requisições da API atingido.

**Solução:**
1. Aguarde alguns minutos antes de tentar novamente
2. Verifique sua cota em: https://aistudio.google.com/app/apikey
3. Considere fazer upgrade do plano se necessário

### Chat não responde / Erro de conexão

**Solução:**
1. Abra o Console do navegador (F12 → Console)
2. Procure por erros em vermelho
3. Verifique se a URL `/api/chat` está acessível:
   - Abra: `https://seu-dominio.vercel.app/api/chat`
   - Deve retornar erro 405 (Method Not Allowed) - isso é normal!
4. Se retornar 404, o arquivo `api/chat.js` não foi deployado
5. Confirme se há créditos disponíveis na sua conta do Google AI Studio

### Debug Avançado

Para ver logs detalhados no navegador:
1. Abra o Console (F12)
2. Envie uma mensagem no chat
3. Você verá logs como:
   ```
   Enviando requisição para: /api/chat
   Payload: {contentsLength: 1, hasSystemInstruction: true}
   Resposta recebida: 200 OK
   ```
4. Se houver erro, copie a mensagem e verifique o código de status

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
