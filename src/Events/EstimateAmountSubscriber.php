<?php

/*
 * Calcul des différents montant des factures
 * InvoiceRow : sous-total
 * Invoice : total global
 */

namespace App\Events;

use App\Entity\EstimateRow;
use App\Repository\EstimateRepository;
use App\Repository\EstimateRowRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class EstimateAmountSubscriber implements EventSubscriberInterface
{

    private $rowRepo;
    private $estimateRepo;
    private $entityManager;

    public function __construct(EstimateRowRepository $rowRepo, EstimateRepository $estimateRepo, EntityManagerInterface $entityManager)
    {
        $this->rowRepo = $rowRepo;
        $this->estimateRepo = $estimateRepo;
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['setEstimateRowAmount', EventPriorities::PRE_VALIDATE],
                ['setEstimateAmount', EventPriorities::POST_WRITE],
                ['updateAmountOnDelete', EventPriorities::PRE_WRITE]
            ]
        ];
    }

    //Calcul du sous-total de l'entrée d'un devis
    public function setEstimateRowAmount(ViewEvent $event)
    {
        //Evenement en class entity estimateRow
        $row = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        //Si la bonne entity qu'on cherche à créer ou update
        if ($row instanceof EstimateRow && ($method === "POST" || $method === "PUT")) {
            // sous-total(amount) = quantité * prix unitaire
            $amount = $row->getQuantity() * $row->getUnitPrice();
            $row->setAmount($amount);
        }
    }

    //Calcul du montant total d'une facture après une insertion ou un update
    public function setEstimateAmount(ViewEvent $event)
    {

        //Entity : estimateRow
        $row = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        if ($row instanceof EstimateRow && ($method === "POST" || $method === "PUT")) {

            //Tableau de toutes les entrées de la facture modifiée.
            $estimateRows = $this->rowRepo->findBy(['estimate' => $row->getEstimate()]);

            $amounts = [];
            foreach ($estimateRows as $row) {
                array_push($amounts, $row->getAmount());
            }

            //Somme de tous les sous-totaux;
            $totalAmount = array_sum($amounts);

            $estimate = $this->estimateRepo->findOneBy(['id' => $row->getEstimate()]);

            //Persistence du montant de la facture en db
            $estimate->setAmount($totalAmount);
            $manager = $this->entityManager;
            $manager->persist($estimate);
            $manager->flush();
        }
    }


    //Calcul du montant du devis après suppression d'un élément
    public function updateAmountOnDelete(ViewEvent $event)
    {

        $row = $event->getControllerResult();

        if ($row instanceof EstimateRow && ($event->getRequest()->getMethod() === "DELETE")) {

            //Récupération de l'entité supprimée.
            $data = $event->getRequest()->get('data');


            //Export de la somme de la row supprimée
            $rowAmount = $data->getAmount();

            //Export de l'ID de la facture concernée
            $estimateRef = $data->getEstimate();
            $estimateId = $estimateRef->getId();
            $estimateAmount = $estimateRef->getAmount();

            //Nouveau montant global : total de la facture - montant de l'élément supprimé
            $totalAmount = $estimateAmount - $rowAmount;

            //Récupérer la facture concernée
            $estimate = $this->estimateRepo->findOneBy(['id' => $estimateId]);

            //Persistence du montant du devis en db
            $estimate->setAmount($totalAmount);
            $manager = $this->entityManager;
            $manager->persist($estimate);
            $manager->flush();
        }
    }
}
