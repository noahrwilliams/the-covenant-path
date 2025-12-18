// Character IDs: Benjamin_Citizen, King_Benjamin, Mosiah_II, Angel, Neighbor, Spouse, Child
// Background IDs: settlement, house_interior, wilderness

window.STARTING_STATS["Benjamin_Citizen"] = {
  storyId: "king_covenant",
  displayName: "Citizen",
  faith: 5, unity: 6, worldly_influence: 6, knowledge: 0,
  hasBrassPlates: false,
  initialScene: "s5_bc_intro",
  bio: "A citizen who experiences a mighty change of heart while listening to King Benjamin’s final sermon."
};

// QC Review: Scriptural Accuracy; Decision Difficulty/Balance; Branching Depth; Mathematical Integrity (F + U + K - W)

Object.assign(window.scenes, {

  // =========================
  // INTRO (3 PATHS A / B / C)
  // =========================

  "s5_bc_intro": {
    text:
      "ZARAHEMLA. Word spreads: King Benjamin will speak from a tower near the temple. Your family prepares to travel and pitch a tent with its door toward the temple, as the people have been commanded. You feel the weight of the gathering: its size, its meaning, and what obedience may require after the words are heard.<br><i>(Read Mosiah 2:1–6)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Spouse", "Child"],
    choices: [
      { text: "Go early to secure a place where you can truly hear.", nextScene: "s5_bc_pathA_hearing_1", effect: { unity: 1 }, feedback: "You prioritize presence over convenience." },
      { text: "Go mainly because everyone is going; you don’t want to stand out.", nextScene: "s5_bc_pathB_social_1", effect: { worldly: 1 }, feedback: "You choose belonging over conviction." },
      { text: "Go wary and analytical, determined to judge the message carefully.", nextScene: "s5_bc_pathC_skeptic_1", effect: { knowledge: 1, worldly: 1 }, feedback: "You pay attention—but risk keeping your heart sealed." } // Knowledge #1 of 3
    ]
  },

  // =========
  // PATH A (3) — HEARING / HUMILITY
  // =========

  "s5_bc_pathA_hearing_1": {
    text:
      "You arrive early. Families pitch tents with their doors toward the temple. The gathering is orderly and earnest, yet immense. You sense how easy it would be to let the moment become merely an event, instead of a covenant summons.<br><i>(Read Mosiah 2:5–6)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Help a neighboring family set up and share space.", nextScene: "s5_bc_pathA_hearing_2", effect: { unity: 1, worldly: 1 }, feedback: "You trade comfort for charity." },
      { text: "Guard your space aggressively; your family needs the best spot.", nextScene: "s5_bc_pathA_hearing_2", effect: { worldly: 1 }, feedback: "You choose safety and status." },
      { text: "Withdraw and avoid everyone; crowds make you resentful.", nextScene: "s5_bc_pathA_hearing_2", effect: { unity: -1 }, feedback: "Isolation grows quietly." }
    ]
  },

  "s5_bc_pathA_hearing_2": {
    text:
      "A tower is raised so the king’s words can carry. You notice the importance of listening well. Your children watch you closely, learning what it means to receive counsel from a prophet-king and to hearken with sincerity.<br><i>(Read Mosiah 2:7–9)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Child"],
    choices: [
      { text: "Tell your child: 'Listen for Christ, not for excitement.'", nextScene: "s5_bc_pathA_hearing_3", effect: { faith: 1 }, feedback: "You teach spiritual listening." },
      { text: "Tell your child: 'Pay attention so we look faithful to others.'", nextScene: "s5_bc_pathA_hearing_3", effect: { worldly: 1 }, feedback: "You teach performance." },
      { text: "Say nothing; let them learn from the crowd’s mood.", nextScene: "s5_bc_pathA_hearing_3", effect: { unity: -1 }, feedback: "Silence cedes discipleship." }
    ]
  },

  "s5_bc_pathA_hearing_3": {
    text:
      "The king begins with humility: he has not sought riches, nor caused you to be confined, and he has labored with his own hands. You feel a quiet piercing within. You have sometimes blamed leaders for burdens that were truly the fruit of your own choices.<br><i>(Read Mosiah 2:10–14)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Receive the rebuke and soften—ready to repent.", nextScene: "s5_bc_major_event_speech_core", effect: { faith: 1 }, feedback: "You choose humility." },
      { text: "Defend yourself internally: 'He doesn’t know my life.'", nextScene: "s5_bc_major_event_speech_core", effect: { worldly: 1 }, feedback: "Pride resists the Spirit." },
      { text: "Check out mentally; you don’t want to feel exposed.", nextScene: "s5_bc_major_event_speech_core", effect: { faith: -1 }, feedback: "Avoidance blocks change." }
    ]
  },

  // =========
  // PATH B (3) — SOCIAL / APPEARANCE
  // =========

  "s5_bc_pathB_social_1": {
    text:
      "You arrive with friends. The gathering has the warmth of reunion: greetings, shared preparations, and familiar faces. You can either let fellowship deepen your worship, or let fellowship replace the message entirely.<br><i>(Read Mosiah 2:1–6)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor", "Spouse"],
    choices: [
      { text: "Use the social moment to invite others to listen seriously.", nextScene: "s5_bc_pathB_social_2", effect: { unity: 1 }, feedback: "You convert community into worship." },
      { text: "Chase status: get seen near the tower and important families.", nextScene: "s5_bc_pathB_social_2", effect: { worldly: 1 }, feedback: "You trade inward faith for outward standing." },
      { text: "Avoid everyone; you resent the 'righteous crowd' vibe.", nextScene: "s5_bc_pathB_social_2", effect: { unity: -1 }, feedback: "Resentment isolates." }
    ]
  },

  "s5_bc_pathB_social_2": {
    text:
      "The king teaches: when you are in the service of your fellow beings, you are only in the service of your God. The words press on you with clarity. You have sometimes excused neglect by calling it prudence or busyness.<br><i>(Read Mosiah 2:17)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Let the discomfort teach you; decide to serve more quietly.", nextScene: "s5_bc_pathB_social_3", effect: { faith: 1 }, feedback: "You choose repentance over defensiveness." },
      { text: "Twist it into comparison: 'Others serve less than me.'", nextScene: "s5_bc_pathB_social_3", effect: { worldly: 1 }, feedback: "Pride uses good deeds as a weapon." },
      { text: "Dismiss it as idealism; real life is too hard for that.", nextScene: "s5_bc_pathB_social_3", effect: { faith: -1 }, feedback: "Cynicism blocks growth." }
    ]
  },

  "s5_bc_pathB_social_3": {
    text:
      "The king warns of the consequences of rebellion against God and of being cut off from His Spirit. Some around you shift the moment toward light talk, as though seriousness is a burden to be avoided. You feel a choice: remain attentive to the Spirit, or drift into distraction.<br><i>(Read Mosiah 2:36–38)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Quietly stop joking and turn your heart back to the message.", nextScene: "s5_bc_major_event_speech_core", effect: { faith: 1 }, feedback: "You choose reverence over belonging." },
      { text: "Lean into the joking so no one thinks you’re 'too spiritual.'", nextScene: "s5_bc_major_event_speech_core", effect: { worldly: 1 }, feedback: "You choose comfort in the crowd." },
      { text: "Snap at your friends; anger replaces humility.", nextScene: "s5_bc_major_event_speech_core", effect: { unity: -1 }, feedback: "Correcting without charity fractures unity." }
    ]
  },

  // =========
  // PATH C (3) — SKEPTIC / ANALYTICAL HEART
  // =========

  "s5_bc_pathC_skeptic_1": {
    text:
      "You listen with a guarded mind. You have seen human weakness in leadership and in yourself, and you do not want to be carried by a crowd. Yet you also sense a danger: caution can become a way to keep the heart untouched.<br><i>(Read Mosiah 2:9–11)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Choose to test the message by its call to repentance and Christ.", nextScene: "s5_bc_pathC_skeptic_2", effect: { faith: 1 }, feedback: "You judge by spiritual fruit." },
      { text: "Choose to test it by how it benefits your standing and security.", nextScene: "s5_bc_pathC_skeptic_2", effect: { worldly: 1 }, feedback: "You judge by self-interest." },
      { text: "Refuse to test at all; assume manipulation and stay closed.", nextScene: "s5_bc_pathC_skeptic_2", effect: { faith: -1 }, feedback: "Suspicion becomes a wall." }
    ]
  },

  "s5_bc_pathC_skeptic_2": {
    text:
      "An angelic message is delivered: Christ will come down, suffer temptations, pain, and death; His blood will atone. The doctrine is plain and weighty. You feel two impulses: to worship, and to remain untouched by hope until you control every question.<br><i>(Read Mosiah 3:5–11)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Angel", "Benjamin_Citizen"],
    choices: [
      { text: "Allow awe to soften you, even without perfect understanding.", nextScene: "s5_bc_pathC_skeptic_3", effect: { faith: 1 }, feedback: "You allow the Spirit room." },
      { text: "Demand immediate proof; refuse to feel anything until certain.", nextScene: "s5_bc_pathC_skeptic_3", effect: { worldly: 1 }, feedback: "Certainty becomes a gate you never open." },
      { text: "Mock the message internally to protect yourself from hope.", nextScene: "s5_bc_pathC_skeptic_3", effect: { unity: -1 }, feedback: "Contempt isolates the soul." }
    ]
  },

  "s5_bc_pathC_skeptic_3": {
    text:
      "The king teaches: the natural man is an enemy to God, and must be put off through the atonement—becoming submissive, meek, humble, patient, full of love. You recognize the target. Some of your resistance has been pride wearing the mask of discernment.<br><i>(Read Mosiah 3:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Confess inwardly: 'I have been resisting God,' and yield.", nextScene: "s5_bc_major_event_speech_core", effect: { faith: 1 }, feedback: "You choose surrender." },
      { text: "Negotiate: 'I’ll change later, when life is less complicated.'", nextScene: "s5_bc_major_event_speech_core", effect: { worldly: 1 }, feedback: "Delay protects pride." },
      { text: "Reject it: 'This is unrealistic—no one can live this way.'", nextScene: "s5_bc_major_event_speech_core", effect: { faith: -1 }, feedback: "Cynicism hardens." }
    ]
  },

  // ==========================
  // MAJOR SCRIPTURAL EVENT (COALESCE)
  // ==========================

  "s5_bc_major_event_speech_core": {
    text:
      "THE HEART-PIERCING MOMENT. The Spirit falls upon the people. You see your own nothingness, and you cry for mercy. The king teaches that belief, repentance, and humility bring a remission of sins—and that a changed heart can be wrought within you by the Spirit of the Lord.<br><i>(Read Mosiah 4:1–3, 9–12; Mosiah 5:2)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Cry for mercy openly and let pride fall away.", nextScene: "s5_bc_post_major_pathM_change_1", effect: { faith: 1 }, feedback: "You choose humility without hiding." },
      { text: "Cry for mercy silently to preserve your image.", nextScene: "s5_bc_post_major_pathS_private_1", effect: { worldly: 1 }, feedback: "You seek forgiveness without vulnerability." },
      { text: "Hold back; distrust the moment and resist yielding.", nextScene: "s5_bc_post_major_pathR_resist_1", effect: { faith: -1 }, feedback: "You refuse the Spirit’s invitation." }
    ]
  },

  // ==========================
  // POST-MAJOR BRANCH (3 subpaths, then converge)
  // ==========================

  // --- PATH M: MIGHTY CHANGE EMBRACED (3) ---
  "s5_bc_post_major_pathM_change_1": {
    text:
      "You feel something real: a change in disposition. Yet you also know that spiritual moments must become spiritual habits. The king warns to watch yourselves, and your thoughts, and your words, and your deeds.<br><i>(Read Mosiah 4:11–12, 30)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Spouse"],
    choices: [
      { text: "Commit to prayer and humility daily, even when unseen.", nextScene: "s5_bc_post_major_pathM_change_2", effect: { faith: 1 }, feedback: "You choose private discipleship." },
      { text: "Commit only publicly; private change feels optional.", nextScene: "s5_bc_post_major_pathM_change_2", effect: { worldly: 1 }, feedback: "You choose appearance over endurance." },
      { text: "Make no plan; assume the change will remain without effort.", nextScene: "s5_bc_post_major_pathM_change_2", effect: { faith: -1 }, feedback: "Neglect erodes miracles." }
    ]
  },

  "s5_bc_post_major_pathM_change_2": {
    text:
      "You hear the king’s teaching about the beggar: if you turn away the needy, you have cause to repent. You realize your new heart must be proven in ordinary decisions—money, time, patience, and attention.<br><i>(Read Mosiah 4:16–23)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Give with wisdom and compassion, trusting God to judge.", nextScene: "s5_bc_post_major_pathM_change_3", effect: { unity: 1, worldly: 1 }, feedback: "You trade surplus for love." },
      { text: "Give only if others can see; you want credit.", nextScene: "s5_bc_post_major_pathM_change_3", effect: { worldly: 1 }, feedback: "Charity becomes performance." },
      { text: "Refuse to give; you fear being taken advantage of.", nextScene: "s5_bc_post_major_pathM_change_3", effect: { unity: -1 }, feedback: "Fear shrinks compassion." }
    ]
  },

  "s5_bc_post_major_pathM_change_3": {
    text:
      "Your child asks: “Are we different now?” You can answer with slogans, or with covenant meaning. This is where the change becomes a family pattern, strengthened by teaching and example.<br><i>(Read Mosiah 4:14–15)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Child"],
    choices: [
      { text: "Teach: 'We follow Christ; we pray, serve, and repent when we fail.'", nextScene: "s5_bc_converge_covenant_name", effect: { faith: 1 }, feedback: "You translate doctrine into life." },
      { text: "Teach: 'We’re good people now—better than others.'", nextScene: "s5_bc_converge_covenant_name", effect: { worldly: 1 }, feedback: "Pride poisons the change." },
      { text: "Avoid the conversation; you don’t want responsibility.", nextScene: "s5_bc_converge_covenant_name", effect: { unity: -1 }, feedback: "Silence trains apathy." }
    ]
  },

  // --- PATH S: PRIVATE CHANGE / IMAGE-PROTECTING (3) ---
  "s5_bc_post_major_pathS_private_1": {
    text:
      "You feel the Spirit, but you keep your response hidden. You are cautious about being seen as weak, uncertain, or overly moved. Yet you sense that secrecy can starve a sincere beginning before it matures.<br><i>(Read Mosiah 4:1–3)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Risk honesty: admit need for mercy to your family.", nextScene: "s5_bc_post_major_pathS_private_2", effect: { faith: 1 }, feedback: "Truth breaks the mask." },
      { text: "Keep it hidden; manage your image carefully.", nextScene: "s5_bc_post_major_pathS_private_2", effect: { worldly: 1 }, feedback: "Image becomes your god." },
      { text: "Get irritated at others’ emotion; contempt keeps you 'strong.'", nextScene: "s5_bc_post_major_pathS_private_2", effect: { unity: -1 }, feedback: "Contempt isolates." }
    ]
  },

  "s5_bc_post_major_pathS_private_2": {
    text:
      "The king teaches that retaining a remission of sins requires continued humility, prayer, and care for those in need. You recognize that discipleship will require more than a private feeling; it will require visible fruit.<br><i>(Read Mosiah 4:11–12, 26)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Choose one costly change: serve someone you usually ignore.", nextScene: "s5_bc_post_major_pathS_private_3", effect: { unity: 1, worldly: 1 }, feedback: "Cost makes change real." },
      { text: "Choose a symbolic change only—something that looks righteous.", nextScene: "s5_bc_post_major_pathS_private_3", effect: { worldly: 1 }, feedback: "Symbol replaces substance." },
      { text: "Choose no change; tell yourself mercy means comfort.", nextScene: "s5_bc_post_major_pathS_private_3", effect: { faith: -1 }, feedback: "Cheap grace dissolves quickly." }
    ]
  },

  "s5_bc_post_major_pathS_private_3": {
    text:
      "You sense the people uniting in response. The thought of covenant feels binding, and binding feels exposing. Yet you also sense that covenant is how the Lord makes weak things become strong through Him.<br><i>(Read Mosiah 5:1–5)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Spouse"],
    choices: [
      { text: "Choose covenant anyway; let God expose and heal you.", nextScene: "s5_bc_converge_covenant_name", effect: { faith: 1 }, feedback: "You choose healing over hiding." },
      { text: "Choose covenant only if it increases your standing.", nextScene: "s5_bc_converge_covenant_name", effect: { worldly: 1 }, feedback: "You choose status over sanctification." },
      { text: "Refuse covenant; keep your commitments undefined.", nextScene: "s5_bc_converge_covenant_name", effect: { faith: -1 }, feedback: "Options become avoidance." }
    ]
  },

  // --- PATH R: RESIST / DOUBT (3) ---
  "s5_bc_post_major_pathR_resist_1": {
    text:
      "You resist yielding. You tell yourself it is wisdom, restraint, independence. Yet you notice the cost: the more you resist, the more distant you become from the hope others seem to receive.<br><i>(Read Mosiah 4:1–3)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Ask God quietly: 'If this is true, help me want it.'", nextScene: "s5_bc_post_major_pathR_resist_2", effect: { faith: 1 }, feedback: "A small crack opens." },
      { text: "Double down: decide emotion is weakness.", nextScene: "s5_bc_post_major_pathR_resist_2", effect: { worldly: 1 }, feedback: "Hardness feels safe." },
      { text: "Attack others verbally; cynicism becomes your armor.", nextScene: "s5_bc_post_major_pathR_resist_2", effect: { unity: -1 }, feedback: "Armor becomes isolation." }
    ]
  },

  "s5_bc_post_major_pathR_resist_2": {
    text:
      "You hear the doctrine again: the natural man must be put off, becoming a saint through the atonement by yielding to the Holy Spirit. You realize the conflict is not merely with words spoken from a tower; it is within your own will.<br><i>(Read Mosiah 3:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Yield a little: admit pride and ask for mercy.", nextScene: "s5_bc_post_major_pathR_resist_3", effect: { faith: 1 }, feedback: "Surrender begins small." },
      { text: "Negotiate: promise goodness later, without changing now.", nextScene: "s5_bc_post_major_pathR_resist_3", effect: { worldly: 1 }, feedback: "Delay protects ego." },
      { text: "Reject: decide you can be 'good' without Christ.", nextScene: "s5_bc_post_major_pathR_resist_3", effect: { faith: -1 }, feedback: "Self-salvation collapses under stress." }
    ]
  },

  "s5_bc_post_major_pathR_resist_3": {
    text:
      "The people speak with one voice, saying the Spirit has wrought a mighty change and they desire to enter a covenant. You feel the distance between where you are and where you could be. One choice remains: step into covenant, or remain outside it.<br><i>(Read Mosiah 5:1–5)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Step in anyway; let your heart learn obedience as you act.", nextScene: "s5_bc_converge_covenant_name", effect: { faith: 1 }, feedback: "You choose belonging in Christ." },
      { text: "Stay outside but pretend you are above it.", nextScene: "s5_bc_converge_covenant_name", effect: { worldly: 1 }, feedback: "Pride masks loneliness." },
      { text: "Leave the gathering early; you do not want to be pressed further.", nextScene: "s5_bc_converge_covenant_name", effect: { unity: -1 }, feedback: "Flight avoids healing." }
    ]
  },

  // ==========================
  // CONVERGENCE: NAME OF CHRIST / COVENANT IDENTITY
  // ==========================

  "s5_bc_converge_covenant_name": {
    text:
      "THE NAME. King Benjamin declares that because of the covenant, you will be called the children of Christ, having His name written in your hearts. He warns that the name must be retained through obedience and steadfast remembrance, or you will be found on the left hand of God.<br><i>(Read Mosiah 5:5–12)</i>",
    backgroundAsset: "settlement",
    castAssets: ["King_Benjamin", "Benjamin_Citizen"],
    choices: [
      { text: "Let the name reshape you: commit to remember and obey daily.", nextScene: "s5_bc_post_converge_branchA_home_1", effect: { faith: 1 }, feedback: "You choose covenant endurance." },
      { text: "Treat the name as a label: useful for status, not change.", nextScene: "s5_bc_post_converge_branchB_status_1", effect: { worldly: 1 }, feedback: "You choose identity without discipleship." },
      { text: "Fear the name: avoid accountability by keeping things vague.", nextScene: "s5_bc_post_converge_branchC_drift_1", effect: { unity: -1 }, feedback: "Vagueness erodes covenant." }
    ]
  },

  // ==========================
  // POST-CONVERGENCE BRANCH (at least 2) — 3 scenes each
  // ==========================

  // --- PATH A: HOME DISCIPLESHIP (3) ---
  "s5_bc_post_converge_branchA_home_1": {
    text:
      "You return to your tent. The crowd disperses, and ordinary life returns with its familiar pressures. Here the covenant is either retained or forgotten: in patience, speech, prayer, and the steady work of repentance.<br><i>(Read Mosiah 4:11–12, 30)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Spouse"],
    choices: [
      { text: "Apologize for a recent wrong and begin repairing trust.", nextScene: "s5_bc_post_converge_branchA_home_2", effect: { unity: 1, worldly: 1 }, feedback: "Humility becomes action." },
      { text: "Demand respect: 'I’m covenant-strong now—don’t question me.'", nextScene: "s5_bc_post_converge_branchA_home_2", effect: { worldly: 1 }, feedback: "Religion becomes domination." },
      { text: "Avoid conflict; ignore issues and call it 'peace.'", nextScene: "s5_bc_post_converge_branchA_home_2", effect: { unity: -1 }, feedback: "Avoidance poisons quietly." }
    ]
  },

  "s5_bc_post_converge_branchA_home_2": {
    text:
      "A neighbor’s child needs help. You remember the king’s teaching: all are beggars before God. The request is inconvenient, and you feel the pull between self-protection and covenant mercy.<br><i>(Read Mosiah 4:19–23)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Neighbor", "Child"],
    choices: [
      { text: "Help generously within wisdom—trusting God’s compassion.", nextScene: "s5_bc_post_converge_branchA_home_3", effect: { faith: 1 }, feedback: "You choose mercy over self-protection." },
      { text: "Help only a little, and make sure others notice.", nextScene: "s5_bc_post_converge_branchA_home_3", effect: { worldly: 1 }, feedback: "You choose credit over charity." },
      { text: "Refuse; you are tired and do not want to be burdened.", nextScene: "s5_bc_post_converge_branchA_home_3", effect: { unity: -1 }, feedback: "Comfort wins a small battle and loses a larger war." }
    ]
  },

  "s5_bc_post_converge_branchA_home_3": {
    text:
      "You reflect on the king’s warning to watch yourselves, your thoughts, your words, and your deeds. You realize covenant retention is not a single day of feeling; it is repeated choosing, guided by the Spirit and anchored in Christ.<br><i>(Read Mosiah 4:30)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Set a simple daily pattern: prayer, service, repentance.", nextScene: "s5_bc_final_scene", effect: { faith: 1 }, feedback: "You build endurance." },
      { text: "Set a public pattern only; private life stays unchanged.", nextScene: "s5_bc_final_scene", effect: { worldly: 1 }, feedback: "You build image, not roots." },
      { text: "Set no pattern; rely on the memory of the moment alone.", nextScene: "s5_bc_final_scene", effect: { faith: -1 }, feedback: "Emotion fades without practice." }
    ]
  },

  // --- PATH B: STATUS RELIGION (3) ---
  "s5_bc_post_converge_branchB_status_1": {
    text:
      "You treat the covenant name like a badge. You begin to measure others and yourself by standing and recognition. Yet the king’s doctrine stands against you: the natural man must be put off, and pride cannot carry Christ’s name safely.<br><i>(Read Mosiah 5:10–12; Mosiah 3:19)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Repent quickly; humility is the only safe ground.", nextScene: "s5_bc_post_converge_branchB_status_2", effect: { faith: 1 }, feedback: "You choose the Spirit over ego." },
      { text: "Double down; use status to secure influence.", nextScene: "s5_bc_post_converge_branchB_status_2", effect: { worldly: 1 }, feedback: "You choose power over purity." },
      { text: "Withdraw from those you judge; fellowship shrinks.", nextScene: "s5_bc_post_converge_branchB_status_2", effect: { unity: -1 }, feedback: "Judgment isolates." }
    ]
  },

  "s5_bc_post_converge_branchB_status_2": {
    text:
      "You hear that names are being recorded among those who enter the covenant. You can treat the record as covenant memory and responsibility, or as a tool for rank and entitlement. Your heart assigns the meaning.<br><i>(Read Mosiah 6:1–2)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Mosiah_II"],
    choices: [
      { text: "Use the record as a reminder to serve those on it.", nextScene: "s5_bc_post_converge_branchB_status_3", effect: { unity: 1, worldly: 1 }, feedback: "You turn structure into service." },
      { text: "Use the record to demand privileges and recognition.", nextScene: "s5_bc_post_converge_branchB_status_3", effect: { worldly: 1 }, feedback: "You turn covenant into entitlement." },
      { text: "Reject recording; 'lists' feel threatening to your pride.", nextScene: "s5_bc_post_converge_branchB_status_3", effect: { unity: -1 }, feedback: "Pride resists accountability." }
    ]
  },

  "s5_bc_post_converge_branchB_status_3": {
    text:
      "You confront a choice: keep using religion to rise, or let Christ lower you into a saint. Yielding is not weakness; it is the path into the Spirit’s power, and away from the natural man.<br><i>(Read Mosiah 3:19)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Yield: choose meekness, patience, and love over status.", nextScene: "s5_bc_final_scene", effect: { faith: 1 }, feedback: "You choose sanctification." },
      { text: "Keep status: keep the name, ignore the heart.", nextScene: "s5_bc_final_scene", effect: { worldly: 1 }, feedback: "You choose image." },
      { text: "Withdraw: avoid people so no one can challenge you.", nextScene: "s5_bc_final_scene", effect: { unity: -1 }, feedback: "Isolation protects ego." }
    ]
  },

  // --- PATH C: DRIFT / VAGUE COVENANT (3) ---
  "s5_bc_post_converge_branchC_drift_1": {
    text:
      "You avoid clarity. You keep covenant talk undefined so you never feel bound. Yet the king’s warning is plain: the name must be retained, and remembrance must become obedience, or the covenant dissolves into words only.<br><i>(Read Mosiah 5:10–12)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Spouse"],
    choices: [
      { text: "Choose clarity: define one real act of discipleship today.", nextScene: "s5_bc_post_converge_branchC_drift_2", effect: { faith: 1 }, feedback: "You choose commitment over ambiguity." },
      { text: "Choose comfort: keep things vague and socially acceptable.", nextScene: "s5_bc_post_converge_branchC_drift_2", effect: { worldly: 1 }, feedback: "You choose ease over covenant." },
      { text: "Choose distance: stop attending and disengage from the people.", nextScene: "s5_bc_post_converge_branchC_drift_2", effect: { unity: -1 }, feedback: "Distance becomes drift." }
    ]
  },

  "s5_bc_post_converge_branchC_drift_2": {
    text:
      "A beggar appears near your tent. You remember: all are beggars before God. This moment is small, but it reveals what you will do when no tower stands above you and no crowd watches you.<br><i>(Read Mosiah 4:19–23)</i>",
    backgroundAsset: "settlement",
    castAssets: ["Benjamin_Citizen", "Neighbor"],
    choices: [
      { text: "Give something meaningful and speak kindly.", nextScene: "s5_bc_post_converge_branchC_drift_3", effect: { unity: 1, worldly: 1 }, feedback: "You trade comfort for mercy." },
      { text: "Give nothing but offer a spiritual excuse.", nextScene: "s5_bc_post_converge_branchC_drift_3", effect: { worldly: 1 }, feedback: "Excuses mimic righteousness." },
      { text: "Refuse and blame them; hardness grows easy.", nextScene: "s5_bc_post_converge_branchC_drift_3", effect: { unity: -1 }, feedback: "Hardness becomes habit." }
    ]
  },

  "s5_bc_post_converge_branchC_drift_3": {
    text:
      "You sense a final invitation: the covenant name can be written in your heart, or kept only on your lips. You decide whether to retain a remission of sins through humility and service, or let the moment fade into memory without change.<br><i>(Read Mosiah 4:11–12, 26; Mosiah 5:12)</i>",
    backgroundAsset: "wilderness",
    castAssets: ["Benjamin_Citizen"],
    choices: [
      { text: "Choose practice: humility, prayer, and consistent service.", nextScene: "s5_bc_final_scene", effect: { faith: 1 }, feedback: "You choose endurance." },
      { text: "Choose appearance: keep the name as a label.", nextScene: "s5_bc_final_scene", effect: { worldly: 1 }, feedback: "You choose comfort." },
      { text: "Choose withdrawal: stop trying and stop belonging.", nextScene: "s5_bc_final_scene", effect: { unity: -1 }, feedback: "You choose isolation." }
    ]
  },

  // ==========================
  // FINAL SCENE (ALL 3 CHOICES -> module_end_story_king_covenant)
  // ==========================

  "s5_bc_final_scene": {
    text:
      "THE AFTERMATH. The king’s words remain with you as ordinary life continues. You now understand the real test: retain the name of Christ written in your heart, and prove it by humility, repentance, and charity. The mighty change was real, but it must be chosen again tomorrow.<br><i>(Read Mosiah 5:12–15; Mosiah 4:30)</i>",
    backgroundAsset: "house_interior",
    castAssets: ["Benjamin_Citizen", "Spouse", "Child"],
    choices: [
      { text: "End with faith: choose Christ daily, even when unseen.", nextScene: "module_end_story_king_covenant", effect: { faith: 1 }, feedback: "You choose covenant endurance." },
      { text: "End with comfort: keep the label, protect your image.", nextScene: "module_end_story_king_covenant", effect: { worldly: 1 }, feedback: "You choose ease over depth." },
      { text: "End with unity: serve neighbors and become one covenant people.", nextScene: "module_end_story_king_covenant", effect: { unity: 1 }, feedback: "You choose Zion-building." }
    ]
  }

});