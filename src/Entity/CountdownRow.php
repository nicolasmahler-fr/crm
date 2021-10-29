<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CountdownRowRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CountdownRowRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  subresourceOperations={
 *      "countdownRows_get_subresource"={
 *          "normalization_context"={"groups"={"countdownRows_subresource"}}
 *     }
 *  },
 *  itemOperations={
 *      "GET", 
 *      "PUT", 
 *      "DELETE"
 *  },
 *  normalizationContext={
 *       "groups"={"countdownRows_read"}
 *   },
 *   denormalizationContext={
 *      "disable_type_enforcement"=true
 * }
 * )
 */
class CountdownRow
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"countdownRows_read", "countdowns_read", "countdowns_subresource", "countdownRows_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"countdownRows_read", "countdowns_read", "countdowns_subresource", "countdownRows_subresource"})
     * @Assert\Type(type="\DateTimeInterface", message="La date doit être au format YYYY-MM-DD")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"countdownRows_read", "countdowns_read", "countdowns_subresource", "countdownRows_subresource"})
     */
    private $task;

    /**
     * @ORM\Column(type="string", length=5)
     * @Groups({"countdownRows_read", "countdowns_read", "countdowns_subresource", "countdownRows_subresource"})
     */
    private $elapsed;

    /**
     * @Groups({"countdownRows_read"})
     * @ORM\ManyToOne(targetEntity=Countdown::class, inversedBy="countdownRows")
     * @ORM\JoinColumn(nullable=false)
     */
    private $countdown;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTask(): ?string
    {
        return $this->task;
    }

    public function setTask(string $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function getElapsed(): ?string
    {
        return $this->elapsed;
    }

    public function setElapsed(string $elapsed): self
    {
        $this->elapsed = $elapsed;

        return $this;
    }

    public function getCountdown(): ?Countdown
    {
        return $this->countdown;
    }

    public function setCountdown(?Countdown $countdown): self
    {
        $this->countdown = $countdown;

        return $this;
    }
}
