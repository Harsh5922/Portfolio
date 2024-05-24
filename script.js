document.addEventListener('DOMContentLoaded', () => {
    // Terminal Functionality
    const inputField = document.getElementById('input');
    const outputField = document.getElementById('output');

    const commands = {
        'help': 'Available commands:\n' +
        'help - Display available commands\n' +
        'ls - List the pages you can navigate to\n' +
        'cd [section] - Change the webpage\n' +
        'clear - Clear the terminal',
        'ls': '"home", "projects", "experience", "connect"',
        'home': 'This is the home directory. Use "ls" to list available sections.',
        'projects': 'This is the projects section. Here you will find various projects I have worked on.',
        'experience': 'This is the about section. Here you will find information about me.',
        'connect': 'This is the contact section. Here you will find ways to contact me.',
        'clear': ''
    };

    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputField.value.trim();
            inputField.value = '';
            outputField.innerHTML += `>${command}\n`;

            if (command === 'clear') {
                outputField.innerHTML = '';
            } else if (command === 'cd projects') {
                window.location.href = 'projects.html'; 
            } else if (command === 'cd experience') {
                window.location.href = 'experience.html'; 
            } else if (command === 'cd home') {
                window.location.href = 'index.html';
            } else if (command === 'cd connect') {
                window.location.href = 'connect.html';
            } else if (commands[command]) {
                outputField.innerHTML += `${commands[command]}\n`;
            } else {
                outputField.innerHTML += `Command not found: ${command}\n`;
            }

            outputField.scrollTop = outputField.scrollHeight;
        }
    });

    // Matrix Effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - taken from the original Matrix movie
    const letters = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレヲオコソトノホモヨロ0123456789';
    const fontSize = 16;
    const columns = canvas.width / fontSize; // number of columns for the rain
    const drops = [];

    // Initialize drops array
    for (let x = 0; x < columns; x++) {
        drops[x] = 1; // y-coordinate
    }

    // Draw function
    function draw() {
        // Black BG for the canvas, with slight transparency to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = fontSize + 'px monospace';

        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            // Random letter to print
            const text = letters[Math.floor(Math.random() * letters.length)];

            // x = i * fontSize, y = value of drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Sending the drop back to the top randomly after it has crossed the screen
            // Adding randomness to the reset to make the drops scattered on the Y-axis
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Incrementing Y-coordinate
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
