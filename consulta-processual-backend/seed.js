const Chance = require('chance');
const chance = new Chance();

const Processo = require('./models/Processo');
const Movimentacao = require('./models/Movimentacao');

// Função que gera um CNJ aleatório
const generateCnj = () => {
  const numbers = [...Array(20)].map(() => Math.floor(Math.random() * 10));
  return numbers.join('');
}

// Função que popula o banco de dados com dados fictícios
const seedDatabase = async () => {
  // Cria 10 processos fictícios
  const processos = await Processo.bulkCreate([...Array(10)].map(() => ({
    cnj: generateCnj(),
    partes: chance.name(),
    tribunal: chance.company(),
    dataInicio: chance.date({ year: 2022 }),
  })));

  // Para cada processo, cria um número aleatório de movimentações
  for (const processo of processos) {
    const numMovimentacoes = chance.integer({ min: 1, max: 10 });

    await Movimentacao.bulkCreate([...Array(numMovimentacoes)].map(() => ({
      descricao: chance.sentence(),
      data: chance.date({
        min: processo.dataInicio,
        max: new Date()
      }),
      processoId: processo.id,
    })));
  }

  console.log('Dados populados com sucesso.');
}

seedDatabase();