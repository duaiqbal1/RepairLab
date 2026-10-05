"""Lightweight hybrid GA–PSO optimizer for automated software repair research."""

from __future__ import annotations

from dataclasses import dataclass
import random
from typing import Callable, Iterable


@dataclass(frozen=True)
class PatchCandidate:
    """A candidate patch and its multi-objective measurements."""

    genes: tuple[int, ...]
    correctness: float
    complexity: float
    diff_size: float

    @property
    def fitness(self) -> float:
        return 0.6 * self.correctness - 0.25 * self.complexity - 0.15 * self.diff_size


class HybridRepairOptimizer:
    """A deterministic, dependency-free prototype suitable for FYP experiments.

    The evaluator should return values between 0 and 1 where correctness is maximized
    and complexity/diff_size are minimized.
    """

    def __init__(self, gene_count: int = 12, population_size: int = 24, generations: int = 50, seed: int = 42):
        if min(gene_count, population_size, generations) <= 0:
            raise ValueError("gene_count, population_size, and generations must be positive")
        self.gene_count = gene_count
        self.population_size = population_size
        self.generations = generations
        self.random = random.Random(seed)

    def _random_genes(self) -> list[int]:
        return [self.random.randint(0, 3) for _ in range(self.gene_count)]

    def _evaluate(self, genes: Iterable[int], evaluator: Callable[[tuple[int, ...]], tuple[float, float, float]] | None) -> PatchCandidate:
        vector = tuple(genes)
        if evaluator is None:
            correctness = sum(g == 1 for g in vector) / len(vector)
            complexity = sum(g > 1 for g in vector) / len(vector)
            diff_size = sum(g != 0 for g in vector) / len(vector)
        else:
            correctness, complexity, diff_size = evaluator(vector)
        values = (correctness, complexity, diff_size)
        if any(not 0 <= value <= 1 for value in values):
            raise ValueError("evaluator values must be between 0 and 1")
        return PatchCandidate(vector, *values)

    def run(self, evaluator: Callable[[tuple[int, ...]], tuple[float, float, float]] | None = None) -> list[PatchCandidate]:
        """Run GA exploration followed by PSO-style attraction toward elites."""
        population = [self._random_genes() for _ in range(self.population_size)]
        personal_best = [self._evaluate(genes, evaluator) for genes in population]
        global_best = max(personal_best, key=lambda candidate: candidate.fitness)

        for _ in range(self.generations):
            next_population: list[list[int]] = []
            ranked = sorted(personal_best, key=lambda candidate: candidate.fitness, reverse=True)
            elites = ranked[: max(2, self.population_size // 5)]
            for index in range(self.population_size):
                parent = list(self.random.choice(elites).genes)
                particle_best = personal_best[index].genes
                for gene_index in range(self.gene_count):
                    if self.random.random() < 0.35:
                        parent[gene_index] = particle_best[gene_index]
                    if self.random.random() < 0.25:
                        parent[gene_index] = global_best.genes[gene_index]
                    if self.random.random() < 0.08:
                        parent[gene_index] = self.random.randint(0, 3)
                next_population.append(parent)

            candidates = [self._evaluate(genes, evaluator) for genes in next_population]
            personal_best = [max((old, new), key=lambda candidate: candidate.fitness) for old, new in zip(personal_best, candidates)]
            global_best = max((*personal_best, global_best), key=lambda candidate: candidate.fitness)

        return sorted(personal_best, key=lambda candidate: candidate.fitness, reverse=True)


if __name__ == "__main__":
    optimizer = HybridRepairOptimizer()
    for rank, candidate in enumerate(optimizer.run()[:5], start=1):
        print(f"{rank}. fitness={candidate.fitness:.3f} genes={candidate.genes}")
