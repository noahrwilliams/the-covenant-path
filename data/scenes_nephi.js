// NEPHI STARTING STATS
window.STARTING_STATS["Nephi"] = { 
    faith: 10, unity: 10, worldly_influence: 0, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_nephi" 
};

// NEPHI SCENES - COMPLETE ARC (1 Nephi 2-18)
Object.assign(window.scenes, {
    
    // --- PART 1: JERUSALEM ---
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. You see your father, Lehi, shouting to the people. Laman and Lemuel look embarrassed and angry.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        choices: [
            { text: "Approach your father and stand by his side.", nextScene: "stand_by_father_nephi", effect: { faith: 1, unity: -2, worldly: -3 }, feedback: "You stand with Lehi. The crowd mocks you. (See 1 Nephi 1:18)" },
            { text: "Pull Laman and Lemuel aside to calm them down.", nextScene: "calm_brothers_nephi", effect: { faith: -1, unity: 3, worldly: 2 }, feedback: "You speak softly to your brothers. They calm down, but the fear of man lingers. (See 1 Nephi 2:11)" },
            { text: "Go home and pray for understanding.", nextScene: "secret_prayer_nephi", effect: { faith: 4, unity: -1, worldly: -4 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You slip away to kneel. (See 1 Nephi 2:16)" }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi says, 'We must leave Jerusalem.' He asks you to help him pack provisions, but you had plans to meet friends.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        choices: [
            { text: "Obey immediately without question.", nextScene: "wilderness_valley", effect: { faith: 2, unity: 1, worldly: -3 }, feedback: "Your obedience strengthens your character. You finish packing and prepare to leave. (See 1 Nephi 2:3)" },
            { text: "Ask him to explain the vision first.", nextScene: "wilderness_valley", effect: { faith: 3, unity: 0, worldly: -1 }, feedback: "Lehi explains the destruction. Your understanding deepens, and you join the preparation to leave. (See 1 Nephi 1:13)" }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs. 'He will lose us our inheritance!' Lehi returns home and announces you must all leave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Defend your father against Laman's insults.", nextScene: "wilderness_valley", effect: { faith: 1, unity: -3, worldly: 0 }, feedback: "You speak up for truth, but it starts a tense argument as you pack your things. (See 1 Nephi 2:12)" },
            { text: "Stay silent and gather your things.", nextScene: "wilderness_valley", effect: { faith: 0, unity: 0, worldly: 2 }, feedback: "You keep the peace and pack your belongings, but the world's influence gains a small hold on you." }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone in your room. You desire to know if your father's words are true.",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Pour out your soul to God (Seeking Confirmation).", nextScene: "vision_confirmation_nephi", effect: { faith: 3, unity: -1, worldly: -4 }, covenantUnlock: "Spiritual Confirmation", feedback: "A sensation of pure light fills the room. (See 1 Nephi 2:16)" },
            { text: "Simply ask for patience and ease of mind.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 0, worldly: -2 }, feedback: "You feel a quiet calm, enough to follow your father into the wilderness." }
        ]
    },
    "vision_confirmation_nephi": {
        text: "<b>The Spirit of the Lord visits you.</b> You know, with absolute certainty, that Lehi is a prophet and the Lord will lead you to a land of promise.",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            { text: "Return to your brothers and bear a powerful testimony.", nextScene: "wilderness_valley", effect: { faith: 3, unity: -1, worldly: -4 }, covenantUnlock: "Faith", feedback: "You bear a powerful testimony. Sam looks interested as you prepare to depart. (See 1 Nephi 2:17)" }
        ]
    },

    // --- PART 2: THE BRASS PLATES ---
    "wilderness_valley": {
        text: "You travel for three days. You leave your gold and silver behind. Lehi speaks: 'The Lord has commanded that you and your brothers return to Jerusalem to retrieve the Brass Plates from Laban.' Laman is furious.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman", "Lemuel", "Sam"],
        choices: [
            { text: "Declare: 'I will go and do the things which the Lord hath commanded.'", nextScene: "laban_house", effect: { faith: 4, unity: -2, worldly: -3 }, feedback: "Your declaration stands as a witness against their murmuring. (See 1 Nephi 3:7)" },
            { text: "Try to reason with Laman about why we need the records.", nextScene: "laban_house", effect: { faith: 1, unity: 1, worldly: -1 }, feedback: "Laman grumbles but agrees to go. (See 1 Nephi 3:15)" }
        ]
    },
    "laban_house": {
        text: "JERUSALEM (NIGHT). You cast lots. Laman went in and was chased out by Laban's guards. He is now beating you with a rod in the cave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -3 }, // Event: Violence
        choices: [
            { text: "Stand firm and rebuke him with the power of the angel.", nextScene: "slaying_laban", effect: { faith: 3, unity: -2, worldly: 0 }, feedback: "Laman stops, shocked by your courage, but his heart is hard. (See 1 Nephi 3:29)" },
            { text: "Humbly plead with him to stop for the sake of the family.", nextScene: "slaying_laban", effect: { faith: 1, unity: 2, worldly: 0 }, feedback: "Laman stops beating you, but he still doubts. (See 1 Nephi 3:31)" }
        ]
    },
    "slaying_laban": {
        text: "You creep into the city alone. You find Laban drunk on the ground. The Spirit whispers: 'Slay him, for the Lord hath delivered him into thy hands.'",
        backgroundAsset: "laban_house",
        castAssets: [],
        choices: [
            { text: "Obey immediately, though it is difficult.", nextScene: "return_plates", effect: { faith: 5, worldly: -5 }, setFlag: "hasBrassPlates", feedback: "You follow the Spirit's command, prioritizing God's law over man's. (See 1 Nephi 4:18)" },
            { text: "Hesitate and look for another way.", nextScene: "return_plates", effect: { faith: -2, worldly: 2 }, setFlag: "hasBrassPlates", feedback: "The Spirit prompts you again until you obey. You retrieve the plates. (See 1 Nephi 4:10)" }
        ]
    },
    "return_plates": {
        text: "You return to the wilderness tent. Sariah runs to embrace you—she thought you were dead.",
        backgroundAsset: "wilderness",
        castAssets: ["Sariah", "Lehi"],
        choices: [
            { text: "Show her the Brass Plates immediately (Knowledge).", nextScene: "broken_bow", effect: { faith: 1, unity: 1, knowledge: 2 }, feedback: "The records bring joy to Lehi, who begins to prophesy. (See 1 Nephi 5:10)" },
            { text: "Testify that the Lord protected you (Faith).", nextScene: "broken_bow", effect: { faith: 3, unity: 2, knowledge: 0 }, feedback: "Sariah declares: 'Now I know of a surety that the Lord hath commanded my husband.' (See 1 Nephi 5:8)" }
        ]
    },

    // --- PART 3: THE BROKEN BOW ---
    "broken_bow": {
        text: "CRISIS: Your fine steel bow has broken. The families are starving. Even Lehi begins to murmur against the Lord.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -3, unity: -3 }, // Major Crisis
        choices: [
            { text: "Make a wooden bow and humbly ask Lehi where to hunt.", nextScene: "bountiful", effect: { faith: 5, unity: 3, worldly: -2 }, covenantUnlock: "Repentance", feedback: "Your humility humbles Lehi. He repents and asks the Lord. (See 1 Nephi 16:23)" },
            { text: "Chastise the family for their lack of faith.", nextScene: "bountiful", effect: { faith: 2, unity: -4, worldly: 0 }, feedback: "You speak truth, but your harshness drives a wedge in the family." }
        ]
    },

    // --- PART 4: THE SHIP ---
    "bountiful": {
        text: "You arrive at Bountiful. The Lord commands: 'Build a ship.' Laman and Lemuel mock you: 'Our brother is a fool, for he thinketh that he can build a ship.'",
        backgroundAsset: "promised_land", // Placeholder for Bountiful
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Quote scriptures to prove the Lord can do all things.", nextScene: "shock_brothers", effect: { faith: 2, knowledge: 3, unity: -1 }, feedback: "You cite Moses dividing the Red Sea. (See 1 Nephi 17:26)" },
            { text: "Warn them not to touch you, for you are filled with power.", nextScene: "shock_brothers", effect: { faith: 4, unity: -2, worldly: -2 }, feedback: "You declare: 'Whoso shall lay his hands upon me shall wither.' (See 1 Nephi 17:48)" }
        ]
    },
    "shock_brothers": {
        text: "Your brothers are shaken by the power of God. They fall down to worship you.",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Command them: 'Worship the Lord, not me.'", nextScene: "voyage_storm", effect: { faith: 2, unity: 2, worldly: -2 }, covenantUnlock: "Baptism", feedback: "They obey and help build the ship. (See 1 Nephi 17:55)" }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_storm": {
        text: "ON THE OCEAN. Laman and Lemuel rebel and tie you up. A terrible storm rages. The Liahona stops working. The ship is about to sink.",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel", "Sariah"],
        onEnter: { faith: -2, unity: -5 }, // Crisis
        choices: [
            { text: "Pray for deliverance and forgiveness for them.", nextScene: "promised_land", effect: { faith: 5, unity: 1, worldly: -5 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "Laman unbinds you. You take the wheel and pray. The storm ceases. (See 1 Nephi 18:21)" }
        ]
    },
    "promised_land": {
        text: "You arrive at the Promised Land. You pitch your tents and prepare to live the law of the Lord.<br><br><b>End of Nephi's Module.</b>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sariah", "Sam", "Laman", "Lemuel"],
        choices: [
            { text: "Return to Start Screen", nextScene: "start_screen_transition", effect: { faith: 0 }, feedback: "Module Complete." }
        ]
    }
});