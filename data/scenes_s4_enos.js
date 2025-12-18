window.STARTING_STATS["Enos"] = { 
    storyId: "decline",
    displayName: "Enos",
    faith: 8, unity: 6, worldly_influence: 4, knowledge: 0,
    hasBrassPlates: true,
    initialScene: "s4_enos_intro",
    bio: "A man who wrestles before God until he finds his place in the covenant—and then bears the lonely burden of records, enemies, and declining faith."
};

// QC Review: Scriptural Accuracy; Decision Difficulty/Balance; Branching Depth; Mathematical Integrity (F + U + K - W)

Object.assign(window.scenes, {

    // =========================
    // INTRO (3 PATHS A / B / C)
    // =========================

    "s4_enos_intro": {
        text: "AFTER JACOB. Your father’s words sink deep—about Christ, covenants, and the Holy One of Israel. Yet you feel unfinished inside, unsure if you have truly *become* what you were taught.<br><i>(Read Enos 1:1–3)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Jacob"],
        choices: [
            { text: "Go alone into the forest to face God honestly.", nextScene: "s4_pathA_forest_1", effect: { faith: 1 }, feedback: "You choose solitude over appearance." },
            { text: "Stay among the people and try to be useful first.", nextScene: "s4_pathB_people_1", effect: { unity: 1 }, feedback: "You choose belonging over isolation." },
            { text: "Open the records and search the covenant story carefully.", nextScene: "s4_pathC_records_1", effect: { knowledge: 1, worldly: 1 }, feedback: "You learn, but risk hiding behind study." } // Knowledge #1 of 3
        ]
    },

    // =========
    // PATH A (3)
    // =========

    "s4_pathA_forest_1": {
        text: "THE FOREST. You hunt, but your mind hunts harder—memory after memory of Jacob preaching of Christ. The deeper you walk, the louder your conscience becomes.<br><i>(Read Enos 1:3)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Kneel immediately and begin to pray out loud.", nextScene: "s4_pathA_forest_2", effect: { faith: 1, worldly: 1 }, feedback: "You risk being seen, but you begin." },
            { text: "Keep walking until you find a place no one would ever go.", nextScene: "s4_pathA_forest_2", effect: { worldly: -1 }, feedback: "You flee pressure—but also flee distraction." },
            { text: "Delay prayer and try to numb the feeling with the hunt.", nextScene: "s4_pathA_forest_2", effect: { faith: -1 }, feedback: "You postpone the wrestle, and the emptiness grows." }
        ]
    },

    "s4_pathA_forest_2": {
        text: "You try to speak to God, but your words feel thin. The problem isn’t that God is far—it’s that *you* feel divided. You remember Jacob’s 'joy'… and you feel none of it.<br><i>(Read Enos 1:3–4)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Confess plainly: 'I feel sinful and unsure.'", nextScene: "s4_pathA_forest_3", effect: { worldly: -1 }, feedback: "Honesty breaks the first layer of pride." },
            { text: "Ask first for a sign that God is listening.", nextScene: "s4_pathA_forest_3", effect: { worldly: 1 }, feedback: "You want certainty before surrender." },
            { text: "Stop and criticize yourself for being weak.", nextScene: "s4_pathA_forest_3", effect: { unity: -1 }, feedback: "You fracture inward—attacking the soul you’re trying to save." }
        ]
    },

    "s4_pathA_forest_3": {
        text: "You feel something tighten in you—like your whole life has been avoiding this moment. The prayer becomes less polite and more desperate. It turns into a wrestle.<br><i>(Read Enos 1:4)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Wrestle on, refusing to stop until peace comes.", nextScene: "s4_enos_major_wrestle", effect: { faith: 1 }, feedback: "You choose endurance over quick relief." },
            { text: "Bargain: promise extra obedience if God forgives quickly.", nextScene: "s4_enos_major_wrestle", effect: { worldly: 1 }, feedback: "You try to control mercy with terms." },
            { text: "Quit early and tell yourself you will try again later.", nextScene: "s4_enos_major_wrestle", effect: { faith: -1 }, feedback: "You leave the altar before the offering is complete." }
        ]
    },

    // =========
    // PATH B (3)
    // =========

    "s4_pathB_people_1": {
        text: "AMONG THE PEOPLE. Time has passed. The Nephites prosper, but something is slipping—less hunger for God, more hunger for comfort. You feel pulled to fit in, not stand out.<br><i>(Read Enos 1:22–23)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Speak up in a small gathering: remind them of Christ.", nextScene: "s4_pathB_people_2", effect: { faith: 1 }, feedback: "You risk awkwardness to invite remembrance." },
            { text: "Focus on keeping relationships smooth, avoiding hard doctrine.", nextScene: "s4_pathB_people_2", effect: { worldly: 1 }, feedback: "You keep peace, but soften truth." },
            { text: "Withdraw quietly; if they won’t listen, you won’t try.", nextScene: "s4_pathB_people_2", effect: { unity: -1 }, feedback: "You protect yourself, but isolate your influence." }
        ]
    },

    "s4_pathB_people_2": {
        text: "A friend confesses sin and fear. You can either lift them toward repentance—or keep it 'easy' so they keep liking you. You feel the cost of being real.<br><i>(Read Enos 1:22)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Invite repentance kindly, without excusing the sin.", nextScene: "s4_pathB_people_3", effect: { unity: 1, worldly: 1 }, feedback: "You keep love *and* truth in tension." },
            { text: "Assure them it’s not a big deal so they feel better.", nextScene: "s4_pathB_people_3", effect: { worldly: 1 }, feedback: "You trade healing for comfort." },
            { text: "Correct them sharply to prove you’re righteous.", nextScene: "s4_pathB_people_3", effect: { unity: -1 }, feedback: "Truth without charity bruises the soul." }
        ]
    },

    "s4_pathB_people_3": {
        text: "That night you lie awake. If the people decline, what will your life mean? You feel the Spirit press you: the wrestle you avoided is now unavoidable.<br><i>(Read Enos 1:4)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Go pray in secret—no excuses left.", nextScene: "s4_enos_major_wrestle", effect: { faith: 1 }, feedback: "You finally choose God over image." },
            { text: "Talk it out with friends instead of praying.", nextScene: "s4_enos_major_wrestle", effect: { worldly: 1 }, feedback: "You seek human relief first." },
            { text: "Bury yourself in work and hope the feeling fades.", nextScene: "s4_enos_major_wrestle", effect: { faith: -1 }, feedback: "You work hard, but your soul stays hungry." }
        ]
    },

    // =========
    // PATH C (3)
    // =========

    "s4_pathC_records_1": {
        text: "THE RECORDS. You trace the holy history and promises, but the words expose a gap: you can recite covenant language—yet still feel personally unclaimed by it.<br><i>(Read Enos 1:1–3)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Stop reading and ask: 'What am I missing in *me*?'", nextScene: "s4_pathC_records_2", effect: { worldly: -1 }, feedback: "You refuse to hide behind ink." },
            { text: "Keep studying until you can explain everything perfectly.", nextScene: "s4_pathC_records_2", effect: { worldly: 1 }, feedback: "You seek mastery instead of mercy." },
            { text: "Share impressive insights publicly to gain respect.", nextScene: "s4_pathC_records_2", effect: { unity: -1 }, feedback: "You gain attention, but lose purity of intent." }
        ]
    },

    "s4_pathC_records_2": {
        text: "You remember Jacob’s voice—his warnings, his witness of Christ. The Spirit stirs you: knowledge alone will not cleanse you. Your heart must yield.<br><i>(Read Enos 1:3–4)</i>",
        backgroundAsset: "house_interior",
        castAssets: ["Jacob"],
        choices: [
            { text: "Write a private commitment to seek forgiveness, not applause.", nextScene: "s4_pathC_records_3", effect: { worldly: -1 }, feedback: "You choose sincerity over performance." },
            { text: "Decide you’ll pursue righteousness later—once life is calmer.", nextScene: "s4_pathC_records_3", effect: { faith: -1 }, feedback: "Delay is a quiet form of refusal." },
            { text: "Argue internally that you’re already 'good enough.'", nextScene: "s4_pathC_records_3", effect: { worldly: 1 }, feedback: "Self-justification dulls spiritual hunger." }
        ]
    },

    "s4_pathC_records_3": {
        text: "The question sharpens: Will you wrestle with God, or merely study *about* Him? You feel the moment to decide, and it won’t stay open forever.<br><i>(Read Enos 1:4)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Go into the forest and pray until the soul breaks open.", nextScene: "s4_enos_major_wrestle", effect: { faith: 1 }, feedback: "You step beyond theory into covenant." },
            { text: "Keep the wrestle 'controlled'—a short prayer, then back to work.", nextScene: "s4_enos_major_wrestle", effect: { worldly: 1 }, feedback: "You offer God time, but not your whole heart." },
            { text: "Avoid prayer; if you don’t ask, you can’t be disappointed.", nextScene: "s4_enos_major_wrestle", effect: { faith: -1 }, feedback: "Fear disguises itself as caution." }
        ]
    },

    // ==========================
    // MAJOR SCRIPTURAL EVENT
    // (ALL PATHS CONVERGE HERE)
    // ==========================

    "s4_enos_major_wrestle": {
        text: "THE WRESTLE. You pour out your whole soul. Hours pass. You will not rise until you are changed. Then the voice comes—clear, personal, covenantal: your sins are forgiven, and you are blessed.<br><i>(Read Enos 1:4–8)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Believe the voice immediately, trusting Christ’s mercy.", nextScene: "s4_post_major_ministry_1", effect: { faith: 1 }, feedback: "Faith accepts what pride cannot earn." },
            { text: "Second-guess it: demand proof before you can rest.", nextScene: "s4_post_major_records_1", effect: { worldly: 1 }, feedback: "You turn assurance into an argument." },
            { text: "Stand, shaken, and decide you must now *act* for your people.", nextScene: "s4_post_major_war_1", effect: { unity: 1 }, feedback: "Forgiven, you feel responsible." }
        ]
    },

    // ==========================
    // POST-MAJOR BRANCH (3 SUBPATHS)
    // ==========================

    // --- SUBPATH M: MINISTRY (3) ---

    "s4_post_major_ministry_1": {
        text: "Forgiven, your heart expands. You pray for your own people—the Nephites—that they might be preserved and taught, not merely defended.<br><i>(Read Enos 1:9–10)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Pray long and specific for their souls, not their success.", nextScene: "s4_post_major_ministry_2", effect: { faith: 1, worldly: 1 }, feedback: "You seek hearts, not headlines." },
            { text: "Pray quickly, then move on—surely forgiveness was the main thing.", nextScene: "s4_post_major_ministry_2", effect: { faith: -1 }, feedback: "You stop short of Christlike intercession." },
            { text: "Let bitterness rise: 'They won’t listen anyway.'", nextScene: "s4_post_major_ministry_2", effect: { unity: -1 }, feedback: "Cynicism shrinks love." }
        ]
    },

    "s4_post_major_ministry_2": {
        text: "You labor with diligence to persuade people to come unto Christ. But every invitation costs something: reputation, comfort, time. Decline isn’t loud—it’s slow.<br><i>(Read Enos 1:23)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Teach plainly, even if it makes you unpopular.", nextScene: "s4_post_major_ministry_3", effect: { faith: 1 }, feedback: "You choose truth over approval." },
            { text: "Soften every message to keep attendance high.", nextScene: "s4_post_major_ministry_3", effect: { worldly: 1 }, feedback: "You gain ease, but lose power." },
            { text: "Withdraw to protect your peace and stop trying.", nextScene: "s4_post_major_ministry_3", effect: { unity: -1 }, feedback: "You avoid pain, but abandon influence." }
        ]
    },

    "s4_post_major_ministry_3": {
        text: "You feel charity for enemies rising where pride once lived. You turn your prayers outward—toward the Lamanites—asking that someday they might receive truth.<br><i>(Read Enos 1:11–13)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Pray earnestly for their salvation, not their defeat.", nextScene: "s4_converge_aging_reflection", effect: { unity: 1, worldly: 1 }, feedback: "You learn to love beyond borders." },
            { text: "Pray only that they stop attacking, nothing more.", nextScene: "s4_converge_aging_reflection", effect: { worldly: 1 }, feedback: "You ask for safety, not redemption." },
            { text: "Refuse to pray for them; they are your enemies.", nextScene: "s4_converge_aging_reflection", effect: { unity: -1 }, feedback: "Old hatred returns quickly." }
        ]
    },

    // --- SUBPATH R: RECORDS / COVENANT (3) ---

    "s4_post_major_records_1": {
        text: "The forgiveness is real, but your mind fixates on the future. What if the people fail? What if the record is lost? You feel the Lord pulling your gaze to preservation.<br><i>(Read Enos 1:13–16)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Ask God for a covenant concerning the records themselves.", nextScene: "s4_post_major_records_2", effect: { faith: 1 }, feedback: "You care about generations you will never meet." },
            { text: "Assume it will work out and stop worrying about records.", nextScene: "s4_post_major_records_2", effect: { worldly: 1 }, feedback: "Ease replaces vigilance." },
            { text: "Obsess over control: 'I must secure everything myself.'", nextScene: "s4_post_major_records_2", effect: { unity: -1 }, feedback: "Control isolates and exhausts." }
        ]
    },

    "s4_post_major_records_2": {
        text: "You receive a promise: the record will be preserved for the Lamanites in the Lord’s own due time. The covenant comforts you—but also assigns you a burden of stewardship.<br><i>(Read Enos 1:15–16)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Record the promise carefully and share it with the faithful.", nextScene: "s4_post_major_records_3", effect: { knowledge: 1, worldly: 1 }, feedback: "You preserve truth without turning it into pride." }, // Knowledge #2 of 3
            { text: "Keep it private so no one can challenge your authority.", nextScene: "s4_post_major_records_3", effect: { unity: -1 }, feedback: "Secrecy turns stewardship into possession." },
            { text: "Dismiss it as emotion; rely only on what you can measure.", nextScene: "s4_post_major_records_3", effect: { faith: -1 }, feedback: "You trade revelation for control." }
        ]
    },

    "s4_post_major_records_3": {
        text: "Time passes. You watch a generation rise that doesn’t remember Jacob’s fire. You sense your role: not to 'win' the era, but to keep the covenant chain unbroken.<br><i>(Read Jarom 1:1–4)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Train a successor to keep records and teach with restraint.", nextScene: "s4_converge_aging_reflection", effect: { unity: 1 }, feedback: "You build continuity, not a personality cult." },
            { text: "Hold the records tightly; no one is worthy but you.", nextScene: "s4_converge_aging_reflection", effect: { unity: -1 }, feedback: "Fear breaks the chain you meant to protect." },
            { text: "Neglect the record because it feels small compared to crisis.", nextScene: "s4_converge_aging_reflection", effect: { faith: -1 }, feedback: "Small plates matter most when faith declines." }
        ]
    },

    // --- SUBPATH W: WAR / DEFENSE (3) ---

    "s4_post_major_war_1": {
        text: "The people are often threatened. Wars and contentions flare. You feel the strain: how do you defend without becoming what you fear?<br><i>(Read Enos 1:20)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Defend with restraint—protect life, avoid hatred.", nextScene: "s4_post_major_war_2", effect: { unity: 1, worldly: 1 }, feedback: "You seek safety without losing your soul." },
            { text: "Escalate quickly; fear makes you harsh.", nextScene: "s4_post_major_war_2", effect: { worldly: 1 }, feedback: "Fear hardens into cruelty." },
            { text: "Refuse all defense; let whatever happens happen.", nextScene: "s4_post_major_war_2", effect: { unity: -1 }, feedback: "Idealism without stewardship becomes neglect." }
        ]
    },

    "s4_post_major_war_2": {
        text: "Victory and loss both tempt you: victory tempts pride; loss tempts despair. You remember the wrestle—God changed you once; He can change a people too.<br><i>(Read Enos 1:4–8)</i>",
        backgroundAsset: "wilderness",
        castAssets: [],
        choices: [
            { text: "Turn the crisis into a call to repentance, not revenge.", nextScene: "s4_post_major_war_3", effect: { faith: 1 }, feedback: "You aim the people inward before outward." },
            { text: "Use the crisis to gain influence and command loyalty.", nextScene: "s4_post_major_war_3", effect: { worldly: 1 }, feedback: "You trade humility for control." },
            { text: "Blame the faithful: 'God isn’t helping because you aren’t enough.'", nextScene: "s4_post_major_war_3", effect: { unity: -1 }, feedback: "Shame fractures unity." }
        ]
    },

    "s4_post_major_war_3": {
        text: "You notice something subtle: the next generation learns quickly how to fight, but slowly how to believe. You choose what to reinforce—skills, or covenant memory.<br><i>(Read Jarom 1:10–12)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Teach them both defense and doctrine—without glamorizing violence.", nextScene: "s4_converge_aging_reflection", effect: { knowledge: 1, faith: -1 }, feedback: "You add understanding, but feel the spiritual cost of constant war." }, // Knowledge #3 of 3
            { text: "Teach only warfare; faith can wait.", nextScene: "s4_converge_aging_reflection", effect: { worldly: 1 }, feedback: "You gain strength and lose softness." },
            { text: "Teach only spirituality and ignore practical threats.", nextScene: "s4_converge_aging_reflection", effect: { unity: -1 }, feedback: "Good intent, poor stewardship, rising resentment." }
        ]
    },

    // ==========================
    // CONVERGENCE + LATE ERA MONTAGE
    // ==========================

    "s4_converge_aging_reflection": {
        text: "YEARS LATER. Your life becomes a quiet, holy endurance. The record passes from hand to hand—Jarom, Omni—brief words, heavy meaning: 'we kept the plates.' The people drift, yet the covenant thread does not fully break.<br><i>(Read Enos 1:25–27; Jarom 1:1–2; Omni 1:1–4)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Emphasize mercy: remind record-keepers why God preserves people.", nextScene: "s4_final_handoff", effect: { faith: 1 }, feedback: "You leave behind a Christ-centered legacy." },
            { text: "Emphasize survival: remind them to keep order at any cost.", nextScene: "s4_final_handoff", effect: { worldly: 1 }, feedback: "You leave strength—but risk hardness." },
            { text: "Withdraw: let the next keepers figure it out alone.", nextScene: "s4_final_handoff", effect: { unity: -1 }, feedback: "Loneliness can become neglect." }
        ]
    },

    // ==========================
    // FINAL SCENE (ALL 3 CHOICES -> module_end_story_decline)
    // ==========================

    "s4_final_handoff": {
        text: "THE GREAT MOVE. Omni’s record tells of Mosiah leading the righteous away from conflict to Zarahemla—meeting a people whose language must be taught again, whose story must be joined to yours. Later, Words of Mormon looks back: small plates preserved, kingship established, the Lord still working through imperfect generations.<br><i>(Read Omni 1:12–19; Words of Mormon 1:3–7, 12–18)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "End with hope: trust God’s timing for the record and the Lamanites.", nextScene: "module_end_story_decline", effect: { faith: 1 }, feedback: "You choose covenant trust over fear." },
            { text: "End with caution: warn that prosperity without Christ always decays.", nextScene: "module_end_story_decline", effect: { worldly: 1 }, feedback: "You choose sober realism over comfort." },
            { text: "End with unity: insist the next generation must *become one* in Zarahemla.", nextScene: "module_end_story_decline", effect: { unity: 1 }, feedback: "You choose belonging and shared identity." }
        ]
    }

});