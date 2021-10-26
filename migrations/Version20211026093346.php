<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211026093346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        //$this->addSql('ALTER TABLE customer ADD address1 VARCHAR(255) DEFAULT NULL, ADD address2 VARCHAR(255) DEFAULT NULL, ADD postcode INT DEFAULT NULL, ADD city VARCHAR(255) DEFAULT NULL, ADD country VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD address1 VARCHAR(255) DEFAULT NULL, ADD address2 VARCHAR(255) DEFAULT NULL, ADD postcode INT DEFAULT NULL, ADD city VARCHAR(255) DEFAULT NULL, ADD country VARCHAR(255) DEFAULT NULL, ADD website VARCHAR(255) DEFAULT NULL, ADD siret VARCHAR(255) DEFAULT NULL, ADD rib BIGINT NOT NULL, ADD bic VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        //$this->addSql('ALTER TABLE customer DROP address1, DROP address2, DROP postcode, DROP city, DROP country');
        $this->addSql('ALTER TABLE user DROP address1, DROP address2, DROP postcode, DROP city, DROP country, DROP website, DROP siret, DROP rib, DROP bic');
    }
}
