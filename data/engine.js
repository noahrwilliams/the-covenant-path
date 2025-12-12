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
    renderScene(gameState.currentSceneId, true);
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback").innerText = "↺ Undid last action.";
    document.getElementById("feedback").classList.remove('penalty');
}

function startGame(characterName) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('gameplay-area').style.display = 'block';
    document.getElementById('left-panel').style.display = 'block';
    document.getElementById('global-actions-bar').style.display = 'flex';
    document.querySelector('.covenant-tracker').style.display = 'block';

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

function renderScene(sceneId, isUndo = false) {
    if (sceneId === "start_screen_transition") {
        window.location.reload(); 
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

    document.getElementById("story-text").innerHTML = scene.text;
    updateStatsDisplay();
    updateCovenantDisplay();
    updateGlobalActionButtonStates();

    if (!isUndo) {
        document.getElementById("feedback").style.display = "none";
    }

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

function updateStatsDisplay() {
    document.getElementById("score-faith").innerText = gameState.faith;
    document.getElementById("score-unity").innerText = gameState.unity;
    document.getElementById("score-world").innerText = gameState.worldly_influence;
    document.getElementById("score-knowledge").innerText = gameState.knowledge.toFixed(1);

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
        studyBtn.title = "Action unavailable: You must retrieve the Brass Plates before you can study them.";
    } else {
        studyBtn.disabled = false;
        studyBtn.title = "";
    }
}

function updateCovenantDisplay() {
    const nextStep = window.COVENANT_STEPS.find(step => !gameState.covenantPathProgress.includes(step));
    const display = document.getElementById("covenant-step-display");
    display.innerText = nextStep || "Path Complete: Endure to the End";
    display.style.color = nextStep ? "#6d5e41" : "#27ae60";
}

function displayFeedback(html, isPenalty) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.style.display = "block";
    feedbackDiv.innerHTML = html;
    if (isPenalty) {
        feedbackDiv.classList.add('penalty');
    } else {
        feedbackDiv.classList.remove('penalty');
    }
}

function clampStats() {
    gameState.faith = Math.min(Math.max(gameState.faith, 0), window.MAX_STAT);
    gameState.unity = Math.min(Math.max(gameState.unity, 0), window.MAX_STAT);
    gameState.worldly_influence = Math.min(Math.max(gameState.worldly_influence, 0), window.MAX_STAT);
    gameState.knowledge = Math.min(Math.max(gameState.knowledge, 0), window.MAX_STAT);
}

function makeChoice(choice) {
    saveState(); 

    let feedbackHTML = choice.feedback + "<br><br><strong>Effects:</strong><br>";
    let penaltyApplied = false;
    
    let dFaith = choice.effect.faith || 0;
    let dUnity = choice.effect.unity || 0;
    let dWorld = choice.effect.worldly || 0;
    let dKnowledge = choice.effect.knowledge || 0;

    if (gameState.worldly_influence > 15) {
        dFaith -= 1;
        dUnity -= 1;
        penaltyApplied = true;
    }
    
    if (gameState.knowledge >= 3 && dFaith > 0) {
        const knowledgeBonus = 2;
        dFaith += knowledgeBonus; 
        feedbackHTML += `<span style="color:#2980b9; font-size:0.9em;">(Knowledge Bonus Applied: +${knowledgeBonus} Faith)</span><br>`;
    }

    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    clampStats(); 

    if (choice.covenantUnlock) {
        if (!gameState.covenantPathProgress.includes(choice.covenantUnlock)) {
            gameState.covenantPathProgress.push(choice.covenantUnlock);
            feedbackHTML += `<span style="color:#27ae60">★ COVENANT STEP ACHIEVED: ${choice.covenantUnlock}</span><br>`;
        }
    }

    let details = [];
    if (dFaith !== 0) details.push(`Faith: ${dFaith > 0 ? '+' : ''}${dFaith}`);
    if (dUnity !== 0) details.push(`Unity: ${dUnity > 0 ? '+' : ''}${dUnity}`);
    if (dWorld !== 0) details.push(`Worldly Infl.: ${dWorld > 0 ? '+' : ''}${dWorld}`);
    if (dKnowledge !== 0) details.push(`Knowledge: ${dKnowledge > 0 ? '+' : ''}${dKnowledge.toFixed(1)}`);
    
    feedbackHTML += details.join(", ");

    if (penaltyApplied) {
        feedbackHTML += `<br><span style="color:red; font-size:0.9em;">(Penalty applied due to high Worldly Influence)</span>`;
    }

    displayFeedback(feedbackHTML, penaltyApplied);
    gameState.lastAction = 'scene_choice'; 
    renderScene(choice.nextScene);
}

function globalAction(actionType) {
    saveState(); 

    let dFaith = 0, dUnity = 0, dWorld = 0, dKnowledge = 0;
    let feedback = "";
    let isConsecutive = (gameState.lastAction === actionType);

    if (actionType === 'study' && !gameState.hasBrassPlates) {
        historyStack.pop(); 
        displayFeedback("You do not yet have the Brass Plates. You cannot study the records at this time.");
        return;
    }

    switch(actionType) {
        case 'pray':
            dFaith = 2; dWorld = -5; dUnity = -1; 
            feedback = "You withdrew to pray. Peace fills your soul, though your family missed your help. (See Alma 37:37)";
            break;

        case 'study':
            dFaith = 1; dWorld = -1; dUnity = -1;
            if (isConsecutive) {
                dKnowledge = 0.5;
                feedback = "You studied again. The gains are smaller as your mind tires. (See 2 Nephi 28:30)";
            } else {
                dKnowledge = 1.0;
                feedback = "You poured over the plates. Your understanding deepens. (See 1 Nephi 19:23)";
            }
            
            if (dKnowledge > 0 && !gameState.covenantPathProgress.includes("Knowledge")) {
                feedback += `<br><span style="color:#27ae60">★ COVENANT STEP ACHIEVED: Knowledge</span>`;
                gameState.covenantPathProgress.push("Knowledge");
            }
            break;
            
        case 'service':
            dFaith = -1; dWorld = 2; dUnity = 2;
            feedback = "You served your family. Unity grows, though your spiritual focus was briefly set aside. (See Mosiah 2:17)";
            break;
    }
    
    gameState.faith += dFaith;
    gameState.unity += dUnity;
    gameState.worldly_influence += dWorld;
    gameState.knowledge += dKnowledge;
    
    clampStats(); 

    let details = [];
    if (dFaith !== 0) details.push(`Faith: ${dFaith > 0 ? '+' : ''}${dFaith}`);
    if (dUnity !== 0) details.push(`Unity: ${dUnity > 0 ? '+' : ''}${dUnity}`);
    if (dWorld !== 0) details.push(`Worldly Infl.: ${dWorld > 0 ? '+' : ''}${dWorld}`);
    if (dKnowledge !== 0) details.push(`Knowledge: ${dKnowledge > 0 ? '+' : ''}${dKnowledge.toFixed(1)}`);
    
    feedback += `<br><br><strong>Effects:</strong><br>${details.join(", ")}`;

    displayFeedback(feedback, false);
    updateStatsDisplay();
    updateCovenantDisplay();
    gameState.lastAction = actionType;
    
    document.getElementById("undo-btn").disabled = false;
    document.getElementById("undo-btn").style.opacity = "1";
}