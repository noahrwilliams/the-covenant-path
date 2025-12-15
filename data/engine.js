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
    difficulty: 'Primary'
};

let historyStack = []; 
const DIFFICULTY_LEVELS = ['Primary', 'Youth', 'Endowed'];

// === MENU SYSTEM LOGIC ===
function showStorySelection() {
    const gameplayPanel = document.getElementById('gameplay-panel');
    const visualsArea = document.getElementById('visuals-area');
    if(gameplayPanel) gameplayPanel.style.display = 'none';
    if(visualsArea) visualsArea.style.display = 'none';

    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = 'flex';
    
    const container = document.getElementById('menu-container');
    container.innerHTML = "<h3 style='color:#6d5e41; margin-bottom:20px;'>Choose a Story</h3>";

    window.STORIES.forEach(story => {
        const btn = document.createElement("button");
        btn.className = "story-btn";
        
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
    
    const difficultySelectorHTML = `
        <h4 style="margin-top: 10px; color:#4a4130;">Select Difficulty:</h4>
        <select id="difficulty-select" style="padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; width: 100%; max-width: 300px; font-size: 1em;">
            <option value="Primary">Primary (easy)</option>
            <option value="Youth">Youth (medium)</option>
            <option value="Endowed">Endowed (hard)</option>
        </select>
        <h4 style="margin-top: 20px; color:#4a4130;">Choose Your Perspective:</h4>
    `;

    container.innerHTML = `
        <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">${story.title}</h2>
        <p style="margin-bottom: 15px;">${story.narrative}</p>
        <p><strong>Scripture:</strong> ${story.ref}</p>
        ${difficultySelectorHTML}
    `;
    
    const difficultySelect = document.getElementById('difficulty-select');
    difficultySelect.value = gameState.difficulty;
    difficultySelect.onchange = (e) => {
        gameState.difficulty = e.target.value;
    };

    const characterList = Array.isArray(story.characters) ? story.characters : [];
    
    characterList.forEach(charName => {
        const charStats = window.STARTING_STATS[charName];
        if (charStats) {
            // Priority: Use manual displayName, fallback to internal ID
            const displayName = charStats.displayName || charName;

            const btn = document.createElement("button");
            btn.className = "character-btn"; 
            btn.innerHTML = `
                <strong>${displayName}</strong>
                <small><i>${charStats.bio}</i></small>
            `;
            btn.onclick = () => {
                startScreen.style.display = 'none';
                document.getElementById('gameplay-panel').style.display = 'flex'; 
                document.getElementById('visuals-area').style.display = 'block';
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

/**
 * FIX: Populates window.STORIES.characters lists dynamically 
 * by reading the 'storyId' property from every character in STARTING_STATS.
 */
function populateStoryCharacters() {
    // 1. Ensure all story character lists are clear before rebuilding
    window.STORIES.forEach(story => {
        story.characters = [];
    });

    // 2. Iterate through all characters loaded from all scene files
    for (const characterId in window.STARTING_STATS) {
        const stats = window.STARTING_STATS[characterId];
        
        // 3. Use the new storyId property to link the character
        if (stats.storyId) {
            const story = window.STORIES.find(s => s.id === stats.storyId);
            if (story) {
                // Check if already present to prevent duplicates (safe guard)
                if (!story.characters.includes(characterId)) {
                    story.characters.push(characterId);
                }
            } else {
                // Warning added for debugging new character files
                console.warn(`Character '${characterId}' specifies unknown storyId: '${stats.storyId}'. Check data_shared.js.`);
            }
        }
    }
}

// NEW FUNCTION: Navigates to the character selection screen for the CURRENT story
function showCurrentCharacterSelection() {
    document.getElementById('gameplay-panel').style.display = 'none';
    document.getElementById('visuals-area').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';

    if (gameState.currentStoryId) {
        const story = window.STORIES.find(s => s.id === gameState.currentStoryId);
        if (story) {
            showStoryDetails(story);
            return;
        }
    }
    // Fallback if no story is active
    showStorySelection();
}

function loadCharacter(characterName, storyId, difficulty) {
    const stats = window.STARTING_STATS[characterName];
    if (!stats) {
        console.error("Character stats not found:", characterName);
        return;
    }

    gameState.difficulty = difficulty;
    gameState.currentStoryId = storyId; 
    gameState.character = characterName;
    gameState.faith = stats.faith;
    gameState.unity = stats.unity;
    gameState.worldly_influence = stats.worldly_influence;
    gameState.knowledge = stats.knowledge;
    gameState.hasBrassPlates = stats.hasBrassPlates;
    gameState.currentSceneId = stats.initialScene;
    gameState.covenantPathProgress = [];
    gameState.lastAction = null;
    gameState.actionsTakenSinceChoice = 0;
    
    let faith_offset = 0;
    let unity_offset = 0;
    let worldly_offset = 0;
    
    if (difficulty === 'Youth') {
        faith_offset = -1;
        unity_offset = -1;
        worldly_offset = 1;
    } else if (difficulty === 'Endowed') {
        faith_offset = -2;
        unity_offset = -2;
        worldly_offset = 2;
    }
    
    gameState.faith += faith_offset;
    gameState.unity += unity_offset;
    gameState.worldly_influence += worldly_offset;

    historyStack = [];
    document.getElementById("undo-btn").disabled = true;

    renderScene(gameState.currentSceneId);
}

// === GAMEPLAY MECHANICS ===

function handleModuleEnd(storyId) {
    const storyIndex = window.STORIES.findIndex(s => s.id === storyId);
    const completedStory = window.STORIES[storyIndex];
    const nextStory = window.STORIES[storyIndex + 1];

    const startScreen = document.getElementById('start-screen');
    const gameplayPanel = document.getElementById('gameplay-panel');
    const visualsArea = document.getElementById('visuals-area');
    
    gameplayPanel.style.display = 'none';
    visualsArea.style.display = 'none';
    startScreen.style.display = 'flex';

    const container = document.getElementById('menu-container');
    container.innerHTML = `
        <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">Module Complete: ${completedStory.title}</h2>
        <p style="margin-bottom: 25px;">What would you like to do next?</p>
    `;

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
    
    const btnChange = document.createElement("button");
    btnChange.className = "story-btn";
    btnChange.innerText = `Change Perspective: Replay ${completedStory.title}`;
    btnChange.onclick = () => showStoryDetails(completedStory); 
    container.appendChild(btnChange);

    const btnLibrary = document.createElement("button");
    btnLibrary.className = "story-btn";
    btnLibrary.innerText = "Story Selection";
    btnLibrary.onclick = showStorySelection; 
    container.appendChild(btnLibrary);
}

function renderScene(sceneId, isUndo = false, actionFeedback = null, choiceFeedback = null) {
    if (sceneId.startsWith('module_end_story_')) {
        const completedStoryId = sceneId.substring('module_end_story_'.length);
        handleModuleEnd(completedStoryId);
        return; 
    }

    const scene = window.scenes[sceneId];
    if (!scene) {
        console.error("Scene not found:", sceneId);
        if (!sceneId.startsWith('warning_')) {
            showStorySelection(); 
        }
        return;
    }
    
    if (sceneId === "start_screen_transition") {
        showStorySelection();
        return;
    }

    if (!isUndo) {
        historyStack.push({
            sceneId: gameState.currentSceneId,
            faith: gameState.faith, unity: gameState.unity, worldly_influence: gameState.worldly_influence, knowledge: gameState.knowledge,
            covenantPathProgress: [...gameState.covenantPathProgress],
            lastAction: gameState.lastAction,
            actionsTakenSinceChoice: gameState.actionsTakenSinceChoice,
            choiceMade: (actionFeedback === null && choiceFeedback !== null) ? gameState.currentSceneId : null 
        });
    }

    if (choiceFeedback !== null) {
        gameState.actionsTakenSinceChoice = 0;
    }

    gameState.currentSceneId = sceneId;

    if (!isUndo && !sceneId.startsWith('warning_') && scene.onEnter) {
        applyStats(scene.onEnter);
    }
    
    clampStats();
    if (checkGameOver()) return; 

    const protagonistPortrait = document.getElementById('protagonist-portrait');
    const castPortraitsContainer = document.getElementById('cast-portraits-container');
    const storyScrollContainer = document.getElementById('story-scroll-container');

    protagonistPortrait.src = window.ASSETS.characters[gameState.character];
    protagonistPortrait.alt = gameState.character;

    const backgroundImage = document.getElementById('background-image');
    backgroundImage.src = window.ASSETS.backgrounds[scene.backgroundAsset];
    backgroundImage.alt = `Background: ${scene.backgroundAsset}`;

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
    
    const previousFeedback = storyScrollContainer.querySelector('.action-feedback-block');
    if (previousFeedback) {
        storyScrollContainer.removeChild(previousFeedback);
    }

    const tempFeedbackDiv = document.createElement('div');
    tempFeedbackDiv.className = 'action-feedback-block';

    if (actionFeedback || choiceFeedback) {
        if (actionFeedback) {
            tempFeedbackDiv.innerHTML += `<div class="action-feedback">${actionFeedback}</div>`;
        }
        if (choiceFeedback) {
            tempFeedbackDiv.innerHTML += `<div class="choice-feedback">${choiceFeedback}</div>`;
        }
        storyScrollContainer.insertBefore(tempFeedbackDiv, document.getElementById('story-text'));
    }

    document.getElementById('story-text').innerHTML = scene.text; 
    
    updateStatsDisplay();
    updateCovenantDisplay();
    updateButtonStates(); 

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = ''; 
    
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach((choice, index) => {
            let buttonText = choice.text;
            const parenIndex = buttonText.indexOf('(');
            if (parenIndex !== -1) {
                buttonText = buttonText.substring(0, parenIndex).trim();
            }

            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = buttonText;
            btn.onclick = () => handleChoice(index, sceneId);
            choicesDiv.appendChild(btn);
        });
    } else {
        choicesDiv.innerHTML = `<button class="story-btn" onclick="showStorySelection()">Return to Library</button>`;
    }
    
    storyScrollContainer.scrollTop = storyScrollContainer.scrollHeight;
    
    checkWarning(); 
}

function handleChoice(choiceIndex, sceneId) {
    const scene = window.scenes[sceneId];
    const choice = scene.choices[choiceIndex];
    
    const oldFaith = gameState.faith;
    const oldUnity = gameState.unity;
    const oldWorld = gameState.worldly_influence;
    const oldKnowledge = gameState.knowledge;

    const effect = choice.effect || { faith: 0, unity: 0, worldly: 0, knowledge: 0 };
    
    applyStats(effect);
    
    clampStats();
    if (checkGameOver()) return;

    if (choice.covenantUnlock && !gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
        gameState.covenantPathProgress.push(choice.covenantUnlock);
    }
    
    const actualDFaith = gameState.faith - oldFaith;
    const actualDUnity = gameState.unity - oldUnity;
    const actualDWorld = gameState.worldly_influence - oldWorld;
    const actualDKnowledge = gameState.knowledge - oldKnowledge;

    let choiceStats = getStatString(actualDFaith, actualDUnity, actualDWorld, actualDKnowledge);
    let feedbackHTML = `
        <span class="feedback-title">Choice: ${choice.text}</span>
        <span class="feedback-stats">${choiceStats}</span>
        <span class="feedback-narrative">${choice.feedback}</span>
    `;

    renderScene(choice.nextScene, false, null, feedbackHTML);
}

function globalAction(actionType) {
    const isYouth = gameState.difficulty === 'Youth';
    const isEndowed = gameState.difficulty === 'Endowed';
    const actionTaken = gameState.actionsTakenSinceChoice > 0;
    const consecutivePrimary = gameState.lastAction === actionType;

    if (isEndowed && actionTaken) {
        return; 
    }
    
    const oldFaith = gameState.faith;
    const oldUnity = gameState.unity;
    const oldWorld = gameState.worldly_influence;
    const oldKnowledge = gameState.knowledge;
    
    let applyDR = false;
    
    if (isYouth) {
        if (actionTaken) { 
            applyDR = true; 
        }
    } else if (gameState.difficulty === 'Primary') { 
        if (consecutivePrimary) { 
            applyDR = true; 
        }
    } 

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
    
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    clampStats(); 
    if (checkGameOver()) return; 

    const actualDFaith = gameState.faith - oldFaith;
    const actualDUnity = gameState.unity - oldUnity;
    const actualDWorld = gameState.worldly_influence - oldWorld;
    const actualDKnowledge = gameState.knowledge - oldKnowledge;

    let actionStats = getStatString(actualDFaith, actualDUnity, actualDWorld, actualDKnowledge);
    let previousActionHTML = `
        <span class="feedback-title">Action: ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}</span>
        <span class="feedback-stats">${actionStats}</span>
        <span class="feedback-narrative">${actionText} ${scriptureRef}</span>
    `;

    gameState.lastAction = actionType;
    gameState.actionsTakenSinceChoice++; 
    
    renderScene(gameState.currentSceneId, false, previousActionHTML, null);
    
    document.getElementById("undo-btn").disabled = false;
}

function undoLastAction() {
    if (historyStack.length > 0) {
        const previousState = historyStack.pop();

        gameState.faith = previousState.faith;
        gameState.unity = previousState.unity;
        gameState.worldly_influence = previousState.worldly_influence;
        gameState.knowledge = previousState.knowledge;
        gameState.covenantPathProgress = previousState.covenantPathProgress;
        gameState.lastAction = previousState.lastAction;
        gameState.actionsTakenSinceChoice = previousState.actionsTakenSinceChoice;

        updateStatsDisplay(); 

        let sceneToRender = previousState.sceneId;

        if (previousState.choiceMade) {
             sceneToRender = previousState.choiceMade;
        }

        document.getElementById("undo-btn").disabled = historyStack.length === 0;

        renderScene(sceneToRender, true, null, null);
    }
}

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

function updateButtonStates() {
    const studyBtn = document.getElementById('btn-study');
    const prayBtn = document.getElementById('btn-pray');
    const serviceBtn = document.getElementById('btn-service');

    const isEndowedRestricted = (gameState.difficulty === 'Endowed' && gameState.actionsTakenSinceChoice >= 1); 
    
    prayBtn.disabled = isEndowedRestricted;
    serviceBtn.disabled = isEndowedRestricted;

    if (studyBtn) {
        studyBtn.disabled = !gameState.hasBrassPlates || isEndowedRestricted;
        studyBtn.title = studyBtn.disabled ? "The Records must first be obtained." : "";
    }
}

function getStatString(dF, dU, dW, dK) {
    let parts = [];
    
    function getStatClass(statName, delta) {
        if (delta === 0) return 'neutral';
        if (statName === 'Faith' || statName === 'Unity' || statName === 'Knowledge') {
            return delta > 0 ? 'good-stat' : 'bad-stat';
        } 
        if (statName === 'Worldly') {
            return delta < 0 ? 'good-stat' : 'bad-stat';
        }
        return 'neutral';
    }

    const formatStat = (statName, delta) => {
        if (delta === 0) return null; 
        
        const className = getStatClass(statName, delta);
        const sign = delta > 0 ? '+' : '';
        const roundedVal = Math.round(delta * 10) / 10;
        const displayVal = sign + roundedVal.toFixed(1);

        return `<span class="stat-change ${className}">${statName}: ${displayVal}</span>`;
    };

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

function checkWarning() {
    if (gameState.currentSceneId.startsWith('warning_')) return false;

    const LOW_THRESHOLD = 5.0; 
    const HIGH_THRESHOLD = window.MAX_STAT - 5.0; 

    let warningScene = null;

    if (gameState.faith < LOW_THRESHOLD) warningScene = 'warning_low_faith';
    else if (gameState.unity < LOW_THRESHOLD) warningScene = 'warning_low_unity';
    else if (gameState.worldly_influence > HIGH_THRESHOLD) warningScene = 'warning_high_world';

    if (warningScene) {
        renderScene(warningScene, true, null, null);
        return true; 
    }
    return false;
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

window.onload = function() {
    populateStoryCharacters(); // <-- Execute this first!
    showStorySelection();
};