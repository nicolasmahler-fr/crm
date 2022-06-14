<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraints\Date;

class InvoiceIncrementationController
{
    /**
     *
     * @var EntityManagerInterface
     */
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function __invoke(Invoice $data)
    {
        /* $year = new \DateTime('Y'); */
        $data->setChrono($data->getChrono() + 1);
        /* $data->setYear((string)$year); */

        $this->manager->flush();
        return $data;
    }
}
