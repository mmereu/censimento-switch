# Censimento Apparati Attivi

Web app per il censimento degli switch di rete tramite interrogazione del database NeDi.

## Descrizione

Applicazione Flask che interroga il database MySQL di [NeDi](https://www.nedi.ch/) (Network Discovery) per estrarre l'inventario degli switch attivi sulla rete aziendale. Permette di cercare per rete/subnet e visualizzare in tabella tutti gli apparati con le relative informazioni tecniche.

### Funzionalita

- Ricerca per indirizzo di rete (es. `10.31.104.0`, `10.31.104.0/24`, `10.31.`)
- Tabella interattiva con ordinamento, filtro e paginazione (DataTables)
- Colorazione righe: verde per modelli S5735, rosso per gli altri
- Conteggio porte Up/Down per switch
- Rilevamento stack (numero di switch impilati)
- Estrazione intelligente del modello dal campo description di NeDi
- Export in CSV e Excel
- Pulsante Home per tornare alla dashboard principale

### Colonne visualizzate

| Colonna | Descrizione |
|---------|-------------|
| Nome Switch | Nome del dispositivo in NeDi |
| Marca | Vendor (es. Huawei) |
| Modello | Modello HW estratto dalla description |
| IP | Indirizzo IP del dispositivo |
| Seriale | Numero di serie |
| Posizione | Location configurata sul dispositivo |
| Stack | Numero di switch in stack |
| Porte Up | Porte fisiche attive |
| Porte Down | Porte fisiche inattive |

## Requisiti

- Python 3.8+
- Database NeDi (MySQL/MariaDB) raggiungibile dalla rete

## Installazione

```bash
pip install -r requirements.txt
```

### Dipendenze

- Flask
- PyMySQL
- openpyxl
- paramiko (solo per versione locale con SSH tunnel)

## Utilizzo

### Versione locale (con SSH tunnel)

```bash
python app.py
```

Accedi a `http://localhost:5005`

### Versione produzione (connessione MySQL diretta)

```bash
python app_prod.py
```

## Deploy

L'app e' deployata come servizio systemd sul server di produzione.

```bash
sudo systemctl start censimento-apparati
sudo systemctl status censimento-apparati
```

## Stack tecnologico

- **Backend**: Flask, PyMySQL, openpyxl
- **Frontend**: Bootstrap 5, DataTables.js, jQuery
- **Database**: NeDi MySQL (MariaDB 10.1)

---

# Active Equipment Census

Web app for network switch inventory via NeDi database queries.

## Description

A Flask application that queries the [NeDi](https://www.nedi.ch/) (Network Discovery) MySQL database to extract the inventory of active switches on the corporate network. It allows searching by network/subnet and displays all devices with their technical details in an interactive table.

### Features

- Search by network address (e.g. `10.31.104.0`, `10.31.104.0/24`, `10.31.`)
- Interactive table with sorting, filtering and pagination (DataTables)
- Row coloring: green for S5735 models, red for others
- Port Up/Down count per switch
- Stack detection (number of stacked switches)
- Smart model extraction from NeDi description field
- Export to CSV and Excel
- Home button to return to main dashboard

### Displayed columns

| Column | Description |
|--------|-------------|
| Switch Name | Device name in NeDi |
| Brand | Vendor (e.g. Huawei) |
| Model | HW model extracted from description |
| IP | Device IP address |
| Serial | Serial number |
| Location | Location configured on the device |
| Stack | Number of switches in stack |
| Ports Up | Active physical ports |
| Ports Down | Inactive physical ports |

## Requirements

- Python 3.8+
- NeDi database (MySQL/MariaDB) reachable on the network

## Installation

```bash
pip install -r requirements.txt
```

### Dependencies

- Flask
- PyMySQL
- openpyxl
- paramiko (local version only, for SSH tunnel)

## Usage

### Local version (with SSH tunnel)

```bash
python app.py
```

Access at `http://localhost:5005`

### Production version (direct MySQL connection)

```bash
python app_prod.py
```

## Deployment

The app is deployed as a systemd service on the production server.

```bash
sudo systemctl start censimento-apparati
sudo systemctl status censimento-apparati
```

## Tech stack

- **Backend**: Flask, PyMySQL, openpyxl
- **Frontend**: Bootstrap 5, DataTables.js, jQuery
- **Database**: NeDi MySQL (MariaDB 10.1)
