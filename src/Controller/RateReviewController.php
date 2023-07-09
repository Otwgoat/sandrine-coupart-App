<?php

namespace App\Controller;

use App\Entity\RateReview;
use App\Repository\RateReviewRepository;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class RateReviewController extends AbstractController
{
    #[Route('api/avis', name: 'getReviews', methods: ['GET'])]
    public function getReviews(SerializerInterface $serializer, Request $request, RateReviewRepository $repository): JsonResponse
    {
        $recipeId = $request->get('recipeId');
        $reviewsList = $repository->findByRecipe($recipeId);
        $jsonReviewsList = $serializer->serialize($reviewsList, 'json', ['groups' => ['getReviews', 'getUsers']]);
        return new JsonResponse($jsonReviewsList, Response::HTTP_OK, [], true);
    }



    #[Route('/api/avis/{id}', name: 'detailReview', methods: ['GET'])]
    public function getDetailReview(RateReview $review, SerializerInterface $serializer): JsonResponse
    {
        $jsonReview = $serializer->serialize($review, 'json', ['groups' => 'getReviews', 'getRecipes']);
        return new JsonResponse($jsonReview, Response::HTTP_OK, [], true);
    }

    #[Route('/api/avis', name: 'createReview', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function createReview(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, ValidatorInterface $validator, Security $security, RecipeRepository $recipeRepo): JsonResponse
    {
        $review = $serializer->deserialize($request->getContent(), RateReview::class, 'json');
        $id = $request->get('recipeId');
        $recipe = $recipeRepo->find($id);
        $user = $security->getUser();
        $review->setUser($user);
        $recipe->addReview($review);
        $errors = $validator->validate($review);
        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }


        $em->persist($review);
        $em->flush();

        $jsonReview = $serializer->serialize($review, 'json', ['groups' => 'getReviews']);
        $location = $urlGenerator->generate('detailReview', ['id' => $review->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonReview, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    #[Route('api/avis/{id}', name: 'updateReview', methods: ['PUT'])]
    public function updateReview(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, RateReview $currentReview): JsonResponse
    {
        $updatedReview = $serializer->deserialize($request->getContent(), RateReview::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentReview]);
        $em->persist($updatedReview);
        $em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('api/avis/{id}', name: 'deleteReview', methods: ['DELETE'])]
    public function deleteReview(RateReview $review, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($review);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
