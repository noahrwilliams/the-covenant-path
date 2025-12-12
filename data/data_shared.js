// GLOBAL CONTAINERS
window.scenes = {}; 
window.STARTING_STATS = {};

// CONSTANTS
window.MAX_STAT = 20;
window.COVENANT_STEPS = ["Knowledge", "Prayer to Seek Guidance", "Spiritual Confirmation", "Faith", "Repentance", "Baptism", "Gift of the Holy Ghost"];

// ASSETS
// To use local images, put them in the "assets" folder and change these links to: "assets/filename.jpg"
window.ASSETS = {
    characters: {
        "Nephi": "https://placehold.co/140x180/5d737e/FFF?text=Nephi",
        "Sariah": "https://placehold.co/140x180/8c7e5d/FFF?text=Sariah",
        "Lehi": "https://placehold.co/100x100/6d5e41/FFF?text=Lehi",
        "Laman": "https://placehold.co/100x100/963838/FFF?text=Laman",
        "Lemuel": "https://placehold.co/100x100/9e6b38/FFF?text=Lemuel",
        "Sam": "https://placehold.co/100x100/5d737e/FFF?text=Sam"
    },
    backgrounds: {
        "jerusalem_street": "https://placehold.co/750x300/d4c5a9/333?text=Jerusalem+Streets",
        "jerusalem_night": "https://placehold.co/750x300/2c3e50/FFF?text=Jerusalem+Night",
        "house_interior": "https://placehold.co/750x300/5e4b35/FFF?text=House+Interior",
        "desert_gates": "https://placehold.co/750x300/c0392b/FFF?text=City+Gates",
        "vision_room": "https://placehold.co/750x300/FFF/000?text=Vision+of+Light"
    }
};