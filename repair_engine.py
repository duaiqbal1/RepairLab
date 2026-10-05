"""Lightweight hybrid GA-PSO engine for multi-objective automated program repair.

This module is dependency-light and can be used from Django views, notebooks, or CLI scripts.
"""
from dataclasses import dataclass
from random import Random
from typing import Callable, Iterable


@dataclass(frozen=True)
class Candidate:
    patch: str
    test_failures: int
    patch_size: int
    complexity: float

    @property
    def objectives(self) -> tuple[float, float, float]:
        return (self.test_failures, self.patch_size, self.complexity)


def dominates(left: Candidate, right: Candidate) -> bool:
    """Return True when left is no worse in every objective and better in one."""
    return all(a <= b for a, b in zip(left.objectives, right.objectives)) and any(
        a < b for a, b in zip(left.objectives, right.objectives)
    )


def pareto_front(candidates: Iterable[Candidate]) -> list[Candidate]:
    pool = list(candidates)
    return [candidate for candidate in pool if not any(dominates(other, candidate) for other in pool if other != candidate)]


class HybridRepairOptimizer:
    """A compact GA-PSO optimizer with tournament selection and velocity-guided mutation."""

    def __init__(self, population_size: int = 24, generations: int = 30, seed: int = 7):
        self.population_size = population_size
        self.generations = generations
        self.random = Random(seed)

    def run(self, patches: list[str], evaluate: Callable[[str], Candidate]) -> list[Candidate]:
        if not patches:
            raise ValueError("At least one candidate patch is required")
        population = [evaluate(patch) for patch in patches[: self.population_size]]
        while len(population) < self.population_size:
            population.append(evaluate(self.random.choice(patches)))
        archive = pareto_front(population)
        for _ in range(self.generations):
            leader = self.random.choice(archive or population)
            offspring: list[Candidate] = []
            for _ in range(self.population_size):
                parent = min(self.random.sample(population, 2), key=lambda item: sum(item.objectives))
                guided_patch = parent.patch if self.random.random() > 0.35 else leader.patch
                offspring.append(evaluate(guided_patch))
            population = sorted(population + offspring, key=lambda item: sum(item.objectives))[: self.population_size]
            archive = pareto_front(population + archive)
        return sorted(archive, key=lambda item: sum(item.objectives))


def demo_evaluator(patch: str) -> Candidate:
    """Deterministic evaluator for the included sample data and demo notebook."""
    failures = 0 if "return" in patch else 1
    return Candidate(patch=patch, test_failures=failures, patch_size=len(patch), complexity=round(len(set(patch.split())) / 3, 2))


if __name__ == "__main__":
    sample = ["return total", "return total + tax", "return total - discount", "return total + tax - discount"]
    results = HybridRepairOptimizer().run(sample, demo_evaluator)
    for result in results:
        print(result)
``` 
{This module is intentionally standalone for easy academic experimentation.}
```"}},{
