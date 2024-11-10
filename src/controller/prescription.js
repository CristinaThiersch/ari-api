const prisma = require('../../prisma/prismaClient');
const {
  createHistory,
} = require('../controller/history'); 

// Função responsável por criar uma nova prescrição
const createPrescription = async (req, res) => {
  const { userId, medicationId, observation, frequency, startDate, endDate } = req.body;
  try {
    const prescription = await prisma.prescription.findFirst(
      {
        where: {
          userId,
          medicationId,
          frequency,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status: true
        }
      }
    );

    if (prescription){
      return res.status(400).json({error: "Prescrição já cadastrada. "});
    }

    const newPrescription = await prisma.prescription.create({
      data: {
        userId,
        medicationId,
        observation,
        frequency,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: true,
      },
    });

    await createHistory({
      prescriptionId: newPrescription.id,
    });

    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar prescrição.', details: error.message });
  }
};


// Função para obter todas as prescrições
const findPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { status: true }, // Filtrando apenas prescrições ativas
    });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar prescrições.', details: error.message });
  }
};

// Função para obter todas as prescrições do usuário
const findPrescriptionsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: {
        AND: [
          { userId: parseInt(id) }, // Ajustado para userId
          { status: true },
        ]
      }
    });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar prescrições.', details: error.message });
  }
};

  

// Função para obter uma prescrição por ID
const findPrescriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prisma.prescription.findUnique({ where: { id: parseInt(id) } });
    if (!prescription || !prescription.status) {
      return res.status(404).json({ error: 'Prescrição não encontrada ou está inativa.' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar prescrição.', details: error.message });
  }
};

const findPrescription = async(req, res)=> {
  const { id } = req.params;
  try {
    const prescription = await prisma.prescription.findUnique({ where: { id: parseInt(id) } });
    if (!prescription) {
      return res.status(404).json({ error: 'Prescrição não encontrada' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar prescrição.', details: error.message });
  }
}

const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { userId, medicationId, observation, frequency, startDate, endDate } = req.body;
  
  try {
    const updatedPrescription = await prisma.prescription.update({
      where: { 
        id: parseInt(id), // Use apenas o id aqui
      },
      data: { 
        user: { connect: { id: parseInt(userId) } }, // Conectar o usuário pelo ID
        medication: { connect: { id: parseInt(medicationId) } }, // Conectar o medicamento pelo ID
        observation,
        frequency,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        // Removido o updatedAt aqui
      },
    });
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar prescrição.', details: error.message });
  }
};



// Função para deletar (desativar) uma prescrição
const deletePrescription = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPrescription = await prisma.prescription.update({
      where: {
        id: parseInt(id), // Use apenas o id aqui
      },
      data: {
        status: false // Desativa a prescrição
      }
    });
    await createHistory({
      prescriptionId: deletedPrescription.id,
    });
    res.status(200).json(deletedPrescription);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir prescrição.', details: error.message });
  }
};

module.exports = {
  createPrescription,
  findPrescriptions,
  findPrescriptionsByUser,
  findPrescriptionById,
  findPrescription,
  updatePrescription,
  deletePrescription,
};
