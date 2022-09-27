<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220927142623 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE champions (id INT AUTO_INCREMENT NOT NULL, champion_id VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE items (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, item_id VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE matchs (id INT AUTO_INCREMENT NOT NULL, data JSON NOT NULL, match_id VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE matchs_summoner (matchs_id INT NOT NULL, summoner_id INT NOT NULL, INDEX IDX_C9F87DF688EB7468 (matchs_id), INDEX IDX_C9F87DF6BC01C675 (summoner_id), PRIMARY KEY(matchs_id, summoner_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE summoner (id INT AUTO_INCREMENT NOT NULL, puuid VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, profile_icon_id INT DEFAULT NULL, sumonner_level INT DEFAULT NULL, summoner_id VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE matchs_summoner ADD CONSTRAINT FK_C9F87DF688EB7468 FOREIGN KEY (matchs_id) REFERENCES matchs (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE matchs_summoner ADD CONSTRAINT FK_C9F87DF6BC01C675 FOREIGN KEY (summoner_id) REFERENCES summoner (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE matchs_summoner DROP FOREIGN KEY FK_C9F87DF688EB7468');
        $this->addSql('ALTER TABLE matchs_summoner DROP FOREIGN KEY FK_C9F87DF6BC01C675');
        $this->addSql('DROP TABLE champions');
        $this->addSql('DROP TABLE items');
        $this->addSql('DROP TABLE matchs');
        $this->addSql('DROP TABLE matchs_summoner');
        $this->addSql('DROP TABLE summoner');
    }
}
