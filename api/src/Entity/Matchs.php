<?php

namespace App\Entity;

use App\Repository\MatchsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MatchsRepository::class)]
class Matchs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private array $data = [];

    #[ORM\ManyToMany(targetEntity: Summoner::class, inversedBy: 'matchs')]
    private Collection $summoner;

    #[ORM\Column(length: 255)]
    private ?string $match_id = null;

    public function __construct()
    {
        $this->summoner = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function setData(array $data): self
    {
        $this->data = $data;

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

    public function getMatchId(): ?string
    {
        return $this->match_id;
    }

    public function setMatchId(string $match_id): self
    {
        $this->match_id = $match_id;

        return $this;
    }
}
