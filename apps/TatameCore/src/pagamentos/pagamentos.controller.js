import cobrancasService from "../cobrancas/cobrancas.service.js";
import pagamentosService from "./pagamentos.service.js";

async function create(req, res) {
  const { cobrancaId, metodoDePagamento, valorPago } = req.body;
  if (!cobrancaId || !metodoDePagamento || !valorPago ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  const cobranca = await cobrancasService.getById(cobrancaId);
  if(!cobranca || cobranca.length == 0){
    return res
      .status(400)
      .json({ message: "Cobrança inválida!" });
  }

  if(cobranca[0].estado != 'Pendente'){
    return res
    .status(400)
    .json({ message: "Cobrança paga ou anulada!" });
  }

  const { insertId } = await pagamentosService.create(cobrancaId, metodoDePagamento, valorPago);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await pagamentosService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { pagamentoId } = req.params;

  if (!pagamentoId || Number.isNaN(pagamentoId)) {
    return res.status(400).json({ message: "id do pagamento inexistente!" });
  }

  const result = await pagamentosService.getById(pagamentoId);

  if (result.length == 0) {
    return res.status(404).json({ message: "pagamento não encontrado!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { pagamentoId } = req.params;
  const { cobrancaId, metodoDePagamento, valorPago, dataPagamento } = req.body;

  if (!pagamentoId || Number.isNaN(pagamentoId) || !cobrancaId || Number.isNaN(cobrancaId) || !metodoDePagamento || !valorPago || !dataPagamento ) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const pagamento = await pagamentosService.getById(pagamentoId);
  if (pagamento.length == 0) {
    return res.status(404).json({ message: "pagamento não encontrado!" });
  }

  const cobranca = await cobrancasService.getById(cobrancaId);
  if(!cobranca || cobranca.length == 0){
    return res
      .status(400)
      .json({ message: "Cobrança inválida!" });
  }

  if(cobranca[0].estado != 'Pendente'){
    return res
    .status(400)
    .json({ message: "Cobrança paga ou anulada!" });
  }

  const result = await pagamentosService.update(cobrancaId, metodoDePagamento, valorPago, pagamentoId);

  res.status(204).json();
}

async function deletePagamento(req, res) {
    const { pagamentoId } = req.params;
  
    if (!pagamentoId || Number.isNaN(pagamentoId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const pagamento = await pagamentosService.getById(pagamentoId);

    if (pagamento.length == 0) {
      return res.status(404).json({ message: "pagamento não encontrado!" });
    }
  
    const result = await pagamentosService.deletePagamento(pagamentoId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deletePagamento
};