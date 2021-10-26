<?php

namespace App\Entity;

use App\Entity\Invoice;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRowRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=InvoiceRowRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  subresourceOperations={
 *      "invoiceRows_get_subresource"={
 *          "normalization_context"={"groups"={"invoiceRows_subresource"}}
 *     }
 *  },
 *  itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE"
 *  },
 *  normalizationContext={
 *       "groups"={"invoiceRows_read"}
 *   },
 *   denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 */
class InvoiceRow
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoiceRows_read", "invoices_read", "invoices_subresource", "invoiceRows_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"invoiceRows_read", "invoices_read", "invoices_subresource", "invoiceRows_subresource"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoiceRows_read", "invoices_read", "invoices_subresource", "invoiceRows_subresource"})
     * @Assert\NotBlank(message="La quantité est obligatoire")
     * @Assert\Type(type="numeric", message="La quantité doit être numérique")
     */
    private $quantity;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoiceRows_read", "invoices_read", "invoices_subresource", "invoiceRows_subresource"})
     * @Assert\NotBlank(message="Le montant est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant de la facture doit être numérique")
     */
    private $amount;

    /**
     * @Groups({"invoiceRows_read"})
     * @ORM\ManyToOne(targetEntity=Invoice::class, inversedBy="invoiceRows")
     * @ORM\JoinColumn(nullable=false)
     */
    private $invoice;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoiceRows_read", "invoices_read", "invoices_subresource", "invoiceRows_subresource"})
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

    public function setDescription(string $description): self
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

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

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
