<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CountdownRowRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=CountdownRowRepository::class)
 */
class CountdownRow
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $task;

    /**
     * @ORM\Column(type="time")
     */
    private $elapsed;

    /**
     * @ORM\ManyToOne(targetEntity=Countdown::class, inversedBy="countdownRows")
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

    public function getElapsed(): ?\DateTimeInterface
    {
        return $this->elapsed;
    }

    public function setElapsed(\DateTimeInterface $elapsed): self
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
