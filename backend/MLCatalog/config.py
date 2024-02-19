""" Development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# File Upload to var/uploads/
ROOT = pathlib.Path(__file__).resolve().parent.parent

# Database file is var/db.sqlite3
DATABASE_FILENAME = ROOT/'var'/'db.sqlite3'