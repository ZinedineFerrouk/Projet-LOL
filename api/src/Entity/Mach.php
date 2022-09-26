<?php

namespace App\Entity;

use App\Repository\MachRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MachRepository::class)]
class Mach
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $match_id = null;

    #[ORM\Column(nullable: true)]
    private array $datas = [];

    #[ORM\ManyToMany(targetEntity: Summoner::class, inversedBy: 'maches')]
    private Collection $summoner;

    public function __construct()
    {
        $this->summoner = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMatchId(): ?string
    {
        return $this->match_id;
    }

    public function setMatchId(?string $match_id): self
    {
        $this->match_id = $match_id;

        return $this;
    }

    public function getDatas(): array
    {
        return $this->datas;
    }

    public function setDatas(?array $datas): self
    {
        $this->datas = $datas;

        return $this;
    }

    /**
     * @return Collection<int, Summoner>
     */
    public function getSummoner(): Collection
    {
        return $this->summoner;
    }

    public function addSummoner(Summoner $summoner): self
    {
        if (!$this->summoner->contains($summoner)) {
            $this->summoner->add($summoner);
        }

        return $this;
    }

    public function removeSummoner(Summoner $summoner): self
    {
        $this->summoner->removeElement($summoner);

        return $this;
    }
}
