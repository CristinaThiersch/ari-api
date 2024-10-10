const express = require('express');
const router = express.Router();
const {
  createPrescription,
  findPrescriptions,
  findPrescriptionById,
  updatePrescription,
  deletePrescription,
} = require('../controller/prescription'); // Importa todas as funções do controller
const {
  autenticarToken
} = require('../controller/login');

/**
 * @swagger
 * /prescription:
 *   post:
 *     summary: Cria uma nova prescrição
 *     description: Adiciona um novo registro de prescrição ao sistema com base nas informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: ID do paciente associado à prescrição
 *               medicationId:
 *                 type: integer
 *                 description: ID do medicamento prescrito
 *               dosage:
 *                 type: string
 *                 description: Dosagem prescrita
 *               instructions:
 *                 type: string
 *                 description: Instruções de uso da prescrição
 *     responses:
 *       201:
 *         description: Prescrição criada com sucesso.
 *       400:
 *         description: Falha ao criar a prescrição.
 */
router.post('/prescription', autenticarToken, createPrescription)

/**
 * @swagger
 * /prescriptions:
 *   get:
 *     summary: Lista todas as prescrições
 *     description: Obtém uma lista de todos os registros de prescrições no sistema.
 *     responses:
 *       200:
 *         description: Lista de prescrições.
 *       400:
 *         description: Falha ao buscar prescrições.
 */
router.get('/prescriptions', autenticarToken, findPrescriptions);

/**
 * @swagger
 * /prescription/{id}:
 *   get:
 *     summary: Obtém uma prescrição por ID
 *     description: Retorna os detalhes de uma prescrição com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser obtida.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da prescrição.
 *       404:
 *         description: Prescrição não encontrada.
 *       400:
 *         description: Falha ao buscar prescrição.
 */
router.get('/prescription/:id', autenticarToken, findPrescriptionById);

/**
 * @swagger
 * /prescription/{id}:
 *   put:
 *     summary: Atualiza uma prescrição
 *     description: Atualiza as informações de uma prescrição existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: ID do paciente associado à prescrição
 *               medicationId:
 *                 type: integer
 *                 description: ID do medicamento prescrito
 *               dosage:
 *                 type: string
 *                 description: Dosagem prescrita
 *               instructions:
 *                 type: string
 *                 description: Instruções de uso da prescrição
 *     responses:
 *       200:
 *         description: Prescrição atualizada com sucesso.
 *       400:
 *         description: Falha ao atualizar prescrição.
 */
router.put('/prescription/:id', autenticarToken, updatePrescription);

/**
 * @swagger
 * /prescription/{id}:
 *   delete:
 *     summary: Desativa uma prescrição
 *     description: Remove uma prescrição existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da prescrição a ser desativada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prescrição deletada com sucesso.
 *       404:
 *         description: Prescrição não encontrada.
 *       400:
 *         description: Falha ao deletar prescrição.
 */
router.delete('/prescription/:id', autenticarToken, deletePrescription);

module.exports = router;