/* Lógico_1: */

CREATE TABLE Proprietario (
    Nome_Completo VARCHAR,
    DDN DATE,
    Telefone VARCHAR,
    email VARCHAR,
    CPF INTEGER PRIMARY KEY
);

CREATE TABLE Imovel (
    ID INTEGER PRIMARY KEY,
    CEP INTEGER,
    Numero INTEGER,
    Complemento VARCHAR,
    Quartos INTEGER,
    Banheiros INTEGER,
    Vaga_garagem BOOLEAN,
    Aceita_animais BOOLEAN,
    Diaria_minima FLOAT,
    Diaria_adicional FLOAT,
    Maximo_pessoas INTEGER,
    Descricao VARCHAR,
    Disponivel BOOLEAN
);

CREATE TABLE Locatario (
    email VARCHAR,
    Nome_Completo VARCHAR,
    Telefone VARCHAR,
    CPF INTEGER PRIMARY KEY,
    DDN DATE
);

CREATE TABLE Pertence_a (
    fk_Proprietario_CPF INTEGER,
    fk_Imovel_ID INTEGER
);

CREATE TABLE Aluga (
    fk_Locatario_CPF INTEGER,
    fk_Imovel_ID INTEGER,
    Locatario INTEGER,
    ID_Locacao INTEGER PRIMARY KEY UNIQUE,
    Inicio_Previsto DATE,
    Final_Previsto DATE,
    CheckIn DATE,
    CheckOut DATE,
    N_Pessoas INTEGER,
    Valor_a_ser_pago FLOAT,
    Avaliacao VARCHAR
);

CREATE TABLE Observacoes (
    OBSID INTEGER PRIMARY KEY,
    Locatario INTEGER,
    OBSDATA DATE,
    OBSTexto VARCHAR
);
 
ALTER TABLE Pertence_a ADD CONSTRAINT FK_Pertence_a_1
    FOREIGN KEY (fk_Proprietario_CPF)
    REFERENCES Proprietario (CPF)
    ON DELETE RESTRICT;
 
ALTER TABLE Pertence_a ADD CONSTRAINT FK_Pertence_a_2
    FOREIGN KEY (fk_Imovel_ID)
    REFERENCES Imovel (ID)
    ON DELETE RESTRICT;
 
ALTER TABLE Aluga ADD CONSTRAINT FK_Aluga_2
    FOREIGN KEY (fk_Locatario_CPF)
    REFERENCES Locatario (CPF)
    ON DELETE SET NULL;
 
ALTER TABLE Aluga ADD CONSTRAINT FK_Aluga_3
    FOREIGN KEY (fk_Imovel_ID)
    REFERENCES Imovel (ID)
    ON DELETE SET NULL;
 
ALTER TABLE Aluga ADD CONSTRAINT FK_Aluga_4
    FOREIGN KEY (Locatario???)
    REFERENCES ??? (???);
 
ALTER TABLE Observacoes ADD CONSTRAINT FK_Observacoes_2
    FOREIGN KEY (Locatario)
    REFERENCES Aluga (ID_Locacao);