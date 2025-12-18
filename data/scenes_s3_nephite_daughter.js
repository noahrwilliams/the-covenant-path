// NEPHITE DAUGHTER DATA - STORY 3: THE VINEYARD
window.STARTING_STATS["Nephite_Daughter"] = { 
    displayName: "Nephite Daughter",
    storyId: "vineyard",
    faith: 10, unity: 8, worldly_influence: 2, knowledge: 4, 
    hasBrassPlates: true, initialScene: "s3_nd_intro",
    bio: "A 'tender and chaste' daughter of the Nephites in the land of Zarahemla. You seek to remain 'pure in heart' despite the growing pride and social divisions surrounding your family."
};

Object.assign(window.scenes, {

    // --- SCENE 1: THE TEMPLE GATHERING ---
    "s3_nd_intro": {
        text: "You stand in the outer courts of the temple. The air is heavy. Jacob, your priest, has come to speak, but he looks weighed down by anxiety. Around you, you see men wearing costly apparel, looking with disdain at those less wealthy.<br><i>(Read Jacob 2:7)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Jacob"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Focus your heart entirely on the upcoming sermon to find spiritual peace.", nextScene: "s3_nd_costly_apparel", effect: { faith: 1, unity: -1 }, feedback: "You find personal peace, but feel the distance from your neighbors growing." },
            { text: "Try to comfort your mother, whose heart is broken by your father's new distance.", nextScene: "s3_nd_costly_apparel", effect: { unity: 2, worldly: 1 }, feedback: "You strengthen the family bond, but the worldly pressure remains." },
            { text: "Seek out a friend from the poorer class to sit together in solidarity.", nextScene: "s3_nd_costly_apparel", effect: { unity: 1, faith: 0 }, feedback: "You act against the class division of the day." }
        ]
    },

    // --- SCENE 2: THE PRIDE OF WEALTH ---
    "s3_nd_costly_apparel": {
        text: "Your brother has returned with gold and silver. He insists that you wear a fine, embroidered silk veil to the next gathering, so that the family 'looks their station.' You know many in the city are hungry.<br><i>(Read Jacob 2:17-19)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Refuse the silk, choosing to dress plainly as a witness against pride.", nextScene: "s3_nd_the_warning", effect: { faith: 2, worldly: -2 }, feedback: "Your brother is offended, but your spirit is light." },
            { text: "Accept the veil to keep peace in the home, but secretly give of your own food to the poor.", nextScene: "s3_nd_the_warning", effect: { unity: 1, worldly: 1 }, feedback: "You manage the social tension while following your conscience." },
            { text: "Ask your brother to explain how he gained this wealth, seeking to understand the economy.", nextScene: "s3_nd_the_warning", effect: { knowledge: 1, worldly: 1 }, feedback: "You learn of the trade routes, though the greed troubles you." }
        ]
    },

    // --- SCENE 3: JACOB'S REBUKE ---

    // ****************
    // ****************
    // *** Add additional CRISIS "choice" impacts appx F-1, U-3
    // ****************
    // ****************

    "s3_nd_the_warning": {
        text: "Jacob stands at the temple and speaks words that pierce your soul. He condemns the men for their 'grosser crimes' of taking many wives and concubines, breaking the hearts of their chaste wives.<br><i>(Read Jacob 2:24-35)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Jacob"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Weep openly for the suffering of the women, as Jacob describes it.", nextScene: "s3_nd_family_conflict", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "Your empathy is a strength, but your grief is heavy." },
            { text: "Look toward your father and brothers with a firm look of warning.", nextScene: "s3_nd_family_conflict", effect: { faith: 1, worldly: 0 }, feedback: "You take a stand for the law of chastity." },
            { text: "Study the words of the ancient prophets regarding the House of Israel to find hope.", nextScene: "s3_nd_family_conflict", effect: { knowledge: 1, faith: 0 }, feedback: "The scriptures offer a broader perspective on God's covenants." }
        ]
    },

    // --- SCENE 4: DOMESTIC STRIFE ---
    "s3_nd_family_conflict": {
        text: "At home, the men are angry at Jacob's words. They argue that they are only following the examples of old. Your mother is silent, her eyes downcast.<br><i>(Read Jacob 3:1)</i>",
        backgroundAsset: "house_interior",
        castAssets: [],
        choices: [
            { text: "Stand by your mother and testify of the joy of a single, faithful marriage.", nextScene: "s3_nd_the_olive_tree", effect: { faith: 2, unity: -1 }, feedback: "Your father is silent, and your mother feels seen." },
            { text: "Attempt to mediate the argument to prevent the family from fracturing.", nextScene: "s3_nd_the_olive_tree", effect: { unity: 2, worldly: 1 }, feedback: "You prevent an immediate split, but the spiritual rot remains." },
            { text: "Go to your private place to pray for the 'pure in heart' as Jacob commanded.", nextScene: "s3_nd_the_olive_tree", effect: { faith: 1, worldly: 0 }, feedback: "You look to God for the comfort the world cannot give." }
        ]
    },

    // --- SCENE 5: THE ALLEGORY OF THE VINEYARD ---
    "s3_nd_the_olive_tree": {
        text: "Jacob shares a profound allegory of an Olive Tree. He speaks of the Lord of the Vineyard's labor to save his trees. It is complex, but it speaks of the gathering of Israel.<br><i>(Read Jacob 5:71-72)</i>",
        backgroundAsset: "vision_room",
        castAssets: ["Jacob"],
        choices: [
            { text: "Contemplate your role as a 'servant' in this last time of pruning.", nextScene: "s3_nd_social_pressure", effect: { faith: 1, unity: 0 }, feedback: "You feel a sense of purpose in God's great work." },
            { text: "Dedicate yourself to memorizing the symbols of the allegory for future generations.", nextScene: "s3_nd_social_pressure", effect: { knowledge: 1, worldly: 0 }, feedback: "You preserve the doctrine in your heart." },
            { text: "Share the hope of the 'natural fruit' with the discouraged women of the city.", nextScene: "s3_nd_social_pressure", effect: { unity: 2, worldly: 1 }, feedback: "Your hope becomes contagious among the faithful." }
        ]
    },

    // --- SCENE 6: THE RISE OF SHEREM ---

    // ****************
    // ****************
    // *** Add additional CRISIS "choice" impacts appx F-3, U-1, W+2
    // ****************
    // ****************

    "s3_nd_social_pressure": {
        text: "A man named Sherem has arrived. He is learned and has a perfect knowledge of the language. He is telling the people that there is no such thing as a Christ, and many are listening.<br><i>(Read Jacob 7:1-4)</i>",
        backgroundAsset: "jerusalem_street",
        castAssets: [],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Avoid the marketplace where he speaks to keep your mind pure.", nextScene: "s3_nd_the_confrontation", effect: { faith: 1, worldly: -1, unity: 1 }, feedback: "You protect your peace, though you feel isolated." },
            { text: "Listen from a distance to understand his arguments so you can defend your faith.", nextScene: "s3_nd_the_confrontation", effect: { faith: -1, worldly: 0 }, feedback: "His words are clever and disturbing." },
            { text: "Fast for Jacob, knowing that Sherem intends to challenge him.", nextScene: "s3_nd_the_confrontation", effect: { faith: 2, unity: 1, worldly: 2 }, feedback: "You seek spiritual power for the Prophet." }
        ]
    },

    // --- SCENE 7: THE PUBLIC CHALLENGE ---
    "s3_nd_the_confrontation": {
        text: "Sherem confronts Jacob in public. He accuses Jacob of perverting the Law of Moses into a worship of a 'future' being. The crowd is rapt.<br><i>(Read Jacob 7:6-7)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Jacob"],
        choices: [
            { text: "Stand close to Jacob, showing the people that the 'pure in heart' remain faithful.", nextScene: "s3_nd_the_sign", effect: { faith: 1, unity: 1, worldly: 1 }, feedback: "Your presence is a quiet testimony." },
            { text: "Bear your own silent testimony of the scriptures you have read.", nextScene: "s3_nd_the_sign", effect: { faith: 1, worldly: 0 }, feedback: "The Spirit confirms the truth to you amidst the noise." },
            { text: "Watch the faces of the people, mourning for how easily they are led away.", nextScene: "s3_nd_the_sign", effect: { unity: -1, faith: 0 }, feedback: "You feel the 'sorrow of the world' for their unbelief." }
        ]
    },

    // --- SCENE 8: THE DEMAND FOR A SIGN ---
    "s3_nd_the_sign": {
        text: "Sherem demands a sign to prove the truth of Jacob's words. Jacob refuses to tempt God, but says 'if God shall smite thee, let that be a sign.' Suddenly, Sherem falls to the earth.<br><i>(Read Jacob 7:13-15)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Jacob"],
        onEnter: { faith: 0, unity: 0, worldly: 0 },
        choices: [
            { text: "Fall to your knees in gratitude for God's protection of His prophet.", nextScene: "s3_nd_sherems_confession", effect: { faith: 2, worldly: -1 }, feedback: "You acknowledge the hand of the Lord." },
            { text: "Rush to help the people who are overcome with fear and trembling.", nextScene: "s3_nd_sherems_confession", effect: { unity: 2, worldly: 1 }, feedback: "You provide a steady hand in a time of chaos." },
            { text: "Witness the event with solemnity, engraving the memory in your mind.", nextScene: "s3_nd_sherems_confession", effect: { faith: 1, worldly: 0 }, feedback: "You will never forget the power of God shown today." }
        ]
    },

    // --- SCENE 9: THE LAST CONFESSION ---
    "s3_nd_sherems_confession": {
        text: "Days later, Sherem calls the people together. He is near death. He confesses that he was deceived by the devil and that he lied to God. He speaks of the Christ.<br><i>(Read Jacob 7:17-19)</i>",
        backgroundAsset: "settlement",
        castAssets: [],
        choices: [
            { text: "Offer a prayer of forgiveness for the man who tried to destroy your faith.", nextScene: "s3_nd_peace_restored", effect: { faith: 2, unity: 1, worldly: 2 }, feedback: "Charity is the greatest of all virtues." },
            { text: "Listen carefully to his confession, ensuring you understand the nature of deception.", nextScene: "s3_nd_peace_restored", effect: { faith: 1, worldly: 0 }, feedback: "You are better prepared for future trials." },
            { text: "Comfort the friends of Sherem who are now left in confusion.", nextScene: "s3_nd_peace_restored", effect: { unity: 2, worldly: 1 }, feedback: "You help heal the wounds of the community." }
        ]
    },

    // --- SCENE 10: THE MANNER OF HAPPINESS ---
    "s3_nd_peace_restored": {
        text: "Peace is restored to the Nephites. The people search the scriptures and no longer listen to the wicked Sherem. Jacob prepares to hand the plates to his son Enos.<br><i>(Read Jacob 7:23-27)</i>",
        backgroundAsset: "temple_interior",
        castAssets: ["Jacob"],
        choices: [
            { text: "Covenant to spend the rest of your days teaching the children of the Olive Tree.", nextScene: "module_end_story_vineyard", effect: { faith: 2, unity: 1, worldly: 2 }, feedback: "Story Complete." },
            { text: "Write your own testimony of the 'tender mercies' you have witnessed.", nextScene: "module_end_story_vineyard", effect: { faith: 1, worldly: 0 }, feedback: "Story Complete." },
            { text: "Live as a 'light' to the Lamanites, praying for the day they are restored.", nextScene: "module_end_story_vineyard", effect: { unity: 2, worldly: 1 }, feedback: "Story Complete." }
        ]
    }
});