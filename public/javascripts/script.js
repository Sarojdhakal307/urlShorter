async function shortenUrl() {
    const urlInput = document.getElementById('urlInput').value;
    try {
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        });
        const data = await response.json();
        document.getElementById('shortUrl').innerText = data.shortUrl;
    } catch (error) {
        console.error('Error shortening URL:', error);
    }
}
