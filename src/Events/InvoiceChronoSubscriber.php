<?php

namespace App\Events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $security;
    private $repo;

    public function __construct(Security $security, InvoiceRepository $repo)
    {
        $this->security = $security;
        $this->repo = $repo;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {

        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        if ($invoice instanceof Invoice && $method === "POST") {
            $nextChrono = $this->repo->findNextChrono($this->security->getUser());
            $invoice->setChrono($nextChrono);

            $year = new \DateTime();
            $invoice->setYear($year->format('Y'));

            if (empty($invoice->setDate)) {
                $invoice->setSentAt(new \DateTime());
            }
        }
    }
}
