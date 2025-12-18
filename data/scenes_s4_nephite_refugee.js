// NEPHITE REFUGEE DATA - STORY 4: THE DECLINING GENERATIONS
window.STARTING_STATS["Nephite_Refugee"] = { 
    displayName: "Nephite Refugee",
    storyId: "decline",
    faith: 8, unity: 7, worldly_influence: 5, knowledge: 2, 
    hasBrassPlates: true, initialScene: "s4_refugee_intro",
    bio: "A mother in the Land of Nephi. You must lead your family through a perilous wilderness migration following King Mosiah to find the land of Zarahemla."
};

// QC Review: Scriptural Accuracy; Decision Difficulty/Balance; Branching Depth; Mathematical Integrity (F + U + K - W)

Object.assign(window.scenes, {
    // --- CHOICE 1: THE DEPARTURE ---
    "s4_refugee_intro": {
        text: "King Mosiah has warned the righteous to flee the Land of Nephi. The Lamanites are at the gates. You must decide your family's role in the exodus.<br><i>(Read Omni 1:12)</i>",
        backgroundAsset: "settlement",
        choices: [
            { text: "Join the Vanguard to help clear the path.", nextScene: "s4_vanguard_path_1", effect: { faith: 1, worldly: -1 }, feedback: "You lead the way." },
            { text: "Stay with the Main Body to provide support.", nextScene: "s4_main_path_1", effect: { unity: 1, worldly: 0 }, feedback: "Strength in numbers." },
            { text: "Help the Rear Guard protect the weak.", nextScene: "s4_rear_path_1", effect: { unity: 2, worldly: 1, faith: -2 }, feedback: "A heavy responsibility." }
        ]
    },

    // --- CHOICE 2: VANGUARD BRANCH ---
    "s4_vanguard_path_1": {
        text: "As a scout, you find a narrow pass. It is dangerous but would save days of travel.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Mark the path for the King and continue scouting.", nextScene: "s4_vanguard_path_2", effect: { faith: 1, worldly: 0 }, feedback: "You stay ahead of the group." },
            { text: "Study the local flora to ensure the path is safe from poison.", nextScene: "s4_vanguard_path_2", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "Knowledge is protection." },
            { text: "Wait for the priests to arrive to bless the path.", nextScene: "s4_vanguard_path_2", effect: { faith: 2, unity: -1 }, feedback: "You prioritize the spiritual." }
        ]
    },

    // --- CHOICE 2: MAIN BRANCH ---
    "s4_main_path_1": {
        text: "The main body is crowded. Disputes break out over water rations.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Share your own water to quiet the contention.", nextScene: "s4_main_path_2", effect: { unity: 2, faith: -1 }, feedback: "Charity cools the heat." },
            { text: "Use your influence to organize a strict rationing system.", nextScene: "s4_main_path_2", effect: { worldly: 1, unity: 0 }, feedback: "Order is established." },
            { text: "Gather the children to tell stories of Enos's prayer.", nextScene: "s4_main_path_2", effect: { faith: 1, unity: 0 }, feedback: "You lift their spirits." }
        ]
    },

    // --- CHOICE 2: REAR BRANCH ---
    "s4_rear_path_1": {
        text: "The Lamanite trackers are close. A family has collapsed from exhaustion.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Carry their youngest child while they rest.", nextScene: "s4_rear_path_2", effect: { unity: 2, worldly: 1, faith: -2 }, feedback: "Service is painful." },
            { text: "Stand guard with a makeshift weapon.", nextScene: "s4_rear_path_2", effect: { faith: 1, worldly: -1, unity: 1 }, feedback: "You act as a shield." },
            { text: "Pray for a mist to cover the trail and hide you.", nextScene: "s4_rear_path_2", effect: { faith: 2, unity: -1 }, feedback: "You look to the heavens." }
        ]
    },

    // --- CHOICE 3: VANGUARD PATH 2 ---
    "s4_vanguard_path_2": {
        text: "You find evidence of another civilization—etched stones in a valley. The King must see this.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Carefully sketch the symbols to preserve the record.", nextScene: "s4_hunger_event", effect: { knowledge: 1, faith: 0 }, feedback: "You capture the history." },
            { text: "Hurry back to report to Mosiah personally.", nextScene: "s4_hunger_event", effect: { worldly: 1, unity: 0 }, feedback: "Direct communication is best." },
            { text: "Kneel and ask if this is the promised land.", nextScene: "s4_hunger_event", effect: { faith: 2, unity: -1 }, feedback: "The Spirit whispers 'Not yet'." }
        ]
    },

    // --- CHOICE 3: MAIN PATH 2 ---
    "s4_main_path_2": {
        text: "The priests are weary. They need mothers to help teach the youth the words of Jarom.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Dedicate your evening to oral recitations of the law.", nextScene: "s4_hunger_event", effect: { knowledge: 1, faith: 1, worldly: 1 }, feedback: "The tradition continues." },
            { text: "Offer your tent as a place for the priests to rest.", nextScene: "s4_hunger_event", effect: { unity: 2, faith: -1 }, feedback: "You serve the servants of God." },
            { text: "Organize the youth to gather wood for the company.", nextScene: "s4_hunger_event", effect: { unity: 1, worldly: 0 }, feedback: "Productivity builds morale." }
        ]
    },

    // --- CHOICE 3: REAR PATH 2 ---
    "s4_rear_path_2": {
        text: "A Lamanite scout is captured. The men are angry and want to strike him down.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Intercede, pleading for mercy as Christ would.", nextScene: "s4_hunger_event", effect: { faith: 2, unity: -1 }, feedback: "Mercy triumphs over judgment." },
            { text: "Remind the men that we are refugees, not conquerors.", nextScene: "s4_hunger_event", effect: { unity: 2, worldly: 1 }, feedback: "You calm the bloodlust." },
            { text: "Allow the leaders to handle it and focus on your family.", nextScene: "s4_hunger_event", effect: { faith: 1, worldly: 0 }, feedback: "You protect your children's eyes." }
        ]
    },

    // --- CHOICE 4: MAJOR EVENT - HUNGER (COALESCE) ---
    "s4_hunger_event": {
        text: "All groups converge. The wilderness has been harsh. Famine has set in. Even the King is fasting for survival.<br><i>(Read Jarom 1:10)</i>",
        backgroundAsset: "promised_land",
        onEnter: { faith: -1, unity: -1 },
        choices: [
            { text: "Offer a prayer of total submission to God's will.", nextScene: "s4_fork_river", effect: { faith: 2, unity: -1 }, feedback: "Peace enters your heart." },
            { text: "Rally the women to forage in the deeper thickets.", nextScene: "s4_fork_river", effect: { unity: 2, worldly: 1 }, feedback: "You find wild berries and roots." },
            { text: "Recall the teachings of Enos on persistence in prayer.", nextScene: "s4_fork_river", effect: { knowledge: 1, faith: 1, worldly: 1 }, feedback: "Spiritual strength feeds the mind." }
        ]
    },

    // --- CHOICE 5: THE FORK IN THE RIVER ---
    "s4_fork_river": {
        text: "The river splits. Mosiah is uncertain. One path is dry but exposed; the other is through the water but hidden.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Suggest the 'Hidden Water' path for safety.", nextScene: "s4_water_path_1", effect: { unity: 1, worldly: 0 }, feedback: "You choose stealth." },
            { text: "Suggest the 'Dry Exposed' path for speed.", nextScene: "s4_dry_path_1", effect: { faith: 1, worldly: -1 }, feedback: "You choose haste." },
            { text: "Ask the King to cast lots to know the Lord's mind.", nextScene: "s4_faith_path_1", effect: { faith: 2, unity: -1 }, feedback: "You trust in divine providence." }
        ]
    },

    // --- CHOICE 6, 7, 8: WATER BRANCH (SCENES 1-3) ---
    "s4_water_path_1": {
        text: "The water is cold. You must carry your children on your shoulders.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Endure the freezing current in silence.", nextScene: "s4_water_path_2", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "Mental fortitude." },
            { text: "Help a sister who has lost her footing.", nextScene: "s4_water_path_2", effect: { unity: 2, worldly: 1, faith: -2 }, feedback: "A life saved." },
            { text: "Watch for crocodiles in the reeds.", nextScene: "s4_water_path_2", effect: { worldly: 1, unity: 0 }, feedback: "Vigilance." }
        ]
    },
    "s4_water_path_2": {
        text: "You find a hidden cave by the water's edge. It contains fresh water and shelter.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Invite everyone in to rest and dry their clothes.", nextScene: "s4_water_path_3", effect: { unity: 2, worldly: 1 }, feedback: "Restoration." },
            { text: "Hold a small devotional of gratitude.", nextScene: "s4_water_path_3", effect: { faith: 2, unity: -1 }, feedback: "Praise to the Lord." },
            { text: "Study the rock formations to understand the geology.", nextScene: "s4_water_path_3", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "Education." }
        ]
    },
    "s4_water_path_3": {
        text: "The King feels the mists are clearing. The end is near.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Press forward with renewed energy.", nextScene: "s4_ambush_event", effect: { unity: 1, worldly: 0 }, feedback: "Momentum." },
            { text: "Sing a song of Zion.", nextScene: "s4_ambush_event", effect: { faith: 1, unity: 0 }, feedback: "Melody of faith." },
            { text: "Mend your footwear for the final trek.", nextScene: "s4_ambush_event", effect: { worldly: 1, unity: 0 }, feedback: "Readiness." }
        ]
    },

    // --- CHOICE 6, 7, 8: DRY BRANCH (SCENES 1-3) ---
    "s4_dry_path_1": {
        text: "The sun is brutal on the open plain. Dehydration is the enemy.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Lead a group to find shade under the sparse trees.", nextScene: "s4_dry_path_2", effect: { unity: 2, worldly: 1 }, feedback: "Leadership." },
            { text: "Bear the thirst as a sacrifice.", nextScene: "s4_dry_path_2", effect: { faith: 2, unity: -1 }, feedback: "Consecration." },
            { text: "Teach the children how to extract water from cactus.", nextScene: "s4_dry_path_2", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "Survival skill." }
        ]
    },
    "s4_dry_path_2": {
        text: "You see the King's tent. He looks exhausted from the weight of the plates.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Fanning the King to keep him cool.", nextScene: "s4_dry_path_3", effect: { unity: 1, worldly: 0 }, feedback: "Service." },
            { text: "Testify to him that his labor is not in vain.", nextScene: "s4_dry_path_3", effect: { faith: 1, unity: 0 }, feedback: "Encouragement." },
            { text: "Volunteer to organize the pack animals.", nextScene: "s4_dry_path_3", effect: { worldly: 1, unity: 0 }, feedback: "Logistics." }
        ]
    },
    "s4_dry_path_3": {
        text: "A storm approaches. It will bring water but also dangerous lightning.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Gather everyone into a tight circle for warmth.", nextScene: "s4_ambush_event", effect: { unity: 2, worldly: 1 }, feedback: "Solidarity." },
            { text: "Pray for the lightning to be turned away.", nextScene: "s4_ambush_event", effect: { faith: 2, unity: -1 }, feedback: "Divine protection." },
            { text: "Observe the patterns of the wind.", nextScene: "s4_ambush_event", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "Meteorology." }
        ]
    },

    // --- CHOICE 6, 7, 8: FAITH BRANCH (SCENES 1-3) ---
    "s4_faith_path_1": {
        text: "The path chosen by lot leads through a dense, sacred-feeling forest.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Walk with a prayer in your heart.", nextScene: "s4_faith_path_2", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "Sanctification." },
            { text: "Help those who feel the lot was a mistake.", nextScene: "s4_faith_path_2", effect: { unity: 2, faith: -1 }, feedback: "Peacemaking." },
            { text: "Stay vigilant for any spiritual prompts.", nextScene: "s4_faith_path_2", effect: { faith: 1, worldly: 0 }, feedback: "Attunement." }
        ]
    },
    "s4_faith_path_2": {
        text: "An angel is rumored to have been seen by the children.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Believe and rejoice with them.", nextScene: "s4_faith_path_3", effect: { faith: 2, unity: -1 }, feedback: "Childlike faith." },
            { text: "Caution them to keep such things sacred.", nextScene: "s4_faith_path_3", effect: { faith: 1, unity: 0 }, feedback: "Wisdom." },
            { text: "Ask them for every detail they saw.", nextScene: "s4_faith_path_3", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "Inquiry." }
        ]
    },
    "s4_faith_path_3": {
        text: "The forest opens up to a vista of a beautiful valley below.",
        backgroundAsset: "promised_land",
        choices: [
            { text: "Proclaim the goodness of God.", nextScene: "s4_ambush_event", effect: { faith: 1, unity: 0 }, feedback: "Exultation." },
            { text: "Help the elderly down the final slope.", nextScene: "s4_ambush_event", effect: { unity: 2, worldly: 1, faith: -2 }, feedback: "Physical labor." },
            { text: "Look for smoke from Zarahemla.", nextScene: "s4_ambush_event", effect: { worldly: 1, unity: 0 }, feedback: "Anticipation." }
        ]
    },

    // --- CHOICE 9: MAJOR EVENT - AMBUSH (COALESCE) ---
    "s4_ambush_event": {
        text: "Suddenly, Lamanite archers strike! They have tracked you to the very edge of the wilderness. Arrows fall like rain.<br><i>(Read Jarom 1:7)</i>",
        backgroundAsset: "promised_land",
        onEnter: { worldly: -1, unity: -1 },
        choices: [
            { text: "Shield the children with your own body.", nextScene: "s4_zarahemla_arrival", effect: { faith: 2, unity: 0, worldly: 1 }, feedback: "A mother's love." },
            { text: "Rally the people to the King's banner.", nextScene: "s4_zarahemla_arrival", effect: { unity: 2, worldly: 1 }, feedback: "Defensive unity." },
            { text: "Scream a warning and throw your weight against the wagons.", nextScene: "s4_zarahemla_arrival", effect: { worldly: 1, unity: 0 }, feedback: "Fortification." }
        ]
    },

    // --- CHOICE 10: ARRIVAL IN ZARAHEMLA ---
    "s4_zarahemla_arrival": {
        text: "The gates of a new city appear. The people of Zarahemla welcome you. Your journey of survival ends, and your journey of unification begins.<br><i>(Read Omni 1:19)</i>",
        backgroundAsset: "jerusalem_street",
        choices: [
            { text: "Covenant to help merge the two peoples.", nextScene: "module_end_story_decline", effect: { faith: 2, unity: 1, worldly: 2 }, feedback: "End of Story." },
            { text: "Dedicate your life to the records of this flight.", nextScene: "module_end_story_decline", effect: { knowledge: 1, faith: 1, worldly: 1 }, feedback: "End of Story." },
            { text: "Focus on establishing a righteous home in this new land.", nextScene: "module_end_story_decline", effect: { unity: 2, worldly: 1 }, feedback: "End of Story." }
        ]
    }
});