// STATE MANAGEMENT
let gameState = {
    character: null,
    faith: 0, unity: 0, worldly_influence: 0, knowledge: 0,
    hasBrassPlates: false,
    currentSceneId: null,
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
    container.innerHTML = "<h3 style='color:#6d5e41; margin-bottom:20px;'>Choose a Story Module</h3>";

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
            <div class="story-title">${title}</div>
            <div class="story-desc">${narrative}</div>
            <div class="story-ref">${reference}</div>
        `;
        
        if (!isAvailable) {
            btn.disabled = true;
            btn.style.opacity = "0.6";
            btn.innerHTML += `
                <div style="font-size:0.7em; margin-top:8px; color:#ffd700; font-weight:bold; text-transform:uppercase;">
                    🔒 Coming Soon
                </div>`;
        } else {
            btn.onclick = () => showStoryDetails(story);
        }
        
        container.appendChild(btn);
    });
}

function showStoryDetails(story) {
    const container = document.getElementById('menu-container');
    let html = `
        <div class="detail-view">
            <button class="back-btn" onclick="showStorySelection()">← Back to Library</button>
            <h2 style="color:#6d5e41; border-bottom:1px solid #d4c5a9; padding-bottom:10px;">${story.title}</h2>
            <div class="detail-desc">${story.narrative}</div>
            <h4 style="margin-top:20px; color:#2c3e50;">Choose Your Perspective</h4>
            <p style="font-size:0.85em; color:#666; margin-bottom:15px;">Select a character to begin their unique covenant journey.</p>
    `;
    
    story.characters.forEach(charKey => {
        const stats = window.STARTING_STATS[charKey];
        if (stats) {
            // Remove underscores and "S2" suffixes for display
            const displayName = charKey.replace(/_/g, " ").replace("S2", "").replace("WifeOf", "Wife of ");
            html += `
                <button class="story-btn" onclick="startGame('${charKey}')" style="background-color:#5d737e;">
                    <span class="story-title" style="color:white;">${displayName}</span>
                    <span class="story-desc" style="font-size:0.85em; color:#eee;">${stats.bio || "Embark on the path of faith."}</span>
                </button>`;
        }
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// === GAMEPLAY LOGIC ===

function saveState() {
    historyStack.push(JSON.stringify(gameState));
}

function undoLastAction() {
    if (historyStack.length === 0) return;
    const previousState = JSON.parse(historyStack.pop());
    gameState = previousState;
    renderScene(gameState.currentSceneId, true, null, null); 
}

function goToStartScreen() {
    if(confirm("Change character? Progress in this module will be lost.")) {
        showStorySelection(); 
    }
}

function startGame(characterName) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('gameplay-panel').style.display = 'flex'; 
    document.getElementById('visuals-area').style.display = 'block';
    
    const stats = window.STARTING_STATS[characterName];
    if(!stats) {
        console.error("Stats not found for character:", characterName);
        return;
    }

    gameState.character = characterName;
    gameState.faith = stats.faith;
    gameState.unity = stats.unity;
    gameState.worldly_influence = stats.worldly_influence;
    gameState.knowledge = stats.knowledge;
    gameState.hasBrassPlates = stats.hasBrassPlates; 
    gameState.covenantPathProgress = [];
    gameState.lastAction = null;
    historyStack = [];
    renderScene(stats.initialScene);
}

function checkGameOver() {
    if (gameState.faith <= 0) { renderScene("game_over_faith"); return true; }
    if (gameState.unity <= 0) { renderScene("game_over_unity"); return true; }
    return false;
}

function renderScene(sceneId, isUndo = false, previousActionHTML = null, eventImpactHTML = null) {
    if (sceneId === "start_screen_transition") { showStorySelection(); return; }

    if (sceneId === "game_over_faith") {
        document.getElementById("story-text").innerHTML = "<h2 style='color:darkred'>Spiritual Darkness</h2>You have lost the Spirit. Without faith, your direction is lost. You wander the wilderness for years, lost and bitter.<br><br><b>GAME OVER</b>";
        document.getElementById("choices").innerHTML = "<button class='choice-btn' onclick='showStorySelection()'>Return to Menu</button>";
        return;
    }
    if (sceneId === "game_over_unity") {
        document.getElementById("story-text").innerHTML = "<h2 style='color:darkred'>Family Fracture</h2>The contention becomes violent. The family separates in anger, and the covenant bond is broken.<br><br><b>GAME OVER</b>";
        document.getElementById("choices").innerHTML = "<button class='choice-btn' onclick='showStorySelection()'>Return to Menu</button>";
        return;
    }

    const scene = window.scenes[sceneId];
    if (!scene) { 
        console.error("Scene not found:", sceneId); 
        document.getElementById("story-text").innerHTML = "Error: Scene not found. Returning to menu...";
        setTimeout(showStorySelection, 2000);
        return; 
    }
    
    gameState.currentSceneId = sceneId;

    // Visual Updates
    document.getElementById("background-image").src = window.ASSETS.backgrounds[scene.backgroundAsset] || "https://placehold.co/750x300/333/FFF?text=Scene+Background";
    document.getElementById("protagonist-portrait").src = window.ASSETS.characters[gameState.character] || "https://placehold.co/140x180/888/FFF?text=Character";
    
    const castContainer = document.getElementById("cast-portraits-container");
    castContainer.innerHTML = ""; 
    if (scene.castAssets) {
        scene.castAssets.forEach(charName => {
            if(window.ASSETS.characters[charName] && charName !== gameState.character) {
                const img = document.createElement("img");
                img.src = window.ASSETS.characters[charName];
                img.alt = charName;
                img.className = "cast-portrait";
                img.title = charName;
                castContainer.appendChild(img);
            }
        });
    }

    // Text Display
    let fullText = "";
    if (previousActionHTML) fullText += `<div class='action-feedback-block'>${previousActionHTML}</div>`;
    fullText += `${scene.text}`;
    if (eventImpactHTML) fullText += `<div class='event-impact-block'><strong style='color:#555'>EVENT IMPACT:</strong> ${eventImpactHTML}</div>`;

    document.getElementById("story-text").innerHTML = fullText;

    updateStatsDisplay();
    updateCovenantDisplay();
    updateGlobalActionButtonStates();

    // Choices
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; 
    scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = choice.text; 
        btn.onclick = () => makeChoice(choice);
        choicesDiv.appendChild(btn);
    });

    // UI elements
    const undoBtn = document.getElementById("undo-btn");
    undoBtn.disabled = (historyStack.length === 0);
    undoBtn.style.opacity = (historyStack.length === 0) ? "0.5" : "1";
    
    const scrollContainer = document.getElementById("story-scroll-container");
    if(scrollContainer) scrollContainer.scrollTop = 0;
}

function updateStatsDisplay() {
    const STATS = ["faith", "unity"];
    STATS.forEach(stat => {
        const value = gameState[stat];
        const element = document.getElementById(`score-${stat}`);
        if(element) {
            element.innerText = value;
            element.style.color = (value <= 5) ? "#c0392b" : "inherit";
        }
    });

    const worldElem = document.getElementById("score-world");
    const knowElem = document.getElementById("score-knowledge");
    if(worldElem) worldElem.innerText = Math.floor(gameState.worldly_influence);
    if(knowElem) knowElem.innerText = Math.floor(gameState.knowledge);
}

function updateGlobalActionButtonStates() {
    const studyBtn = document.getElementById('btn-study');
    if (studyBtn) {
        studyBtn.disabled = !gameState.hasBrassPlates;
        studyBtn.style.opacity = gameState.hasBrassPlates ? "1" : "0.5";
    }
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS.find(step => !gameState.covenantPathProgress.includes(step));
    const display = document.getElementById("covenant-step-display");
    if(display) {
        display.innerText = nextStep || "Path Complete";
        display.style.color = nextStep ? "#6d5e41" : "#27ae60";
    }
}

function clampStats() {
    gameState.faith = Math.min(Math.max(gameState.faith, 0), window.MAX_STAT);
    gameState.unity = Math.min(Math.max(gameState.unity, 0), window.MAX_STAT);
    gameState.worldly_influence = Math.min(Math.max(gameState.worldly_influence, 0), window.MAX_STAT);
    gameState.knowledge = Math.min(Math.max(gameState.knowledge, 0), window.MAX_STAT);
}

function formatStatHTML(name, val, isBadIfHigh = false) {
    if (val === 0) return "";
    let isGood = isBadIfHigh ? val < 0 : val > 0;
    let color = isGood ? "#27ae60" : "#c0392b"; 
    let sign = val > 0 ? "+" : "";
    return `<span style="color:${color}; margin-right:8px;">${name} ${sign}${val}</span>`;
}

function getStatString(dF, dU, dW, dK) {
    let s = "";
    s += formatStatHTML("Faith", dF);
    s += formatStatHTML("Unity", dU);
    s += formatStatHTML("Worldly", dW, true); 
    s += formatStatHTML("Know.", dK);
    return s;
}

function makeChoice(choice) {
    saveState(); 

    let dFaith = choice.effect.faith || 0;
    let dUnity = choice.effect.unity || 0;
    let dWorld = choice.effect.worldly || 0;
    let dKnowledge = choice.effect.knowledge || 0;

    // Mechanics
    if (gameState.worldly_influence > 15) { dFaith -= 1; dUnity -= 1; }
    if (gameState.knowledge >= 5 && dFaith > 0) dFaith += 1; 

    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;

    if (choice.covenantUnlock && !gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
        gameState.covenantPathProgress.push(choice.covenantUnlock);
    }
    
    if (choice.setFlag) gameState[choice.setFlag] = true;

    let nextSceneObj = window.scenes[choice.nextScene];
    let eventImpactHTML = null;
    
    if (nextSceneObj && nextSceneObj.onEnter) {
        gameState.faith += (nextSceneObj.onEnter.faith || 0);
        gameState.unity += (nextSceneObj.onEnter.unity || 0);
        gameState.worldly_influence += (nextSceneObj.onEnter.worldly || 0);
        eventImpactHTML = getStatString(nextSceneObj.onEnter.faith || 0, nextSceneObj.onEnter.unity || 0, nextSceneObj.onEnter.worldly || 0, 0);
    }
    
    clampStats(); 
    if (checkGameOver()) return;

    let actionStats = getStatString(dFaith, dUnity, dWorld, dKnowledge);
    let previousActionHTML = `
        <span class="feedback-title">You chose: "${choice.text}"</span>
        <span class="feedback-stats">${actionStats}</span>
        <span class="feedback-narrative">${choice.feedback || ""}</span>
    `;
    
    gameState.lastAction = 'scene_choice'; 
    renderScene(choice.nextScene, false, previousActionHTML, eventImpactHTML);
}

function globalAction(actionType) {
    saveState(); 
    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let actionText = "";
    let scriptureRef = ""; 

    switch(actionType) {
        case 'pray':
            dFaith = 2; dWorld = -3; dUnity = -1; 
            actionText = "You withdrew to pray.";
            scriptureRef = "(See Alma 37:37)";
            break;
        case 'study':
            dFaith = 1; dWorld = -1; dKnowledge = 1;
            actionText = "You poured over the plates.";
            scriptureRef = "(See 1 Nephi 19:23)";
            break;
        case 'service':
            dFaith = -1; dWorld = 1; dUnity = 2;
            actionText = "You served your family.";
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
        <span class="feedback-title">${actionText}</span>
        <span class="feedback-stats">${actionStats}</span>
        <span class="feedback-narrative">${scriptureRef}</span>
    `;
    renderScene(gameState.currentSceneId, false, previousActionHTML, null);
}

window.onload = function() {
    showStorySelection();
}