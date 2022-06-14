<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use App\Repository\EstimateRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity(repositoryClass=EstimateRepository::class)
 * @ApiResource(
 * subresourceOperations={
 *      "api_customers_estimates_get_subresource"={
 *          "normalization_context"={"groups"={"estimates_subresource"}}
 *      }
 * },
 * itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE", 
 *      "increment"={
 *          "method"="post", 
 *          "path"="/estimates/{id}/increment", 
 *          "controller"="App\Controller\EstimateIncrementationController",
 *          "openapi_context"={
 *              "summary"="Incrémente un devis",
 *              "description"="Incrémente le chrono d'un devis donné"
 *          }
 *      }
 * },
 * attributes={
 *      "pagination_enabled"=false,
        "pagination_items_per_page"=20,
        "order": {"chrono":"desc"}
 *  },
 *  normalizationContext={
 *      "groups"={"estimates_read"}
 * },
 * denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 * @ApiFilter(
 *  OrderFilter::class, properties={"amount", "sentAt"}
 * )
 */
class Estimate
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"estimates_read", "customers_read", "estimates_subresource", "estimateRows_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource", "estimateRows_read"})
     * @Assert\NotBlank(message="Le montant est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant du devis doit être numérique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\Type(type="\DateTimeInterface", message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\NotBlank(message="Le status doit être renseignée")
     * @Assert\Choice(choices={"SENT", "VALIDATE", "CANCELLED", "DRAFT"}, message="Le status doit être SENT, VALIDATE ou CANCELLED")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="estimates")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"estimates_read"})
     * @Assert\NotBlank(message="Le client du devis doit être renseigné")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\NotBlank(message="Le chrono doit être renseigné")
     * @Assert\Type(type="integer", message="Le chrono doit être un nombre")
     */
    private $chrono;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\NotBlank(message="L'année doit être renseigné")
     */
    private $year;

    /**
     * @ORM\OneToMany(targetEntity=EstimateRow::class, mappedBy="estimate")
     * @ApiSubresource
     */
    private $estimateRows;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\Type(type="\DateTimeInterface", message="La date doit être au format YYYY-MM-DD")
     */
    private $validateAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     * @Assert\NotBlank(message="L'objet doit être renseigné")
     */
    private $object;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"estimates_read", "customers_read", "estimates_subresource"})
     */
    private $definition;

    public function __construct()
    {
        $this->estimateRows = new ArrayCollection();
    }

    /**
     * Permet de récupérer le user à qui appartient la facture
     * @Groups({"estimates_read", "estimates_subresource"})
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

    public function setAmount(?float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
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

    public function setYear(string $year): self
    {
        $this->year = $year;

        return $this;
    }

    /**
     * @return Collection|EstimateRow[]
     * @Groups({"estimates_read", "estimates_subresource"})
     */
    public function getEstimateRows(): Collection
    {
        return $this->estimateRows;
    }

    public function addEstimateRow(EstimateRow $estimateRow): self
    {
        if (!$this->estimateRows->contains($estimateRow)) {
            $this->estimateRows[] = $estimateRow;
            $estimateRow->setEstimate($this);
        }

        return $this;
    }

    public function removeEstimateRow(EstimateRow $estimateRow): self
    {
        if ($this->estimateRows->removeElement($estimateRow)) {
            // set the owning side to null (unless already changed)
            if ($estimateRow->getEstimate() === $this) {
                $estimateRow->setEstimate(null);
            }
        }

        return $this;
    }

    public function getValidateAt(): ?\DateTimeInterface
    {
        return $this->validateAt;
    }

    public function setValidateAt(\DateTimeInterface $validateAt): self
    {
        $this->validateAt = $validateAt;

        return $this;
    }

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(string $object): self
    {
        $this->object = $object;

        return $this;
    }

    public function getDefinition(): ?string
    {
        return $this->definition;
    }

    public function setDefinition(?string $definition): self
    {
        $this->definition = $definition;

        return $this;
    }
}
