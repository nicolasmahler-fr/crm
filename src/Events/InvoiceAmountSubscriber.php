<?php

/*
 * Calcul des différents montant des factures
 * InvoiceRow : sous-total
 * Invoice : total global
 */

namespace App\Events;

use App\Entity\InvoiceRow;
use App\Repository\InvoiceRepository;
use App\Repository\InvoiceRowRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceAmountSubscriber implements EventSubscriberInterface
{
    private $rowRepo;
    private $invoiceRepo;
    private $entityManager;

    public function __construct(InvoiceRowRepository $rowRepo, InvoiceRepository $invoiceRepo, EntityManagerInterface $entityManager)
    {
        $this->rowRepo = $rowRepo;
        $this->invoiceRepo = $invoiceRepo;
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['setInvoiceRowAmount', EventPriorities::PRE_VALIDATE],
                ['setInvoiceAmount', EventPriorities::POST_WRITE],
                ['updateAmountOnDelete', EventPriorities::PRE_WRITE]
            ]
        ];
    }

    //Calcul du sous-total de l'entrée d'une facture
    public function setInvoiceRowAmount(ViewEvent $event)
    {
        //Evenement en class entity invoiceRow
        $row = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        //Si la bonne entity qu'on cherche à créer ou update
        if ($row instanceof InvoiceRow && ($method === "POST" || $method === "PUT")) {
            // sous-total(amount) = quantité * prix unitaire
            $amount = $row->getQuantity() * $row->getUnitPrice();
            $row->setAmount($amount);
        }
    }

    //Calcul du montant total d'une facture après une insertion ou un update
    public function setInvoiceAmount(ViewEvent $event)
    {

        //Entity : invoiceRow
        $row = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        if ($row instanceof InvoiceRow && ($method === "POST" || $method === "PUT")) {

            //Tableau de toutes les entrées de la facture modifiée.
            $invoiceRows = $this->rowRepo->findBy(['invoice' => $row->getInvoice()]);

            $amounts = [];
            foreach ($invoiceRows as $row) {
                array_push($amounts, $row->getAmount());
            }

            //Somme de tous les sous-totaux;
            $totalAmount = array_sum($amounts);

            $invoice = $this->invoiceRepo->findOneBy(['id' => $row->getInvoice()]);

            //Persistence du montant de la facture en db
            $invoice->setAmount($totalAmount);
            $manager = $this->entityManager;
            $manager->persist($invoice);
            $manager->flush();
        }
    }


    //Calcul du montant de la facture après suppression d'un élément
    public function updateAmountOnDelete(ViewEvent $event)
    {

        $row = $event->getControllerResult();

        if ($row instanceof InvoiceRow && ($event->getRequest()->getMethod() === "DELETE")) {

            //Récupération de l'entité supprimée.
            $data = $event->getRequest()->get('data');


            //Export de la somme de la row supprimée
            $rowAmount = $data->getAmount();

            //Export de l'ID de la facture concernée
            $invoiceRef = $data->getInvoice();
            $invoiceId = $invoiceRef->getId();
            $invoiceAmount = $invoiceRef->getAmount();

            //Nouveau montant global : total de la facture - montant de l'élément supprimé
            $totalAmount = $invoiceAmount - $rowAmount;

            //Récupérer la facture concernée
            $invoice = $this->invoiceRepo->findOneBy(['id' => $invoiceId]);

            //Persistence du montant de la facture en db
            $invoice->setAmount($totalAmount);
            $manager = $this->entityManager;
            $manager->persist($invoice);
            $manager->flush();
        }
    }
}
