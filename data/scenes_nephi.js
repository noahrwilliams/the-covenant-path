// NEPHI STARTING STATS (SURVIVAL MODE - Faith 5/Unity 5)
window.STARTING_STATS["Nephi"] = { 
    faith: 5, unity: 5, worldly_influence: 2, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_nephi" 
};

// NEPHI SCENES - COMPLETE ARC (Resource Management Balance)
Object.assign(window.scenes, {
    
    // --- PART 1: JERUSALEM ---
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. Lehi is shouting to the people. The crowd is hostile. Your brothers are ashamed.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 1 }, 
        choices: [
            { text: "Stand by Lehi (Requires Courage).", nextScene: "stand_by_father_nephi", effect: { faith: -1, unity: -2, worldly: -2 }, feedback: "You stand with him. The mockery hurts, draining your emotional reserve. (See 1 Nephi 1:18)" },
            { text: "Pull brothers aside to calm them.", nextScene: "calm_brothers_nephi", effect: { faith: -1, unity: 2, worldly: 1 }, feedback: "You keep the peace, but you feel the weight of compromise." },
            { text: "Retreat home to pray.", nextScene: "secret_prayer_nephi", effect: { faith: 3, unity: -1, worldly: -2 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You prioritize the Spirit over the immediate social crisis. (See 1 Nephi 2:16)" }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi looks tired. 'We must leave Jerusalem.' He asks you to pack immediately, abandoning your possessions.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Obey immediately.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 1, worldly: -2 }, feedback: "Action cures fear. You pack. (See 1 Nephi 2:3)" },
            { text: "Hesitate and mourn your future.", nextScene: "wilderness_valley", effect: { faith: -1, unity: 0, worldly: 2 }, feedback: "You obey, but your heart is heavy with what you are losing." }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs: 'He will lose us our inheritance!' Lehi returns and commands you to leave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -1, worldly: 1 },
        choices: [
            { text: "Defend father (Spend Faith).", nextScene: "wilderness_valley", effect: { faith: -1, unity: -3, worldly: 0 }, feedback: "You use your words to defend your father, causing contention. (See 1 Nephi 2:12)" },
            { text: "Stay silent (Risk Faith).", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 2 }, feedback: "You keep the peace, but your silence costs you spiritual ground." }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone. You desire to know the truth before you lose everything.",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Wrestle with God for a witness.", nextScene: "vision_confirmation_nephi", effect: { faith: 4, unity: 0, worldly: -4 }, covenantUnlock: "Spiritual Confirmation", feedback: "The Spirit visits you. (See 1 Nephi 2:16)" },
            { text: "Ask for safety.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 0, worldly: -1 }, feedback: "You feel calm, but lack a burning witness." }
        ]
    },
    "vision_confirmation_nephi": {
        text: "You know Lehi is a prophet. Now you must face your brothers.",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            { text: "Bear Testimony (Cost: -1 Faith).", nextScene: "wilderness_valley", effect: { faith: -1, unity: -1, worldly: -2 }, covenantUnlock: "Faith", feedback: "It takes spiritual energy to testify to stony hearts. (See 1 Nephi 2:17)" },
            { text: "Keep the witness to yourself.", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 1 }, feedback: "You hide your light to save energy, but lose ground." }
        ]
    },

    // --- PART 2: THE BRASS PLATES ---
    "wilderness_valley": {
        text: "Three days travel. Lehi commands return for the plates. Laman murmurs: 'It is a hard thing.'",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -2, unity: -2, worldly: 1 },
        choices: [
            { text: "Declare: 'I will go and do.' (Build Faith)", nextScene: "laban_house", effect: { faith: 3, unity: 0, worldly: -2 }, feedback: "Your declaration commits you to a dangerous path. Unity is not sacrificed. (See 1 Nephi 3:7)" },
            { text: "Complain with Laman (Risk Faith).", nextScene: "laban_house", effect: { faith: -3, unity: 1, worldly: 3 }, feedback: "You join the complaint. Your heart is hardened." }
        ]
    },
    "laban_house": {
        text: "JERUSALEM. Laman failed. He beats you with a rod in the cave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -3, unity: -5, worldly: 1 },
        choices: [
            { text: "Rebuke with the Spirit (Cost: -2 Faith).", nextScene: "slaying_laban", effect: { faith: -2, unity: -1, worldly: 0 }, feedback: "You pour out spiritual reserves to stop him. (See 1 Nephi 3:29)" },
            { text: "Submit and endure.", nextScene: "slaying_laban", effect: { faith: 0, unity: 2, worldly: 1 }, feedback: "You stop the violence, but sacrifice initiative." }
        ]
    },
    "slaying_laban": {
        text: "Laban is drunk. The Spirit whispers: 'Slay him.'",
        backgroundAsset: "laban_house",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Obey immediately (Cost: -3 Faith).", nextScene: "return_plates", effect: { faith: -3, worldly: -3 }, setFlag: "hasBrassPlates", feedback: "You obey the immense, difficult command. (See 1 Nephi 4:18)" },
            { text: "Shrink and refuse.", nextScene: "return_plates_failure", effect: { faith: -5, worldly: 2 }, feedback: "You fail the command. You flee empty handed." }
        ]
    },
    "return_plates_failure": {
        text: "You return without the plates. Lehi is devastated. The Lord will not be pleased.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        choices: [
             { text: "Repent and Try Again.", nextScene: "wilderness_valley", effect: { faith: 2, unity: -2 }, feedback: "You must start the task over. (Looping back...)" },
             { text: "Give up and hide.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You have lost your way." }
        ]
    },
    "return_plates": {
        text: "You return. Sariah rejoices.",
        backgroundAsset: "wilderness",
        castAssets: ["Sariah", "Lehi"],
        onEnter: { faith: 1, unity: 2, worldly: -1 },
        choices: [
            { text: "Study the Plates (Build Knowledge).", nextScene: "broken_bow", effect: { faith: 1, unity: -1, knowledge: 3 }, feedback: "You feast on the words. (See 1 Nephi 5:10)" },
            { text: "Rest and recover.", nextScene: "broken_bow", effect: { faith: 0, unity: 2, knowledge: 0 }, feedback: "You rebuild your physical strength." }
        ]
    },

    // --- PART 3: THE BROKEN BOW ---
    "broken_bow": {
        text: "CRISIS: Steel bow breaks. Starvation. Lehi murmurs.",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: -5, unity: -5, worldly: 2 },
        choices: [
            { text: "Make a wood bow & ask Lehi (Cost: -2 Faith).", nextScene: "bountiful", effect: { faith: -2, unity: 4, worldly: -2 }, covenantUnlock: "Repentance", feedback: "You use your last spiritual strength to act in faith. (See 1 Nephi 16:23)" },
            { text: "Complain with the family.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You join the murmuring. The Spirit leaves." }
        ]
    },

    // --- PART 4: THE SHIP ---
    "bountiful": {
        text: "Bountiful. Lord: 'Build a ship.' Laman mocks.",
        backgroundAsset: "promised_land", 
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -1, unity: -2, worldly: 1 },
        choices: [
            { text: "Preach Scripture (Requires Knowledge 3+).", nextScene: "shock_brothers", effect: { faith: 1, knowledge: 2, unity: -1 }, feedback: "You cite Moses. (See 1 Nephi 17:26)" },
            { text: "Argue back.", nextScene: "shock_brothers", effect: { faith: -2, unity: -3, worldly: 1 }, feedback: "You contend with anger." }
        ]
    },
    "shock_brothers": {
        text: "They try to throw you in the sea. You are filled with power.",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: -2, worldly: 0 },
        choices: [
            { text: "Shock them (Cost: -4 Faith).", nextScene: "voyage_storm", effect: { faith: -4, unity: 3, worldly: -3 }, covenantUnlock: "Baptism", feedback: "Virtue leaves you to shake them. (See 1 Nephi 17:48)" },
            { text: "Yield and bind yourself.", nextScene: "voyage_storm", effect: { faith: 1, unity: -5, worldly: 1 }, feedback: "You choose suffering over power." }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_storm": {
        text: "OCEAN STORM. You are tied up. Ship sinking.",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -3, unity: -6, worldly: 2 },
        choices: [
            { text: "Pray for calm (Cost: -3 Faith).", nextScene: "promised_land", effect: { faith: -3, unity: 2, worldly: -5 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "You pour out your soul. The storm ceases. (See 1 Nephi 18:21)" },
            { text: "Despair.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You lose all hope." }
        ]
    },
    "promised_land": {
        text: "You arrive at the Promised Land. You pitch your tents.",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sariah"],
        choices: [
            { text: "Finish Module", nextScene: "start_screen_transition", effect: { faith: 0 }, feedback: "Module Complete." }
        ]
    }
});