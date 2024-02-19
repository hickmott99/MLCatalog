""" Development configuration."""
import pathlib

APPLICATION_ROOT = '/'
ROOT = pathlib.Path(__file__).resolve().parent.parent
DATABASE_FILENAME = ROOT/'var'/'db.sqlite3'