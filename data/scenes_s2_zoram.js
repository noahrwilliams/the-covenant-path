window.STARTING_STATS["Zoram"] = { 
    faith: 6, unity: 10, worldly_influence: 5, knowledge: 2, 
    hasBrassPlates: true, initialScene: "s2_zoram_intro",
    bio: "A former servant of Laban. He values loyalty and freedom, but struggles with the conflict between his oath to Nephi and his friendships with Laman's family."
};

Object.assign(window.scenes, {
    "s2_zoram_intro": {
        text: "THE PROMISED LAND. You have married the eldest daughter of Ishmael. She misses Jerusalem.<br><br><i>(Read 1 Nephi 16:7)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["WifeOfNephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Prophesy of Jerusalem's destruction.", nextScene: "s2_zoram_outsider", effect: { faith: 1, unity: -1 }, feedback: "You speak hard truth." },
            { text: "Build her fine furniture.", nextScene: "s2_zoram_outsider", effect: { worldly: 2, unity: 1 }, feedback: "You provide material comfort." },
            { text: "Remind her of freedom.", nextScene: "s2_zoram_outsider", effect: { knowledge: 1, faith: 1 }, feedback: "You provide perspective." }
        ]
    },
    "s2_zoram_outsider": {
        text: "Laman mocks your background as a servant.<br><br><i>(Context: Social Tension)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        choices: [
            { text: "Bear humble testimony.", nextScene: "s2_zoram_oath", effect: { faith: 2, worldly: -1 }, feedback: "You turn the other cheek." },
            { text: "Defend your skills.", nextScene: "s2_zoram_oath", effect: { worldly: 1, unity: -1 }, feedback: "You rely on pride." },
            { text: "Ignore him.", nextScene: "s2_zoram_oath", effect: { unity: 1 }, feedback: "Stoicism." }
        ]
    },
    "s2_zoram_oath": {
        text: "The separation looms. Nephi asks if your oath to Lehi still stands.<br><br><i>(Read 1 Nephi 4:33)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        choices: [
            { text: "Reaffirm it publicly.", nextScene: "s2_zoram_blessing", effect: { faith: 2, unity: -2 }, feedback: "You draw clear lines." },
            { text: "Reaffirm it privately.", nextScene: "s2_zoram_blessing", effect: { unity: 1, worldly: 1 }, feedback: "You choose prudence." },
            { text: "Pledge loyalty to 'the family'.", nextScene: "s2_zoram_blessing", effect: { unity: 2, faith: -1 }, feedback: "Diplomatic ambiguity." }
        ]
    },
    "s2_zoram_blessing": {
        text: "Lehi blesses your seed to be numbered with Nephi's.<br><br><i>(Read 2 Nephi 1:30-32)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi"],
        choices: [
            { text: "Accept with gratitude.", nextScene: "s2_zoram_offer", effect: { faith: 2, unity: 1 }, covenantUnlock: "Faith", feedback: "Covenant acceptance." },
            { text: "Fear losing your heritage.", nextScene: "s2_zoram_offer", effect: { worldly: 1, unity: -1 }, feedback: "Identity struggle." },
            { text: "Ask about your inheritance.", nextScene: "s2_zoram_offer", effect: { knowledge: 1, worldly: 1 }, feedback: "Pragmatism." }
        ]
    },
    "s2_zoram_offer": {
        text: "Laman offers you a leadership role if you turn on Nephi.<br><br><i>(Context: Temptation)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        choices: [
            { text: "Rebuke him.", nextScene: "s2_zoram_plot", effect: { faith: 1, unity: -2 }, feedback: "Loyalty." },
            { text: "Feign interest to spy.", nextScene: "s2_zoram_plot", effect: { knowledge: 2, faith: -2 }, feedback: "Deception." },
            { text: "Politely decline.", nextScene: "s2_zoram_plot", effect: { unity: 1, worldly: 1 }, feedback: "Safety." }
        ]
    },
    "s2_zoram_plot": {
        text: "You learn Laman plans to kill Nephi.<br><br><i>(Read 2 Nephi 5:3)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman", "Nephi"],
        choices: [
            { text: "Tell Nephi immediately.", nextScene: "s2_zoram_ultimatum", effect: { faith: 1, unity: 1 }, feedback: "Duty." },
            { text: "Confront Laman.", nextScene: "s2_zoram_ultimatum", effect: { unity: -2, worldly: 1 }, feedback: "Vigilante justice." },
            { text: "Secure weapons.", nextScene: "s2_zoram_ultimatum", effect: { knowledge: 1, worldly: 1 }, feedback: "Preparation." }
        ]
    },
    "s2_zoram_ultimatum": {
        text: "Departure time. Your wife is hesitant to leave her sisters.<br><br><i>(Context: Family Split)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["WifeOfNephi"],
        choices: [
            { text: "Command: 'We follow the Prophet.'", nextScene: "s2_zoram_house", effect: { faith: 2, unity: -1 }, feedback: "Patriarchal authority." },
            { text: "Logic: 'We choose safety.'", nextScene: "s2_zoram_house", effect: { worldly: 1, unity: 1 }, feedback: "Reason." },
            { text: "Plead: 'I cannot go without you.'", nextScene: "s2_zoram_house", effect: { unity: 2, faith: -2 }, feedback: "Prioritizing marriage." }
        ]
    },
    "s2_zoram_house": {
        text: "Abandoning the sturdy home you built.<br><br><i>(Context: Sacrifice)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Walk away.", nextScene: "s2_zoram_march", effect: { faith: 2, worldly: -1 }, feedback: "Lot's wife lesson." },
            { text: "Trade it for supplies.", nextScene: "s2_zoram_march", effect: { worldly: 1, knowledge: 1 }, feedback: "Resource gathering." },
            { text: "Give it to Laman.", nextScene: "s2_zoram_march", effect: { unity: 2, faith: -1 }, feedback: "Bridge burning with love." }
        ]
    },
    "s2_zoram_march": {
        text: "The group moves slowly in the dark.<br><br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Nephi"],
        choices: [
            { text: "Scout the rear.", nextScene: "s2_zoram_identity", effect: { knowledge: 1, worldly: 1 }, feedback: "Guardian role." },
            { text: "Carry the children.", nextScene: "s2_zoram_identity", effect: { unity: 2, faith: 1 }, feedback: "Nurturing role." },
            { text: "Walk with Nephi.", nextScene: "s2_zoram_identity", effect: { faith: 1, knowledge: 1 }, feedback: "Leadership role." }
        ]
    },
    "s2_zoram_identity": {
        text: "In the new land, Nephi categorizes the people.<br><br><i>(Read Jacob 1:13)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Nephi"],
        choices: [
            { text: "Embrace 'Nephite'.", nextScene: "start_screen_transition", effect: { unity: 2, faith: 1 }, feedback: "Story Module Complete." },
            { text: "Keep 'Zoramite' distinction.", nextScene: "start_screen_transition", effect: { knowledge: 1, worldly: 1 }, feedback: "Story Module Complete." },
            { text: "Focus on military strength.", nextScene: "start_screen_transition", effect: { worldly: 2, faith: -1 }, feedback: "Story Module Complete." }
        ]
    }
});