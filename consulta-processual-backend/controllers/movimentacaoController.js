const Movimentacao = require('../models/Movimentacao');
const Processo = require('../models/Processo');
const { body, validationResult } = require('express-validator');

exports.validateMovimentacao = [
  body('descricao').notEmpty().withMessage('O campo descrição é obrigatório.'),
  body('dataMovimentacao').isDate().withMessage('A data de movimentação deve ser uma data válida.'),
];

exports.createMovimentacao = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { descricao, dataMovimentacao } = req.body;
    const processoId = req.params.id;
    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      return res.status(404).json({ message: 'Processo não encontrado.' });
    }

    const movimentacao = await Movimentacao.create({ descricao, dataMovimentacao, processoId });

    return res.status(201).json(movimentacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar movimentação.' });
  }
};

exports.getMovimentacoes = async (req, res) => {
  try {
    const processoId = req.params.id;
    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      return res.status(404).json({ message: 'Processo não encontrado.' });
    }

    const movimentacoes = await Movimentacao.findAll({ where: { processoId } });
    res.status(200).json(movimentacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar movimentações.' });
  }
};

exports.getMovimentacao = async (req, res) => {
  try {
    const movimentacaoId = req.params.id;
    const movimentacao = await Movimentacao.findByPk(movimentacaoId);

    if (!movimentacao) {
      return res.status(404).json({ message: 'Movimentação não encontrada.' });
    }

    res.status(200).json(movimentacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar movimentação.' });
  }
};

exports.updateMovimentacao = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const movimentacaoId = req.params.id;
    const movimentacaoData = req.body;

    const movimentacao = await Movimentacao.findByPk(movimentacaoId);

    if (!movimentacao) {
      return res.status(404).json({ message: 'Movimentação não encontrada.' });
    }

    await movimentacao.update(movimentacaoData);

    res.status(200).json(movimentacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar movimentação.' });
  }
};

exports.deleteMovimentacao = async (req, res) => {
  try {
    const movimentacaoId = req.params.id;
    const movimentacao = await Movimentacao.findByPk(movimentacaoId);

    if (!movimentacao) {
      return res.status(404).json({ message: 'Movimentação não encontrada.' });
    }

    await movimentacao.destroy();
    res.status(204).json({ message: 'Movimentação excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir movimentação.' });
  }
};