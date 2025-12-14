// STATE MANAGEMENT
let gameState = {
    character: null,
    faith: 0, unity: 0, worldly_influence: 0, knowledge: 0,
    hasBrassPlates: false,
    currentSceneId: null,
    currentStoryId: null, // NEW: Tracks the current story
    covenantPathProgress: [],
    lastAction: null
};

let historyStack = []; 

// === MENU SYSTEM LOGIC ===
function showStorySelection() {
    // Hide gameplay panel if it was visible
    const gameplayPanel = document.getElementById('gameplay-panel');
    const visualsArea = document.getElementById('visuals-area');
    if(gameplayPanel) gameplayPanel.style.display = 'none';
    if(visualsArea) visualsArea.style.display = 'none';

    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = 'flex';
    
    const container = document.getElementById('menu-container');
    container.innerHTML = "<h3 style='color:#6d5e41; margin-bottom:20px;'>Choose a Story</h3>";

    // Loop through ALL stories in window.STORIES
    window.STORIES.forEach(story => {
        const btn = document.createElement("button");
        btn.className = "story-btn";
        
        // Map data from data_shared.js
        const title = story.title || "Untitled Story";
        const narrative = story.narrative || "The record of this time period is preserved for your learning.";
        const reference = story.ref || "Scriptures Reference";
        const isAvailable = (story.characters && story.characters.length > 0);

        btn.innerHTML = `
            <strong>${title}</strong>
            <small>${reference}</small>
            <p>${narrative}</p>
        `;
        
        if (isAvailable) {
            btn.onclick = () => showStoryDetails(story);
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.innerHTML += `<em>(Coming Soon)</em>`;
        }
        
        container.appendChild(btn);
    });
}

function showStoryDetails(story) {
    const startScreen = document.getElementById('start-screen');
    const container = document.getElementById('menu-container');
    
    container.innerHTML = `
        <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">${story.title}</h2>
        <p style="margin-bottom: 25px;">${story.narrative}</p>
        <p><strong>Scripture:</strong> ${story.ref}</p>
        <h4 style="margin-top: 20px; color:#4a4130;">Choose Your Perspective:</h4>
    `;

    // Ensure characters array exists and iterate
    const characterList = Array.isArray(story.characters) ? story.characters : [];
    
    characterList.forEach(charName => {
        const charStats = window.STARTING_STATS[charName];
        if (charStats) {
            const btn = document.createElement("button");
            // CRITICAL FIX: Ensure character buttons use the correct class for styling
            btn.className = "character-btn"; 
            btn.innerHTML = `
                <strong>${charName}</strong>
                <small><i>${charStats.bio}</i></small>
            `;
            btn.onclick = () => {
                startScreen.style.display = 'none';
                document.getElementById('gameplay-panel').style.display = 'flex';
                document.getElementById('visuals-area').style.display = 'block';
                loadCharacter(charName, story.id);
            };
            container.appendChild(btn);
        }
    });

    const backBtn = document.createElement("button");
    backBtn.className = "story-btn-small";
    backBtn.innerText = "← Back to Story Selection";
    backBtn.onclick = showStorySelection;
    container.appendChild(backBtn);
}

function loadCharacter(characterName, storyId) {
    const stats = window.STARTING_STATS[characterName];
    if (!stats) {
        console.error("Character stats not found:", characterName);
        return;
    }

    // NEW: Store the story ID
    gameState.currentStoryId = storyId; 

    // Reset game state for the new character
    gameState.character = characterName;
    gameState.faith = stats.faith;
    gameState.unity = stats.unity;
    gameState.worldly_influence = stats.worldly_influence;
    gameState.knowledge = stats.knowledge;
    gameState.hasBrassPlates = stats.hasBrassPlates;
    gameState.currentSceneId = stats.initialScene;
    gameState.covenantPathProgress = [];
    gameState.lastAction = null;
    historyStack = [];
    document.getElementById("undo-btn").disabled = true;

    // Start the game
    renderScene(gameState.currentSceneId);
}

// === GAMEPLAY MECHANICS ===

/**
 * Handles the transition at the end of a story module.
 * @param {string} storyId - The ID of the story just completed (e.g., 'exodus').
 */
function handleModuleEnd(storyId) {
    // Use window.STORIES to get context for the completed and next story.
    const storyIndex = window.STORIES.findIndex(s => s.id === storyId);
    const completedStory = window.STORIES[storyIndex];
    // Check if there is a next story to allow the 'Continue Path' button to be active.
    const nextStory = window.STORIES[storyIndex + 1];

    const startScreen = document.getElementById('start-screen');
    const gameplayPanel = document.getElementById('gameplay-panel');
    const visualsArea = document.getElementById('visuals-area');
    
    // Hide gameplay UI and show the start screen for the menu.
    gameplayPanel.style.display = 'none';
    visualsArea.style.display = 'none';
    startScreen.style.display = 'flex';

    const container = document.getElementById('menu-container');
    container.innerHTML = `
        <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">Module Complete: ${completedStory.title}</h2>
        <p style="margin-bottom: 25px;">What would you like to do next?</p>
    `;

    // 1. Continue Path Button
    const btnContinue = document.createElement("button");
    btnContinue.className = "story-btn";
    if (nextStory) {
        btnContinue.innerText = `Continue Path: Start ${nextStory.title}`;
        btnContinue.onclick = () => showStoryDetails(nextStory); 
    } else {
        btnContinue.innerText = "End of Available Content (Congratulations!)";
        btnContinue.disabled = true;
        btnContinue.style.opacity = "0.6";
    }
    container.appendChild(btnContinue);
    
    // 2. Change Perspective Button
    const btnChange = document.createElement("button");
    btnChange.className = "story-btn";
    btnChange.innerText = `Change Perspective: Replay ${completedStory.title}`;
    btnChange.onclick = () => showStoryDetails(completedStory); 
    container.appendChild(btnChange);

    // 3. Story Selection Button
    const btnLibrary = document.createElement("button");
    btnLibrary.className = "story-btn";
    btnLibrary.innerText = "Story Selection";
    btnLibrary.onclick = showStorySelection; 
    container.appendChild(btnLibrary);
}

function renderScene(sceneId, isUndo = false, actionFeedback = null, choiceFeedback = null) {
    // --- LOGIC TO DETECT MODULE END ---
    if (sceneId.startsWith('module_end_story_')) {
        const completedStoryId = sceneId.substring('module_end_story_'.length);
        handleModuleEnd(completedStoryId);
        return; 
    }
    // --- END LOGIC ---

    const scene = window.scenes[sceneId];
    if (!scene) {
        console.error("Scene not found:", sceneId);
        showStorySelection(); // Fallback to start screen
        return;
    }
    
    if (sceneId === "start_screen_transition") {
        showStorySelection();
        return;
    }

    // Record state for undo (only if not an undo operation itself)
    if (!isUndo) {
        historyStack.push({
            sceneId: gameState.currentSceneId,
            faith: gameState.faith, unity: gameState.unity, worldly_influence: gameState.worldly_influence, knowledge: gameState.knowledge,
            covenantPathProgress: [...gameState.covenantPathProgress],
            lastAction: gameState.lastAction,
            // Only store the choice made if it was a choice, not a global action
            choiceMade: (actionFeedback === null && choiceFeedback !== null) ? gameState.currentSceneId : null 
        });
    }

    gameState.currentSceneId = sceneId;

    // Apply onEnter effects (unless undoing)
    if (!isUndo && scene.onEnter) {
        applyStats(scene.onEnter);
    }
    
    clampStats();
    if (checkGameOver()) return;

    // Update UI elements
    // This line assumes window.ASSET_PATHS is loaded from data_shared.js
    document.getElementById('visuals-area').style.backgroundImage = `url(${window.ASSET_PATHS.backgrounds[scene.backgroundAsset]})`;
    document.getElementById('scene-text').innerHTML = scene.text;
    updateStatsDisplay();
    updateCovenantDisplay();

    // Render Choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; // Clear previous choices
    
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            btn.onclick = () => handleChoice(index, sceneId);
            choicesDiv.appendChild(btn);
        });
    } else {
        // Fallback if no choices are defined
        choicesDiv.innerHTML = `<button class="story-btn" onclick="showStorySelection()">Return to Library</button>`;
    }
    
    // Render Feedback
    const feedbackDiv = document.getElementById('feedback-area');
    feedbackDiv.innerHTML = '';
    if (actionFeedback) {
        feedbackDiv.innerHTML += `<div class="action-feedback">${actionFeedback}</div>`;
    }
    if (choiceFeedback) {
        feedbackDiv.innerHTML += `<div class="choice-feedback">${choiceFeedback}</div>`;
    }
}

function handleChoice(choiceIndex, sceneId) {
    const scene = window.scenes[sceneId];
    const choice = scene.choices[choiceIndex];

    // Apply choice effects
    if (choice.effect) {
        applyStats(choice.effect);
    }
    
    // Check for Covenant Unlock
    if (choice.covenantUnlock && !gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
        gameState.covenantPathProgress.push(choice.covenantUnlock);
    }

    clampStats();
    if (checkGameOver()) return;

    // Prepare choice feedback for next render
    let choiceStats = getStatString(choice.effect.faith, choice.effect.unity, choice.effect.worldly_influence, choice.effect.knowledge);
    let feedbackHTML = `
        <span class="feedback-title">Choice: ${choice.text}</span>
        <span class="feedback-stats">${choiceStats}</span>
        <span class="feedback-narrative">${choice.feedback}</span>
    `;

    // Proceed to next scene
    renderScene(choice.nextScene, false, null, feedbackHTML);
}

function globalAction(actionType) {
    // Clear previous feedback
    document.getElementById('feedback-area').innerHTML = '';

    // Check if the same action was taken last turn (for diminishing returns)
    let isConsecutive = gameState.lastAction === actionType;
    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let actionText = "", scriptureRef = "";

    switch(actionType) {
        case 'pray':
            dFaith = 2; dUnity = -1;
            // Diminishing returns on Faith gain
            if (isConsecutive) { dFaith = 0.5; actionText = "You prayed again, but it felt routine."; scriptureRef = "(See 3 Nephi 18:16)"; } 
            else { dFaith = 1.5; actionText = "You poured out your soul in prayer."; scriptureRef = "(See Alma 34:27)"; }
            if (dFaith > 0 && !gameState.covenantPathProgress.includes("Prayer to Seek Guidance")) gameState.covenantPathProgress.push("Prayer to Seek Guidance");
            break;
        case 'study':
            dKnowledge = 1; dUnity = -1;
            // Diminishing returns on Knowledge gain
            if (isConsecutive) { dKnowledge = 0.5; actionText = "You studied again, but are having trouble focusing."; scriptureRef = "(See 2 Nephi 28:30)"; } 
            else { dKnowledge = 1.5; actionText = "You poured over the plates."; scriptureRef = "(See 1 Nephi 19:23)"; }
            if (dKnowledge > 0 && !gameState.covenantPathProgress.includes("Knowledge")) gameState.covenantPathProgress.push("Knowledge");
            break;
        case 'service':
            // CRITICAL FIX: Ensure Service decreases Worldly Influence, as per game design.
            dFaith = -1; dWorld = -1; dUnity = 2;
            actionText = "You served your family and neighbors.";
            scriptureRef = "(See Mosiah 2:17)";
            break;
    }
    
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    clampStats(); 
    if (checkGameOver()) return;

    let actionStats = getStatString(dFaith, dUnity, dWorld, dKnowledge);
    let previousActionHTML = `
        <span class="feedback-title">Action: ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}</span>
        <span class="feedback-stats">${actionStats}</span>
        <span class="feedback-narrative">${scriptureRef}</span>
    `;

    gameState.lastAction = actionType;
    
    renderScene(gameState.currentSceneId, false, previousActionHTML, null);
    
    document.getElementById("undo-btn").disabled = false;
    
    document.getElementById("feedback-area").style.display = 'block';
}

function undoLastAction() {
    if (historyStack.length > 0) {
        const previousState = historyStack.pop();

        // Restore core stats
        gameState.faith = previousState.faith;
        gameState.unity = previousState.unity;
        gameState.worldly_influence = previousState.worldly_influence;
        gameState.knowledge = previousState.knowledge;
        gameState.covenantPathProgress = previousState.covenantPathProgress;
        gameState.lastAction = previousState.lastAction;

        let sceneToRender = previousState.sceneId;

        // If the action being undone was a *choice*, we need to return to the scene *before* the choice
        if (previousState.choiceMade) {
             sceneToRender = previousState.choiceMade;
        }

        // Disable undo if the history is empty after the pop
        document.getElementById("undo-btn").disabled = historyStack.length === 0;

        // Render the scene without applying onEnter effects (isUndo=true)
        renderScene(sceneToRender, true, null, null);
        
        // Clear feedback area after undo
        document.getElementById('feedback-area').innerHTML = '';
        document.getElementById("feedback-area").style.display = 'none';

    }
}


// === HELPER FUNCTIONS ===
function applyStats(effects) {
    if (effects) {
        gameState.faith += effects.faith || 0;
        gameState.unity += effects.unity || 0;
        gameState.worldly_influence += effects.worldly || 0;
        gameState.knowledge += effects.knowledge || 0;
    }
}

function clampStats() {
    gameState.faith = Math.min(Math.max(gameState.faith, 0), window.MAX_STAT);
    gameState.unity = Math.min(Math.max(gameState.unity, 0), window.MAX_STAT);
    gameState.worldly_influence = Math.min(Math.max(gameState.worldly_influence, 0), window.MAX_STAT);
    gameState.knowledge = Math.min(Math.max(gameState.knowledge, 0), window.MAX_STAT);
}

function updateStatsDisplay() {
    document.getElementById('stat-faith').innerText = Math.floor(gameState.faith);
    document.getElementById('stat-unity').innerText = Math.floor(gameState.unity);
    document.getElementById('stat-worldly').innerText = Math.floor(gameState.worldly_influence);
    document.getElementById('stat-knowledge').innerText = Math.floor(gameState.knowledge);
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS[gameState.covenantPathProgress.length] || "Complete";
    document.getElementById('covenant-step-display').innerText = nextStep;
}

function getStatString(dF, dU, dW, dK) {
    let parts = [];
    if (dF) parts.push(`Faith: ${dF > 0 ? '+' : ''}${Math.round(dF * 10) / 10}`);
    if (dU) parts.push(`Unity: ${dU > 0 ? '+' : ''}${Math.round(dU * 10) / 10}`);
    if (dW) parts.push(`Worldly: ${dW > 0 ? '+' : ''}${Math.round(dW * 10) / 10}`);
    if (dK) parts.push(`Knowledge: ${dK > 0 ? '+' : ''}${Math.round(dK * 10) / 10}`);
    return parts.join(' | ');
}

function checkGameOver() {
    if (gameState.faith <= 0 || gameState.unity <= 0 || gameState.worldly_influence >= window.MAX_STAT) {
        const startScreen = document.getElementById('start-screen');
        const gameplayPanel = document.getElementById('gameplay-panel');
        const visualsArea = document.getElementById('visuals-area');
        
        gameplayPanel.style.display = 'none';
        visualsArea.style.display = 'none';
        startScreen.style.display = 'flex';
        
        const container = document.getElementById('menu-container');
        let message = "Your path ended here.";
        if (gameState.faith <= 0) message = "Your faith failed you, and your path ended here.";
        if (gameState.unity <= 0) message = "The division and discord was too great, and your path ended here.";
        if (gameState.worldly_influence >= window.MAX_STAT) message = "The influence of the world overcame you, and your path ended here.";

        container.innerHTML = `<h2 style="color:red;">Game Over!</h2><p>${message}</p>`;

        const retryBtn = document.createElement("button");
        retryBtn.className = "story-btn";
        retryBtn.innerText = "Start Over";
        retryBtn.onclick = showStorySelection;
        container.appendChild(retryBtn);

        return true;
    }
    return false;
}

// Initial call to set up the game
window.onload = function() {
    showStorySelection();
    // Add event listeners for global actions if necessary
};