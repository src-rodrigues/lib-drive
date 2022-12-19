CREATE TABLE IF NOT EXISTS `vartechs15`.`livro` (
  `id` INT UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `autor_primario_id` INT UNSIGNED ZEROFILL NOT NULL,
  `titulo` VARCHAR(90) NOT NULL,
  `edicao` VARCHAR(20) NOT NULL,
  `ISBN` VARCHAR(14) NOT NULL,
  `descricao_fisica` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `autor_primario_id`),
  UNIQUE INDEX `ISBN_UNIQUE` (`ISBN` ASC) VISIBLE,
  INDEX `fk_livro_autor1_idx` (`autor_primario_id` ASC) VISIBLE,
  UNIQUE INDEX `edicao_UNIQUE` (`edicao` ASC) VISIBLE,
  CONSTRAINT `fk_livro_autor1`
    FOREIGN KEY (`autor_primario_id`)
    REFERENCES `vartechs15`.`autor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- generate SQL alter table to add UNIQUE INDEX at column 'edicao' in table 'livro'
ALTER TABLE `vartechs15`.`livro` ADD UNIQUE INDEX `edicao_UNIQUE` (`edicao` ASC) VISIBLE;

-- generate SQL alter table to remove UNIQUE INDEX at column 'edicao' in table 'livro'
ALTER TABLE `vartechs15`.`livro` DROP INDEX `edicao_UNIQUE`;