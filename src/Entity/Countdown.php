<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CountdownRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=CountdownRepository::class)
 */
class Countdown
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $reference;

    /**
     * @ORM\Column(type="time")
     */
    private $credit;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="countdowns")
     */
    private $customer;

    /**
     * @ORM\OneToMany(targetEntity=CountdownRow::class, mappedBy="countdown")
     */
    private $countdownRows;

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

    public function getCredit(): ?\DateTimeInterface
    {
        return $this->credit;
    }

    public function setCredit(\DateTimeInterface $credit): self
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
}
