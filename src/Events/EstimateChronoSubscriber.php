<?php

namespace App\Events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Estimate;
use App\Repository\EstimateRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class EstimateChronoSubscriber implements EventSubscriberInterface
{

    private $security;
    private $repo;

    public function __construct(Security $security, EstimateRepository $repo)
    {
        $this->security = $security;
        $this->repo = $repo;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForEstimate', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForEstimate(ViewEvent $event)
    {

        $estimate = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); // POST GET...

        if ($estimate instanceof Estimate && $method === "POST") {
            $nextChrono = $this->repo->findNextChrono($this->security->getUser());
            $estimate->setChrono($nextChrono);

            $year = new \DateTime();
            $estimate->setYear($year->format('Y'));

            if (empty($estimate->setDate)) {
                $estimate->setSentAt(new \DateTime());
            }
        }
    }
}
