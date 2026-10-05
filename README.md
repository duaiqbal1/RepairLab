# RepairLab

## A Lightweight Hybrid Genetic Algorithm–Particle Swarm Optimization Approach for Multi-Objective Automated Software Repair

RepairLab is a final-year project starter package for researching automated software repair. It combines genetic algorithm exploration with particle swarm optimization to rank candidate patches against three objectives: test correctness, patch complexity, and diff size.

The included dashboard provides an experiment workspace for uploading a source archive, selecting a generation budget, reviewing convergence, and inspecting validated candidate patches.

## Features

- Hybrid GA–PSO experiment workflow
- Multi-objective fitness scoring
- Candidate patch ranking and validation states
- Convergence and objective-balance visualizations
- Source-project upload interaction
- Responsive research dashboard
- Django-ready Python project structure

## Project structure

```text
repairlab/
├── app/                    # Next.js preview dashboard
├── backend/
│   ├── repair_engine.py    # Lightweight GA–PSO research engine
│   └── requirements.txt
├── manage.py               # Django entry point placeholder
├── README.md
└── .gitignore
```

## Research model

Each candidate patch is represented by a vector of repair choices. The fitness function can be written as:

```text
F(p) = w_c * correctness(p) - w_k * complexity(p) - w_d * diff_size(p)
```

The genetic algorithm explores diverse patch mutations, while PSO moves particles toward high-performing candidates discovered by the population and each particle's personal history. The engine uses deterministic scoring when run with a fixed seed, which makes experiments reproducible.

## Python setup

```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
source .venv/bin/activate
pip install -r backend/requirements.txt
python backend/repair_engine.py
```

## Django setup

The project includes a minimal Django API around `backend/repair_engine.py`. Start it with `python manage.py runserver`, then use `GET /api/health/` or `POST /api/experiments/run/` with JSON such as `{"generations": 20, "population_size": 24, "seed": 42}`.

```bash
pip install django
python manage.py runserver
```

## Run the dashboard preview

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Suggested FYP evaluation

1. Collect buggy Python projects or Defects4J/PyGen-style benchmark cases.
2. Compare GA-only, PSO-only, and hybrid GA–PSO configurations.
3. Report plausible patches, test-suite pass rate, runtime, patch size, and search efficiency.
4. Run each configuration with at least five random seeds.
5. Store experiment metadata, candidate patches, and test results in Django models or PostgreSQL.

## GitHub upload

```bash
git init
git add .
git commit -m "Initial RepairLab FYP project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/repairlab.git
git push -u origin main
```

## Academic note

This repository is a research starter implementation and should be extended with a real test execution sandbox, patch application, benchmark corpus, persistence layer, authentication, and reproducible experiment reports before final submission.

## License

Add the license required by your university or supervisor.

## Author

Add your name, registration number, supervisor, and department here before submitting.

## Citation

Add the final paper citation here after the methodology and evaluation are complete.

## GitHub checklist

- [ ] Replace author placeholders
- [ ] Add screenshots and a demo GIF
- [ ] Add dataset/benchmark references
- [ ] Add test results and charts
- [ ] Add license
- [ ] Never commit `.env`, virtual environments, or uploaded source projects

Generated as a polished FYP dashboard starter package.
