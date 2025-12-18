// SARIAH DATA
window.STARTING_STATS["Sariah"] = { 
    storyId: "exodus",
    displayName: "Sariah", // Optional displayName
    faith: 6, unity: 7, worldly_influence: 4, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_sariah",
    bio: "A mother torn between faith in her husband and fear for her sons' safety in the dangerous desert."
};

// SARIAH SCENES - COMPLETE ARC
Object.assign(window.scenes, {
    // --- COPY/PASTE THE SCENE CONTENT FROM THE PREVIOUS TURN HERE ---
    
    // --- PART 1: THE DEPARTURE ---
    "intro_sariah": {
        text: "JERUSALEM, 600 BC. The city is dangerous, but it is your home. Lehi has returned from a vision declaring you must leave everything—your gold, your house, your friends—and flee into the wilderness.<br><br><i>(Read 1 Nephi 2:2-4)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Support Lehi, though you are afraid.", nextScene: "packing_crisis", effect: { faith: 1, unity: 1, worldly: -1 }, feedback: "You trust your husband, though the cost is high." },
            { text: "Mourn the loss of your home.", nextScene: "packing_crisis", effect: { faith: -1, unity: 0, worldly: 2 }, feedback: "Your heart clings to your inheritance." },
            { text: "Focus on calming Laman and Lemuel.", nextScene: "packing_crisis", effect: { faith: 0, unity: 2, worldly: 0 }, feedback: "You act as the peacemaker." }
        ]
    },
    "packing_crisis": {
        text: "You are packing. Laman is furious about leaving his inheritance. Lehi is focused on the Lord's command. The tension in the house is breaking your heart.<br><br><i>(Read 1 Nephi 2:11)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Rebuke Laman for his rebellion (Cost: -1 Unity).", nextScene: "leaving_jerusalem_sariah", effect: { faith: 1, unity: -1, worldly: -1 }, feedback: "You speak sharply. He obeys, but resents it." },
            { text: "Comfort Laman with promises of safety.", nextScene: "leaving_jerusalem_sariah", effect: { faith: -1, unity: 2, worldly: 1 }, feedback: "You prioritize his feelings over the hard truth." }
        ]
    },
    "leaving_jerusalem_sariah": {
        text: "The city gates close behind you. You are in the wilderness. The sand is hot, and you have left your life behind. You pitch your tent in the valley of Lemuel.<br><br><i>(Read 1 Nephi 2:6-7)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Sam"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Build an altar and give thanks.", nextScene: "sons_depart", effect: { faith: 2, unity: 1, worldly: -2 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You join Lehi in worship. (See 1 Nephi 2:7)" },
            { text: "Worry about the food supply.", nextScene: "sons_depart", effect: { faith: -1, unity: 0, worldly: 1 }, feedback: "The practical needs weigh heavily on you." }
        ]
    },

    // --- PART 2: THE LONG WAIT (1 Nephi 5) ---
    "sons_depart": {
        text: "Lehi has sent all four of your sons back to Jerusalem to get the Brass Plates. They have been gone for weeks. You fear they have perished in the hands of Laban.<br><br><i>(Read 1 Nephi 5:1-2)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        // EROSION: The wait is agonizing.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Confront Lehi in grief (Spend Unity).", nextScene: "lehis_comfort", effect: { faith: -2, unity: -3, worldly: 1 }, feedback: "You cry out: 'Thou art a visionary man! My sons are no more!' (See 1 Nephi 5:2)" },
            { text: "Retreat to the tent to weep alone.", nextScene: "lehis_comfort", effect: { faith: -1, unity: -1, worldly: 0 }, feedback: "You hide your pain, but your faith is crumbling." }
        ]
    },
    "lehis_comfort": {
        text: "Lehi responds to your grief with his testimony. 'I know that I am a visionary man... but I know that the Lord will deliver my sons.'<br><br><i>(Read 1 Nephi 5:4-5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi"],
        choices: [
            { text: "Accept his testimony and pray (Build Faith).", nextScene: "sons_return_sariah", effect: { faith: 3, unity: 2, worldly: -1 }, feedback: "His words spark a hope in your heart. You wait on the Lord." },
            { text: "Remain skeptical and bitter.", nextScene: "sons_return_sariah", effect: { faith: -2, unity: -1, worldly: 1 }, feedback: "You refuse to be comforted until you see them." }
        ]
    },
    "sons_return_sariah": {
        text: "You see figures on the horizon. It is them! Your sons have returned safe with the records. Your joy is overwhelming.<br><br><i>(Read 1 Nephi 5:7-8)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Nephi", "Lehi", "Laman"],
        // RECOVERY: The miracle heals the family.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Declare your witness: 'Now I know of a surety.'", nextScene: "broken_bow_sariah", effect: { faith: 4, unity: 2, worldly: -3 }, covenantUnlock: "Spiritual Confirmation", feedback: "You testify that the Lord commanded your husband. (See 1 Nephi 5:8)" },
            { text: "Prepare a feast and celebrate.", nextScene: "broken_bow_sariah", effect: { faith: 1, unity: 3, worldly: 1 }, feedback: "You focus on feeding your exhausted sons." }
        ]
    },

    // --- PART 3: STARVATION (Broken Bow) ---

    "broken_bow_sariah": {
        text: "CRISIS: In the wilderness of Shazer, the bows have broken. The men return empty-handed. The children cry for food. Even Lehi begins to murmur against the Lord.<br><br><i>(Read 1 Nephi 16:19-20)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Continue.", nextScene: "broken_bow_sariah_decision", effect: { faith: -3, unity: -3, worldly: 2 } }
        ]
    },
    "broken_bow_sariah_decision": {
        text: "CRISIS: In the wilderness of Shazer, the bows have broken. The men return empty-handed. The children cry for food. Even Lehi begins to murmur against the Lord.<br><br><i>(Read 1 Nephi 16:19-20)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Lehi", "Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 }, 
        choices: [
            { text: "Gather the children and sing hymns.", nextScene: "nephi_bow_sariah", effect: { faith: 1, unity: 1, worldly: -2 }, feedback: "You distract the children and invite the Spirit, though you are weak with hunger." },
            { text: "Weep with the other women.", nextScene: "broken_bow_sariah_decision", effect: { faith: -2, unity: -5 }, feedback: "You fall into despair. Do you have enough faith to repent?" }
        ]
    },
    "nephi_bow_sariah": {
        text: "Nephi has made a wooden bow. He asks Lehi where to hunt. Lehi is humbled and looks into the Liahona.<br><br><i>(Read 1 Nephi 16:23-25)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Nephi", "Lehi"],
        choices: [
            { text: "Encourage Lehi to look.", nextScene: "ishmael_tragedy", effect: { faith: 2, unity: 2 }, covenantUnlock: "Repentance", feedback: "Lehi repents. He finds the direction." },
            { text: "Wait in silence.", nextScene: "ishmael_tragedy", effect: { faith: 0, unity: 0 }, feedback: "You wait. Nephi returns with meat. (See 1 Nephi 16:30)" }
        ]
    },

    // --- PART 4: NAHOM & BOUNTIFUL ---
    "ishmael_tragedy": {
        text: "Ishmael dies at Nahom. His daughters mourn and murmur against Lehi, wanting to return to Jerusalem. Laman plots to kill Lehi and Nephi.<br><br><i>(Read 1 Nephi 16:34-37)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -2, unity: -4, worldly: 1 },
        choices: [
            { text: "Stand between Laman and Lehi.", nextScene: "bountiful_sariah", effect: { faith: 2, unity: -3, worldly: -1 }, feedback: "You risk your relationship with your firstborn to save your husband, the prophet." },
            { text: "Plead with the Lord to soften their hearts.", nextScene: "bountiful_sariah", effect: { faith: 1, unity: 1, worldly: -1 }, feedback: "The Lord chastens them. They turn away from murder. (See 1 Nephi 16:39)" }
        ]
    },
    "bountiful_sariah": {
        text: "You arrive at Bountiful. It is beautiful, but Nephi is commanded to build a ship. He is often gone. Laman and Lemuel mock him.<br><br><i>(Read 1 Nephi 17:17-18)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Defend Nephi's work.", nextScene: "ship_built", effect: { faith: 1, unity: -2 }, feedback: "You support the ship, though you do not understand how to build it." },
            { text: "Focus on preparing food for the voyage.", nextScene: "ship_built", effect: { faith: 0, unity: 2, worldly: 1 }, feedback: "You ensure the family has provision." }
        ]
    },
    "ship_built": {
        text: "The ship is finished. It is time to board. You must leave the land of Bountiful for the great deep.<br><br><i>(Read 1 Nephi 18:5-6)</i>",
        backgroundAsset: "ship_deck",
        castAssets: ["Lehi", "Nephi"],
        choices: [
            { text: "Board with faith.", nextScene: "voyage_grief", effect: { faith: 2, worldly: -2 }, covenantUnlock: "Faith", feedback: "You step onto the ship." }
        ]
    },

    // --- PART 5: THE VOYAGE ---
    "voyage_grief": {
        text: "ON THE OCEAN. Laman and Lemuel have rebelled. They have tied up Nephi. The storm is raging. You and Lehi are sick with grief and near death.<br><br><i>(Read 1 Nephi 18:17-19)</i>",
        backgroundAsset: "ship_deck",
        castAssets: ["Laman", "Lemuel"],
        // EROSION: Deadly Crisis.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Use your last strength to plead with Laman.", nextScene: "promised_land_sariah", effect: { faith: 2, unity: 3, worldly: -2 }, feedback: "They threaten you, but seeing your grey hairs and sickness eventually softens them. (See 1 Nephi 18:19)" },
            { text: "Pray for Nephi's deliverance.", nextScene: "promised_land_sariah", effect: { faith: 4, unity: 0, worldly: -3 }, covenantUnlock: "Gift of the Holy Ghost", feedback: "You pray until you pass out. When you wake, the storm has ceased." },
            { text: "Succumb to grief and give up.", nextScene: "game_over_faith", effect: { faith: -10 }, feedback: "You are about to be cast into a watery grave." }
        ]
    },
    "promised_land_sariah": {
        text: "You arrive at the Promised Land. You pitch your tents. Your family is safe.<br><br><i>(Read 1 Nephi 18:23)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Nephi"],
        choices: [
            { text: "Focus entirely on healing and rest.", nextScene: "module_end_story_exodus", effect: { unity: 1, worldly: -1 }, feedback: "Story Module Complete." },
            { text: "Pray for the souls who remained in Jerusalem.", nextScene: "module_end_story_exodus", effect: { faith: 2 }, feedback: "Story Module Complete." }
        ]
    }
});