// NEPHI STARTING STATS
window.STARTING_STATS["Nephi"] = { 
    faith: 6, unity: 6, worldly_influence: 2, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_nephi" 
};

// NEPHI SCENES - COMPLETE ARC
Object.assign(window.scenes, {
    
    // --- PART 1: JERUSALEM ---
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. Lehi is shouting to the people, prophesying that Jerusalem will be destroyed. The crowd is hostile. Your brothers are ashamed.<br><br><i>(Read 1 Nephi 1:18-20)</i>",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 1 }, 
        choices: [
            { text: "Stand by Lehi (Requires Courage).", nextScene: "stand_by_father_nephi", effect: { faith: -1, unity: -1, worldly: -2 }, feedback: "You stand with him. The mockery hurts, but you feel a quiet strength." },
            { text: "Pull brothers aside to calm them.", nextScene: "calm_brothers_nephi", effect: { faith: -1, unity: 2, worldly: 1 }, feedback: "You keep the peace, but you feel the weight of compromise." },
            { text: "Retreat home to pray.", nextScene: "secret_prayer_nephi", effect: { faith: 3, unity: -1, worldly: -2 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You prioritize the Spirit over the immediate social crisis." }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi looks tired. The Lord has commanded him in a dream that he should take his family and depart into the wilderness. He asks you to pack immediately, abandoning your possessions.<br><br><i>(Read 1 Nephi 2:1-4)</i>",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Obey immediately.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 1, worldly: -2 }, feedback: "Action cures fear. You pack." },
            { text: "Ask him to explain the vision first.", nextScene: "wilderness_valley", effect: { faith: 2, unity: 0, worldly: 0 }, feedback: "Lehi explains the destruction. Your understanding deepens." }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs: 'He will lose us our inheritance!' Lehi returns and commands the family to leave Jerusalem and depart into the wilderness.<br><br><i>(Read 1 Nephi 2:11-13)</i>",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -1, worldly: 1 },
        choices: [
            { text: "Defend father (Spend Faith).", nextScene: "wilderness_valley", effect: { faith: -1, unity: -2, worldly: 0 }, feedback: "You defend your father. It causes contention, but truth is spoken." },
            { text: "Stay silent (Risk Faith).", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 2 }, feedback: "You keep the peace, but your silence feels like betrayal." }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone. You desire to know the mysteries of God, and to know if your father's words are true, that you might not rebel like your brothers.<br><br><i>(Read 1 Nephi 2:16)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Wrestle with God for a witness.", nextScene: "vision_confirmation_nephi", effect: { faith: 4, unity: 0, worldly: -4 }, covenantUnlock: "Spiritual Confirmation", feedback: "The Spirit visits you. Your heart is softened." },
            { text: "Ask for safety.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 0, worldly: -1 }, feedback: "You feel calm, but lack a burning witness." }
        ]
    },
    "vision_confirmation_nephi": {
        text: "The Lord visits you and softens your heart. You believe all the words of your father. Now you must face your brothers.<br><br><i>(Read 1 Nephi 2:16-17)</i>",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            { text: "Bear Testimony (Cost: -1 Faith).", nextScene: "wilderness_valley", effect: { faith: -1, unity: -1, worldly: -2 }, covenantUnlock: "Faith", feedback: "It takes spiritual energy to testify to stony hearts." },
            { text: "Keep it to yourself.", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 1 }, feedback: "You hide your light to save energy." }
        ]
    },

    // --- PART 2: THE BRASS PLATES ---
    "wilderness_valley": {
        text: "You have traveled three days in the wilderness. Lehi speaks: 'The Lord has commanded that you and your brothers return to Jerusalem to retrieve the Brass Plates from Laban.' Laman murmurs, saying it is a hard thing.<br><br><i>(Read 1 Nephi 3:2-5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -1, unity: -1, worldly: 1 },
        choices: [
            { text: "Declare: 'I will go and do.' (Build Faith)", nextScene: "laban_house", effect: { faith: 3, unity: 1, worldly: -2 }, feedback: "Your declaration gladdens your father. Even Laman falls silent." },
            { text: "Agree quietly.", nextScene: "laban_house", effect: { faith: 0, unity: 0, worldly: 0 }, feedback: "You agree to go without complaint." }
        ]
    },
    "laban_house": {
        text: "JERUSALEM. Laman failed to get the plates. He is angry and beats you and Lemuel with a rod. An angel appears to stop him, but Laman still murmurs.<br><br><i>(Read 1 Nephi 3:28-31)</i>",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -3, worldly: 1 },
        choices: [
            { text: "Rebuke with the Spirit (Cost: -2 Faith).", nextScene: "slaying_laban", effect: { faith: -2, unity: -1, worldly: 0 }, feedback: "You pour out your spiritual reserves." },
            { text: "Submit and endure.", nextScene: "slaying_laban", effect: { faith: 0, unity: 2, worldly: 1 }, feedback: "You stop the violence, but sacrifice initiative." }
        ]
    },
    "slaying_laban": {
        text: "You creep into the city by night. You find Laban drunk on the ground. The Spirit commands: 'Slay him, for the Lord hath delivered him into thy hands.'<br><br><i>(Read 1 Nephi 4:6-13)</i>",
        backgroundAsset: "laban_house",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Obey immediately (Cost: -3 Faith).", nextScene: "return_plates", effect: { faith: -3, worldly: -3 }, setFlag: "hasBrassPlates", feedback: "You obey the immense, difficult command." },
            { text: "Shrink and refuse.", nextScene: "return_plates_failure", effect: { faith: -4, worldly: 2 }, feedback: "You cannot bring yourself to do it. You flee." }
        ]
    },
    "return_plates_failure": {
        text: "You return empty handed. Lehi is devastated. The future of the nation is jeopardized.<br><br><i>(Read 1 Nephi 4:14-17 for context on why this is failure)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        choices: [
             { text: "Repent and Try Again.", nextScene: "wilderness_valley", effect: { faith: 2, unity: -2 }, feedback: "You must start the task over. The Lord gives you another chance." }
        ]
    },
    "return_plates": {
        text: "You return to the tent. Sariah rejoices, having feared you were dead. Lehi takes the plates and searches them.<br><br><i>(Read 1 Nephi 5:1-10)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Sariah", "Lehi"],
        onEnter: { faith: 1, unity: 2, worldly: -1 },
        choices: [
            { text: "Study the Plates (Build Knowledge).", nextScene: "broken_bow", effect: { faith: 1, unity: -1, knowledge: 3 }, feedback: "You feast on the words." },
            { text: "Rest and recover.", nextScene: "broken_bow", effect: { faith: 0, unity: 2, knowledge: 0 }, feedback: "You rebuild your physical strength." }
        ]
    },

    // --- PART 3: THE BROKEN BOW ---
    "broken_bow": {
        text: "CRISIS: Your fine steel bow breaks. The families are starving. Laman, Lemuel, and even Lehi begin to murmur against the Lord.<br><br><i>(Read 1 Nephi 16:18-22)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -4, unity: -4, worldly: 2 },
        choices: [
            { text: "Make a wood bow & ask Lehi (Cost: -2 Faith).", nextScene: "bountiful", effect: { faith: -2, unity: 4, worldly: -2 }, covenantUnlock: "Repentance", feedback: "Your humility restores Lehi's faith." },
            { text: "Complain with the family.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You join the murmuring. The Spirit leaves." }
        ]
    },

    // --- PART 4: THE SHIP ---
    "bountiful": {
        text: "You arrive at Bountiful. The Lord commands: 'Thou shalt construct a ship.' Laman and Lemuel mock you, calling you a fool.<br><br><i>(Read 1 Nephi 17:7-18)</i>",
        backgroundAsset: "promised_land", 
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -2, worldly: 1 },
        choices: [
            { text: "Preach Scripture (Requires Knowledge 3+).", nextScene: "shock_brothers", effect: { faith: 1, knowledge: 2, unity: -1 }, feedback: "You cite Moses dividing the Red Sea." },
            { text: "Argue back.", nextScene: "shock_brothers", effect: { faith: -2, unity: -3, worldly: 1 }, feedback: "You contend with anger." }
        ]
    },
    "shock_brothers": {
        text: "They try to throw you in the sea. You are filled with the power of God, and you warn them that if they touch you, they will wither.<br><br><i>(Read 1 Nephi 17:48-53)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: -2, worldly: 0 },
        choices: [
            { text: "Shock them (Cost: -3 Faith).", nextScene: "voyage_storm", effect: { faith: -3, unity: 3, worldly: -3 }, covenantUnlock: "Baptism", feedback: "Virtue leaves you to shake them." },
            { text: "Yield and bind yourself.", nextScene: "voyage_storm", effect: { faith: 1, unity: -5, worldly: 1 }, feedback: "You choose suffering over power." }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_storm": {
        text: "ON THE OCEAN. Laman and Lemuel rebel and tie you up. The Liahona stops. A terrible storm threatens to sink the ship. Lehi and Sariah are near death with grief.<br><br><i>(Read 1 Nephi 18:9-20)</i>",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel", "Sariah"],
        onEnter: { faith: -3, unity: -4, worldly: 2 },
        choices: [
            { text: "Pray for calm (Cost: -3 Faith).", nextScene: "promised_land", effect: { faith: -3, unity: 2, worldly: -5 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "You pour out your soul. The storm ceases." },
            { text: "Despair.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You lose all hope." }
        ]
    },
    "promised_land": {
        text: "You arrive at the Promised Land. You pitch your tents and prepare to live the law of the Lord.<br><br><i>(Read 1 Nephi 18:23-25)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sariah"],
        choices: [
            { text: "Finish Module", nextScene: "start_screen_transition", effect: { faith: 0 }, feedback: "Module Complete." }
        ]
    }
});