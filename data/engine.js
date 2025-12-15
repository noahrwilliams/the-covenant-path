// STATE MANAGEMENT
let gameState = {
    character: null,
    faith: 0, unity: 0, worldly_influence: 0, knowledge: 0,
    hasBrassPlates: false,
    currentSceneId: null,
    currentStoryId: null, 
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

        // Corrected Story Button Layout (matching your previous successful structure)
        btn.innerHTML = `
            <span class="story-title">${title}</span>
            <span class="story-desc">${narrative}</span>
            <span class="story-ref">${reference}</span>
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
    backBtn.className = "back-btn"; 
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

// Function added to return to start screen from gameplay panel
function goToStartScreen() {
    document.getElementById('gameplay-panel').style.display = 'none';
    document.getElementById('visuals-area').style.display = 'none';
    showStorySelection(); 
}

// === GAMEPLAY MECHANICS ===

/**
 * Handles the transition at the end of a story module.
 * @param {string} storyId - The ID of the story just completed.
 */
function handleModuleEnd(storyId) {
    const storyIndex = window.STORIES.findIndex(s => s.id === storyId);
    const completedStory = window.STORIES[storyIndex];
    const nextStory = window.STORIES[storyIndex + 1];

    const startScreen = document.getElementById('start-screen');
    const gameplayPanel = document.getElementById('gameplay-panel');
    const visualsArea = document.getElementById('visuals-area');
    
    // Hide gameplay UI
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
    if (nextStory && nextStory.characters.length > 0) {
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
        showStorySelection(); 
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
    const protagonistPortrait = document.getElementById('protagonist-portrait');
    const castPortraitsContainer = document.getElementById('cast-portraits-container');
    const storyScrollContainer = document.getElementById('story-scroll-container');


    // Update main portrait
    protagonistPortrait.src = window.ASSETS.characters[gameState.character];
    protagonistPortrait.alt = gameState.character;

    // Update background image
    const backgroundImage = document.getElementById('background-image');
    backgroundImage.src = window.ASSETS.backgrounds[scene.backgroundAsset];
    backgroundImage.alt = `Background: ${scene.backgroundAsset}`;

    // Update cast portraits
    castPortraitsContainer.innerHTML = '';
    if (scene.castAssets) {
        scene.castAssets.forEach(castName => {
            const img = document.createElement('img');
            img.className = 'cast-portrait';
            img.src = window.ASSETS.characters[castName];
            img.alt = castName;
            castPortraitsContainer.appendChild(img);
        });
    }
    
    // Clear previous feedback block if it exists
    const previousFeedback = storyScrollContainer.querySelector('.action-feedback-block');
    if (previousFeedback) {
        storyScrollContainer.removeChild(previousFeedback);
    }

    // Render Feedback at the top of the scroll container
    const tempFeedbackDiv = document.createElement('div');
    tempFeedbackDiv.className = 'action-feedback-block';

    if (actionFeedback || choiceFeedback) {
        if (actionFeedback) {
            tempFeedbackDiv.innerHTML += `<div class="action-feedback">${actionFeedback}</div>`;
        }
        if (choiceFeedback) {
            tempFeedbackDiv.innerHTML += `<div class="choice-feedback">${choiceFeedback}</div>`;
        }
        
        // Insert feedback block BEFORE the main scene text
        storyScrollContainer.insertBefore(tempFeedbackDiv, document.getElementById('story-text'));
    }

    document.getElementById('story-text').innerHTML = scene.text; 
    
    updateStatsDisplay();
    updateCovenantDisplay();
    updateButtonStates(); // FIX: Update button states (Records/Study button)

    // Render Choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; // Clear previous choices
    
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            // FIX: Strip parenthetical text from button label
            let buttonText = choice.text;
            const parenIndex = buttonText.indexOf('(');
            if (parenIndex !== -1) {
                buttonText = buttonText.substring(0, parenIndex).trim();
            }

            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = buttonText; // Use the cleaned text
            btn.onclick = () => handleChoice(index, sceneId);
            choicesDiv.appendChild(btn);
        });
    } else {
        choicesDiv.innerHTML = `<button class="story-btn" onclick="showStorySelection()">Return to Library</button>`;
    }
    
    // Scroll to the bottom of the scroll container to show new text/feedback
    storyScrollContainer.scrollTop = storyScrollContainer.scrollHeight;
}

function handleChoice(choiceIndex, sceneId) {
    const scene = window.scenes[sceneId];
    const choice = scene.choices[choiceIndex];
    
    // 1. Save state BEFORE change (for accurate feedback calculation)
    const oldFaith = gameState.faith;
    const oldUnity = gameState.unity;
    const oldWorld = gameState.worldly_influence;
    const oldKnowledge = gameState.knowledge;

    // Prepare stat effect object for display and state change
    const effect = choice.effect || { faith: 0, unity: 0, worldly: 0, knowledge: 0 };
    
    // 2. Apply choice effects
    applyStats(effect);
    
    // 3. Clamp (modifies gameState)
    clampStats();
    if (checkGameOver()) return;

    // 4. Check for Covenant Unlock
    if (choice.covenantUnlock && !gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
        gameState.covenantPathProgress.push(choice.covenantUnlock);
    }
    
    // 5. Calculate ACTUAL change after clamping
    const actualDFaith = gameState.faith - oldFaith;
    const actualDUnity = gameState.unity - oldUnity;
    const actualDWorld = gameState.worldly_influence - oldWorld;
    const actualDKnowledge = gameState.knowledge - oldKnowledge;


    // 6. Generate choice feedback using the ACTUAL applied effect values
    let choiceStats = getStatString(actualDFaith, actualDUnity, actualDWorld, actualDKnowledge);
    let feedbackHTML = `
        <span class="feedback-title">Choice: ${choice.text}</span>
        <span class="feedback-stats">${choiceStats}</span>
        <span class="feedback-narrative">${choice.feedback}</span>
    `;

    // 7. Proceed to next scene
    renderScene(choice.nextScene, false, null, feedbackHTML);
}

function globalAction(actionType) {
    // 1. Save state BEFORE change
    const oldFaith = gameState.faith;
    const oldUnity = gameState.unity;
    const oldWorld = gameState.worldly_influence;
    const oldKnowledge = gameState.knowledge;
    
    // Check if the same action was taken last turn (for diminishing returns)
    let isConsecutive = gameState.lastAction === actionType;
    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let actionText = "", scriptureRef = "";

    switch(actionType) {
        case 'pray':
            // CORRECTED LOGIC: Increase Faith, Decrease Unity, Decrease Worldly
            dUnity = -1.0; 
            dWorld = -0.5; // Small reduction of worldly influence
            
            if (isConsecutive) { dFaith = 0.5; actionText = "You prayed again, but it felt routine."; scriptureRef = "(See 3 Nephi 18:16)"; } 
            else { dFaith = 1.5; actionText = "You poured out your soul in prayer."; scriptureRef = "(See Alma 34:27)"; }
            
            if (dFaith > 0 && !gameState.covenantPathProgress.includes("Prayer to Seek Guidance")) gameState.covenantPathProgress.push("Prayer to Seek Guidance");
            break;
        case 'study':
            // CORRECTED LOGIC: Increase Knowledge, Decrease Unity
            dUnity = -0.5; 
            dWorld = 0; // No change to Worldly (explicitly zeroed out)

            if (gameState.hasBrassPlates) {
                if (isConsecutive) { dKnowledge = 0.5; actionText = "You studied again, but are having trouble focusing."; scriptureRef = "(See 2 Nephi 28:30)"; } 
                else { dKnowledge = 1.5; actionText = "You poured over the plates."; scriptureRef = "(See 1 Nephi 19:23)"; }
            } else {
                 dUnity = 0; // No unity change if you can't study
                 dKnowledge = 0;
                 actionText = "You have no records to study. You feel unfulfilled.";
                 scriptureRef = "";
            }
            
            if (dKnowledge > 0 && !gameState.covenantPathProgress.includes("Knowledge")) gameState.covenantPathProgress.push("Knowledge");
            break;
        case 'service':
            // CORRECTED LOGIC: Increase Unity, Decrease Worldly. No change to Faith.
            dFaith = 0; 
            dWorld = -1.0; 
            dUnity = 2.0; 
            actionText = "You served your family and neighbors.";
            scriptureRef = "(See Mosiah 2:17)";
            break;
    }
    
    // 2. Apply calculated changes (using the intended d-variables)
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    // 3. Clamp (modifies gameState if it exceeded min/max)
    clampStats(); 
    if (checkGameOver()) return;
    
    // 4. Calculate ACTUAL change after clamping
    const actualDFaith = gameState.faith - oldFaith;
    const actualDUnity = gameState.unity - oldUnity;
    const actualDWorld = gameState.worldly_influence - oldWorld;
    const actualDKnowledge = gameState.knowledge - oldKnowledge;

    // 5. Generate feedback string using the ACTUAL calculated changes
    let actionStats = getStatString(actualDFaith, actualDUnity, actualDWorld, actualDKnowledge);
    let previousActionHTML = `
        <span class="feedback-title">Action: ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}</span>
        <span class="feedback-stats">${actionStats}</span>
        <span class="feedback-narrative">${actionText} ${scriptureRef}</span>
    `;

    gameState.lastAction = actionType;
    
    // 6. Render the current scene again with action feedback
    renderScene(gameState.currentSceneId, false, previousActionHTML, null);
    
    document.getElementById("undo-btn").disabled = false;
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

        if (previousState.choiceMade) {
             sceneToRender = previousState.choiceMade;
        }

        // Disable undo if the history is empty after the pop
        document.getElementById("undo-btn").disabled = historyStack.length === 0;

        // Render the scene without applying onEnter effects (isUndo=true)
        renderScene(sceneToRender, true, null, null);
    }
}


// === HELPER FUNCTIONS ===
function applyStats(effects) {
    if (effects) {
        // Use 'worldly' for scene effects to match data structure
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
    // Uses toFixed(1) to display all stats with one decimal place (e.g., 10.0)
    document.getElementById('score-faith').innerText = gameState.faith.toFixed(1);
    document.getElementById('score-unity').innerText = gameState.unity.toFixed(1);
    document.getElementById('score-world').innerText = gameState.worldly_influence.toFixed(1);
    document.getElementById('score-knowledge').innerText = gameState.knowledge.toFixed(1);
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS[gameState.covenantPathProgress.length] || "Complete";
    document.getElementById('covenant-step-display').innerText = nextStep;
}

// Toggles the Records button based on game state
function updateButtonStates() {
    const studyBtn = document.getElementById('btn-study');
    if (studyBtn) {
        studyBtn.disabled = !gameState.hasBrassPlates;
        studyBtn.title = studyBtn.disabled ? "The Records must first be obtained." : "";
    }
}


// Adds color coding to stat changes (ensures display matches application)
function getStatString(dF, dU, dW, dK) {
    // Helper to format a single stat
    const formatStat = (val, label) => {
        // Only display if there's a non-zero change
        if (val === 0) return null;
        
        const sign = val > 0 ? '+' : '';
        let className = '';

        // Worldly is inverted: a reduction (negative val) is good (positive-change)
        if (label === 'Worldly') {
            className = val < 0 ? 'positive-change' : 'negative-change';
        } else {
            // Faith, Unity, Knowledge: an increase (positive val) is good (positive-change)
            className = val > 0 ? 'positive-change' : 'negative-change';
        }

        // Round to 1 decimal place for display consistency
        const roundedVal = Math.round(val * 10) / 10;
        // Use toFixed(1) to ensure .0 is present (e.g., +2.0)
        const displayVal = Math.abs(roundedVal).toFixed(1);

        return `<span class="${className}">${label}: ${sign}${displayVal}</span>`;
    };

    let parts = [
        formatStat(dF, 'Faith'),
        formatStat(dU, 'Unity'),
        formatStat(dW, 'Worldly'),
        formatStat(dK, 'Knowledge')
    ].filter(p => p !== null);

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
};