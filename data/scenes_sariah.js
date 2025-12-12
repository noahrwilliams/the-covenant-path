// SARIAH STARTING STATS
window.STARTING_STATS["Sariah"] = { 
    faith: 8, unity: 12, worldly_influence: 2, knowledge: 0, 
    hasBrassPlates: false, initialScene: "intro_sariah" 
};

// SARIAH SCENES
Object.assign(window.scenes, {
    "intro_sariah": {
        text: "JERUSALEM, 600 BC. As Lehi shouts to the crowd, you manage the household. Your older sons are furious; Lehi's words mean losing everything. You must keep the peace.",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lemuel", "Lehi"],
        choices: [
            {
                text: "Go immediately to Lehi to express deep concern over the loss of wealth.",
                nextScene: "complain_sariah",
                effect: { faith: -1, unity: -1, worldly: 3 },
                feedback: "Lehi is saddened by your lack of faith, but understands your worry for your family. (See 1 Nephi 5:2)"
            },
            {
                text: "Settle Laman and Lemuel by promising a swift return to retrieve property.",
                nextScene: "calm_sons_sariah",
                effect: { faith: -2, unity: 4, worldly: 3 },
                feedback: "You calm your sons with a promise you hope to keep. Unity is strong, but your faith is shaken."
            },
            {
                text: "Kneel to pray for strength to support Lehi's words.",
                nextScene: "faith_sariah",
                effect: { faith: 2, unity: -1, worldly: -3 },
                covenantUnlock: "Prayer to Seek Guidance",
                feedback: "You receive a measure of spiritual resolve to trust your husband. (See 1 Nephi 5:8)"
            }
        ]
    },
    "complain_sariah": {
        text: "You demand to know how Lehi will support your children. Lehi explains the vision again, firmly. He needs you to lead the packing.",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi"],
        choices: [
            {
                text: "Obey immediately, hiding your fears for the sake of your husband.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 1, unity: 1, worldly: -2 },
                feedback: "Your obedience helps Lehi, and your faith increases slightly."
            },
            {
                text: "Continue to mourn the loss of wealth and pack slowly.",
                nextScene: "leaving_jerusalem",
                effect: { faith: -1, unity: -1, worldly: 3 },
                feedback: "The air is tense. Your actions reinforce Laman's fears."
            }
        ]
    },
    "calm_sons_sariah": {
        text: "Lehi returns. He needs you to manage the younger children and quickly prepare for the journey.",
        backgroundAsset: "house_interior",
        castAssets: ["Lehi", "Sam"],
        choices: [
            {
                text: "Quickly pack all essential comforts, prioritizing ease of travel.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 0, unity: 2, worldly: 2 },
                feedback: "The quick packing keeps the peace, but you're too focused on worldly comfort."
            },
            {
                text: "Ask Lehi for a special blessing for strength before packing anything.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 2, unity: 0, worldly: -1 },
                feedback: "Lehi gives a blessing. You feel a strength beyond your own."
            }
        ]
    },
    "faith_sariah": {
        text: "After praying, you feel a surge of resolve. You know Lehi's words are true. You must now face your sons and husband.",
        backgroundAsset: "house_interior",
        castAssets: ["Laman", "Lehi"],
        choices: [
            {
                text: "Go to Lehi and offer your full, spoken support to his vision.",
                nextScene: "leaving_jerusalem",
                effect: { faith: 3, unity: 1, worldly: -3 },
                covenantUnlock: "Faith", 
                feedback: "Your words lift Lehi's spirits. You declare that the Lord has commanded him. (See 1 Nephi 5:8)"
            }
        ]
    },
    "leaving_jerusalem": {
        text: "The family is gathered at the city gates. The sun is setting. Before you lies the vast, empty desert. This is the point of no return.<br><br><b>End of Prototype Module.</b>",
        backgroundAsset: "desert_gates",
        castAssets: ["Lehi", "Sariah", "Sam", "Laman", "Lemuel"],
        choices: [
            {
                text: "Restart Game",
                nextScene: "start_screen_transition", 
                effect: { faith: 0, unity: 0, worldly: 0, knowledge: 0 },
                feedback: "Resetting..."
            }
        ]
    }
});