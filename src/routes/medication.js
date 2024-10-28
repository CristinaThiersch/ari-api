const express = require('express');
const router = express.Router();
const {
  createMedication,
  findMedications,
  findMedicationsByUser,
  findMedicationById,
  updateMedication,
  deleteMedication,
} = require('../controller/medication'); // Importa todas as funções do controller de medicamentos
const {
  autenticarToken
} = require('../controller/login');


/**
 * @swagger
 * /medication:
 *   post:
 *     summary: Cria um novo medicamento
 *     description: Adiciona um novo registro de medicamento ao sistema com base nas informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do medicamento
 *               dosage:
 *                 type: string
 *                 description: Dosagem do medicamento
 *               description:
 *                 type: string
 *                 description: Descrição do medicamento
 *               sideEffects:
 *                 type: string
 *                 description: Efeitos colaterais do medicamento
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso.
 *       400:
 *         description: Falha ao criar o medicamento.
 */

router.post('/medication', autenticarToken, createMedication)

/**
 * @swagger
 * /medications:
 *   get:
 *     summary: Lista todos os medicamentos
 *     description: Obtém uma lista de todos os registros de medicamentos no sistema.
 *     responses:
 *       200:
 *         description: Lista de medicamentos.
 *       400:
 *         description: Falha ao buscar medicamentos.
 */
router.get('/medications', autenticarToken, findMedications);

/**
 * @swagger
 * /medications-user/{id}:
 *   get:
 *     summary: Lista todos os medicamentos do usuário logado
 *     description: Obtém uma lista de todos os registros de medicamento no sistema daquele usuário.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de medicamentos.
 *       400:
 *         description: Falha ao buscar medicamentos.
 */
router.get('/medications-user/:id', autenticarToken, findMedicationsByUser);

/**
 * @swagger
 * /medication/{id}:
 *   get:
 *     summary: Obtém um medicamento por ID
 *     description: Retorna os detalhes de um medicamento com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser obtido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do medicamento.
 *       404:
 *         description: Medicamento não encontrado.
 *       400:
 *         description: Falha ao buscar medicamento.
 */
router.get('/medication/:id', autenticarToken, findMedicationById);

/**
 * @swagger
 * /medication/{id}:
 *   put:
 *     summary: Atualiza um medicamento
 *     description: Atualiza as informações de um medicamento existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do medicamento
 *               dosage:
 *                 type: string
 *                 description: Dosagem do medicamento
 *               description:
 *                 type: string
 *                 description: Descrição do medicamento
 *               sideEffects:
 *                 type: string
 *                 description: Efeitos colaterais do medicamento
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso.
 *       400:
 *         description: Falha ao atualizar medicamento.
 */
router.put('/medication/:id', autenticarToken, updateMedication);

/**
 * @swagger
 * /medication/{id}:
 *   delete:
 *     summary: Desativa um medicamento
 *     description: Remove um medicamento existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do medicamento a ser desativado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medicamento deletado com sucesso.
 *       404:
 *         description: Medicamento não encontrado.
 *       400:
 *         description: Falha ao deletar medicamento.
 */
router.delete('/medication/:id', autenticarToken, deleteMedication);

module.exports = router;
