// NEPHI STARTING STATS
window.STARTING_STATS["Nephi"] = { 
    faith: 10, unity: 10, worldly_influence: 0, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_nephi" 
};

// NEPHI SCENES
Object.assign(window.scenes, {
    "intro_nephi": {
        text: "JERUSALEM, 600 BC. The streets are crowded. You see your father, Lehi, shouting to the people. Laman and Lemuel look embarrassed and angry.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi", "Laman", "Lemuel"],
        choices: [
            {
                text: "Approach your father and stand by his side.",
                nextScene: "stand_by_father_nephi",
                effect: { faith: 1, unity: -2, worldly: -3 },
                feedback: "You stand with Lehi. The crowd mocks you, but your conscience is clear. (See 1 Nephi 1:18-20)"
            },
            {
                text: "Pull Laman and Lemuel aside to calm them down.",
                nextScene: "calm_brothers_nephi",
                effect: { faith: -1, unity: 3, worldly: 2 },
                feedback: "You speak softly to your brothers to avoid a scene. They calm down, but the fear of man lingers. (See 1 Nephi 2:11)"
            },
            {
                text: "Go home and pray for understanding.",
                nextScene: "secret_prayer_nephi",
                effect: { faith: 4, unity: -1, worldly: -4 },
                covenantUnlock: "Prayer to Seek Guidance",
                feedback: "You slip away to the house. In the quiet of your room, you kneel to ask the Lord. (See 1 Nephi 2:16)"
            }
        ]
    },
    "stand_by_father_nephi": {
        text: "Lehi says, 'We must leave Jerusalem.' He asks you to help him pack provisions, but you had plans to meet friends.",
        backgroundAsset: "jerusalem_street",
        castAssets: ["Lehi"],
        choices: [
            {
                text: "Obey immediately without question.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 2, unity: 1, worldly: -3 },
                feedback: "Your obedience strengthens your character and distance from the world. (See 1 Nephi 2:3)"
            },
            {
                text: "Ask him to explain the vision first.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 3, unity: 0, worldly: -1 },
                feedback: "Lehi explains the destruction. Your understanding deepens before you obey. (See 1 Nephi 1:13)"
            }
        ]
    },
    "calm_brothers_nephi": {
        text: "Laman scoffs. 'He will lose us our inheritance!' Lehi returns home and announces you must all leave.",
        backgroundAsset: "jerusalem_night",
        castAssets: ["Laman", "Lemuel"],
        choices: [
            {
                text: "Defend your father against Laman's insults.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 1, unity: -3, worldly: 0 },
                feedback: "You speak up for truth, but it starts a tense argument. (See 1 Nephi 2:12)"
            },
            {
                text: "Stay silent and gather your things.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 0, unity: 0, worldly: 2 },
                feedback: "You keep the peace, but the world's influence gains a small hold on you."
            }
        ]
    },
    "secret_prayer_nephi": {
        text: "You are alone in your room. You desire to know if your father's words are true. You do not want to be hardened.",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            {
                text: "Pour out your soul to God (Seeking Confirmation).",
                nextScene: "vision_confirmation_nephi",
                effect: { faith: 3, unity: -1, worldly: -4 },
                covenantUnlock: "Spiritual Confirmation",
                feedback: "A sensation of pure light fills the room. Your heart is softened. (See 1 Nephi 2:16)"
            },
            {
                text: "Simply ask for patience and ease of mind.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 1, unity: 0, worldly: -2 },
                feedback: "You feel a quiet calm, enough to follow your father, though you lack perfect knowledge."
            }
        ]
    },
    "vision_confirmation_nephi": {
        text: "<b>The Spirit of the Lord visits you.</b> You know, with absolute certainty, that Lehi is a prophet and the Lord will lead you to a land of promise.",
        backgroundAsset: "vision_room",
        castAssets: [],
        choices: [
            {
                text: "Return to your brothers and bear a powerful testimony.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 3, unity: -1, worldly: -4 },
                covenantUnlock: "Faith",
                feedback: "You bear a powerful testimony. Laman scoffs, but Sam looks interested. (See 1 Nephi 2:17)"
            }
        ]
    }
});