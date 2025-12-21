// Character IDs: King_Benjamin, Mosiah, Helaman_son_of_Benjamin, Helorum, Amaleki, Angel
// Background IDs: house_interior, settlement, wilderness

window.STARTING_STATS["King_Benjamin"] = {
  storyId: "king_covenant",
  displayName: "King Benjamin",
  faith: 8, unity: 7, worldly_influence: 4, knowledge: 0,
  hasBrassPlates: true,
  initialScene: "s5_kb_intro",
  bio: "A king-laborer who seeks to seal his people to Christ before he lays down his crown."
};

// QC Review: Scriptural Accuracy; Decision Difficulty/Balance; Branching Depth; Mathematical Integrity (F + U + K - W)

Object.assign(window.scenes, {

  // =========================
  // INTRO (3 PATHS A / B / C)
  // =========================

  "s5_kb_intro": {
    text:
      "ZARAHEMLA. You feel your strength failing, and you know your reign is near its end. You must gather the people, account for your stewardship, and invite them to take upon them the name of Christ—before you lay down your crown.<br><i>(Read Mosiah 1:9–10; Mosiah 2:28–31)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Prepare the gathering logistics so every family can hear.", nextScene: "s5_kb_pathA_logistics_1", effect: { unity: 1 }, feedback: "You choose order that serves worship." },
      { text: "Retreat to seek revelation for what must be spoken.", nextScene: "s5_kb_pathB_revelation_1", effect: { faith: 1 }, feedback: "You choose heaven’s message over comfort." },
      { text: "Prepare Mosiah and your sons to inherit the covenant burden.", nextScene: "s5_kb_pathC_succession_1", effect: { knowledge: 1, worldly: 1 }, feedback: "You teach the next generation, resisting pride in legacy." } // Knowledge #1 of 3
    ]
  },

  // =========
  // PATH A (3) — LOGISTICS / GATHERING
  // =========

  "s5_kb_pathA_logistics_1": {
    text:
      "The people begin to gather in Zarahemla, each family pitching tents with their doors toward the temple. This is worship—but it also becomes pressure. If the gathering fails, the covenant moment fractures before it begins.<br><i>(Read Mosiah 2:1–6)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Ask leaders to organize rows and distance for clear hearing.", nextScene: "s5_kb_pathA_logistics_2", effect: { unity: 1, worldly: 1 }, feedback: "You trade ease for collective focus." },
      { text: "Let the crowd sort itself; faith can overcome disorder.", nextScene: "s5_kb_pathA_logistics_2", effect: { unity: -1 }, feedback: "Good intent, rising confusion." },
      { text: "Use fear of punishment to enforce compliance quickly.", nextScene: "s5_kb_pathA_logistics_2", effect: { worldly: 1 }, feedback: "Control grows fast; trust shrinks fast." }
    ]
  },

  "s5_kb_pathA_logistics_2": {
    text:
      "You realize many cannot hear you from the temple grounds. A tower is raised so your voice can carry. The temptation appears: to use the platform for authority instead of service.<br><i>(Read Mosiah 2:7–9)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Frame the tower as service: 'I stand only so you can hear.'", nextScene: "s5_kb_pathA_logistics_3", effect: { faith: 1 }, feedback: "You anchor structure in humility." },
      { text: "Frame it as power: 'See how the people depend on me.'", nextScene: "s5_kb_pathA_logistics_3", effect: { worldly: 1 }, feedback: "Platform becomes ego." },
      { text: "Avoid the tower and speak quietly; only the near will hear.", nextScene: "s5_kb_pathA_logistics_3", effect: { unity: -1 }, feedback: "A sacred message becomes uneven." }
    ]
  },

  "s5_kb_pathA_logistics_3": {
    text:
      "Messengers report the people are ready. But readiness is fragile: fatigue, children, heat, gossip. One careless decision can turn worship into spectacle. Your final preparation is not technical—it is spiritual restraint.<br><i>(Read Mosiah 2:9–11)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Begin with plain humility—no flattery, no threat.", nextScene: "s5_kb_major_event_speech_begins", effect: { faith: 1 }, feedback: "You choose truth without theatrics." },
      { text: "Begin by praising yourself so people feel gratitude.", nextScene: "s5_kb_major_event_speech_begins", effect: { worldly: 1 }, feedback: "You try to secure obedience through ego." },
      { text: "Delay the speech; you fear failing in front of them.", nextScene: "s5_kb_major_event_speech_begins", effect: { faith: -1 }, feedback: "Fear tries to steal the moment." }
    ]
  },

  // =========
  // PATH B (3) — REVELATION / ANGEL MESSAGE
  // =========

  "s5_kb_pathB_revelation_1": {
    text:
      "You withdraw from the noise. You’ve labored with your own hands and ruled with restraint, but none of that can save them. Only Christ can. You seek what must be spoken before your voice is gone.<br><i>(Read Mosiah 2:12–14)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Pray for the people’s hearts more than your reputation.", nextScene: "s5_kb_pathB_revelation_2", effect: { faith: 1 }, feedback: "You choose intercession over image." },
      { text: "Pray for control: that no one questions you today.", nextScene: "s5_kb_pathB_revelation_2", effect: { worldly: 1 }, feedback: "You try to secure outcomes, not conversion." },
      { text: "Avoid prayer; you’re exhausted and want to 'just deliver.'", nextScene: "s5_kb_pathB_revelation_2", effect: { faith: -1 }, feedback: "Weariness tempts spiritual shortcut." }
    ]
  },

  "s5_kb_pathB_revelation_2": {
    text:
      "An angel’s message presses into your soul: the Lord Omnipotent will come down, suffer, bleed, and rise—so that salvation can come to those who believe and repent. The message is too holy to use as a tool.<br><i>(Read Mosiah 3:2–11)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Angel"],
    choices: [
      { text: "Receive it with trembling humility and prepare to testify plainly.", nextScene: "s5_kb_pathB_revelation_3", effect: { faith: 1 }, feedback: "You choose reverence over performance." },
      { text: "Use it to terrify the people into compliance.", nextScene: "s5_kb_pathB_revelation_3", effect: { worldly: 1 }, feedback: "Fear is faster than faith—and weaker." },
      { text: "Hold it back; it feels too intense for the crowd.", nextScene: "s5_kb_pathB_revelation_3", effect: { unity: -1 }, feedback: "You protect comfort, risk losing conversion." }
    ]
  },

  "s5_kb_pathB_revelation_3": {
    text:
      "You rehearse the core: the natural man is an enemy to God; only yielding to the Holy Spirit can change a people. You know this teaching will offend pride and threaten cultural religion.<br><i>(Read Mosiah 3:19)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Commit to preach the 'natural man' truth with charity.", nextScene: "s5_kb_major_event_speech_begins", effect: { faith: 1 }, feedback: "You choose conversion over applause." },
      { text: "Soften it so no one feels accused.", nextScene: "s5_kb_major_event_speech_begins", effect: { worldly: 1 }, feedback: "You trade sharp medicine for sweet words." },
      { text: "Refuse to teach it; you fear backlash and division.", nextScene: "s5_kb_major_event_speech_begins", effect: { faith: -1 }, feedback: "Fear edits revelation." }
    ]
  },

  // =========
  // PATH C (3) — SUCCESSION / SONS / PLATES
  // =========

  "s5_kb_pathC_succession_1": {
    text:
      "You gather your sons. Kingship is not merely a throne; it is accountability before God. You will teach them the records and the covenant purpose of a people who forget easily.<br><i>(Read Mosiah 1:1–4)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin", "Mosiah_II", "Helaman_son_of_Benjamin", "Helorum", "Amaleki"],
    choices: [
      { text: "Teach them that records preserve faith, not status.", nextScene: "s5_kb_pathC_succession_2", effect: { faith: 1 }, feedback: "You frame leadership as stewardship." },
      { text: "Teach them that records preserve your dynasty and name.", nextScene: "s5_kb_pathC_succession_2", effect: { worldly: 1 }, feedback: "Legacy becomes an idol." },
      { text: "Skip teaching; they’ll learn later when they need it.", nextScene: "s5_kb_pathC_succession_2", effect: { unity: -1 }, feedback: "Delay becomes neglect." }
    ]
  },

  "s5_kb_pathC_succession_2": {
    text:
      "You command Mosiah to search the plates and learn the language and prophecies—so he can govern with covenant memory. This is slow work, and urgent pressures keep interrupting.<br><i>(Read Mosiah 1:2–7)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Insist Mosiah study now, even when politics demands attention.", nextScene: "s5_kb_pathC_succession_3", effect: { knowledge: 1, worldly: 1 }, feedback: "You secure covenant competence, not popularity." }, // Knowledge #2 of 3
      { text: "Let politics win; postpone study for convenience.", nextScene: "s5_kb_pathC_succession_3", effect: { worldly: 1 }, feedback: "Urgency crowds out depth." },
      { text: "Rely on your own mind; keep knowledge centralized in you.", nextScene: "s5_kb_pathC_succession_3", effect: { unity: -1 }, feedback: "Centralizing wisdom weakens succession." }
    ]
  },

  "s5_kb_pathC_succession_3": {
    text:
      "You prepare to proclaim Mosiah king. Yet the people must be more than loyal subjects—they must become covenant disciples. Your last act cannot be merely political; it must be spiritual.<br><i>(Read Mosiah 1:9–12)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Center the proclamation on Christ, not monarchy.", nextScene: "s5_kb_major_event_speech_begins", effect: { faith: 1 }, feedback: "You choose covenant over crown." },
      { text: "Center it on order and obedience to the throne.", nextScene: "s5_kb_major_event_speech_begins", effect: { worldly: 1 }, feedback: "You choose control over conversion." },
      { text: "Avoid naming Mosiah now; fear conflict and criticism.", nextScene: "s5_kb_major_event_speech_begins", effect: { unity: -1 }, feedback: "Avoidance invites uncertainty." }
    ]
  },

  // ==========================
  // MAJOR SCRIPTURAL EVENT
  // (ALL PATHS CONVERGE HERE)
  // ==========================

  "s5_kb_major_event_speech_begins": {
    text:
      "THE TOWER SPEECH. You begin: you have labored with your own hands, served without seeking riches, and taught that when we serve others we serve God. Then the angel’s message: Christ will come, suffer, and atone; the natural man must be put off; mercy claims the repentant.<br><i>(Read Mosiah 2:10–19; Mosiah 3:2–21; Mosiah 4:1–12)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Emphasize humble service as proof of discipleship.", nextScene: "s5_kb_post_major_branch_service_1", effect: { unity: 1 }, feedback: "You direct them outward—toward each other." },
      { text: "Emphasize fear of judgment to force immediate outward compliance.", nextScene: "s5_kb_post_major_branch_fear_1", effect: { worldly: 1 }, feedback: "You seek quick behavior over changed hearts." },
      { text: "Emphasize mercy and repentance as the path to becoming saints.", nextScene: "s5_kb_post_major_branch_mercy_1", effect: { faith: 1 }, feedback: "You aim for inward conversion." }
    ]
  },

  // ==========================
  // POST-MAJOR BRANCH (3 subpaths, then converge, then branch again)
  // ==========================

  // --- SUBPATH S: SERVICE EMPHASIS (3) ---
  "s5_kb_post_major_branch_service_1": {
    text:
      "You press the doctrine into daily life: if you turn away the beggar, you have cause to repent. Prosperity is a spiritual test. The people feel exposed—and invited.<br><i>(Read Mosiah 4:13–23)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Call them to give, trusting God’s wisdom and timing.", nextScene: "s5_kb_post_major_branch_service_2", effect: { faith: 1 }, feedback: "You build generosity on trust, not guilt." },
      { text: "Call them to give mainly to be seen as righteous.", nextScene: "s5_kb_post_major_branch_service_2", effect: { worldly: 1 }, feedback: "Charity becomes performance." },
      { text: "Avoid specifics; you fear people will resent the message.", nextScene: "s5_kb_post_major_branch_service_2", effect: { unity: -1 }, feedback: "Softness dilutes repentance." }
    ]
  },

  "s5_kb_post_major_branch_service_2": {
    text:
      "You teach a pattern for family discipleship: teach children to love, to pray, to walk in truth and soberness. This is slow work, and the crowd wants fast certainty.<br><i>(Read Mosiah 4:14–15)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Teach long-term family holiness even if it feels less dramatic.", nextScene: "s5_kb_post_major_branch_service_3", effect: { unity: 1, worldly: 1 }, feedback: "You trade spectacle for endurance." },
      { text: "Offer shortcuts: 'Just follow me and you’ll be fine.'", nextScene: "s5_kb_post_major_branch_service_3", effect: { worldly: 1 }, feedback: "You replace Christ with a personality." },
      { text: "Stop teaching; let them figure out righteousness privately.", nextScene: "s5_kb_post_major_branch_service_3", effect: { unity: -1 }, feedback: "Private religion erodes public Zion." }
    ]
  },

  "s5_kb_post_major_branch_service_3": {
    text:
      "The people cry for mercy. You see their faces: some want baptismal-level change; some want a temporary emotional release. You must invite the deeper covenant, not just relief.<br><i>(Read Mosiah 4:1–3; Mosiah 5:1–5)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Invite covenant: a mighty change of heart, not a moment.", nextScene: "s5_kb_converge_covenant_response", effect: { faith: 1 }, feedback: "You aim for transformation." },
      { text: "Invite applause for the speech; let emotion be the 'change.'", nextScene: "s5_kb_converge_covenant_response", effect: { worldly: 1 }, feedback: "Emotion rises, then fades." },
      { text: "Avoid pressing covenant; you fear they won’t commit.", nextScene: "s5_kb_converge_covenant_response", effect: { faith: -1 }, feedback: "Fear shrinks the invitation." }
    ]
  },

  // --- SUBPATH F: FEAR/CONTROL EMPHASIS (3) ---
  "s5_kb_post_major_branch_fear_1": {
    text:
      "You lean into warning: sin brings misery; judgment is real. The message is true, but fear can either open humility—or harden pride. You feel the knife-edge of motive.<br><i>(Read Mosiah 2:38–41)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Redirect fear into repentance and mercy, not despair.", nextScene: "s5_kb_post_major_branch_fear_2", effect: { faith: 1 }, feedback: "You use warning as a doorway to Christ." },
      { text: "Keep fear central so people obey you quickly.", nextScene: "s5_kb_post_major_branch_fear_2", effect: { worldly: 1 }, feedback: "Obedience without love fractures later." },
      { text: "Overcorrect: remove warning entirely to avoid discomfort.", nextScene: "s5_kb_post_major_branch_fear_2", effect: { faith: -1 }, feedback: "Avoiding truth weakens conversion." }
    ]
  },

  "s5_kb_post_major_branch_fear_2": {
    text:
      "You teach about the atonement and the need to retain a remission of sins through humility, prayer, and service. The temptation returns: turn this into a checklist—or keep it as a living relationship with God.<br><i>(Read Mosiah 4:11–12, 26)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Teach living discipleship: humility that persists after the crowd leaves.", nextScene: "s5_kb_post_major_branch_fear_3", effect: { unity: 1 }, feedback: "You build lasting practice." },
      { text: "Teach a rigid checklist to keep control over righteousness.", nextScene: "s5_kb_post_major_branch_fear_3", effect: { worldly: 1 }, feedback: "Control replaces conversion." },
      { text: "Teach nothing practical; keep it abstract to avoid offense.", nextScene: "s5_kb_post_major_branch_fear_3", effect: { unity: -1 }, feedback: "Abstraction avoids conflict and avoids change." }
    ]
  },

  "s5_kb_post_major_branch_fear_3": {
    text:
      "The people respond with unity—saying they believe your words because of the Spirit, and they desire to enter a covenant to do God’s will. Now you must name the covenant plainly.<br><i>(Read Mosiah 5:1–5)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Invite covenant with Christ’s name, not your authority.", nextScene: "s5_kb_converge_covenant_response", effect: { faith: 1 }, feedback: "You aim their loyalty at Christ." },
      { text: "Invite covenant loyalty to king and nation first.", nextScene: "s5_kb_converge_covenant_response", effect: { worldly: 1 }, feedback: "You blur covenant with politics." },
      { text: "Hesitate; you fear making it 'too binding.'", nextScene: "s5_kb_converge_covenant_response", effect: { faith: -1 }, feedback: "Fear edits covenant." }
    ]
  },

  // --- SUBPATH M: MERCY/REPENTANCE EMPHASIS (3) ---
  "s5_kb_post_major_branch_mercy_1": {
    text:
      "You emphasize that God can immediately bless those who believe, humble themselves, and call on His name. The people feel hope—but hope must become covenant, not complacency.<br><i>(Read Mosiah 4:9–12)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Tie mercy to repentance and endurance, not entitlement.", nextScene: "s5_kb_post_major_branch_mercy_2", effect: { faith: 1 }, feedback: "You protect mercy from being cheapened." },
      { text: "Let mercy become comfort without change.", nextScene: "s5_kb_post_major_branch_mercy_2", effect: { worldly: 1 }, feedback: "Comfort replaces conversion." },
      { text: "Avoid mercy; you fear people will 'take advantage.'", nextScene: "s5_kb_post_major_branch_mercy_2", effect: { faith: -1 }, feedback: "Suspicion shrinks the gospel." }
    ]
  },

  "s5_kb_post_major_branch_mercy_2": {
    text:
      "You teach that the natural man must be put off, becoming a saint through the atonement of Christ, yielding to the Holy Spirit—submissive, meek, humble, patient, full of love.<br><i>(Read Mosiah 3:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Invite them to yield—accepting the slow work of becoming.", nextScene: "s5_kb_post_major_branch_mercy_3", effect: { unity: 1 }, feedback: "You build saintliness as a process." },
      { text: "Invite them to 'prove' saintliness publicly through status and display.", nextScene: "s5_kb_post_major_branch_mercy_3", effect: { worldly: 1 }, feedback: "Display replaces discipleship." },
      { text: "Say nothing about yielding; it threatens pride.", nextScene: "s5_kb_post_major_branch_mercy_3", effect: { unity: -1 }, feedback: "Pride remains unchallenged." }
    ]
  },

  "s5_kb_post_major_branch_mercy_3": {
    text:
      "The people speak with one voice: they have had no more disposition to do evil, but to do good continually. You recognize the Spirit’s work—and the moment to seal it into covenant identity.<br><i>(Read Mosiah 5:2–5)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Name the covenant: take upon them the name of Christ.", nextScene: "s5_kb_converge_covenant_response", effect: { faith: 1 }, feedback: "You seal identity in Christ." },
      { text: "Name the covenant: loyalty to your reign and laws first.", nextScene: "s5_kb_converge_covenant_response", effect: { worldly: 1 }, feedback: "You anchor identity in government." },
      { text: "Avoid naming anything; let it remain vague to reduce pressure.", nextScene: "s5_kb_converge_covenant_response", effect: { faith: -1 }, feedback: "Vagueness dilutes binding commitment." }
    ]
  },

  // ==========================
  // CONVERGENCE: COVENANT RESPONSE
  // ==========================

  "s5_kb_converge_covenant_response": {
    text:
      "They enter into a covenant to do God’s will and be obedient to His commandments. You declare that because of the covenant, they shall be called the children of Christ—and must remember His name written on their hearts.<br><i>(Read Mosiah 5:5–12)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Record the names of those who covenant, for continuity.", nextScene: "s5_kb_post_converge_branchA_record_1", effect: { knowledge: 1, worldly: 1 }, feedback: "You preserve covenant memory without turning it into control." }, // Knowledge #3 of 3
      { text: "Publicly shame the hesitant to force unity.", nextScene: "s5_kb_post_converge_branchB_pressure_1", effect: { worldly: 1 }, feedback: "You gain compliance, risk resentment." },
      { text: "End quickly; avoid organizing anything further.", nextScene: "s5_kb_post_converge_branchC_loose_1", effect: { unity: -1 }, feedback: "A sacred moment needs structure to endure." }
    ]
  },

  // ==========================
  // POST-CONVERGENCE BRANCH (at least 2 subpaths) — 3 scenes each
  // ==========================

  // --- PATH A: RECORD / TEACHING STRUCTURE (3) ---
  "s5_kb_post_converge_branchA_record_1": {
    text:
      "You organize the covenant memory: names recorded, teaching reinforced, and the people reminded that the name of Christ must be retained by obedience and love—not merely spoken once.<br><i>(Read Mosiah 5:11–15)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Appoint teachers/priests to repeat the doctrine regularly.", nextScene: "s5_kb_post_converge_branchA_record_2", effect: { unity: 1 }, feedback: "You build endurance into discipleship." },
      { text: "Keep teaching centralized in you to maintain control.", nextScene: "s5_kb_post_converge_branchA_record_2", effect: { worldly: 1 }, feedback: "Control weakens succession." },
      { text: "Assume they’ll remember without reinforcement.", nextScene: "s5_kb_post_converge_branchA_record_2", effect: { unity: -1 }, feedback: "Memory fades without practice." }
    ]
  },

  "s5_kb_post_converge_branchA_record_2": {
    text:
      "You feel your body weaken again. The Spirit whispers that the covenant must outlive your voice. You must decrease, so Christ can increase among them through Mosiah and future leaders.<br><i>(Read Mosiah 6:1–3)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Publicly transfer authority to Mosiah with humility.", nextScene: "s5_kb_post_converge_branchA_record_3", effect: { faith: 1 }, feedback: "You hand off the crown without clutching it." },
      { text: "Transfer authority but demand public praise first.", nextScene: "s5_kb_post_converge_branchA_record_3", effect: { worldly: 1 }, feedback: "You attach ego to succession." },
      { text: "Delay transfer; you fear losing influence.", nextScene: "s5_kb_post_converge_branchA_record_3", effect: { faith: -1 }, feedback: "Fear clings to the throne." }
    ]
  },

  "s5_kb_post_converge_branchA_record_3": {
    text:
      "You charge Mosiah to keep the records and govern in righteousness. Your last leadership act is to make obedience easier by making covenant clarity sharper.<br><i>(Read Mosiah 6:3–4)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Seal the moment with testimony of Christ, not policy.", nextScene: "s5_kb_final_scene", effect: { faith: 1 }, feedback: "You end as a witness, not a manager." },
      { text: "Seal the moment with law and threat of punishment.", nextScene: "s5_kb_final_scene", effect: { worldly: 1 }, feedback: "You end with control, not conversion." },
      { text: "Say little; you fear tears and vulnerability.", nextScene: "s5_kb_final_scene", effect: { unity: -1 }, feedback: "Withholding warmth chills unity." }
    ]
  },

  // --- PATH B: PRESSURE / IMAGE MANAGEMENT (3) ---
  "s5_kb_post_converge_branchB_pressure_1": {
    text:
      "You feel the temptation to manage appearances: the covenant must look unified, the kingdom must look strong. But image can suffocate sincerity. The people can sense the difference.<br><i>(Read Mosiah 5:12–13)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Repent of image-control and invite genuine heart change.", nextScene: "s5_kb_post_converge_branchB_pressure_2", effect: { faith: 1 }, feedback: "You choose sincerity over spectacle." },
      { text: "Double down: enforce unity through public pressure.", nextScene: "s5_kb_post_converge_branchB_pressure_2", effect: { worldly: 1 }, feedback: "Pressure creates conformity, not covenant." },
      { text: "Withdraw from the people; let the moment end abruptly.", nextScene: "s5_kb_post_converge_branchB_pressure_2", effect: { unity: -1 }, feedback: "Abrupt endings breed confusion." }
    ]
  },

  "s5_kb_post_converge_branchB_pressure_2": {
    text:
      "You remember your own doctrine: when you are in the service of your fellow beings you are only in the service of your God. That truth rebukes leadership driven by ego. It also comforts: you can still choose humility now.<br><i>(Read Mosiah 2:17)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Choose humility: credit God and the people’s agency, not yourself.", nextScene: "s5_kb_post_converge_branchB_pressure_3", effect: { unity: 1 }, feedback: "You lower yourself to lift them." },
      { text: "Choose self-defense: justify every decision to preserve your legacy.", nextScene: "s5_kb_post_converge_branchB_pressure_3", effect: { worldly: 1 }, feedback: "Legacy-chasing crowds out testimony." },
      { text: "Choose silence: avoid admitting weakness or change.", nextScene: "s5_kb_post_converge_branchB_pressure_3", effect: { faith: -1 }, feedback: "Pride hides behind quiet." }
    ]
  },

  "s5_kb_post_converge_branchB_pressure_3": {
    text:
      "The crown must pass. Your final test is not what you built, but how you let it go. The people watch whether kingship was about you—or about God.<br><i>(Read Mosiah 6:1–3)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Transfer authority cleanly, then step back into obscurity.", nextScene: "s5_kb_final_scene", effect: { faith: 1 }, feedback: "You end as a servant." },
      { text: "Transfer authority but keep informal control behind the scenes.", nextScene: "s5_kb_final_scene", effect: { worldly: 1 }, feedback: "Control lingers like a shadow." },
      { text: "Hesitate and create uncertainty about succession.", nextScene: "s5_kb_final_scene", effect: { unity: -1 }, feedback: "Uncertainty fractures trust." }
    ]
  },

  // --- PATH C: LOOSE ENDING / UNDER-STRUCTURED (3) ---
  "s5_kb_post_converge_branchC_loose_1": {
    text:
      "You end the covenant moment quickly, hoping the Spirit will 'carry it.' But spiritual highs fade. Without structure, even sincere hearts drift. You feel the risk: a covenant unreinforced becomes a story people tell, not a life people live.<br><i>(Read Mosiah 5:14–15)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Correct course: organize follow-up teaching and reminders.", nextScene: "s5_kb_post_converge_branchC_loose_2", effect: { unity: 1 }, feedback: "You choose endurance over impulse." },
      { text: "Refuse to organize; structure feels controlling.", nextScene: "s5_kb_post_converge_branchC_loose_2", effect: { unity: -1 }, feedback: "Fear of control becomes neglect." },
      { text: "Organize only for status—who’s in, who’s out.", nextScene: "s5_kb_post_converge_branchC_loose_2", effect: { worldly: 1 }, feedback: "Structure becomes exclusion." }
    ]
  },

  "s5_kb_post_converge_branchC_loose_2": {
    text:
      "Your strength fails again. You realize: you cannot parent a covenant people forever. You can only point them to Christ, and then entrust the work to Mosiah and God’s patience.<br><i>(Read Mosiah 6:1–3)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "Entrust the people to Mosiah and to God, without clinging.", nextScene: "s5_kb_post_converge_branchC_loose_3", effect: { faith: 1 }, feedback: "You choose trust over anxiety." },
      { text: "Cling: warn Mosiah that you alone truly understand the people.", nextScene: "s5_kb_post_converge_branchC_loose_3", effect: { worldly: 1 }, feedback: "You weaken him by keeping yourself central." },
      { text: "Withdraw emotionally; you’re too tired to care now.", nextScene: "s5_kb_post_converge_branchC_loose_3", effect: { unity: -1 }, feedback: "Weariness becomes abandonment." }
    ]
  },

  "s5_kb_post_converge_branchC_loose_3": {
    text:
      "You decide how to end: with covenant clarity, with control, or with withdrawal. The people will remember your last note—and build their future on it.<br><i>(Read Mosiah 6:3–4)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "End with testimony and covenant identity in Christ.", nextScene: "s5_kb_final_scene", effect: { faith: 1 }, feedback: "You finish as a witness." },
      { text: "End with demands and threat to preserve order.", nextScene: "s5_kb_final_scene", effect: { worldly: 1 }, feedback: "You finish as a controller." },
      { text: "End abruptly to avoid emotion and vulnerability.", nextScene: "s5_kb_final_scene", effect: { unity: -1 }, feedback: "You finish distant." }
    ]
  },

  // ==========================
  // FINAL SCENE (ALL 3 CHOICES -> module_end_story_king_covenant)
  // ==========================

  "s5_kb_final_scene": {
    text:
      "THE CROWN LAID DOWN. Mosiah is made king. You finish your course and die, having labored to bind a people to Christ rather than to yourself. The covenant remains: retain the name written in the heart, and serve one another as service to God.<br><i>(Read Mosiah 6:1–7; Mosiah 5:12–15)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Mosiah_II", "King_Benjamin"],
    choices: [
      { text: "End with faith: trust that Christ will keep working in them.", nextScene: "module_end_story_king_covenant", effect: { faith: 1 }, feedback: "You choose trust over fear." },
      { text: "End with vigilance: warn against pride and forgetting the poor.", nextScene: "module_end_story_king_covenant", effect: { worldly: 1 }, feedback: "You choose sobriety over comfort." },
      { text: "End with unity: charge them to become one covenant people.", nextScene: "module_end_story_king_covenant", effect: { unity: 1 }, feedback: "You choose Zion over factions." }
    ]
  }

});