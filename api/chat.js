// api/chat.js
// Esta é uma Função Serverless (Back-end) que será executada na Vercel.
// Ela é CRUCIAL para esconder sua chave de API do Gemini.

// A chave de API é lida da Variável de Ambiente que você configurou no painel da Vercel.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Endpoint da Vercel para Serverless Functions (req: request, res: response)
module.exports = async (req, res) => {
    // 1. Verificação de Método (Garante que só aceita POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method Not Allowed',
            message: 'Apenas requisições POST são permitidas para este endpoint.' 
        });
    }

    // 2. Verificação da Chave de API
    if (!GEMINI_API_KEY) {
        // Isso indica que o usuário esqueceu de configurar a variável de ambiente na Vercel!
        return res.status(500).json({ 
            error: 'Server Misconfiguration',
            message: 'A chave GEMINI_API_KEY não está configurada no ambiente Vercel.' 
        });
    }

        // 3. Extração/normalização dos dados: o front-end pode enviar diferentes formatos.
        // Aceitamos tanto `history` (array) quanto um payload já no formato do Gemini
        // (ex: { contents: [...], systemInstruction: {...}, tools: [...] }).
        const payload = req.body;

        if (!payload || typeof payload !== 'object') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'O corpo da requisição deve ser um JSON válido com os dados da requisição.'
            });
        }

        // Se o cliente enviar `history` (array), convertemos para `contents`.
        let geminiBody;
        if (Array.isArray(payload.history)) {
            geminiBody = {
                contents: payload.history,
                tools: payload.tools || [],
                systemInstruction: payload.systemInstruction || undefined,
                config: payload.config || undefined
            };
        } else {
            // Presume que o cliente já montou um body compatível com a API do Gemini.
            geminiBody = payload;
        }

        // 4. Chamada para a API do Gemini (USANDO A CHAVE DO AMBIENTE)
        // Preferimos enviar via Authorization Bearer e usar timeout para evitar hang.
        const controller = new AbortController();
        const timeoutMs = 30000; // 30s
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GEMINI_API_KEY}`
            };

            const geminiResponse = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(geminiBody),
                signal: controller.signal
            });

            clearTimeout(timeout);

            // 5. Tratamento de Erro da API do Gemini
            let data = null;
            try { data = await geminiResponse.json(); } catch (e) { data = null; }

            if (!geminiResponse.ok) {
                const details = data || { statusText: geminiResponse.statusText };
                return res.status(geminiResponse.status).json({
                    error: 'Erro na API do Gemini',
                    details
                });
            }

            // 6. Retorna a resposta do Gemini para o front-end
            return res.status(200).json(data);

        } catch (error) {
            clearTimeout(timeout);
            if (error.name === 'AbortError') {
                console.error('Timeout ao chamar a API do Gemini');
                return res.status(504).json({ error: 'Gateway Timeout', message: 'Timeout ao chamar a API externa.' });
            }

            console.error('Erro interno do servidor de proxy:', error);
            return res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
};