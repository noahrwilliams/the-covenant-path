window.STARTING_STATS["Amaleki"] = {
  storyId: "decline",
  displayName: "Amaleki",
  faith: 7, unity: 5, worldly_influence: 5, knowledge: 0,
  hasBrassPlates: true,
  initialScene: "s4_amaleki_intro",
  bio: "A keeper of fading records who must decide whether covenant memory survives decline, migration, and fractured peoples."
};

// QC Review: Scriptural Accuracy; Decision Difficulty/Balance; Branching Depth; Mathematical Integrity (F + U + K - W)

Object.assign(window.scenes, {

  // =========================
  // INTRO (3 PATHS A / B / C)
  // =========================

  "s4_amaleki_intro": {
    text:
      "LATE DAYS OF THE SMALL PLATES. You inherit more than metal—you inherit anxiety. The record is thin, the people divided, and time feels short. You feel a wrestle approaching: not in a forest like Enos, but in the weight of stewardship.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Focus on the plates: preserve history at any cost.", nextScene: "s4_amaleki_pathA_records_1", effect: { faith: 1 }, feedback: "You treat the record as sacred trust." },
      { text: "Focus on the people: stabilize unity before recording details.", nextScene: "s4_amaleki_pathB_people_1", effect: { unity: 1 }, feedback: "You prioritize souls over ink." },
      { text: "Focus on strategy: assess threats, supplies, and survival first.", nextScene: "s4_amaleki_pathC_strategy_1", effect: { knowledge: 1, worldly: 1 }, feedback: "You gain clarity, but risk leading with fear." } // Knowledge #1 of 3
    ]
  },

  // =========
  // PATH A (3) — RECORDS
  // =========

  "s4_amaleki_pathA_records_1": {
    text:
      "You study what little is written: generations that said almost nothing, as if the covenant had gone quiet. You wonder: is silence humility—or decay? Your pen hesitates.<br><br><i>(Read Jarom 1:1–2; Omni 1:1–4)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Write anyway: brief, faithful, true—no embellishing.", nextScene: "s4_amaleki_pathA_records_2", effect: { faith: 1, worldly: 1 }, feedback: "You keep truth but feel public pressure." },
      { text: "Hide ugly details to protect morale and reputation.", nextScene: "s4_amaleki_pathA_records_2", effect: { worldly: 1 }, feedback: "You protect image at the cost of honesty." },
      { text: "Stop writing; if the people are failing, why document it?", nextScene: "s4_amaleki_pathA_records_2", effect: { faith: -1 }, feedback: "Discouragement tempts you to silence." }
    ]
  },

  "s4_amaleki_pathA_records_2": {
    text:
      "You discover an ache: you want the record to prove you were 'good enough.' But the plates were never meant to glorify a man—only to preserve testimony. The wrestle turns inward.<br><br><i>(Read Words of Mormon 1:3–5)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Pray for purity of intent, then keep writing.", nextScene: "s4_amaleki_pathA_records_3", effect: { faith: 1 }, feedback: "You choose consecration over self-justification." },
      { text: "Write aggressively to control the narrative.", nextScene: "s4_amaleki_pathA_records_3", effect: { worldly: 1 }, feedback: "You treat stewardship like ownership." },
      { text: "Withdraw from people entirely to avoid criticism.", nextScene: "s4_amaleki_pathA_records_3", effect: { unity: -1 }, feedback: "Isolation feels safe, but narrows charity." }
    ]
  },

  "s4_amaleki_pathA_records_3": {
    text:
      "A rumor spreads: some want to discard records and 'start fresh' in comfort. You feel the cliff-edge: the covenant can be lost without a single dramatic sin—only neglect.<br><br><i>(Read Omni 1:24–26)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Confront the rumor calmly and testify why records matter.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { unity: 1, worldly: 1 }, feedback: "You lead without shaming." },
      { text: "Threaten them with consequences to force compliance.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { worldly: 1 }, feedback: "You gain control, risk resentment." },
      { text: "Say nothing; avoid conflict and hope it passes.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { unity: -1 }, feedback: "Silence becomes permission." }
    ]
  },

  // =========
  // PATH B (3) — PEOPLE / UNITY
  // =========

  "s4_amaleki_pathB_people_1": {
    text:
      "You walk among families who still believe, and others who only want ease. Decline isn’t just wickedness—it’s weariness. You feel pulled to please everyone, and that pull terrifies you.<br><br><i>(Read Jarom 1:3–4)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Gather the faithful quietly and strengthen them.", nextScene: "s4_amaleki_pathB_people_2", effect: { unity: 1 }, feedback: "You build a remnant without grandstanding." },
      { text: "Try to win the indifferent by mirroring their priorities.", nextScene: "s4_amaleki_pathB_people_2", effect: { worldly: 1 }, feedback: "You trade edge for acceptance." },
      { text: "Condemn broadly; let shame do the work.", nextScene: "s4_amaleki_pathB_people_2", effect: { unity: -1 }, feedback: "Shame fractures what it tries to fix." }
    ]
  },

  "s4_amaleki_pathB_people_2": {
    text:
      "A dispute erupts: resources, status, 'who belongs.' You feel the plates in the background like a heartbeat. Unity matters—but so does truth. Your choices will cost someone something.<br><br><i>(Read Jarom 1:7–8)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Arbitrate fairly, even if powerful people dislike you.", nextScene: "s4_amaleki_pathB_people_3", effect: { unity: 1, worldly: 1 }, feedback: "Justice builds trust slowly." },
      { text: "Side with power to keep short-term peace.", nextScene: "s4_amaleki_pathB_people_3", effect: { worldly: 1 }, feedback: "Peace purchased with injustice decays." },
      { text: "Refuse involvement; let them sort it out.", nextScene: "s4_amaleki_pathB_people_3", effect: { unity: -1 }, feedback: "Avoidance becomes abandonment." }
    ]
  },

  "s4_amaleki_pathB_people_3": {
    text:
      "You overhear whispers of departure—Mosiah gathering those who will follow him away from conflict. Your heart tightens: if you go, you leave homes behind; if you stay, you may lose covenant memory entirely.<br><br><i>(Read Omni 1:12–14)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Join Mosiah’s remnant and help others choose courage.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { faith: 1 }, feedback: "You choose covenant over comfort." },
      { text: "Delay decision to keep options open.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { worldly: 1 }, feedback: "Indecision protects you—briefly." },
      { text: "Reject the move; cling to the familiar place and power.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { faith: -1 }, feedback: "Attachment disguises itself as loyalty." }
    ]
  },

  // =========
  // PATH C (3) — STRATEGY / SURVIVAL
  // =========

  "s4_amaleki_pathC_strategy_1": {
    text:
      "You map threats: wars, contentions, and the slow erosion of belief. You can’t fix everything, so you begin choosing what to save first—life, faith, or reputation.<br><br><i>(Read Omni 1:24–25)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Make a practical plan, then submit it in prayer.", nextScene: "s4_amaleki_pathC_strategy_2", effect: { faith: 1 }, feedback: "You pair wisdom with humility." },
      { text: "Rely purely on planning; prayer can wait.", nextScene: "s4_amaleki_pathC_strategy_2", effect: { worldly: 1 }, feedback: "Control rises; softness fades." },
      { text: "Abandon planning; it feels overwhelming.", nextScene: "s4_amaleki_pathC_strategy_2", effect: { unity: -1 }, feedback: "Panic isolates and paralyzes." }
    ]
  },

  "s4_amaleki_pathC_strategy_2": {
    text:
      "A scout reports worsening conflict. Some propose violence-first solutions; others propose surrender. You feel the spiritual danger: the wrong defense can destroy the very people it protects.<br><br><i>(Read Jarom 1:10–12)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Advocate restrained defense, refusing hatred.", nextScene: "s4_amaleki_pathC_strategy_3", effect: { unity: 1, worldly: 1 }, feedback: "You protect bodies without poisoning souls." },
      { text: "Push harsh measures to appear strong and secure support.", nextScene: "s4_amaleki_pathC_strategy_3", effect: { worldly: 1 }, feedback: "Strength becomes a mask for fear." },
      { text: "Refuse responsibility; 'someone else should decide.'", nextScene: "s4_amaleki_pathC_strategy_3", effect: { unity: -1 }, feedback: "Avoidance increases chaos." }
    ]
  },

  "s4_amaleki_pathC_strategy_3": {
    text:
      "You learn of Mosiah’s plan: lead the righteous away, seeking peace and a new people. Strategy becomes covenant: the move is not conquest—it’s preservation. The question becomes: will you trust it?<br><br><i>(Read Omni 1:12–16)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_I"],
    choices: [
      { text: "Commit fully to the departure and prepare others wisely.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { unity: 1 }, feedback: "You turn planning into service." },
      { text: "Support it publicly but keep a private escape plan.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { worldly: 1 }, feedback: "You hedge at the cost of trust." },
      { text: "Undermine it quietly; you prefer your own approach.", nextScene: "s4_amaleki_major_event_mosiah_departure", effect: { unity: -1 }, feedback: "Division grows in the shadows." }
    ]
  },

  // ==========================
  // MAJOR SCRIPTURAL EVENT
  // (ALL PATHS CONVERGE HERE)
  // ==========================

  "s4_amaleki_major_event_mosiah_departure": {
    text:
      "THE DEPARTURE TO ZARAHEMLA. Mosiah leads those who will follow. You leave behind old patterns, old lands, and old grudges. The journey is hard, but something in the remnant feels clean—like a second exodus.<br><br><i>(Read Omni 1:12–14)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Mosiah_I"],
    choices: [
      { text: "Carry the plates personally, guarding them with reverence.", nextScene: "s4_post_major_zarahemla_1", effect: { faith: 1 }, feedback: "Stewardship becomes physical weight." },
      { text: "Focus on keeping the group together and calm.", nextScene: "s4_post_major_unity_1", effect: { unity: 1 }, feedback: "You keep hearts from breaking." },
      { text: "Obsess over speed and efficiency; weakness irritates you.", nextScene: "s4_post_major_pressure_1", effect: { worldly: 1 }, feedback: "Impatience wounds the weary." }
    ]
  },

  // ==========================
  // POST-MAJOR BRANCH (3 SUBPATHS, then converge, then re-branch)
  // ==========================

  // --- SUBPATH Z: ZARAHEMLA MEETING (3) ---
  "s4_post_major_zarahemla_1": {
    text:
      "You arrive and meet the people of Zarahemla. They rejoice, but you feel the complication: languages differ, histories diverge, and unity must be built, not assumed.<br><br><i>(Read Omni 1:14–18)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Humble yourself and learn their story before leading.", nextScene: "s4_post_major_zarahemla_2", effect: { unity: 1, worldly: 1 }, feedback: "Listening costs pride, buys trust." },
      { text: "Push Nephite customs immediately as 'the right way.'", nextScene: "s4_post_major_zarahemla_2", effect: { worldly: 1 }, feedback: "Certainty without charity divides." },
      { text: "Keep distance; treat them as outsiders.", nextScene: "s4_post_major_zarahemla_2", effect: { unity: -1 }, feedback: "Suspicion blocks covenant unity." }
    ]
  },

  "s4_post_major_zarahemla_2": {
    text:
      "You hear of a record among them—larger plates, but gaps, and a people hungry to understand their own past. You sense why the Lord preserved your small plates: not to dominate, but to merge truths.<br><br><i>(Read Omni 1:18–19)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Seek translation/understanding carefully, honoring both peoples.", nextScene: "s4_post_major_zarahemla_3", effect: { knowledge: 1, worldly: 1 }, feedback: "You gain insight without turning it into superiority." }, // Knowledge #2 of 3
      { text: "Dismiss their record as inferior and refuse to engage.", nextScene: "s4_post_major_zarahemla_3", effect: { unity: -1 }, feedback: "Pride silences learning." },
      { text: "Exploit the information to gain influence over them.", nextScene: "s4_post_major_zarahemla_3", effect: { worldly: 1 }, feedback: "Knowledge becomes a weapon." }
    ]
  },

  "s4_post_major_zarahemla_3": {
    text:
      "As Mosiah becomes king over both peoples, you feel the long-term question: will covenant identity become shared—or will it splinter into factions competing for 'real' belonging?<br><br><i>(Read Omni 1:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_I"],
    choices: [
      { text: "Advocate shared covenants over shared pride.", nextScene: "s4_converge_amaleki_plates_decision", effect: { faith: 1 }, feedback: "You point unity toward Christ, not culture." },
      { text: "Advocate strict boundaries to keep 'purity.'", nextScene: "s4_converge_amaleki_plates_decision", effect: { worldly: 1 }, feedback: "Protection turns into exclusion." },
      { text: "Withdraw; 'they will never truly unite.'", nextScene: "s4_converge_amaleki_plates_decision", effect: { unity: -1 }, feedback: "Cynicism becomes self-fulfilling." }
    ]
  },

  // --- SUBPATH U: UNITY LABOR (3) ---
  "s4_post_major_unity_1": {
    text:
      "On the move and after arrival, you become a quiet peacemaker—mediating fear, correcting rumors, and reminding the remnant why they left. Unity is exhausting work.<br><br><i>(Read Omni 1:13–14)</i>",
    backgroundAsset: "wilderness",
    castAssets: [],
    choices: [
      { text: "Absorb complaints patiently, then redirect toward faith.", nextScene: "s4_post_major_unity_2", effect: { unity: 1 }, feedback: "You carry burdens that aren’t yours." },
      { text: "Silence dissent harshly to preserve momentum.", nextScene: "s4_post_major_unity_2", effect: { worldly: 1 }, feedback: "Order rises; trust falls." },
      { text: "Stop engaging; let factions form if they want to.", nextScene: "s4_post_major_unity_2", effect: { unity: -1 }, feedback: "Distance widens gaps." }
    ]
  },

  "s4_post_major_unity_2": {
    text:
      "In Zarahemla, language and tradition collide. Small misunderstandings threaten to become permanent resentments. You realize: unity is built by repeated, humble steps.<br><br><i>(Read Omni 1:17)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Create shared worship moments centered on Christ.", nextScene: "s4_post_major_unity_3", effect: { faith: 1 }, feedback: "You anchor identity in the Redeemer." },
      { text: "Create shared celebrations centered on culture and status.", nextScene: "s4_post_major_unity_3", effect: { worldly: 1 }, feedback: "You unify outwardly, risk hollowness." },
      { text: "Let groups worship separately; it's simpler.", nextScene: "s4_post_major_unity_3", effect: { unity: -1 }, feedback: "Simplicity now, division later." }
    ]
  },

  "s4_post_major_unity_3": {
    text:
      "A new king and a merged people require a merged memory. You sense your responsibility: not to win arguments, but to keep covenants alive in a new land.<br><br><i>(Read Omni 1:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Mosiah_I"],
    choices: [
      { text: "Tie unity to covenants and repentance, not ancestry.", nextScene: "s4_converge_amaleki_plates_decision", effect: { unity: 1, worldly: 1 }, feedback: "You build unity that can survive prosperity." },
      { text: "Tie unity to obedience enforced by fear.", nextScene: "s4_converge_amaleki_plates_decision", effect: { worldly: 1 }, feedback: "Fear produces compliance, not conversion." },
      { text: "Let the king handle it; you step back.", nextScene: "s4_converge_amaleki_plates_decision", effect: { unity: -1 }, feedback: "Leadership avoided becomes leadership lost." }
    ]
  },

  // --- SUBPATH P: PRESSURE / CONTROL (3) ---
  "s4_post_major_pressure_1": {
    text:
      "You push hard—too hard. The weak slow the journey; the uncertain ask too many questions. You feel the old temptation: control everything so nothing breaks.<br><br><i>(Read Omni 1:13–14)</i>",
    backgroundAsset: "wilderness",
    castAssets: [],
    choices: [
      { text: "Repent of impatience and choose gentleness over speed.", nextScene: "s4_post_major_pressure_2", effect: { faith: 1 }, feedback: "Strength becomes service." },
      { text: "Double down and shame people into moving faster.", nextScene: "s4_post_major_pressure_2", effect: { worldly: 1 }, feedback: "You gain pace, lose hearts." },
      { text: "Detach emotionally; stop caring who falls behind.", nextScene: "s4_post_major_pressure_2", effect: { unity: -1 }, feedback: "Detachment breeds bitterness." }
    ]
  },

  "s4_post_major_pressure_2": {
    text:
      "In Zarahemla, you still feel threatened—by difference, by uncertainty, by the loss of old status. You can either humble yourself into a new beginning, or cling to being 'right.'<br><br><i>(Read Omni 1:16–18)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Choose humility: learn names, language, and needs.", nextScene: "s4_post_major_pressure_3", effect: { unity: 1, worldly: 1 }, feedback: "Humility costs pride and buys peace." },
      { text: "Guard status: insist on your way in every dispute.", nextScene: "s4_post_major_pressure_3", effect: { worldly: 1 }, feedback: "You preserve authority, shrink charity." },
      { text: "Withdraw and criticize from the edges.", nextScene: "s4_post_major_pressure_3", effect: { unity: -1 }, feedback: "Distance makes contempt easy." }
    ]
  },

  "s4_post_major_pressure_3": {
    text:
      "You see the plates again and feel the deeper issue: not whether you are respected, but whether the covenant survives you. The wrestle becomes clear: surrender control, or lose the purpose of the record.<br><br><i>(Read Words of Mormon 1:3–6)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Yield: let the record serve God, not your identity.", nextScene: "s4_converge_amaleki_plates_decision", effect: { faith: 1 }, feedback: "You choose consecration over ego." },
      { text: "Use the record to justify yourself and your faction.", nextScene: "s4_converge_amaleki_plates_decision", effect: { worldly: 1 }, feedback: "You turn scripture into a shield." },
      { text: "Hide the record away; no one is worthy.", nextScene: "s4_converge_amaleki_plates_decision", effect: { unity: -1 }, feedback: "Withholding truth fractures the future." }
    ]
  },

  // ==========================
  // CONVERGENCE: AMALEKI'S KEY DECISION
  // ==========================

  "s4_converge_amaleki_plates_decision": {
    text:
      "THE HINGE OF A LIFE. You feel your own end approaching. You have the small plates, and you know a seer is among the people—King Benjamin. The question isn’t whether you can keep the record; it’s whether you can *hand it off* without controlling it.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Give the plates freely to King Benjamin as covenant trust.", nextScene: "s4_branch_after_handoff_A1", effect: { faith: 1 }, feedback: "You surrender stewardship into God’s order." },
      { text: "Give them, but attach conditions and demand influence.", nextScene: "s4_branch_after_handoff_B1", effect: { worldly: 1 }, feedback: "You pass the plates, keep control." },
      { text: "Delay the handoff; test King Benjamin and the people first.", nextScene: "s4_branch_after_handoff_C1", effect: { unity: -1 }, feedback: "Suspicion slows sacred continuity." }
    ]
  },

  // ==========================
  // AFTER-HANDOFF BRANCH (3 PATHS, 3 scenes each)
  // Then converge into WoM major 'editing insight' and final.
  // ==========================

  // --- AFTER PATH A: TRUSTED HANDOFF (3) ---
  "s4_branch_after_handoff_A1": {
    text:
      "You hand Benjamin the plates without bargaining. A peace settles: covenant work continues after you. You feel small—and strangely free.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Bear testimony to King Benjamin of Christ and mercy.", nextScene: "s4_branch_after_handoff_A2", effect: { faith: 1 }, feedback: "You leave testimony, not instructions." },
      { text: "Stay quiet, fearing your words will be misunderstood.", nextScene: "s4_branch_after_handoff_A2", effect: { faith: -1 }, feedback: "Fear steals a final witness." },
      { text: "Ask for recognition for your sacrifice.", nextScene: "s4_branch_after_handoff_A2", effect: { worldly: 1 }, feedback: "You seek applause at the end." }
    ]
  },

  "s4_branch_after_handoff_A2": {
    text:
      "You look at the people of Zarahemla and the Nephites together—uneven, imperfect, but gathered. You sense the Lord’s pattern: He works with remnants, not crowds chasing comfort.<br><br><i>(Read Omni 1:14–17)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Encourage shared repentance as the foundation of unity.", nextScene: "s4_branch_after_handoff_A3", effect: { unity: 1, worldly: 1 }, feedback: "You invite inward change to heal outward division." },
      { text: "Encourage shared pride in being 'the chosen people.'", nextScene: "s4_branch_after_handoff_A3", effect: { worldly: 1 }, feedback: "Pride feels strong—until it breaks." },
      { text: "Withdraw from everyone; you’re tired of people.", nextScene: "s4_branch_after_handoff_A3", effect: { unity: -1 }, feedback: "Weariness becomes isolation." }
    ]
  },

  "s4_branch_after_handoff_A3": {
    text:
      "You sense your end. The plates are safe, but the spiritual record—your own heart—still matters. You face the final, personal question: will you finish with faith, or with fear?<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "wilderness",
    castAssets: [],
    choices: [
      { text: "Finish in prayer—trusting the Lord’s long plan.", nextScene: "s4_wom_major_small_plates_insight", effect: { faith: 1 }, feedback: "You end with covenant confidence." },
      { text: "Finish in regret—replaying failures endlessly.", nextScene: "s4_wom_major_small_plates_insight", effect: { unity: -1 }, feedback: "Regret turns inward and corrodes." },
      { text: "Finish in self-congratulation—'I did enough.'", nextScene: "s4_wom_major_small_plates_insight", effect: { worldly: 1 }, feedback: "Pride tries to crown what grace alone completes." }
    ]
  },

  // --- AFTER PATH B: CONDITIONAL HANDOFF (3) ---
  "s4_branch_after_handoff_B1": {
    text:
      "You give Benjamin the plates, but with strings. You feel safer—but something in your soul feels smaller. Stewardship becomes negotiation.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Release control and apologize for conditions.", nextScene: "s4_branch_after_handoff_B2", effect: { faith: 1 }, feedback: "Humility repairs what fear broke." },
      { text: "Insist on authority; threaten to reclaim the plates.", nextScene: "s4_branch_after_handoff_B2", effect: { worldly: 1 }, feedback: "Power grabs poison trust." },
      { text: "Avoid the tension; let it sit unspoken.", nextScene: "s4_branch_after_handoff_B2", effect: { unity: -1 }, feedback: "Unspoken resentment grows roots." }
    ]
  },

  "s4_branch_after_handoff_B2": {
    text:
      "You hear people talk about Benjamin—his righteousness and leadership. A part of you wants to be seen as equally essential. You remember: the record never existed to preserve your status.<br><br><i>(Read Words of Mormon 1:12–14)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin"],
    choices: [
      { text: "Choose obscurity; let King Benjamin lead without your shadow.", nextScene: "s4_branch_after_handoff_B3", effect: { unity: 1, worldly: 1 }, feedback: "You bless the future by stepping back." },
      { text: "Compete subtly for attention and influence.", nextScene: "s4_branch_after_handoff_B3", effect: { worldly: 1 }, feedback: "Rivalry fractures the remnant." },
      { text: "Isolate and complain that no one appreciates you.", nextScene: "s4_branch_after_handoff_B3", effect: { unity: -1 }, feedback: "Bitterness is a lonely gospel." }
    ]
  },

  "s4_branch_after_handoff_B3": {
    text:
      "A final chance comes: you can testify simply of Christ, or you can defend yourself. The plates are metal, but words can still either heal or divide.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Testify of Christ and repentance, then fade quietly.", nextScene: "s4_wom_major_small_plates_insight", effect: { faith: 1 }, feedback: "You leave the right kind of record." },
      { text: "Argue about credit and legacy.", nextScene: "s4_wom_major_small_plates_insight", effect: { worldly: 1 }, feedback: "Legacy-chasing empties testimony." },
      { text: "Say nothing and retreat in wounded pride.", nextScene: "s4_wom_major_small_plates_insight", effect: { unity: -1 }, feedback: "Silence becomes a final wall." }
    ]
  },

  // --- AFTER PATH C: DELAYED HANDOFF (3) ---
  "s4_branch_after_handoff_C1": {
    text:
      "You delay giving the plates. You tell yourself it’s caution, but the Spirit presses: withholding can become a quiet form of unbelief. Time does not wait for perfect certainty.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Repent quickly and bring the plates to King Benjamin today.", nextScene: "s4_branch_after_handoff_C2", effect: { faith: 1 }, feedback: "Urgency becomes obedience." },
      { text: "Keep testing; ask others to report on King Benjamin’s worthiness.", nextScene: "s4_branch_after_handoff_C2", effect: { worldly: 1 }, feedback: "Suspicion spreads like smoke." },
      { text: "Withdraw and keep the plates hidden, trusting no one.", nextScene: "s4_branch_after_handoff_C2", effect: { unity: -1 }, feedback: "Isolation turns stewardship into hoarding." }
    ]
  },

  "s4_branch_after_handoff_C2": {
    text:
      "You watch a small conflict flare—exactly the kind that once pushed your ancestors to migrate. You realize: if the record isn’t passed rightly, future reformers won’t even know what they’re meant to reform.<br><br><i>(Read Omni 1:12–14; Words of Mormon 1:3–5)</i>",
    backgroundAsset: "settlement",
    castAssets: [],
    choices: [
      { text: "Make peace between groups and then complete the handoff.", nextScene: "s4_branch_after_handoff_C3", effect: { unity: 1, worldly: 1 }, feedback: "You repair relationships while preserving continuity." },
      { text: "Use the conflict to justify withholding: 'See? Not ready.'", nextScene: "s4_branch_after_handoff_C3", effect: { worldly: 1 }, feedback: "Fear interprets everything as danger." },
      { text: "Stop engaging; you’re tired of everyone.", nextScene: "s4_branch_after_handoff_C3", effect: { unity: -1 }, feedback: "Weariness becomes withdrawal." }
    ]
  },

  "s4_branch_after_handoff_C3": {
    text:
      "Your strength fails. You sense the window closing. If you die with the plates unshared, the chain breaks here. The wrestle is now simple: trust God’s order, or trust only yourself.<br><br><i>(Read Omni 1:25–26)</i>",
    backgroundAsset: "house_interior",
    castAssets: [],
    choices: [
      { text: "Hand the plates to King Benjamin and testify with your last breath.", nextScene: "s4_wom_major_small_plates_insight", effect: { faith: 1 }, feedback: "You end by choosing trust." },
      { text: "Hand them over but warn everyone you may have been wrong.", nextScene: "s4_wom_major_small_plates_insight", effect: { faith: -1 }, feedback: "Doubt blurs a sacred witness." },
      { text: "Refuse to hand them off; die 'faithful' to your own control.", nextScene: "s4_wom_major_small_plates_insight", effect: { worldly: 1 }, feedback: "Control masquerades as righteousness." }
    ]
  },

  // ==========================
  // MAJOR WoM EVENT (EDITORIAL INSIGHT / PRESERVATION)
  // ==========================

  "s4_wom_major_small_plates_insight": {
    text:
      "WORDS OF MORMON (LOOKING BACK). The Lord works through what seems small. Mormon later finds these small plates and perceives they contain 'more' or 'special purpose' than he understood. Your handoff becomes part of a long, unseen design.<br><br><i>(Read Words of Mormon 1:3–7)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Mormon"],
    choices: [
      { text: "Interpret the 'small plates' as mercy: God preserves testimony for later.", nextScene: "s4_final_amaleki", effect: { faith: 1 }, feedback: "You see God’s kindness behind history." },
      { text: "Interpret it as warning: decline proves prosperity must be guarded.", nextScene: "s4_final_amaleki", effect: { worldly: 1 }, feedback: "You end sober, not sentimental." },
      { text: "Interpret it as covenant unity: separate peoples must become one.", nextScene: "s4_final_amaleki", effect: { unity: 1 }, feedback: "You end focused on Zion-building." }
    ]
  },

  // ==========================
  // FINAL SCENE (ALL 3 CHOICES -> module_end_story_decline)
  // ==========================

  "s4_final_amaleki": {
    text:
      "YOUR FINAL RECORD. You had little space, and even less time. Yet you chose to preserve the plates, follow Mosiah, and deliver the record to King Benjamin—so a future prophet could bind fragments into one covenant story. Declining generations did not erase God’s work; they proved His patience.<br><br><i>(Read Omni 1:25–26; Words of Mormon 1:12–18)</i>",
    backgroundAsset: "wilderness",
    castAssets: [],
    choices: [
      { text: "Finish with faith: 'The Lord knows the end from the beginning.'", nextScene: "module_end_story_decline", effect: { faith: 1 }, feedback: "You choose trust over fear." },
      { text: "Finish with responsibility: 'Prosperity without Christ always erodes.'", nextScene: "module_end_story_decline", effect: { worldly: 1 }, feedback: "You choose vigilance over comfort." },
      { text: "Finish with unity: 'We must become one covenant people in Zarahemla.'", nextScene: "module_end_story_decline", effect: { unity: 1 }, feedback: "You choose Zion over factions." }
    ]
  }

});