<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230623093153 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rate_review DROP FOREIGN KEY fk_rate_review_user_id');
        $this->addSql('ALTER TABLE rate_review ADD relation VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE rate_review ADD CONSTRAINT FK_DBB4B0ADA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rate_review DROP FOREIGN KEY FK_DBB4B0ADA76ED395');
        $this->addSql('ALTER TABLE rate_review DROP relation');
        $this->addSql('ALTER TABLE rate_review ADD CONSTRAINT fk_rate_review_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
    }
}
