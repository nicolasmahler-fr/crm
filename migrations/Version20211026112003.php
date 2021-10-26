<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211026112003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE countdown_row (id INT AUTO_INCREMENT NOT NULL, countdown_id INT DEFAULT NULL, date DATETIME NOT NULL, task VARCHAR(255) NOT NULL, elapsed TIME NOT NULL, INDEX IDX_FAFA0DE5C4BEE45D (countdown_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE countdown_row ADD CONSTRAINT FK_FAFA0DE5C4BEE45D FOREIGN KEY (countdown_id) REFERENCES countdown (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE countdown_row');
    }
}
