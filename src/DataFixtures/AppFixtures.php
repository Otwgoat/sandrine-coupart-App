<?php

namespace App\DataFixtures;

use App\Entity\RateReview;
use App\Entity\Recipe;
use App\Entity\User;
use App\Repository\RecipeRepository;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $encoder;
    private $recipeRepository;
    private $userRepository;

    public function __construct(UserPasswordHasherInterface $encoder, UserRepository $userRepository, RecipeRepository $recipeRepository)
    {
        $this->encoder = $encoder;
        $this->userRepository = $userRepository;
        $this->recipeRepository = $recipeRepository;
    }


    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $faker->addProvider(new \FakerRestaurant\Provider\fr_FR\Restaurant($faker));

        $admin = new User();
        $hash = $this->encoder->hashPassword($admin, 'adminPassword');
        $admin->setFirstName('Sandrine')
            ->setLastName('Coupart')
            ->setEmail('sandrine.coupart@gmail.com')
            ->setPassword($hash)
            ->setRoles(['ROLE_ADMIN']);

        $manager->persist($admin);


        $manager->flush();

        for ($r = 0; $r < 30; $r++) {
            $recipe = new Recipe();
            $recipe->setTitle($faker->foodName())
                ->setDescription($faker->text())
                ->setPrepTime($faker->randomDigit())
                ->setCookTime($faker->randomDigit())
                ->setRestTime($faker->randomDigit())
                ->setIngredients([$faker->vegetableName(), $faker->meatName(), $faker->sauceName()])
                ->setSteps([$faker->text(), $faker->text(), $faker->text()])
                ->setAllergens([$faker->vegetableName()])
                ->setDiets([$faker->randomElement(["vegan", "végétarien", "sans-gluten", "protéines", "sans lactose", "sans sel"])])
                ->setRequireAuth($faker->randomElement([true, false]));


            $manager->persist($recipe);
        }
        for ($p = 0; $p < 30; $p++) {
            $patient = new User();
            $hash = $this->encoder->hashPassword($patient, "password");
            $patient->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($hash)
                ->setAllergens([$faker->vegetableName()])
                ->setDiet([$faker->randomElement(["vegan", "végétarien", "sans-gluten", "protéines", "sans lactose", "sans sel"])]);

            $manager->persist($patient);
        }

        $manager->flush();

        $patients = $this->userRepository->findAll();
        $recipes = $this->recipeRepository->findAll();
        foreach ($recipes as $recipe) {
            for ($p = 1; $p < 31; $p++) {
                $recipeRate = new RateReview();
                $recipeRate->setRate($faker->randomFloat(1, 0, 10))
                    ->setReview($faker->text())
                    ->setUser($patients[$p])
                    ->setRecipe($recipe);
                $manager->persist($recipeRate);
            }
        }
        $manager->flush();
    }
}
