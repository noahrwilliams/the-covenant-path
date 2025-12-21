// WIFE OF NEPHI DATA - STORY 2: THE GREAT DIVISION
window.STARTING_STATS["WifeOfNephi"] = { 
    displayName: "Wife of Nephi",
    storyId: "division",
    faith: 10, unity: 12, worldly_influence: 2, knowledge: 3, 
    hasBrassPlates: true, initialScene: "s2_wife_intro",
    bio: "One of Ishmael's daughters. She bears the emotional weight of the family schism, trying to maintain the 'manner of happiness' amidst sorrow."
};

Object.assign(window.scenes, {
    "s2_wife_intro": {
        text: "THE PROMISED LAND. You are one of Ishmael's daughters. The new land is beautiful, but the ground is resistant. The daily labor is exhausting, and it feels like a constant war against the wilderness.<br><i>(Read 1 Nephi 18:24)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Sariah"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Sing the songs of Zion and testimony to lift the spirits of the workers.", nextScene: "s2_wife_children", effect: { faith: 0, unity: 1 }, feedback: "Spiritual morale." },
            { text: "Work yourself to exhaustion, trying to physically compensate for others’ discouragement.", nextScene: "s2_wife_children", effect: { worldly: 1, unity: 1, faith: -1 }, feedback: "Leading by effort." },
            { text: "Seek comfort by confiding in your sister (Laman's wife) about the hardships.", nextScene: "s2_wife_children", effect: { unity: 1, faith: -1, worldly: 1}, feedback: "Bonding with the 'enemy'." }
        ]
    },
    "s2_wife_children": {
        text: "Your young children are confused and fearful because of the constant tension and anger emanating from Laman's camp. They ask you why he is so angry.<br><i>(Context: Teaching)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Teach them the clear truth: 'He does not listen to God's word.'", nextScene: "s2_wife_sariah", effect: { faith: 1, unity: -1 }, feedback: "Hard truth." },
            { text: "Teach them compassion: 'He is hurting inside and needs our prayers.'", nextScene: "s2_wife_sariah", effect: { unity: 1, faith: -1, knowledge: 1 }, feedback: "Compassion." },
            { text: "Tell them to avoid the topic: 'This is a private matter we don't discuss.'", nextScene: "s2_wife_sariah", effect: { unity: -1, faith: -1, worldly: 1 }, feedback: "Avoidance." }
        ]
    },
    "s2_wife_sariah": {
        text: "Your mother-in-law, Sariah, is dying. Her last great burden is the fate of her rebellious eldest sons, Laman and Lemuel.<br><i>(Context: Matriarch's Passing)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Sariah"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Read the comforting promises of the Brass Plates to her.", nextScene: "s2_wife_sisters", effect: { faith: 1, unity: -1, knowledge: 1 }, feedback: "Their rebellion is saddening, but thr comforted by the Spirit." },
            { text: "Risk the peace by bringing Laman to her bedside for one final plea.", nextScene: "s2_wife_sisters", effect: { unity: 1, faith: -1 }, feedback: "You risk peace for closure." },
            { text: "Take over all of her administrative duties to let her rest in peace.", nextScene: "s2_wife_sisters", effect: { unity: 1, worldly: 1 }, feedback: "Physical care." }
        ]
    },
    "s2_wife_sisters": {
        text: "Your sisters, Laman and Lemuel's wives, openly mock Nephi's spiritual leadership, accusing him of ambition and self-exaltation.<br><i>(Context: Peer Pressure)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Defend Nephi firmly, testifying of his prophetic role.", nextScene: "s2_wife_lehi", effect: { faith: 1, unity: -2 }, feedback: "Loyalty." },
            { text: "Quickly change the subject to children or physical needs.", nextScene: "s2_wife_lehi", effect: { unity: 1, worldly: 2 }, feedback: "Peacekeeping." },
            { text: "Validate their grief and anger, agreeing that the journey has been unfair.", nextScene: "s2_wife_lehi", effect: { unity: 1, faith: -3 }, feedback: "You express empathy at cost of faith and truth." }
        ]
    },
    "s2_wife_lehi": {
        text: "Lehi's death is a profound spiritual and emotional tremor. The family's stabilizing force is gone, and the rift instantly widens.<br><i>(Read 2 Nephi 4:12)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Seek solace and direction by mourning alone in prayer.", nextScene: "s2_wife_conflict", effect: { faith: 1, unity: -1 }, feedback: "Spiritual grief." },
            { text: "Organize a unifying feast for the whole family immediately after the burial.", nextScene: "s2_wife_conflict", effect: { unity: 1, worldly: 1 }, feedback: "Gathering." },
            { text: "Focus on the complex, practical details of Lehi's burial and estate.", nextScene: "s2_wife_conflict", effect: { unity: -1, worldly: 2 }, feedback: "Duty." }
        ]
    },
    "s2_wife_conflict": {
        text: "In a terrifying escalation, Laman openly threatens to murder Nephi and seize the brass plates.<br><i>(Read 2 Nephi 5:2)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman", "Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Physically stand between your husband and Laman.", nextScene: "s2_wife_warning", effect: { faith: 1, unity: -1, worldly: 1 }, feedback: "Solidarity." },
            { text: "Immediately gather the children and remove them from the scene.", nextScene: "s2_wife_warning", effect: { worldly: 1, unity: -1 }, feedback: "Protection." },
            { text: "Appeal to Laman's wife to intervene on your sister's behalf.", nextScene: "s2_wife_warning", effect: { unity: 1, faith: -1 }, feedback: "Diplomacy." }
        ]
    },
    "s2_wife_warning": {
        text: "The Lord directs Nephi to flee into the wilderness with those who will hear him. This means a final, wrenching separation from your sisters.<br><i>(Read 2 Nephi 5:5)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        choices: [
            { text: "Immediately begin packing, trusting the Lord's command over your sorrow.", nextScene: "s2_wife_packing", effect: { faith: 1, unity: -2}, covenantUnlock: "Faith", feedback: "You recognize this will separate the family forever, but you pur your trust in the Lord." },
            { text: "Risk warning your sisters, begging them to join you.", nextScene: "s2_wife_packing", effect: { unity: 1, worldly: 1 }, feedback: "Dangerous hope." },
            { text: "Take time to weep and mourn the loss of your sisters before moving.", nextScene: "s2_wife_packing", effect: { unity: 1, faith: -1, worldly: 1}, feedback: "Hesitation." }
        ]
    },
    "s2_wife_packing": {
        text: "You only have moments to choose what to carry into the unknown. Space is extremely limited.<br><i>(Context: Priorities)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Prioritize seeds for planting and dried food for survival.", nextScene: "s2_wife_depart", effect: { worldly: 1, knowledge: 1, unity: -1 }, feedback: "Survival." },
            { text: "Prioritize your family heirlooms and memorial items.", nextScene: "s2_wife_depart", effect: { faith: -1, unity: 1, worldly: 2 }, feedback: "Legacy." },
            { text: "Prioritize blankets and small comfort items for the children.", nextScene: "s2_wife_depart", effect: { faith: -1, unity: 1, worldly: 2 }, feedback: "Compassion." }
        ]
    },
    "s2_wife_depart": {
        text: "You depart under the cover of night. Just as you leave the settlement, one of your sisters spots you, her silent gaze following your retreat.<br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Turn your head back, weeping at the sight of your sister.", nextScene: "s2_wife_wilderness", effect: { unity: 1, faith: -1 }, feedback: "Sorrow." },
            { text: "Set your face like a flint and look forward to the Promised Land.", nextScene: "s2_wife_wilderness", effect: { faith: 1, unity: -1 }, feedback: "Resolve." },
            { text: "Focus on absolute silence to avoid alerting the Lamanites.", nextScene: "s2_wife_wilderness", effect: { knowledge: 1, worldly: 1 }, feedback: "Discipline." }
        ]
    },
    "s2_wife_wilderness": {
        text: "The journey is long, the weather harsh, and exhaustion sets in quickly. Your own strength fails.<br><i>(Context: Endurance)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Murmur bitterly about the burdens and your longing for the old life.", nextScene: "s2_wife_settlement", effect: { worldly: 2, faith: -2 }, feedback: "Weakness." },
            { text: "Bear the trial in silence, trusting God will give strength.", nextScene: "s2_wife_settlement", effect: { faith: 1, knowledge: 1 }, feedback: "Endurance." },
            { text: "Despite your own weariness, stop to serve the other mothers.", nextScene: "s2_wife_settlement", effect: { unity: 2 }, feedback: "Charity." }
        ]
    },
    "s2_wife_settlement": {
        text: "You have settled in a safe place. Now, a new culture must be forged without the presence of your kin who remained behind.<br><i>(Read 2 Nephi 5:15)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Nephi"],
        choices: [
            { text: "Teach the children to pray for the Lamanites and love them.", nextScene: "module_end_story_division", effect: { faith: 2, unity: 1 }, feedback: "Story Module Complete." },
            { text: "Teach caution and fear of the 'darkened' Lamanites to ensure survival.", nextScene: "module_end_story_division", effect: { worldly: 2, knowledge: 1 }, feedback: "Story Module Complete." },
            { text: "Work to establish new, unified traditions that bind the Nephite people together.", nextScene: "module_end_story_division", effect: { unity: 3 }, feedback: "Story Module Complete." }
        ]
    }
});