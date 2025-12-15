// GLOBAL CONTAINERS
window.scenes = {}; 
window.STARTING_STATS = {};

// GAME CONSTANTS
window.MAX_STAT = 20;
window.COVENANT_STEPS = ["Knowledge", "Prayer to Seek Guidance", "Spiritual Confirmation", "Faith", "Repentance", "Baptism", "Gift of the Holy Ghost"];

// STORY DEFINITIONS
window.STORIES = [
    {
        id: "exodus",
        title: "The Lehite Exodus",
        ref: "1 Nephi 1 – 18",
        narrative: "A family is commanded to flee their doomed city and retrieve sacred records, testing their obedience against fear and logic.",
        characters: ["Nephi", "Sariah"] 
    },
    {
        id: "division",
        title: "The Great Division",
        ref: "1 Nephi 19 – 2 Nephi 5",
        narrative: "Upon arriving in the new land, the family fractures into two nations, forcing believers to choose between tradition and revelation.",
        characters: ["Nephi_S2", "WifeOfNephi", "Zoram"]
    },
    { id: "vineyard", title: "The Vineyard", ref: "2 Nephi 6 – Jacob 7", narrative: "Jacob uses the scriptures to combat the rising wealth, pride, and the anti-christ Sherem.", characters: [] },
    { id: "decline", title: "The Declining Generations", ref: "Enos – Words of Mormon", narrative: "Solitary prophets struggle to preserve the records and eventually lead the righteous to Zarahemla.", characters: [] },
    { id: "king_covenant", title: "The King’s Covenant", ref: "Mosiah 1–6", narrative: "King Benjamin gathers his people to account for his stewardship and invites them to take upon themselves the name of Christ.", characters: [] },
    { id: "zeniff", title: "The Record of Zeniff", ref: "Mosiah 7–17", narrative: "An over-zealous group returns to the land of Nephi and falls into bondage, while Abinadi confronts King Noah.", characters: [] },
    { id: "escape", title: "The Great Escape", ref: "Mosiah 18–24", narrative: "Two groups of believers—Alma’s converts and Limhi’s people—must rely on the Lord to deliver them from separate bondages.", characters: [] },
    { id: "conversion", title: "The Conversion", ref: "Mosiah 25 – Alma 3", narrative: "The church faces persecution from the rising generation, culminating in the miraculous conversion of Alma.", characters: [] },
    { id: "high_priest", title: "The High Priest", ref: "Alma 4–16", narrative: "Alma resigns the judgment seat to preach pure testimony against pride, facing the ultimate rejection in Ammonihah.", characters: [] },
    { id: "lamanite_mission", title: "The Lamanite Mission", ref: "Alma 17–27", narrative: "The Sons of Mosiah risk death to preach to their enemies, resulting in the conversion of the Anti-Nephi-Lehis.", characters: [] },
    { id: "word_power", title: "The Power of the Word", ref: "Alma 28–35", narrative: "Alma battles the philosophy of Korihor and leads a mission to the Zoramites to teach worship of the heart.", characters: [] },
    { id: "liberty", title: "The Title of Liberty", ref: "Alma 36–52", narrative: "Captain Moroni rallies the free men against the treachery of Amalickiah, fighting for their religion, freedom, and families.", characters: [] },
    { id: "stripling", title: "The Stripling Warriors", ref: "Alma 53–63", narrative: "While the government crumbles, 2,000 young warriors turn the tide of war through exact obedience and faith.", characters: [] },
    { id: "secret_combo", title: "The Secret Combination", ref: "Helaman 1–12", narrative: "The Gadianton robbers take over the government, and Nephi invokes a famine to humble the people.", characters: [] },
    { id: "prophecy", title: "The Prophecy", ref: "Helaman 13 – 3 Nephi 7", narrative: "Samuel the Lamanite prophesies from the wall, dividing the people into believers and murderers as the sign approaches.", characters: [] },
    { id: "darkness", title: "The Night of Darkness", ref: "3 Nephi 8–10", narrative: "The prophesied destruction hits, leaving the survivors broken and ready for the Light.", characters: [] },
    { id: "visitation", title: "The Visitation", ref: "3 Nephi 11–26", narrative: "The Resurrected Lord descends to minister one-by-one, establishing His church and healing the people.", characters: [] },
    { id: "zion", title: "The Zion Society", ref: "3 Nephi 27 – 4 Nephi", narrative: "Generations live in perfect peace and consecration, until pride and class distinctions slowly fracture the utopia.", characters: [] },
    { id: "jared", title: "The Brother of Jared", ref: "Ether 1–15", narrative: "The Jaredites flee the Tower of Babel, cross the ocean in barges, and eventually destroy themselves.", characters: [] },
    { id: "last_man", title: "The Last Man", ref: "Mormon 1 – Moroni 10", narrative: "Mormon leads a fallen people who have lost the Spirit, and Moroni wanders alone to seal up the record.", characters: [] }
];

// ASSETS
window.ASSETS = {
    characters: {
        "Nephi": "https://placehold.co/140x180/5d737e/FFF?text=Nephi",
        "Nephi_S2": "https://placehold.co/140x180/5d737e/FFF?text=Nephi",
        "Sariah": "https://placehold.co/140x180/8c7e5d/FFF?text=Sariah",
        "WifeOfNephi": "https://placehold.co/140x180/8c7e5d/FFF?text=Wife+of+Nephi",
        "Zoram": "https://placehold.co/140x180/5d737e/FFF?text=Zoram",
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
        "settlement": "https://placehold.co/750x300/6d5e41/FFF?text=Settlement",
        "vision_room": "https://placehold.co/750x300/FFF/000?text=Vision+of+Light"
    }
};

// DEFAULT STARTING STATS FOR STORY 1 (The Lehite Exodus)
window.STARTING_STATS["Nephi"] = { 
    faith: 12, unity: 8, worldly_influence: 0, knowledge: 5, 
    hasBrassPlates: true, initialScene: "nephi_intro",
    bio: "The dutiful son, constantly seeking guidance from the Spirit and diligently working to preserve the records."
};
window.STARTING_STATS["Sariah"] = { 
    faith: 10, unity: 10, worldly_influence: 5, knowledge: 5, 
    hasBrassPlates: true, initialScene: "sariah_intro",
    bio: "The mother, deeply worried about her sons, whose faith is tested by the realities of the wilderness."
};


// DEFAULT STARTING STATS FOR STORY 2 (The Great Division)
window.STARTING_STATS["Nephi_S2"] = { 
    faith: 12, unity: 8, worldly_influence: 0, knowledge: 5, 
    hasBrassPlates: true, initialScene: "s2_nephi_intro",
    bio: "The spiritual leader of the group. He carries the burden of the plates and the responsibility to lead those who will follow."
};
window.STARTING_STATS["WifeOfNephi"] = { 
    faith: 10, unity: 12, worldly_influence: 2, knowledge: 3, 
    hasBrassPlates: true, initialScene: "s2_wife_intro",
    bio: "One of Ishmael's daughters. She bears the emotional weight of the family schism, trying to maintain the 'manner of happiness' amidst sorrow."
};
window.STARTING_STATS["Zoram"] = { 
    faith: 6, unity: 10, worldly_influence: 5, knowledge: 2, 
    hasBrassPlates: true, initialScene: "s2_zoram_intro",
    bio: "A former servant of Laban. He values loyalty and freedom, but struggles with the conflict between his oath to Nephi and his friendships with Laman's family."
};