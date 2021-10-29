<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Countdown;
use App\Repository\CountdownRepository;
use App\Repository\CustomerRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CountdownInitSubscriber implements EventSubscriberInterface
{

    private $repo;
    private $customerRepo;

    public function __construct(CountdownRepository $repo, CustomerRepository $customerRepo)
    {
        $this->repo = $repo;
        $this->customerRepo = $customerRepo;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['setDateForCountdown', EventPriorities::PRE_VALIDATE],
                ['setReferenceForCountdown', EventPriorities::PRE_VALIDATE],
                ['setCurrentCreditForCountdown', EventPriorities::PRE_VALIDATE]
            ]
        ];
    }

    // Save the current date when creating a new countdown item
    public function setDateForCountdown(ViewEvent $event)
    {
        $countdown = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($countdown instanceof Countdown && $method === "POST") {
            $countdown->setDate(new \DateTime());
        }
    }

    // Save the reference when creating OR editing a new countdown item
    public function setReferenceForCountdown(ViewEvent $event)
    {
        $countdown = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($countdown instanceof Countdown && ($method === "POST" || $method === "PUT")) {

            //Returned value = "ca_createitemdate_slugged_company_name
            $date = date_format($countdown->getDate(), "Ymd");

            //Slugify the company name : replace blank spaces and points
            $query = $this->customerRepo->find($countdown->getCustomer());
            $temp = str_replace(
                ' ',
                '_',
                strtolower($query->getCompany())
            );
            $company = str_replace('.', '', $temp);

            $countdown->setReference('ca_' . $date . '_' . $company);
        }
    }

    // Replicate the credit as current_credit when creating a new countdown item
    public function setCurrentCreditForCountdown(ViewEvent $event)
    {
        $countdown = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($countdown instanceof Countdown && $method === "POST") {
            $countdown->setCurrentCredit($countdown->getCredit());
        }
    }
}
