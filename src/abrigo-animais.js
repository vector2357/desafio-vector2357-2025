/*
  Autor: Victor Hugo Resende Marinho
  Data: 08/09/2025

  Obs.: Foram adicionados comentários ao longo do código para melhor legibilidade.
*/

class AbrigoAnimais {

  constructor() {
    this.animais = new Map();
    this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];

    // Adiciona os animais do desafio ao abrigo //
    this.adicionarAnimal('Rex', 'cao', ['RATO', 'BOLA']);
    this.adicionarAnimal('Mimi', 'gato', ['BOLA', 'LASER']);
    this.adicionarAnimal('Fofo', 'gato', ['BOLA', 'RATO', 'LASER']);
    this.adicionarAnimal('Zero', 'gato', ['RATO', 'BOLA']);
    this.adicionarAnimal('Bola', 'cao', ['CAIXA', 'NOVELO']);
    this.adicionarAnimal('Bebe', 'cao', ['LASER', 'RATO', 'BOLA']);
    this.adicionarAnimal('Loco', 'jabuti', ['SKATE', 'RATO']);
  }

  adicionarAnimal(nome, especie, brinquedos) {
    this.animais.set(nome, { especie, brinquedos });
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    // Separa as strings em listas de strgings //
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');
    const listaOrdemAnimais = ordemAnimais.split(',');

    // Declara conjuntos para validação de brinquedos e animais duplicados //
    const conjunto1 = new Set(listaBrinquedosPessoa1);
    const conjunto2 = new Set(listaBrinquedosPessoa2);
    const conjuntoAnimais = new Set(listaOrdemAnimais);

    if (conjuntoAnimais.size !== listaOrdemAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    if (conjunto1.size !== listaBrinquedosPessoa1.length || 
        conjunto2.size !== listaBrinquedosPessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    for (let brinquedo of listaBrinquedosPessoa1) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }
    for (let brinquedo of listaBrinquedosPessoa2) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }
    
    let lista = [];
    let brinquedosUsadosPessoa1 = [];
    let brinquedosUsadosPessoa2 = [];
    let qtdPessoa1 = 0;
    let qtdPessoa2 = 0;
    // Variável de controle para verificar presença do Loco //
    let possuiLoco = false;
    let locoResposta = '';

    for (let nomeAnimal of listaOrdemAnimais) {
      // Verifica se o animal existe no abrigo //
      if (!this.animais.has(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }

      let resposta = nomeAnimal + ' - abrigo';
      const animal = this.animais.get(nomeAnimal);
      let i = 0, j = 0;

      if (nomeAnimal === 'Loco') {
        // Tratamento especial do jabuti Loco //
        possuiLoco = true;
        if (listaBrinquedosPessoa1.includes('SKATE') && listaBrinquedosPessoa1.includes('RATO')) {
          i = 2;
        }
        if (listaBrinquedosPessoa2.includes('SKATE') && listaBrinquedosPessoa2.includes('RATO')) {
          j = 2;
        }
      }
      else {
        // Verifica se a pessoa possui todos os brinquedos do animal //
        for (let brinquedo of listaBrinquedosPessoa1) {
          if (brinquedo === animal.brinquedos[i]) {
            i++;
          }
        }
        for (let brinquedo of listaBrinquedosPessoa2) {
          if (brinquedo === animal.brinquedos[j]) {
            j++;
          }
        }
      }

      if (i === animal.brinquedos.length) {
        if (j !== animal.brinquedos.length && qtdPessoa1 < 3) {

          // Validação especial para gatos //
          if (animal.especie === 'gato') {
            let validacao = true;

            for (let brinquedo of animal.brinquedos) {
              if (brinquedosUsadosPessoa1.includes(brinquedo)) {
                validacao = false;
                break;
              } 
            }
            if (validacao) {
              brinquedosUsadosPessoa1.push(...animal.brinquedos);
              resposta = nomeAnimal + ' - pessoa 1';
              qtdPessoa1++;
            }
          }
          else {
            brinquedosUsadosPessoa1.push(...animal.brinquedos);
            resposta = nomeAnimal + ' - pessoa 1';
            qtdPessoa1++;
          }
        }
      } else if (j === animal.brinquedos.length && qtdPessoa2 < 3) {

        // Validação especial para gatos //
        if (animal.especie === 'gato') {
          let validacao = true;

          for (let brinquedo of animal.brinquedos) {
            if (brinquedosUsadosPessoa2.includes(brinquedo)) {
              validacao = false;
              break;
            } 
          }
          if (validacao) {
            brinquedosUsadosPessoa2.push(...animal.brinquedos);
            resposta = nomeAnimal + ' - pessoa 2';
            qtdPessoa2++;
          }
        }
        else {
          brinquedosUsadosPessoa2.push(...animal.brinquedos);
          resposta = nomeAnimal + ' - pessoa 2';
          qtdPessoa2++;
        }
      }

      if (nomeAnimal !== 'Loco') lista.push(resposta);
      else locoResposta = resposta;
    }

    // Verifica se Loco possui ou não companhia //
    if (possuiLoco) {
      if (locoResposta.includes('pessoa 1') && qtdPessoa1 === 1) {
        locoResposta = 'Loco - abrigo';
      }
      if (locoResposta.includes('pessoa 2') && qtdPessoa2 === 1) {
        locoResposta = 'Loco - abrigo';
      }

      lista.push(locoResposta);
    }

    // Ordena a lista em ordem alfabética //
    lista.sort();

    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
