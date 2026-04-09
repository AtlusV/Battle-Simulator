const STANDARD_TYPE_ORDER = [
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground",
  "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy", "Stellar", "Wind",
];

const TYPE_COLORS = {
  Normal: "#cdbb8f", Fire: "#ff8d5c", Water: "#67b7ff", Electric: "#ffd85c", Grass: "#7fdb7f",
  Ice: "#8de9ff", Fighting: "#ff7e78", Poison: "#d184ff", Ground: "#d5a76e", Flying: "#b0c4ff",
  Psychic: "#ff8aca", Bug: "#a8d05b", Rock: "#c9a56a", Ghost: "#9e91ff", Dragon: "#7b8cff",
  Dark: "#877a73", Steel: "#afc4d5", Fairy: "#ffb5ea", Stellar: "#ffe08c", Wind: "#90f0da",
};

const STAT_LABELS = {
  hp: "HP", attack: "Atk", defense: "Def", spattack: "SpA", spdefense: "SpD", speed: "Spe", accuracy: "Acc", evasion: "Eva",
};

const BATTLE_STAGE_KEYS = ["attack", "defense", "spattack", "spdefense", "speed", "accuracy", "evasion"];
const SELF_TARGETS = new Set(["user", "ally", "user-or-ally", "users-field", "user-and-allies", "all-allies"]);
const PROTECT_MOVES = new Set(["protect", "detect", "burning-bulwark"]);
const SELF_DESTRUCT_MOVES = new Set(["explosion", "self-destruct", "memento", "mind-blown", "final-gambit"]);
const CLEAR_ALL_BOOST_MOVES = new Set(["haze"]);
const CLEAR_TARGET_BOOST_MOVES = new Set(["clear-smog"]);
const FORCE_SWITCH_MOVES = new Set(["roar", "whirlwind", "dragon-tail", "circle-throw"]);

const TYPE_BOOST_ITEMS = {
  "Silk Scarf": "Normal", Charcoal: "Fire", "Mystic Water": "Water", Magnet: "Electric", "Miracle Seed": "Grass",
  "Never-Melt Ice": "Ice", "Black Belt": "Fighting", "Poison Barb": "Poison", "Soft Sand": "Ground",
  "Sharp Beak": "Flying", "Twisted Spoon": "Psychic", "Silver Powder": "Bug", "Hard Stone": "Rock",
  "Spell Tag": "Ghost", "Dragon Fang": "Dragon", "Black Glasses": "Dark", "Metal Coat": "Steel", "Pixie Plate": "Fairy",
};

const ITEM_CATALOG = [
  "Leftovers", "Black Sludge", "Sitrus Berry", "Oran Berry", "Lum Berry", "Chesto Berry", "Life Orb", "Focus Sash",
  "Rocky Helmet", "Shell Bell", "Expert Belt", "Choice Band", "Choice Specs", "Choice Scarf", "Assault Vest",
  "Air Balloon", "Weakness Policy", "Quick Claw", "Scope Lens", "King's Rock", "Razor Fang", "Flame Orb", "Toxic Orb",
  "Muscle Band", "Wise Glasses", "Silk Scarf", "Charcoal", "Mystic Water", "Magnet", "Miracle Seed", "Never-Melt Ice",
  "Black Belt", "Poison Barb", "Soft Sand", "Sharp Beak", "Twisted Spoon", "Silver Powder", "Hard Stone",
  "Spell Tag", "Dragon Fang", "Black Glasses", "Metal Coat", "Pixie Plate",
];

const FIXED_DAMAGE_MOVES = {
  "sonic-boom": () => 20,
  "dragon-rage": () => 40,
  "seismic-toss": (user) => user.level,
  "night-shade": (user) => user.level,
  "super-fang": (_, target) => Math.max(1, Math.floor(target.hp / 2)),
  ruination: (_, target) => Math.max(1, Math.floor(target.hp / 2)),
  "natures-madness": (_, target) => Math.max(1, Math.floor(target.hp / 2)),
  endeavor: (user, target) => Math.max(0, target.hp - user.hp),
  "final-gambit": (user) => user.hp,
};

const MAJOR_STATUS_LABELS = {
  burn: "BRN", poison: "PSN", tox: "TOX", paralysis: "PAR", sleep: "SLP", freeze: "FRZ", confusion: "CFN",
};

const CUSTOM_MOVE_EFFECT_TARGETS = [
  { value: "target", label: "Target" },
  { value: "user", label: "User" },
];

const CUSTOM_MOVE_MODIFIER_TYPES = [
  { value: "raise-stat", label: "Raise Stat" },
  { value: "lower-stat", label: "Lower Stat" },
  { value: "inflict-status", label: "Inflict Status" },
  { value: "flinch", label: "Flinch" },
  { value: "heal", label: "Heal" },
  { value: "drain", label: "Drain" },
  { value: "recoil", label: "Recoil" },
];

const CUSTOM_MOVE_STATUS_OPTIONS = [
  { value: "", label: "None" },
  { value: "burn", label: "Burn" },
  { value: "poison", label: "Poison" },
  { value: "tox", label: "Bad Poison" },
  { value: "paralysis", label: "Paralysis" },
  { value: "sleep", label: "Sleep" },
  { value: "freeze", label: "Freeze" },
  { value: "confusion", label: "Confusion" },
];

const dom = {};
const moveCatalog = Array.isArray(window.OFFICIAL_MOVES) ? window.OFFICIAL_MOVES : [];
const battleCatalog = window.BATTLE_DATA?.moves || {};
const typeChart = window.BATTLE_DATA?.typeChart || {};
const moveLookup = new Map();
const battleMoveLookup = new Map();
const itemLookup = new Map();

const state = {
  loadedFileName: "",
  sourceSave: null,
  speciesList: [],
  speciesById: new Map(),
  speciesLookup: new Map(),
  activeRosterKey: "alpha",
  selectedSpeciesId: "",
  customMoves: [],
  customMoveById: new Map(),
  selectedCustomMoveId: "",
  searchTerm: "",
  typeFilter: "all",
  availableTypes: STANDARD_TYPE_ORDER.slice(),
  rosters: {
    alpha: createRosterState("alpha", "Team A", true),
    beta: createRosterState("beta", "Team B", false),
  },
  battle: createEmptyBattleState(),
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheDom();
  buildMoveLookup();
  buildItemLookup();
  seedMoveDatalist();
  seedItemDatalist();
  bindEvents();
  renderTypeFilter();
  renderRosterTabs();
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderMoveLab();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();
}

function cacheDom() {
  dom.fileInput = document.getElementById("file-input");
  dom.resetButton = document.getElementById("reset-button");
  dom.downloadSaveButton = document.getElementById("download-save-button");
  dom.exportButton = document.getElementById("export-button");
  dom.importButton = document.getElementById("import-button");
  dom.copyButton = document.getElementById("copy-button");
  dom.cloneTeamButton = document.getElementById("clone-team-button");
  dom.clearOpponentButton = document.getElementById("clear-opponent-button");
  dom.startBattleButton = document.getElementById("start-battle-button");
  dom.resolveTurnButton = document.getElementById("resolve-turn-button");
  dom.resetBattleButton = document.getElementById("reset-battle-button");
  dom.statusText = document.getElementById("status-text");
  dom.fileName = document.getElementById("file-name");
  dom.searchInput = document.getElementById("search-input");
  dom.typeFilter = document.getElementById("type-filter");
  dom.rosterTabs = document.getElementById("roster-tabs");
  dom.selectedSlotStrip = document.getElementById("selected-slot-strip");
  dom.teamBuilder = document.getElementById("team-builder");
  dom.moveLab = document.getElementById("move-lab");
  dom.dexList = document.getElementById("dex-list");
  dom.dexDetail = document.getElementById("dex-detail");
  dom.showdownText = document.getElementById("showdown-text");
  dom.exportRosterLabel = document.getElementById("export-roster-label");
  dom.moveOptions = document.getElementById("move-options");
  dom.itemOptions = document.getElementById("item-options");
  dom.battleStatus = document.getElementById("battle-status");
  dom.battleTurn = document.getElementById("battle-turn");
  dom.battlePending = document.getElementById("battle-pending");
  dom.battleLog = document.getElementById("battle-log");
  dom.battleSideAlpha = document.getElementById("battle-side-alpha");
  dom.battleSideBeta = document.getElementById("battle-side-beta");
}

function bindEvents() {
  dom.fileInput.addEventListener("change", handleFileInput);
  dom.resetButton.addEventListener("click", resetActiveRoster);
  dom.downloadSaveButton.addEventListener("click", downloadUpdatedSave);
  dom.exportButton.addEventListener("click", () => {
    refreshShowdownPanel();
    setStatus(`Refreshed the Showdown export for ${getActiveRoster().label}.`);
  });
  dom.importButton.addEventListener("click", importShowdownText);
  dom.copyButton.addEventListener("click", copyExportText);
  dom.cloneTeamButton.addEventListener("click", cloneAlphaToBeta);
  dom.clearOpponentButton.addEventListener("click", clearBetaRoster);
  dom.startBattleButton.addEventListener("click", startBattle);
  dom.resolveTurnButton.addEventListener("click", resolveBattleTurn);
  dom.resetBattleButton.addEventListener("click", resetBattle);

  dom.searchInput.addEventListener("input", () => {
    state.searchTerm = dom.searchInput.value.trim().toLowerCase();
    renderDexList();
  });

  dom.typeFilter.addEventListener("change", () => {
    state.typeFilter = dom.typeFilter.value;
    renderDexList();
  });

  dom.rosterTabs.addEventListener("click", handleRosterTabClick);
  dom.selectedSlotStrip.addEventListener("click", handleSlotStripClick);
  dom.teamBuilder.addEventListener("click", handleTeamBuilderClick);
  dom.teamBuilder.addEventListener("change", handleTeamBuilderChange);
  dom.teamBuilder.addEventListener("input", handleTeamBuilderInput);
  dom.teamBuilder.addEventListener("focusout", handleTeamBuilderFocusOut);
  dom.moveLab.addEventListener("change", handleMoveLabChange);
  dom.moveLab.addEventListener("click", handleMoveLabClick);
  dom.dexList.addEventListener("click", handleDexListClick);
  dom.dexDetail.addEventListener("click", handleDexDetailClick);
  dom.battleSideAlpha.addEventListener("click", handleBattleSideClick);
  dom.battleSideBeta.addEventListener("click", handleBattleSideClick);
}

function handleFileInput(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      loadSave(reader.result, file.name);
      dom.fileInput.value = "";
    } catch (error) {
      setStatus(error.message || "That file could not be loaded.");
    }
  };
  reader.onerror = () => setStatus("The selected file could not be read.");
  reader.readAsText(file);
}

function loadSave(fileText, fileName) {
  let parsed;
  try {
    parsed = JSON.parse(fileText);
  } catch (error) {
    throw new Error("That file is not valid JSON.");
  }

  if (!Array.isArray(parsed.pokedex) || !Array.isArray(parsed.team)) {
    throw new Error("The save needs `pokedex` and `team` arrays.");
  }

  state.sourceSave = parsed;
  state.loadedFileName = fileName;
  rebuildCustomMoveState(parsed.movedex);
  buildMoveLookup();
  seedMoveDatalist();
  state.speciesList = buildSpeciesList(parsed.pokedex);
  state.speciesById = new Map(state.speciesList.map((species) => [species.id, species]));
  state.speciesLookup = buildSpeciesLookup(state.speciesList);
  state.availableTypes = buildAvailableTypes(state.speciesList);
  state.searchTerm = "";
  state.typeFilter = "all";
  state.activeRosterKey = "alpha";
  dom.searchInput.value = "";
  applyTheme(parsed.theme);

  const loaded = buildTeamFromSave(parsed.team);
  state.rosters.alpha.team = loaded.team;
  state.rosters.alpha.loadedSnapshot = cloneTeam(loaded.team);
  state.rosters.alpha.selectedSlot = 0;
  state.rosters.beta.team = Array.from({ length: 6 }, createEmptySlot);
  state.rosters.beta.loadedSnapshot = [];
  state.rosters.beta.selectedSlot = 0;
  state.selectedSpeciesId = state.rosters.alpha.team.find((slot) => slot.speciesId)?.speciesId || state.speciesList[0]?.id || "";
  state.battle = createEmptyBattleState();

  dom.fileName.textContent = fileName;
  renderTypeFilter();
  renderRosterTabs();
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderMoveLab();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();

  let message = `Loaded ${state.speciesList.length} species and ${loaded.team.length} Team A slots from ${fileName}.`;
  if (loaded.ignoredMoves) message += ` Ignored ${loaded.ignoredMoves} unknown move${loaded.ignoredMoves === 1 ? "" : "s"}.`;
  setStatus(message);
}

function buildSpeciesList(rawPokedex) {
  return rawPokedex.map((entry) => {
    const baseName = cleanText(entry.name);
    const form = cleanText(entry.form) || "Base";
    const customFormName = cleanText(entry.customFormName);
    const showdownName = buildShowdownName(baseName, form, customFormName);
    const displayName = buildDisplayName(baseName, form, customFormName);
    const type1 = cleanType(entry.type1);
    const type2 = cleanType(entry.type2);
    const species = {
      id: toId(showdownName),
      baseName,
      showdownName,
      displayName,
      form,
      customFormName,
      formLabel: "",
      type1,
      type2,
      types: [type1, type2].filter(Boolean),
      image: typeof entry.image === "string" ? entry.image : "",
      ability: cleanText(entry.ability),
      description: cleanText(entry.description),
      level: normalizeLevel(entry.level) || 50,
      teraType: cleanType(entry.teraType),
      stats: {
        hp: safeNumber(entry.hp),
        attack: safeNumber(entry.attack),
        defense: safeNumber(entry.defense),
        spattack: safeNumber(entry.spattack),
        spdefense: safeNumber(entry.spdefense),
        speed: safeNumber(entry.speed),
      },
    };
    species.formLabel = buildFormLabel(species);
    return species;
  }).sort(compareSpecies);
}

function buildSpeciesLookup(speciesList) {
  const lookup = new Map();
  speciesList.forEach((species) => {
    const aliases = new Set([
      toId(species.showdownName),
      toId(species.displayName),
      toId(species.baseName),
      toId(`${species.baseName} ${species.formLabel}`),
      toId(`${species.baseName}-${species.formLabel}`),
    ]);
    if (species.customFormName) {
      aliases.add(toId(`${species.baseName} ${species.customFormName}`));
      aliases.add(toId(`${species.baseName}-${species.customFormName}`));
    }
    aliases.forEach((alias) => {
      if (!alias) return;
      if (!lookup.has(alias) || species.form === "Base") lookup.set(alias, species.id);
    });
  });
  return lookup;
}

function buildAvailableTypes(speciesList) {
  const extras = new Set(STANDARD_TYPE_ORDER);
  speciesList.forEach((species) => {
    species.types.forEach((type) => extras.add(type));
    if (species.teraType) extras.add(species.teraType);
  });
  const ordered = STANDARD_TYPE_ORDER.filter((type) => extras.has(type));
  const remaining = Array.from(extras).filter((type) => !ordered.includes(type)).sort();
  return [...ordered, ...remaining];
}

function buildCustomMoveList(rawMovedex) {
  if (!Array.isArray(rawMovedex)) return [];
  return rawMovedex.map((entry, index) => {
    const rawName = cleanText(entry.rawName || entry.name);
    const name = cleanText(entry.name || rawName);
    const category = normalizeMoveCategory(entry.category);
    const battle = normalizeCustomMoveBattle(entry.battle);
    return {
      index,
      source: { ...entry },
      id: toId(name || rawName || `custom-move-${index}`),
      name,
      rawName,
      type: cleanType(entry.type) || "Normal",
      category,
      power: safeNumber(entry.power),
      description: cleanText(entry.description),
      battle,
    };
  }).filter((move) => move.name);
}

function normalizeMoveCategory(category) {
  const value = cleanText(category).toLowerCase();
  if (value === "physical" || value === "special" || value === "status") return value;
  return "physical";
}

function normalizeCustomMoveBattle(battle) {
  const modifiers = Array.isArray(battle?.modifiers) && battle.modifiers.length
    ? battle.modifiers.map((modifier, index) => normalizeCustomMoveModifier(modifier, index)).filter(Boolean)
    : buildLegacyCustomMoveModifiers(battle);
  return {
    accuracy: battle?.accuracy === "" || battle?.accuracy == null ? 100 : clamp(safeNumber(battle.accuracy) || 100, 1, 100),
    pp: Math.max(1, safeNumber(battle?.pp) || 15),
    priority: clamp(safeNumber(battle?.priority), -7, 7),
    target: battle?.target === "user" ? "user" : "selected-pokemon",
    modifiers,
  };
}

function buildLegacyCustomMoveModifiers(battle) {
  const modifiers = [];
  const statModifiers = Array.isArray(battle?.statModifiers) ? battle.statModifiers : [];
  const ailmentEffects = Array.isArray(battle?.ailmentEffects) ? battle.ailmentEffects : [];

  statModifiers.forEach((modifier, index) => {
    const normalized = normalizeCustomMoveModifier({
      id: modifier?.id || `legacy-stat-${index}`,
      type: modifier?.direction === "lower" ? "lower-stat" : "raise-stat",
      chance: modifier?.chance,
      target: modifier?.target,
      stat: modifier?.stat,
      stages: modifier?.stages,
    }, index);
    if (normalized) modifiers.push(normalized);
  });

  ailmentEffects.forEach((effect, index) => {
    const normalized = normalizeCustomMoveModifier({
      id: effect?.id || `legacy-ailment-${index}`,
      type: effect?.ailment === "flinch" ? "flinch" : "inflict-status",
      chance: effect?.chance,
      target: effect?.target,
      status: effect?.ailment,
    }, index + modifiers.length);
    if (normalized) modifiers.push(normalized);
  });

  if (safeNumber(battle?.flinchChance) > 0) {
    modifiers.push(normalizeCustomMoveModifier({
      id: "legacy-flinch",
      type: "flinch",
      chance: battle.flinchChance,
      target: "target",
    }, modifiers.length));
  }

  if (safeNumber(battle?.healing) > 0) {
    modifiers.push(normalizeCustomMoveModifier({
      id: "legacy-heal",
      type: "heal",
      chance: 100,
      target: "user",
      amount: battle.healing,
    }, modifiers.length));
  }

  if (safeNumber(battle?.drain) > 0) {
    modifiers.push(normalizeCustomMoveModifier({
      id: "legacy-drain",
      type: "drain",
      chance: 100,
      target: "user",
      amount: battle.drain,
    }, modifiers.length));
  }

  if (safeNumber(battle?.drain) < 0) {
    modifiers.push(normalizeCustomMoveModifier({
      id: "legacy-recoil",
      type: "recoil",
      chance: 100,
      target: "user",
      amount: Math.abs(safeNumber(battle.drain)),
    }, modifiers.length));
  }

  return modifiers.filter(Boolean);
}

function normalizeCustomMoveModifier(modifier, index) {
  const type = CUSTOM_MOVE_MODIFIER_TYPES.some((option) => option.value === modifier?.type) ? modifier.type : "raise-stat";
  const chance = clamp(safeNumber(modifier?.chance) || 100, 1, 100);
  const target = modifier?.target === "user" ? "user" : "target";
  const stat = BATTLE_STAGE_KEYS.includes(modifier?.stat) ? modifier.stat : "attack";
  const stages = clamp(Math.abs(safeNumber(modifier?.stages) || 1), 1, 6);
  const amount = clamp(Math.abs(safeNumber(modifier?.amount) || 25), 1, 100);
  const status = CUSTOM_MOVE_STATUS_OPTIONS.some((option) => option.value === modifier?.status) ? modifier.status : "burn";
  return {
    id: modifier?.id || `modifier-${index}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    chance,
    target,
    stat,
    stages,
    amount,
    status,
  };
}

function rebuildCustomMoveState(rawMovedex) {
  state.customMoves = buildCustomMoveList(rawMovedex);
  state.customMoveById = new Map(state.customMoves.map((move) => [move.id, move]));
  if (!state.customMoveById.has(state.selectedCustomMoveId)) {
    state.selectedCustomMoveId = state.customMoves[0]?.id || "";
  }
}

function buildTeamFromSave(rawTeam) {
  const team = [];
  let ignoredMoves = 0;
  for (let index = 0; index < 6; index += 1) {
    const rawSlot = rawTeam[index] || {};
    const species = matchSpeciesForSlot(rawSlot);
    const slot = createEmptySlot();
    slot.speciesId = species?.id || "";
    slot.level = normalizeLevel(rawSlot.level) || species?.level || "";
    slot.teraType = cleanType(rawSlot.teraType) || species?.teraType || "";
    slot.item = canonicalizeItem(rawSlot.item) || cleanText(rawSlot.item);
    const rawMoves = Array.isArray(rawSlot.moves) ? rawSlot.moves : [];
    const keptMoves = [];
    rawMoves.forEach((rawMove) => {
      const canonical = canonicalizeMove(rawMove);
      if (canonical) keptMoves.push(canonical);
      else if (cleanText(rawMove)) ignoredMoves += 1;
    });
    slot.moves = padMoves(keptMoves.slice(0, 4));
    team.push(slot);
  }
  return { team, ignoredMoves };
}

function matchSpeciesForSlot(rawSlot) {
  const showdownName = cleanText(rawSlot.showdownName);
  if (showdownName) {
    const matched = findSpecies(showdownName);
    if (matched) return matched;
  }
  const monsterName = cleanText(rawSlot.monsterName);
  const form = cleanText(rawSlot.form);
  const customFormName = cleanText(rawSlot.customFormName);
  if (monsterName && (form || customFormName)) {
    const exact = state.speciesList.find((species) => (
      toId(species.baseName) === toId(monsterName) &&
      toId(species.form || "") === toId(form || "Base") &&
      toId(species.customFormName || "") === toId(customFormName || "")
    ));
    if (exact) return exact;
  }
  if (!monsterName) return null;
  return findSpecies(monsterName);
}

function findSpecies(label) {
  const key = toId(label);
  const direct = state.speciesLookup.get(key);
  if (direct) return state.speciesById.get(direct) || null;
  return state.speciesList.find((species) => [species.baseName, species.displayName, species.showdownName].some((value) => toId(value) === key)) || null;
}

function handleRosterTabClick(event) {
  const button = event.target.closest(".segmented-button[data-roster]");
  if (!button) return;
  state.activeRosterKey = button.dataset.roster;
  const roster = getActiveRoster();
  state.selectedSpeciesId = roster.team.find((slot) => slot.speciesId)?.speciesId || state.selectedSpeciesId || state.speciesList[0]?.id || "";
  renderRosterTabs();
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexDetail();
  refreshShowdownPanel();
}

function handleSlotStripClick(event) {
  const button = event.target.closest(".slot-tab[data-slot]");
  if (!button) return;
  getActiveRoster().selectedSlot = Number(button.dataset.slot);
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexDetail();
}

function handleTeamBuilderClick(event) {
  const slotCard = event.target.closest(".team-slot[data-slot]");
  if (slotCard) {
    getActiveRoster().selectedSlot = Number(slotCard.dataset.slot);
    renderSelectedSlotStrip();
    renderDexDetail();
    if (!event.target.closest("input, select, button")) {
      renderTeamBuilder();
      return;
    }
  }

  const useSelected = event.target.closest(".use-selected[data-slot]");
  if (useSelected) {
    const slotIndex = Number(useSelected.dataset.slot);
    if (state.selectedSpeciesId) {
      assignSpeciesToSlot(state.activeRosterKey, slotIndex, state.selectedSpeciesId);
      renderSelectedSlotStrip();
      renderTeamBuilder();
      renderDexDetail();
      refreshShowdownPanel();
      renderBattle();
      setStatus(`Placed ${state.speciesById.get(state.selectedSpeciesId)?.displayName || "that species"} into ${getActiveRoster().label} slot ${slotIndex + 1}.`);
    }
    return;
  }

  const clearSlot = event.target.closest(".clear-slot[data-slot]");
  if (clearSlot) {
    const slotIndex = Number(clearSlot.dataset.slot);
    getActiveRoster().team[slotIndex] = createEmptySlot();
    renderSelectedSlotStrip();
    renderTeamBuilder();
    renderDexDetail();
    refreshShowdownPanel();
    renderBattle();
  }
}

function handleTeamBuilderChange(event) {
  const target = event.target;
  const roster = getActiveRoster();
  if (target.matches(".species-select[data-slot]")) {
    const slotIndex = Number(target.dataset.slot);
    roster.selectedSlot = slotIndex;
    if (!target.value) roster.team[slotIndex] = createEmptySlot();
    else assignSpeciesToSlot(state.activeRosterKey, slotIndex, target.value);
    renderSelectedSlotStrip();
    renderTeamBuilder();
    renderDexDetail();
    refreshShowdownPanel();
    renderBattle();
    return;
  }

  if (target.matches(".tera-select[data-slot]")) {
    const slotIndex = Number(target.dataset.slot);
    roster.team[slotIndex].teraType = target.value;
    refreshShowdownPanel();
    renderBattle();
  }
}

function handleTeamBuilderInput(event) {
  const target = event.target;
  const roster = getActiveRoster();
  if (target.matches(".move-input[data-slot][data-move]")) {
    const slotIndex = Number(target.dataset.slot);
    const moveIndex = Number(target.dataset.move);
    roster.selectedSlot = slotIndex;
    roster.team[slotIndex].moves[moveIndex] = target.value;
    target.classList.toggle("invalid", Boolean(cleanText(target.value) && !canonicalizeMove(target.value)));
    refreshShowdownPanel();
    renderSelectedSlotStrip();
    renderDexDetail();
    return;
  }

  if (target.matches(".item-input[data-slot]")) {
    roster.team[Number(target.dataset.slot)].item = target.value;
    refreshShowdownPanel();
    return;
  }

  if (target.matches(".level-input[data-slot]")) {
    roster.team[Number(target.dataset.slot)].level = target.value;
    refreshShowdownPanel();
    renderBattle();
  }
}

function handleTeamBuilderFocusOut(event) {
  const target = event.target;
  const roster = getActiveRoster();
  if (target.matches(".move-input[data-slot][data-move]")) {
    const slotIndex = Number(target.dataset.slot);
    const moveIndex = Number(target.dataset.move);
    const canonical = canonicalizeMove(target.value);
    if (canonical) {
      roster.team[slotIndex].moves[moveIndex] = canonical;
      renderTeamBuilder();
      refreshShowdownPanel();
    }
    return;
  }

  if (target.matches(".item-input[data-slot]")) {
    roster.team[Number(target.dataset.slot)].item = canonicalizeItem(target.value) || cleanText(target.value);
    renderTeamBuilder();
    refreshShowdownPanel();
    renderBattle();
  }
}

function handleMoveLabChange(event) {
  const move = state.customMoveById.get(state.selectedCustomMoveId);
  if (!move) return;
  const target = event.target;

  if (target.id === "custom-move-select") {
    state.selectedCustomMoveId = target.value;
    renderMoveLab();
    return;
  }

  const field = target.dataset.moveLabField;
  if (field) {
    if (field === "target") move.battle.target = target.value === "user" ? "user" : "selected-pokemon";
    else if (field === "priority") move.battle.priority = clamp(safeNumber(target.value), -7, 7);
    else if (field === "pp") move.battle.pp = Math.max(1, safeNumber(target.value) || 15);
    else if (field === "accuracy") move.battle.accuracy = clamp(safeNumber(target.value) || 100, 1, 100);
    syncCustomMoves();
    return;
  }

  const modifierRow = target.closest("[data-modifier]");
  if (modifierRow) {
    const modifier = move.battle.modifiers.find((entry) => entry.id === modifierRow.dataset.modifier);
    if (!modifier) return;
    const modifierField = target.dataset.modifierField;
    if (modifierField === "chance") modifier.chance = clamp(safeNumber(target.value) || 100, 1, 100);
    if (modifierField === "type") modifier.type = CUSTOM_MOVE_MODIFIER_TYPES.some((option) => option.value === target.value) ? target.value : "raise-stat";
    if (modifierField === "target") modifier.target = target.value === "user" ? "user" : "target";
    if (modifierField === "stat") modifier.stat = BATTLE_STAGE_KEYS.includes(target.value) ? target.value : "attack";
    if (modifierField === "stages") modifier.stages = clamp(Math.abs(safeNumber(target.value) || 1), 1, 6);
    if (modifierField === "status") modifier.status = CUSTOM_MOVE_STATUS_OPTIONS.some((option) => option.value === target.value) ? target.value : "burn";
    if (modifierField === "amount") modifier.amount = clamp(Math.abs(safeNumber(target.value) || 25), 1, 100);
    syncCustomMoves();
  }
}

function handleMoveLabClick(event) {
  const move = state.customMoveById.get(state.selectedCustomMoveId);
  if (!move) return;

  if (event.target.closest("[data-add-modifier]")) {
    move.battle.modifiers.push(normalizeCustomMoveModifier({}, move.battle.modifiers.length));
    syncCustomMoves();
    return;
  }

  const removeModifier = event.target.closest("[data-remove-modifier]");
  if (removeModifier) {
    move.battle.modifiers = move.battle.modifiers.filter((entry) => entry.id !== removeModifier.dataset.removeModifier);
    syncCustomMoves();
  }
}

function handleDexListClick(event) {
  const button = event.target.closest(".dex-card[data-species]");
  if (!button) return;
  state.selectedSpeciesId = button.dataset.species;
  renderDexList();
  renderDexDetail();
}

function handleDexDetailClick(event) {
  const assign = event.target.closest("#assign-selected-species");
  if (assign && state.selectedSpeciesId) {
    const roster = getActiveRoster();
    assignSpeciesToSlot(state.activeRosterKey, roster.selectedSlot, state.selectedSpeciesId);
    renderSelectedSlotStrip();
    renderTeamBuilder();
    renderDexDetail();
    refreshShowdownPanel();
    renderBattle();
    setStatus(`Placed ${state.speciesById.get(state.selectedSpeciesId)?.displayName || "that species"} into ${roster.label} slot ${roster.selectedSlot + 1}.`);
  }
}

function handleBattleSideClick(event) {
  const moveButton = event.target.closest(".battle-move-button[data-side][data-move]");
  if (moveButton) {
    setBattleAction(moveButton.dataset.side, { type: "move", moveIndex: Number(moveButton.dataset.move) });
    return;
  }
  const switchButton = event.target.closest(".battle-switch-button[data-side][data-switch]");
  if (switchButton) {
    setBattleAction(switchButton.dataset.side, { type: "switch", toIndex: Number(switchButton.dataset.switch) });
  }
}

function renderRosterTabs() {
  dom.rosterTabs.innerHTML = ["alpha", "beta"].map((key) => {
    const roster = state.rosters[key];
    const active = key === state.activeRosterKey ? " active" : "";
    return `
      <button class="segmented-button${active}" data-roster="${key}" type="button">
        <strong>${escapeHtml(roster.label)}</strong>
        <small>${escapeHtml(roster.isPrimary ? "Save-backed" : "Local-only")}</small>
      </button>
    `;
  }).join("");
  dom.resetButton.textContent = state.activeRosterKey === "alpha" ? "Reset Team A" : "Clear Team B";
}

function renderTypeFilter() {
  const options = ['<option value="all">All Types</option>'];
  state.availableTypes.forEach((type) => options.push(`<option value="${escapeAttribute(type)}">${escapeHtml(type)}</option>`));
  dom.typeFilter.innerHTML = options.join("");
  dom.typeFilter.value = state.typeFilter;
}

function renderSelectedSlotStrip() {
  const roster = getActiveRoster();
  dom.selectedSlotStrip.innerHTML = roster.team.map((slot, index) => {
    const species = state.speciesById.get(slot.speciesId);
    return `
      <button class="slot-tab${index === roster.selectedSlot ? " active" : ""}" data-slot="${index}" type="button">
        <strong>Slot ${index + 1}</strong>
        <span>${escapeHtml(species?.displayName || "Empty")}</span>
      </button>
    `;
  }).join("");
}

function renderTeamBuilder() {
  const roster = getActiveRoster();
  dom.teamBuilder.innerHTML = roster.team.map((slot, index) => {
    const species = state.speciesById.get(slot.speciesId);
    return `
      <article class="team-slot${index === roster.selectedSlot ? " selected" : ""}" data-slot="${index}">
        <div class="team-slot-head">
          <div class="slot-portrait">${renderImageMarkup(species)}</div>
          <div class="slot-copy">
            <p class="eyebrow">${escapeHtml(roster.label)} Slot ${index + 1}</p>
            <h3 class="slot-title">${escapeHtml(species?.displayName || "Open Slot")}</h3>
            <p class="slot-subtitle">${escapeHtml(species ? species.showdownName : "Choose a species from the custom dex")}</p>
            <div class="battle-meta-row"><span class="team-badge${roster.isPrimary ? "" : " secondary"}">${escapeHtml(roster.isPrimary ? "Save-backed roster" : "Battle-only roster")}</span></div>
          </div>
        </div>

        <label class="field">
          <span>Species</span>
          <select class="species-select" data-slot="${index}">${buildSpeciesOptions(slot.speciesId)}</select>
        </label>

        <div class="slot-actions">
          <button class="ghost-button use-selected" data-slot="${index}" type="button"${state.selectedSpeciesId ? "" : " disabled"}>Use Selected Dex Entry</button>
          <button class="ghost-button clear-slot" data-slot="${index}" type="button">Clear Slot</button>
        </div>

        <div class="move-grid">
          ${slot.moves.map((move, moveIndex) => {
            const invalid = cleanText(move) && !canonicalizeMove(move);
            return `
              <label class="field">
                <span>Move ${moveIndex + 1}</span>
                <input class="move-input${invalid ? " invalid" : ""}" data-slot="${index}" data-move="${moveIndex}" type="text" list="move-options" value="${escapeAttribute(move)}" placeholder="Enter an official move">
              </label>
            `;
          }).join("")}
        </div>

        <p class="move-help">Official moves always work. Custom moves also work here once they have battle settings in the Move Lab.</p>

        <div class="meta-grid wide">
          <label class="field">
            <span>Held Item</span>
            <input class="item-input" data-slot="${index}" type="text" list="item-options" value="${escapeAttribute(slot.item)}" placeholder="Leftovers">
          </label>
          <label class="field">
            <span>Level</span>
            <input class="level-input" data-slot="${index}" type="number" min="1" max="100" value="${escapeAttribute(slot.level)}" placeholder="50">
          </label>
          <label class="field">
            <span>Tera Type</span>
            <select class="tera-select" data-slot="${index}">${buildTypeOptions(slot.teraType)}</select>
          </label>
        </div>

        <p class="support-note">Held items are preserved in Showdown export. The battle sandbox applies common competitive item effects and leaves niche items cosmetic.</p>
      </article>
    `;
  }).join("");
}

function renderMoveLab() {
  if (!state.sourceSave) {
    dom.moveLab.innerHTML = '<div class="move-lab-empty">Load a Dinodex save to build battle-ready custom move effects.</div>';
    return;
  }

  if (!state.customMoves.length) {
    dom.moveLab.innerHTML = '<div class="move-lab-empty">This save does not have any custom moves yet.</div>';
    return;
  }

  const move = state.customMoveById.get(state.selectedCustomMoveId) || state.customMoves[0];
  if (!move) {
    dom.moveLab.innerHTML = '<div class="move-lab-empty">No custom move is selected.</div>';
    return;
  }

  dom.moveLab.innerHTML = `
    <div class="move-lab-summary">
      <label class="field">
        <span>Custom Move</span>
        <select id="custom-move-select">
          ${state.customMoves.map((entry) => `<option value="${escapeAttribute(entry.id)}"${entry.id === move.id ? " selected" : ""}>${escapeHtml(entry.name)}</option>`).join("")}
        </select>
      </label>

      <div class="move-lab-card">
        <h3>${escapeHtml(move.name)}</h3>
        <p class="small-copy">${escapeHtml(move.type)} | ${escapeHtml(move.category)} | ${escapeHtml(move.power ? `${move.power} BP` : "Status")}</p>
        <p class="support-note">${escapeHtml(move.description || "No description on this custom move yet.")}</p>
      </div>
    </div>

    <div class="meta-grid wide">
      <label class="field">
        <span>Target</span>
        <select data-move-lab-field="target">
          <option value="selected-pokemon"${move.battle.target === "selected-pokemon" ? " selected" : ""}>Target</option>
          <option value="user"${move.battle.target === "user" ? " selected" : ""}>User</option>
        </select>
      </label>
      <label class="field">
        <span>Accuracy</span>
        <input data-move-lab-field="accuracy" type="number" min="1" max="100" value="${escapeAttribute(String(move.battle.accuracy))}">
      </label>
      <label class="field">
        <span>PP</span>
        <input data-move-lab-field="pp" type="number" min="1" max="64" value="${escapeAttribute(String(move.battle.pp))}">
      </label>
      <label class="field">
        <span>Priority</span>
        <input data-move-lab-field="priority" type="number" min="-7" max="7" value="${escapeAttribute(String(move.battle.priority || 0))}">
      </label>
    </div>

    <div class="move-lab-card">
      <div class="modifier-actions">
        <div>
          <h4>Modifiers</h4>
          <p class="support-note">Build things like “30% chance to lower Speed by 1 stage” or “50% chance to burn the target” from one row builder.</p>
        </div>
        <button class="ghost-button" type="button" data-add-modifier>Add Modifier</button>
      </div>
      <div class="modifier-list">
        ${move.battle.modifiers.length ? move.battle.modifiers.map((modifier) => renderMoveModifierRow(modifier)).join("") : '<div class="move-lab-empty">No modifiers added yet.</div>'}
      </div>
    </div>
  `;
}

function renderMoveModifierRow(modifier) {
  const showStatFields = modifier.type === "raise-stat" || modifier.type === "lower-stat";
  const showStatusField = modifier.type === "inflict-status";
  const showAmountField = modifier.type === "heal" || modifier.type === "drain" || modifier.type === "recoil";
  return `
    <div class="modifier-row" data-modifier="${escapeAttribute(modifier.id)}">
      <div class="modifier-actions">
        <span class="modifier-badge">Modifier</span>
        <button class="ghost-button" type="button" data-remove-modifier="${escapeAttribute(modifier.id)}">Remove</button>
      </div>
      <div class="modifier-grid">
        <label class="field">
          <span>Chance %</span>
          <input data-modifier-field="chance" type="number" min="1" max="100" value="${escapeAttribute(String(modifier.chance))}">
        </label>
        <label class="field">
          <span>Effect</span>
          <select data-modifier-field="type">
            ${CUSTOM_MOVE_MODIFIER_TYPES.map((option) => `<option value="${escapeAttribute(option.value)}"${modifier.type === option.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>Target</span>
          <select data-modifier-field="target">
            ${CUSTOM_MOVE_EFFECT_TARGETS.map((option) => `<option value="${escapeAttribute(option.value)}"${modifier.target === option.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
          </select>
        </label>
        <label class="field${showStatFields ? "" : ' is-hidden'}">
          <span>Stat</span>
          <select data-modifier-field="stat">
            ${BATTLE_STAGE_KEYS.map((stat) => `<option value="${escapeAttribute(stat)}"${modifier.stat === stat ? " selected" : ""}>${escapeHtml(STAT_LABELS[stat])}</option>`).join("")}
          </select>
        </label>
        <label class="field${showStatFields ? "" : ' is-hidden'}">
          <span>Stages</span>
          <input data-modifier-field="stages" type="number" min="1" max="6" value="${escapeAttribute(String(modifier.stages))}">
        </label>
        <label class="field${showStatusField ? "" : ' is-hidden'}">
          <span>Status</span>
          <select data-modifier-field="status">
            ${CUSTOM_MOVE_STATUS_OPTIONS.filter((option) => option.value).map((option) => `<option value="${escapeAttribute(option.value)}"${modifier.status === option.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
          </select>
        </label>
        <label class="field${showAmountField ? "" : ' is-hidden'}">
          <span>Amount %</span>
          <input data-modifier-field="amount" type="number" min="1" max="100" value="${escapeAttribute(String(modifier.amount))}">
        </label>
      </div>
    </div>
  `;
}

function renderDexList() {
  if (!state.speciesList.length) {
    dom.dexList.innerHTML = '<div class="dex-detail empty"><p>Load a save to populate the custom roster.</p></div>';
    return;
  }
  const filtered = state.speciesList.filter(matchesDexFilters);
  if (!filtered.length) {
    dom.dexList.innerHTML = '<div class="dex-detail empty"><p>No species matched the current filters.</p></div>';
    return;
  }
  dom.dexList.innerHTML = filtered.map((species) => `
    <button class="dex-card${state.selectedSpeciesId === species.id ? " active" : ""}" data-species="${escapeAttribute(species.id)}" type="button">
      <div class="dex-thumb">${renderImageMarkup(species)}</div>
      <div>
        <h3 class="dex-card-title">${escapeHtml(species.displayName)}</h3>
        <p class="small-copy">${escapeHtml(species.showdownName)}</p>
        <div class="chip-row">${species.types.map(renderTypeChip).join("")}</div>
        <p class="small-copy">${escapeHtml(species.description || "No description available.")}</p>
      </div>
    </button>
  `).join("");
}

function renderDexDetail() {
  if (!state.selectedSpeciesId) {
    dom.dexDetail.className = "dex-detail empty";
    dom.dexDetail.innerHTML = "<p>Select a species to inspect it and place it into the active roster.</p>";
    return;
  }
  const species = state.speciesById.get(state.selectedSpeciesId);
  if (!species) {
    dom.dexDetail.className = "dex-detail empty";
    dom.dexDetail.innerHTML = "<p>Select a species to inspect it and place it into the active roster.</p>";
    return;
  }
  const roster = getActiveRoster();
  dom.dexDetail.className = "dex-detail";
  dom.dexDetail.innerHTML = `
    <div class="detail-art">${renderImageMarkup(species)}</div>
    <div class="detail-head">
      <p class="section-kicker">Selected Species</p>
      <h3>${escapeHtml(species.displayName)}</h3>
      <p>${escapeHtml(species.showdownName)}</p>
      <div class="chip-row">${species.types.map(renderTypeChip).join("")}</div>
      <div class="battle-meta-row"><span class="team-badge${roster.isPrimary ? "" : " secondary"}">${escapeHtml(`${roster.label} slot ${roster.selectedSlot + 1}`)}</span></div>
    </div>
    <div class="detail-actions">
      <button id="assign-selected-species" class="button accent" type="button">Place In ${escapeHtml(roster.label)} Slot ${roster.selectedSlot + 1}</button>
    </div>
    <p class="detail-copy">${escapeHtml(species.description || "No description available.")}</p>
    <div class="stat-grid">
      ${Object.entries(species.stats).map(([statKey, value]) => {
        const width = Math.max(8, Math.min(100, (value / 180) * 100));
        return `
          <div class="stat-card">
            <header><strong>${escapeHtml(STAT_LABELS[statKey] || statKey)}</strong><span>${escapeHtml(String(value))}</span></header>
            <div class="stat-bar"><span style="width:${width}%"></span></div>
          </div>
        `;
      }).join("")}
    </div>
    <div class="meta-grid">
      <div class="stat-card">
        <header><strong>Default Level</strong><span>${escapeHtml(String(species.level))}</span></header>
        <div class="chip-row">${renderTypeChip(species.teraType || "Unspecified")}</div>
      </div>
      <div class="stat-card">
        <header><strong>Abilities</strong><span>Deferred</span></header>
        <p>${escapeHtml(species.ability || "No ability listed. This builder currently skips abilities.")}</p>
      </div>
    </div>
  `;
}

function matchesDexFilters(species) {
  const searchPool = `${species.displayName} ${species.showdownName} ${species.baseName} ${species.formLabel} ${species.types.join(" ")}`.toLowerCase();
  return (!state.searchTerm || searchPool.includes(state.searchTerm)) && (state.typeFilter === "all" || species.types.includes(state.typeFilter));
}

function assignSpeciesToSlot(rosterKey, slotIndex, speciesId) {
  const species = state.speciesById.get(speciesId);
  if (!species) return;
  state.rosters[rosterKey].team[slotIndex] = {
    speciesId: species.id,
    moves: ["", "", "", ""],
    level: species.level || 50,
    teraType: species.teraType || species.type1 || "",
    item: "",
  };
  state.rosters[rosterKey].selectedSlot = slotIndex;
  state.selectedSpeciesId = species.id;
}

function cloneAlphaToBeta() {
  state.rosters.beta.team = cloneTeam(state.rosters.alpha.team);
  state.rosters.beta.selectedSlot = 0;
  renderRosterTabs();
  if (state.activeRosterKey === "beta") {
    renderSelectedSlotStrip();
    renderTeamBuilder();
    renderDexDetail();
    refreshShowdownPanel();
  }
  renderBattle();
  setStatus("Copied Team A into Team B for battle testing.");
}

function clearBetaRoster() {
  state.rosters.beta.team = Array.from({ length: 6 }, createEmptySlot);
  state.rosters.beta.selectedSlot = 0;
  if (state.activeRosterKey === "beta") {
    renderSelectedSlotStrip();
    renderTeamBuilder();
    renderDexDetail();
    refreshShowdownPanel();
  }
  renderBattle();
  setStatus("Cleared Team B.");
}

function resetActiveRoster() {
  const roster = getActiveRoster();
  if (roster.isPrimary) {
    if (!roster.loadedSnapshot.length) {
      setStatus("Load a save before resetting Team A.");
      return;
    }
    roster.team = cloneTeam(roster.loadedSnapshot);
    setStatus("Restored Team A to the last loaded save state.");
  } else {
    roster.team = Array.from({ length: 6 }, createEmptySlot);
    setStatus("Cleared Team B.");
  }

  roster.selectedSlot = 0;
  state.selectedSpeciesId = roster.team.find((slot) => slot.speciesId)?.speciesId || state.speciesList[0]?.id || "";
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();
}

function refreshShowdownPanel() {
  const roster = getActiveRoster();
  dom.exportRosterLabel.textContent = `${roster.label} is the active Showdown import/export target.`;
  dom.showdownText.value = exportShowdownText(state.activeRosterKey);
}

function exportShowdownText(rosterKey) {
  const roster = state.rosters[rosterKey];
  return roster.team.map((slot) => {
    const species = state.speciesById.get(slot.speciesId);
    if (!species) return "";

    const firstLine = cleanText(slot.item) ? `${species.showdownName} @ ${cleanText(slot.item)}` : species.showdownName;
    const lines = [firstLine];
    const level = normalizeLevel(slot.level) || species.level;
    const teraType = cleanType(slot.teraType);
    if (level) lines.push(`Level: ${level}`);
    if (teraType) lines.push(`Tera Type: ${teraType}`);
    getOfficialMoves(slot).forEach((move) => lines.push(`- ${move}`));
    return lines.join("\n");
  }).filter(Boolean).join("\n\n");
}

function importShowdownText() {
  const text = dom.showdownText.value.trim();
  if (!text) {
    setStatus("Paste Showdown text into the export box first.");
    return;
  }

  const parsed = parseShowdownText(text);
  if (!parsed.length) {
    setStatus("No Showdown sets were found in the text box.");
    return;
  }

  const roster = getActiveRoster();
  const nextTeam = Array.from({ length: 6 }, createEmptySlot);
  let imported = 0;
  let ignoredMoves = 0;
  let unmatchedSpecies = 0;

  parsed.slice(0, 6).forEach((set, index) => {
    const species = findSpecies(set.species);
    if (!species) {
      unmatchedSpecies += 1;
      return;
    }

    const officialMoves = [];
    set.moves.forEach((move) => {
      const canonical = canonicalizeMove(move);
      if (canonical) officialMoves.push(canonical);
      else if (cleanText(move)) ignoredMoves += 1;
    });

    nextTeam[index] = {
      speciesId: species.id,
      moves: padMoves(officialMoves.slice(0, 4)),
      level: normalizeLevel(set.level) || species.level,
      teraType: cleanType(set.teraType) || species.teraType || species.type1 || "",
      item: canonicalizeItem(set.item) || cleanText(set.item),
    };
    imported += 1;
  });

  roster.team = nextTeam;
  roster.selectedSlot = 0;
  state.selectedSpeciesId = roster.team.find((slot) => slot.speciesId)?.speciesId || state.selectedSpeciesId;
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();

  let message = `Imported ${imported} Showdown set${imported === 1 ? "" : "s"} into ${roster.label}.`;
  if (ignoredMoves) message += ` Ignored ${ignoredMoves} unknown move${ignoredMoves === 1 ? "" : "s"}.`;
  if (unmatchedSpecies) message += ` ${unmatchedSpecies} species could not be matched to this custom dex.`;
  setStatus(message);
}

function parseShowdownText(text) {
  return text
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      const header = parseShowdownHeader(lines.shift() || "");
      const set = { species: header.species, item: header.item, moves: [], level: "", teraType: "" };
      lines.forEach((line) => {
        if (line.startsWith("- ")) {
          set.moves.push(line.slice(2).trim());
          return;
        }
        if (line.toLowerCase().startsWith("level:")) {
          set.level = line.split(":").slice(1).join(":").trim();
          return;
        }
        if (line.toLowerCase().startsWith("tera type:")) {
          set.teraType = line.split(":").slice(1).join(":").trim();
        }
      });
      return set;
    })
    .filter((set) => cleanText(set.species));
}

function parseShowdownHeader(line) {
  const parts = line.split("@");
  const left = parts[0].trim();
  const item = parts.length > 1 ? parts.slice(1).join("@").trim() : "";
  const bracketMatch = left.match(/\(([^()]+)\)\s*$/);
  return {
    species: bracketMatch ? bracketMatch[1].trim() : left,
    item,
  };
}

function copyExportText() {
  const text = dom.showdownText.value;
  if (!text.trim()) {
    setStatus("There is no Showdown export to copy yet.");
    return;
  }

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => setStatus(`Copied the ${getActiveRoster().label} Showdown export to the clipboard.`))
      .catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
}

function fallbackCopy(text) {
  dom.showdownText.focus();
  dom.showdownText.select();
  try {
    document.execCommand("copy");
    setStatus(`Copied the ${getActiveRoster().label} Showdown export to the clipboard.`);
  } catch (error) {
    setStatus("Copy failed. You can still select the export text manually.");
  } finally {
    window.getSelection()?.removeAllRanges();
  }
}

function downloadUpdatedSave() {
  if (!state.sourceSave) {
    setStatus("Load a Dinodex save before downloading an updated one.");
    return;
  }

  const updatedSave = JSON.parse(JSON.stringify(state.sourceSave));
  updatedSave.team = state.rosters.alpha.team.map((slot) => slotToSaveEntry(slot));
  updatedSave.movedex = state.customMoves.map(exportCustomMove);
  const blob = new Blob([JSON.stringify(updatedSave, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const baseName = state.loadedFileName.replace(/\.json$/i, "");
  anchor.href = url;
  anchor.download = `${baseName || "dinodex-save"}-showdown-team.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  setStatus("Downloaded a save JSON with Team A merged back in.");
}

function slotToSaveEntry(slot) {
  const species = state.speciesById.get(slot.speciesId);
  if (!species) return { monsterName: "", moves: [] };
  return {
    monsterName: species.baseName,
    moves: getOfficialMoves(slot),
    form: species.form,
    customFormName: species.customFormName || "",
    showdownName: species.showdownName,
    level: normalizeLevel(slot.level) || species.level || "",
    teraType: cleanType(slot.teraType),
    item: cleanText(slot.item),
  };
}

function startBattle() {
  const alphaTeam = buildBattleTeam("alpha");
  const betaTeam = buildBattleTeam("beta");
  if (!alphaTeam || !betaTeam) {
    setStatus("Both Team A and Team B need at least one valid species before a battle can start.");
    return;
  }

  state.battle = {
    started: true,
    turn: 0,
    winner: "",
    teams: { alpha: alphaTeam, beta: betaTeam },
    pendingActions: { alpha: null, beta: null },
    log: [{ title: "Battle started", text: `${alphaTeam.label} and ${betaTeam.label} entered the arena.`, turnMarker: false }],
  };
  renderBattle();
  setStatus("Started a local battle between Team A and Team B.");
}

function resetBattle() {
  state.battle = createEmptyBattleState();
  renderBattle();
}

function setBattleAction(sideKey, action) {
  if (!state.battle.started || state.battle.winner) return;
  const validation = action.type === "move" ? canSelectBattleMove(sideKey, action.moveIndex) : canSelectBattleSwitch(sideKey, action.toIndex);
  if (!validation.ok) {
    appendBattleLog("Action blocked", validation.message || "That action is not available.");
    renderBattle();
    return;
  }
  state.battle.pendingActions[sideKey] = action;
  renderBattle();
}

function resolveBattleTurn() {
  const battle = state.battle;
  if (!battle.started || battle.winner || !battle.pendingActions.alpha || !battle.pendingActions.beta) return;
  battle.turn += 1;
  appendBattleLog(`Turn ${battle.turn}`, "Actions are resolving.", true);
  buildActionOrder().forEach((action) => {
    if (!battle.winner) executeBattleAction(action);
    setBattleWinnerIfNeeded();
  });
  if (!battle.winner) {
    applyEndOfTurnEffects();
    autoReplaceFainted("alpha");
    autoReplaceFainted("beta");
    setBattleWinnerIfNeeded();
  }
  battle.pendingActions.alpha = null;
  battle.pendingActions.beta = null;
  renderBattle();
}

function renderBattle() {
  const battle = state.battle;
  dom.resolveTurnButton.disabled = !battle.started || Boolean(battle.winner) || !battle.pendingActions.alpha || !battle.pendingActions.beta;
  if (!battle.started) {
    dom.battleStatus.textContent = "Build Team A and Team B, then start a battle.";
    dom.battleTurn.textContent = "Turn 0";
    dom.battlePending.innerHTML = renderPendingCard("Team A", "No action queued yet.") + renderPendingCard("Team B", "No action queued yet.");
    dom.battleLog.innerHTML = '<div class="battle-log-entry"><strong>Battle idle</strong><p>Start a battle after both rosters have at least one creature.</p></div>';
    dom.battleSideAlpha.innerHTML = renderBattlePreview("alpha");
    dom.battleSideBeta.innerHTML = renderBattlePreview("beta");
    return;
  }

  dom.battleStatus.textContent = battle.winner
    ? (battle.winner === "draw" ? "The battle ended in a draw." : `${battle.teams[battle.winner].label} won the battle.`)
    : "Choose one action for each side, then resolve the turn.";
  dom.battleTurn.textContent = `Turn ${battle.turn}`;
  dom.battlePending.innerHTML = renderPendingActions();
  dom.battleLog.innerHTML = battle.log.map((entry) => `
    <div class="battle-log-entry${entry.turnMarker ? " turn" : ""}">
      <strong>${escapeHtml(entry.title)}</strong>
      <p>${escapeHtml(entry.text || "")}</p>
    </div>
  `).join("");
  dom.battleSideAlpha.innerHTML = renderBattleSide("alpha");
  dom.battleSideBeta.innerHTML = renderBattleSide("beta");
}

function renderBattlePreview(sideKey) {
  const roster = state.rosters[sideKey];
  const filled = roster.team.filter((slot) => slot.speciesId);
  const cards = filled.length ? filled.map((slot) => {
    const species = state.speciesById.get(slot.speciesId);
    return `
      <div class="reserve-card">
        <div class="preview-art">${renderImageMarkup(species)}</div>
        <div>
          <strong>${escapeHtml(species?.displayName || "Empty")}</strong>
          <p class="reserve-copy">${escapeHtml(cleanText(slot.item) || "No held item")}</p>
        </div>
      </div>
    `;
  }).join("") : '<div class="empty-state battle-panel-block"><p>This roster is empty.</p></div>';

  return `
    <div class="battle-active-card">
      <div class="battle-side-head">
        <strong>${escapeHtml(roster.label)}</strong>
        <span class="team-badge${roster.isPrimary ? "" : " secondary"}">${escapeHtml(roster.isPrimary ? "Save-backed" : "Battle-only")}</span>
      </div>
      <p class="battle-note">${escapeHtml(roster.isPrimary ? "This team round-trips to the save JSON." : "This team stays local inside the page for sparring.")}</p>
      <div class="preview-roster">${cards}</div>
    </div>
  `;
}

function renderBattleSide(sideKey) {
  const team = state.battle.teams[sideKey];
  const active = getActiveCombatant(sideKey);
  if (!team || !active) return '<div class="empty-state battle-panel-block"><p>No active battler.</p></div>';

  const pending = state.battle.pendingActions[sideKey];
  const reserveCards = team.combatants.map((mon, index) => {
    const valid = canSelectBattleSwitch(sideKey, index);
    return `
      <button class="battle-choice battle-switch-button${index === team.active ? " active" : ""}" type="button" data-side="${sideKey}" data-switch="${index}"${valid.ok ? "" : " disabled"}>
        <strong>${escapeHtml(mon.displayName)}</strong>
        <small>${escapeHtml(mon.fainted ? "Fainted" : `${mon.hp}/${mon.maxHp} HP`)}${mon.item ? ` | ${escapeHtml(getBattleItemLabel(mon))}` : ""}</small>
      </button>
    `;
  }).join("");

  const moveCards = active.moves.map((moveSlot, index) => {
    const move = getBattleMove(moveSlot.name);
    const valid = canSelectBattleMove(sideKey, index);
    return `
      <button class="battle-choice battle-move-button${pending?.type === "move" && pending.moveIndex === index ? " active" : ""}" type="button" data-side="${sideKey}" data-move="${index}"${valid.ok ? "" : " disabled"}>
        <strong>${escapeHtml(moveSlot.name)}</strong>
        <small>${escapeHtml(buildMoveSummary(move, moveSlot))}</small>
      </button>
    `;
  }).join("");

  return `
    <div class="battle-active-card">
      <div class="battle-side-head">
        <strong>${escapeHtml(team.label)}</strong>
        <span class="team-badge${sideKey === "beta" ? " secondary" : ""}">${escapeHtml(pending ? describePendingAction(sideKey, pending) : "Awaiting action")}</span>
      </div>
      <div class="battle-art">${renderBattleImage(active)}</div>
      <div>
        <h3 class="battle-card-title">${escapeHtml(active.displayName)}</h3>
        <p class="battle-card-subtitle">Level ${escapeHtml(String(active.level))}${active.item ? ` | ${escapeHtml(getBattleItemLabel(active))}` : ""}</p>
        <div class="chip-row">${active.types.map(renderTypeChip).join("")}</div>
        <div class="battle-meta-row">${renderStatusChips(active)}</div>
      </div>
      <div>
        <div class="hp-meta">
          <strong>${escapeHtml(`${active.hp}/${active.maxHp} HP`)}</strong>
          <span>${escapeHtml(active.fainted ? "Fainted" : active.choiceLock ? `Locked into ${active.choiceLock}` : "Ready")}</span>
        </div>
        <div class="hp-shell"><span class="hp-fill ${hpClass(active.hp, active.maxHp)}" style="width:${hpPercent(active.hp, active.maxHp)}%"></span></div>
      </div>
      <div class="boost-list">${renderBoostChips(active)}</div>
      <div class="battle-action-grid">${moveCards}</div>
      <div class="battle-switch-grid">${reserveCards}</div>
    </div>
  `;
}

function renderPendingActions() {
  return renderPendingCard("Team A", state.battle.pendingActions.alpha ? describePendingAction("alpha", state.battle.pendingActions.alpha) : "No action queued.")
    + renderPendingCard("Team B", state.battle.pendingActions.beta ? describePendingAction("beta", state.battle.pendingActions.beta) : "No action queued.");
}

function renderPendingCard(label, text) {
  return `<div class="pending-card"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(text)}</p></div>`;
}

function buildBattleTeam(sideKey) {
  const roster = state.rosters[sideKey];
  const combatants = roster.team.map((slot, rosterSlot) => buildCombatant(slot, rosterSlot)).filter(Boolean);
  if (!combatants.length) return null;
  return { sideKey, label: roster.label, active: 0, combatants };
}

function buildCombatant(slot, rosterSlot) {
  const species = state.speciesById.get(slot.speciesId);
  if (!species) return null;
  const level = normalizeLevel(slot.level) || species.level || 50;
  const stats = {
    hp: calculateBattleStat(species.stats.hp, level, true),
    attack: calculateBattleStat(species.stats.attack, level, false),
    defense: calculateBattleStat(species.stats.defense, level, false),
    spattack: calculateBattleStat(species.stats.spattack, level, false),
    spdefense: calculateBattleStat(species.stats.spdefense, level, false),
    speed: calculateBattleStat(species.stats.speed, level, false),
  };

  const moves = getOfficialMoves(slot).map((moveName) => {
    const move = getBattleMove(moveName);
    return { name: moveName, id: move?.id || toId(moveName), pp: Math.max(1, move?.pp || 1), maxPp: Math.max(1, move?.pp || 1) };
  });
  if (!moves.length) moves.push({ name: "Struggle", id: "struggle", pp: 1, maxPp: 1 });

  return {
    rosterSlot,
    speciesId: species.id,
    displayName: species.displayName,
    showdownName: species.showdownName,
    types: species.types.length ? species.types : ["Normal"],
    level,
    hp: stats.hp,
    maxHp: stats.hp,
    stats,
    boosts: createBoostState(),
    status: "",
    statusTurns: 0,
    toxicCounter: 0,
    confusionTurns: 0,
    fainted: false,
    flinched: false,
    protecting: false,
    fresh: true,
    item: canonicalizeItem(slot.item) || cleanText(slot.item),
    itemConsumed: false,
    airBalloonPopped: false,
    choiceLock: "",
    lastMoveUsed: "",
    moves,
  };
}

function canSelectBattleMove(sideKey, moveIndex) {
  if (!state.battle.started || state.battle.winner) return { ok: false, message: "The battle is not accepting actions." };
  const mon = getActiveCombatant(sideKey);
  if (!mon || mon.fainted) return { ok: false, message: "That side has no active battler." };
  const moveSlot = mon.moves[moveIndex];
  if (!moveSlot) return { ok: false, message: "That move slot is empty." };
  if (moveSlot.pp <= 0) return { ok: false, message: `${moveSlot.name} is out of PP.` };
  if (isChoiceItem(mon.item) && mon.choiceLock && mon.choiceLock !== moveSlot.name) {
    return { ok: false, message: `${mon.displayName} is locked into ${mon.choiceLock}.` };
  }
  const move = getBattleMove(moveSlot.name);
  if (cleanText(mon.item) === "Assault Vest" && move?.damageClass === "status") {
    return { ok: false, message: "Assault Vest blocks status moves." };
  }
  if (move?.id === "fake-out" && !mon.fresh) {
    return { ok: false, message: "Fake Out only works on the first turn this battler is active." };
  }
  return { ok: true, message: "" };
}

function canSelectBattleSwitch(sideKey, toIndex) {
  if (!state.battle.started || state.battle.winner) return { ok: false, message: "The battle is not accepting switches." };
  const team = state.battle.teams[sideKey];
  const target = team?.combatants[toIndex];
  if (!team || !target) return { ok: false, message: "That switch target does not exist." };
  if (team.active === toIndex) return { ok: false, message: "That battler is already active." };
  if (target.fainted) return { ok: false, message: "That battler has fainted." };
  return { ok: true, message: "" };
}

function buildActionOrder() {
  return ["alpha", "beta"].map((sideKey) => {
    const action = state.battle.pendingActions[sideKey];
    const user = getActiveCombatant(sideKey);
    if (!action || !user) return null;
    if (action.type === "switch") {
      return { sideKey, type: "switch", toIndex: action.toIndex, actionRank: 2, priority: 6, speed: getModifiedBattleStat(user, "speed") };
    }
    const moveSlot = user.moves[action.moveIndex];
    const move = getBattleMove(moveSlot?.name);
    const quickClaw = cleanText(user.item) === "Quick Claw" && !user.itemConsumed && Math.random() < 0.2;
    if (quickClaw) appendBattleLog(user.displayName, "Quick Claw let it act first.");
    return {
      sideKey,
      type: "move",
      moveIndex: action.moveIndex,
      actionRank: 1,
      priority: (move?.priority || 0) + (quickClaw ? 0.5 : 0),
      speed: getModifiedBattleStat(user, "speed"),
    };
  }).filter(Boolean).sort((left, right) => {
    if (left.actionRank !== right.actionRank) return right.actionRank - left.actionRank;
    if (left.priority !== right.priority) return right.priority - left.priority;
    if (left.speed !== right.speed) return right.speed - left.speed;
    return Math.random() < 0.5 ? -1 : 1;
  });
}

function executeBattleAction(action) {
  if (action.type === "switch") {
    performSwitch(action.sideKey, action.toIndex, "manual");
    return;
  }
  performMove(action.sideKey, action.moveIndex);
}

function performSwitch(sideKey, toIndex, mode) {
  const team = state.battle.teams[sideKey];
  const current = getActiveCombatant(sideKey);
  const incoming = team?.combatants[toIndex];
  if (!incoming || incoming.fainted || team.active === toIndex) return;
  if (current) {
    current.choiceLock = "";
    current.protecting = false;
    current.flinched = false;
  }
  team.active = toIndex;
  incoming.protecting = false;
  incoming.flinched = false;
  incoming.fresh = true;
  appendBattleLog(team.label, mode === "manual" ? `switched to ${incoming.displayName}.` : `sent out ${incoming.displayName}.`);
}

function performMove(sideKey, moveIndex) {
  const user = getActiveCombatant(sideKey);
  const target = getActiveCombatant(otherSideKey(sideKey));
  if (!user || user.fainted) return;
  const validation = canSelectBattleMove(sideKey, moveIndex);
  if (!validation.ok) {
    appendBattleLog(user.displayName, validation.message || "could not use that move.");
    return;
  }

  const moveSlot = user.moves[moveIndex];
  const move = getBattleMove(moveSlot.name);
  if (!move) {
    appendBattleLog(user.displayName, `${moveSlot.name} has no battle data and fizzled out.`);
    return;
  }

  user.fresh = false;
  user.protecting = false;
  moveSlot.pp = Math.max(0, moveSlot.pp - 1);
  user.lastMoveUsed = moveSlot.name;
  if (isChoiceItem(user.item) && !user.choiceLock) user.choiceLock = moveSlot.name;
  appendBattleLog(user.displayName, `used ${moveSlot.name}.`);

  if (CLEAR_ALL_BOOST_MOVES.has(move.id)) {
    resetBoosts(getActiveCombatant("alpha"));
    resetBoosts(getActiveCombatant("beta"));
    appendBattleLog(moveSlot.name, "cleared all stat changes.");
    return;
  }

  if (PROTECT_MOVES.has(move.id)) {
    user.protecting = true;
    appendBattleLog(user.displayName, "is protecting itself.");
    return;
  }

  if (move.id === "rest") {
    user.status = "";
    user.toxicCounter = 0;
    user.hp = user.maxHp;
    inflictMajorStatus(user, "sleep", { sleepTurns: 2 });
    appendBattleLog(user.displayName, "restored to full HP and fell asleep.");
    return;
  }

  if (move.id === "belly-drum") {
    if (user.hp <= Math.floor(user.maxHp / 2)) {
      appendBattleLog(moveSlot.name, "failed because the user did not have enough HP.");
      return;
    }
    applyDirectDamage(user, Math.floor(user.maxHp / 2), `${moveSlot.name} recoil`);
    applyBoostChanges(user, [{ stat: "attack", change: 6 }]);
    appendBattleLog(user.displayName, "maxed out its Attack.");
    return;
  }

  const targetIsOpponent = moveTargetsOpponent(move);
  const recipient = targetIsOpponent ? target : user;
  if (!recipient) {
    appendBattleLog(moveSlot.name, "failed because there was no target.");
    return;
  }
  if ((move.category === "field-effect" || move.category === "whole-field-effect") && move.power <= 0) {
    appendBattleLog(moveSlot.name, "is not modeled in this local battle sandbox.");
    return;
  }
  if (targetIsOpponent && recipient.protecting) {
    appendBattleLog(recipient.displayName, "blocked the attack with Protect.");
    return;
  }
  if (targetIsOpponent && getTypeMultiplier(move.type, recipient.types, recipient) === 0) {
    appendBattleLog(recipient.displayName, `is unaffected by ${moveSlot.name}.`);
    return;
  }

  const block = resolveBeforeMoveStatus(user, move);
  if (block.blocked) return;

  if (!moveHitsTarget(user, recipient, move, targetIsOpponent)) {
    appendBattleLog(moveSlot.name, "missed.");
    return;
  }

  let totalDamage = 0;
  const typeMultiplier = targetIsOpponent ? getTypeMultiplier(move.type, recipient.types, recipient) : 1;
  if (move.damageClass !== "status") {
    const hits = getMoveHitCount(move);
    for (let hit = 0; hit < hits; hit += 1) {
      if (!recipient || recipient.fainted) break;
      const result = calculateMoveDamage(user, recipient, move, typeMultiplier);
      if (result.noEffect) {
        appendBattleLog(recipient.displayName, `is unaffected by ${moveSlot.name}.`);
        break;
      }
      totalDamage += applyBattleDamage(recipient, result.damage, { attacker: user, move, moveName: moveSlot.name, typeMultiplier: result.typeMultiplier });
      if (result.crit) appendBattleLog(moveSlot.name, "landed a critical hit.");
      if (result.typeMultiplier > 1) appendBattleLog(moveSlot.name, "was super effective.");
      else if (result.typeMultiplier > 0 && result.typeMultiplier < 1) appendBattleLog(moveSlot.name, "was not very effective.");
      if (recipient.fainted) break;
    }
    if (move.minHits && move.maxHits && move.maxHits > 1) appendBattleLog(moveSlot.name, `hit ${getDisplayedHitCount(move)} time(s).`);
  }

  if (CLEAR_TARGET_BOOST_MOVES.has(move.id) && targetIsOpponent && !recipient.fainted) {
    resetBoosts(recipient);
    appendBattleLog(moveSlot.name, `cleared ${recipient.displayName}'s stat changes.`);
  }

  if (move.healing > 0) {
    const healed = healCombatant(user, Math.floor((move.healing / 100) * user.maxHp));
    if (healed > 0) appendBattleLog(user.displayName, `restored ${healed} HP.`);
  }
  if (move.drain > 0 && totalDamage > 0) {
    const healed = healCombatant(user, Math.max(1, Math.floor((totalDamage * move.drain) / 100)));
    if (healed > 0) appendBattleLog(user.displayName, `drained ${healed} HP.`);
  }
  if (move.drain < 0 && totalDamage > 0) {
    const recoil = Math.max(1, Math.floor((totalDamage * Math.abs(move.drain)) / 100));
    applyDirectDamage(user, recoil, `${moveSlot.name} recoil`);
  }
  if (targetIsOpponent && totalDamage > 0 && move.flinchChance > 0 && !recipient.fainted && Math.random() * 100 < move.flinchChance) {
    recipient.flinched = true;
    appendBattleLog(recipient.displayName, "flinched.");
  }
  if (totalDamage > 0 && cleanText(user.item) === "Shell Bell" && !user.itemConsumed) {
    const healed = healCombatant(user, Math.max(1, Math.floor(totalDamage / 8)));
    if (healed > 0) appendBattleLog(user.displayName, "restored HP with Shell Bell.");
  }
  if (totalDamage > 0 && cleanText(user.item) === "Life Orb" && !user.itemConsumed) {
    applyDirectDamage(user, Math.max(1, Math.floor(user.maxHp / 10)), "Life Orb recoil");
  }
  if ((FORCE_SWITCH_MOVES.has(move.id) || move.category === "force-switch") && targetIsOpponent && !recipient.fainted) {
    forceSwitch(otherSideKey(sideKey));
  }
  if (SELF_DESTRUCT_MOVES.has(move.id) && !user.fainted) {
    applyDirectDamage(user, user.hp, moveSlot.name);
  }
  applyCustomMoveModifiers(user, recipient, move, totalDamage, targetIsOpponent);
  applyMoveBoostEffects(user, recipient, move);
  applyMoveAilmentEffects(user, recipient, move);
}

function applyMoveBoostEffects(user, recipient, move) {
  if (!move.boosts?.length) return;
  const chance = getBoostEffectChance(move);
  if (chance <= 0 || Math.random() * 100 >= chance) return;
  const appliesToSelf = move.damageClass === "status" ? SELF_TARGETS.has(move.target) : move.category === "damage-raise";
  const target = appliesToSelf ? user : recipient;
  if (!target) return;
  applyBoostChanges(target, move.boosts);
  appendBattleLog(target.displayName, describeBoostChanges(move.boosts));
}

function applyMoveAilmentEffects(user, recipient, move) {
  if (!move.ailment || move.ailment === "none" || move.ailment === "unknown") return;
  const chance = getAilmentEffectChance(move);
  if (chance <= 0 || Math.random() * 100 >= chance) return;
  const appliesToSelf = move.damageClass === "status" && SELF_TARGETS.has(move.target);
  const target = appliesToSelf ? user : recipient;
  if (!target) return;

  if (move.id === "toxic") {
    if (inflictMajorStatus(target, "tox")) appendBattleLog(target.displayName, "was badly poisoned.");
    return;
  }

  if (move.ailment === "confusion") {
    if (inflictConfusion(target, move)) appendBattleLog(target.displayName, "became confused.");
    return;
  }

  if (["burn", "poison", "paralysis", "sleep", "freeze"].includes(move.ailment)) {
    if (inflictMajorStatus(target, move.ailment, move)) appendBattleLog(target.displayName, describeStatusInfliction(move.ailment));
  }
}

function resolveMoveEffectTarget(user, recipient, targetMode) {
  return targetMode === "user" ? user : recipient;
}

function applyCustomMoveModifiers(user, recipient, move, totalDamage, targetIsOpponent) {
  if (!Array.isArray(move.modifiers) || !move.modifiers.length) return;
  move.modifiers.forEach((modifier) => {
    const chance = clamp(safeNumber(modifier.chance) || 100, 1, 100);
    if (Math.random() * 100 >= chance) return;
    const target = resolveMoveEffectTarget(user, recipient, modifier.target);
    if (!target) return;

    if ((modifier.type === "raise-stat" || modifier.type === "lower-stat") && modifier.boosts?.length) {
      applyBoostChanges(target, modifier.boosts);
      appendBattleLog(target.displayName, describeBoostChanges(modifier.boosts));
      return;
    }

    if (modifier.type === "inflict-status") {
      if (modifier.status === "tox") {
        if (inflictMajorStatus(target, "tox")) appendBattleLog(target.displayName, "was badly poisoned.");
        return;
      }
      if (modifier.status === "confusion") {
        if (inflictConfusion(target, {})) appendBattleLog(target.displayName, "became confused.");
        return;
      }
      if (["burn", "poison", "paralysis", "sleep", "freeze"].includes(modifier.status)) {
        if (inflictMajorStatus(target, modifier.status, {})) appendBattleLog(target.displayName, describeStatusInfliction(modifier.status));
      }
      return;
    }

    if (modifier.type === "flinch") {
      if (targetIsOpponent && totalDamage > 0 && !target.fainted) {
        target.flinched = true;
        appendBattleLog(target.displayName, "flinched.");
      }
      return;
    }

    if (modifier.type === "heal") {
      const healed = healCombatant(target, Math.floor((Math.max(1, modifier.amount || 0) / 100) * target.maxHp));
      if (healed > 0) appendBattleLog(target.displayName, `restored ${healed} HP.`);
      return;
    }

    if (modifier.type === "drain") {
      if (totalDamage > 0) {
        const healed = healCombatant(user, Math.max(1, Math.floor((totalDamage * Math.max(1, modifier.amount || 0)) / 100)));
        if (healed > 0) appendBattleLog(user.displayName, `drained ${healed} HP.`);
      }
      return;
    }

    if (modifier.type === "recoil") {
      if (totalDamage > 0 && !user.fainted) {
        applyDirectDamage(user, Math.max(1, Math.floor((totalDamage * Math.max(1, modifier.amount || 0)) / 100)), `${move.name} recoil`);
      }
    }
  });
}

function calculateMoveDamage(user, target, move, precomputedMultiplier) {
  const fixedDamage = FIXED_DAMAGE_MOVES[move.id];
  const typeMultiplier = precomputedMultiplier ?? getTypeMultiplier(move.type, target.types, target);
  if (fixedDamage) {
    const damage = Math.max(0, Math.min(target.hp, fixedDamage(user, target)));
    return { damage, crit: false, typeMultiplier, noEffect: damage <= 0 };
  }
  if (move.category === "ohko") {
    if (typeMultiplier === 0) return { damage: 0, crit: false, typeMultiplier, noEffect: true };
    return { damage: target.hp, crit: false, typeMultiplier, noEffect: false };
  }
  if (move.power <= 0) return { damage: 0, crit: false, typeMultiplier, noEffect: typeMultiplier === 0 };
  if (typeMultiplier === 0) return { damage: 0, crit: false, typeMultiplier, noEffect: true };

  const attackKey = move.damageClass === "physical" ? "attack" : "spattack";
  const defenseKey = move.damageClass === "physical" ? "defense" : "spdefense";
  const attack = Math.max(1, getModifiedBattleStat(user, attackKey, move));
  const defense = Math.max(1, getModifiedBattleStat(target, defenseKey, move));
  const levelFactor = Math.floor((2 * user.level) / 5) + 2;
  const baseDamage = Math.floor(Math.floor((levelFactor * move.power * attack) / defense) / 50) + 2;
  const crit = Math.random() < getCritChance(move, user);
  const stab = user.types.includes(move.type) ? 1.5 : 1;
  const randomFactor = 0.85 + Math.random() * 0.15;
  let modifier = randomFactor * stab * typeMultiplier * getDamageItemModifier(user, move, typeMultiplier);
  if (crit) modifier *= 1.5;
  if (move.damageClass === "physical" && user.status === "burn") modifier *= 0.5;
  return {
    damage: Math.max(1, Math.floor(baseDamage * modifier)),
    crit,
    typeMultiplier,
    noEffect: false,
  };
}

function applyBattleDamage(target, damage, context) {
  let actual = Math.max(0, Math.floor(damage));
  if (actual <= 0) return 0;
  if (target.hp === target.maxHp && cleanText(target.item) === "Focus Sash" && !target.itemConsumed && actual >= target.hp) {
    target.itemConsumed = true;
    actual = Math.max(0, target.hp - 1);
    appendBattleLog(target.displayName, "hung on with Focus Sash.");
  }
  target.hp = Math.max(0, target.hp - actual);
  if (cleanText(target.item) === "Air Balloon" && !target.airBalloonPopped && actual > 0) {
    target.airBalloonPopped = true;
    appendBattleLog(target.displayName, "popped its Air Balloon.");
  }
  applyThresholdItem(target);
  if (context.typeMultiplier > 1 && cleanText(target.item) === "Weakness Policy" && !target.itemConsumed && !target.fainted) {
    target.itemConsumed = true;
    applyBoostChanges(target, [{ stat: "attack", change: 2 }, { stat: "spattack", change: 2 }]);
    appendBattleLog(target.displayName, "activated Weakness Policy.");
  }
  if (cleanText(target.item) === "Rocky Helmet" && !target.itemConsumed && context.move.damageClass === "physical" && !context.attacker.fainted) {
    applyDirectDamage(context.attacker, Math.max(1, Math.floor(context.attacker.maxHp / 6)), "Rocky Helmet");
  }
  if (target.hp <= 0) {
    target.hp = 0;
    target.fainted = true;
    target.choiceLock = "";
    target.flinched = false;
    target.protecting = false;
    appendBattleLog(target.displayName, "fainted.");
  }
  return actual;
}

function applyDirectDamage(mon, amount, sourceLabel) {
  const actual = Math.max(0, Math.floor(amount));
  if (actual <= 0 || mon.fainted) return 0;
  mon.hp = Math.max(0, mon.hp - actual);
  appendBattleLog(mon.displayName, `${sourceLabel} dealt ${actual} damage.`);
  applyThresholdItem(mon);
  if (mon.hp <= 0) {
    mon.hp = 0;
    mon.fainted = true;
    mon.choiceLock = "";
    mon.protecting = false;
    mon.flinched = false;
    appendBattleLog(mon.displayName, "fainted.");
  }
  return actual;
}

function healCombatant(mon, amount) {
  if (mon.fainted) return 0;
  const healed = Math.max(0, Math.min(mon.maxHp - mon.hp, Math.floor(amount)));
  mon.hp += healed;
  return healed;
}

function resolveBeforeMoveStatus(mon, move) {
  if (mon.flinched) {
    mon.flinched = false;
    appendBattleLog(mon.displayName, "flinched and could not move.");
    return { blocked: true };
  }
  if (mon.status === "sleep") {
    mon.statusTurns -= 1;
    if (mon.statusTurns > 0) {
      appendBattleLog(mon.displayName, "is asleep.");
      return { blocked: true };
    }
    mon.status = "";
    mon.statusTurns = 0;
    appendBattleLog(mon.displayName, "woke up.");
  }
  if (mon.status === "freeze") {
    if (move.type === "Fire" || Math.random() < 0.2) {
      mon.status = "";
      appendBattleLog(mon.displayName, "thawed out.");
    } else {
      appendBattleLog(mon.displayName, "is frozen solid.");
      return { blocked: true };
    }
  }
  if (mon.status === "paralysis" && Math.random() < 0.25) {
    appendBattleLog(mon.displayName, "is fully paralyzed.");
    return { blocked: true };
  }
  if (mon.confusionTurns > 0) {
    mon.confusionTurns -= 1;
    if (Math.random() < 1 / 3) {
      applyDirectDamage(mon, calculateConfusionDamage(mon), "Confusion");
      appendBattleLog(mon.displayName, "hurt itself in confusion.");
      return { blocked: true };
    }
    if (mon.confusionTurns === 0) appendBattleLog(mon.displayName, "snapped out of confusion.");
  }
  return { blocked: false };
}

function applyEndOfTurnEffects() {
  ["alpha", "beta"].forEach((sideKey) => {
    const mon = getActiveCombatant(sideKey);
    if (!mon || mon.fainted) return;
    mon.protecting = false;
    mon.flinched = false;
    if (mon.status === "burn") applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 16)), "Burn");
    else if (mon.status === "poison") applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Poison");
    else if (mon.status === "tox") {
      mon.toxicCounter = Math.max(1, mon.toxicCounter + 1);
      applyDirectDamage(mon, Math.max(1, Math.floor((mon.maxHp * mon.toxicCounter) / 16)), "Bad poison");
    }
    if (mon.fainted) return;
    if (cleanText(mon.item) === "Leftovers" && !mon.itemConsumed) {
      if (healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16))) > 0) appendBattleLog(mon.displayName, "restored HP with Leftovers.");
    }
    if (cleanText(mon.item) === "Black Sludge" && !mon.itemConsumed) {
      if (mon.types.includes("Poison")) {
        if (healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16))) > 0) appendBattleLog(mon.displayName, "restored HP with Black Sludge.");
      } else {
        applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Black Sludge");
      }
    }
    if (cleanText(mon.item) === "Flame Orb" && !mon.itemConsumed && !mon.status) {
      if (inflictMajorStatus(mon, "burn")) appendBattleLog(mon.displayName, "was burned by Flame Orb.");
    }
    if (cleanText(mon.item) === "Toxic Orb" && !mon.itemConsumed && !mon.status) {
      if (inflictMajorStatus(mon, "tox")) appendBattleLog(mon.displayName, "was badly poisoned by Toxic Orb.");
    }
  });
}

function autoReplaceFainted(sideKey) {
  const team = state.battle.teams[sideKey];
  const active = team?.combatants?.[team.active];
  if (!team || (active && !active.fainted)) return;
  const replacementIndex = team.combatants.findIndex((mon) => !mon.fainted);
  if (replacementIndex >= 0) performSwitch(sideKey, replacementIndex, "replacement");
}

function forceSwitch(sideKey) {
  const team = state.battle.teams[sideKey];
  if (!team) return;
  const replacementIndex = team.combatants.findIndex((mon, index) => index !== team.active && !mon.fainted);
  if (replacementIndex >= 0) performSwitch(sideKey, replacementIndex, "replacement");
}

function setBattleWinnerIfNeeded() {
  const alphaAlive = countLivingCombatants("alpha");
  const betaAlive = countLivingCombatants("beta");
  if (alphaAlive > 0 && betaAlive > 0) return false;
  if (alphaAlive === 0 && betaAlive === 0) {
    state.battle.winner = "draw";
    appendBattleLog("Battle over", "Both teams ran out of battlers.");
    return true;
  }
  state.battle.winner = alphaAlive > 0 ? "alpha" : "beta";
  appendBattleLog("Battle over", `${state.battle.teams[state.battle.winner].label} won the match.`);
  return true;
}

function renderBattleImage(mon) {
  return renderImageMarkup(state.speciesById.get(mon.speciesId));
}

function renderStatusChips(mon) {
  const chips = [];
  if (mon.status) {
    const key = mon.status === "tox" ? "tox" : mon.status;
    chips.push(`<span class="status-chip ${escapeAttribute(statusClass(key))}">${escapeHtml(MAJOR_STATUS_LABELS[key] || key.toUpperCase())}</span>`);
  }
  if (mon.confusionTurns > 0) chips.push('<span class="status-chip cfn">CFN</span>');
  if (!chips.length) chips.push('<span class="status-chip">Healthy</span>');
  return chips.join("");
}

function renderBoostChips(mon) {
  const chips = BATTLE_STAGE_KEYS.filter((key) => mon.boosts[key]).map((key) => {
    const change = mon.boosts[key];
    return `<span class="boost-chip ${change > 0 ? "positive" : "negative"}">${escapeHtml(STAT_LABELS[key])} ${escapeHtml(`${change > 0 ? "+" : ""}${change}`)}</span>`;
  });
  return chips.length ? chips.join("") : '<span class="status-chip">No stat changes</span>';
}

function buildMoveSummary(move, moveSlot) {
  if (!move) return `No battle data | PP ${moveSlot.pp}/${moveSlot.maxPp}`;
  return [move.type, move.damageClass, move.power ? `${move.power} BP` : "Status", `PP ${moveSlot.pp}/${moveSlot.maxPp}`].join(" | ");
}

function describePendingAction(sideKey, action) {
  const team = state.battle.started ? state.battle.teams[sideKey] : null;
  if (!team) return "No action queued.";
  if (action.type === "switch") return `Switch to ${team.combatants[action.toIndex]?.displayName || "reserve"}`;
  return `Use ${team.combatants[team.active]?.moves[action.moveIndex]?.name || "move"}`;
}

function buildSpeciesOptions(selectedId) {
  const options = ['<option value="">Open slot</option>'];
  state.speciesList.forEach((species) => {
    options.push(`<option value="${escapeAttribute(species.id)}"${species.id === selectedId ? " selected" : ""}>${escapeHtml(species.displayName)}</option>`);
  });
  return options.join("");
}

function buildTypeOptions(currentType) {
  return ["", ...state.availableTypes].map((type) => {
    const label = type || "Unspecified";
    return `<option value="${escapeAttribute(type)}"${type === (currentType || "") ? " selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function buildShowdownName(baseName, form, customFormName) {
  if (form === "Base") return baseName;
  if (form === "Mega") return `${baseName}-Mega`;
  if (customFormName) return `${baseName}-${customFormName.replace(/\s+/g, "-")}`;
  return `${baseName}-${form.replace(/\s+/g, "-")}`;
}

function buildDisplayName(baseName, form, customFormName) {
  if (form === "Base") return baseName;
  return `${baseName} (${customFormName || form})`;
}

function buildFormLabel(species) {
  return species.form === "Base" ? "Base" : (species.customFormName || species.form);
}

function compareSpecies(left, right) {
  if (left.baseName !== right.baseName) return left.baseName.localeCompare(right.baseName);
  if (left.form === "Base" && right.form !== "Base") return -1;
  if (left.form !== "Base" && right.form === "Base") return 1;
  return left.displayName.localeCompare(right.displayName);
}

function buildMoveLookup() {
  moveLookup.clear();
  battleMoveLookup.clear();
  moveCatalog.forEach((move) => {
    moveLookup.set(toId(move.name), move.name);
    moveLookup.set(toId(move.id), move.name);
    const battleMove = battleCatalog[move.id];
    if (battleMove) {
      battleMoveLookup.set(toId(move.name), battleMove);
      battleMoveLookup.set(toId(move.id), battleMove);
    }
  });
  state.customMoves.forEach((move) => {
    moveLookup.set(toId(move.name), move.name);
    moveLookup.set(toId(move.rawName), move.name);
    battleMoveLookup.set(toId(move.name), buildBattleMoveFromCustom(move));
    battleMoveLookup.set(toId(move.rawName), buildBattleMoveFromCustom(move));
  });
  if (battleCatalog.struggle) battleMoveLookup.set("struggle", battleCatalog.struggle);
}

function buildItemLookup() {
  ITEM_CATALOG.forEach((item) => itemLookup.set(toId(item), item));
}

function seedMoveDatalist() {
  const names = new Set();
  const options = [];
  [...moveCatalog.map((move) => move.name), ...state.customMoves.map((move) => move.name)].forEach((name) => {
    if (!name || names.has(name)) return;
    names.add(name);
    options.push(`<option value="${escapeAttribute(name)}"></option>`);
  });
  dom.moveOptions.innerHTML = options.join("");
}

function seedItemDatalist() {
  dom.itemOptions.innerHTML = ITEM_CATALOG.map((item) => `<option value="${escapeAttribute(item)}"></option>`).join("");
}

function buildBattleMoveFromCustom(move) {
  return {
    id: toId(move.name),
    name: move.name,
    type: move.type || "Normal",
    power: move.category === "status" ? 0 : Math.max(0, move.power || 0),
    accuracy: move.battle.accuracy || 100,
    pp: move.battle.pp || 15,
    priority: move.battle.priority || 0,
    damageClass: move.category,
    target: move.battle.target || "selected-pokemon",
    modifiers: move.battle.modifiers.map((modifier) => ({
      type: modifier.type,
      chance: modifier.chance,
      target: modifier.target,
      stat: modifier.stat,
      stages: modifier.stages,
      amount: modifier.amount,
      status: modifier.status,
      boosts: modifier.type === "raise-stat" || modifier.type === "lower-stat"
        ? [{ stat: modifier.stat, change: modifier.type === "lower-stat" ? -modifier.stages : modifier.stages }]
        : [],
    })),
  };
}

function exportCustomMove(move) {
  return {
    ...move.source,
    rawName: move.rawName,
    name: move.name,
    type: move.type,
    power: move.power,
    category: move.category,
    description: move.description,
    battle: {
      accuracy: move.battle.accuracy,
      pp: move.battle.pp,
      priority: move.battle.priority,
      target: move.battle.target,
      modifiers: move.battle.modifiers.map((modifier) => ({
        id: modifier.id,
        type: modifier.type,
        chance: modifier.chance,
        target: modifier.target,
        stat: modifier.stat,
        stages: modifier.stages,
        amount: modifier.amount,
        status: modifier.status,
      })),
    },
  };
}

function syncCustomMoves(reRender = true) {
  state.sourceSave.movedex = state.customMoves.map(exportCustomMove);
  buildMoveLookup();
  seedMoveDatalist();
  if (reRender) renderMoveLab();
  renderTeamBuilder();
  refreshShowdownPanel();
  renderBattle();
}

function getOfficialMoves(slot) {
  const seen = new Set();
  const moves = [];
  slot.moves.forEach((rawMove) => {
    const canonical = canonicalizeMove(rawMove);
    if (canonical && !seen.has(canonical)) {
      seen.add(canonical);
      moves.push(canonical);
    }
  });
  return moves.slice(0, 4);
}

function getBattleMove(moveName) {
  return battleMoveLookup.get(toId(moveName)) || null;
}

function canonicalizeMove(rawMove) {
  const trimmed = cleanText(rawMove);
  return trimmed ? (moveLookup.get(toId(trimmed)) || "") : "";
}

function canonicalizeItem(rawItem) {
  const trimmed = cleanText(rawItem);
  return trimmed ? (itemLookup.get(toId(trimmed)) || "") : "";
}

function applyTheme(theme) {
  const accent = isHexColor(theme?.color) ? theme.color : "#8cffe4";
  const rgb = hexToRgb(accent);
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  document.documentElement.style.setProperty("--accent-glow", Number.isFinite(Number(theme?.glow)) ? `${Math.max(24, Number(theme.glow))}px` : "58px");
}

function renderTypeChip(type) {
  const color = TYPE_COLORS[type] || "#c4d7de";
  return `<span class="type-chip" style="background:${hexToRgba(color, 0.16)};border-color:${hexToRgba(color, 0.42)};color:${color};">${escapeHtml(type)}</span>`;
}

function renderImageMarkup(species) {
  if (species?.image) {
    return `<img src="${escapeAttribute(species.image)}" alt="${escapeAttribute(`${species.displayName} artwork`)}" loading="lazy">`;
  }
  return `<div class="portrait-fallback">${escapeHtml(species ? species.baseName.slice(0, 2).toUpperCase() : "??")}</div>`;
}

function getActiveRoster() {
  return state.rosters[state.activeRosterKey];
}

function createRosterState(key, label, isPrimary) {
  return { key, label, isPrimary, team: Array.from({ length: 6 }, createEmptySlot), loadedSnapshot: [], selectedSlot: 0 };
}

function createEmptySlot() {
  return { speciesId: "", moves: ["", "", "", ""], level: "", teraType: "", item: "" };
}

function createEmptyBattleState() {
  return { started: false, turn: 0, winner: "", teams: {}, pendingActions: { alpha: null, beta: null }, log: [] };
}

function createBoostState() {
  return { attack: 0, defense: 0, spattack: 0, spdefense: 0, speed: 0, accuracy: 0, evasion: 0 };
}

function resetBoosts(mon) {
  if (mon) mon.boosts = createBoostState();
}

function cloneTeam(team) {
  return team.map((slot) => ({ speciesId: slot.speciesId, moves: [...slot.moves], level: slot.level, teraType: slot.teraType, item: slot.item }));
}

function padMoves(moves) {
  return Array.from({ length: 4 }, (_, index) => moves[index] || "");
}

function calculateBattleStat(baseStat, level, isHp) {
  return isHp ? Math.floor(((2 * baseStat + 31) * level) / 100) + level + 10 : Math.floor(((2 * baseStat + 31) * level) / 100) + 5;
}

function getModifiedBattleStat(mon, statKey, move) {
  let value = statKey in mon.stats ? mon.stats[statKey] : 1;
  if (statKey === "accuracy" || statKey === "evasion") return getAccuracyStageMultiplier(mon.boosts[statKey] || 0);
  value *= getStatStageMultiplier(mon.boosts[statKey] || 0);
  if (statKey === "speed" && mon.status === "paralysis") value *= 0.5;
  if (statKey === "speed" && cleanText(mon.item) === "Choice Scarf" && !mon.itemConsumed) value *= 1.5;
  if (statKey === "attack" && cleanText(mon.item) === "Choice Band" && !mon.itemConsumed) value *= 1.5;
  if (statKey === "spattack" && cleanText(mon.item) === "Choice Specs" && !mon.itemConsumed) value *= 1.5;
  if (statKey === "spdefense" && cleanText(mon.item) === "Assault Vest" && !mon.itemConsumed) value *= 1.5;
  if (cleanText(mon.item) === "Air Balloon" && move?.type === "Ground" && !mon.airBalloonPopped) return value;
  return value;
}

function getStatStageMultiplier(stage) {
  return stage >= 0 ? (2 + stage) / 2 : 2 / (2 + Math.abs(stage));
}

function getAccuracyStageMultiplier(stage) {
  return stage >= 0 ? (3 + stage) / 3 : 3 / (3 + Math.abs(stage));
}

function getTypeMultiplier(moveType, targetTypes, target) {
  if (cleanText(target.item) === "Air Balloon" && moveType === "Ground" && !target.airBalloonPopped) return 0;
  return (targetTypes || []).reduce((multiplier, type) => multiplier * (typeof typeChart[moveType]?.[type] === "number" ? typeChart[moveType][type] : 1), 1);
}

function moveHitsTarget(user, target, move, targetIsOpponent) {
  if (!targetIsOpponent || move.accuracy === null || move.accuracy === 0) return true;
  const userAccuracy = getModifiedBattleStat(user, "accuracy");
  const targetEvasion = getModifiedBattleStat(target, "evasion");
  const itemModifier = cleanText(user.item) === "Wide Lens" ? 1.1 : 1;
  const targetModifier = cleanText(target.item) === "Bright Powder" ? 0.9 : 1;
  const chance = move.accuracy * userAccuracy / Math.max(0.1, targetEvasion) * itemModifier * targetModifier;
  return Math.random() * 100 < chance;
}

function getDamageItemModifier(user, move, typeMultiplier) {
  const item = cleanText(user.item);
  if (!item || user.itemConsumed) return 1;
  if (item === "Life Orb") return 1.3;
  if (item === "Expert Belt" && typeMultiplier > 1) return 1.2;
  if (item === "Muscle Band" && move.damageClass === "physical") return 1.1;
  if (item === "Wise Glasses" && move.damageClass === "special") return 1.1;
  if (TYPE_BOOST_ITEMS[item] === move.type) return 1.2;
  return 1;
}

function getCritChance(move, user) {
  const stage = Math.min(3, (move.critRate || 0) + ((cleanText(user.item) === "Scope Lens" && !user.itemConsumed) ? 1 : 0));
  if (stage <= 0) return 1 / 24;
  if (stage === 1) return 1 / 8;
  if (stage === 2) return 1 / 2;
  return 1;
}

function getMoveHitCount(move) {
  if (!move.minHits || !move.maxHits) return 1;
  return move.minHits === move.maxHits ? move.maxHits : move.minHits + Math.floor(Math.random() * (move.maxHits - move.minHits + 1));
}

function getDisplayedHitCount(move) {
  return move.minHits && move.maxHits ? move.maxHits : 1;
}

function moveTargetsOpponent(move) {
  return !SELF_TARGETS.has(move.target) && move.target !== "users-field";
}

function inflictMajorStatus(mon, status, move = {}) {
  if (mon.fainted || mon.status) return false;
  if (status === "burn" && mon.types.includes("Fire")) return false;
  if ((status === "poison" || status === "tox") && (mon.types.includes("Poison") || mon.types.includes("Steel"))) return false;
  if (status === "freeze" && mon.types.includes("Ice")) return false;
  if (status === "paralysis" && mon.types.includes("Electric")) return false;
  mon.status = status;
  mon.toxicCounter = 0;
  mon.statusTurns = status === "sleep" ? (move.sleepTurns || randomBetween(1, 3)) : 0;
  if (maybeUseStatusCureItem(mon, status)) return false;
  return true;
}

function inflictConfusion(mon, move) {
  if (mon.fainted || mon.confusionTurns > 0) return false;
  mon.confusionTurns = move.maxTurns ? randomBetween(move.minTurns || 2, move.maxTurns) : randomBetween(2, 4);
  if (maybeUseStatusCureItem(mon, "confusion")) return false;
  return true;
}

function maybeUseStatusCureItem(mon, incomingStatus) {
  const item = cleanText(mon.item);
  if (mon.itemConsumed || !item) return false;
  if (item === "Lum Berry" && (incomingStatus || mon.status || mon.confusionTurns > 0)) {
    mon.itemConsumed = true;
    mon.status = "";
    mon.statusTurns = 0;
    mon.toxicCounter = 0;
    mon.confusionTurns = 0;
    appendBattleLog(mon.displayName, "used Lum Berry to recover.");
    return true;
  }
  if (item === "Chesto Berry" && incomingStatus === "sleep") {
    mon.itemConsumed = true;
    mon.status = "";
    mon.statusTurns = 0;
    appendBattleLog(mon.displayName, "woke up with Chesto Berry.");
    return true;
  }
  return false;
}

function applyThresholdItem(mon) {
  const item = cleanText(mon.item);
  if (!item || mon.itemConsumed || mon.fainted || mon.hp <= 0 || mon.hp > Math.floor(mon.maxHp / 2)) return;
  if (item === "Sitrus Berry") {
    mon.itemConsumed = true;
    healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 4)));
    appendBattleLog(mon.displayName, "restored HP with Sitrus Berry.");
    return;
  }
  if (item === "Oran Berry") {
    mon.itemConsumed = true;
    healCombatant(mon, 10);
    appendBattleLog(mon.displayName, "restored HP with Oran Berry.");
  }
}

function calculateConfusionDamage(mon) {
  const levelFactor = Math.floor((2 * mon.level) / 5) + 2;
  const baseDamage = Math.floor(Math.floor((levelFactor * 40 * Math.max(1, mon.stats.attack)) / Math.max(1, mon.stats.defense)) / 50) + 2;
  return Math.max(1, baseDamage);
}

function applyBoostChanges(mon, boosts) {
  boosts.forEach((boost) => {
    mon.boosts[boost.stat] = clamp(mon.boosts[boost.stat] + boost.change, -6, 6);
  });
}

function getBoostEffectChance(move) {
  if (!move.boosts?.length) return 0;
  return move.statChance || 100;
}

function getAilmentEffectChance(move) {
  if (!move.ailment || move.ailment === "none" || move.ailment === "unknown") return 0;
  return move.ailmentChance || (move.damageClass === "status" ? 100 : 0);
}

function describeBoostChanges(boosts) {
  return boosts.map((boost) => `${STAT_LABELS[boost.stat]} ${boost.change > 0 ? "+" : ""}${boost.change}`).join(", ");
}

function describeStatusInfliction(status) {
  if (status === "burn") return "was burned.";
  if (status === "poison") return "was poisoned.";
  if (status === "paralysis") return "was paralyzed.";
  if (status === "sleep") return "fell asleep.";
  if (status === "freeze") return "was frozen solid.";
  return `was afflicted with ${status}.`;
}

function appendBattleLog(title, text = "", turnMarker = false) {
  if (!state.battle.log) state.battle.log = [];
  state.battle.log.push({ title, text, turnMarker });
  if (state.battle.log.length > 120) state.battle.log = state.battle.log.slice(-120);
}

function countLivingCombatants(sideKey) {
  return state.battle.teams[sideKey]?.combatants?.filter((mon) => !mon.fainted).length || 0;
}

function getActiveCombatant(sideKey) {
  const team = state.battle.teams[sideKey];
  return team?.combatants?.[team.active] || null;
}

function getBattleItemLabel(mon) {
  if (!mon.item) return "No held item";
  if (cleanText(mon.item) === "Air Balloon" && mon.airBalloonPopped) return "Air Balloon (popped)";
  if (mon.itemConsumed && /berry|balloon/i.test(mon.item)) return `${mon.item} (used)`;
  return mon.item;
}

function otherSideKey(sideKey) {
  return sideKey === "alpha" ? "beta" : "alpha";
}

function isChoiceItem(item) {
  return item === "Choice Band" || item === "Choice Specs" || item === "Choice Scarf";
}

function hpPercent(hp, maxHp) {
  return Math.max(0, Math.min(100, (hp / maxHp) * 100));
}

function hpClass(hp, maxHp) {
  const ratio = hp / maxHp;
  if (ratio <= 0.25) return "danger";
  if (ratio <= 0.5) return "warn";
  return "good";
}

function statusClass(status) {
  if (status === "paralysis") return "par";
  if (status === "burn") return "brn";
  if (status === "poison") return "psn";
  if (status === "tox") return "tox";
  if (status === "sleep") return "slp";
  if (status === "freeze") return "frz";
  return "cfn";
}

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanType(value) {
  const cleaned = cleanText(value);
  return !cleaned || cleaned.toUpperCase() === "N/A" ? "" : cleaned;
}

function safeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeLevel(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(1, Math.min(100, Math.round(parsed))) : "";
}

function toId(value) {
  return cleanText(String(value || "")).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function isHexColor(value) {
  return typeof value === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "").trim();
  const expanded = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  return { r: parseInt(expanded.slice(0, 2), 16), g: parseInt(expanded.slice(2, 4), 16), b: parseInt(expanded.slice(4, 6), 16) };
}

function hexToRgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function escapeHtml(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function setStatus(message) {
  dom.statusText.textContent = message;
}
