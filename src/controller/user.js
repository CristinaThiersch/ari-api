const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');
const jwtConfig = require('../../configs/jwtConfig');


// Função responsável por criar um novo usuário
const createUser = async (req, res) => {
  const { name, email, password, birthDate } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        birthDate: new Date(birthDate),
        status: true,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.', details: error.message });
  }
};

// Função para obter todos os usuários
const findUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { status: true }, // Filtrando apenas usuários ativos
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuários.', details: error.message });
  }
};

// Função para obter um usuário por ID
const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user || !user.status) {
      return res.status(404).json({ error: 'Usuário não encontrado ou está inativo.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuário.', details: error.message });
  }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, birthDate } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { 
        AND: [
          { id: parseInt(id) },
          { status: true } // Verifica se o status é true
        ]
      },
      data: { 
        name, 
        email, 
        password, 
        birthDate: new Date(birthDate), 
        updatedAt: new Date() // Corrigido para pegar a data atual
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário.', details: error.message });
  }
};

// Função para deletar (desativar) um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.update({
      where: { 
        AND: [
          { id: parseInt(id) },
          { status: true } // Verifica se o status é true
        ]
      },
      data: { status: false }, // Desativa o usuário
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir usuário.', details: error.message });
  }
};



module.exports = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
