// JACOB DATA - STORY 3: THE VINEYARD
window.STARTING_STATS["Jacob"] = { 
    displayName: "Jacob",
    storyId: "vineyard",
    faith: 8, unity: 8, worldly_influence: 2, knowledge: 5, 
    hasBrassPlates: true, initialScene: "s3_jacob_intro",
    bio: "The prophet entrusted with the small plates. He carries the burden of teaching Christ's doctrine while witnessing the growing pride and sins of the Nephite people."
};

// JACOB SCENES - COMPLETE ARC
Object.assign(window.scenes, {
    
    // --- SCENE 1: JACOB TAKES THE PLATES ---
    "s3_jacob_intro": {
        // CORRECTION APPLIED: Nephi was the spiritual leader, not explicitly 'King Nephi'.
        // The text now reflects Nephi's death and the succession of the plates per Jacob 1:9-11.
        text: "After the death of your brother Nephi, the spiritual leader, the people appointed a new temporal ruler. Nephi had commanded you, his younger brother, to take charge of the small plates—the sacred record—and teach the people, though you felt unworthy of such a burden.<br><br><i>(Read Jacob 1:9-11)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Nephi_S2"],
        // EROSION #1: The responsibility itself is a burden that introduces anxiety.
        onEnter: { faith: -1, worldly: 1 }, 
        choices: [
            // F+U+K-W: 1+1+1 - 1 = +2 (Marginal)
            { text: "Humbly accept the charge, resolving to preach what God commands.", nextScene: "s3_jacob_vocation", effect: { faith: 1, unity: 1, knowledge: 1, worldly: -1 }, feedback: "You submit to God's will." },
            // F+U+K-W: -1+0+0 - 1 = -2 (Marginal)
            { text: "Spend a month preparing in solitude, delaying your first public sermon.", nextScene: "s3_jacob_vocation", effect: { faith: -1, knowledge: 0, worldly: 1 }, feedback: "You delay, gaining comfort but losing momentum." },
            // F+U+K-W: 1+0+0 - 1 = +0 (Good)
            { text: "Commit fully to the records, but refuse the King’s offer of a high temporal salary.", nextScene: "s3_jacob_vocation", effect: { faith: 1, worldly: -1 }, feedback: "You protect your integrity." }
        ]
    },

    // --- SCENE 2: CONFLICTING DUTIES ---
    "s3_jacob_vocation": {
        text: "You must magnify your office, yet you also have a family to support. The needs of the church and your personal life often seem to conflict.<br><br><i>(Read Jacob 1:19)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #2: The pressure of dividing your time causes strain.
        onEnter: { unity: -1, worldly: 1 },
        choices: [
            // F+U+K-W: 1+0+0 - 0 = +1 (Good)
            { text: "Trust the Lord to provide for your family while you focus on the spiritual work.", nextScene: "s3_jacob_wealth", effect: { faith: 1, worldly: 0 }, feedback: "You prioritize the word of God." },
            // F+U+K-W: 0+1+0 - 1 = +0 (Good)
            { text: "Take on a secondary craft to secure your family's finances.", nextScene: "s3_jacob_wealth", effect: { unity: 1, worldly: 1 }, feedback: "You provide temporally, but draw attention." },
            // F+U+K-W: 0+0+1 - (-1) = +2 (Marginal) -- KNOWLEDGE #1
            { text: "Study day and night to ensure every sermon is doctrinally perfect.", nextScene: "s3_jacob_wealth", effect: { knowledge: 1, worldly: -1 }, covenantUnlock: "Knowledge", feedback: "You gain knowledge, but lose sleep." }
        ]
    },

    // --- SCENE 3: RISING WEALTH AND PRIDE ---
    "s3_jacob_wealth": {
        text: "Years pass. The Nephites have prospered greatly. Their hearts begin to cling to the riches of the world, forgetting the covenant path they walked in the wilderness.<br><br><i>(Read Jacob 2:13)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #3: Worldly success breeds spiritual decay.
        onEnter: { worldly: 2, unity: -1 },
        choices: [
            // F+U+K-W: 1-1+0 - (-1) = +1 (Good)
            { text: "Condemn the pride immediately, before it takes deep root in the community.", nextScene: "s3_jacob_sermon", effect: { faith: 1, unity: -1, worldly: -1 }, feedback: "Your zeal causes tension." },
            // F+U+K-W: 1+1+0 - 1 = +1 (Good)
            { text: "Preach charity and service, hoping to redirect their hearts gradually.", nextScene: "s3_jacob_sermon", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "You try to mitigate the damage." },
            // F+U+K-W: -1-1+0 - 0 = -2 (Corrected from -3)
            { text: "Accept the prosperity as a temporal blessing, avoiding confrontation for now.", nextScene: "s3_jacob_sermon", effect: { faith: -1, unity: -1, worldly: 0 }, feedback: "You rationalize their actions." }
        ]
    },

    // --- SCENE 4: THE TEMPLE PULPIT ---
    "s3_jacob_sermon": {
        text: "You gather the people to the temple to deliver a stern and difficult sermon. They have come not seeking God, but to parade their wealth and status. You feel the anguish of your calling.<br><br><i>(Read Jacob 2:2)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #4: Feeling separate from the people you serve.
        onEnter: { faith: -1, unity: -2 },
        choices: [
            // F+U+K-W: 1-1+1 - (-1) = +2 (Marginal) -- KNOWLEDGE #2
            { text: "Speak the truth plainly and powerfully, asking God to forgive your boldness.", nextScene: "s3_jacob_apparel", effect: { faith: 1, unity: -1, knowledge: 1, worldly: -1 }, feedback: "You preach with great power." },
            // F+U+K-W: -1+1+0 - 1 = -1 (Good)
            { text: "Soft-pedal the harshest commandments to avoid causing more offense.", nextScene: "s3_jacob_apparel", effect: { faith: -1, unity: 1, worldly: 1 }, feedback: "You compromise the message." },
            // F+U+K-W: 1+0-1 - (-1) = +1 (Good)
            { text: "Appeal directly to the Spirit, letting your own weaknesses show.", nextScene: "s3_jacob_apparel", effect: { faith: 1, knowledge: -1, worldly: -1 }, feedback: "You receive revelation, but feel inadequate." }
        ]
    },

    // --- SCENE 5: JUDGMENTS BASED ON CLOTHING ---
    "s3_jacob_apparel": {
        text: "You note that the people are judging one another 'because of the costliness of their apparel,' forgetting that God views all men equally in their poverty and wealth.<br><br><i>(Read Jacob 2:13, 16)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #5: Witnessing their vanity causes spiritual pain.
        onEnter: { worldly: 1, faith: -1 },
        choices: [
            // F+U+K-W: 0+0+0 - 0 = +0 (Good)
            { text: "Teach them that seeking riches is permissible *only* if they first seek the kingdom of God.", nextScene: "s3_jacob_lust", effect: { worldly: 0 }, feedback: "You teach correct priorities." },
            // F+U+K-W: 0-2+0 - (-1) = -1 (Good)
            { text: "Demand they simplify their lives and give away their finest garments.", nextScene: "s3_jacob_lust", effect: { unity: -2, worldly: -1 }, feedback: "Your command causes resentment." },
            // F+U+K-W: 1+1+0 - 1 = +1 (Good)
            { text: "Emphasize charity: that they must clothe the naked before adorning themselves.", nextScene: "s3_jacob_lust", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "You focus on righteous action." }
        ]
    },

    // --- SCENE 6: BROKEN HEARTS ---
    "s3_jacob_lust": {
        text: "Now you must address the 'grosser crime'—the scandalous behavior among the men that is breaking the hearts of their innocent wives and children.<br><br><i>(Read Jacob 2:7, 9)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #6: Sympathy and anguish for the innocent.
        onEnter: { unity: -2, worldly: 1 },
        choices: [
            // F+U+K-W: 1-1+0 - (-1) = +1 (Good)
            { text: "Preach repentance for the grosser crime with all the energy of your soul.", nextScene: "s3_jacob_monogamy", effect: { faith: 1, unity: -1, worldly: -1 }, feedback: "You speak the necessary, sharp word." },
            // F+U+K-W: 1+1+0 - 0 = +2 (Marginal)
            { text: "Spend time comforting the afflicted wives and children before confronting the men.", nextScene: "s3_jacob_monogamy", effect: { faith: 1, unity: 1, worldly: 0 }, feedback: "You prioritize healing." },
            // F+U+K-W: -1+1+0 - 1 = -1 (Good)
            { text: "Warn the women to leave the temple and spare them the shame of the sermon.", nextScene: "s3_jacob_monogamy", effect: { faith: -1, unity: 1, worldly: 1 }, feedback: "You seek to shelter them from truth." }
        ]
    },
    
    // --- SCENE 7: PLURAL MARRIAGE DOCTRINE ---
    "s3_jacob_monogamy": {
        text: "The men justify their actions by citing the practices of David and Solomon. You must clarify the doctrinal stance on plural marriage.<br><br><i>(Read Jacob 2:27-28)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #7: Facing down a difficult, contentious doctrine.
        onEnter: { faith: -1, unity: -1 },
        choices: [
            // F+U+K-W: 1-1+1 - (-1) = +2 (Marginal) -- KNOWLEDGE #3
            { text: "State clearly: 'One wife and no concubines' unless commanded by God.", nextScene: "s3_jacob_lamanites", effect: { faith: 1, unity: -1, knowledge: 1, worldly: -1 }, feedback: "You define the boundary clearly." },
            // F+U+K-W: 0+1+0 - (-1) = +2 (Marginal)
            { text: "Focus entirely on the need for men to treat their *only* wife with pure love.", nextScene: "s3_jacob_lamanites", effect: { unity: 1, worldly: -1 }, feedback: "You sidestep the doctrinal rule." },
            // F+U+K-W: 1+0+0 - (-1) = +2 (Marginal)
            { text: "Call for a fast and general assembly to seek a definitive answer from God.", nextScene: "s3_jacob_lamanites", effect: { faith: 1, worldly: -1 }, covenantUnlock: "Prayer to Seek Guidance", feedback: "You appeal to a higher power." }
        ]
    },

    // --- SCENE 8: LAMENTING THE LAMANITES ---
    "s3_jacob_lamanites": {
        text: "In a powerful, shaming comparison, you declare that the Lamanites—whom the Nephites despise—are more righteous in their marital practices than the Nephites.<br><br><i>(Read Jacob 3:5-7)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #8: Using the cultural enemy as an example causes unity breakdown.
        onEnter: { unity: -2, worldly: 1 },
        choices: [
            // F+U+K-W: 1+0+0 - (-1) = +2 (Corrected from +3)
            { text: "Focus the people's attention on the promise of the Lord's mercy if they repent.", nextScene: "s3_jacob_plates_testimony", effect: { faith: 1, unity: 0, worldly: -1 }, feedback: "You show them the path back." },
            // F+U+K-W: 0-1+0 - 1 = -2 (Marginal)
            { text: "Exhort them to remember the Lamanites' fate as a warning, not just an example.", nextScene: "s3_jacob_plates_testimony", effect: { unity: -1, worldly: 1 }, feedback: "You use fear to motivate." },
            // F+U+K-W: 1+1+0 - 0 = +2 (Marginal)
            { text: "Offer to go out and preach repentance to the Lamanites to set a proper example.", nextScene: "s3_jacob_plates_testimony", effect: { faith: 1, unity: 1, worldly: 0 }, feedback: "You take the path of service." }
        ]
    },
    
    // --- SCENE 9: WRITING THE PLATES ---
    "s3_jacob_plates_testimony": {
        text: "You are commanded to write upon the small plates what is most sacred. Should you focus on the history and prophecy, or on your own strong testimony of Christ?<br><br><i>(Read Jacob 4:1-6)</i>",
        backgroundAsset: "vision_room",
        castAssets: [],
        // NO EROSION: A moment of peace and reflection in the writing.
        onEnter: { faith: 1 },
        choices: [
            // F+U+K-W: 1+0+0 - (-1) = +2 (Marginal)
            { text: "Write Christ’s name and testimony plainly on the plates for future generations.", nextScene: "s3_jacob_sherem_approach", effect: { faith: 1, worldly: -1 }, feedback: "You fulfill the spirit of the command." },
            // F+U+K-W: -1+1+0 - 1 = -1 (Good)
            { text: "Focus on the history and prophecies, keeping your testimony personal.", nextScene: "s3_jacob_sherem_approach", effect: { faith: -1, unity: 1, worldly: 1 }, feedback: "You write a less personal, but thorough record." },
            // F+U+K-W: 1+0+0 - 0 = +1 (Good)
            { text: "Write the warning to posterity that they should not seek after riches.", nextScene: "s3_jacob_sherem_approach", effect: { faith: 1 }, feedback: "You prioritize a critical warning." }
        ]
    },

    // --- SCENE 10: SHEREM SPREADS RUMORS ---
    "s3_jacob_sherem_approach": {
        text: "A man named Sherem, educated and skilled in flattery, begins secretly spreading rumors against you and denying the need for Christ. His words unsettle the community.<br><br><i>(Read Jacob 7:1-4)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Sherem"], 
        // EROSION #9: Antagonism and deceit attack the foundation of faith.
        onEnter: { faith: -2, unity: -1 },
        choices: [
            // F+U+K-W: 0+1+0 - 1 = +0 (Good)
            { text: "Ignore the rumors, focusing only on reinforcing the truth to the faithful.", nextScene: "s3_jacob_sherem_confrontation", effect: { unity: 1, worldly: 1 }, feedback: "You avoid conflict, but the poison spreads." },
            // F+U+K-W: 1-1+0 - (-1) = +1 (Good)
            { text: "Publicly denounce Sherem by name and challenge him to a confrontation.", nextScene: "s3_jacob_sherem_confrontation", effect: { faith: 1, unity: -1, worldly: -1 }, feedback: "You force the issue, causing a schism." },
            // F+U+K-W: 0+1+0 - (-1) = +2 (Marginal)
            { text: "Send faithful elders to privately discuss doctrine with Sherem.", nextScene: "s3_jacob_sherem_confrontation", effect: { unity: 1, worldly: -1 }, feedback: "You attempt a peaceable solution." }
        ]
    },

    // --- SCENE 11: CONFRONTING SHEREM ---
    "s3_jacob_sherem_confrontation": {
        text: "Sherem demands a sign, challenging your authority and your faith in Christ. You are faced with the choice to either deliver a powerful testimony or let him continue his destruction.<br><br><i>(Read Jacob 7:13)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Sherem"], 
        // EROSION #10: The pressure of a public, spiritual debate.
        onEnter: { worldly: 1, unity: -1 },
        choices: [
            // F+U+K-W: 1+0+0 - (-1) = +2 (Marginal)
            { text: "Deliver a powerful, definitive testimony of Christ, backed by scripture.", nextScene: "s3_jacob_end", effect: { faith: 1, worldly: -1 }, covenantUnlock: "Faith", feedback: "The Spirit attends your words with great power." },
            // F+U+K-W: 1+0+0 - (-1) = +2 (Corrected from +3)
            { text: "Ask God to show a sign *not* for yourself, but for the sake of the people.", nextScene: "s3_jacob_end", effect: { faith: 1, worldly: -1 }, feedback: "You risk seeking a sign, but for a selfless purpose." },
            // F+U+K-W: -1+0+0 - 1 = -2 (Marginal)
            { text: "Attempt to reason Sherem out of his error using logic and philosophy.", nextScene: "s3_jacob_end", effect: { faith: -1, worldly: 1 }, feedback: "Your logic is sound, but fails to convert his heart." }
        ]
    },

    // --- SCENE 12: THE CONCLUSION ---
    "s3_jacob_end": {
        text: "After Sherem's confession and death, the people are restored to their faith. You seal the small plates, handing them to your son Enos, concluding your life's labor as a prophet and priest. Your record is preserved.<br><br><i>(Read Jacob 7:27)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        choices: [
            // Final Scene ID is correct: "module_end_story_[storyID]"
            { text: "End Story: The Vineyard", nextScene: "module_end_story_vineyard", effect: {}, feedback: "The vineyard is tended. Your record is sealed." },
        ]
    }
});















Object.assign(window.scenes, {
    "s2_nephi_intro": {
        text: "THE PROMISED LAND. You have arrived at last. The Lord reveals where to find ore, commanding you to forge a sacred record. Yet, the desperate need for farming tools to ensure survival screams louder than the forge.<br><br><i>(Read 1 Nephi 19:1-4)</i>",
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
        text: "The people are weary from labor; exhaustion and doubt cling to the camp. You gather them, hoping to lift their gaze heavenward by reading from the brass plates.<br><br><i>(Read 1 Nephi 19:23)</i>",
        backgroundAsset: "promised_land",
        castAssets: ["Lehi", "Sam"],
        choices: [
            { text: "Preach the deep, challenging prophecies of Israel’s scattering.", nextScene: "s2_nephi_happiness", effect: { knowledge: 2, faith: 1, unity: -1 }, feedback: "You teach deep doctrine, but it is hard for some to understand." },
            { text: "Liken the familiar scriptures to the trials of your own journey.", nextScene: "s2_nephi_happiness", effect: { faith: 1, unity: 1 }, feedback: "You make the scriptures personal and comforting." },
            { text: "Focus only on promises of peace and temporal prosperity.", nextScene: "s2_nephi_happiness", effect: { unity: 2, worldly: 1, knowledge: -1 }, feedback: "You raise morale, but avoid the hard truths." }
        ]
    },
    "s2_nephi_happiness": {
        text: "Your father, Lehi, is fading, and with his health, the family unity fractures. Laman and Lemuel grow loud with their complaints against the hardships of the new settlement.<br><br><i>(Read 2 Nephi 1:2)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        onEnter: { faith: 0, unity: -2, worldly: 0 },
        choices: [
            { text: "Call them sharply to repentance and warn them of their danger.", nextScene: "s2_nephi_blessing", effect: { faith: 2, unity: -2 }, feedback: "You speak with boldness, causing immediate friction." },
            { text: "Attempt to distract them from spiritual matters by organizing a feast.", nextScene: "s2_nephi_blessing", effect: { unity: 2, worldly: 1, faith: -1 }, feedback: "You offer a social solution to a spiritual problem." },
            { text: "Suffer in silence, working double shifts to alleviate the physical burdens.", nextScene: "s2_nephi_blessing", effect: { faith: -1, unity: 2 }, feedback: "You lead by example, but you are exhausted." }
        ]
    },
    "s2_nephi_blessing": {
        text: "Lehi gives his final blessing, delivering a powerful, specific warning and rebuke to Laman. Laman, enraged, turns his accusation on you: you are a deceiver seeking power.<br><br><i>(Read 2 Nephi 1:25-27)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi", "Laman"],
        onEnter: { faith: 0, unity: -1, worldly: 0 },
        choices: [
            { text: "Boldly affirm your father's prophecy and rebuke of Laman.", nextScene: "s2_nephi_death", effect: { faith: 1, unity: -3 }, feedback: "You stand with the prophet, further alienating your brothers." },
            { text: "Remain silent, unwilling to deepen the rift while your father is dying.", nextScene: "s2_nephi_death", effect: { unity: 1, faith: -1 }, feedback: "You avoid conflict, but show weakness." },
            { text: "Humble yourself and offer to serve Laman and his family.", nextScene: "s2_nephi_death", effect: { unity: 1, worldly: -1 }, feedback: "You show humility, though they may despise it." }
        ]
    },
    "s2_nephi_death": {
        text: "The spiritual anchor is lifted—Lehi is dead. Laman immediately asserts his natural right as the eldest to rule the whole company.<br><br><i>(Read 2 Nephi 4:12-13)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lemuel"],
        onEnter: { faith: -2, unity: -3, worldly: 2 },
        choices: [
            { text: "Submit entirely to Laman's authority to preserve peace.", nextScene: "s2_nephi_psalm", effect: { unity: 3, faith: -3 }, feedback: "You choose peace at the cost of the Covenant." },
            { text: "Assert your spiritual keys of authority and the Lord's chosen order.", nextScene: "s2_nephi_psalm", effect: { faith: 2, unity: -2 }, feedback: "You speak truth, but it is interpreted as ambition." },
            { text: "Propose a political solution: an equal separation of duties and supplies.", nextScene: "s2_nephi_psalm", effect: { knowledge: 1, worldly: 1, faith: -1 }, feedback: "You attempt a political compromise." }
        ]
    },
    "s2_nephi_psalm": {
        text: "You are overwhelmed by deep, wretched sorrow—not only for your father's death, but for the anger and bitterness you harbor toward your hostile brothers. Your soul grieves.<br><br><i>(Read 2 Nephi 4:17-19)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        onEnter: { faith: 0, unity: -1, worldly: 1 },
        choices: [
            { text: "Cry unto God, trusting in the Rock of your salvation.", nextScene: "s2_nephi_plot", effect: { faith: 3, worldly: -2 }, covenantUnlock: "Repentance", feedback: "You trust in the Rock of your salvation. (See 2 Nephi 4:30-35)" },
            { text: "Stifle the grief, losing yourself in backbreaking labor.", nextScene: "s2_nephi_plot", effect: { worldly: 2, faith: -1 }, feedback: "You use work to cope with sorrow." },
            { text: "Seek human comfort by venting your frustrations to your brother Sam.", nextScene: "s2_nephi_plot", effect: { unity: 2 }, feedback: "You seek human comfort." }
        ]
    },
    "s2_nephi_plot": {
        text: "The Lord's voice pierces your anguish, revealing a deadly plot: Laman and Lemuel intend to take your life.<br><br><i>(Read 2 Nephi 5:2-4)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Laman"],
        onEnter: { faith: 0, unity: -1, worldly: 0 },
        choices: [
            { text: "Immediately pray for the softening of your brothers' hardened hearts.", nextScene: "s2_nephi_flee", effect: { faith: 2 }, feedback: "You maintain spiritual optimism." },
            { text: "Focus on physical survival, secretly preparing for a violent defense.", nextScene: "s2_nephi_flee", effect: { knowledge: 1, worldly: 1 }, feedback: "You prepare for physical violence." },
            { text: "Confront them unarmed, offering repentance one final time.", nextScene: "s2_nephi_flee", effect: { unity: -2, faith: 1 }, feedback: "You risk your life to cry repentance one last time." }
        ]
    },
    "s2_nephi_flee": {
        text: "The command is final and immediate: 'Depart from them into the wilderness.' Obedience means abandoning your established home, goods, and ties.<br><br><i>(Read 2 Nephi 5:5)</i>",
        backgroundAsset: "wilderness",
        castAssets: ["Sam", "Zoram"],
        onEnter: { faith: 0, unity: 0, worldly: 3 },
        choices: [
            { text: "Obey the command without hesitation, leaving immediately.", nextScene: "s2_nephi_items", effect: { faith: 2, unity: -1, worldly: -3 }, covenantUnlock: "Faith", feedback: "Exact obedience." },
            { text: "Plead with the Lord for one last chance to save them.", nextScene: "s2_nephi_items", effect: { unity: 1 }, feedback: "You are reluctant to sever ties." },
            { text: "Spend time planning a secret, logistically sound evacuation.", nextScene: "s2_nephi_items", effect: { knowledge: 1, worldly: 0 }, feedback: "You focus on logistics." }
        ]
    },
    "s2_nephi_items": {
        text: "As you gather those who will follow you, you must take the sacred Plates and the Liahona. Taking these records confirms Laman's claim that you are a 'robber.'<br><br><i>(Read 2 Nephi 5:12)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Take both, asserting your role as the rightful custodian of the records.", nextScene: "s2_nephi_depart", effect: { faith: 1, unity: -2 }, feedback: "You accept the conflict to preserve the records." },
            { text: "Leave the Liahona, hoping to lessen Laman's anger while keeping the Plates.", nextScene: "s2_nephi_depart", effect: { unity: 1, faith: -2 }, feedback: "A bad compromise." },
            { text: "Pause the departure to explain to the believers why the Plates must go.", nextScene: "s2_nephi_depart", effect: { knowledge: 1, unity: 1 }, feedback: "You build consensus among the believers." }
        ]
    },
    "s2_nephi_depart": {
        text: "As the two camps divide, you must allocate the essential supplies—the herds and provisions—before you depart and sever all ties.<br><br><i>(Read 2 Nephi 5:7)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram"],
        choices: [
            { text: "Insist on taking your fair share of all the herds and provisions.", nextScene: "s2_nephi_sword", effect: { worldly: 1, unity: -1 }, feedback: "You claim justice." },
            { text: "Leave the best herds to Laman's group to prevent pursuit.", nextScene: "s2_nephi_sword", effect: { unity: 1, faith: 1, worldly: -2 }, feedback: "You sacrifice property to prevent pursuit." },
            { text: "Take only what you and the company can carry, trusting in providence.", nextScene: "s2_nephi_sword", effect: { faith: 2, worldly: -1 }, feedback: "Total reliance on the Lord." }
        ]
    },
    "s2_nephi_sword": {
        text: "You begin a new life in the Land of Nephi. To protect your people from the inevitable threat, you fashion swords, taking the sword of Laban as your model.<br><br><i>(Read 2 Nephi 5:14)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Consecrate the weapons, teaching the people to rely on the Lord for defense.", nextScene: "s2_nephi_king", effect: { faith: 2, worldly: -1 }, feedback: "You teach that the Lord is your defense." },
            { text: "Focus on military drilling and training, relying on the arm of flesh.", nextScene: "s2_nephi_king", effect: { worldly: 2, knowledge: 1, faith: -1 }, feedback: "You rely on the arm of flesh." },
            { text: "Invest the time in building strong defensive walls around the settlement.", nextScene: "s2_nephi_king", effect: { unity: 1, worldly: 1 }, feedback: "You focus on defensive posture." }
        ]
    },
    "s2_nephi_king": {
        text: "Out of respect, loyalty, and their spiritual need, the people unanimously desire and request that you be their king and temporal ruler.<br><br><i>(Read 2 Nephi 5:16-18)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Zoram", "Sam"],
        choices: [
            { text: "Humbly refuse, saying: 'I will be your teacher and servant.'", nextScene: "module_end_story_division", effect: { faith: 1, unity: 1 }, feedback: "Story Module Complete." },
            { text: "Accept the title, believing you must bear the full temporal burden.", nextScene: "module_end_story_division", effect: { knowledge: 1, unity: 1, faith: -3 }, feedback: "Story Module Complete." },
            { text: "Deflect the attention to the Temple: 'Build the House of the Lord first.'", nextScene: "module_end_story_division", effect: { faith: 3, unity: 1 }, feedback: "Story Module Complete." }
        ]
    }
});