// NEPHI STARTING STATS (Nerfed Faith to make early game harder)
window.STARTING_STATS["Nephi"] = { 
    faith: 8, unity: 8, worldly_influence: 0, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_nephi" 
};

// NEPHI SCENES - COMPLETE ARC (Harder Balance)
Object.assign(window.scenes, {
    
    // --- PART 1: JERUSALEM ---
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. You see your father, Lehi, shouting to the people. Laman and Lemuel look embarrassed and angry.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        choices: [
            { text: "Approach your father and stand by his side.", nextScene: "stand_by_father_nephi", effect: { faith: 1, unity: -2, worldly: -2 }, feedback: "You stand with Lehi. The crowd mocks you. (See 1 Nephi 1:18)" },
            { text: "Pull Laman and Lemuel aside to calm them down.", nextScene: "calm_brothers_nephi", effect: { faith: -2, unity: 2, worldly: 2 }, feedback: "You appease your brothers, but your silence feels like betrayal. (See 1 Nephi 2:11)" },
            { text: "Go home and pray for understanding.", nextScene: "secret_prayer_nephi", effect: { faith: 3, unity: -1, worldly: -2 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You slip away to kneel. (See 1 Nephi 2:16)" }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi says, 'We must leave Jerusalem.' He asks you to help him pack provisions, but you had plans to meet friends.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        choices: [
            { text: "Obey immediately without question.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 1, worldly: -1 }, feedback: "Your obedience strengthens your character. (See 1 Nephi 2:3)" },
            { text: "Ask him to explain the vision first.", nextScene: "wilderness_valley", effect: { faith: 2, unity: 0, worldly: 0 }, feedback: "Lehi explains. Your understanding deepens. (See 1 Nephi 1:13)" }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs. 'He will lose us our inheritance!' Lehi returns home and announces you must all leave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Defend your father against Laman's insults.", nextScene: "wilderness_valley", effect: { faith: 1, unity: -4, worldly: 0 }, feedback: "You speak up, sparking a bitter argument. Unity suffers. (See 1 Nephi 2:12)" },
            { text: "Stay silent and gather your things.", nextScene: "wilderness_valley", effect: { faith: -1, unity: 0, worldly: 2 }, feedback: "You keep the peace, but feel cowardly." }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone in your room. You desire to know if your father's words are true.",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Pour out your soul to God (Seeking Confirmation).", nextScene: "vision_confirmation_nephi", effect: { faith: 3, unity: 0, worldly: -3 }, covenantUnlock: "Spiritual Confirmation", feedback: "A sensation of pure light fills the room. (See 1 Nephi 2:16)" },
            { text: "Simply ask for patience.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 0, worldly: -1 }, feedback: "You feel calm enough to follow, but lack fire." }
        ]
    },
    "vision_confirmation_nephi": {
        text: "<b>The Spirit of the Lord visits you.</b> You know, with absolute certainty, that Lehi is a prophet.",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            { text: "Return to your brothers and bear testimony.", nextScene: "wilderness_valley", effect: { faith: 2, unity: -2, worldly: -3 }, covenantUnlock: "Faith", feedback: "You testify. Laman scoffs. (See 1 Nephi 2:17)" },
            { text: "Keep the witness to yourself to avoid conflict.", nextScene: "wilderness_valley", effect: { faith: -1, unity: 1, worldly: 1 }, feedback: "You hide your light. The moment passes." }
        ]
    },

    // --- PART 2: THE BRASS PLATES ---
    "wilderness_valley": {
        text: "Three days travel. Lehi commands you to return to Jerusalem for the plates. Laman is furious.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        // onEnter: Erosion happens here
        onEnter: { faith: -1, unity: -1, worldly: 0 },
        choices: [
            { text: "Declare: 'I will go and do.'", nextScene: "laban_house", effect: { faith: 3, unity: -2, worldly: -2 }, feedback: "Your faith witnesses against them. (See 1 Nephi 3:7)" },
            { text: "Quietly agree to go.", nextScene: "laban_house", effect: { faith: 0, unity: 0, worldly: 0 }, feedback: "You agree to go without complaint." }
        ]
    },
    "laban_house": {
        text: "JERUSALEM (NIGHT). Laman failed. He beats you with a rod in the cave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -2, unity: -5 }, // Violence hurts Unity bad
        choices: [
            { text: "Stand firm and rebuke him.", nextScene: "slaying_laban", effect: { faith: 2, unity: -2, worldly: 0 }, feedback: "Laman stops, shocked. (See 1 Nephi 3:29)" },
            { text: "Submit and endure the beating.", nextScene: "slaying_laban", effect: { faith: 0, unity: 1, worldly: 0 }, feedback: "You endure patiently." }
        ]
    },
    "slaying_laban": {
        text: "You find Laban drunk. The Spirit whispers: 'Slay him.'",
        backgroundAsset: "laban_house",
        castAssets: [],
        choices: [
            { text: "Obey immediately.", nextScene: "return_plates", effect: { faith: 4, worldly: -4 }, setFlag: "hasBrassPlates", feedback: "You obey the difficult command. (See 1 Nephi 4:18)" },
            { text: "Refuse to kill.", nextScene: "return_plates_failure", effect: { faith: -5, worldly: 2 }, feedback: "You cannot bring yourself to do it. You return empty handed." } 
            // Note: A failure path for Laban would be complex, but for now we assume success or severe stat penalty
        ]
    },
    "return_plates_failure": {
        text: "You return without the plates. Lehi is devastated. The future of the nation is jeopardized.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        choices: [
             { text: "Weep and repent.", nextScene: "broken_bow", effect: { faith: -3, unity: -2 }, feedback: "You failed this test, but the journey continues." }
        ]
    },
    "return_plates": {
        text: "You return with the plates. Sariah rejoices.",
        backgroundAsset: "wilderness",
        castAssets: ["Sariah", "Lehi"],
        choices: [
            { text: "Show her the Brass Plates immediately (Knowledge).", nextScene: "broken_bow", effect: { faith: 1, unity: 1, knowledge: 2 }, feedback: "Lehi prophesies. (See 1 Nephi 5:10)" },
            { text: "Testify that the Lord protected you (Faith).", nextScene: "broken_bow", effect: { faith: 2, unity: 2, knowledge: 0 }, feedback: "Sariah's faith is solidified. (See 1 Nephi 5:8)" }
        ]
    },

    // --- PART 3: THE BROKEN BOW ---
    "broken_bow": {
        text: "CRISIS: Your steel bow breaks. Starvation sets in. Lehi murmurs.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -4, unity: -4 }, // Severe Crisis
        choices: [
            { text: "Make a wooden bow and ask Lehi where to hunt.", nextScene: "bountiful", effect: { faith: 4, unity: 3, worldly: -1 }, covenantUnlock: "Repentance", feedback: "Your humility restores Lehi's faith. (See 1 Nephi 16:23)" },
            { text: "Chastise the family for murmuring.", nextScene: "bountiful", effect: { faith: 1, unity: -5, worldly: 0 }, feedback: "You are right, but you destroy what little unity remained." }
        ]
    },

    // --- PART 4: THE SHIP ---
    "bountiful": {
        text: "Bountiful. The Lord commands: 'Build a ship.' Laman mocks you.",
        backgroundAsset: "promised_land", 
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Quote scriptures to prove God's power.", nextScene: "shock_brothers", effect: { faith: 1, knowledge: 2, unity: -1 }, feedback: "You cite Moses. (See 1 Nephi 17:26)" },
            { text: "Warn them not to touch you.", nextScene: "shock_brothers", effect: { faith: 3, unity: -3, worldly: -1 }, feedback: "You are filled with power. (See 1 Nephi 17:48)" }
        ]
    },
    "shock_brothers": {
        text: "Your brothers are shaken. They fall to worship you.",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Command: 'Worship the Lord, not me.'", nextScene: "voyage_storm", effect: { faith: 2, unity: 2, worldly: -2 }, covenantUnlock: "Baptism", feedback: "They obey. (See 1 Nephi 17:55)" },
            { text: "Let them be, they deserve the fear.", nextScene: "voyage_storm", effect: { faith: -2, unity: -2, worldly: 3 }, feedback: "You allow your pride to grow." }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_storm": {
        text: "ON THE OCEAN. Rebellion. You are tied up. The storm rages. The ship is sinking.",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel", "Sariah"],
        onEnter: { faith: -3, unity: -6 }, // Deadly Crisis
        choices: [
            { text: "Pray for deliverance and forgiveness for them.", nextScene: "promised_land", effect: { faith: 4, unity: 2, worldly: -4 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "Laman unbinds you. The storm ceases. (See 1 Nephi 18:21)" },
            { text: "Despair and give up hope.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You lose all hope." }
        ]
    },
    "promised_land": {
        text: "You arrive at the Promised Land. You pitch your tents.",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sariah", "Sam"],
        choices: [
            { text: "Return to Start Screen", nextScene: "start_screen_transition", effect: { faith: 0 }, feedback: "Module Complete." }
        ]
    }
});