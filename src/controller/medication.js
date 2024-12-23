const prisma = require('../../prisma/prismaClient');

// Função responsável por criar um novo medicamento
const createMedication = async (req, res) => {
  const { name, functionMed, dosage } = req.body;
  
  try {
    const medication = await prisma.medication.findFirst({ 
      where: { 
        name, 
        dosage 
      } 
    });

    if (medication) {
      return res.status(400).json({ error: 'Medicamento já existe.' });
    }

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
            status: true, // Adicionando a condição para status true
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
    if (!medication) {
      return res.status(404).json({ error: 'Medicamento não encontrado' });
    }
    res.status(200).json(medication);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar medicamento.', details: error.message });
  }
};

const updateMedication = async (req, res) => {
  const { id } = req.params;
  const { name, functionMed, dosage } = req.body;

  try {
    // Verifica se o medicamento existe e está com status true
    const medication = await prisma.medication.findUnique({
      where: { id: parseInt(id) },
    });

    if (!medication || medication.status !== true) {
      return res.status(400).json({
        error: 'Medicação não encontrada ou não está ativa.',
      });
    }

    // Se encontrado, atualiza o medicamento
    const updatedMedication = await prisma.medication.update({
      where: { id: parseInt(id) }, // Usando o ID diretamente
      data: { 
        name, 
        functionMed, 
        dosage,
      },
    });

    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(400).json({
      error: 'Erro ao atualizar medicamento.',
      details: error.message,
    });
  }
};


// Função para deletar (desativar) um medicamento
const deleteMedication = async (req, res) => {
  const { id } = req.params;
  try {
    const medication = await prisma.medication.findFirst({
      where: {
        id: parseInt(id),
        status: true, // Verifica se o status é true
      },
    });

    if (!medication) {
      return res.status(404).json({ error: 'Medicamento não encontrado ou já desativado.' });
    }

    const deletedMedication = await prisma.medication.update({
      where: { id: medication.id },
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
