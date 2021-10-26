<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use App\Entity\InvoiceRow;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    /*
    * @var UserPasswordEncoderInterface
    */
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');


        for ($u = 0; $u < 10; $u++) {
            $user = new User();

            $chrono = 1;
            $hash = $this->encoder->hashPassword($user, 'password');

            $user->setFirstName($faker->firstName())
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setPassword($hash);

            for ($c = 0; $c < 30; $c++) {
                $customer = new Customer();
                $customer->setFirstName($faker->firstName())
                    ->setLastName($faker->lastName)
                    ->setCompany($faker->company)
                    ->setEmail($faker->email)
                    ->setUser($user);

                $manager->persist($customer);

                for ($i = 0; $i < mt_rand(3, 10); $i++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                        ->setSentAt($faker->dateTimeBetween('-6 months)'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setCustomer($customer)
                        ->setChrono($chrono);

                    $chrono++;

                    $manager->persist($invoice);

                    for ($r = 0; $r < mt_rand(1, 5); $r++) {
                        $row = new InvoiceRow();
                        $row->setDescription($faker->sentence($nbWords = 12, $variableNbWords = true))
                            ->setQuantity($faker->numberBetween(1, 16))
                            ->setAmount($row->getQuantity() * 50)
                            ->setInvoice($invoice);

                        $manager->persist($row);
                    }
                }
            }

            $manager->persist($user);
        }

        $manager->flush();
    }
}
