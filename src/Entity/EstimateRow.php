<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EstimateRowRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Estimate;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=EstimateRowRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  subresourceOperations={
 *      "estimateRows_get_subresource"={
 *          "normalization_context"={"groups"={"estimateRows_subresource"}}
 *     }
 *  },
 *  itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE"
 *  },
 *  normalizationContext={
 *       "groups"={"estimateRows_read"}
 *   },
 *   denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 */
class EstimateRow
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"estimateRows_read", "estimates_read", "estimates_subresource", "estimateRows_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"estimateRows_read", "estimates_read", "estimates_subresource", "estimateRows_subresource"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"estimateRows_read", "estimates_read", "estimates_subresource", "estimateRows_subresource"})
     * @Assert\NotBlank(message="La quantité est obligatoire")
     * @Assert\Type(type="numeric", message="La quantité doit être numérique")
     */
    private $quantity;

    /**
     * @ORM\Column(type="float")
     * @Groups({"estimateRows_read", "estimates_read", "estimates_subresource", "estimateRows_subresource"})
     * @Assert\NotBlank(message="Le montant est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant du devis doit être numérique")
     */
    private $amount;

    /**
     * @Groups({"estimateRows_read"})
     * @ORM\ManyToOne(targetEntity=Estimate::class, inversedBy="estimateRows")
     * @ORM\JoinColumn(nullable=false)
     */
    private $estimate;

    /**
     * @ORM\Column(type="float")
     * @Groups({"estimateRows_read", "estimates_read", "estimates_subresource", "estimateRows_subresource"})
     * @Assert\NotBlank(message="Le prix unitaire est obligatoire")
     * @Assert\Type(type="numeric", message="Le prix unitaire doit être numérique")
     */
    private $unitPrice;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getEstimate(): ?Estimate
    {
        return $this->estimate;
    }

    public function setEstimate(?Estimate $estimate): self
    {
        $this->estimate = $estimate;

        return $this;
    }

    public function getUnitPrice(): ?float
    {
        return $this->unitPrice;
    }

    public function setUnitPrice(float $unitPrice): self
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }
}
