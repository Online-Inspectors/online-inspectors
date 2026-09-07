document.getElementById('scanBtn').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = "Scanning...";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) {
      resultDiv.innerText = "Error: Cannot read active tab URL.";
      return;
    }

    const url = new URL(tab.url);
    if (!url.protocol.startsWith('http')) {
      resultDiv.innerText = "Error: Cannot inspect non-web pages.";
      return;
    }

    const domain = url.hostname;
    const response = await fetch(`http://127.0.0.1:5000/inspect?domain=${domain}`);
    const data = await response.json();

    if (response.ok) {
      const creation = data.rdap?.creation_date || "Unknown";
      resultDiv.innerText = `Domain: ${data.domain}\nCreated: ${creation}\nDNS Status: ${data.dns?.status}`;
    } else {
      resultDiv.innerText = `Error: ${data.error || 'Server error'}`;
    }
  } catch (err) {
    resultDiv.innerText = `Failed to connect to backend: ${err.message}`;
  }
});