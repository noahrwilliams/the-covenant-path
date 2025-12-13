window.STARTING_STATS["Nephi_S2"] = { 
    faith: 12, unity: 8, worldly_influence: 0, knowledge: 5, 
    hasBrassPlates: true, initialScene: "s2_nephi_intro",
    bio: "The spiritual leader of the group. He carries the burden of the plates and the responsibility to lead those who will follow."
};

Object.assign(window.scenes, {
    "s2_nephi_intro": {
        text: "THE PROMISED LAND. You have arrived. You find ore in the earth. The Lord commands you to make plates for a spiritual record, but the family needs farming tools for survival.<br><br><i>(Read 1 Nephi 19:1-4)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Zoram"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Prioritize the plates (Obedience).", nextScene: "s2_nephi_isaiah", effect: { faith: 2, unity: -1, worldly: -1 }, feedback: "You obey, though the family grumbles at the extra labor." },
            { text: "Make tools first (Pragmatism).", nextScene: "s2_nephi_isaiah", effect: { unity: 1, worldly: 1, faith: -1 }, feedback: "You prioritize survival, delaying the Lord's command." },
            { text: "Teach Zoram to smith (Delegation).", nextScene: "s2_nephi_isaiah", effect: { knowledge: 1, unity: 1 }, feedback: "You build skills in others, balancing the load." }
        ]
    },
    "s2_nephi_isaiah": {
        text: "The people are weary from labor. You gather them to read from the brass plates.<br><br><i>(Read 1 Nephi 19:23)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sam"],
        choices: [
            { text: "Preach the scattering of Israel.", nextScene: "s2_nephi_happiness", effect: { knowledge: 2, faith: 1, unity: -1 }, feedback: "You teach deep doctrine, but it is hard for some to understand." },
            { text: "Liken the scriptures to your journey.", nextScene: "s2_nephi_happiness", effect: { faith: 1, unity: 1 }, feedback: "You make the scriptures personal and comforting." },
            { text: "Focus on promises of prosperity.", nextScene: "s2_nephi_happiness", effect: { unity: 2, worldly: 1, knowledge: -1 }, feedback: "You raise morale, but avoid the hard truths." }
        ]
    },
    "s2_nephi_happiness": {
        text: "Lehi is old. Laman and Lemuel complain about the difficulty of the new settlement.<br><br><i>(Read 2 Nephi 1:2)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        choices: [
            { text: "Call them to repentance.", nextScene: "s2_nephi_blessing", effect: { faith: 2, unity: -2 }, feedback: "You speak with boldness, causing immediate friction." },
            { text: "Organize a feast.", nextScene: "s2_nephi_blessing", effect: { unity: 2, worldly: 1, faith: -1 }, feedback: "You offer a social solution to a spiritual problem." },
            { text: "Work double shifts yourself.", nextScene: "s2_nephi_blessing", effect: { faith: -1, unity: 2 }, feedback: "You lead by example, but you are exhausted." }
        ]
    },
    "s2_nephi_blessing": {
        text: "Lehi gives his final blessing. He rebukes Laman and warns him. Laman accuses you of seeking power.<br><br><i>(Read 2 Nephi 1:25-27)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi", "Laman"],
        choices: [
            { text: "Second your father's warning.", nextScene: "s2_nephi_death", effect: { faith: 1, unity: -3 }, feedback: "You stand with the prophet, further alienating your brothers." },
            { text: "Remain silent.", nextScene: "s2_nephi_death", effect: { unity: 1, faith: -1 }, feedback: "You avoid conflict, but show weakness." },
            { text: "Offer to serve them.", nextScene: "s2_nephi_death", effect: { unity: 2, worldly: -1 }, feedback: "You show humility, though they may despise it." }
        ]
    },
    "s2_nephi_death": {
        text: "Lehi dies. The spiritual anchor is gone. Laman asserts his right to rule.<br><br><i>(Read 2 Nephi 4:12-13)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            { text: "Submit to Laman.", nextScene: "s2_nephi_psalm", effect: { unity: 3, faith: -3 }, feedback: "You choose peace at the cost of the Covenant." },
            { text: "Assert your priesthood keys.", nextScene: "s2_nephi_psalm", effect: { faith: 2, unity: -2 }, feedback: "You speak truth, but it is interpreted as ambition." },
            { text: "Propose separation of duties.", nextScene: "s2_nephi_psalm", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "You attempt a political compromise." }
        ]
    },
    "s2_nephi_psalm": {
        text: "You feel wretched because of your anger toward your brethren. Your soul grieves.<br><br><i>(Read 2 Nephi 4:17-19)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Cry unto God (Psalm of Nephi).", nextScene: "s2_nephi_plot", effect: { faith: 3, worldly: -2 }, covenantUnlock: "Repentance", feedback: "You trust in the Rock of your salvation. (See 2 Nephi 4:30-35)" },
            { text: "Lose yourself in hard labor.", nextScene: "s2_nephi_plot", effect: { worldly: 2, faith: -1 }, feedback: "You use work to cope with sorrow." },
            { text: "Vent to Sam.", nextScene: "s2_nephi_plot", effect: { unity: 2 }, feedback: "You seek human comfort." }
        ]
    },
    "s2_nephi_plot": {
        text: "The Lord warns you that Laman plans to take your life.<br><br><i>(Read 2 Nephi 5:2-4)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        choices: [
            { text: "Pray for their hearts to soften.", nextScene: "s2_nephi_flee", effect: { faith: 2 }, feedback: "You maintain spiritual optimism." },
            { text: "Prepare a defense.", nextScene: "s2_nephi_flee", effect: { knowledge: 1, worldly: 1 }, feedback: "You prepare for physical violence." },
            { text: "Confront them unarmed.", nextScene: "s2_nephi_flee", effect: { unity: -2, faith: 1 }, feedback: "You risk your life to cry repentance one last time." }
        ]
    },
    "s2_nephi_flee": {
        text: "The Lord commands you to flee into the wilderness. This means abandoning your home.<br><br><i>(Read 2 Nephi 5:5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Sam", "Zoram"],
        choices: [
            { text: "Obey immediately.", nextScene: "s2_nephi_items", effect: { faith: 2, unity: -1 }, covenantUnlock: "Faith", feedback: "Exact obedience." },
            { text: "Plead for one last chance to save them.", nextScene: "s2_nephi_items", effect: { unity: 1 }, feedback: "You are reluctant to sever ties." },
            { text: "Plan a secret evacuation.", nextScene: "s2_nephi_items", effect: { knowledge: 1, worldly: 1 }, feedback: "You focus on logistics." }
        ]
    },
    "s2_nephi_items": {
        text: "You must take the Plates and Liahona. Taking them confirms to Laman you are a 'robber'.<br><br><i>(Read 2 Nephi 5:12)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Take them as rightful custodian.", nextScene: "s2_nephi_depart", effect: { faith: 1, unity: -2 }, feedback: "You accept the conflict to preserve the records." },
            { text: "Leave the Liahona, take Plates.", nextScene: "s2_nephi_depart", effect: { unity: 1, faith: -2 }, feedback: "A bad compromise." },
            { text: "Explain to the group why they must go.", nextScene: "s2_nephi_depart", effect: { knowledge: 1, unity: 1 }, feedback: "You build consensus among the believers." }
        ]
    },
    "s2_nephi_depart": {
        text: "Dividing the camp supplies before departure.<br><br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram"],
        choices: [
            { text: "Take your fair share of herds.", nextScene: "s2_nephi_sword", effect: { worldly: 1, unity: -1 }, feedback: "You claim justice." },
            { text: "Leave the best herds to Laman.", nextScene: "s2_nephi_sword", effect: { unity: 1, faith: 1, worldly: -2 }, feedback: "You sacrifice property to prevent pursuit." },
            { text: "Take only what you can carry.", nextScene: "s2_nephi_sword", effect: { faith: 2, worldly: -1 }, feedback: "Total reliance on the Lord." }
        ]
    },
    "s2_nephi_sword": {
        text: "In the new land, you model swords after Laban's for defense.<br><br><i>(Read 2 Nephi 5:14)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Consecrate the weapons.", nextScene: "s2_nephi_king", effect: { faith: 2, worldly: -1 }, feedback: "You teach that the Lord is your defense." },
            { text: "Focus on drilling and training.", nextScene: "s2_nephi_king", effect: { worldly: 2, knowledge: 1, faith: -1 }, feedback: "You rely on the arm of flesh." },
            { text: "Build defensive walls.", nextScene: "s2_nephi_king", effect: { unity: 1, worldly: 1 }, feedback: "You focus on defensive posture." }
        ]
    },
    "s2_nephi_king": {
        text: "The people want you to be their King.<br><br><i>(Read 2 Nephi 5:16-18)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram", "Sam"],
        choices: [
            { text: "Refuse: 'I will be your teacher.'", nextScene: "start_screen_transition", effect: { faith: 1, unity: 1 }, feedback: "Story Module Complete." },
            { text: "Accept: 'I will bear the burden.'", nextScene: "start_screen_transition", effect: { knowledge: 1, unity: 1, faith: -1 }, feedback: "Story Module Complete." },
            { text: "Deflect: 'Build the Temple first.'", nextScene: "start_screen_transition", effect: { faith: 3, worldly: -1 }, feedback: "Story Module Complete." }
        ]
    }
});