const prisma = require('../../prisma/prismaClient');

// Função responsável por criar um novo medicamento
const createMedication = async (req, res) => {
  const { name, functionMed, dosage } = req.body;
  try {
    const newMedication = await prisma.medication.create({
      data: {
        name,
        functionMed,
        dosage,
        status: true,
      },
    });
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar medicamento.', details: error.message });
  }
};

// Função para obter todos os medicamentos
const findMedications = async (req, res) => {
  try {
    const medications = await prisma.medication.findMany({
      where: { status: true }, // Filtrando apenas medicamentos ativos
    });
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar medicamentos.', details: error.message });
  }
};

const findMedicationsByUser = async (req, res) => {
  const { id } = req.params; // id do usuário
  try {
    const medications = await prisma.medication.findMany({
      where: {
        prescriptions: {
          some: {
            userId: parseInt(id), // Certifique-se de que `id` seja um número
          },
        },
      },
      include: {
        prescriptions: {
          include: {
            medication: true,
          },
        },
      },
    });
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar medicamentos.', details: error.message });
  }
};


// Função para obter um medicamento por ID
const findMedicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const medication = await prisma.medication.findUnique({ where: { id: parseInt(id) } });
    if (!medication || !medication.status) {
      return res.status(404).json({ error: 'Medicamento não encontrado ou está inativo.' });
    }
    res.status(200).json(medication);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar medicamento.', details: error.message });
  }
};

// Função para atualizar um medicamento
const updateMedication = async (req, res) => {
  const { id } = req.params;
  const { name, functionMed, dosage } = req.body;
  try {
    const updatedMedication = await prisma.medication.update({
      where: { 
        AND: [
          { id: parseInt(id) },
          { status: true } // Verifica se o status é true
        ]
      },
      data: { 
        name, 
        functionMed, 
        dosage,
        updatedAt: new Date() // Corrigido para pegar a data atual
      },
    });
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar medicamento.', details: error.message });
  }
};

// Função para deletar (desativar) um medicamento
const deleteMedication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMedication = await prisma.medication.update({
      where: { 
        AND: [
          { id: parseInt(id) },
          { status: true } // Verifica se o status é true
        ]
      },
      data: { status: false }, // Desativa o medicamento
    });
    res.status(200).json(deletedMedication);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir medicamento.', details: error.message });
  }
};

module.exports = {
  createMedication,
  findMedications,
  findMedicationsByUser,
  findMedicationById,
  updateMedication,
  deleteMedication,
};
