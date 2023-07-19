<?php

namespace App\Entity;

use App\Repository\RateReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RateReviewRepository::class)]
class RateReview
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['getReviews', 'getRecipes'])]
    #[Assert\NotBlank(message: "Une note doit être renseignée.")]
    private ?float $rate = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getReviews'])]
    #[Assert\NotBlank(message: "L'avis de la recette doit être écrit.")]
    private ?string $review = null;

    #[ORM\ManyToOne(inversedBy: 'reviews', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Recipe $recipe = null;

    #[ORM\ManyToOne(inversedBy: 'reviews', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['getReviews'])]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(['getReviews'])]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRate(): ?float
    {
        return $this->rate;
    }

    public function setRate(float $rate): self
    {
        $this->rate = $rate;

        return $this;
    }

    public function getReview(): ?string
    {
        return $this->review;
    }

    public function setReview(string $review): self
    {
        $this->review = $review;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
