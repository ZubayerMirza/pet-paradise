document.addEventListener("DOMContentLoaded", function() {
    const petPlaceholder = document.getElementById("pet-placeholder");
    const buttonsContainer = document.getElementById("buttons-container");
    const hungerValue = document.getElementById("hunger-value");
    const foodQuantity = document.getElementById("food-value");
    const shopButton = document.getElementById("shop-button");
    const feedButton = document.getElementById("feed-button");
    const playButton = document.getElementById("play-button");
    const chatButton = document.getElementById("chat-button");

    let hungerLevel = 50;
    let food = 0;

    // Update hunger level display
    function updateHungerLevel() {
        hungerValue.textContent = hungerLevel;
    }

    // Update food quantity display
    function updateFoodQuantity() {
        foodQuantity.textContent = food;
    }

    // Buy food function
    function buyFood(price) {
        const quantity = parseInt(prompt("How much food do you want to buy?"));
        if (!isNaN(quantity) && quantity > 0) {
            const totalCost = quantity * price;
            if (confirm(`Are you sure you want to buy ${quantity} food for $${totalCost}?`)) {
                food += quantity;
                updateFoodQuantity();
            }
        }
    }

    // Feed function
    function feedFood() {
        if (food > 0) {
            if (confirm("Are you sure you want to feed your pet?")) {
                hungerLevel -= 10; // Decrease hunger level by 10
                if (hungerLevel < 0) {
                    hungerLevel = 0; // Ensure hunger level doesn't go below 0
                }
                updateHungerLevel();
                food--;
                updateFoodQuantity();
            }
        } else {
            alert("You don't have any food left. Please buy some from the shop.");
        }
    }

    // Event listener for shop button
    shopButton.addEventListener("click", function() {
        buttonsContainer.style.display = "flex";
        // Show buy food buttons
        document.querySelectorAll(".buy-food-button").forEach(button => {
            button.style.display = "block";
        });
    });

    // Event listener for feed button
    feedButton.addEventListener("click", function() {
        buttonsContainer.style.display = "flex";
        // Hide buy food buttons
        document.querySelectorAll(".buy-food-button").forEach(button => {
            button.style.display = "none";
        });
    });

    // Event listener for buy food buttons
    document.querySelectorAll(".buy-food-button").forEach(button => {
        button.addEventListener("click", function() {
            const price = parseInt(this.getAttribute("data-price"));
            buyFood(price);
        });
    });

    // Event listener for feed food button
    document.querySelector(".feed-food-button").addEventListener("click", function() {
        feedFood();
    });

    // Event listener for play button
    playButton.addEventListener("click", function() {
        alert("Yay! Let's play!");
    });

    // Event listener for chat button
    chatButton.addEventListener("click", function() {
        alert("Opening chat...");
    });

    // Initializations
    updateHungerLevel();
    updateFoodQuantity();
});

