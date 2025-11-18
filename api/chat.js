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

    // 3. Extração dos Dados
    const { history } = req.body;
    
    if (!history || !Array.isArray(history)) {
        return res.status(400).json({ 
            error: 'Bad Request',
            message: 'O corpo da requisição deve conter o histórico de chat (history).' 
        });
    }

    try {
        // 4. Chamada para a API do Gemini (USANDO A CHAVE SECRETA)
        const geminiResponse = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" + GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: history, // Passa o histórico completo
                    // Habilita o Google Search para dar respostas mais factuais
                    tools: [{ "google_search": {} }], 
                    config: {
                         // Pode adicionar temperatura, etc., aqui se desejar
                    }
                })
            }
        );

        // 5. Tratamento de Erro da API do Gemini
        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            return res.status(geminiResponse.status).json({ 
                error: "Erro na API do Gemini", 
                details: errorData 
            });
        }

        // 6. Retorna a Resposta do Gemini (incluindo citações) para o Front-end
        const data = await geminiResponse.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Erro interno do servidor de proxy:", error);
        return res.status(500).json({ 
            error: "Internal Server Error",
            message: error.message 
        });
    }
};