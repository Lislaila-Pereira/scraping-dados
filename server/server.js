const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para analisar dados de formulários HTML
app.use(express.static(path.join(__dirname, 'public')));

let dados = []; // Variável para armazenar dados recebidos
let inscritos = []; // Lista para armazenar emails dos usuários

// Endpoint para receber dados do Python
app.post('/dados', (req, res) => {
    dados = req.body;
    console.log('Dados recebidos:', dados);
    res.send('Dados recebidos com sucesso!');

});

// Endpoint ...
app.get('/dados', (req, res) => {
    res.json(dados);
});

// Endpoint para exibir a página com o gráfico
app.get('/grafico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'grafico.html'));
});

// Endpoint para exibir o formulário de inscrição
app.get('/notify', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notify.html'));
});

// Endpoint para processar as inscrições
app.post('/notify', (req, res) => {
    const { name, email, country } = req.body;

    if (name && email && country) {
        inscritos.push({name, email, country}); // Adiciona inscrito
        res.send('Cadastro realizado com sucesso!');
        console.log(name, " ", email, " ", country);

        // Verificar se o Brasil está entre os cinco primeiros colocados
        const pais = dados.find(entry => entry.pais === country);        
        if (pais) {
            notificarInscritos();
        } else {
            console.log(`${country} nao esta entre os cinco primeiros no ranking de medalhas`)
        }
        
    } else {
        res.status(400).send('Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.');
    }

});

// Função para enviar notificação por email
const notificarInscritos = () => {
    if (inscritos.length === 0) {
        console.log('Nenhum destinatário para notificação.');
        return;
    }

    // Criar um objeto de transporte
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD, 
            }
    });

    // Obter países que estão no top 5
    const topPaises = dados.map(entry => entry.pais);

    inscritos.forEach(({ name, email, country }) => {
        if (topPaises.includes(country)) {

            // Configurar o objeto mailOptions
            const mailOptions = {
                to: email,
                subject: `Notificação: ${country} entre os cinco primeiros`,
                text: `Olá ${name}. ${country} está entre os cinco primeiros colocados no ranking de medalhas!`
            };

            // Enviar o email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Erro ao enviar email:", error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });
        }
    });
};

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
