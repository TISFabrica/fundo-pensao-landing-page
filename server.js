const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para permitir CORS e parsing do JSON
app.use(cors());
app.use(express.json());

// Endpoint mock para receber as inscrições
app.post('/api/inscricao', (req, res) => {
    try {
        const payload = req.body;
        
        // Log do payload recebido
        console.log('Payload recebido:', JSON.stringify(payload, null, 2));

        // Validações básicas
        const camposObrigatorios = ['nome', 'cargo', 'empresa', 'tamanho', 'email', 'telefone', 'autorizo', 'campanha'];
        
        for (const campo of camposObrigatorios) {
            if (!payload[campo]) {
                return res.status(400).json({
                    erro: true,
                    mensagem: `Campo obrigatório não preenchido: ${campo}`
                });
            }
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Email inválido'
            });
        }

        // Validar telefone (formato internacional)
        if (!payload.telefone.startsWith('+')) {
            return res.status(400).json({
                erro: true,
                mensagem: 'Telefone deve estar em formato internacional'
            });
        }

        // Simular processamento
        setTimeout(() => {
            res.status(200).json({
                sucesso: true,
                mensagem: 'Inscrição recebida com sucesso',
                dados: {
                    id: Math.random().toString(36).substr(2, 9),
                    dataRecebimento: new Date().toISOString(),
                    ...payload
                }
            });
        }, 1000); // Delay de 1 segundo para simular processamento

    } catch (error) {
        console.error('Erro ao processar inscrição:', error);
        res.status(500).json({
            erro: true,
            mensagem: 'Erro interno do servidor'
        });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor mock rodando na porta ${PORT}`);
    console.log(`Endpoint de inscrição: http://localhost:${PORT}/api/inscricao`);
}); 