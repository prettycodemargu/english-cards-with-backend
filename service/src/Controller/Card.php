<?php

namespace App\Controller;

use Doctrine\ORM\Query;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class Card extends AbstractController {

    /**
     * @Route("/cards/{id}", methods={"GET"})
     * @param int $id
     * @return JsonResponse
     */
    public function getCards($id = 0) {

        $em = $this->getDoctrine()->getManager();

        $qb = $em->createQueryBuilder();
        $qb->select('c')
            ->from(\App\Entity\Card::class, 'c')
            ->orderBy('c.id', 'DESC');

        if ($id) {
            $qb->where('c.id = ?1')
                ->setParameter(1, $id);
        }

        $query = $qb->getQuery();
        $cards = $query->getResult(Query::HYDRATE_ARRAY);

        return new JsonResponse($cards);
    }

    /**
     * @Route("/cards", methods={"POST"})
     * @return JsonResponse
     */
    public function addCard() {

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['word']) || empty($data['translate'])) {
            return (new JsonResponse())->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        }

        $entityManager = $this->getDoctrine()->getManager();

        $card = new \App\Entity\Card();
        $card->setWord($data['word']);
        $card->setTranslate($data['translate']);
        $card->setOverturned(false);

        $entityManager->persist($card);
        $entityManager->flush();

        $response = new JsonResponse(['id' => $card->getId()]);
        $response->setStatusCode(JsonResponse::HTTP_CREATED);

        return $response;
    }


    /**
     * @Route("/cards/{id}", methods={"PATCH"})
     * @param int $id
     * @return JsonResponse
     */
    public function patchCard(int $id) {

        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['word']) && empty($data['translate']) && empty($data['overturned']) ) {
            return (new JsonResponse())->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
        }

        $entityManager = $this->getDoctrine()->getManager();

        $card = $entityManager->getRepository(\App\Entity\Card::class)->find($id);
        if (!$card) {
            return (new JsonResponse())->setStatusCode(JsonResponse::HTTP_NOT_FOUND);
        }

        empty($data['word']) || $card->setWord($data['word']);
        empty($data['translate']) || $card->setTranslate($data['translate']);
        empty($data['overturned']) || $card->setOverturned($data['overturned']);

        $entityManager->persist($card);
        $entityManager->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/cards/{id}", methods={"DELETE"})
     * @param int $id
     * @return JsonResponse
     */
    public function deleteCard(int $id) {

        $entityManager = $this->getDoctrine()->getManager();

        /** @var \App\Entity\Card $card */
        $card = $entityManager->getRepository(\App\Entity\Card::class)->find($id);

        if (!$card) {
            return (new JsonResponse())->setStatusCode(JsonResponse::HTTP_NOT_FOUND);
        }

        $entityManager->remove($card);
        $entityManager->flush();

        $response = new JsonResponse();
        $response->setStatusCode(JsonResponse::HTTP_NO_CONTENT);

        return $response;
    }
}
