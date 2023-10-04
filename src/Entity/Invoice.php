<?php

namespace App\Entity;

use App\Entity\User;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 * subresourceOperations={
 *      "api_customers_invoices_get_subresource"={
 *          "normalization_context"={"groups"={"invoices_subresource"}}
 *      }
 * },
 * itemOperations={
 *      "GET",
 *      "PUT",
 *      "DELETE",
 *      "increment"={
 *          "method"="post",
 *          "path"="/invoices/{id}/increment",
 *          "controller"="App\Controller\InvoiceIncrementationController",
 *          "openapi_context"={
 *              "summary"="Incrémente une facture",
 *              "description"="Incrémente le chrono d'une facture donnée"
 *          }
 *      }
 * },
 * attributes={
 *      "pagination_enabled"=false,
        "pagination_items_per_page"=20,
        "order": {"chrono":"desc"}
 *  },
 *  normalizationContext={
 *      "groups"={"invoices_read"}
 * },
 * denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 * @ApiFilter(
 *  OrderFilter::class, properties={"amount", "sentAt"}
 * )
 */
class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource", "invoiceRows_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource", "invoiceRows_read"})
     * @Assert\NotBlank(message="Le montant est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant de la facture doit être numérique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="\DateTimeInterface", message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le status doit être renseignée")
     * @Assert\Choice(choices={"DRAFT", "SENT", "PAID", "CANCELLED"}, message="Le status doit être DRAFT, SENT, PAID ou CANCELLED")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Le client de la facture doit être renseigné")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le chrono doit être renseigné")
     * @Assert\Type(type="integer", message="Le chrono doit être un nombre")
     */
    private $chrono;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="L'année doit être renseigné")
     */
    private $year;

    /**
     * @ORM\OneToMany(targetEntity=InvoiceRow::class, mappedBy="invoice")
     * @ApiSubresource
     */
    private $invoiceRows;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="\DateTimeInterface", message="La date doit être au format YYYY-MM-DD")
     */
    private $paidAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource", "invoiceRows_read"})
     * @Assert\Type(type="integer", message="La TVA doit être un booléen")
     */
    private $vat;

    public function __construct()
    {
        $this->invoiceRows = new ArrayCollection();
    }

    /**
     * Permet de récupérer le user à qui appartient la facture
     * @Groups({"invoices_read", "invoices_subresource"})
     * @return User
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear($year): self
    {
        $this->year = $year;

        return $this;
    }

    /**
     * @return Collection|InvoiceRow[]
     * @Groups({"invoices_read", "invoices_subresource"})
     */
    public function getInvoiceRows(): Collection
    {
        return $this->invoiceRows;
    }

    public function addInvoiceRow(InvoiceRow $invoiceRow): self
    {
        if (!$this->invoiceRows->contains($invoiceRow)) {
            $this->invoiceRows[] = $invoiceRow;
            $invoiceRow->setInvoice($this);
        }

        return $this;
    }

    public function removeInvoiceRow(InvoiceRow $invoiceRow): self
    {
        if ($this->invoiceRows->removeElement($invoiceRow)) {
            // set the owning side to null (unless already changed)
            if ($invoiceRow->getInvoice() === $this) {
                $invoiceRow->setInvoice(null);
            }
        }

        return $this;
    }

    public function getPaidAt(): ?\DateTimeInterface
    {
        return $this->paidAt;
    }

    public function setPaidAt(\DateTimeInterface $paidAt): self
    {
        $this->paidAt = $paidAt;

        return $this;
    }

    public function getVat(): ?int
    {
        return $this->vat;
    }

    public function setVat(?int $vat): self
    {
        $this->vat = $vat;

        return $this;
    }
}
