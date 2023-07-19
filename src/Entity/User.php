<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('getUsers', 'getReviews')]

    public ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups('getUsers')]
    #[Assert\NotBlank(message: "L'adresse email doit être renseigné.")]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups('getUsers')]
    #[Assert\NotBlank(message: "Le prénom doit être renseigné.")]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups('getUsers')]
    #[Assert\NotBlank(message: "Le nom doit être renseigné.")]
    private ?string $lastName = null;

    #[ORM\Column(nullable: true)]
    #[Groups('getUsers')]
    #[Assert\NotBlank(message: "Au moins un allergène doit être renseigné. S'il n'y en a pas, veuillez indiquer 'Aucun'.")]
    public array $allergens = [];

    #[ORM\Column(nullable: true)]
    #[Groups('getUsers')]
    #[Assert\NotBlank(message: "Au moins un régime doit être renseigné.")]
    public array $diet = [];

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: RateReview::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $reviews;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getAllergens(): array
    {
        return $this->allergens;
    }

    public function setAllergens(?array $allergens): self
    {
        $this->allergens = $allergens;

        return $this;
    }

    public function getDiet(): array
    {
        return $this->diet;
    }

    public function setDiet(?array $diet): self
    {
        $this->diet = $diet;

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
            $review->setUser($this);
        }

        return $this;
    }

    public function removeReview(RateReview $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getUser() === $this) {
                $review->setUser(null);
            }
        }

        return $this;
    }
}
