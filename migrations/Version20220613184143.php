<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220613184143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE estimate_row (id INT AUTO_INCREMENT NOT NULL, estimate_id INT DEFAULT NULL, description LONGTEXT DEFAULT NULL, quantity INT NOT NULL, amount DOUBLE PRECISION NOT NULL, unit_price DOUBLE PRECISION NOT NULL, INDEX IDX_ECD78E7485F23082 (estimate_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE estimate_row ADD CONSTRAINT FK_ECD78E7485F23082 FOREIGN KEY (estimate_id) REFERENCES estimate (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE estimate_row');
    }
}
