const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "speler.png";

let playerDirection = 1; // 1 voor rechts, -1 voor links

const player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    jumpPower: 12,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
};

const platforms = [
    {x: 0, y: canvas.height - 20, width: 200, height: 20, imageSrc: "platform.png"},
    {x: 150, y: canvas.height - 125, width: 200, height: 20, imageSrc: "platform.png" },
    {x: 0, y: canvas.height - 225, width: 200, height: 20, imageSrc: "platform.png"},
    {x: 300, y: canvas.height - 325, width: 200, height: 20, imageSrc: "platform.png"},
    {x: 300, y: canvas.height - 375, width: 50, height: 50, imageSrc: "draak.jpg" },// dit is de draak
    {x: 200, y: canvas.height - 20, width: canvas.width, height: 20, color: "rgba(0,0,0,0)" }, // dit is de dodezone
    {x: 0, y: canvas.height - 205, width: 170, height: 20, color: "red", imageSrc: "dood1.png" },// 2e dode zone
];

let isLeftButtonDown = false;
let isRightButtonDown = false;

let frameCount = 0; // Voeg de frameCount variabele toe

// Voeg een variabele toe om de grootte van de dode zone aan te geven
const deadZoneSize = 0.2; // Stel dit in op basis van je behoeften

function drawPlayer() {
    ctx.save();
    if (playerDirection === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(playerImage, -player.x - player.width, player.y, player.width, player.height);
    } else {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    }
    ctx.restore();
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color || "green";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        if (platform.imageSrc) {
            const platformImage = new Image();
            platformImage.src = platform.imageSrc;
            ctx.drawImage(platformImage, platform.x, platform.y, platform.width, platform.height);
        }
    }); 
}


function update() {
    frameCount++;

    // Update player position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Apply gravity
    player.velocityY += 0.5;

    // Check collisions with platforms
    platforms.forEach(platform => {
        if (
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            if (platform.color === "red" || platform.color === "rgb(230, 229, 229)" || platform.color === "rgba(0,0,0,0)") {
                resetGame();
            } else if (platform.imageSrc === "draak.jpg") {
                window.location.href = "level2/index2.html"; // Laad index2.html als de speler het draak-platform aanraakt
            } else {
                player.isJumping = false;
                player.velocityY = 0;
                player.y = platform.y - player.height;
            }
        }
    });

    // Beweeg de speler alleen als de knop-input buiten de dode zone valt
    if (isLeftButtonDown && player.velocityX > -player.speed * (1 - deadZoneSize)) {
        player.velocityX = -player.speed;
        playerDirection = 1; // Speler gaat naar links
    } else if (isRightButtonDown && player.velocityX < player.speed * (1 - deadZoneSize)) {
        player.velocityX = player.speed;
        playerDirection = -1; // Speler gaat naar rechts
    } else {
        player.velocityX = 0; // Binnen de dode zone, stop met bewegen
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawPlayer();
    drawPlatforms();
    requestAnimationFrame(update);
}


function resetGame() {
    player.x = 50;
    player.y = canvas.height - 100;
    player.velocityX = 0;
    player.velocityY = 0;
    frameCount = 0;
}

// Event listeners voor schermknoppen
// ... (voorgaande event listeners voor schermknoppen blijven hetzelfde)

// Roep de update-functie aan nadat de speler-afbeelding is geladen
playerImage.onload = () => {
    update();
};

// Keyboard input handling
// ... (voorgaande keyboard input handling blijft hetzelfde)

// Event listeners voor touch input
// ... (voorgaande event listeners voor touch blijven hetzelfde)


leftButton.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isLeftButtonDown = true;
    isRightButtonDown = false;
});

leftButton.addEventListener("mouseup", (event) => {
    event.preventDefault();
    isLeftButtonDown = false;
});

rightButton.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isRightButtonDown = true;
    isLeftButtonDown = false;
});

rightButton.addEventListener("mouseup", (event) => {
    event.preventDefault();
    isRightButtonDown = false;
});

// Roep de update-functie aan nadat de speler-afbeelding is geladen
playerImage.onload = () => {
    update();
    platforms.forEach(platform => {
        if (platform.imageSrc) {
            const platformImage = new Image();
            platformImage.src = platform.imageSrc;
        }
    });
};

// Keyboard input handling
const keyState = {};
window.addEventListener("keydown", (event) => {
    keyState[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    keyState[event.key] = false;
});

jumpButton.addEventListener("mousedown", (event) => {
    event.preventDefault();
    if (!player.isJumping) {
        player.velocityY = -player.jumpPower;
        player.isJumping = true;
    }
});

// ... (voorgaande event listeners voor schermknoppen blijven hetzelfde)

leftButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    isLeftButtonDown = true;
    isRightButtonDown = false;
});

leftButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    isLeftButtonDown = false;
});

rightButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    isRightButtonDown = true;
    isLeftButtonDown = false;
});

rightButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    isRightButtonDown = false;
});

jumpButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    if (!player.isJumping) {
        player.velocityY = -player.jumpPower;
        player.isJumping = true;
    }
});

// ... (voorgaande event listeners voor touch blijven hetzelfde)
