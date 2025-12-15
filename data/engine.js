// STATE MANAGEMENT
let gameState = {
    character: null,
    faith: 0, unity: 0, worldly_influence: 0, knowledge: 0,
    hasBrassPlates: false,
    currentSceneId: null,
    currentStoryId: null, 
    covenantPathProgress: [],
    lastAction: null,
    actionsTakenSinceChoice: 0, 
    difficulty: 'Primary' // New: Default difficulty
};

let historyStack = []; 
const DIFFICULTY_LEVELS = ['Primary', 'Youth', 'Endowed'];

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
    
    // === FIX FOR DIFFICULTY LABELS (v3.5.1) ===
    const difficultySelectorHTML = `
        <h4 style="margin-top: 10px; color:#4a4130;">Select Difficulty:</h4>
        <select id="difficulty-select" style="padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; width: 100%; max-width: 300px; font-size: 1em;">
            <option value="Primary">Primary (easy)</option>
            <option value="Youth">Youth (medium)</option>
            <option value="Endowed">Endowed (hard)</option>
        </select>
        <h4 style="margin-top: 20px; color:#4a4130;">Choose Your Perspective:</h4>
    `;
    // ============================================

    container.innerHTML = `
        <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">${story.title}</h2>
        <p style="margin-bottom: 15px;">${story.narrative}</p>
        <p><strong>Scripture:</strong> ${story.ref}</p>
        ${difficultySelectorHTML}
    `;
    
    // Set previous difficulty level if stored
    const difficultySelect = document.getElementById('difficulty-select');
    difficultySelect.value = gameState.difficulty;
    difficultySelect.onchange = (e) => {
        gameState.difficulty = e.target.value;
    };


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
                // Pass the currently selected difficulty
                loadCharacter(charName, story.id, gameState.difficulty);
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

function loadCharacter(characterName, storyId, difficulty) {
    const stats = window.STARTING_STATS[characterName];
    if (!stats) {
        console.error("Character stats not found:", characterName);
        return;
    }

    // Set difficulty state
    gameState.difficulty = difficulty;
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
    gameState.actionsTakenSinceChoice = 0; // Initialize action counter
    
    // === Apply Difficulty Stat Offsets (Functional Issue #5) ===
    let faith_offset = 0;
    let unity_offset = 0;
    let worldly_offset = 0;
    
    if (difficulty === 'Youth') {
        faith_offset = -1;
        unity_offset = -1;
        worldly_offset = 1;
    } else if (difficulty === 'Endowed') {
        // Endowed: -2 from base, +2 from base
        faith_offset = -2;
        unity_offset = -2;
        worldly_offset = 2;
    }
    
    gameState.faith += faith_offset;
    gameState.unity += unity_offset;
    gameState.worldly_influence += worldly_offset;
    // ==========================================================


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
        // Do not return to selection if the scene is a warning scene that hasn't been written yet
        if (!sceneId.startsWith('warning_')) {
            showStorySelection(); 
        }
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
            actionsTakenSinceChoice: gameState.actionsTakenSinceChoice, // Save action counter
            choiceMade: (actionFeedback === null && choiceFeedback !== null) ? gameState.currentSceneId : null 
        });
    }

    // Reset action counter ONLY if we are rendering a new scene due to a choice
    if (choiceFeedback !== null) {
        gameState.actionsTakenSinceChoice = 0;
    }

    gameState.currentSceneId = sceneId;

    // Apply onEnter effects (unless undoing or transitioning due to a warning)
    if (!isUndo && !sceneId.startsWith('warning_') && scene.onEnter) {
        applyStats(scene.onEnter);
    }
    
    clampStats();
    if (checkGameOver()) return; // Check for immediate game over after onEnter

    // Update UI elements
    const protagonistPortrait = document.getElementById('protagonist-portrait');
    const castPortraitsContainer = document.getElementById('cast-portraits-container');
    const storyScrollContainer = document.getElementById('story-scroll-container');


    // Update main portrait
    protagonistPortrait.src = window.ASSETS.characters[gameState.character];
    protagonistPortrait.alt = gameState.character;

    // Update background image
    const backgroundImage = document.getElementById('background-image');
    // Assuming ASSET_PATHS is ASSETS for consistency
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
    updateButtonStates(); 

    // Render Choices
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; // Clear previous choices
    
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            // FIX: Strip parenthetical text from button label (if it exists)
            let buttonText = choice.text;
            const parenIndex = buttonText.indexOf('(');
            if (parenIndex !== -1) {
                // Use the text up to the parenthesis, but keep the full text for the feedback/log
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
    
    // Check for warnings *after* rendering the scene, to allow players to see the result 
    // before the engine forces a warning transition.
    checkWarning(); 
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
    if (checkGameOver()) return; // Check for hard game over

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
    const isYouth = gameState.difficulty === 'Youth';
    const isEndowed = gameState.difficulty === 'Endowed';
    const actionTaken = gameState.actionsTakenSinceChoice > 0;
    const consecutivePrimary = gameState.lastAction === actionType; // Standard DR check

    // === Endowed Difficulty Restriction (Functional Issue #5) ===
    // If Endowed, only one action per scene/choice is allowed.
    if (isEndowed && actionTaken) {
        return; 
    }
    
    // 1. Save state BEFORE change (for undo/feedback)
    const oldFaith = gameState.faith;
    const oldUnity = gameState.unity;
    const oldWorld = gameState.worldly_influence;
    const oldKnowledge = gameState.knowledge;
    
    let applyDR = false;
    
    if (isYouth) {
        // Youth DR: diminishing returns if ANY global action was pressed since the last choice.
        if (actionTaken) { 
            applyDR = true; 
        }
    } else if (gameState.difficulty === 'Primary') { 
        // Primary DR: diminishing returns only if the SAME global action was pressed last.
        if (consecutivePrimary) { 
            applyDR = true; 
        }
    } 
    // If Endowed, applyDR remains false, meaning full effect on the single allowed action.


    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let actionText = "", scriptureRef = "";

    switch(actionType) {
        case 'pray':
            dUnity = -1.0; 
            dWorld = -0.5;

            if (applyDR) { 
                dFaith = 0.5; 
                actionText = "You prayed again, but the Spirit feels less attentive in this moment."; 
            } else { 
                dFaith = 1.5; 
                actionText = "You poured out your soul in prayer."; 
            }
            scriptureRef = "(See Alma 34:27)"; 
            
            if (dFaith > 0 && !gameState.covenantPathProgress.includes("Prayer to Seek Guidance")) gameState.covenantPathProgress.push("Prayer to Seek Guidance");
            break;

        case 'study':
            dUnity = -0.5; 
            dWorld = 0; 

            if (gameState.hasBrassPlates) {
                if (applyDR) { 
                    dKnowledge = 0.5; 
                    actionText = "You studied again, but are having trouble focusing on new light in this moment."; 
                } else { 
                    dKnowledge = 1.5; 
                    actionText = "You poured over the plates, finding great knowledge."; 
                }
            } else {
                 dUnity = 0;
                 dKnowledge = 0;
                 actionText = "You have no records to study. You feel unfulfilled.";
                 scriptureRef = "";
            }
            
            if (dKnowledge > 0 && !gameState.covenantPathProgress.includes("Knowledge")) gameState.covenantPathProgress.push("Knowledge");
            break;

        case 'service':
            dWorld = -1.0; 
            
            if (applyDR) { 
                dUnity = 0.5; 
                dFaith = -0.5; 
                actionText = "You gave service again, but your energy and focus were strained.";
            } else { 
                dUnity = 2.0; 
                dFaith = -1.0; 
                actionText = "You served your family and neighbors with diligence.";
            }
            scriptureRef = "(See Mosiah 2:17)";
            break;
    }
    
    // 2. Apply calculated changes 
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    // 3. Clamp
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
    gameState.actionsTakenSinceChoice++; // Increment action counter
    
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
        gameState.actionsTakenSinceChoice = previousState.actionsTakenSinceChoice; // Restore action counter

        // FIX: Explicitly call updateStatsDisplay to ensure UI reflects the restored state
        updateStatsDisplay(); 

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
        // Stats are only added, clamping ensures they stay in range.
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
    document.getElementById('difficulty-display').innerText = gameState.difficulty;
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS[gameState.covenantPathProgress.length] || "Complete";
    document.getElementById('covenant-step-display').innerText = nextStep;
}

// Toggles the Records button based on game state and difficulty restriction
function updateButtonStates() {
    const studyBtn = document.getElementById('btn-study');
    const prayBtn = document.getElementById('btn-pray');
    const serviceBtn = document.getElementById('btn-service');

    // Endowed mode check
    const isEndowedRestricted = (gameState.difficulty === 'Endowed' && gameState.actionsTakenSinceChoice >= 1); 
    
    // Standard button disable logic
    prayBtn.disabled = isEndowedRestricted;
    serviceBtn.disabled = isEndowedRestricted;

    if (studyBtn) {
        // Study button is disabled if no plates OR if Endowed restriction applies
        studyBtn.disabled = !gameState.hasBrassPlates || isEndowedRestricted;
        studyBtn.title = studyBtn.disabled ? "The Records must first be obtained." : "";
    }
}


// Adds color coding to stat changes (ensures display matches application)
function getStatString(dF, dU, dW, dK) {
    let parts = [];
    
    // Helper function to get the correct class (good/bad)
    function getStatClass(statName, delta) {
        if (delta === 0) return 'neutral';
        
        // Faith, Unity, Knowledge: Positive is good, Negative is bad
        if (statName === 'Faith' || statName === 'Unity' || statName === 'Knowledge') {
            return delta > 0 ? 'good-stat' : 'bad-stat';
        } 
        
        // Worldly Influence: Negative is good, Positive is bad
        if (statName === 'Worldly') {
            return delta < 0 ? 'good-stat' : 'bad-stat';
        }
        return 'neutral';
    }

    // Function to format the stat part as colored HTML
    const formatStat = (statName, delta) => {
        // Only display if there's a non-zero change
        if (delta === 0) return null; 
        
        const className = getStatClass(statName, delta);
        const sign = delta > 0 ? '+' : '';
        const roundedVal = Math.round(delta * 10) / 10;
        const displayVal = sign + roundedVal.toFixed(1);

        return `<span class="stat-change ${className}">${statName}: ${displayVal}</span>`;
    };

    // Pass the delta values and the display name
    const faithPart = formatStat('Faith', dF);
    const unityPart = formatStat('Unity', dU);
    const worldlyPart = formatStat('Worldly', dW);
    const knowledgePart = formatStat('Knowledge', dK);
    
    if (faithPart) parts.push(faithPart);
    if (unityPart) parts.push(unityPart);
    if (worldlyPart) parts.push(worldlyPart);
    if (knowledgePart) parts.push(knowledgePart);

    return parts.join(' | ');
}


/**
 * Functional Issue #6: Checks for the critical warning threshold and forces a scene transition.
 */
function checkWarning() {
    // If we are already in a warning scene, do not transition again.
    if (gameState.currentSceneId.startsWith('warning_')) return false;

    const LOW_THRESHOLD = 5.0; 
    const HIGH_THRESHOLD = window.MAX_STAT - 5.0; // e.g., 20 - 5 = 15

    let warningScene = null;

    if (gameState.faith < LOW_THRESHOLD) warningScene = 'warning_low_faith';
    else if (gameState.unity < LOW_THRESHOLD) warningScene = 'warning_low_unity';
    else if (gameState.worldly_influence > HIGH_THRESHOLD) warningScene = 'warning_high_world';

    if (warningScene) {
        // Force an immediate scene transition (using isUndo=true to prevent history logging)
        renderScene(warningScene, true, null, null);
        return true; 
    }
    return false;
}

/**
 * Checks for the terminal game over condition (0 or MAX_STAT)
 */
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