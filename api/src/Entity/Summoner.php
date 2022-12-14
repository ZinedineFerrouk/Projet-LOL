<?php

namespace App\Entity;

use App\Repository\SummonerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SummonerRepository::class)]
class Summoner
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $puuid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $profileIconId = null;

    #[ORM\Column(nullable: true)]
    private ?int $sumonnerLevel = null;

    #[ORM\ManyToMany(targetEntity: Matchs::class, mappedBy: 'summoner')]
    private Collection $matchs;

    #[ORM\Column(length: 255)]
    private ?string $summoner_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $region = null;

    public function __construct()
    {
        $this->matchs = new ArrayCollection();
    }

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getProfileIconId(): ?int
    {
        return $this->profileIconId;
    }

    public function setProfileIconId(?int $profileIconId): self
    {
        $this->profileIconId = $profileIconId;

        return $this;
    }

    public function getSumonnerLevel(): ?int
    {
        return $this->sumonnerLevel;
    }

    public function setSumonnerLevel(?int $sumonnerLevel): self
    {
        $this->sumonnerLevel = $sumonnerLevel;

        return $this;
    }

    /**
     * @return Collection<int, Matchs>
     */
    public function getMatchs(): Collection
    {
        return $this->matchs;
    }

    public function addMatch(Matchs $match): self
    {
        if (!$this->matchs->contains($match)) {
            $this->matchs->add($match);
            $match->addSummoner($this);
        }

        return $this;
    }

    public function removeMatch(Matchs $match): self
    {
        if ($this->matchs->removeElement($match)) {
            $match->removeSummoner($this);
        }

        return $this;
    }

    public function getSummonerId(): ?string
    {
        return $this->summoner_id;
    }

    public function setSummonerId(string $summoner_id): self
    {
        $this->summoner_id = $summoner_id;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): self
    {
        $this->region = $region;

        return $this;
    }
}
