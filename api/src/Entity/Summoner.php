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

    #[ORM\OneToOne(inversedBy: 'summoner', cascade: ['persist', 'remove'])]
    private ?Account $account = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $puuid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $profileIconId = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $revision_date = null;

    #[ORM\Column(nullable: true)]
    private ?int $sumonnerLevel = null;

    #[ORM\ManyToMany(targetEntity: Matchs::class, mappedBy: 'summoner')]
    private Collection $matchs;

    public function __construct()
    {
        $this->matchs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }

    public function setAccount(?Account $account): self
    {
        $this->account = $account;

        return $this;
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

    public function getRevisionDate(): ?\DateTimeInterface
    {
        return $this->revision_date;
    }

    public function setRevisionDate(?\DateTimeInterface $revision_date): self
    {
        $this->revision_date = $revision_date;

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
}
