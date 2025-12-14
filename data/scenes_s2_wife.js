window.STARTING_STATS["WifeOfNephi"] = { 
    faith: 10, unity: 12, worldly_influence: 2, knowledge: 3, 
    hasBrassPlates: true, initialScene: "s2_wife_intro",
    bio: "One of Ishmael's daughters. She bears the emotional weight of the family schism, trying to maintain the 'manner of happiness' amidst sorrow."
};

Object.assign(window.scenes, {
    "s2_wife_intro": {
        text: "THE PROMISED LAND. The work is hard in the new soil.<br><br><i>(Read 1 Nephi 18:24)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Sariah"],
        onEnter: { faith: -1, unity: 0, worldly: 0 },
        choices: [
            { text: "Sing hymns while working.", nextScene: "s2_wife_children", effect: { faith: 2, unity: 1 }, feedback: "Spiritual morale." },
            { text: "Work harder than anyone.", nextScene: "s2_wife_children", effect: { worldly: 1, unity: 1 }, feedback: "Leading by effort." },
            { text: "Confide in Laman's wife.", nextScene: "s2_wife_children", effect: { unity: 2, faith: -1 }, feedback: "Bonding with the 'enemy'." }
        ]
    },
    "s2_wife_children": {
        text: "Your children ask why Uncle Laman is angry.<br><br><i>(Context: Teaching)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: -1, worldly: 0 },
        choices: [
            { text: "'He does not listen to God.'", nextScene: "s2_wife_sariah", effect: { faith: 1, unity: -1 }, feedback: "Hard truth." },
            { text: "'He is hurting inside.'", nextScene: "s2_wife_sariah", effect: { unity: 2, knowledge: 1 }, feedback: "Compassion." },
            { text: "'We don't talk about it.'", nextScene: "s2_wife_sariah", effect: { worldly: 1 }, feedback: "Avoidance." }
        ]
    },
    "s2_wife_sariah": {
        text: "Sariah is dying. She worries for Laman.<br><br><i>(Context: Matriarch's Passing)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Sariah"],
        onEnter: { faith: -1, unity: -1, worldly: 0 },
        choices: [
            { text: "Read scriptures to her.", nextScene: "s2_wife_sisters", effect: { faith: 2, knowledge: 1 }, feedback: "Spiritual comfort." },
            { text: "Bring Laman to see her.", nextScene: "s2_wife_sisters", effect: { unity: 3, faith: -1 }, feedback: "Risking peace for closure." },
            { text: "Manage the camp for her.", nextScene: "s2_wife_sisters", effect: { service: 2, worldly: 1 }, feedback: "Physical care." }
        ]
    },
    "s2_wife_sisters": {
        text: "Your sisters (Laman's wives) mock Nephi's leadership.<br><br><i>(Context: Peer Pressure)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        onEnter: { faith: -1, unity: -1, worldly: 0 },
        choices: [
            { text: "Defend Nephi firmly.", nextScene: "s2_wife_lehi", effect: { faith: 1, unity: -2 }, feedback: "Loyalty." },
            { text: "Change the subject.", nextScene: "s2_wife_lehi", effect: { unity: 1, worldly: 1 }, feedback: "Peacekeeping." },
            { text: "Validate their feelings.", nextScene: "s2_wife_lehi", effect: { unity: 2, faith: -2 }, feedback: "Empathy at cost of truth." }
        ]
    },
    "s2_wife_lehi": {
        text: "Lehi dies. The family stabilizer is gone.<br><br><i>(Read 2 Nephi 4:12)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        onEnter: { faith: -2, unity: -3, worldly: 1 },
        choices: [
            { text: "Mourn in prayer.", nextScene: "s2_wife_conflict", effect: { faith: 2 }, feedback: "Spiritual grief." },
            { text: "Host a meal for everyone.", nextScene: "s2_wife_conflict", effect: { unity: 2 }, feedback: "Gathering." },
            { text: "Organize the burial.", nextScene: "s2_wife_conflict", effect: { knowledge: 1, worldly: 1 }, feedback: "Duty." }
        ]
    },
    "s2_wife_conflict": {
        text: "Laman threatens violence against Nephi.<br><br><i>(Read 2 Nephi 5:2)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman", "Nephi"],
        onEnter: { faith: 0, unity: -2, worldly: 0 },
        choices: [
            { text: "Stand by Nephi.", nextScene: "s2_wife_warning", effect: { faith: 1, unity: -1 }, feedback: "Solidarity." },
            { text: "Shield the children.", nextScene: "s2_wife_warning", effect: { worldly: 1, knowledge: 1 }, feedback: "Protection." },
            { text: "Appeal to Laman's wife.", nextScene: "s2_wife_warning", effect: { unity: 2, faith: -1 }, feedback: "Diplomacy." }
        ]
    },
    "s2_wife_warning": {
        text: "Nephi says you must flee. This means leaving your sisters.<br><br><i>(Read 2 Nephi 5:5)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        choices: [
            { text: "Pack immediately.", nextScene: "s2_wife_packing", effect: { faith: 2 }, covenantUnlock: "Faith", feedback: "Submission." },
            { text: "Try to invite your sisters.", nextScene: "s2_wife_packing", effect: { unity: 2, worldly: -1 }, feedback: "Dangerous hope." },
            { text: "Grieve the loss.", nextScene: "s2_wife_packing", effect: { unity: 1, faith: -1 }, feedback: "Hesitation." }
        ]
    },
    "s2_wife_packing": {
        text: "Space is limited.<br><br><i>(Context: Priorities)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Seeds and Food.", nextScene: "s2_wife_depart", effect: { worldly: 2, knowledge: 1, worldly: -1 }, feedback: "Survival." },
            { text: "Records and Heirlooms.", nextScene: "s2_wife_depart", effect: { faith: 1, unity: 1, worldly: -1 }, feedback: "Legacy." },
            { text: "Comfort items for kids.", nextScene: "s2_wife_depart", effect: { unity: 2, worldly: 1 }, feedback: "Compassion." }
        ]
    },
    "s2_wife_depart": {
        text: "Leaving in the night. One of your sisters sees you.<br><br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        onEnter: { faith: 0, unity: -1, worldly: 0 },
        choices: [
            { text: "Look back with tears.", nextScene: "s2_wife_wilderness", effect: { unity: 1, faith: -1 }, feedback: "Sorrow." },
            { text: "Look forward with hope.", nextScene: "s2_wife_wilderness", effect: { faith: 2, unity: -1 }, feedback: "Resolve." },
            { text: "Quiet the group.", nextScene: "s2_wife_wilderness", effect: { knowledge: 1, worldly: 1 }, feedback: "Discipline." }
        ]
    },
    "s2_wife_wilderness": {
        text: "The journey is hard again.<br><br><i>(Context: Endurance)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 1 },
        choices: [
            { text: "Murmur.", nextScene: "s2_wife_settlement", effect: { worldly: 2, faith: -2 }, feedback: "Weakness." },
            { text: "Bear it with patience.", nextScene: "s2_wife_settlement", effect: { faith: 1, knowledge: 1 }, feedback: "Endurance." },
            { text: "Serve weaker mothers.", nextScene: "s2_wife_settlement", effect: { unity: 2 }, feedback: "Charity." }
        ]
    },
    "s2_wife_settlement": {
        text: "Building a new culture without your sisters.<br><br><i>(Read 2 Nephi 5:15)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Nephi"],
        choices: [
            { text: "Teach love for Lamanites.", nextScene: "start_screen_transition", effect: { faith: 2, unity: 1 }, feedback: "Story Module Complete." },
            { text: "Teach caution/fear.", nextScene: "start_screen_transition", effect: { worldly: 2, knowledge: 1 }, feedback: "Story Module Complete." },
            { text: "Establish new traditions.", nextScene: "start_screen_transition", effect: { unity: 2 }, feedback: "Story Module Complete." }
        ]
    }
});