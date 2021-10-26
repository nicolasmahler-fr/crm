<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211015075634 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice_row ADD invoice_id INT NOT NULL');
        $this->addSql('ALTER TABLE invoice_row ADD CONSTRAINT FK_2CC199182989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('CREATE INDEX IDX_2CC199182989F1FD ON invoice_row (invoice_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice_row DROP FOREIGN KEY FK_2CC199182989F1FD');
        $this->addSql('DROP INDEX IDX_2CC199182989F1FD ON invoice_row');
        $this->addSql('ALTER TABLE invoice_row DROP invoice_id');
    }
}
