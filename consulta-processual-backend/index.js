const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Processo = require('./models/Processo');
const Movimentacao = require('./models/Movimentacao');
const processoController = require('./controllers/processoController');
const movimentacaoController = require('./controllers/movimentacaoController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/processos', processoController.validateProcesso, processoController.createProcesso);
app.get('/processos', processoController.getProcessos);
app.get('/processos/:id', processoController.getProcesso);
app.put('/processos/:id', processoController.validateProcesso, processoController.updateProcesso);
app.delete('/processos/:id', processoController.deleteProcesso);

app.post('/movimentacoes', movimentacaoController.validateMovimentacao, movimentacaoController.createMovimentacao);
app.get('/movimentacoes', movimentacaoController.getMovimentacoes);
app.get('/movimentacoes/:id', movimentacaoController.getMovimentacao);
app.put('/movimentacoes/:id', movimentacaoController.validateMovimentacao, movimentacaoController.updateMovimentacao);
app.delete('/movimentacoes/:id', movimentacaoController.deleteMovimentacao);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    await sequelize.sync({ force: true });
    console.log('Database tables have been created and synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();