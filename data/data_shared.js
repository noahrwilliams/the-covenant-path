// GLOBAL CONTAINERS
window.scenes = {}; 
window.STARTING_STATS = {};

// GAME CONSTANTS
window.MAX_STAT = 20;
window.COVENANT_STEPS = ["Knowledge", "Prayer to Seek Guidance", "Spiritual Confirmation", "Faith", "Repentance", "Baptism", "Gift of the Holy Ghost"];

// STORY DEFINITIONS (THE MENU)
window.STORIES = [
    {
        id: "exodus",
        title: "The Lehite Exodus",
        ref: "1 Nephi 2 – 18",
        description: "Jerusalem is ripe for destruction. Commanded by the Lord, the prophet Lehi flees into the wilderness with his family. Over eight years, they must retrieve the Brass Plates, survive starvation, build a ship, and cross the great deep to a Promised Land.",
        characters: ["Nephi", "Sariah"] // Must match keys in STARTING_STATS
    },
    {
        id: "division",
        title: "The Great Division",
        ref: "2 Nephi 1 – 5",
        description: "The family has arrived in the Promised Land, but peace is short-lived. As Lehi approaches death, old wounds reopen. The believers must make a heartbreaking choice: flee their brethren to establish a temple and a new society, or stay and perish.",
        characters: [] // Coming soon
    }
];

// ASSETS
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
        "wilderness": "https://placehold.co/750x300/8e44ad/FFF?text=Wilderness+Valley",
        "laban_house": "https://placehold.co/750x300/2c3e50/FFF?text=Jerusalem+Night+(Laban)",
        "ship_deck": "https://placehold.co/750x300/2980b9/FFF?text=The+Ship+Deck",
        "promised_land": "https://placehold.co/750x300/27ae60/FFF?text=The+Promised+Land",
        "vision_room": "https://placehold.co/750x300/FFF/000?text=Vision+of+Light"
    }
};