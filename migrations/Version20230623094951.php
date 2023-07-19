<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230623094951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        //$this->addSql('CREATE TABLE rate_review (id INT AUTO_INCREMENT NOT NULL, recipe_id INT NOT NULL, user_id INT NOT NULL, rate DOUBLE PRECISION NOT NULL, review VARCHAR(255) NOT NULL, INDEX IDX_DBB4B0AD59D8A214 (recipe_id), INDEX IDX_DBB4B0ADA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rate_review ADD CONSTRAINT FK_DBB4B0AD59D8A214 FOREIGN KEY (recipe_id) REFERENCES recipe (id)');
        $this->addSql('ALTER TABLE rate_review ADD CONSTRAINT FK_DBB4B0ADA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rate_review DROP FOREIGN KEY FK_DBB4B0AD59D8A214');
        //$this->addSql('ALTER TABLE rate_review DROP FOREIGN KEY FK_DBB4B0ADA76ED395');
        $this->addSql('DROP TABLE rate_review');
    }
}
