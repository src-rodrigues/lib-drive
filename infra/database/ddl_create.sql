USE vartechs15;

CREATE TABLE IF NOT EXISTS `disciplina` (
  id INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  nome VARCHAR(90) NOT NULL,
  `ativo` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  UNIQUE INDEX nome_UNIQUE (nome ASC) VISIBLE,
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS livro (
  id INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(90) NOT NULL,
  edicao VARCHAR(20) NOT NULL,
  ISBN VARCHAR(14) NOT NULL,
  descricao_fisica VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX ISBN_UNIQUE (ISBN ASC) VISIBLE
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS autor (
  id INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  nome_completo VARCHAR(90) NOT NULL,
  nome_abnt VARCHAR(90) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS disciplina_livro (
  disciplina_id INT UNSIGNED ZEROFILL NOT NULL,
  livro_id INT UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (disciplina_id, livro_id),
  INDEX fk_disciplina_has_livro_livro1_idx (livro_id ASC) VISIBLE,
  INDEX fk_disciplina_has_livro_disciplina_idx (disciplina_id ASC) VISIBLE,
  CONSTRAINT fk_disciplina_has_livro_disciplina
    FOREIGN KEY (disciplina_id)
    REFERENCES disciplina (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_disciplina_has_livro_livro1
    FOREIGN KEY (livro_id)
    REFERENCES livro (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `vartechs15`.`livro_autor` (
  `livro_id` INT UNSIGNED ZEROFILL NOT NULL,
  `autor_id` INT UNSIGNED ZEROFILL NOT NULL,
  `autor_primario` TINYINT UNSIGNED NULL,
  PRIMARY KEY (`livro_id`, `autor_id`),
  INDEX `fk_livro_has_autor_autor1_idx` (`autor_id` ASC) VISIBLE,
  INDEX `fk_livro_has_autor_livro1_idx` (`livro_id` ASC) VISIBLE,
  CONSTRAINT `fk_livro_has_autor_livro1`
    FOREIGN KEY (`livro_id`)
    REFERENCES `vartechs15`.`livro` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_livro_has_autor_autor1`
    FOREIGN KEY (`autor_id`)
    REFERENCES `vartechs15`.`autor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;