import json

from django.http import JsonResponse
from django.urls import path

from backend.repair_engine import HybridRepairOptimizer


def health(request):
    return JsonResponse({"status": "ok", "service": "RepairLab", "engine": "GA-PSO v1.0"})


def run_experiment(request):
    if request.method != "POST":
        return JsonResponse({"error": "Use POST for experiments."}, status=405)
    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Request body must be valid JSON."}, status=400)

    optimizer = HybridRepairOptimizer(
        gene_count=max(1, min(int(payload.get("gene_count", 12)), 100)),
        population_size=max(2, min(int(payload.get("population_size", 24)), 200)),
        generations=max(1, min(int(payload.get("generations", 20)), 500)),
        seed=int(payload.get("seed", 42)),
    )
    candidates = optimizer.run()[:5]
    return JsonResponse({
        "candidates": [
            {"rank": rank, "genes": candidate.genes, "correctness": candidate.correctness,
             "complexity": candidate.complexity, "diff_size": candidate.diff_size,
             "fitness": round(candidate.fitness, 4)}
            for rank, candidate in enumerate(candidates, start=1)
        ]
    })


urlpatterns = [path("api/health/", health), path("api/experiments/run/", run_experiment)]
