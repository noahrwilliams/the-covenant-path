// JACOB DATA - STORY 3: THE VINEYARD
window.STARTING_STATS["Jacob"] = { 
    displayName: "Jacob",
    storyId: "vineyard",
    faith: 8, unity: 8, worldly_influence: 2, knowledge: 5, 
    hasBrassPlates: true, initialScene: "s3_jacob_intro",
    bio: "The prophet entrusted with the small plates. He carries the burden of teaching Christ's doctrine while witnessing the growing pride and sins of the Nephite people."
};

// JACOB SCENES - COMPLETE ARC

// List of backgrounds: "temple_interior", "settlement", "vision_room"

Object.assign(window.scenes, {
    
    // --- SCENE 1: JACOB TAKES THE PLATES ---
    "s3_jacob_intro": {
        // CORRECTION APPLIED: Nephi was the spiritual leader, not explicitly 'King Nephi'.
        // The text now reflects Nephi's death and the succession of the plates per Jacob 1:9-11.
        text: "After the death of your brother Nephi, the spiritual leader, the people appointed a new temporal ruler. Nephi had commanded you, his younger brother, to take charge of the small plates—the sacred record—and teach the people, though you felt unworthy of such a burden.<br><i>(Read Jacob 1:9-11)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Nephi_S2"],
        // EROSION #1: The responsibility itself is a burden that introduces anxiety.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "You must magnify your office, yet you also have a family to support. The needs of the church and your personal life often seem to conflict.<br><i>(Read Jacob 1:19)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #2: The pressure of dividing your time causes strain.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "Years pass. The Nephites have prospered greatly. Their hearts begin to cling to the riches of the world, forgetting the covenant path they walked in the wilderness.<br><i>(Read Jacob 2:13)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #3: Worldly success breeds spiritual decay.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "You gather the people to the temple to deliver a stern and difficult sermon. They have come not seeking God, but to parade their wealth and status. You feel the anguish of your calling.<br><i>(Read Jacob 2:2)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #4: Feeling separate from the people you serve.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "You note that the people are judging one another 'because of the costliness of their apparel,' forgetting that God views all men equally in their poverty and wealth.<br><i>(Read Jacob 2:13, 16)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #5: Witnessing their vanity causes spiritual pain.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "Now you must address the 'grosser crime'—the scandalous behavior among the men that is breaking the hearts of their innocent wives and children.<br><i>(Read Jacob 2:7, 9)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #6: Sympathy and anguish for the innocent.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "The men justify their actions by citing the practices of David and Solomon. You must clarify the doctrinal stance on plural marriage.<br><i>(Read Jacob 2:27-28)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        // EROSION #7: Facing down a difficult, contentious doctrine.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "In a powerful, shaming comparison, you declare that the Lamanites—whom the Nephites despise—are more righteous in their marital practices than the Nephites.<br><i>(Read Jacob 3:5-7)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        // EROSION #8: Using the cultural enemy as an example causes unity breakdown.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "You are commanded to write upon the small plates what is most sacred. Should you focus on the history and prophecy, or on your own strong testimony of Christ?<br><i>(Read Jacob 4:1-6)</i>",
        backgroundAsset: "vision_room",
        castAssets: [],
        // NO EROSION: A moment of peace and reflection in the writing.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "A man named Sherem, educated and skilled in flattery, begins secretly spreading rumors against you and denying the need for Christ. His words unsettle the community.<br><i>(Read Jacob 7:1-4)</i>",
        backgroundAsset: "settlement",
        castAssets: ["Sherem"], 
        // EROSION #9: Antagonism and deceit attack the foundation of faith.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "Sherem demands a sign, challenging your authority and your faith in Christ. You are faced with the choice to either deliver a powerful testimony or let him continue his destruction.<br><i>(Read Jacob 7:13)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Sherem"], 
        // EROSION #10: The pressure of a public, spiritual debate.
        onEnter: { faith: 0, unity: 0, worldly: 0 },
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
        text: "After Sherem's confession and death, the people are restored to their faith. You seal the small plates, handing them to your son Enos, concluding your life's labor as a prophet and priest. Your record is preserved.<br><i>(Read Jacob 7:27)</i>",
        backgroundAsset: "temple_interior",
        castAssets: [],
        choices: [
            // Final Scene ID is correct: "module_end_story_[storyID]"
            { text: "End Story: The Vineyard", nextScene: "module_end_story_vineyard", effect: {}, feedback: "The vineyard is tended. Your record is sealed." },
        ]
    }
});

