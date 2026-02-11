"""Configurazione connessione MySQL via SSH tunnel al server NeDi."""

import os
from dotenv import load_dotenv

load_dotenv()

SSH_CONFIG = {
    "ssh_host": os.getenv("SSH_HOST", "127.0.0.1"),
    "ssh_port": int(os.getenv("SSH_PORT", "22")),
    "ssh_username": os.getenv("SSH_USER", "root"),
    "ssh_pkey": os.getenv("SSH_PKEY", ""),
}

MYSQL_CONFIG = {
    "host": "127.0.0.1",
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "nedi"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "nedi"),
    "charset": "utf8mb4",
}
