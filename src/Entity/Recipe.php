<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RecipeRepository;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $prepTime = null;

    #[ORM\Column]
    private ?int $cookTime = null;

    #[ORM\Column]
    private ?int $restTime = null;

    #[ORM\Column]
    private array $ingredients = [];

    #[ORM\Column]
    private array $allergens = [];

    #[ORM\Column]
    private array $diets = [];

    #[ORM\Column]
    private ?bool $requireAuth = null;

    #[ORM\Column]
    private array $steps = [];

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: RateReview::class, orphanRemoval: true)]
    private Collection $rateReviews;

    public function __construct()
    {
        $this->rateReviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrepTime(): ?int
    {
        return $this->prepTime;
    }

    public function setPrepTime(int $prepTime): self
    {
        $this->prepTime = $prepTime;

        return $this;
    }

    public function getCookTime(): ?int
    {
        return $this->cookTime;
    }

    public function setCookTime(int $cookTime): self
    {
        $this->cookTime = $cookTime;

        return $this;
    }

    public function getRestTime(): ?int
    {
        return $this->restTime;
    }

    public function setRestTime(int $restTime): self
    {
        $this->restTime = $restTime;

        return $this;
    }

    public function getIngredients(): array
    {
        return $this->ingredients;
    }

    public function setIngredients(array $ingredients): self
    {
        $this->ingredients = $ingredients;

        return $this;
    }

    public function getAllergens(): array
    {
        return $this->allergens;
    }

    public function setAllergens(array $allergens): self
    {
        $this->allergens = $allergens;

        return $this;
    }

    public function getDiets(): array
    {
        return $this->diets;
    }

    public function setDiets(array $diets): self
    {
        $this->diets = $diets;

        return $this;
    }

    public function isRequireAuth(): ?bool
    {
        return $this->requireAuth;
    }

    public function setRequireAuth(bool $requireAuth): self
    {
        $this->requireAuth = $requireAuth;

        return $this;
    }

    public function getSteps(): array
    {
        return $this->steps;
    }

    public function setSteps(array $steps): self
    {
        $this->steps = $steps;

        return $this;
    }

    /**
     * @return Collection<int, RateReview>
     */
    public function getRateReviews(): Collection
    {
        return $this->rateReviews;
    }

    public function addRateReview(RateReview $rateReview): self
    {
        if (!$this->rateReviews->contains($rateReview)) {
            $this->rateReviews->add($rateReview);
            $rateReview->setRecipe($this);
        }

        return $this;
    }

    public function removeRateReview(RateReview $rateReview): self
    {
        if ($this->rateReviews->removeElement($rateReview)) {
            // set the owning side to null (unless already changed)
            if ($rateReview->getRecipe() === $this) {
                $rateReview->setRecipe(null);
            }
        }

        return $this;
    }
}
