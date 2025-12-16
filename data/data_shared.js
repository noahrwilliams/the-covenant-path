// GLOBAL CONTAINERS
window.scenes = {}; 
window.STARTING_STATS = {};

// GAME CONSTANTS
window.MAX_STAT = 20;
window.COVENANT_STEPS = ["Knowledge", "Prayer to Seek Guidance", "Spiritual Confirmation", "Faith", "Repentance", "Baptism", "Gift of the Holy Ghost"];

// QUIZ CONSTANTS
window.QUIZ_CONSTANTS = {
    TOTAL_QUESTIONS: 5,
    BASE_FAITH: 0.5,
    KNOWLEDGE_PER_CORRECT: 0.5,
    COSTS: {
        worldly: 0.1,
        unity: 0.2
    }
};

// STORY DEFINITIONS
window.STORIES = [
    {
        id: "exodus",
        title: "The Lehite Exodus",
        ref: "1 Nephi 1 – 18",
        narrative: "A family is commanded to flee their doomed city and retrieve sacred records, testing their obedience against fear and logic.",
        characters: [] 
    },
    {
        id: "division",
        title: "The Great Division",
        ref: "1 Nephi 19 – 2 Nephi 5",
        narrative: "Upon arriving in the new land, the family fractures into two nations, forcing believers to choose between tradition and revelation.",
        characters: []
    },
    { id: "vineyard", title: "The Vineyard", ref: "2 Nephi 6 – Jacob 7", narrative: "Jacob uses the scriptures to combat the rising wealth, pride, and the anti-christ Sherem.", characters: [] },
    { id: "decline", title: "The Declining Generations", ref: "Enos – Words of Mormon", narrative: "Solitary prophets struggle to preserve the records and eventually lead the righteous to Zarahemla.", characters: [] },
    { id: "king_covenant", title: "The King’s Covenant", ref: "Mosiah 1–6", narrative: "King Benjamin gathers his people to account for his stewardship and invites them to take upon themselves the name of Christ.", characters: [] },
    { id: "zeniff", title: "The Record of Zeniff", ref: "Mosiah 7–17", narrative: "An over-zealous group returns to the land of Nephi and falls into bondage, while Abinadi confronts King Noah.", characters: [] },
    { id: "escape", title: "The Great Escape", ref: "Mosiah 18–24", narrative: "Two groups of believers—Alma’s converts and Limhi’s people—must rely on the Lord to deliver them from separate bondages.", characters: [] },
    { id: "conversion", title: "The Conversion", ref: "Mosiah 25 – Alma 3", narrative: "The church faces persecution from the rising generation, culminating in the miraculous conversion of Alma.", characters: [] },
    { id: "high_priest", title: "The High Priest", ref: "Alma 4–16", narrative: "Alma resigns the judgment seat to preach pure testimony against pride, facing the ultimate rejection in Ammonihah.", characters: [] },
    { id: "lamanite_mission", title: "The Lamanite Mission", ref: "Alma 17–27", narrative: "The Sons of Mosiah risk death to preach to their enemies, resulting in the conversion of the Anti-Nephi-Lehis.", characters: [] },
    { id: "word_power", title: "The Power of the Word", ref: "Alma 28–35", narrative: "Alma battles the philosophy of Korihor and leads a mission to the Zoramites to teach worship of the heart.", characters: [] },
    { id: "liberty", title: "The Title of Liberty", ref: "Alma 36–52", narrative: "Captain Moroni rallies the free men against the treachery of Amalickiah, fighting for their religion, freedom, and families.", characters: [] },
    { id: "stripling", title: "The Stripling Warriors", ref: "Alma 53–63", narrative: "While the government crumbles, 2,000 young warriors turn the tide of war through exact obedience and faith.", characters: [] },
    { id: "secret_combo", title: "The Secret Combination", ref: "Helaman 1–12", narrative: "The Gadianton robbers take over the government, and Nephi invokes a famine to humble the people.", characters: [] },
    { id: "prophecy", title: "The Prophecy", ref: "Helaman 13 – 3 Nephi 7", narrative: "Samuel the Lamanite prophesies from the wall, dividing the people into believers and murderers as the sign approaches.", characters: [] },
    { id: "darkness", title: "The Night of Darkness", ref: "3 Nephi 8–10", narrative: "The prophesied destruction hits, leaving the survivors broken and ready for the Light.", characters: [] },
    { id: "visitation", title: "The Visitation", ref: "3 Nephi 11–26", narrative: "The Resurrected Lord descends to minister one-by-one, establishing His church and healing the people.", characters: [] },
    { id: "zion", title: "The Zion Society", ref: "3 Nephi 27 – 4 Nephi", narrative: "Generations live in perfect peace and consecration, until pride and class distinctions slowly fracture the utopia.", characters: [] },
    { id: "jared", title: "The Brother of Jared", ref: "Ether 1–15", narrative: "The Jaredites flee the Tower of Babel, cross the ocean in barges, and eventually destroy themselves.", characters: [] },
    { id: "last_man", title: "The Last Man", ref: "Mormon 1 – Moroni 10", narrative: "Mormon leads a fallen people who have lost the Spirit, and Moroni wanders alone to seal up the record.", characters: [] }
];

// ASSETS
window.ASSETS = {
    characters: {
        "Nephi": "https://placehold.co/140x180/5d737e/FFF?text=Nephi",
        "Nephi_S2": "https://placehold.co/140x180/5d737e/FFF?text=Nephi",
        "Sariah": "https://placehold.co/140x180/8c7e5d/FFF?text=Sariah",
        "WifeOfNephi": "https://placehold.co/140x180/8c7e5d/FFF?text=Wife+of+Nephi",
        "Zoram": "https://placehold.co/140x180/5d737e/FFF?text=Zoram",
        "Lehi": "https://placehold.co/100x100/6d5e41/FFF?text=Lehi",
        "Laman": "https://placehold.co/100x100/963838/FFF?text=Laman",
        "Lemuel": "https://placehold.co/100x100/9e6b38/FFF?text=Lemuel",
        "Sam": "https://placehold.co/100x100/5d737e/FFF?text=Sam",
        "Jacob": "https://placehold.co/140x180/5d737e/FFF?text=Jacob",
        "Sherem": "https://placehold.co/100x100/963838/FFF?text=Sherem"
    },
    backgrounds: {
        "jerusalem_street": "https://placehold.co/750x300/d4c5a9/333?text=Jerusalem+Streets",
        "jerusalem_night": "https://placehold.co/750x300/2c3e50/FFF?text=Jerusalem+Night",
        "house_interior": "https://placehold.co/750x300/5e4b35/FFF?text=House+Interior",
        "desert_gates": "https://placehold.co/750x300/c0392b/FFF?text=City+Gates",
        "wilderness": "https://placehold.co/750x300/8e44ad/FFF?text=Wilderness+Valley",
        "laban_house": "https://placehold.co/750x300/2c3e50/FFF?text=Jerusalem+Night+(Laban)",
        "ship_deck": "https://placehold.co/750x300/2980b9/FFF?text=The+Ship+Deck",
        "promised_land": "https://placehold.co/750x300/27ae60/FFF?text=The+Promised+Land",
        "settlement": "https://placehold.co/750x300/d4c5a9/333?text=Settlement",
        "vision_room": "https://placehold.co/750x300/5e4b35/FFF?text=Vision+of+Light",
        "temple_interior": "https://placehold.co/750x300/2980b9/FFF?text=Temple+Interior"
    }
};






// QUIZ SYSTEM CONSTANTS

window.QUIZ_CONSTANTS = {
    TOTAL_QUESTIONS: 5,
    BASE_FAITH: 0.25,
    KNOWLEDGE_PER_CORRECT: 0.5,
    COSTS: { worldly: 1.0, unity: -0.5 }
};

// QUIZ QUESTION BANK (Test Data)
window.QUIZ_QUESTIONS = [

    { id: "1", storyId: "vineyard", question: "Into what language did King Mosiah translate the plates of Ether?", correctAnswer: "The Nephite language.", incorrectAnswersPool: ["The Adamic language.", "The language of Nephi.", "The language of Ether.", "The language of the Lamanites.", "The pure language." ], }, 
    { id: "2", storyId: "vineyard", question: "Gid and Teomner were military leaders in what army?", correctAnswer: "The Nephite army.", incorrectAnswersPool: ["The Lamanite army.", "The army of the king-men.", "The army of Morianton.", "The army of the Zoramites.", "The army of Ammoron." ], }, 
    { id: "3", storyId: "vineyard", question: "Tubaloth served as king over what group of people?", correctAnswer: "The Lamanites.", incorrectAnswersPool: ["The Nephites.", "The people of Ammon.", "The city of Cumeni.", "The Zoramites.", "The Ammonihahites." ], }, 
    { id: "4", storyId: "vineyard", question: "Who disguised himself, learned the secret signs of Kishkumen, and was able to slay Kishkumen?", correctAnswer: "A servant of Helaman.", incorrectAnswersPool: ["A servant of Moroni.", "The prophet Nephi.", "A soldier of Pahoran.", "The chief judge Pacumeni.", "The king-man Pachus." ], }, 
    { id: "5", storyId: "vineyard", question: "For what reason does Moroni write a condemning letter to Pahoran?", correctAnswer: "For sending insufficient supplies and aid to the Nephite army.", incorrectAnswersPool: ["For their apostasy and pride.", "For refusing to take up arms against the Lamanites.", "For fleeing from the city of Cumeni.", "For not sending enough spies to the Lamanite camps.", "For seeking to depose the chief judge." ], }, 
    { id: "6", storyId: "vineyard", question: "Why had Pahoran not been able to send aid to Moroni’s armies?", correctAnswer: "A group of king-men had overtaken his judgment seat.", incorrectAnswersPool: ["Because he was waiting for the word of the Lord.", "Because he was leading an army against the Zoramites.", "Because he had gathered all the city's supplies for himself.", "Because he was trapped in the city of Cumeni.", "Because the Nephites were already victorious." ], }, 
    { id: "7", storyId: "exodus", question: "With whom did the king-men form an alliance?", correctAnswer: "The Lamanites.", incorrectAnswersPool: ["The Zoramites.", "The Amlicites.", "The Gideonites.", "The Ammoronites.", "The Nehorites." ], }, 
    { id: "8", storyId: "exodus", question: "Who was Pachus?", correctAnswer: "The man appointed king by the king-men in Zarahemla.", incorrectAnswersPool: ["The chief captain of the Lamanites.", "The leader of the Gadianton robbers.", "The chief judge before Pahoran.", "A prophet among the Zoramites.", "A military leader of Moroni." ], }, 
    { id: "9", storyId: "exodus", question: "Who revealed the secret oaths, signs, and words to Gadianton?", correctAnswer: "Satan.", incorrectAnswersPool: ["Kishkumen.", "Ammoron.", "Laman.", "Zoram.", "Alma." ], }, 
    { id: "10", storyId: "exodus", question: "Gadianton became the leader of whose band?", correctAnswer: "Kishkumen’s band.", incorrectAnswersPool: ["The band of Laman.", "The band of Zoram.", "The band of Amalickiah.", "The band of Gid.", "The band of Morianton." ], }, 
    { id: "11", storyId: "exodus", question: "Who organized a band of people who covenanted to tell no one of his guilt as a murderer?", correctAnswer: "Kishkumen.", incorrectAnswersPool: ["Paanchi.", "Gadianton.", "Morianton.", "Teancum.", "Ammoron." ], }, 
    { id: "12", storyId: "exodus", question: "In the 46th year of the judges, the people who migrated morthward became expert in working with what material?", correctAnswer: "Cement.", incorrectAnswersPool: ["Copper.", "Gold.", "Iron ore.", "Bronze.", "Silver." ], }, 
    { id: "13", storyId: "exodus", question: "Helaman’s sons, Nephi and Lehi, were cast into the same prison that other missionaries had been thrown into. Who were the other missionaries?", correctAnswer: "Ammon and his brethren.", incorrectAnswersPool: ["Alma and Amulek.", "Nephi and Lehi.", "Mosiah and Aaron.", "Helaman and Shiblon.", "Aaron and Muloki." ], }, 
    { id: "14", storyId: "division", question: "In what land were Helaman’s sons, Nephi and Lehi, cast into prison?", correctAnswer: "The land of Lehi-Nephi.", incorrectAnswersPool: ["The land of Zarahemla.", "The land of Bountiful.", "The city of Gideon.", "The land of Manti.", "The land of Jershon." ], }, 
    { id: "15", storyId: "division", question: "Who were the only people to whom Alma, Amulek, and Zeezrom went together as missionaries?", correctAnswer: "The Zoramites.", incorrectAnswersPool: ["The Amlicites.", "The Gideonites.", "The Lamanites.", "The Ammoronites.", "The Amulonites." ], }, 
    { id: "16", storyId: "division", question: "Aminidab saw Helaman’s sons, Nephi and Lehi, conversing with what or whom?", correctAnswer: "Angels of God.", incorrectAnswersPool: ["The Spirit of God.", "Their father Helaman.", "The Queen Lamoni.", "Alma the Younger.", "The Brother of Jared." ], }, 
    { id: "17", storyId: "division", question: "How did Helaman’s army capture the city of Cumeni?", correctAnswer: "By cutting off supplies to the people until they surrendered.", incorrectAnswersPool: ["By tricking the city guards to surrender.", "By a massive frontal assault by the army of Moroni.", "By using a secret tunnel under the city wall.", "By the people of Cumeni rebelling against the Lamanites.", "By a fierce night attack by Teancum’s army." ], }, 
    { id: "18", storyId: "division", question: "While defending the city of Cumeni, how many of Helaman’s 2,060 stripling warriors were wounded?", correctAnswer: "All of them.", incorrectAnswersPool: ["None of them.", "187 of them.", "All but 50 of them.", "1,000 of them.", "Only 40 of them." ], }, 
    { id: "19", storyId: "division", question: "Lamanites who covenanted not to take up their weapons against the Nephites were sent to live with what people?", correctAnswer: "The people of Ammon.", incorrectAnswersPool: ["The people of Limhi.", "The people of Anti-Nephi-Lehi.", "The people of Manti.", "The people of Zarahemla.", "The people of Shilom." ], }, 
    { id: "20", storyId: "division", question: "Who killed Ammoron?", correctAnswer: "Teancum.", 
        incorrectAnswersPool: ["Pahoran.", "Moroni.", "Zerahemnah.", "Amulek.", "Gadianton." ], }
    
];

