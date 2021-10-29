<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CountdownRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CountdownRepository::class)
 * @ApiResource(
 * subresourceOperations={
 *      "api_customers_countdowns_get_subresource"={
 *          "normalization_context"={"groups"={"countdowns_subresource"}}
 *      }
 * },
 * itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE"
 * },
 * normalizationContext={
 *   "groups"={"countdown_read"}
 * },
 * denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 */
class Countdown
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $reference;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $credit;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="countdowns")
     * @Groups({"countdown_read"})
     */
    private $customer;

    /**
     * @ORM\OneToMany(targetEntity=CountdownRow::class, mappedBy="countdown")
     * @ApiSubresource
     */
    private $countdownRows;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $currentCredit;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $status;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"countdown_read", "customers_read", "countdowns_subresource", "countdownRows_read"})
     */
    private $date;

    public function __construct()
    {
        $this->countdownRows = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(?string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getCredit(): ?string
    {
        return $this->credit;
    }

    public function setCredit(string $credit): self
    {
        $this->credit = $credit;

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

    /**
     * @return Collection|CountdownRow[]
     * @Groups({"countdowns_read", "countdowns_subresource"})
     */
    public function getCountdownRows(): Collection
    {
        return $this->countdownRows;
    }

    public function addCountdownRow(CountdownRow $countdownRow): self
    {
        if (!$this->countdownRows->contains($countdownRow)) {
            $this->countdownRows[] = $countdownRow;
            $countdownRow->setCountdown($this);
        }

        return $this;
    }

    public function removeCountdownRow(CountdownRow $countdownRow): self
    {
        if ($this->countdownRows->removeElement($countdownRow)) {
            // set the owning side to null (unless already changed)
            if ($countdownRow->getCountdown() === $this) {
                $countdownRow->setCountdown(null);
            }
        }

        return $this;
    }

    public function getCurrentCredit(): ?string
    {
        return $this->currentCredit;
    }

    public function setCurrentCredit(?string $currentCredit): self
    {
        $this->currentCredit = $currentCredit;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }
}
