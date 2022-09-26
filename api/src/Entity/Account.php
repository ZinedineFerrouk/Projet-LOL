<?php

namespace App\Entity;

use App\Repository\AccountRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AccountRepository::class)]
class Account
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $puuid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $game_name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tag_line = null;

    #[ORM\OneToOne(mappedBy: 'account', cascade: ['persist', 'remove'])]
    private ?Summoner $summoner = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPuuid(): ?string
    {
        return $this->puuid;
    }

    public function setPuuid(?string $puuid): self
    {
        $this->puuid = $puuid;

        return $this;
    }

    public function getGameName(): ?string
    {
        return $this->game_name;
    }

    public function setGameName(?string $game_name): self
    {
        $this->game_name = $game_name;

        return $this;
    }

    public function getTagLine(): ?string
    {
        return $this->tag_line;
    }

    public function setTagLine(?string $tag_line): self
    {
        $this->tag_line = $tag_line;

        return $this;
    }

    public function getSummoner(): ?Summoner
    {
        return $this->summoner;
    }

    public function setSummoner(?Summoner $summoner): self
    {
        // unset the owning side of the relation if necessary
        if ($summoner === null && $this->summoner !== null) {
            $this->summoner->setAccount(null);
        }

        // set the owning side of the relation if necessary
        if ($summoner !== null && $summoner->getAccount() !== $this) {
            $summoner->setAccount($this);
        }

        $this->summoner = $summoner;

        return $this;
    }
}
