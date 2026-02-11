document.addEventListener("DOMContentLoaded", function () {
    var networkInput = document.getElementById("networkInput");
    var searchForm = document.getElementById("searchForm");
    var loadingSpinner = document.getElementById("loadingSpinner");
    var resultsSection = document.getElementById("resultsSection");
    var resultsBody = document.getElementById("resultsBody");
    var resultCount = document.getElementById("resultCount");
    var alertContainer = document.getElementById("alertContainer");
    var alertText = document.getElementById("alertText");
    var btnExportCsv = document.getElementById("btnExportCsv");
    var btnExportExcel = document.getElementById("btnExportExcel");

    var dataTable = null;
    var lastNetwork = "";

    // Ricerca
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var network = networkInput.value.trim();
        if (!network) {
            showError("Inserisci un indirizzo di rete.");
            return;
        }
        doSearch(network);
    });

    // Esempi cliccabili
    document.querySelectorAll(".example-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var network = this.getAttribute("data-network");
            networkInput.value = network;
            doSearch(network);
        });
    });

    // Export CSV
    btnExportCsv.addEventListener("click", function () {
        if (lastNetwork) {
            window.location = "/api/export/csv?network=" + encodeURIComponent(lastNetwork);
        }
    });

    // Export Excel
    btnExportExcel.addEventListener("click", function () {
        if (lastNetwork) {
            window.location = "/api/export/excel?network=" + encodeURIComponent(lastNetwork);
        }
    });

    function doSearch(network) {
        hideError();
        showLoading(true);
        resultsSection.style.display = "none";
        lastNetwork = network;

        fetch("/api/search?network=" + encodeURIComponent(network))
            .then(function (response) {
                if (!response.ok) {
                    return response.json().then(function (data) {
                        throw new Error(data.error || "Errore nella ricerca");
                    });
                }
                return response.json();
            })
            .then(function (data) {
                showLoading(false);
                renderResults(data);
            })
            .catch(function (err) {
                showLoading(false);
                showError(err.message || "Errore di connessione al server.");
            });
    }

    function renderResults(data) {
        var items = data.switches || [];
        resultCount.textContent = items.length;

        // Distruggi DataTable precedente
        if (dataTable) {
            dataTable.destroy();
            dataTable = null;
        }

        resultsBody.innerHTML = "";

        if (items.length === 0) {
            resultsSection.style.display = "block";
            resultsBody.innerHTML =
                '<tr><td colspan="9" class="text-center text-muted">Nessun risultato trovato.</td></tr>';
            return;
        }

        items.forEach(function (item) {
            var tr = document.createElement("tr");
            var modello = item.modello || "";
            var isS5735 = modello.indexOf("S5735") === 0;
            var colorClass = isS5735 ? "row-green" : "row-red";
            tr.className = colorClass;
            var up = item.porte_up || 0;
            var down = item.porte_down || 0;
            var stack = item.n_stack || 1;
            var stackBadge = stack > 1
                ? '<span class="badge bg-info">' + stack + 'x</span>'
                : '<span class="badge bg-secondary">1</span>';
            tr.innerHTML =
                "<td>" + esc(item.nome || "") + "</td>" +
                "<td>" + esc(item.marca || "") + "</td>" +
                "<td><strong>" + esc(modello) + "</strong></td>" +
                "<td><code>" + esc(item.ip || "") + "</code></td>" +
                "<td>" + esc(item.seriale || "") + "</td>" +
                "<td>" + esc(item.posizione || "") + "</td>" +
                "<td>" + stackBadge + "</td>" +
                '<td><span class="badge bg-success">' + up + "</span></td>" +
                '<td><span class="badge bg-danger">' + down + "</span></td>";
            resultsBody.appendChild(tr);
        });

        resultsSection.style.display = "block";

        // Inizializza DataTables
        dataTable = $("#resultsTable").DataTable({
            language: {
                search: "Filtra:",
                lengthMenu: "Mostra _MENU_ risultati",
                info: "Risultati _START_-_END_ di _TOTAL_",
                infoEmpty: "Nessun risultato",
                infoFiltered: "(filtrati da _MAX_ totali)",
                paginate: { previous: "Prec", next: "Succ" },
                zeroRecords: "Nessun risultato trovato"
            },
            pageLength: 25,
            order: [[2, "asc"]],
            destroy: true
        });
    }

    function showLoading(visible) {
        loadingSpinner.style.display = visible ? "block" : "none";
    }

    function showError(msg) {
        alertText.textContent = msg;
        alertContainer.style.display = "block";
    }

    function hideError() {
        alertContainer.style.display = "none";
    }

    function esc(str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
});
