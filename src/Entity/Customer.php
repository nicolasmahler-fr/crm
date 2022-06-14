<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CustomerRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  subresourceOperations={
 *      "invoices_get_subresource"={
 *          "path"="/client/{id}/factures"
 *      }
 *  },
 *  itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE"
 *  },
 *  normalizationContext={
 *      "groups"={"customers_read"}
 *  },
 *denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 * @ApiFilter(
 *  SearchFilter::class, properties={
 *      "firstName":"partial", 
 *      "lastName", 
 *      "company"
 *  }
 * )
 * @ApiFilter(
 *  OrderFilter::class
 * )
 * @UniqueEntity("email")
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     * @Assert\NotBlank(message="Le prénom est obligatoire")
     * @Assert\Length(
     *      min=3, minMessage="Le prénom doit faire entre 3 caractères et 255 caractères",
     *      max=255, maxMessage="Le prénom ne peut excéder 255 caractères"
     * )
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     * @Assert\NotBlank(message="Le nom de famille est obligatoire")
     * @Assert\Length(
     *      min=3, minMessage="Le nom de famille doit faire entre 3 caractères et 255 caractères",
     *      max=255, maxMessage="Le nom de famille ne peut excéder 255 caractères"
     * )
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     * @Assert\NotBlank(message="L'email est obligatoire")
     * @Assert\Email(message="L'adresse email doit être valide")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="customer")
     * @Groups({"customers_read"})
     * @ApiSubresource
     */
    private $invoices;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="customers")
     * @Groups({"customers_read"})
     * @Assert\NotBlank(message="L'utilisateur est obligatoire")
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $address1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $address2;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     * @Assert\Type(type="numeric", message="Le code postal doit être numérique")
     */
    private $postcode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read", "estimates_read", "countdown_read"})
     */
    private $country;

    /**
     * @ORM\OneToMany(targetEntity=Countdown::class, mappedBy="customer")
     */
    private $countdowns;

    /**
     * @ORM\OneToMany(targetEntity=Estimate::class, mappedBy="customer")
     */
    private $estimates;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
        $this->countdowns = new ArrayCollection();
        $this->estimates = new ArrayCollection();
    }

    /**
     * Total des invoices
     * @Groups({"customers_read"})
     * @return float
     */
    public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + $invoice->getAmount();
        }, 0);
    }

    /**
     * Total des invoices unpaid
     * @Groups({"customers_read"})
     * @return float
     */
    public function getUnpaidAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + ($invoice->getStatus() === 'PAID' || $invoice->getStatus() === 'CANCELLED' ? 0 : $invoice->getAmount());
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1(?string $address1): self
    {
        $this->address1 = $address1;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2(?string $address2): self
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getPostcode(): ?int
    {
        return $this->postcode;
    }

    public function setPostcode(?int $postcode): self
    {
        $this->postcode = (int)$postcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return Collection|Countdown[]
     */
    public function getCountdowns(): Collection
    {
        return $this->countdowns;
    }

    public function addCountdown(Countdown $countdown): self
    {
        if (!$this->countdowns->contains($countdown)) {
            $this->countdowns[] = $countdown;
            $countdown->setCustomer($this);
        }

        return $this;
    }

    public function removeCountdown(Countdown $countdown): self
    {
        if ($this->countdowns->removeElement($countdown)) {
            // set the owning side to null (unless already changed)
            if ($countdown->getCustomer() === $this) {
                $countdown->setCustomer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Estimate[]
     */
    public function getEstimates(): Collection
    {
        return $this->estimates;
    }

    public function addEstimate(Estimate $estimate): self
    {
        if (!$this->estimates->contains($estimate)) {
            $this->estimates[] = $estimate;
            $estimate->setCustomer($this);
        }

        return $this;
    }

    public function removeEstimate(Estimate $estimate): self
    {
        if ($this->estimates->removeElement($estimate)) {
            // set the owning side to null (unless already changed)
            if ($estimate->getCustomer() === $this) {
                $estimate->setCustomer(null);
            }
        }

        return $this;
    }
}
