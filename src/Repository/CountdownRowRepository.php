<?php

namespace App\Repository;

use App\Entity\CountdownRow;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CountdownRow|null find($id, $lockMode = null, $lockVersion = null)
 * @method CountdownRow|null findOneBy(array $criteria, array $orderBy = null)
 * @method CountdownRow[]    findAll()
 * @method CountdownRow[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CountdownRowRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CountdownRow::class);
    }

    // /**
    //  * @return CountdownRow[] Returns an array of CountdownRow objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CountdownRow
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
