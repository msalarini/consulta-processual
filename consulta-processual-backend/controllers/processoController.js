const Processo = require('../models/Processo');
const { body, validationResult } = require('express-validator');

exports.validateProcesso = [
  body('cnj').notEmpty().withMessage('O campo CNJ é obrigatório.'),
  body('partes').notEmpty().withMessage('O campo partes é obrigatório.'),
  body('tribunal').notEmpty().withMessage('O campo tribunal é obrigatório.'),
  body('dataInicio').isDate().withMessage('A data de início deve ser uma data válida.'),
];

exports.createProcesso = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cnj, partes, tribunal, dataInicio } = req.body;
    const processo = await Processo.create({ cnj, partes, tribunal, dataInicio });

    return res.status(201).json(processo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar processo.' });
  }
};

exports.updateProcesso = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const processoId = req.params.id;
    const processoData = req.body;

    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      return res.status(404).json({ message: 'Processo não encontrado.' });
    }

    await processo.update(processoData);

    res.status(200).json(processo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar processo.' });
  }
};

exports.getProcessos = async (req, res) => {
  try {
    const processos = await Processo.findAll();
    res.status(200).json(processos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar processos.' });
  }
};

exports.getProcesso = async (req, res) => {
  try {
    const processoId = req.params.id;
    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      return res.status(404).json({ message: 'Processo não encontrado.' });
    }

    res.status(200).json(processo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar processo.' });
  }
};

exports.deleteProcesso = async (req, res) => {
  try {
    const processoId = req.params.id;
    const processo = await Processo.findByPk(processoId);

    if (!processo) {
      return res.status(404).json({ message: 'Processo não encontrado.' });
    }

    await processo.destroy();
    res.status(204).json({ message: 'Processo excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir processo.' });
  }
};