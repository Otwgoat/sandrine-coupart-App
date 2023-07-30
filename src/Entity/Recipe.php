<?php

namespace App\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RecipeRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(unique: true)]
    #[Groups('getRecipes')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Le titre de la recette doit être renseigné.")]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "La description de la recette doit être renseigné.")]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Le temps de préparation de la recette doit être renseigné.")]
    #[Assert\PositiveOrZero(message: "Le temps de préparation doit etre un nombre égal à 0 ou supérieur.")]
    private ?int $prepTime = null;

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Le temps de cuisson de la recette doit être renseigné.")]
    #[Assert\PositiveOrZero(message: "Le temps de cuisson doit etre un nombre égal à 0 ou supérieur.")]
    private ?int $cookTime = null;

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "La temps de repos de la recette doit être renseigné.")]
    #[Assert\PositiveOrZero(message: "Le temps de repos doit etre un nombre égal à 0 ou supérieur.")]
    private ?int $restTime = null;

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Au moins un ingrédient doit être renseigné.")]
    private array $ingredients = [];

    #[ORM\Column]
    #[Groups('getRecipes')]
    private array $allergens = [];

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Au moins un régime doit être renseigné.")]
    private array $diets = [];

    #[ORM\Column]
    #[Groups('getRecipes')]
    private ?bool $requireAuth = null;

    #[ORM\Column]
    #[Groups('getRecipes')]
    #[Assert\NotBlank(message: "Au moins une étape doit être renseigné.")]
    private array $steps = [];



    #[ORM\Column(length: 255, nullable: true)]
    #[Groups('getRecipes')]
    private ?string $imageUrl = null;

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: RateReview::class, orphanRemoval: true, cascade: ['persist'])]
    #[Groups('getRecipes')]
    private Collection $reviews;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
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


    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }
    public function __toString()
    {
        return $this->getId(); // Retourne l'identifiant de l'entité
    }

    /**
     * @return Collection<int, RateReview>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(RateReview $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setRecipe($this);
        }

        return $this;
    }

    public function removeReview(RateReview $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getRecipe() === $this) {
                $review->setRecipe(null);
            }
        }

        return $this;
    }
}
