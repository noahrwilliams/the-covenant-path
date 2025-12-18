// NEPHI DATA - STORY 2: THE GREAT DIVISION
window.STARTING_STATS["Nephi_S2"] = { 
    displayName: "Nephi",
    storyId: "division",
    faith: 12, unity: 8, worldly_influence: 0, knowledge: 5, 
    hasBrassPlates: true, initialScene: "s2_nephi_intro",
    bio: "The spiritual leader of the group. He carries the burden of the plates and the responsibility to lead those who will follow."
};

Object.assign(window.scenes, {
    "s2_nephi_intro": {
        text: "THE PROMISED LAND. You have arrived at last. The Lord reveals where to find ore, commanding you to forge a sacred record. Yet, the desperate need for farming tools to ensure survival screams louder than the forge.<br><i>(Read 1 Nephi 19:1-4)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Zoram"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Prioritize the creation of the sacred plates.", nextScene: "s2_nephi_isaiah", effect: { faith: 2, unity: -1, worldly: -1 }, feedback: "You obey, though the family grumbles at the extra labor." },
            { text: "Focus entirely on forging immediate survival tools.", nextScene: "s2_nephi_isaiah", effect: { unity: 1, worldly: 1, faith: -1 }, feedback: "You prioritize survival, delaying the Lord's command." },
            { text: "Teach Zoram the art of smithing to handle both tasks.", nextScene: "s2_nephi_isaiah", effect: { knowledge: 1, unity: 1 }, feedback: "You build skills in others, balancing the load." }
        ]
    },
    "s2_nephi_isaiah": {
        text: "The people are weary from labor; exhaustion and doubt cling to the camp. You gather them, hoping to lift their gaze heavenward by reading from the brass plates.<br><i>(Read 1 Nephi 19:23)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sam"],
        choices: [
            { text: "Preach the deep, challenging prophecies of Israel’s scattering.", nextScene: "s2_nephi_happiness", effect: { knowledge: 2, faith: 1, unity: -1 }, feedback: "You teach deep doctrine, but it is hard for some to understand." },
            { text: "Liken the familiar scriptures to the trials of your own journey.", nextScene: "s2_nephi_happiness", effect: { faith: 1, unity: 1 }, feedback: "You make the scriptures personal and comforting." },
            { text: "Focus only on promises of peace and temporal prosperity.", nextScene: "s2_nephi_happiness", effect: { unity: 2, worldly: 1, knowledge: -1 }, feedback: "You raise morale, but avoid the hard truths." }
        ]
    },
    "s2_nephi_happiness": {
        text: "Your father, Lehi, is fading, and with his health, the family unity fractures. Laman and Lemuel grow loud with their complaints against the hardships of the new settlement.<br><i>(Read 2 Nephi 1:2)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Call them sharply to repentance and warn them of their danger.", nextScene: "s2_nephi_blessing", effect: { faith: 2, unity: -2 }, feedback: "You speak with boldness, causing immediate friction." },
            { text: "Attempt to distract them from spiritual matters by organizing a feast.", nextScene: "s2_nephi_blessing", effect: { unity: 2, worldly: 1, faith: -1 }, feedback: "You offer a social solution to a spiritual problem." },
            { text: "Suffer in silence, working double shifts to alleviate the physical burdens.", nextScene: "s2_nephi_blessing", effect: { faith: -1, unity: 2 }, feedback: "You lead by example, but you are exhausted." }
        ]
    },
    "s2_nephi_blessing": {
        text: "Lehi gives his final blessing, delivering a powerful, specific warning and rebuke to Laman. Laman, enraged, turns his accusation on you: you are a deceiver seeking power.<br><i>(Read 2 Nephi 1:25-27)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Boldly affirm your father's prophecy and rebuke of Laman.", nextScene: "s2_nephi_death", effect: { faith: 1, unity: -3 }, feedback: "You stand with the prophet, further alienating your brothers." },
            { text: "Remain silent, unwilling to deepen the rift while your father is dying.", nextScene: "s2_nephi_death", effect: { unity: 1, faith: -1 }, feedback: "You avoid conflict, but show weakness." },
            { text: "Humble yourself and offer to serve Laman and his family.", nextScene: "s2_nephi_death", effect: { unity: 1, worldly: -1 }, feedback: "You show humility, though they may despise it." }
        ]
    },
    "s2_nephi_death": {
        text: "The spiritual anchor is lifted—Lehi is dead. Laman immediately asserts his natural right as the eldest to rule the whole company.<br><i>(Read 2 Nephi 4:12-13)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Submit entirely to Laman's authority to preserve peace.", nextScene: "s2_nephi_psalm", effect: { unity: 3, faith: -3 }, feedback: "You choose peace at the cost of the Covenant." },
            { text: "Assert your spiritual keys of authority and the Lord's chosen order.", nextScene: "s2_nephi_psalm", effect: { faith: 2, unity: -2 }, feedback: "You speak truth, but it is interpreted as ambition." },
            { text: "Propose a political solution: an equal separation of duties and supplies.", nextScene: "s2_nephi_psalm", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "You attempt a political compromise." }
        ]
    },
    "s2_nephi_psalm": {
        text: "You are overwhelmed by deep, wretched sorrow—not only for your father's death, but for the anger and bitterness you harbor toward your hostile brothers. Your soul grieves.<br><i>(Read 2 Nephi 4:17-19)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Cry unto God, trusting in the Rock of your salvation.", nextScene: "s2_nephi_plot", effect: { faith: 3, worldly: -2 }, covenantUnlock: "Repentance", feedback: "You trust in the Rock of your salvation. (See 2 Nephi 4:30-35)" },
            { text: "Stifle the grief, losing yourself in backbreaking labor.", nextScene: "s2_nephi_plot", effect: { worldly: 2, faith: -1 }, feedback: "You use work to cope with sorrow." },
            { text: "Seek human comfort by venting your frustrations to your brother Sam.", nextScene: "s2_nephi_plot", effect: { unity: 2 }, feedback: "You seek human comfort." }
        ]
    },
    "s2_nephi_plot": {
        text: "The Lord's voice pierces your anguish, revealing a deadly plot: Laman and Lemuel intend to take your life.<br><i>(Read 2 Nephi 5:2-4)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Immediately pray for the softening of your brothers' hardened hearts.", nextScene: "s2_nephi_flee", effect: { faith: 2 }, feedback: "You maintain spiritual optimism." },
            { text: "Focus on physical survival, secretly preparing for a violent defense.", nextScene: "s2_nephi_flee", effect: { knowledge: 1, worldly: 1 }, feedback: "You prepare for physical violence." },
            { text: "Confront them unarmed, offering repentance one final time.", nextScene: "s2_nephi_flee", effect: { unity: -2, faith: 1 }, feedback: "You risk your life to cry repentance one last time." }
        ]
    },
    "s2_nephi_flee": {
        text: "The command is final and immediate: 'Depart from them into the wilderness.' Obedience means abandoning your established home, goods, and ties.<br><i>(Read 2 Nephi 5:5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Sam", "Zoram"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Obey the command without hesitation, leaving immediately.", nextScene: "s2_nephi_items", effect: { faith: 2, unity: -1, worldly: -3 }, covenantUnlock: "Faith", feedback: "Exact obedience." },
            { text: "Plead with the Lord for one last chance to save them.", nextScene: "s2_nephi_items", effect: { unity: 1 }, feedback: "You are reluctant to sever ties." },
            { text: "Spend time planning a secret, logistically sound evacuation.", nextScene: "s2_nephi_items", effect: { knowledge: 1, worldly: 0 }, feedback: "You focus on logistics." }
        ]
    },
    "s2_nephi_items": {
        text: "As you gather those who will follow you, you must take the sacred Plates and the Liahona. Taking these records confirms Laman's claim that you are a 'robber.'<br><i>(Read 2 Nephi 5:12)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Take both, asserting your role as the rightful custodian of the records.", nextScene: "s2_nephi_depart", effect: { faith: 1, unity: -2 }, feedback: "You accept the conflict to preserve the records." },
            { text: "Leave the Liahona, hoping to lessen Laman's anger while keeping the Plates.", nextScene: "s2_nephi_depart", effect: { unity: 1, faith: -2 }, feedback: "A bad compromise." },
            { text: "Pause the departure to explain to the believers why the Plates must go.", nextScene: "s2_nephi_depart", effect: { knowledge: 1, unity: 1 }, feedback: "You build consensus among the believers." }
        ]
    },
    "s2_nephi_depart": {
        text: "As the two camps divide, you must allocate the essential supplies—the herds and provisions—before you depart and sever all ties.<br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram"],
        choices: [
            { text: "Insist on taking your fair share of all the herds and provisions.", nextScene: "s2_nephi_sword", effect: { worldly: 1, unity: -1 }, feedback: "You claim justice." },
            { text: "Leave the best herds to Laman's group to prevent pursuit.", nextScene: "s2_nephi_sword", effect: { unity: 1, faith: 1, worldly: -2 }, feedback: "You sacrifice property to prevent pursuit." },
            { text: "Take only what you and the company can carry, trusting in providence.", nextScene: "s2_nephi_sword", effect: { faith: 2, worldly: -1 }, feedback: "Total reliance on the Lord." }
        ]
    },
    "s2_nephi_sword": {
        text: "You begin a new life in the Land of Nephi. To protect your people from the inevitable threat, you fashion swords, taking the sword of Laban as your model.<br><i>(Read 2 Nephi 5:14)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Consecrate the weapons, teaching the people to rely on the Lord for defense.", nextScene: "s2_nephi_king", effect: { faith: 2, worldly: -1 }, feedback: "You teach that the Lord is your defense." },
            { text: "Focus on military drilling and training, relying on the arm of flesh.", nextScene: "s2_nephi_king", effect: { worldly: 2, knowledge: 1, faith: -1 }, feedback: "You rely on the arm of flesh." },
            { text: "Invest the time in building strong defensive walls around the settlement.", nextScene: "s2_nephi_king", effect: { unity: 1, worldly: 1 }, feedback: "You focus on defensive posture." }
        ]
    },
    "s2_nephi_king": {
        text: "Out of respect, loyalty, and their spiritual need, the people unanimously desire and request that you be their king and temporal ruler.<br><i>(Read 2 Nephi 5:16-18)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram", "Sam"],
        choices: [
            { text: "Humbly refuse, saying: 'I will be your teacher and servant.'", nextScene: "module_end_story_division", effect: { faith: 1, unity: 1 }, feedback: "Story Module Complete." },
            { text: "Accept the title, believing you must bear the full temporal burden.", nextScene: "module_end_story_division", effect: { knowledge: 1, unity: 1, faith: -3 }, feedback: "Story Module Complete." },
            { text: "Deflect the attention to the Temple: 'Build the House of the Lord first.'", nextScene: "module_end_story_division", effect: { faith: 3, unity: 1 }, feedback: "Story Module Complete." }
        ]
    }
});