const prisma = require('../../prisma/prismaClient');

// Função responsável por criar um novo histórico
const createHistory = async (req, res) => {
  const { prescriptionId, currentDate, status } = req.body;
  try {
    const newHistory = await prisma.history.create({
      data: {
        prescriptionId,
        currentDate: new Date(currentDate),
        status,
      },
    });
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar histórico.', details: error.message });
  }
};

// Função para obter todos os históricos
const findHistories = async (req, res) => {
  try {
    const histories = await prisma.history.findMany({
      where: { 
        AND: [
          { idUser: parseInt(id) },
          { status: true } 
        ]
      }});

    if (!histories || !histories.status) {
      return res.status(404).json({ error: 'Históricos não encontrados ou estão inativos.' });
    }
    res.status(200).json(histories);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar históricos.', details: error.message });
  }
};

//Função para obter todo o histórico daquele usuário
const findHistoriesByUser = async (req, res) => {
  const { id } = req.params; // id do usuário
  try {
    const histories = await prisma.history.findMany({
      where: {
        prescription: {
          userId: parseInt(id), // Filtrando pelo userId da relação Prescription
        }
      },
      include: {
        prescription: {
          include: {
            medication: true, 
          }
        }
      }
    });

    if (!histories || histories.length === 0) {
      return res.status(404).json({ error: 'Nenhum histórico encontrado para este usuário.' });
    }

    res.status(200).json(histories);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar históricos.', details: error.message });
  }
};


// Função para obter um histórico por ID
const findHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const history = await prisma.history.findUnique({ where: { id: parseInt(id) } });
    if (!history) {
      return res.status(404).json({ error: 'Histórico não encontrado.' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar histórico.', details: error.message });
  }
};

// Função para atualizar um histórico
const updateHistory = async (req, res) => {
  const { id } = req.params;
  const { currentDate, status } = req.body;
  try {
    const updatedHistory = await prisma.history.update({
      where: { id: parseInt(id) },
      data: { currentDate: new Date(currentDate), status },
    });
    res.status(200).json(updatedHistory);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar histórico.', details: error.message });
  }
};

// Função para deletar um histórico
const deleteHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHistory = await prisma.history.delete({ where: { id: parseInt(id) } });
    res.status(200).json(deletedHistory);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir histórico.', details: error.message });
  }
};

module.exports = {
  createHistory,
  findHistories,
  findHistoriesByUser,
  findHistoryById,
  updateHistory,
  deleteHistory,
};
