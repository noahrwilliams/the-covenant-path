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

function saveState() {
    historyStack.push(JSON.stringify(gameState));
}

function undoLastAction() {
    if (historyStack.length === 0) return;
    const previousState = JSON.parse(historyStack.pop());
    gameState = previousState;
    renderScene(gameState.currentSceneId, true, null); 
}

function goToStartScreen() {
    if(confirm("Change character? Progress will be lost.")) {
        document.getElementById('start-screen').style.display = 'flex';
    }
}

function startGame(characterName) {
    document.getElementById('start-screen').style.display = 'none';
    const stats = window.STARTING_STATS[characterName];
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
    if (gameState.faith <= 0) {
        renderScene("game_over_faith");
        return true;
    }
    if (gameState.unity <= 0) {
        renderScene("game_over_unity");
        return true;
    }
    return false;
}

function renderScene(sceneId, isUndo = false, actionFeedback = null) {
    if (sceneId === "start_screen_transition") {
        window.location.reload(); 
        return;
    }

    if (sceneId === "game_over_faith") {
        document.getElementById("story-text").innerHTML = "<h2 style='color:darkred'>Spiritual Darkness</h2>You have lost the Spirit. Without faith, the Liahona ceases to work. You wander the wilderness for years, lost and bitter, until you can go no further.<br><br><b>GAME OVER</b>";
        document.getElementById("choices").innerHTML = "<button class='choice-btn' onclick='location.reload()'>Try Again</button>";
        return;
    }
    if (sceneId === "game_over_unity") {
        document.getElementById("story-text").innerHTML = "<h2 style='color:darkred'>Family Fracture</h2>The contention becomes violent. The family separates in the wilderness, never to see the Promised Land. The journey has failed.<br><br><b>GAME OVER</b>";
        document.getElementById("choices").innerHTML = "<button class='choice-btn' onclick='location.reload()'>Try Again</button>";
        return;
    }

    const scene = window.scenes[sceneId];
    if (!scene) { console.error("Scene not found:", sceneId); return; }
    
    gameState.currentSceneId = sceneId;

    document.getElementById("background-image").src = window.ASSETS.backgrounds[scene.backgroundAsset] || window.ASSETS.backgrounds["jerusalem_street"];
    document.getElementById("protagonist-portrait").src = window.ASSETS.characters[gameState.character];
    
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

    let fullText = "";
    if (actionFeedback) {
        fullText += `<div class='action-feedback-highlight'>${actionFeedback}</div>`;
    }
    fullText += scene.text;
    document.getElementById("story-text").innerHTML = fullText;

    updateStatsDisplay();
    updateCovenantDisplay();
    updateGlobalActionButtonStates();

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; 
    scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = choice.text; 
        btn.onclick = () => makeChoice(choice);
        choicesDiv.appendChild(btn);
    });

    const undoBtn = document.getElementById("undo-btn");
    undoBtn.disabled = (historyStack.length === 0);
    undoBtn.style.opacity = (historyStack.length === 0) ? "0.5" : "1";
}

// 3-STAGE COLOR LOGIC: Red <= 4, Orange 5-6, Default 7+
function updateStatsDisplay() {
    const CRITICAL_THRESHOLD = 4;
    const WARNING_THRESHOLD = 6;
    const STATS = ["faith", "unity"];

    STATS.forEach(stat => {
        const value = gameState[stat];
        const element = document.getElementById(`score-${stat}`);
        element.innerText = value;
        
        if (value <= CRITICAL_THRESHOLD) {
            element.style.color = "red";
        } else if (value <= WARNING_THRESHOLD) {
            element.style.color = "#e67e22"; /* Orange */
        } else {
            element.style.color = "inherit";
        }
    });

    // Worldly Influence (Separate Logic)
    document.getElementById("score-world").innerText = gameState.worldly_influence;
    const worldElem = document.getElementById("score-world");
    if(gameState.worldly_influence > 15) {
        worldElem.style.color = "red";
        worldElem.style.fontWeight = "900";
    } else {
        worldElem.style.color = "inherit";
        worldElem.style.fontWeight = "bold";
    }
}

function updateGlobalActionButtonStates() {
    const studyBtn = document.getElementById('btn-study');
    if (!gameState.hasBrassPlates) {
        studyBtn.disabled = true;
    } else {
        studyBtn.disabled = false;
    }
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS.find(step => !gameState.covenantPathProgress.includes(step));
    const display = document.getElementById("covenant-step-display");
    display.innerText = nextStep || "Path Complete";
    display.style.color = nextStep ? "#6d5e41" : "#27ae60";
}

function clampStats() {
    gameState.faith = Math.min(Math.max(gameState.faith, 0), window.MAX_STAT);
    gameState.unity = Math.min(Math.max(gameState.unity, 0), window.MAX_STAT);
    gameState.worldly_influence = Math.min(Math.max(gameState.worldly_influence, 0), window.MAX_STAT);
    gameState.knowledge = Math.min(Math.max(gameState.knowledge, 0), window.MAX_STAT);
}

function formatStatChanges(dF, dU, dW, dK) {
    let parts = [];
    if (dF !== 0) parts.push(`Faith ${dF > 0 ? '+' : ''}${dF}`);
    if (dU !== 0) parts.push(`Unity ${dU > 0 ? '+' : ''}${dU}`);
    if (dW !== 0) parts.push(`Worldly ${dW > 0 ? '+' : ''}${dW}`);
    if (dK !== 0) parts.push(`Know. ${dK > 0 ? '+' : ''}${dK.toFixed(1)}`);
    return parts.length > 0 ? `<span class='stat-change-text'>(${parts.join(", ")})</span>` : "";
}

function makeChoice(choice) {
    saveState(); 

    let dFaith = choice.effect.faith || 0;
    let dUnity = choice.effect.unity || 0;
    let dWorld = choice.effect.worldly || 0;
    let dKnowledge = choice.effect.knowledge || 0;

    let penaltyText = "";
    if (gameState.worldly_influence > 15) {
        dFaith -= 1;
        dUnity -= 1;
        penaltyText = " <span style='color:red'>(Penalty: High Worldly Influence)</span>";
    }
    
    if (gameState.knowledge >= 3 && dFaith > 0) {
        dFaith += 1; 
    }

    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;

    if (choice.covenantUnlock) {
        if (!gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
            gameState.covenantPathProgress.push(choice.covenantUnlock);
        }
    }
    
    if (choice.setFlag) {
        gameState[choice.setFlag] = true;
    }

    // CHECK FOR NEXT SCENE EVENT IMPACT (onEnter)
    let nextSceneObj = window.scenes[choice.nextScene];
    let eventText = "";
    
    if (nextSceneObj && nextSceneObj.onEnter) {
        let eF = nextSceneObj.onEnter.faith || 0;
        let eU = nextSceneObj.onEnter.unity || 0;
        let eW = nextSceneObj.onEnter.worldly || 0;
        
        gameState.faith += eF;
        gameState.unity += eU;
        gameState.worldly_influence += eW;
        
        eventText = `<br><span style="color:darkred; font-weight:bold;">EVENT IMPACT: ${formatStatChanges(eF, eU, eW, 0)}</span>`;
    }
    
    clampStats(); 
    
    if (checkGameOver()) return;

    let statSummary = formatStatChanges(dFaith, dUnity, dWorld, dKnowledge);
    let actionFeedback = `You chose: "${choice.text}"<br>${statSummary}${penaltyText}${eventText}`;
    
    gameState.lastAction = 'scene_choice'; 
    renderScene(choice.nextScene, false, actionFeedback);
}

function globalAction(actionType) {
    saveState(); 

    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let actionText = "";
    let isConsecutive = (gameState.lastAction === actionType);

    if (actionType === 'study' && !gameState.hasBrassPlates) {
        historyStack.pop(); 
        alert("You do not yet have the Brass Plates.");
        return;
    }

    switch(actionType) {
        case 'pray':
            dFaith = 2; dWorld = -3; dUnity = -1; 
            actionText = "You withdrew to pray. Peace fills your soul, but the family works without you.";
            break;

        case 'study':
            dFaith = 1; dWorld = -1; dUnity = -1;
            if (isConsecutive) {
                dKnowledge = 0.2; 
                actionText = "You studied again (diminishing returns).";
            } else {
                dKnowledge = 0.8; 
                actionText = "You poured over the plates. Your understanding deepens.";
            }
            
            if (dKnowledge > 0 && !gameState.covenantPathProgress.includes("Knowledge")) {
                gameState.covenantPathProgress.push("Knowledge");
            }
            break;
            
        case 'service':
            dFaith = -1; dWorld = 2; dUnity = 2;
            actionText = "You served your family. Unity grows, but your spiritual focus wanes.";
            break;
    }
    
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    clampStats(); 
    if (checkGameOver()) return;

    let statSummary = formatStatChanges(dFaith, dUnity, dWorld, dKnowledge);
    let actionFeedback = `${actionText}<br>${statSummary}`;

    gameState.lastAction = actionType;
    
    renderScene(gameState.currentSceneId, false, actionFeedback);
    
    document.getElementById("undo-btn").disabled = false;
    document.getElementById("undo-btn").style.opacity = "1";
}