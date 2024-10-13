const express = require('express');
const router = express.Router();
const {
  createHistory,
  findHistories,
  findHistoriesByUser,
  findHistoryById,
  updateHistory,
  deleteHistory,
} = require('../controller/history'); // Importa todas as funções do controller
const {
  autenticarToken,
  isAdmin,
} = require('../controller/login');


/**
 * @swagger
 * /history:
 *   post:
 *     summary: Cria um novo histórico
 *     description: Adiciona um novo registro de histórico ao sistema com base nas informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do histórico
 *               description:
 *                 type: string
 *                 description: Descrição do histórico
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data do histórico
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso.
 *       400:
 *         description: Falha ao criar o histórico.
 */
router.post('history', autenticarToken, createHistory);

/**
 * @swagger
 * /histories:
 *   get:
 *     summary: Lista todos os históricos
 *     description: Obtém uma lista de todos os registros de histórico no sistema.
 *     responses:
 *       200:
 *         description: Lista de históricos.
 *       400:
 *         description: Falha ao buscar históricos.
 */
router.get('/histories', autenticarToken, isAdmin, findHistories);

/**
 * @swagger
 * /histories:
 *   get:
 *     summary: Lista todos os históricos do usuário logado
 *     description: Obtém uma lista de todos os registros de histórico no sistema daquele usuário.
 *     responses:
 *       200:
 *         description: Lista de históricos.
 *       400:
 *         description: Falha ao buscar históricos.
 */
router.get('/histories-user/:id', autenticarToken, findHistoriesByUser);

/**
 * @swagger
 * /history/{id}:
 *   get:
 *     summary: Obtém um histórico por ID
 *     description: Retorna os detalhes de um histórico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do histórico a ser obtido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do histórico.
 *       404:
 *         description: Histórico não encontrado.
 *       400:
 *         description: Falha ao buscar histórico.
 */
router.get('/history/:id', autenticarToken, findHistoryById);

/**
 * @swagger
 * /history/{id}:
 *   put:
 *     summary: Atualiza um histórico
 *     description: Atualiza as informações de um histórico existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do histórico a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do histórico
 *               description:
 *                 type: string
 *                 description: Descrição do histórico
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data do histórico
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso.
 *       400:
 *         description: Falha ao atualizar histórico.
 */
router.put('/history/:id', autenticarToken, updateHistory);

/**
 * @swagger
 * /history/{id}:
 *   delete:
 *     summary: Desativa um histórico
 *     description: Remove um histórico existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do histórico a ser desativada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico deletado com sucesso.
 *       404:
 *         description: Histórico não encontrado.
 *       400:
 *         description: Falha ao deletar histórico.
 */
router.delete('/history/:id', autenticarToken, deleteHistory);

module.exports = router;
