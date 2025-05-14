document.addEventListener('DOMContentLoaded', () => {
    const url_input = document.querySelector('.url-input');
    const name_input = document.querySelector('.name-input');
    const generate_btn = document.querySelector('.generate');
    const result_text = document.querySelector('.result');

    async function createURL(url, name) {
        console.log("Starting request with:", url, name);
        try {
            const response = await fetch('http://localhost:2558/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    url: url, 
                    shorten_name: name 
                })
            });

            console.log("Response status:", response.status);
            
            const result = await response.json();
            
            if (response.ok) {
                result_text.textContent = `Shortened URL: http://localhost:2558/${result.shorter_version}`;
            } else {
                result_text.textContent = `Error: ${result.error || 'Unknown error'}`;
            }
        } catch (err) {
            console.error("Fetch error:", err);
            result_text.textContent = `Connection error: ${err.message}`;
        }
    }

    generate_btn.addEventListener("click", (e) => {
        e.preventDefault();
        const url = url_input.value.trim();
        const name = name_input.value.trim();

        if (!url) {
            result_text.textContent = "Please enter a URL.";
            return;
        }

        createURL(url, name);
    });
});