CREATE TABLE IF NOT EXISTS modalidades (
    modalidade_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_modalidade VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS planos_de_mensalidades (
    plano_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_plano VARCHAR(100) NOT NULL,
    valor_mensalidade DECIMAL(10,2) NOT NULL,
    duracao_meses INT NOT NULL CHECK (duracao_meses > 0)
);

CREATE TABLE IF NOT EXISTS utilizadores (
    utilizador_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('Root', 'Admin', 'Professor', 'Aluno') NOT NULL
);

CREATE TABLE IF NOT EXISTS alunos (
    aluno_id INT AUTO_INCREMENT PRIMARY KEY,
    utilizador_id INT NULL UNIQUE,
    modalidade_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    numero_bi VARCHAR(13) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_pai VARCHAR(255) NOT NULL,
    nome_mae VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    genero VARCHAR(13) NOT NULL,
    telefone VARCHAR(9) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bolseiro BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES utilizadores(id_usuario) ON DELETE SET NULL,
    FOREIGN KEY (modalidade_id) REFERENCES modalidades(modalidade_id) ON DELETE CASCADE
);

CREATE TABLE professores (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    utilizador_id INT NULL UNIQUE,
    especialidade VARCHAR(255) NOT NULL,
    FOREIGN KEY (utilizador_id) REFERENCES utilizadores(utilizador_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS modalidades_professores (
    professor_id INT NOT NULL,
    modalidade_id INT NOT NULL,
    PRIMARY KEY (professor_id, modalidade_id),
    FOREIGN KEY (professor_id) REFERENCES professores(professor_id) ON DELETE CASCADE,
    FOREIGN KEY (modalidade_id) REFERENCES modalidades(modalidade_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS matriculas (
    matricula_id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    plano_id INT NOT NULL,
    data_inicio DATE NOT NULL,
    estado ENUM('Ativa', 'Cancelada', 'Finalizada') NOT NULL DEFAULT 'Ativa',
    FOREIGN KEY (aluno_id) REFERENCES alunos(aluno_id) ON DELETE CASCADE,
    FOREIGN KEY (plano_id) REFERENCES planos_de_mensalidades(plano_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cobrancas (
    cobranca_id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    estado ENUM('Pendente', 'Pago', 'Vencido') NOT NULL DEFAULT 'Pendente',
    FOREIGN KEY (matricula_id) REFERENCES matriculas(matricula_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pagamentos (
    pagamento_id INT AUTO_INCREMENT PRIMARY KEY,
    cobranca_id INT NOT NULL UNIQUE,
    metodo_pagamento ENUM('Dinheiro', 'Cartão', 'Express', 'Transferência') NOT NULL,
    valor_pago DECIMAL(10,2) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cobranca_id) REFERENCES cobrancas(cobranca_id) ON DELETE CASCADE
);