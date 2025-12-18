// ZORAM DATA - STORY 2: THE GREAT DIVISION
window.STARTING_STATS["Zoram"] = { 
    displayName: "Zoram",
    storyId: "division",
    faith: 6, unity: 10, worldly_influence: 5, knowledge: 2, 
    hasBrassPlates: true, initialScene: "s2_zoram_intro",
    bio: "A former servant of Laban. He values loyalty and freedom, but struggles with the conflict between his oath to Nephi and his friendships with Laman's family."
};

Object.assign(window.scenes, {
    "s2_zoram_intro": {
        text: "THE PROMISED LAND. You are bound by oath to Nephi, but your wife, the eldest daughter of Ishmael, is deeply unhappy. She weeps for the lost prosperity and safety of Jerusalem.<br><i>(Read 1 Nephi 16:7)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["WifeOfNephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Declare that Jerusalem's destruction was God's judgment.", nextScene: "s2_zoram_outsider", effect: { faith: 1, unity: -1 }, feedback: "You speak hard truth." },
            { text: "Dedicate your time to building a more luxurious home for her.", nextScene: "s2_zoram_outsider", effect: { worldly: 2, unity: 1 }, feedback: "You provide material comfort." },
            { text: "Remind her that in the wilderness, you are a free man, not a servant.", nextScene: "s2_zoram_outsider", effect: { knowledge: 1, faith: 1 }, feedback: "You provide perspective." }
        ]
    },
    "s2_zoram_outsider": {
        text: "Laman publicly mocks you, calling you 'Laban’s runaway slave.' He tries to turn others against you by highlighting your former status.<br><i>(Context: Social Tension)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Bear humble testimony of your freedom through God.", nextScene: "s2_zoram_oath", effect: { faith: 2, worldly: -1 }, feedback: "You turn the other cheek." },
            { text: "Boast of your worth and superior skills as a smith.", nextScene: "s2_zoram_oath", effect: { worldly: 1, unity: -1 }, feedback: "You rely on pride." },
            { text: "Ignore his taunts entirely and walk away.", nextScene: "s2_zoram_oath", effect: { unity: 1 }, feedback: "Stoicism." }
        ]
    },
    "s2_zoram_oath": {
        text: "With Lehi nearing death and the family's division imminent, Nephi approaches you, asking for a reaffirmation of the solemn oath you made in Jerusalem.<br><i>(Read 1 Nephi 4:33)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Reaffirm your oath publicly and declare your fidelity to Nephi.", nextScene: "s2_zoram_blessing", effect: { faith: 2, unity: -2 }, feedback: "You draw clear lines." },
            { text: "Reaffirm your oath to Nephi privately, avoiding the notice of Laman.", nextScene: "s2_zoram_blessing", effect: { unity: 1, worldly: 1 }, feedback: "You choose prudence." },
            { text: "Pledge loyalty to 'the family unit,' rather than to Nephi alone.", nextScene: "s2_zoram_blessing", effect: { unity: 2, faith: -1 }, feedback: "Diplomatic ambiguity." }
        ]
    },
    "s2_zoram_blessing": {
        text: "In his final words, Lehi declares a sacred blessing over you: that your seed shall be numbered with Nephi's seed. This is a promise of inclusion.<br><i>(Read 2 Nephi 1:30-32)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi"],
        choices: [
            { text: "Humbly accept this covenant promise with deep gratitude.", nextScene: "s2_zoram_offer", effect: { faith: 2, unity: 1 }, covenantUnlock: "Faith", feedback: "Covenant acceptance." },
            { text: "Worry that this new identity will cause you to lose your former heritage.", nextScene: "s2_zoram_offer", effect: { worldly: 1, unity: -1 }, feedback: "Identity struggle." },
            { text: "Ask Lehi for clarification on your material inheritance in the new land.", nextScene: "s2_zoram_offer", effect: { knowledge: 1, worldly: 1 }, feedback: "Pragmatism." }
        ]
    },
    "s2_zoram_offer": {
        text: "Laman and Lemuel privately approach you, offering you a high place of leadership and riches if you will break your oath and join their cause.<br><i>(Context: Temptation)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Rebuke their wicked scheme with bold words.", nextScene: "s2_zoram_plot", effect: { faith: 1, unity: -2 }, feedback: "Loyalty." },
            { text: "Feign interest in their offer to learn the details of their plot.", nextScene: "s2_zoram_plot", effect: { knowledge: 2, faith: -2 }, feedback: "Deception." },
            { text: "Politely decline their offer, prioritizing your own safety.", nextScene: "s2_zoram_plot", effect: { unity: 1, worldly: 1 }, feedback: "Safety." }
        ]
    },
    "s2_zoram_plot": {
        text: "Whether by revelation or espionage, the awful truth is clear: Laman and Lemuel intend to murder Nephi.<br><i>(Read 2 Nephi 5:3)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman", "Nephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Go to Nephi immediately and inform him of the deadly plot.", nextScene: "s2_zoram_ultimatum", effect: { faith: 1, unity: 1 }, feedback: "Duty." },
            { text: "Confront Laman alone, hoping to shame him into stopping.", nextScene: "s2_zoram_ultimatum", effect: { unity: -2, worldly: 1 }, feedback: "Vigilante justice." },
            { text: "Secretly secure weapons and stand guard over Nephi.", nextScene: "s2_zoram_ultimatum", effect: { knowledge: 1, worldly: 1 }, feedback: "Preparation." }
        ]
    },
    "s2_zoram_ultimatum": {
        text: "The Lord commands Nephi to flee. Your wife, one of the daughters of Ishmael, is hesitant to leave her beloved sisters (Laman's wives) behind.<br><i>(Context: Family Split)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["WifeOfNephi"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Command your wife: 'We follow the Prophet and his word, regardless of the cost.'", nextScene: "s2_zoram_house", effect: { faith: 2, unity: -1 }, feedback: "Patriarchal authority." },
            { text: "Appeal to logic: 'Our safety requires us to leave now.'", nextScene: "s2_zoram_house", effect: { worldly: 1, unity: 1 }, feedback: "Reason." },
            { text: "Plead with her: 'My life depends on your decision to follow me.'", nextScene: "s2_zoram_house", effect: { unity: 2, faith: -2 }, feedback: "Prioritizing marriage." }
        ]
    },
    "s2_zoram_house": {
        text: "You must walk away from the sturdy home you helped build and furnish. This material loss is immense, and Laman's group will claim it all.<br><i>(Context: Sacrifice)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Turn your back and walk away without a second look.", nextScene: "s2_zoram_march", effect: { faith: 2, worldly: -1 }, feedback: "Lot's wife lesson." },
            { text: "Quickly trade the home's contents for immediate provisions.", nextScene: "s2_zoram_march", effect: { worldly: 2, knowledge: 1 }, feedback: "Resource gathering." },
            { text: "Leave a formal note giving Laman ownership of the property.", nextScene: "s2_zoram_march", effect: { unity: 2, faith: -1 }, feedback: "Bridge burning with love." }
        ]
    },
    "s2_zoram_march": {
        text: "You lead the small company into the wilderness. The darkness and the threat of pursuit make the pace slow and fearful.<br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Nephi"],
        choices: [
            { text: "Take position in the rear to watch for Laman's pursuit.", nextScene: "s2_zoram_identity", effect: { knowledge: 1, worldly: 1 }, feedback: "Guardian role." },
            { text: "Spend your strength carrying the youngest children and burdens.", nextScene: "s2_zoram_identity", effect: { unity: 2, faith: 1 }, feedback: "Nurturing role." },
            { text: "Walk closely with Nephi, offering counsel and support.", nextScene: "s2_zoram_identity", effect: { faith: 1, knowledge: 1 }, feedback: "Leadership role." }
        ]
    },
    "s2_zoram_identity": {
        text: "You settle and Nephi begins to categorize the believers as 'Nephites' and the apostates as 'Lamanites.' He must decide where to place you.<br><i>(Read Jacob 1:13)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Nephi"],
        choices: [
            { text: "Fully embrace the name 'Nephite' as your new identity.", nextScene: "module_end_story_division", effect: { unity: 2, faith: 1 }, feedback: "Story Module Complete." },
            { text: "Ask to keep the distinction of 'Zoramite' for your descendants.", nextScene: "module_end_story_division", effect: { knowledge: 1, worldly: 1 }, feedback: "Story Module Complete." },
            { text: "Insist that the focus should be on building a unified military strength, not names.", nextScene: "module_end_story_division", effect: { worldly: 2, unity: 1 }, feedback: "Story Module Complete." }
        ]
    }
});