<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211029082440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        /*  $this->addSql('ALTER TABLE countdown ADD current_credit VARCHAR(255) DEFAULT NULL, ADD status VARCHAR(255) DEFAULT NULL, ADD date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE countdown_row CHANGE countdown_id countdown_id INT NOT NULL'); */
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        /*  $this->addSql('ALTER TABLE countdown DROP current_credit, DROP status, DROP date');
        $this->addSql('ALTER TABLE countdown_row CHANGE countdown_id countdown_id INT DEFAULT NULL'); */
    }
}
