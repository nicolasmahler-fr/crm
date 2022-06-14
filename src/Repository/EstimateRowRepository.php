<?php

namespace App\Repository;

use App\Entity\EstimateRow;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EstimateRow|null find($id, $lockMode = null, $lockVersion = null)
 * @method EstimateRow|null findOneBy(array $criteria, array $orderBy = null)
 * @method EstimateRow[]    findAll()
 * @method EstimateRow[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstimateRowRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EstimateRow::class);
    }

    // /**
    //  * @return EstimateRow[] Returns an array of EstimateRow objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EstimateRow
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
