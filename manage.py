#!/usr/bin/env python
"""Django command-line entry point for the RepairLab backend."""

import os
import sys


def main() -> None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "repairlab.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Install backend/requirements.txt before using manage.py") from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
