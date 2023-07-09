<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;

class RecipeController extends AbstractController
{

    //This function returns all the recipes with pagination and cache.
    #[Route('/api/recettes', name: 'recipes', methods: ['GET'])]
    public function getAllRecipes(RecipeRepository $recipeRepository, SerializerInterface $serializer, Security $security, Request $request, TagAwareCacheInterface $cache): JsonResponse
    {
        $user = $security->getUser();

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);



        $idCache = "recipes_list_$page-$limit";
        //This is the cache for the recipes list.
        $jsonRecipesList = $cache->get($idCache, function (ItemInterface $item) use ($recipeRepository, $user, $limit, $page, $serializer) {
            $item->tag("recipesCache");
            $item->expiresAfter(1800);
            if ($limit > 10) {
                $recipesList = $recipeRepository->findAllWithoutPagination();
            } else if ($user) {
                $recipesList = $recipeRepository->findAllWithPagination($limit, $page);
            } else {
                $recipesList = $recipeRepository->findAllWithPaginationWithoutAuth($limit, $page);
            }
            return $serializer->serialize($recipesList, 'json', ['groups' => 'getRecipes']);
        });


        return new JsonResponse($jsonRecipesList, Response::HTTP_OK, [], true);
    }


    //Installation de ParamConverter pour cette fonction
    #[Route('api/recettes/{id}', name: 'detailRecipe', methods: ['GET'])]
    public function getDetailRecipe(Recipe $recipe, SerializerInterface $serializer): JsonResponse
    {
        $jsonRecipe = $serializer->serialize($recipe, 'json', ['groups' => 'getRecipes']);
        return new JsonResponse($jsonRecipe, Response::HTTP_OK, ['accept' => 'json'], true);
    }

    #[Route('api/recettes/{id}', name: 'deleteRecipe', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous ne pouvez pas supprimer une recette si vous n\'êtes pas administrateur.')]
    public function deleteRecipe(Recipe $recipe, EntityManagerInterface $em, TagAwareCacheInterface $cache): JsonResponse
    {
        $cache->invalidateTags(["recipesCache"]);
        $em->remove($recipe);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/recettes', name: 'createRecipe', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous ne pouvez pas créer une recette si vous n\'êtes pas administrateur.')]
    public function createRecipe(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, ValidatorInterface $validator): JsonResponse
    {
        $recipe = $serializer->deserialize($request->getContent(), Recipe::class, 'json');

        $errors = $validator->validate($recipe);

        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }


        $em->persist($recipe);
        $em->flush();

        $jsonRecipe = $serializer->serialize($recipe, 'json', ['groups' => 'getRecipes']);
        $location = $urlGenerator->generate('detailRecipe', ['id' => $recipe->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonRecipe, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    #[Route('api/recettes/{id}', name: 'updateRecipe', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous ne pouvez pas modifier une recette si vous n\'êtes pas administrateur.')]
    public function updateRecipe(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Recipe $currentRecipe): JsonResponse
    {
        $updatedRecipe = $serializer->deserialize($request->getContent(), Recipe::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentRecipe]);
        $em->persist($updatedRecipe);
        $em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
