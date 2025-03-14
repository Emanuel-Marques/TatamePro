import { expect } from 'chai';
import { restore } from 'sinon';
import mapStatusHTTP from '../../src/utils/mapHTTPStatus.js';
describe('Realizando teste de unindade', function () {
  describe('Testando funcao de mapeamento de estado HTTP', function () {
    it('SUCESSO', function () {
      const input = 'SUCCESSFUL';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(200);
    });
    it('CRIADO', function () {
      const input = 'CREATED';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(201);
    });
    it('Não encontrado', function () {
      const input = 'NOT_FOUND';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(404);
    });
    it('Conflito', function () {
      const input = 'CONFLICT';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(409);
    });
    it('Valor inválido', function () {
      const input = 'INVALID_VALUE';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(422);
    });
    it('Má requisição', function () {
      const input = 'BAD_REQUEST';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(400);
    });
    it('Sem conteudo', function () {
      const input = 'NO_CONTENT';
      const result = mapStatusHTTP(input);
      expect(result).to.be.equal(204);
    });
  });

  afterEach(function () {
    restore();
  });
});