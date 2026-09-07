const BACKEND_URL = "http://127.0.0.1:5000/inspect";

document.getElementById("inspectBtn").addEventListener("click", runInspection);
document.getElementById("domainInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") runInspection();
});

async function runInspection() {
  const input = document.getElementById("domainInput").value.trim();
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const results = document.getElementById("results");

  if (!input) return;

  // Reset states
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  results.classList.add("hidden");

  try {
    const response = await fetch(`${BACKEND_URL}?domain=${encodeURIComponent(input)}`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    loading.classList.add("hidden");

    // Populate Results
    document.getElementById("resDomain").textContent = data.domain || input;

    // RDAP Section
    if (data.rdap && data.rdap.status === "success") {
      document.getElementById("rdapStatus").textContent = "Found";
      document.getElementById("rdapCreated").textContent = data.rdap.creation_date || "Unknown";
      document.getElementById("rdapHandle").textContent = data.rdap.handle || "N/A";
    } else {
      document.getElementById("rdapStatus").textContent = "Not Found / Error";
      document.getElementById("rdapCreated").textContent = "-";
      document.getElementById("rdapHandle").textContent = "-";
    }

    // DNS Section
    const dnsList = document.getElementById("dnsList");
    dnsList.innerHTML = "";
    if (data.dns && data.dns.status === "success" && data.dns.answers.length > 0) {
      data.dns.answers.forEach((ans) => {
        const li = document.createElement("li");
        li.textContent = `${ans.name} ➔ ${ans.data} (TTL: ${ans.TTL})`;
        dnsList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No A records returned";
      dnsList.appendChild(li);
    }

    results.classList.remove("hidden");
  } catch (err) {
    loading.classList.add("hidden");
    error.textContent = `Failed to connect to backend: ${err.message}`;
    error.classList.remove("hidden");
  }
}