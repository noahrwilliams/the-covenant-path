// NEPHI DATA
window.STARTING_STATS["Nephi"] = { 
    storyId: "exodus",
    displayName: "Nephi", // Optional displayName
    faith: 6, unity: 6, worldly_influence: 2, knowledge: 0, 
    hasBrassPlates: false, initialScene: "tutorial_nephi",
    bio: "The fourth son who seeks a spiritual witness of his father's visions. He must learn to lead when his brothers rebel."
};

/* 
1. Add event to acquire the Liahona
2. Add opportunity to offer sacrifice

*/

// NEPHI SCENES - COMPLETE ARC
Object.assign(window.scenes, {
    
    "tutorial_nephi": {
        text: "INTRODUCTION: Gameplay balances Faith, Unity, and Pride stats. If Faith or Unity get to 0, or Pride gets to 10, your story ends. Choices will impact stats, as do regular Prayer and Service. Additionally, some events will have large negative impact, so be diligent so you are not caught unprepared. Prayer and Service are always available. Additionally, once you have the brass plates, you will also always have the option to Review Records. Reviewing the record is a scripture quiz where you gain points dependent on how you score. The effects of Prayer, Record Review, and Service are limited by difficulty level and reduced with consecutive use. It is best to consistently make small and simple actions.",
        backgroundAsset: "brass_plates",
        castAssets: ["Lehi", "Sariah"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Begin your story.", nextScene: "intro_nephi" }
        ]
    },

    // --- PART 1: JERUSALEM ---
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. Lehi is shouting to the people, prophesying that Jerusalem will be destroyed. The crowd is hostile. Your brothers are ashamed.<br><i>(Read 1 Nephi 1:18-20)</i>",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Courageously stand by Lehi.", nextScene: "stand_by_father_nephi", effect: { faith: 1, unity: 1, worldly: 0 }, feedback: "You stand with him. The mockery hurts, but you feel a quiet strength." },
            { text: "Pull brothers aside to calm them.", nextScene: "calm_brothers_nephi", effect: { faith: -1, unity: 1, worldly: 1 }, feedback: "You keep the peace, but you feel the weight of compromise." },
            { text: "Retreat home to pray.", nextScene: "secret_prayer_nephi", effect: { faith: 1, unity: -1, worldly: -1 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You prioritize the Spirit over the immediate social crisis." }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi looks tired. The Lord has commanded him in a dream that he should take his family and depart into the wilderness. He asks you to pack immediately, abandoning your possessions.<br><i>(Read 1 Nephi 2:1-4)</i>",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Ask him to explain the vision first.", nextScene: "wilderness_valley", effect: { faith: 1, unity: 0, worldly: 0 }, feedback: "Lehi explains the destruction. Your understanding deepens." },
            { text: "Obey immediately.", nextScene: "wilderness_valley", effect: { faith: 1, unity: -1, worldly: -1 }, feedback: "Action cures fear. Your siblings are not enthusiastic, but you faithfully pack." }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs: 'He will lose us our inheritance!' Lehi returns and commands the family to leave Jerusalem and depart into the wilderness.<br><i>(Read 1 Nephi 2:11-13)</i>",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Defend father (Spend Faith).", nextScene: "wilderness_valley", effect: { faith: 0, unity: -1, worldly: 0 }, feedback: "You defend your father. It causes contention, but truth is spoken." },
            { text: "Stay silent (Risk Faith).", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 2 }, feedback: "You keep the peace, but your silence feels like betrayal." }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone. You desire to know the mysteries of God, and to know if your father's words are true, that you might not rebel like your brothers.<br><i>(Read 1 Nephi 2:16)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Ask for safety.", nextScene: "wilderness_valley", effect: { faith: 0, unity: 1, worldly: 1 }, feedback: "You feel calm, but lack a burning witness." },
            { text: "Wrestle with God for a witness.", nextScene: "vision_confirmation_nephi", effect: { faith: 1, unity: 0, worldly: -1 }, covenantUnlock: "Spiritual Confirmation", feedback: "The Spirit visits you. Your heart is softened." }
        ]
    },
    "vision_confirmation_nephi": {
        text: "The Lord visits you and softens your heart. You believe all the words of your father. Now you must face your brothers.<br><i>(Read 1 Nephi 2:16-17)</i>",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            { text: "Bear your testimony.", nextScene: "wilderness_valley", effect: { faith: 1, unity: -1, worldly: -2 }, covenantUnlock: "Faith", feedback: "Your brothers are not overly receptive, but the spirit is strong as you share your testimony." },
            { text: "Patiently seek to keep the peace.", nextScene: "wilderness_valley", effect: { faith: -2, unity: 1, worldly: 1 }, feedback: "You hide your light to save energy." }
        ]
    },

    // --- PART 2: THE BRASS PLATES ---
    "wilderness_valley": {
        text: "You have traveled three days in the wilderness. Lehi speaks: 'The Lord has commanded that you and your brothers return to Jerusalem to retrieve the Brass Plates from Laban.' Laman murmurs, saying it is a hard thing.<br><i>(Read 1 Nephi 3:2-5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Agree quietly.", nextScene: "plate_fail", effect: { faith: 0, unity: -1, worldly: 1 }, feedback: "You agree to go without complaint." },
            { text: "Declare: 'I will go and do.'", nextScene: "plate_fail", effect: { faith: 1, unity: 0, worldly: -2 }, feedback: "Your declaration gladdens your father. Even Laman falls silent." }
        ]
    },
    "plate_fail": {
        text: "JERUSALEM. Laman failed to get the plates. He is angry and beats you and Lemuel with a rod.<br><i>(Read 1 Nephi 3:28-31)</i>",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Continue.", nextScene: "laban_house", effect: { faith: -2, unity: -3, worldly: 1 }, feedback: "Laman and Lemuel are enraged. You have had trouble before, but not like this." }

        ]
    },
    "laban_house": {
        text: "JERUSALEM. Laman failed to get the plates. He and Lemuel are angry and beat you and Sam with a rod. An angel appears to stop them and declare the Lord has chosen you to be a ruler over them, but Laman still murmurs.<br><i>(Read 1 Nephi 3:28-31)</i>",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel", "Angel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "You patiently endure, but lead the way back to Jerusalem.", nextScene: "slaying_laban", effect: { faith: -1, unity: -2, worldly: 1 }, feedback: "They keep complaining, but follow you. Probably to blame you later and say, 'I told you so.'" },
            { text: "You boldly tell them, 'Let's try again; the Lord is able to deliver us.' ", nextScene: "slaying_laban", effect: { faith: 1, unity: -1, worldly: 0 }, feedback: "They were still angry and continued to murmur, but they followed you to the walls of Jerusalem." }
        ]
    },
    "slaying_laban": {
        text: "You creep into the city by night. You find Laban drunk on the ground. The Spirit commands: 'Slay him, for the Lord hath delivered him into thy hands.'<br><i>(Read 1 Nephi 4:6-13)</i>",
        backgroundAsset: "laban_house",
        castAssets: ["Laban"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Obey immediately.", nextScene: "return_plates", effect: { unity: -3, worldly: -3 }, setFlag: "hasBrassPlates", feedback: "You obey the immense, difficult command." },
            { text: "Shrink and refuse.", nextScene: "return_plates_failure", effect: { faith: -2, worldly: 2 }, feedback: "You cannot bring yourself to do it, and flee." }
        ]
    },
    "return_plates_failure": {
        text: "You return empty handed. Lehi is devastated. The future of the nation is jeopardized.<br><i>(Read 1 Nephi 4:14-17)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        choices: [
             { text: "Repent and Try Again.", nextScene: "wilderness_valley", effect: { faith: -3, unity: -2 }, feedback: "You must go back, but do you have the Faith to repent?" }
        ]
    },
    "return_plates": {
        text: "You return to the tent. Sariah rejoices, having feared you were dead. Lehi takes the plates and searches them.<br><i>(Read 1 Nephi 5:1-10)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Sariah", "Lehi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Study the Plates.", nextScene: "broken_bow", effect: { faith: 1, unity: -1, knowledge: 2 }, feedback: "You feast on the words." },
            { text: "Rest and recover.", nextScene: "broken_bow", effect: { faith: 0, unity: 1, worldly: 2, knowledge: 0 }, feedback: "You rebuild your physical strength." }
        ]
    },

    // --- PART 3: THE BROKEN BOW ---
    "broken_bow": {
        text: "CRISIS: Your fine steel bow breaks. The families are starving. Laman, Lemuel, and even Lehi begin to murmur against the Lord.<br><i>(Read 1 Nephi 16:18-22)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Continue.", nextScene: "broken_bow_decision", effect: { faith: -4, unity: -3, worldly: 2 } }
        ]
    },

    "broken_bow_decision": {
        text: "CRISIS: Your fine steel bow breaks. The families are starving. Laman, Lemuel, and even Lehi begin to murmur against the Lord.<br><i>(Read 1 Nephi 16:18-22)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Empathize and share your frustrations with the family.", nextScene: "broken_bow_decision", effect: { faith: -3 }, feedback: "You join the murmuring and the Spirit leaves. Do you have enough faith to repent?" },
            { text: "Make a wood bow and ask Lehi for guidance.", nextScene: "bountiful", effect: { unity: 2, worldly: -1 }, covenantUnlock: "Repentance", feedback: "Your humility restores Lehi's faith." }
        ]
    },

    // --- PART 4: THE SHIP ---
    "bountiful": {
        text: "You arrive at Bountiful. The Lord commands: 'Thou shalt construct a ship.' Laman and Lemuel mock you, calling you a fool. 'We knew you could not accomplish so great a work.' <br><i>(Read 1 Nephi 17:7-18)</i>",
        backgroundAsset: "promised_land", 
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Endure patiently.", nextScene: "shock_brothers", effect: { faith: -2, unity: -2, worldly: 1 }, feedback: "You quietly endure, but feel frustration growing." },
            { text: "Preach Scripture.", nextScene: "shock_brothers", effect: { faith: 1, knowledge: 2, unity: -1 }, feedback: "You remind them of Moses dividing the Red Sea to lead the Israelites out of Egypt." }
        ]
    },
    "shock_brothers": {
        text: "They try to throw you in the sea. You are filled with the power of God, and you warn them that if they touch you, they will wither. Days later the Lord instructs you to shock them. <br><i>(Read 1 Nephi 17:48-53)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Faithfully stretch forth thy hand.", nextScene: "voyage_storm", effect: { faith: 1, unity: -1, worldly: -1 }, covenantUnlock: "Baptism", feedback: "The Lord shocks them and they know of a surity that the Lord is with thee (Read 1 Nephi 17:54-55)." },
            { text: "Diligently work on the ship.", nextScene: "voyage_storm", effect: { faith: -2, unity: -2, worldly: 1 }, feedback: "Obedience is better than sacrifice. Faith and unity suffer." }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_storm": {
        text: "ON THE OCEAN. Laman and Lemuel rebel and tie you up. The Liahona stops. A terrible storm threatens to sink the ship. Lehi and Sariah are near death with grief.<br><i>(Read 1 Nephi 18:9-20)</i>",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel", "Sariah"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Continue.", nextScene: "voyage_storm_decision", effect: { faith: -3, unity: -4, worldly: 2 } }
        ]
    },
    "voyage_storm_decision": {
        text: "ON THE OCEAN. Laman and Lemuel rebel and tie you up. The Liahona stops. A terrible storm threatens to sink the ship. Lehi and Sariah are near death with grief.<br><i>(Read 1 Nephi 18:9-20)</i>",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel", "Sariah"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "There is nothing you can do.", nextScene: "game_over_faith", effect: { faith: -20 }, feedback: "Your faith fails and you lose all hope." },
            { text: "Pray for calm.", nextScene: "promised_land", effect: { faith: 0, unity: 2, worldly: -3 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "You pour out your soul. The storm ceases." }
        ]
    },
    "promised_land": {
        text: "You arrive at the Promised Land. You pitch your tents and prepare to live the law of the Lord.<br><i>(Read 1 Nephi 18:23-25)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sariah"],
        choices: [
            { text: "Give thanks and begin building.", nextScene: "module_end_story_exodus", effect: { faith: 1, unity: 1 }, feedback: "Story Complete." },
            { text: "Seek revelation for a new assignment.", nextScene: "module_end_story_exodus", effect: { faith: 1, knowledge: 1 }, feedback: "Story Complete." }
        ]
    }
});