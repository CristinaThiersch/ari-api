const express = require('express');
const router = express.Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require('../controller/user'); // Importa todas as funções do controller
const {
  autenticarToken,
  isAdmin
} = require('../controller/login');

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema com base nas informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do novo usuário
 *               email:
 *                 type: string
 *                 description: E-mail do novo usuário
 *               password:
 *                 type: string
 *                 description: Senha do novo usuário
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do novo usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Falha ao criar o usuário.
 */

router.post('/user', createUser)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Obtém uma lista de todos os usuários ativos no sistema.
 *     responses:
 *       200:
 *         description: Lista de usuários ativos.
 *       400:
 *         description: Falha ao buscar usuários.
 */
router.get('/users', autenticarToken, isAdmin, findUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     description: Retorna os detalhes de um usuário com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser obtido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *       404:
 *         description: Usuário não encontrado ou está inativo.
 *       400:
 *         description: Falha ao buscar usuário.
 */
router.get('/user/:id', autenticarToken, findUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza as informações de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
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
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Falha ao atualizar usuário.
 */
router.put('/user/:id', autenticarToken, updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Desativa um usuário
 *     description: Desativa um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser desativado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       400:
 *         description: Falha ao desativar usuário.
 */
router.delete('/user/:id', autenticarToken, deleteUser);

module.exports = router;
