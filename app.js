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
const HAZARD_MOVES = new Set(["stealth-rock", "spikes", "toxic-spikes", "sticky-web"]);
const TWO_TURN_MOVE_MESSAGES = {
  "bounce": "sprang up.",
  "dig": "dug underground.",
  "dive": "dove underwater.",
  "electro-shot": "absorbed electricity.",
  "fly": "flew up high.",
  "geomancy": "began charging its power.",
  "meteor-beam": "gathered space power.",
  "phantom-force": "vanished instantly.",
  "razor-wind": "whipped up a whirlwind.",
  "shadow-force": "vanished instantly.",
  "skull-bash": "tucked in its head.",
  "sky-attack": "became cloaked in a harsh light.",
  "solar-beam": "absorbed light.",
  "solar-blade": "absorbed light.",
};
const TWO_TURN_MOVE_IDS = new Set(Object.keys(TWO_TURN_MOVE_MESSAGES));
const CHARGING_STAT_BOOSTS = {
  "electro-shot": [{ stat: "spattack", change: 1 }],
  "meteor-beam": [{ stat: "spattack", change: 1 }],
  "skull-bash": [{ stat: "defense", change: 1 }],
};
const SOUND_MOVE_KEYWORDS = ["voice", "song", "sound", "noise", "clang", "screech", "snarl", "roar", "hypervoice", "echoedvoice", "boomburst"];
const BALL_BOMB_MOVE_KEYWORDS = ["ball", "bomb", "seed", "sphere", "egg", "pollen"];
const BITE_MOVE_KEYWORDS = ["bite", "fang", "jaw", "crunch"];
const PUNCH_MOVE_KEYWORDS = ["punch", "cometpunch", "machpunch", "meteormash", "bulletpunch"];
const PULSE_MOVE_KEYWORDS = ["pulse", "aura-sphere", "origin-pulse", "dragon-pulse", "dark-pulse", "water-pulse"];
const SLICING_MOVE_KEYWORDS = ["slash", "cut", "blade", "cleave", "scythe", "sword", "leafblade", "psyblade"];
const WIND_MOVE_KEYWORDS = ["wind", "storm", "gust", "hurricane", "twister", "bleakwind", "springtide", "wildbolt"];
const POWDER_MOVE_KEYWORDS = ["powder", "spore", "cotton-spore", "rage-powder", "sleep-powder", "stun-spore"];
const UNSWAPPABLE_ABILITIES = new Set([
  "multitype", "rkssystem", "schooling", "comatose", "disguise", "iceface", "powerconstruct", "battlebond",
  "zenmode", "shieldsdown", "forecast", "illusion", "trace", "imposter", "stancechange",
]);
const STANCE_CHANGE_MOVES = new Set([
  "kings-shield", "sacred-sword", "shadow-sneak", "iron-head", "flash-cannon", "shadow-ball", "close-combat",
]);

const TYPE_BOOST_ITEMS = {
  "Silk Scarf": "Normal", Charcoal: "Fire", "Mystic Water": "Water", Magnet: "Electric", "Miracle Seed": "Grass",
  "Never-Melt Ice": "Ice", "Black Belt": "Fighting", "Poison Barb": "Poison", "Soft Sand": "Ground",
  "Sharp Beak": "Flying", "Twisted Spoon": "Psychic", "Silver Powder": "Bug", "Hard Stone": "Rock",
  "Spell Tag": "Ghost", "Dragon Fang": "Dragon", "Black Glasses": "Dark", "Metal Coat": "Steel", "Pixie Plate": "Fairy",
};

const PLATE_TYPE_ITEMS = {
  "Flame Plate": "Fire", "Splash Plate": "Water", "Zap Plate": "Electric", "Meadow Plate": "Grass",
  "Icicle Plate": "Ice", "Fist Plate": "Fighting", "Toxic Plate": "Poison", "Earth Plate": "Ground",
  "Sky Plate": "Flying", "Mind Plate": "Psychic", "Insect Plate": "Bug", "Stone Plate": "Rock",
  "Spooky Plate": "Ghost", "Draco Plate": "Dragon", "Dread Plate": "Dark", "Iron Plate": "Steel", "Pixie Plate": "Fairy",
};

const MEMORY_TYPE_ITEMS = {
  "Fire Memory": "Fire", "Water Memory": "Water", "Electric Memory": "Electric", "Grass Memory": "Grass",
  "Ice Memory": "Ice", "Fighting Memory": "Fighting", "Poison Memory": "Poison", "Ground Memory": "Ground",
  "Flying Memory": "Flying", "Psychic Memory": "Psychic", "Bug Memory": "Bug", "Rock Memory": "Rock",
  "Ghost Memory": "Ghost", "Dragon Memory": "Dragon", "Dark Memory": "Dark", "Steel Memory": "Steel", "Fairy Memory": "Fairy",
};

const ITEM_CATALOG = [
  "Leftovers", "Black Sludge", "Sitrus Berry", "Oran Berry", "Lum Berry", "Chesto Berry", "Life Orb", "Focus Sash",
  "Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry",
  "Rocky Helmet", "Shell Bell", "Expert Belt", "Choice Band", "Choice Specs", "Choice Scarf", "Assault Vest",
  "Air Balloon", "Weakness Policy", "Power Herb", "Quick Claw", "Scope Lens", "King's Rock", "Razor Fang", "Flame Orb", "Toxic Orb",
  "Muscle Band", "Wise Glasses", "Silk Scarf", "Charcoal", "Mystic Water", "Magnet", "Miracle Seed", "Never-Melt Ice",
  "Black Belt", "Poison Barb", "Soft Sand", "Sharp Beak", "Twisted Spoon", "Silver Powder", "Hard Stone",
  "Spell Tag", "Dragon Fang", "Black Glasses", "Metal Coat", "Pixie Plate",
  "Flame Plate", "Splash Plate", "Zap Plate", "Meadow Plate", "Icicle Plate", "Fist Plate", "Toxic Plate", "Earth Plate",
  "Sky Plate", "Mind Plate", "Insect Plate", "Stone Plate", "Spooky Plate", "Draco Plate", "Dread Plate", "Iron Plate",
  "Fire Memory", "Water Memory", "Electric Memory", "Grass Memory", "Ice Memory", "Fighting Memory", "Poison Memory",
  "Ground Memory", "Flying Memory", "Psychic Memory", "Bug Memory", "Rock Memory", "Ghost Memory", "Dragon Memory",
  "Dark Memory", "Steel Memory", "Fairy Memory",
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

const MOLD_BREAKER_ABILITIES = new Set(["moldbreaker", "turboblaze", "teravolt"]);
const STAT_DROP_BLOCK_ABILITIES = new Set(["clearbody", "whitesmoke", "fullmetalbody"]);
const IGNORABLE_DEFENDER_ABILITIES = new Set([
  "levitate", "flashfire", "waterabsorb", "dryskin", "stormdrain", "watercompaction", "voltabsorb",
  "lightningrod", "motordrive", "sapsipper", "eartheater", "wellbakedbody", "wonderguard",
  "thickfat", "heatproof", "multiscale", "shadowshield", "filter", "solidrock", "prismarmor",
  "furcoat", "icescales", "fluffy", "waterbubble", "waterveil", "limber", "immunity", "pastelveil",
  "insomnia", "vitalspirit", "sweetveil", "magmaarmor", "owntempo", "purifyingsalt", "comatose",
  "static", "flamebody", "poisonpoint", "roughskin", "ironbarbs", "effectspore", "gooey", "tanglinghair",
]);
const CONTACT_HINT_KEYWORDS = [
  "punch", "kick", "tackle", "slam", "head", "horn", "claw", "scratch", "whip", "tail", "bite",
  "fang", "jab", "chop", "cut", "crush", "stomp", "smash", "bash", "grip", "wrap", "bind", "throw",
  "rush", "charge", "tackle", "attack",
];
const NON_CONTACT_HINT_KEYWORDS = [
  "beam", "blast", "wave", "shot", "cannon", "gun", "bomb", "missile", "leaf", "spore", "powder",
  "ray", "pulse", "wind", "storm", "sound", "noise", "song", "dance",
];
const NON_CONTACT_MOVE_IDS = new Set([
  "earthquake", "rockslide", "rockblast", "bonemerang", "bulldoze", "iciclespear", "bulletseed", "pinmissile",
  "stoneaxe", "stoneshard", "bonerush", "dragondarts", "populationbomb", "barrage",
]);
const HEALING_MOVE_IDS = new Set([
  "recover", "roost", "softboiled", "slackoff", "synthesis", "moonlight", "morningsun", "shoreup",
  "healorder", "milkdrink", "wish", "junglehealing", "lifedew", "floralhealing",
]);

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
  activeMainTab: "builder",
  activeBuilderTab: "team",
  selectedSpeciesId: "",
  customMoves: [],
  customMoveById: new Map(),
  customAbilities: [],
  customAbilityById: new Map(),
  selectedCustomMoveId: "",
  searchTerm: "",
  typeFilter: "all",
  availableTypes: STANDARD_TYPE_ORDER.slice(),
  rosters: {
    alpha: createRosterState("alpha", "Team A", true),
    beta: createRosterState("beta", "Team B", false),
  },
  battleMode: "singles",
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
  renderMainTabs();
  renderBuilderTabs();
  renderTypeFilter();
  renderRosterTabs();
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();
  renderMainPanels();
  renderBuilderPanels();
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
  dom.battleModeButton = document.getElementById("battle-mode-button");
  dom.resolveTurnButton = document.getElementById("resolve-turn-button");
  dom.resetBattleButton = document.getElementById("reset-battle-button");
  dom.statusText = document.getElementById("status-text");
  dom.fileName = document.getElementById("file-name");
  dom.searchInput = document.getElementById("search-input");
  dom.typeFilter = document.getElementById("type-filter");
  dom.mainTabs = document.getElementById("main-tabs");
  dom.builderTabs = document.getElementById("builder-tabs");
  dom.rosterTabs = document.getElementById("roster-tabs");
  dom.selectedSlotStrip = document.getElementById("selected-slot-select");
  dom.teamBuilder = document.getElementById("team-builder");
  dom.teamPanel = document.getElementById("team-panel");
  dom.dexList = document.getElementById("dex-list");
  dom.dexDetail = document.getElementById("dex-detail");
  dom.dexPanel = document.getElementById("dex-panel");
  dom.battlePanel = document.getElementById("battle-panel");
  dom.exportPanel = document.getElementById("export-panel");
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
  dom.battleModeButton.addEventListener("click", toggleBattleMode);
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

  dom.mainTabs.addEventListener("click", handleMainTabClick);
  dom.builderTabs.addEventListener("click", handleBuilderTabClick);
  dom.rosterTabs.addEventListener("click", handleRosterTabClick);
  dom.selectedSlotStrip.addEventListener("change", handleSlotStripClick);
  dom.teamBuilder.addEventListener("click", handleTeamBuilderClick);
  dom.teamBuilder.addEventListener("change", handleTeamBuilderChange);
  dom.teamBuilder.addEventListener("input", handleTeamBuilderInput);
  dom.teamBuilder.addEventListener("focusout", handleTeamBuilderFocusOut);
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
  rebuildCustomAbilityState(parsed.abilitydex);
  buildMoveLookup();
  seedMoveDatalist();
  state.speciesList = buildSpeciesList(parsed.pokedex);
  state.speciesById = new Map(state.speciesList.map((species) => [species.id, species]));
  state.speciesLookup = buildSpeciesLookup(state.speciesList);
  state.availableTypes = buildAvailableTypes(state.speciesList);
  state.searchTerm = "";
  state.typeFilter = "all";
  state.activeRosterKey = "alpha";
  state.activeMainTab = "builder";
  state.activeBuilderTab = "team";
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
  renderMainTabs();
  renderBuilderTabs();
  renderRosterTabs();
  renderSelectedSlotStrip();
  renderTeamBuilder();
  renderDexList();
  renderDexDetail();
  refreshShowdownPanel();
  renderBattle();
  renderMainPanels();
  renderBuilderPanels();

  let message = `Loaded ${state.speciesList.length} species and ${loaded.team.length} Team A slots from ${fileName}.`;
  if (loaded.ignoredMoves) message += ` Ignored ${loaded.ignoredMoves} unknown move${loaded.ignoredMoves === 1 ? "" : "s"}.`;
  if (state.customAbilities.length) message += ` Loaded ${state.customAbilities.length} custom ability${state.customAbilities.length === 1 ? "" : "ies"}.`;
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
    const battle = normalizeCustomMoveBattle(entry.battle, entry);
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

function normalizeCustomMoveBattle(battle, fallbackEntry = {}) {
  const source = battle && typeof battle === "object" ? battle : {};
  const sourceModifiers = Array.isArray(source.modifiers) && source.modifiers.length
    ? source.modifiers
    : (Array.isArray(fallbackEntry?.modifiers) ? fallbackEntry.modifiers : []);
  const modifiers = sourceModifiers.length
    ? sourceModifiers.map((modifier, index) => normalizeCustomMoveModifier(modifier, index)).filter(Boolean)
    : buildLegacyCustomMoveModifiers(source);
  return {
    accuracy: source.accuracy === "" || source.accuracy == null ? 100 : clamp(safeNumber(source.accuracy) || 100, 1, 100),
    pp: Math.max(1, safeNumber(source.pp) || 15),
    priority: clamp(safeNumber(source.priority), -7, 7),
    target: normalizeMoveTarget(source.target),
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
  const target = normalizeEffectTarget(modifier?.target);
  const stat = BATTLE_STAGE_KEYS.includes(modifier?.stat) ? modifier.stat : "attack";
  const stages = clamp(Math.abs(safeNumber(modifier?.stages) || 1), 1, 6);
  const amount = clamp(Math.abs(safeNumber(modifier?.amount) || 25), 1, 100);
  const status = normalizeCustomStatus(modifier?.status);
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

function normalizeMoveTarget(target) {
  return ["user", "self"].includes(cleanText(target).toLowerCase()) ? "user" : "selected-pokemon";
}

function normalizeEffectTarget(target) {
  return ["user", "self"].includes(cleanText(target).toLowerCase()) ? "user" : "target";
}

function normalizeCustomStatus(status) {
  const value = cleanText(status).toLowerCase();
  if (["tox", "toxic", "bad-poison", "bad poison", "badly poisoned"].includes(value)) return "tox";
  if (["poison", "psn", "poisoned"].includes(value)) return "poison";
  if (["burn", "brn", "burned", "burnt"].includes(value)) return "burn";
  if (["paralysis", "paralyze", "paralyzed", "par"].includes(value)) return "paralysis";
  if (["sleep", "slp", "asleep"].includes(value)) return "sleep";
  if (["freeze", "frozen", "frz"].includes(value)) return "freeze";
  if (["confusion", "confused", "cfn"].includes(value)) return "confusion";
  return "burn";
}

function rebuildCustomMoveState(rawMovedex) {
  state.customMoves = buildCustomMoveList(rawMovedex);
  state.customMoveById = new Map(state.customMoves.map((move) => [move.id, move]));
  if (!state.customMoveById.has(state.selectedCustomMoveId)) {
    state.selectedCustomMoveId = state.customMoves[0]?.id || "";
  }
}

function normalizeAbilityModifier(modifier, index) {
  return {
    id: String(modifier?.id || `ability-modifier-${index}-${Math.random().toString(36).slice(2, 8)}`),
    chance: clamp(safeNumber(modifier?.chance) || 100, 1, 100),
    event: cleanText(modifier?.event) || "switch-in",
    action: cleanText(modifier?.action) || "raise-stat",
    target: cleanText(modifier?.target) || "self",
    stat: cleanText(modifier?.stat).toLowerCase() || "attack",
    stages: clamp(safeNumber(modifier?.stages) || 1, 1, 6),
    amount: clamp(safeNumber(modifier?.amount) || 25, 1, 100),
    status: normalizeCustomStatus(modifier?.status),
    type: cleanType(modifier?.type) || "Normal",
    weather: cleanText(modifier?.weather).toLowerCase() || "sun",
    terrain: cleanText(modifier?.terrain).toLowerCase() || "electric",
    moveCategory: normalizeMoveCategory(modifier?.moveCategory),
    priority: String(modifier?.priority || "1"),
    targeting: cleanText(modifier?.targeting) || "normal",
  };
}

function buildCustomAbilityList(rawAbilitydex) {
  if (!Array.isArray(rawAbilitydex)) return [];
  return rawAbilitydex.map((entry, index) => ({
    index,
    id: toId(entry?.name || `custom-ability-${index}`),
    name: cleanText(entry?.name),
    description: cleanText(entry?.description),
    modifiers: Array.isArray(entry?.modifiers) ? entry.modifiers.map((modifier, modifierIndex) => normalizeAbilityModifier(modifier, modifierIndex)).filter(Boolean) : [],
  })).filter((ability) => ability.name);
}

function rebuildCustomAbilityState(rawAbilitydex) {
  state.customAbilities = buildCustomAbilityList(rawAbilitydex);
  state.customAbilityById = new Map(state.customAbilities.map((ability) => [ability.id, ability]));
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

function handleBuilderTabClick(event) {
  const button = event.target.closest(".segmented-button[data-builder-tab]");
  if (!button) return;
  state.activeBuilderTab = button.dataset.builderTab === "creatures" ? "creatures" : "team";
  renderBuilderTabs();
  renderBuilderPanels();
}

function handleMainTabClick(event) {
  const button = event.target.closest(".segmented-button[data-main-tab]");
  if (!button) return;
  state.activeMainTab = button.dataset.mainTab === "battle" ? "battle" : "builder";
  renderMainTabs();
  renderMainPanels();
}

function handleSlotStripClick(event) {
  const target = event.target;
  if (!target.matches(".slot-select")) return;
  getActiveRoster().selectedSlot = Number(target.value) || 0;
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
      state.activeBuilderTab = "team";
      renderBuilderTabs();
      renderBuilderPanels();
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
  void event;
}

function handleMoveLabClick(event) {
  void event;
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
    state.activeBuilderTab = "team";
    renderBuilderTabs();
    renderBuilderPanels();
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
    setBattleAction(moveButton.dataset.side, { type: "move", moveIndex: Number(moveButton.dataset.move), userIndex: Number(moveButton.dataset.user) });
    return;
  }
  const switchButton = event.target.closest(".battle-switch-button[data-side][data-switch]");
  if (switchButton) {
    setBattleAction(switchButton.dataset.side, { type: "switch", toIndex: Number(switchButton.dataset.switch), userIndex: Number(switchButton.dataset.user) });
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

function renderMainTabs() {
  dom.mainTabs.innerHTML = [
    { key: "builder", title: "Builder", subtitle: "Teams, creatures, export" },
    { key: "battle", title: "Battle", subtitle: "Arena and battle log" },
  ].map((tab) => `
    <button class="segmented-button${state.activeMainTab === tab.key ? " active" : ""}" data-main-tab="${tab.key}" type="button">
      <strong>${escapeHtml(tab.title)}</strong>
      <small>${escapeHtml(tab.subtitle)}</small>
    </button>
  `).join("");
}

function renderMainPanels() {
  const showBuilder = state.activeMainTab === "builder";
  if (dom.teamPanel) dom.teamPanel.classList.toggle("main-hidden", !showBuilder);
  if (dom.dexPanel) dom.dexPanel.classList.toggle("main-hidden", !showBuilder);
  if (dom.exportPanel) dom.exportPanel.classList.toggle("main-hidden", !showBuilder);
  if (dom.builderTabs) dom.builderTabs.closest(".builder-tabs-panel")?.classList.toggle("main-hidden", !showBuilder);
  if (dom.battlePanel) dom.battlePanel.classList.toggle("main-hidden", showBuilder);
}

function renderBuilderTabs() {
  dom.builderTabs.innerHTML = [
    { key: "team", title: "Team Slots", subtitle: "Edit one slot at a time" },
    { key: "creatures", title: "Creatures", subtitle: "Browse the Dinodex" },
  ].map((tab) => `
    <button class="segmented-button${state.activeBuilderTab === tab.key ? " active" : ""}" data-builder-tab="${tab.key}" type="button">
      <strong>${escapeHtml(tab.title)}</strong>
      <small>${escapeHtml(tab.subtitle)}</small>
    </button>
  `).join("");
}

function renderBuilderPanels() {
  if (dom.teamPanel) dom.teamPanel.classList.toggle("hidden-panel", state.activeBuilderTab !== "team");
  if (dom.dexPanel) dom.dexPanel.classList.toggle("hidden-panel", state.activeBuilderTab !== "creatures");
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
    return `<option value="${index}"${index === roster.selectedSlot ? " selected" : ""}>Slot ${index + 1}: ${escapeHtml(species?.displayName || "Empty")}</option>`;
  }).join("");
}

function renderTeamBuilder() {
  const roster = getActiveRoster();
  const index = roster.selectedSlot;
  const slot = roster.team[index];
  const species = state.speciesById.get(slot.speciesId);
  dom.teamBuilder.innerHTML = `
      <article class="team-slot selected" data-slot="${index}">
        <div class="team-slot-head">
          <div class="slot-portrait">${renderImageMarkup(species)}</div>
          <div class="slot-copy">
            <p class="eyebrow">${escapeHtml(roster.label)} Slot ${index + 1}</p>
            <h3 class="slot-title">${escapeHtml(species?.displayName || "Open Slot")}</h3>
            <p class="slot-subtitle">${escapeHtml(species ? species.showdownName : "Choose a species from the custom dex")}</p>
            <div class="battle-meta-row"><span class="team-badge${roster.isPrimary ? "" : " secondary"}">${escapeHtml(roster.isPrimary ? "Save-backed roster" : "Battle-only roster")}</span></div>
            <p class="small-copy">${escapeHtml(species?.ability ? `Ability: ${species.ability}` : "Ability: none listed")}</p>
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
                <input class="move-input${invalid ? " invalid" : ""}" data-slot="${index}" data-move="${moveIndex}" type="text" list="move-options" value="${escapeAttribute(move)}" placeholder="Enter an official or Dinodex move">
              </label>
            `;
          }).join("")}
        </div>

        <p class="move-help">Official moves and Dinodex moves from this save both work in the local battle sandbox.</p>

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
        <p>${escapeHtml(species.ability || "No ability listed for this creature.")}</p>
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
    ...createEmptyBattleState(),
    started: true,
    mode: state.battleMode,
    teams: { alpha: alphaTeam, beta: betaTeam },
    log: [{ title: "Battle started", text: `${alphaTeam.label} and ${betaTeam.label} entered the arena.`, turnMarker: false }],
  };
  getActiveCombatants("alpha").forEach((mon) => applySwitchInAbilities("alpha", "lead", mon));
  getActiveCombatants("beta").forEach((mon) => applySwitchInAbilities("beta", "lead", mon));
  renderBattle();
  setStatus(`Started a local ${state.battleMode === "doubles" ? "double" : "single"} battle between Team A and Team B.`);
}

function toggleBattleMode() {
  if (state.battle.started) {
    setStatus("Reset the current battle before changing battle mode.");
    return;
  }
  state.battleMode = state.battleMode === "doubles" ? "singles" : "doubles";
  renderBattle();
  setStatus(`Battle mode set to ${state.battleMode === "doubles" ? "Doubles" : "Singles"}.`);
}

function resetBattle() {
  state.battle = createEmptyBattleState();
  renderBattle();
}

function setBattleAction(sideKey, action) {
  if (!state.battle.started || state.battle.winner) return;
  const userIndex = typeof action.userIndex === "number" ? action.userIndex : getPrimaryActiveIndex(sideKey);
  const validation = action.type === "move" ? canSelectBattleMove(sideKey, action.moveIndex, userIndex) : canSelectBattleSwitch(sideKey, action.toIndex, userIndex);
  if (!validation.ok) {
    appendBattleLog("Action blocked", validation.message || "That action is not available.");
    renderBattle();
    return;
  }
  state.battle.pendingActions[sideKey][userIndex] = { ...action, userIndex };
  renderBattle();
  if (areAllBattleActionsQueued()) {
    window.setTimeout(resolveBattleTurn, 0);
  }
}

function resolveBattleTurn() {
  const battle = state.battle;
  if (!battle.started || battle.winner || !areAllBattleActionsQueued()) return;
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
  battle.pendingActions.alpha = {};
  battle.pendingActions.beta = {};
  renderBattle();
}

function renderBattle() {
  const battle = state.battle;
  if (dom.battleModeButton) dom.battleModeButton.textContent = `Mode: ${state.battleMode === "doubles" ? "Doubles" : "Singles"}`;
  dom.resolveTurnButton.disabled = true;
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
    : `Choose one action for each active battler. The ${battle.mode === "doubles" ? "double" : "single"} battle resolves automatically once everyone is queued.`;
  const fieldState = [
    battle.weather && `Weather: ${normalizeWeatherLabel(battle.weather)}`,
    battle.terrain && `Terrain: ${normalizeTerrainLabel(battle.terrain)}`,
  ].filter(Boolean).join(" | ");
  dom.battleTurn.textContent = fieldState ? `Turn ${battle.turn} | ${fieldState}` : `Turn ${battle.turn}`;
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
  const activeIndexes = getActiveIndexes(sideKey);
  if (!team || !activeIndexes.length) return '<div class="empty-state battle-panel-block"><p>No active battler.</p></div>';
  return activeIndexes.map((activeIndex, slotIndex) => renderBattleActiveCard(sideKey, activeIndex, slotIndex)).join("");
}

function renderBattleActiveCard(sideKey, activeIndex, slotIndex) {
  const team = state.battle.teams[sideKey];
  const active = team.combatants[activeIndex];
  const pending = state.battle.pendingActions[sideKey]?.[activeIndex];
  const reserveCards = team.combatants.map((mon, index) => {
    const valid = canSelectBattleSwitch(sideKey, index, activeIndex);
    return `
      <button class="battle-choice battle-switch-button${getActiveIndexes(sideKey).includes(index) ? " active" : ""}" type="button" data-side="${sideKey}" data-user="${activeIndex}" data-switch="${index}"${valid.ok ? "" : " disabled"}>
        <strong>${escapeHtml(mon.displayName)}</strong>
        <small>${escapeHtml(mon.fainted ? "Fainted" : `${mon.hp}/${mon.maxHp} HP`)}${mon.item ? ` | ${escapeHtml(getBattleItemLabel(mon))}` : ""}</small>
      </button>
    `;
  }).join("");

  const moveCards = active.moves.map((moveSlot, index) => {
    const move = getBattleMove(moveSlot.name);
    const valid = canSelectBattleMove(sideKey, index, activeIndex);
    return `
      <button class="battle-choice battle-move-button${pending?.type === "move" && pending.moveIndex === index ? " active" : ""}" type="button" data-side="${sideKey}" data-user="${activeIndex}" data-move="${index}"${valid.ok ? "" : " disabled"}>
        <strong>${escapeHtml(moveSlot.name)}</strong>
        <small>${escapeHtml(buildMoveSummary(move, moveSlot))}</small>
      </button>
    `;
  }).join("");

  return `
    <div class="battle-active-card">
      <div class="battle-side-head">
        <strong>${escapeHtml(`${team.label}${isDoubleBattle() ? ` Slot ${slotIndex + 1}` : ""}`)}</strong>
        <span class="team-badge${sideKey === "beta" ? " secondary" : ""}">${escapeHtml(pending ? describePendingAction(sideKey, pending) : "Awaiting action")}</span>
      </div>
      <div class="battle-art">${renderBattleImage(active)}</div>
      <div>
        <h3 class="battle-card-title">${escapeHtml(active.displayName)}</h3>
        <p class="battle-card-subtitle">Level ${escapeHtml(String(active.level))}${active.item ? ` | ${escapeHtml(getBattleItemLabel(active))}` : ""}${active.ability ? ` | ${escapeHtml(active.ability)}` : ""}${getCombatantFormLabel(active) ? ` | ${escapeHtml(getCombatantFormLabel(active))}` : ""}</p>
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
  return ["alpha", "beta"].flatMap((sideKey) => getActiveIndexes(sideKey).map((activeIndex, slotIndex) => {
    const label = `${state.battle.teams[sideKey]?.label || sideKey}${isDoubleBattle() ? ` Slot ${slotIndex + 1}` : ""}`;
    const action = state.battle.pendingActions[sideKey]?.[activeIndex];
    return renderPendingCard(label, action ? describePendingAction(sideKey, action) : "No action queued.");
  })).join("");
}

function renderPendingCard(label, text) {
  return `<div class="pending-card"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(text)}</p></div>`;
}

function buildBattleTeam(sideKey) {
  const roster = state.rosters[sideKey];
  const combatants = roster.team.map((slot, rosterSlot) => buildCombatant(slot, rosterSlot)).filter(Boolean);
  if (!combatants.length) return null;
  return { sideKey, label: roster.label, active: state.battleMode === "doubles" ? combatants.slice(0, 2).map((_, index) => index) : 0, combatants };
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
    baseDisplayName: species.displayName,
    showdownName: species.showdownName,
    ability: cleanText(species.ability),
    originalAbility: cleanText(species.ability),
    types: species.types.length ? species.types : ["Normal"],
    originalTypes: [...(species.types.length ? species.types : ["Normal"])],
    level,
    hp: stats.hp,
    maxHp: stats.hp,
    stats,
    originalStats: { ...stats },
    boosts: createBoostState(),
    status: "",
    statusTurns: 0,
    toxicCounter: 0,
    confusionTurns: 0,
    fainted: false,
    flinched: false,
    protecting: false,
    fresh: true,
    switchedInThisTurn: false,
    item: canonicalizeItem(slot.item) || cleanText(slot.item),
    itemConsumed: false,
    airBalloonPopped: false,
    choiceLock: "",
    lastMoveUsed: "",
    flashFireBoost: false,
    truantLoafing: false,
    transformed: false,
    stolenItemThisTurn: false,
    disguiseBroken: false,
    iceFaceBroken: false,
    berserkTriggered: false,
    disabledMove: "",
    disabledTurns: 0,
    perishCount: 0,
    chargedMoveBoost: false,
    chargingMove: null,
    angerShellTriggered: false,
    emergencyExitTriggered: false,
    slowStartTurns: cleanText(species.ability).toLowerCase().replace(/[^a-z0-9]+/g, "") === "slowstart" ? 5 : 0,
    consumedItem: "",
    cudChewItem: "",
    cudChewTurns: 0,
    battleBonded: false,
    powerConstructed: false,
    gulpMissileLoaded: false,
    dancerMoveCopied: "",
    originalSpeciesId: species.id,
    originalShowdownName: species.showdownName,
    currentForm: species.form || "Base",
    moves,
    originalMoves: moves.map((moveSlotData) => ({ ...moveSlotData })),
  };
}

function canSelectBattleMove(sideKey, moveIndex, userIndex = getPrimaryActiveIndex(sideKey)) {
  if (!state.battle.started || state.battle.winner) return { ok: false, message: "The battle is not accepting actions." };
  const mon = getCombatantByIndex(sideKey, userIndex);
  if (!mon || mon.fainted) return { ok: false, message: "That side has no active battler." };
  if (mon.chargingMove) return { ok: true, message: "" };
  const moveSlot = mon.moves[moveIndex];
  if (!moveSlot) return { ok: false, message: "That move slot is empty." };
  if (moveSlot.pp <= 0) return { ok: false, message: `${moveSlot.name} is out of PP.` };
  if (canUseHeldItem(mon) && isChoiceItem(mon.item) && mon.choiceLock && mon.choiceLock !== moveSlot.name) {
    return { ok: false, message: `${mon.displayName} is locked into ${mon.choiceLock}.` };
  }
  if (abilityId(mon) === "gorillatactics" && mon.choiceLock && mon.choiceLock !== moveSlot.name) {
    return { ok: false, message: `${mon.displayName} is locked into ${mon.choiceLock}.` };
  }
  const move = getBattleMove(moveSlot.name);
  if (canUseHeldItem(mon) && cleanText(mon.item) === "Assault Vest" && move?.damageClass === "status") {
    return { ok: false, message: "Assault Vest blocks status moves." };
  }
  if (move?.id === "fake-out" && !mon.fresh) {
    return { ok: false, message: "Fake Out only works on the first turn this battler is active." };
  }
  if (abilityId(mon) === "truant" && mon.truantLoafing) {
    return { ok: false, message: `${mon.displayName} is loafing around because of Truant.` };
  }
  if (mon.disabledMove && mon.disabledMove === moveSlot.name) {
    return { ok: false, message: `${moveSlot.name} is disabled.` };
  }
  return { ok: true, message: "" };
}

function canSelectBattleSwitch(sideKey, toIndex, userIndex = getPrimaryActiveIndex(sideKey)) {
  if (!state.battle.started || state.battle.winner) return { ok: false, message: "The battle is not accepting switches." };
  const team = state.battle.teams[sideKey];
  const target = team?.combatants[toIndex];
  const active = team?.combatants[userIndex];
  const foe = getOpposingTarget(sideKey, userIndex);
  if (!team || !target) return { ok: false, message: "That switch target does not exist." };
  if (getActiveIndexes(sideKey).includes(toIndex)) return { ok: false, message: "That battler is already active." };
  if (target.fainted) return { ok: false, message: "That battler has fainted." };
  if (isTrappedByAbility(active, foe)) return { ok: false, message: `${active.displayName} cannot switch out.` };
  return { ok: true, message: "" };
}

function buildActionOrder() {
  return ["alpha", "beta"].flatMap((sideKey) => getActiveIndexes(sideKey).map((activeIndex) => {
    const action = state.battle.pendingActions[sideKey]?.[activeIndex];
    const user = getCombatantByIndex(sideKey, activeIndex);
    if (!action || !user) return null;
    if (action.type === "switch") {
      return { sideKey, type: "switch", user, userIndex: activeIndex, toIndex: action.toIndex, actionRank: 2, priority: 6, speed: getModifiedBattleStat(user, "speed") };
    }
    const moveSlot = user.moves[action.moveIndex];
    const baseMove = getBattleMove(user.chargingMove?.name || moveSlot?.name);
    const move = baseMove ? { ...baseMove, originalType: baseMove.type, type: getMoveTypeForUse(user, baseMove) } : null;
    applyCustomAbilityMoveUse(user, move, { opponent: getOpposingTarget(sideKey, activeIndex), move });
    applyCustomAbilityPriorityTargeting(user, move, { opponent: getOpposingTarget(sideKey, activeIndex), move });
    const quickClaw = canUseHeldItem(user) && cleanText(user.item) === "Quick Claw" && Math.random() < 0.2;
    const quickDraw = abilityId(user) === "quickdraw" && Math.random() < 0.3;
    if (quickClaw) appendBattleLog(user.displayName, "Quick Claw let it act first.");
    if (quickDraw) appendBattleLog(user.displayName, "moved first with Quick Draw.");
    const priorityBonus = getAbilityPriorityBonus(user, move);
    return {
      sideKey,
      type: "move",
      user,
      userIndex: activeIndex,
      moveIndex: action.moveIndex,
      actionRank: 1,
      priority: (move?.priority || 0) + priorityBonus + (quickClaw || quickDraw ? 0.5 : 0),
      speed: getModifiedBattleStat(user, "speed"),
    };
  })).filter(Boolean).sort((left, right) => {
    if (left.actionRank !== right.actionRank) return right.actionRank - left.actionRank;
    if (left.priority !== right.priority) return right.priority - left.priority;
    if (left.speed !== right.speed) return right.speed - left.speed;
    return Math.random() < 0.5 ? -1 : 1;
  });
}

function executeBattleAction(action) {
  if (action.type === "switch") {
    performSwitch(action.sideKey, action.toIndex, "manual", action.userIndex);
    return;
  }
  if (action.user && getCombatantByIndex(action.sideKey, action.userIndex) !== action.user) return;
  performMove(action.sideKey, action.moveIndex, action.userIndex);
}

function performSwitch(sideKey, toIndex, mode, fromIndex = getPrimaryActiveIndex(sideKey)) {
  const team = state.battle.teams[sideKey];
  const current = getCombatantByIndex(sideKey, fromIndex);
  const incoming = team?.combatants[toIndex];
  if (!incoming || incoming.fainted || getActiveIndexes(sideKey).includes(toIndex)) return;
  if (current) {
    applySwitchOutAbilities(current);
    restoreCombatantForm(current);
    if (abilityId(current) === "zerotohero" && current.currentForm !== "Hero") {
      current.currentForm = "Hero";
      appendBattleLog(current.displayName, "prepared its Hero Form with Zero to Hero.");
    }
    current.choiceLock = "";
    current.chargingMove = null;
    current.disabledMove = "";
    current.disabledTurns = 0;
    current.protecting = false;
    current.flinched = false;
  }
  setActiveIndex(sideKey, fromIndex, toIndex);
  incoming.protecting = false;
  incoming.flinched = false;
  incoming.fresh = true;
  incoming.switchedInThisTurn = mode !== "lead";
  incoming.stolenItemThisTurn = false;
  refreshBattleFormState(incoming);
  appendBattleLog(team.label, mode === "manual" ? `switched to ${incoming.displayName}.` : `sent out ${incoming.displayName}.`);
  applyEntryHazards(sideKey, incoming);
  if (incoming.fainted) return;
  applySwitchInAbilities(sideKey, mode, incoming);
}

function shouldChargeMove(user, move) {
  if (!TWO_TURN_MOVE_IDS.has(move.id)) return false;
  if (["solar-beam", "solar-blade"].includes(move.id) && getActiveWeather() === "sun") return false;
  if (move.id === "electro-shot" && getActiveWeather() === "rain") return false;
  if (canUseHeldItem(user) && cleanText(user.item) === "Power Herb") {
    consumeItem(user);
    appendBattleLog(user.displayName, "used Power Herb to skip the charge turn.");
    return false;
  }
  return true;
}

function startChargingMove(user, move, moveName) {
  user.chargingMove = { id: move.id, name: moveName };
  const boosts = CHARGING_STAT_BOOSTS[move.id];
  if (boosts?.length) {
    const applied = applyBoostChanges(user, boosts);
    if (applied.length) appendBattleLog(user.displayName, describeBoostChanges(applied));
  }
  appendBattleLog(user.displayName, TWO_TURN_MOVE_MESSAGES[move.id] || "began charging.");
}

function performMove(sideKey, moveIndex, userIndex = getPrimaryActiveIndex(sideKey)) {
  const user = getCombatantByIndex(sideKey, userIndex);
  const target = getOpposingTarget(sideKey, userIndex);
  if (!user || user.fainted) return;
  const validation = canSelectBattleMove(sideKey, moveIndex, userIndex);
  if (!validation.ok) {
    appendBattleLog(user.displayName, validation.message || "could not use that move.");
    return;
  }

  const moveSlot = user.moves[moveIndex];
  const chargingMove = user.chargingMove;
  const moveName = chargingMove?.name || moveSlot.name;
  const baseMove = getBattleMove(moveName);
  const move = baseMove ? { ...baseMove } : null;
  if (!move) {
    appendBattleLog(user.displayName, `${moveName} has no battle data and fizzled out.`);
    user.chargingMove = null;
    return;
  }
  if (abilityId(user) === "truant" && user.truantLoafing) {
    user.truantLoafing = false;
    appendBattleLog(user.displayName, "is loafing around.");
    return;
  }

  user.fresh = false;
  user.protecting = false;
  user.stolenItemThisTurn = false;
  if (!chargingMove) moveSlot.pp = Math.max(0, moveSlot.pp - 1);
  user.lastMoveUsed = moveName;
  if (!chargingMove && ((canUseHeldItem(user) && isChoiceItem(user.item)) || abilityId(user) === "gorillatactics") && !user.choiceLock) user.choiceLock = moveSlot.name;
  move.originalType = move.type;
  move.type = getMoveTypeForUse(user, move);
  applyCustomAbilityMoveUse(user, move, { opponent: target, move });
  applyCustomAbilityPriorityTargeting(user, move, { opponent: target, move });
  applyStanceChange(user, move);
  if (["protean", "libero"].includes(abilityId(user)) && move.type) {
    user.types = [move.type];
    appendBattleLog(user.displayName, `changed type to ${move.type} with ${user.ability}.`);
  }
  const moveLabel = getDisplayedMoveName(user, { ...moveSlot, name: moveName }, move);
  if (!chargingMove && shouldChargeMove(user, move)) {
    startChargingMove(user, move, moveName);
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if (chargingMove) {
    user.chargingMove = null;
    appendBattleLog(user.displayName, `unleashed ${moveLabel}.`);
  } else {
    appendBattleLog(user.displayName, `used ${moveLabel}.`);
  }

  if (CLEAR_ALL_BOOST_MOVES.has(move.id)) {
    ["alpha", "beta"].forEach((key) => getActiveCombatants(key).forEach(resetBoosts));
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
    const applied = applyBoostChanges(user, [{ stat: "attack", change: 6 }]);
    if (applied.length) appendBattleLog(user.displayName, "maxed out its Attack.");
    return;
  }

  const targetIsOpponent = moveTargetsOpponent(move);
  const recipient = targetIsOpponent ? target : user;
  if (!recipient) {
    appendBattleLog(moveSlot.name, "failed because there was no target.");
    return;
  }
  if (SELF_DESTRUCT_MOVES.has(move.id) && ["alpha", "beta"].some((key) => getActiveCombatants(key).some((mon) => abilityId(mon) === "damp"))) {
    appendBattleLog(moveLabel, "was prevented by Damp.");
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if (targetIsOpponent && abilityId(recipient) === "pressure") {
    moveSlot.pp = Math.max(0, moveSlot.pp - 1);
  }
  const effectivePriority = (move.priority || 0) + getAbilityPriorityBonus(user, move);
  if (HAZARD_MOVES.has(move.id) && targetIsOpponent) {
    const hazardTarget = abilityId(recipient) === "magicbounce" ? sideKey : otherSideKey(sideKey);
    if (hazardTarget === sideKey) appendBattleLog(recipient.displayName, "reflected the hazard with Magic Bounce.");
    if (placeHazard(hazardTarget, move.id)) appendBattleLog(moveLabel, "set an entry hazard.");
    else appendBattleLog(moveLabel, "failed because that hazard is already maxed out.");
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if ((move.category === "field-effect" || move.category === "whole-field-effect") && move.power <= 0) {
    appendBattleLog(moveSlot.name, "is not modeled in this local battle sandbox.");
    return;
  }
  if (targetIsOpponent && recipient.protecting && !(abilityId(user) === "unseenfist" && isContactMove(move))) {
    appendBattleLog(recipient.displayName, "blocked the attack with Protect.");
    return;
  }
  if (targetIsOpponent && getActiveTerrain() === "psychic" && effectivePriority > 0 && isGrounded(recipient)) {
    appendBattleLog(recipient.displayName, "was protected by Psychic Terrain.");
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if (targetIsOpponent && effectivePriority > 0 && ["dazzling", "queenlymajesty", "armortail"].includes(abilityId(recipient))) {
    appendBattleLog(recipient.displayName, `${recipient.ability} blocked the priority move.`);
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if (targetIsOpponent && abilityId(user) === "prankster" && move.damageClass === "status" && recipient.types.includes("Dark")) {
    appendBattleLog(recipient.displayName, "ignored the Prankster-boosted status move.");
    return;
  }
  if (targetIsOpponent && move.damageClass === "status" && abilityId(recipient) === "magicbounce") {
    if (abilityId(user) === "myceliummight") {
      appendBattleLog(user.displayName, "pushed through Magic Bounce with Mycelium Might.");
    } else {
    appendBattleLog(recipient.displayName, "reflected the status move with Magic Bounce.");
    applyReflectedStatusMove(user, recipient, move);
    return;
    }
  }
  if (targetIsOpponent && handleAbilityMoveImmunity(user, recipient, move)) {
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }
  if (targetIsOpponent && getMoveTypeMultiplier(user, move, recipient) === 0) {
    appendBattleLog(recipient.displayName, `is unaffected by ${moveSlot.name}.`);
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }

  const block = resolveBeforeMoveStatus(user, move);
  if (block.blocked) return;

  if (move.id === "transform") {
    transformCombatant(user, recipient, "Transform");
    return;
  }
  if (!moveHitsTarget(user, recipient, move, targetIsOpponent)) {
    appendBattleLog(moveSlot.name, "missed.");
    if (abilityId(user) === "truant") user.truantLoafing = true;
    return;
  }

  let totalDamage = 0;
  const typeMultiplier = targetIsOpponent ? getMoveTypeMultiplier(user, move, recipient) : 1;
  if (move.damageClass !== "status") {
    const hits = getMoveHitCount(move, user);
    for (let hit = 0; hit < hits; hit += 1) {
      if (!recipient || recipient.fainted) break;
      const result = calculateMoveDamage(user, recipient, move, typeMultiplier);
      if (result.noEffect) {
        appendBattleLog(recipient.displayName, `is unaffected by ${moveSlot.name}.`);
        break;
      }
      totalDamage += applyBattleDamage(recipient, result.damage, { attacker: user, move, moveName: moveSlot.name, typeMultiplier: result.typeMultiplier, crit: result.crit });
      if (result.crit) appendBattleLog(moveSlot.name, "landed a critical hit.");
      if (result.typeMultiplier > 1) appendBattleLog(moveSlot.name, "was super effective.");
      else if (result.typeMultiplier > 0 && result.typeMultiplier < 1) appendBattleLog(moveSlot.name, "was not very effective.");
      if (recipient.fainted) break;
    }
    if (move.minHits && move.maxHits && move.maxHits > 1) appendBattleLog(moveSlot.name, `hit ${getDisplayedHitCount(move)} time(s).`);
  }

  if (targetIsOpponent && totalDamage > 0 && !recipient.fainted) {
    if (abilityId(user) === "gulpmissile" && ["surf", "dive"].includes(move.id)) {
      user.gulpMissileLoaded = true;
      appendBattleLog(user.displayName, "readied Gulp Missile.");
    }
    runCustomAbilityContactOnHit(recipient, user, move, totalDamage);
    applyDamageTakenAbilityEffects(user, recipient, move, totalDamage);
    applyAttackerAfterHitAbilities(user, recipient, move, totalDamage);
    applyItemTheftAbilities(user, recipient, move, totalDamage);
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
    if (abilityId(recipient) === "liquidooze") {
      applyDirectDamage(user, Math.max(1, Math.floor((totalDamage * move.drain) / 100)), "Liquid Ooze");
    } else {
      const healed = healCombatant(user, Math.max(1, Math.floor((totalDamage * move.drain) / 100)));
      if (healed > 0) appendBattleLog(user.displayName, `drained ${healed} HP.`);
    }
  }
  if (move.drain < 0 && totalDamage > 0) {
    const recoil = Math.max(1, Math.floor((totalDamage * Math.abs(move.drain)) / 100));
    if (abilityId(user) !== "rockhead") applyDirectDamage(user, recoil, `${moveLabel} recoil`);
  }
  const flinchChance = abilityId(user) === "serenegrace" ? move.flinchChance * 2 : move.flinchChance;
  const stenchChance = abilityId(user) === "stench" && move.damageClass !== "status" && !move.flinchChance ? 10 : 0;
  const effectiveFlinchChance = Math.max(flinchChance, stenchChance);
  if (targetIsOpponent && totalDamage > 0 && effectiveFlinchChance > 0 && abilityId(user) !== "sheerforce" && abilityId(recipient) !== "shielddust" && !recipient.fainted && abilityId(recipient) !== "innerfocus" && Math.random() * 100 < effectiveFlinchChance) {
    recipient.flinched = true;
    appendBattleLog(recipient.displayName, "flinched.");
  }
  if (totalDamage > 0 && canUseHeldItem(user) && cleanText(user.item) === "Shell Bell") {
    const healed = healCombatant(user, Math.max(1, Math.floor(totalDamage / 8)));
    if (healed > 0) appendBattleLog(user.displayName, "restored HP with Shell Bell.");
  }
  if (totalDamage > 0 && canUseHeldItem(user) && cleanText(user.item) === "Life Orb" && abilityId(user) !== "magicguard") {
    applyDirectDamage(user, Math.max(1, Math.floor(user.maxHp / 10)), "Life Orb recoil");
  }
  if ((FORCE_SWITCH_MOVES.has(move.id) || move.category === "force-switch") && targetIsOpponent && !recipient.fainted) {
    if (blocksForcedSwitch(recipient)) return;
    forceSwitch(otherSideKey(sideKey), getActiveIndexes(otherSideKey(sideKey)).find((index) => getCombatantByIndex(otherSideKey(sideKey), index) === recipient));
  }
  if (SELF_DESTRUCT_MOVES.has(move.id) && !user.fainted) {
    applyDirectDamage(user, user.hp, moveSlot.name);
  }
  applyCustomMoveModifiers(user, recipient, move, totalDamage, targetIsOpponent);
  applyMoveBoostEffects(user, recipient, move);
  applyMoveAilmentEffects(user, recipient, move);
  triggerDancerCopies(user, move);
  if (abilityId(user) === "truant") user.truantLoafing = true;
}

function applyMoveBoostEffects(user, recipient, move) {
  if (!move.boosts?.length) return;
  if (abilityId(user) === "sheerforce" && move.damageClass !== "status") return;
  if (CHARGING_STAT_BOOSTS[move.id]) return;
  const chance = getBoostEffectChance(move, user);
  if (chance <= 0 || Math.random() * 100 >= chance) return;
  const appliesToSelf = move.damageClass === "status" ? SELF_TARGETS.has(move.target) : move.category === "damage-raise";
  const target = appliesToSelf ? user : recipient;
  if (!target) return;
  if (target !== user && move.damageClass !== "status" && abilityId(target) === "shielddust") return;
  const applied = applyBoostChanges(target, move.boosts, target === user ? null : user);
  if (applied.length) appendBattleLog(target.displayName, describeBoostChanges(applied));
}

function applyMoveAilmentEffects(user, recipient, move) {
  if (!move.ailment || move.ailment === "none" || move.ailment === "unknown") return;
  if (abilityId(user) === "sheerforce" && move.damageClass !== "status") return;
  const chance = getAilmentEffectChance(move, user);
  if (chance <= 0 || Math.random() * 100 >= chance) return;
  const appliesToSelf = move.damageClass === "status" && SELF_TARGETS.has(move.target);
  const target = appliesToSelf ? user : recipient;
  if (!target) return;
  if (target !== user && move.damageClass !== "status" && abilityId(target) === "shielddust") return;

  if (move.id === "toxic") {
    if (inflictMajorStatus(target, "tox", { source: user })) appendBattleLog(target.displayName, "was badly poisoned.");
    return;
  }

  if (move.ailment === "confusion") {
    if (inflictConfusion(target, { ...move, source: user })) appendBattleLog(target.displayName, "became confused.");
    return;
  }

  if (["burn", "poison", "paralysis", "sleep", "freeze"].includes(move.ailment)) {
    if (inflictMajorStatus(target, move.ailment, { ...move, source: user })) appendBattleLog(target.displayName, describeStatusInfliction(move.ailment));
  }
}

function resolveMoveEffectTarget(user, recipient, targetMode) {
  return targetMode === "user" ? user : recipient;
}

function applyCustomMoveModifiers(user, recipient, move, totalDamage, targetIsOpponent) {
  if (!Array.isArray(move.modifiers) || !move.modifiers.length) return;
  if (abilityId(user) === "sheerforce" && move.damageClass !== "status") return;
  move.modifiers.forEach((modifier) => {
    const chance = clamp(safeNumber(modifier.chance) || 100, 1, 100);
    if (Math.random() * 100 >= chance) return;
    const target = resolveMoveEffectTarget(user, recipient, modifier.target);
    if (!target) return;

    if ((modifier.type === "raise-stat" || modifier.type === "lower-stat") && modifier.boosts?.length) {
      const applied = applyBoostChanges(target, modifier.boosts, target === user ? null : user);
      if (applied.length) appendBattleLog(target.displayName, describeBoostChanges(applied));
      return;
    }

    if (modifier.type === "inflict-status") {
      if (modifier.status === "tox") {
        if (inflictMajorStatus(target, "tox", { source: user })) appendBattleLog(target.displayName, "was badly poisoned.");
        return;
      }
      if (modifier.status === "confusion") {
        if (inflictConfusion(target, { source: user })) appendBattleLog(target.displayName, "became confused.");
        return;
      }
      if (["burn", "poison", "paralysis", "sleep", "freeze"].includes(modifier.status)) {
        if (inflictMajorStatus(target, modifier.status, { source: user })) appendBattleLog(target.displayName, describeStatusInfliction(modifier.status));
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
  const typeMultiplier = precomputedMultiplier ?? getMoveTypeMultiplier(user, move, target);
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
  const attackStage = hasActiveAbility(target, "unaware", user) ? 0 : (user.boosts[attackKey] || 0);
  const defenseStage = hasActiveAbility(user, "unaware", target) ? 0 : (target.boosts[defenseKey] || 0);
  const attack = Math.max(1, getModifiedBattleStatWithStage(user, attackKey, attackStage, move));
  const defense = Math.max(1, getModifiedBattleStatWithStage(target, defenseKey, defenseStage, move));
  const levelFactor = Math.floor((2 * user.level) / 5) + 2;
  const adjustedPower = Math.floor(getModifiedMovePower(user, target, move) * getMovePowerAbilityModifier(user, move));
  const baseDamage = Math.floor(Math.floor((levelFactor * adjustedPower * attack) / defense) / 50) + 2;
  const critBlocked = ["battlearmor", "shellarmor"].includes(abilityId(target)) && !isAbilitySuppressed(user, target);
  const crit = !critBlocked && ((abilityId(user) === "merciless" && ["poison", "tox"].includes(target.status)) || Math.random() < getCritChance(move, user));
  const stab = user.types.includes(move.type) ? getStabModifier(user) : 1;
  const randomFactor = 0.85 + Math.random() * 0.15;
  let modifier = randomFactor * stab * typeMultiplier * getDamageItemModifier(user, move, typeMultiplier);
  modifier *= getWeatherPowerModifier(move);
  modifier *= getAuraDamageModifier(move);
  modifier *= getCustomAbilityDamageModifier(user, move, "immunity-damage", typeMultiplier, "attacker");
  modifier *= getCustomAbilityDamageModifier(target, move, "immunity-damage", typeMultiplier, "defender");
  modifier *= getOffensiveAbilityModifier(user, target, move, typeMultiplier);
  modifier *= getDefensiveAbilityModifier(user, target, move, typeMultiplier);
  if (user.chargedMoveBoost && move.type === "Electric") {
    modifier *= 2;
    user.chargedMoveBoost = false;
  }
  if (crit) modifier *= abilityId(user) === "sniper" ? 2 : 1.5;
  if (move.damageClass === "physical" && user.status === "burn" && abilityId(user) !== "guts") modifier *= 0.5;
  return {
    damage: Math.max(1, Math.floor(baseDamage * modifier)),
    crit,
    typeMultiplier,
    noEffect: false,
  };
}

function applyBattleDamage(target, damage, context) {
  let actual = Math.max(0, Math.floor(damage));
  const hpBeforeDamage = target.hp;
  if (actual <= 0) return 0;
  if (!target.disguiseBroken && abilityId(target) === "disguise" && context.move.damageClass !== "status") {
    target.disguiseBroken = true;
    appendBattleLog(target.displayName, "broke its Disguise.");
    return 0;
  }
  if (!target.iceFaceBroken && abilityId(target) === "iceface" && context.move.damageClass === "physical") {
    target.iceFaceBroken = true;
    appendBattleLog(target.displayName, "absorbed the hit with Ice Face.");
    return 0;
  }
  if (target.hp === target.maxHp && hasActiveAbility(target, "sturdy", context.attacker) && actual >= target.hp) {
    actual = Math.max(0, target.hp - 1);
    appendBattleLog(target.displayName, "held on with Sturdy.");
  }
  if (target.hp === target.maxHp && canUseHeldItem(target) && cleanText(target.item) === "Focus Sash" && actual >= target.hp) {
    target.itemConsumed = true;
    actual = Math.max(0, target.hp - 1);
    appendBattleLog(target.displayName, "hung on with Focus Sash.");
  }
  target.hp = Math.max(0, target.hp - actual);
  if (context.crit && !target.fainted && target.hp > 0 && abilityId(target) === "angerpoint") {
    const applied = applyBoostChanges(target, [{ stat: "attack", change: 12 }]);
    if (applied.length) appendBattleLog(target.displayName, "maxed its Attack with Anger Point.");
  }
  if (!target.fainted && target.hp > 0 && target.hp <= Math.floor(target.maxHp / 2) && ["emergencyexit", "wimpout"].includes(abilityId(target)) && !target.emergencyExitTriggered) {
    target.emergencyExitTriggered = true;
    const sideKey = getBattleSideForMon(target);
    if (sideKey) {
      appendBattleLog(target.displayName, `activated ${target.ability}.`);
      forceSwitch(sideKey);
    }
  }
  if (canUseHeldItem(target) && cleanText(target.item) === "Air Balloon" && !target.airBalloonPopped && actual > 0) {
    target.airBalloonPopped = true;
    appendBattleLog(target.displayName, "popped its Air Balloon.");
  }
  applyThresholdItem(target);
  if (context.typeMultiplier > 1 && canUseHeldItem(target) && cleanText(target.item) === "Weakness Policy" && !target.fainted) {
    target.itemConsumed = true;
    applyBoostChanges(target, [{ stat: "attack", change: 2 }, { stat: "spattack", change: 2 }], null);
    appendBattleLog(target.displayName, "activated Weakness Policy.");
  }
  if (canUseHeldItem(target) && cleanText(target.item) === "Rocky Helmet" && context.move.damageClass === "physical" && !context.attacker.fainted) {
    applyDirectDamage(context.attacker, Math.max(1, Math.floor(context.attacker.maxHp / 6)), "Rocky Helmet");
  }
  applyContactAbilityEffects(context.attacker, target, context.move);
  if (target.hp <= 0) {
    target.hp = 0;
    target.fainted = true;
    target.choiceLock = "";
    target.flinched = false;
    target.protecting = false;
    appendBattleLog(target.displayName, "fainted.");
    applyAftermathAbility(context.attacker, target, context.move);
    runCustomAbilityFaintReplacement(target, context);
    triggerFaintAbilities(target, { ...context, damageTaken: Math.min(actual, hpBeforeDamage) });
  } else {
    activatePowerConstruct(target);
    refreshBattleFormState(target);
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
    runCustomAbilityFaintReplacement(mon, { sourceLabel });
    triggerFaintAbilities(mon, { sourceLabel });
  } else {
    activatePowerConstruct(mon);
    refreshBattleFormState(mon);
  }
  return actual;
}

function healCombatant(mon, amount) {
  if (mon.fainted) return 0;
  const healed = Math.max(0, Math.min(mon.maxHp - mon.hp, Math.floor(amount)));
  mon.hp += healed;
  return healed;
}

function consumeItem(mon) {
  if (!mon?.item) return "";
  const item = mon.item;
  mon.consumedItem = item;
  if (/Berry/i.test(item) && abilityId(mon) === "cudchew") {
    mon.cudChewItem = item;
    mon.cudChewTurns = 2;
  }
  mon.item = "";
  mon.itemConsumed = true;
  return item;
}

function restoreConsumedItem(mon, sourceLabel) {
  if (!mon?.consumedItem) return false;
  mon.item = mon.consumedItem;
  mon.consumedItem = "";
  mon.itemConsumed = false;
  appendBattleLog(mon.displayName, `restored its item with ${sourceLabel}.`);
  return true;
}

function getBerryHealAmount(mon, item) {
  if (item === "Sitrus Berry") return Math.max(1, Math.floor(mon.maxHp / (abilityId(mon) === "ripen" ? 2 : 4)));
  if (item === "Oran Berry") return abilityId(mon) === "ripen" ? 20 : 10;
  if (["Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry"].includes(item)) return Math.max(1, Math.floor(mon.maxHp / (abilityId(mon) === "ripen" ? 2 : 4)));
  return 0;
}

function useBerryItem(mon, item, sourceLabel = item) {
  const healAmount = getBerryHealAmount(mon, item);
  if (healAmount > 0) {
    consumeItem(mon);
    healCombatant(mon, healAmount);
    appendBattleLog(mon.displayName, `restored HP with ${sourceLabel}.`);
    if (abilityId(mon) === "cheekpouch") {
      const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 3)));
      if (healed > 0) appendBattleLog(mon.displayName, "restored extra HP with Cheek Pouch.");
    }
    return true;
  }
  return false;
}

function reuseCudChewBerry(mon) {
  const item = mon.cudChewItem;
  mon.cudChewItem = "";
  if (!item) return false;
  const healAmount = getBerryHealAmount(mon, item);
  if (healAmount > 0) {
    healCombatant(mon, healAmount);
    appendBattleLog(mon.displayName, `reused ${item} with Cud Chew.`);
    return true;
  }
  return false;
}

function resolveBeforeMoveStatus(mon, move) {
  if (mon.flinched) {
    mon.flinched = false;
    if (abilityId(mon) === "steadfast") {
      triggerBoostAbility(mon, [{ stat: "speed", change: 1 }], "raised its Speed with Steadfast.");
    }
    appendBattleLog(mon.displayName, "flinched and could not move.");
    return { blocked: true };
  }
  if (mon.status === "sleep") {
    mon.statusTurns -= abilityId(mon) === "earlybird" ? 2 : 1;
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
    getActiveIndexes(sideKey).forEach((activeIndex) => {
      const mon = getCombatantByIndex(sideKey, activeIndex);
      const opponent = getOpposingTarget(sideKey, activeIndex);
    if (!mon || mon.fainted) return;
    mon.switchedInThisTurn = false;
    mon.protecting = false;
    mon.flinched = false;
    if (mon.perishCount > 0) {
      mon.perishCount -= 1;
      if (mon.perishCount > 0) appendBattleLog(mon.displayName, `perish count fell to ${mon.perishCount}.`);
      else applyDirectDamage(mon, mon.hp, "Perish Song");
    }
    if (mon.fainted) return;
    if (mon.slowStartTurns > 0) {
      mon.slowStartTurns -= 1;
      if (mon.slowStartTurns === 0) appendBattleLog(mon.displayName, "finally got its act together.");
    }
    if (mon.disabledTurns > 0) {
      mon.disabledTurns -= 1;
      if (mon.disabledTurns <= 0) {
        mon.disabledMove = "";
        mon.disabledTurns = 0;
        appendBattleLog(mon.displayName, "is no longer disabled.");
      }
    }
    if (clearsStatusInWeather(mon) && mon.status) {
      mon.status = "";
      mon.statusTurns = 0;
      mon.toxicCounter = 0;
      appendBattleLog(mon.displayName, "was cured by Hydration.");
    }
    if (abilityId(mon) === "shedskin" && mon.status && Math.random() < (1 / 3)) {
      mon.status = "";
      mon.statusTurns = 0;
      mon.toxicCounter = 0;
      appendBattleLog(mon.displayName, "shed its status condition.");
    }
    if (abilityId(mon) === "poisonheal" && (mon.status === "poison" || mon.status === "tox")) {
      const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 8)));
      if (healed > 0) appendBattleLog(mon.displayName, "restored HP with Poison Heal.");
    } else if (mon.status === "burn" && abilityId(mon) !== "magicguard") {
      const divisor = abilityId(mon) === "heatproof" ? 32 : 16;
      applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / divisor)), "Burn");
    } else if (mon.status === "poison" && abilityId(mon) !== "magicguard") {
      applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Poison");
    } else if (mon.status === "tox" && abilityId(mon) !== "magicguard") {
      mon.toxicCounter = Math.max(1, mon.toxicCounter + 1);
      applyDirectDamage(mon, Math.max(1, Math.floor((mon.maxHp * mon.toxicCounter) / 16)), "Bad poison");
    }
    if (mon.fainted) return;
    if (getActiveWeather() === "sand" && !isWeatherDamageImmune(mon, "sand")) {
      applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 16)), "Sandstorm");
    } else if (getActiveWeather() === "snow" && !isWeatherDamageImmune(mon, "snow")) {
      applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 16)), "Snow");
    } else if (getActiveWeather() === "rain") {
      if (abilityId(mon) === "raindish") {
        const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16)));
        if (healed > 0) appendBattleLog(mon.displayName, "restored HP with Rain Dish.");
      }
      if (abilityId(mon) === "dryskin") {
        const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 8)));
        if (healed > 0) appendBattleLog(mon.displayName, "restored HP with Dry Skin.");
      }
    } else if (getActiveWeather() === "sun") {
      if (abilityId(mon) === "dryskin") applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Harsh sunlight");
      if (abilityId(mon) === "solarpower") applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Solar Power");
    }
    if (mon.fainted) return;
    if (getActiveWeather() === "snow" && abilityId(mon) === "icebody") {
      const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16)));
      if (healed > 0) appendBattleLog(mon.displayName, "restored HP with Ice Body.");
    }
    if (getActiveWeather() === "snow" && abilityId(mon) === "iceface" && mon.iceFaceBroken) {
      mon.iceFaceBroken = false;
      appendBattleLog(mon.displayName, "restored its Ice Face in the snow.");
    }
    if (getActiveTerrain() === "grassy" && isGrounded(mon)) {
      const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16)));
      if (healed > 0) appendBattleLog(mon.displayName, "restored HP from Grassy Terrain.");
    }
    if (mon.fainted) return;
    if (abilityId(mon) === "speedboost") {
      triggerBoostAbility(mon, [{ stat: "speed", change: 1 }], "raised its Speed with Speed Boost.");
    }
    if (abilityId(mon) === "moody") {
      applyMoody(mon);
    }
    if (abilityId(mon) === "baddreams" && opponent?.status === "sleep") {
      applyDirectDamage(opponent, Math.max(1, Math.floor(opponent.maxHp / 8)), "Bad Dreams");
    }
    if (mon.fainted) return;
    if (canUseHeldItem(mon) && cleanText(mon.item) === "Leftovers") {
      if (healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16))) > 0) appendBattleLog(mon.displayName, "restored HP with Leftovers.");
    }
    if (canUseHeldItem(mon) && cleanText(mon.item) === "Black Sludge") {
      if (mon.types.includes("Poison")) {
        if (healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 16))) > 0) appendBattleLog(mon.displayName, "restored HP with Black Sludge.");
      } else if (abilityId(mon) !== "magicguard") {
        applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / 8)), "Black Sludge");
      }
    }
    if (canUseHeldItem(mon) && cleanText(mon.item) === "Flame Orb" && !mon.status) {
      if (inflictMajorStatus(mon, "burn")) appendBattleLog(mon.displayName, "was burned by Flame Orb.");
    }
    if (canUseHeldItem(mon) && cleanText(mon.item) === "Toxic Orb" && !mon.status) {
      if (inflictMajorStatus(mon, "tox")) appendBattleLog(mon.displayName, "was badly poisoned by Toxic Orb.");
    }
    if (abilityId(mon) === "harvest" && !mon.item && mon.consumedItem && /Berry/i.test(mon.consumedItem) && getActiveWeather() === "sun") {
      restoreConsumedItem(mon, "Harvest");
    } else if (abilityId(mon) === "harvest" && !mon.item && mon.consumedItem && /Berry/i.test(mon.consumedItem) && Math.random() < 0.5) {
      restoreConsumedItem(mon, "Harvest");
    }
    if (abilityId(mon) === "cudchew" && mon.cudChewItem && mon.cudChewTurns > 0) {
      mon.cudChewTurns -= 1;
      if (mon.cudChewTurns === 0) reuseCudChewBerry(mon);
    }
    if (abilityId(mon) === "healer" && mon.status && Math.random() < 0.3) {
      mon.status = "";
      mon.statusTurns = 0;
      mon.toxicCounter = 0;
      appendBattleLog(mon.displayName, "was cured by Healer.");
    }
    if (abilityId(mon) === "pickup" && !mon.item && mon.consumedItem && Math.random() < 0.1) {
      restoreConsumedItem(mon, "Pickup");
    }
    runCustomAbilityEvent(mon, "end-of-turn", { opponent });
    runCustomAbilityEvent(mon, "weather-terrain", { opponent });
      refreshBattleFormState(mon);
    });
  });
  tickFieldDurations();
}

function applyMoody(mon) {
  const raiseCandidates = BATTLE_STAGE_KEYS.filter((stat) => mon.boosts[stat] < 6);
  if (!raiseCandidates.length) return;
  const raisedStat = raiseCandidates[Math.floor(Math.random() * raiseCandidates.length)];
  const loweredCandidates = BATTLE_STAGE_KEYS.filter((stat) => stat !== raisedStat && mon.boosts[stat] > -6);
  const applied = applyBoostChanges(mon, [{ stat: raisedStat, change: 2 }]);
  if (loweredCandidates.length) {
    const loweredStat = loweredCandidates[Math.floor(Math.random() * loweredCandidates.length)];
    applied.push(...applyBoostChanges(mon, [{ stat: loweredStat, change: -1 }]));
  }
  if (applied.length) appendBattleLog(mon.displayName, "shifted its stats with Moody.");
}

function autoReplaceFainted(sideKey) {
  const team = state.battle.teams[sideKey];
  if (!team) return;
  getActiveIndexes(sideKey).forEach((activeIndex) => {
    const active = team.combatants[activeIndex];
    if (active && !active.fainted) return;
    const replacementIndex = team.combatants.findIndex((mon, index) => !mon.fainted && !getActiveIndexes(sideKey).includes(index));
    if (replacementIndex >= 0) performSwitch(sideKey, replacementIndex, "replacement", activeIndex);
  });
}

function forceSwitch(sideKey, fromIndex = getPrimaryActiveIndex(sideKey)) {
  const team = state.battle.teams[sideKey];
  if (!team) return;
  const replacementIndex = team.combatants.findIndex((mon, index) => !getActiveIndexes(sideKey).includes(index) && !mon.fainted);
  if (replacementIndex >= 0) performSwitch(sideKey, replacementIndex, "replacement", fromIndex);
}

function blocksForcedSwitch(mon) {
  const id = abilityId(mon);
  if (id === "suctioncups") {
    appendBattleLog(mon.displayName, "anchored itself with Suction Cups.");
    return true;
  }
  if (id === "guarddog") {
    triggerBoostAbility(mon, [{ stat: "attack", change: 1 }], "raised its Attack with Guard Dog.");
    appendBattleLog(mon.displayName, "refused to be forced out with Guard Dog.");
    return true;
  }
  return false;
}

function tickFieldDurations() {
  if (state.battle.weather && state.battle.weatherTurns > 0) {
    state.battle.weatherTurns -= 1;
    if (state.battle.weatherTurns <= 0) {
      appendBattleLog("Weather", `${normalizeWeatherLabel(state.battle.weather)} faded.`);
      state.battle.weather = "";
      state.battle.weatherTurns = 0;
      ["alpha", "beta"].forEach((sideKey) => getActiveCombatants(sideKey).forEach(refreshBattleFormState));
    }
  }
  if (state.battle.terrain && state.battle.terrainTurns > 0) {
    state.battle.terrainTurns -= 1;
    if (state.battle.terrainTurns <= 0) {
      appendBattleLog("Terrain", `${normalizeTerrainLabel(state.battle.terrain)} disappeared.`);
      state.battle.terrain = "";
      state.battle.terrainTurns = 0;
      ["alpha", "beta"].forEach((sideKey) => getActiveCombatants(sideKey).forEach(refreshBattleFormState));
    }
  }
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

function normalizeWeatherLabel(weather) {
  if (weather === "rain") return "Rain";
  if (weather === "sun") return "Sun";
  if (weather === "sand") return "Sandstorm";
  if (weather === "snow") return "Snow";
  return weather || "";
}

function normalizeTerrainLabel(terrain) {
  if (terrain === "electric") return "Electric Terrain";
  if (terrain === "grassy") return "Grassy Terrain";
  if (terrain === "misty") return "Misty Terrain";
  if (terrain === "psychic") return "Psychic Terrain";
  return terrain || "";
}

function buildMoveSummary(move, moveSlot) {
  if (!move) return `No battle data | PP ${moveSlot.pp}/${moveSlot.maxPp}`;
  return [move.type, move.damageClass, move.power ? `${move.power} BP` : "Status", `PP ${moveSlot.pp}/${moveSlot.maxPp}`].join(" | ");
}

function describePendingAction(sideKey, action) {
  const team = state.battle.started ? state.battle.teams[sideKey] : null;
  if (!team) return "No action queued.";
  if (action.type === "switch") return `Switch to ${team.combatants[action.toIndex]?.displayName || "reserve"}`;
  return `Use ${team.combatants[action.userIndex]?.moves[action.moveIndex]?.name || "move"}`;
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
  return {
    started: false,
    turn: 0,
    winner: "",
    weather: "",
    weatherTurns: 0,
    terrain: "",
    terrainTurns: 0,
    hazards: {
      alpha: { spikes: 0, toxicSpikes: 0, stealthRock: false, stickyWeb: false },
      beta: { spikes: 0, toxicSpikes: 0, stealthRock: false, stickyWeb: false },
    },
    teams: {},
    pendingActions: { alpha: {}, beta: {} },
    log: [],
  };
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
  return getModifiedBattleStatWithStage(mon, statKey, mon.boosts[statKey] || 0, move);
}

function getModifiedBattleStatWithStage(mon, statKey, stage, move) {
  let value = statKey in mon.stats ? mon.stats[statKey] : 1;
  if (statKey === "accuracy" || statKey === "evasion") return getAccuracyStageMultiplier(stage || 0);
  value *= getStatStageMultiplier(stage || 0);
  if (statKey === "attack" && ["hugepower", "purepower"].includes(abilityId(mon))) value *= 2;
  if (statKey === "attack" && abilityId(mon) === "gorillatactics") value *= 1.5;
  if (statKey === "attack" && abilityId(mon) === "slowstart" && mon.slowStartTurns > 0) value *= 0.5;
  if (statKey === "attack" && abilityId(mon) === "orichalcumpulse" && getActiveWeather() === "sun") value *= 4 / 3;
  if (statKey === "attack" && abilityId(mon) === "flowergift" && getActiveWeather() === "sun") value *= 1.5;
  if (statKey === "attack" && opposingActiveHasAbility(mon, "tablets of ruin")) value *= 0.75;
  if (statKey === "attack" && abilityId(mon) === "zerotohero" && mon.currentForm === "Hero") value *= 1.25;
  if (statKey === "defense" && opposingActiveHasAbility(mon, "sword of ruin")) value *= 0.75;
  if (statKey === "defense" && abilityId(mon) === "powerconstruct" && mon.currentForm === "Complete") value *= 1.1;
  if (statKey === "defense" && abilityId(mon) === "grassypelt" && getActiveTerrain() === "grassy") value *= 1.5;
  if (statKey === "spattack" && abilityId(mon) === "hadronengine" && getActiveTerrain() === "electric") value *= 4 / 3;
  if (statKey === "spattack" && opposingActiveHasAbility(mon, "vessel of ruin")) value *= 0.75;
  if (statKey === "spattack" && abilityId(mon) === "zerotohero" && mon.currentForm === "Hero") value *= 1.25;
  if (statKey === "spdefense" && opposingActiveHasAbility(mon, "beads of ruin")) value *= 0.75;
  if (statKey === "spdefense" && abilityId(mon) === "powerconstruct" && mon.currentForm === "Complete") value *= 1.1;
  if (statKey === "spdefense" && abilityId(mon) === "flowergift" && getActiveWeather() === "sun") value *= 1.5;
  if (statKey === "speed" && abilityId(mon) === "slowstart" && mon.slowStartTurns > 0) value *= 0.5;
  if (statKey === "speed" && abilityId(mon) === "zerotohero" && mon.currentForm === "Hero") value *= 1.25;
  if (statKey === "speed" && getActiveWeather() === "rain" && abilityId(mon) === "swiftswim") value *= 2;
  if (statKey === "speed" && getActiveWeather() === "sun" && abilityId(mon) === "chlorophyll") value *= 2;
  if (statKey === "speed" && getActiveWeather() === "sand" && abilityId(mon) === "sandrush") value *= 2;
  if (statKey === "speed" && getActiveWeather() === "snow" && abilityId(mon) === "slushrush") value *= 2;
  if (statKey === "speed" && getActiveTerrain() === "electric" && abilityId(mon) === "surgesurfer") value *= 2;
  if (statKey === "speed" && mon.status === "paralysis" && abilityId(mon) !== "quickfeet") value *= 0.5;
  if (statKey === "speed" && mon.itemConsumed && abilityId(mon) === "unburden") value *= 2;
  if (statKey === "speed" && abilityId(mon) === "quickfeet" && mon.status) value *= 1.5;
  if (statKey === "speed" && canUseHeldItem(mon) && cleanText(mon.item) === "Choice Scarf") value *= 1.5;
  if (statKey === "attack" && canUseHeldItem(mon) && cleanText(mon.item) === "Choice Band") value *= 1.5;
  if (statKey === "spattack" && canUseHeldItem(mon) && cleanText(mon.item) === "Choice Specs") value *= 1.5;
  if (statKey === "spdefense" && canUseHeldItem(mon) && cleanText(mon.item) === "Assault Vest") value *= 1.5;
  if (isProtosynthesisActive(mon) && getHighestStatKey(mon) === statKey) value *= statKey === "speed" ? 1.5 : 1.3;
  if (isQuarkDriveActive(mon) && getHighestStatKey(mon) === statKey) value *= statKey === "speed" ? 1.5 : 1.3;
  if (canUseHeldItem(mon) && cleanText(mon.item) === "Air Balloon" && move?.type === "Ground" && !mon.airBalloonPopped) return value;
  return value;
}

function getStatStageMultiplier(stage) {
  return stage >= 0 ? (2 + stage) / 2 : 2 / (2 + Math.abs(stage));
}

function getAccuracyStageMultiplier(stage) {
  return stage >= 0 ? (3 + stage) / 3 : 3 / (3 + Math.abs(stage));
}

function getTypeMultiplier(moveType, targetTypes, target) {
  if (canUseHeldItem(target) && cleanText(target.item) === "Air Balloon" && moveType === "Ground" && !target.airBalloonPopped) return 0;
  return (targetTypes || []).reduce((multiplier, type) => multiplier * (typeof typeChart[moveType]?.[type] === "number" ? typeChart[moveType][type] : 1), 1);
}

function getMoveTypeMultiplier(user, move, target) {
  let multiplier = getTypeMultiplier(move.type, target.types, target);
  if (multiplier === 0 && ["scrappy", "mindseye"].includes(abilityId(user)) && target.types.includes("Ghost") && ["Normal", "Fighting"].includes(move.type)) {
    multiplier = target.types.reduce((total, type) => {
      if (type === "Ghost") return total;
      return total * (typeof typeChart[move.type]?.[type] === "number" ? typeChart[move.type][type] : 1);
    }, 1);
  }
  return multiplier;
}

function moveHitsTarget(user, target, move, targetIsOpponent) {
  if (!targetIsOpponent || move.accuracy === null || move.accuracy === 0) return true;
  if (abilityId(user) === "noguard" || abilityId(target) === "noguard") return true;
  const userAccuracy = getModifiedBattleStat(user, "accuracy");
  const targetEvasion = ["keeneye", "mindseye", "illuminate"].includes(abilityId(user)) ? 1 : getModifiedBattleStat(target, "evasion");
  const itemModifier = canUseHeldItem(user) && cleanText(user.item) === "Wide Lens" ? 1.1 : 1;
  let targetModifier = canUseHeldItem(target) && cleanText(target.item) === "Bright Powder" ? 0.9 : 1;
  if (abilityId(target) === "sandveil" && getActiveWeather() === "sand") targetModifier *= 0.8;
  if (abilityId(target) === "snowcloak" && getActiveWeather() === "snow") targetModifier *= 0.8;
  if (abilityId(target) === "tangledfeet" && target.confusionTurns > 0) targetModifier *= 0.5;
  let abilityModifier = abilityId(user) === "hustle" && move.damageClass === "physical" ? 0.8 : 1;
  if (abilityId(user) === "compoundeyes") abilityModifier *= 1.3;
  if (abilityId(user) === "victorystar") abilityModifier *= 1.1;
  let chance = move.accuracy * userAccuracy / Math.max(0.1, targetEvasion) * itemModifier * targetModifier * abilityModifier;
  if (move.damageClass === "status" && abilityId(target) === "wonderskin") chance = Math.min(chance, 50);
  return Math.random() * 100 < chance;
}

function getDamageItemModifier(user, move, typeMultiplier) {
  const item = cleanText(user.item);
  if (!item || !canUseHeldItem(user)) return 1;
  if (item === "Life Orb") return 1.3;
  if (item === "Expert Belt" && typeMultiplier > 1) return 1.2;
  if (item === "Muscle Band" && move.damageClass === "physical") return 1.1;
  if (item === "Wise Glasses" && move.damageClass === "special") return 1.1;
  if (TYPE_BOOST_ITEMS[item] === move.type) return 1.2;
  return 1;
}

function getCritChance(move, user) {
  const stage = Math.min(3, (move.critRate || 0) + ((canUseHeldItem(user) && cleanText(user.item) === "Scope Lens") ? 1 : 0) + (abilityId(user) === "superluck" ? 1 : 0));
  if (stage <= 0) return 1 / 24;
  if (stage === 1) return 1 / 8;
  if (stage === 2) return 1 / 2;
  return 1;
}

function getMoveHitCount(move, user = null) {
  if (!move.minHits || !move.maxHits) return 1;
  if (abilityId(user) === "skilllink") return move.maxHits;
  return move.minHits === move.maxHits ? move.maxHits : move.minHits + Math.floor(Math.random() * (move.maxHits - move.minHits + 1));
}

function getDisplayedHitCount(move) {
  return move.minHits && move.maxHits ? move.maxHits : 1;
}

function moveTargetsOpponent(move) {
  return !SELF_TARGETS.has(move.target) && move.target !== "users-field";
}

function abilityId(mon) {
  return toId(typeof mon === "string" ? mon : mon?.ability);
}

function getCustomAbility(mon) {
  return state.customAbilityById.get(abilityId(mon)) || null;
}

function getPlateType(mon) {
  return mon && !mon.itemConsumed ? PLATE_TYPE_ITEMS[cleanText(mon.item)] || "" : "";
}

function getMemoryType(mon) {
  return mon && !mon.itemConsumed ? MEMORY_TYPE_ITEMS[cleanText(mon.item)] || "" : "";
}

function canUseHeldItem(mon) {
  return Boolean(mon?.item && !mon.itemConsumed && abilityId(mon) !== "klutz");
}

function getCombatantFormLabel(mon) {
  if (!mon || !mon.currentForm || mon.currentForm === "Base") return "";
  return `${mon.currentForm} Form`;
}

function getBattleSideForMon(mon) {
  if (!state.battle.started || !mon) return "";
  if (state.battle.teams.alpha?.combatants?.includes(mon)) return "alpha";
  if (state.battle.teams.beta?.combatants?.includes(mon)) return "beta";
  return "";
}

function hasActiveAbility(mon, abilityName, attacker = null) {
  const id = abilityId(mon);
  if (!id) return false;
  if (isNeutralizingGasActive() && id !== "neutralizinggas") return false;
  if (id !== toId(abilityName)) return false;
  if (!attacker) return true;
  return !isAbilitySuppressed(attacker, mon);
}

function isGrounded(mon) {
  if (!mon || mon.fainted) return false;
  if (mon.types.includes("Flying")) return false;
  if (cleanText(mon.item) === "Air Balloon" && !mon.airBalloonPopped) return false;
  if (hasActiveAbility(mon, "levitate")) return false;
  return true;
}

function isAbilitySuppressed(attacker, defender) {
  if (!attacker || !defender) return false;
  if (isNeutralizingGasActive() && abilityId(defender) !== "neutralizinggas") return true;
  const attackerAbility = abilityId(attacker);
  const defenderAbility = abilityId(defender);
  return MOLD_BREAKER_ABILITIES.has(attackerAbility) && IGNORABLE_DEFENDER_ABILITIES.has(defenderAbility);
}

function isNeutralizingGasActive() {
  return ["alpha", "beta"].some((sideKey) => {
    return getActiveCombatants(sideKey).some((mon) => abilityId(mon) === "neutralizinggas");
  });
}

function hasGlobalWeatherSuppression() {
  return ["alpha", "beta"].some((sideKey) => {
    return getActiveCombatants(sideKey).some((mon) => ["airlock", "cloudnine"].includes(abilityId(mon)));
  });
}

function getActiveWeather() {
  if (!state.battle.started || hasGlobalWeatherSuppression()) return "";
  return state.battle.weather;
}

function getActiveTerrain() {
  if (!state.battle.started) return "";
  return state.battle.terrain;
}

function setWeather(weather, source) {
  if (!state.battle.started) return;
  if (state.battle.weather === weather) return;
  state.battle.weather = weather;
  state.battle.weatherTurns = canUseHeldItem(source) && ["Damp Rock", "Heat Rock", "Smooth Rock", "Icy Rock"].includes(cleanText(source.item)) ? 8 : 5;
  appendBattleLog(source.displayName, `changed the weather to ${normalizeWeatherLabel(weather)}.`);
  ["alpha", "beta"].forEach((sideKey) => getActiveCombatants(sideKey).forEach(refreshBattleFormState));
}

function setTerrain(terrain, source) {
  if (!state.battle.started) return;
  if (state.battle.terrain === terrain) return;
  state.battle.terrain = terrain;
  state.battle.terrainTurns = canUseHeldItem(source) && cleanText(source.item) === "Terrain Extender" ? 8 : 5;
  appendBattleLog(source.displayName, `created ${normalizeTerrainLabel(terrain)}.`);
  ["alpha", "beta"].forEach((sideKey) => getActiveCombatants(sideKey).forEach(refreshBattleFormState));
}

function clearsStatusInWeather(mon) {
  return abilityId(mon) === "hydration" && getActiveWeather() === "rain";
}

function blocksStatusFromTerrain(mon, status) {
  if (!isGrounded(mon)) return false;
  if (getActiveTerrain() === "electric" && status === "sleep") return true;
  if (getActiveTerrain() === "misty" && ["burn", "poison", "tox", "paralysis", "sleep", "freeze"].includes(status)) return true;
  return false;
}

function blocksConfusionFromTerrain(mon) {
  return getActiveTerrain() === "misty" && isGrounded(mon);
}

function isWeatherDamageImmune(mon, weather) {
  if (abilityId(mon) === "magicguard") return true;
  if (weather === "sand") {
    return mon.types.some((type) => ["Rock", "Ground", "Steel"].includes(type))
      || ["sandforce", "sandrush", "sandveil", "overcoat"].includes(abilityId(mon));
  }
  if (weather === "snow") {
    return mon.types.includes("Ice") || ["icebody", "snowcloak", "overcoat"].includes(abilityId(mon));
  }
  return false;
}

function getWeatherPowerModifier(move) {
  if (!move?.type) return 1;
  if (getActiveWeather() === "rain") {
    if (move.type === "Water") return 1.5;
    if (move.type === "Fire") return 0.5;
  }
  if (getActiveWeather() === "sun") {
    if (move.type === "Fire") return 1.5;
    if (move.type === "Water") return 0.5;
  }
  return 1;
}

function isSoundMove(move) {
  const id = move?.id || "";
  return SOUND_MOVE_KEYWORDS.some((keyword) => id.includes(keyword));
}

function isBallOrBombMove(move) {
  const id = move?.id || "";
  return BALL_BOMB_MOVE_KEYWORDS.some((keyword) => id.includes(keyword));
}

function moveIdMatches(move, keywords) {
  const id = move?.id || "";
  return keywords.some((keyword) => id.includes(keyword));
}

function isBiteMove(move) {
  return moveIdMatches(move, BITE_MOVE_KEYWORDS);
}

function isPunchMove(move) {
  return moveIdMatches(move, PUNCH_MOVE_KEYWORDS);
}

function isPulseMove(move) {
  return moveIdMatches(move, PULSE_MOVE_KEYWORDS);
}

function isSlicingMove(move) {
  return moveIdMatches(move, SLICING_MOVE_KEYWORDS);
}

function isWindMove(move) {
  return moveIdMatches(move, WIND_MOVE_KEYWORDS);
}

function isPowderMove(move) {
  return moveIdMatches(move, POWDER_MOVE_KEYWORDS);
}

function getMoveTypeForUse(user, move) {
  if (!move) return "";
  const id = abilityId(user);
  if (id === "normalize") return "Normal";
  if (id === "liquidvoice" && isSoundMove(move)) return "Water";
  if (move.id === "judgment" && id === "multitype") return getPlateType(user) || move.type;
  if (move.id === "multi-attack" && id === "rkssystem") return getMemoryType(user) || move.type;
  if (move.type === "Normal") {
    if (id === "pixilate") return "Fairy";
    if (id === "aerilate") return "Flying";
    if (id === "refrigerate") return "Ice";
    if (id === "galvanize") return "Electric";
  }
  return move.type;
}

function getMovePowerAbilityModifier(user, move) {
  const id = abilityId(user);
  if (move.originalType === "Normal" && ["pixilate", "aerilate", "refrigerate", "galvanize"].includes(id)) return 1.2;
  if (id === "normalize") return 1.2;
  return 1;
}

function getDisplayedMoveName(user, moveSlot, move) {
  if (!move) return moveSlot.name;
  if (move.id === "transform") return "Transform";
  return moveSlot.name;
}

function getActualAbilityId(mon) {
  return toId(typeof mon === "string" ? mon : mon?.ability);
}

function stripTypeChangingAbility(abilityName) {
  const id = toId(abilityName);
  if (["protean", "libero", "normalize", "pixilate", "aerilate", "refrigerate", "galvanize", "liquidvoice"].includes(id)) return "";
  return abilityName;
}

function transformCombatant(mon, target, sourceLabel) {
  if (!mon || !target || target.fainted || mon.transformed) return false;
  mon.transformed = true;
  mon.types = [...target.types];
  mon.stats = { ...target.stats };
  mon.ability = target.ability;
  mon.moves = target.moves.map((moveSlot) => ({
    name: moveSlot.name,
    id: moveSlot.id,
    pp: Math.min(5, moveSlot.maxPp),
    maxPp: Math.min(5, moveSlot.maxPp),
  }));
  mon.boosts = { ...target.boosts };
  appendBattleLog(mon.displayName, `${sourceLabel} copied ${target.displayName}'s form.`);
  return true;
}

function restoreCombatantForm(mon) {
  if (!mon?.transformed) return;
  mon.transformed = false;
  mon.types = [...mon.originalTypes];
  mon.stats = { ...mon.originalStats };
  mon.moves = mon.originalMoves.map((moveSlot) => ({ ...moveSlot }));
  mon.ability = mon.originalAbility;
  resetBoosts(mon);
}

function applyForecastForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "forecast") return;
  const weather = getActiveWeather();
  const nextType = weather === "sun" ? "Fire" : weather === "rain" ? "Water" : weather === "snow" ? "Ice" : mon.originalTypes[0];
  mon.types = [nextType];
}

function applyMultitypeForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "multitype") return;
  mon.types = [getPlateType(mon) || mon.originalTypes[0]];
}

function applyRksSystemForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "rkssystem") return;
  mon.types = [getMemoryType(mon) || mon.originalTypes[0]];
}

function applyMimicry(mon) {
  if (!mon || getActualAbilityId(mon) !== "mimicry") return;
  const terrain = getActiveTerrain();
  if (!terrain) {
    mon.types = [...mon.originalTypes];
    return;
  }
  const terrainType = terrain === "electric" ? "Electric" : terrain === "grassy" ? "Grass" : terrain === "misty" ? "Fairy" : "Psychic";
  mon.types = [terrainType];
}

function applySchoolingForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "schooling") return;
  mon.currentForm = mon.hp > Math.floor(mon.maxHp / 4) ? "School" : "Solo";
}

function applyShieldsDownForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "shieldsdown") return;
  mon.currentForm = mon.hp > Math.floor(mon.maxHp / 2) ? "Meteor" : "Core";
}

function applyZenModeForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "zenmode") return;
  mon.currentForm = mon.hp <= Math.floor(mon.maxHp / 2) ? "Zen" : "Base";
}

function applyTeraShiftForm(mon) {
  if (!mon || getActualAbilityId(mon) !== "terashift") return;
  if (mon.currentForm !== "Stellar") appendBattleLog(mon.displayName, "shifted into its Stellar form.");
  mon.currentForm = "Stellar";
  mon.types = ["Stellar"];
}

function applyStanceChange(mon, move) {
  if (!mon || getActualAbilityId(mon) !== "stancechange" || !move) return;
  const nextForm = move.id === "kings-shield" ? "Shield" : "Blade";
  mon.currentForm = nextForm;
}

function refreshBattleFormState(mon) {
  if (!mon) return;
  applyForecastForm(mon);
  applyMultitypeForm(mon);
  applyRksSystemForm(mon);
  applyMimicry(mon);
  applySchoolingForm(mon);
  applyShieldsDownForm(mon);
  applyZenModeForm(mon);
  applyTeraShiftForm(mon);
}

function matchesAbilityModifierChance(modifier) {
  return Math.random() * 100 < (modifier?.chance || 100);
}

function resolveAbilityModifierTarget(mon, modifier, context = {}) {
  if (!modifier) return null;
  if (modifier.target === "self") return mon;
  if (modifier.target === "opponent") return context.opponent || context.target || getActiveCombatant(otherSideKey(getBattleSideForMon(mon)));
  if (modifier.target === "attacker") return context.attacker || context.opponent || null;
  if (modifier.target === "replacement") return context.replacement || null;
  if (modifier.target === "used-move") return context.move || null;
  if (modifier.target === "field") return state.battle;
  return mon;
}

function applyCustomAbilityStatus(target, modifier, source) {
  if (!target) return false;
  if (modifier.status === "confusion") return inflictConfusion(target, { source });
  return inflictMajorStatus(target, modifier.status, { source });
}

function applyCustomAbilityModifier(mon, modifier, context = {}) {
  const target = resolveAbilityModifierTarget(mon, modifier, context);
  if (!target) return false;
  if (modifier.action === "replace-on-faint") {
    if (modifier.targeting === "self") {
      const sideKey = getBattleSideForMon(mon);
      if (sideKey) forceSwitch(sideKey, getActiveIndexes(sideKey).find((index) => getCombatantByIndex(sideKey, index) === mon));
      return true;
    }
    if (modifier.targeting === "random-opponent" || modifier.targeting === "all-opponents") {
      const sideKey = getBattleSideForMon(mon);
      if (sideKey) forceSwitch(otherSideKey(sideKey));
      return true;
    }
    return false;
  }
  if (modifier.action === "raise-stat" || modifier.action === "lower-stat") {
    if (!target.boosts) return false;
    const change = modifier.action === "raise-stat" ? modifier.stages : -modifier.stages;
    const applied = applyBoostChanges(target, [{ stat: modifier.stat, change }], change < 0 ? mon : null);
    if (applied.length) appendBattleLog(target.displayName, describeBoostChanges(applied));
    return applied.length > 0;
  }
  if (modifier.action === "inflict-status" || modifier.action === "contact-reaction") {
    const applied = applyCustomAbilityStatus(target, modifier, mon);
    if (applied) appendBattleLog(target.displayName, modifier.status === "confusion" ? "became confused." : describeStatusInfliction(modifier.status));
    return applied;
  }
  if (modifier.action === "heal") {
    const healed = healCombatant(target, Math.max(1, Math.floor((target.maxHp * modifier.amount) / 100)));
    if (healed > 0) appendBattleLog(target.displayName, `restored ${healed} HP.`);
    return healed > 0;
  }
  if (modifier.action === "damage") {
    const basis = target.maxHp || 0;
    if (!basis) return false;
    return applyDirectDamage(target, Math.max(1, Math.floor((basis * modifier.amount) / 100)), mon.ability || "Ability effect") > 0;
  }
  if (modifier.action === "set-weather") {
    if (modifier.weather === "clear") {
      state.battle.weather = "";
      state.battle.weatherTurns = 0;
      appendBattleLog(mon.displayName, "cleared the weather.");
      return true;
    }
    setWeather(modifier.weather, mon);
    return true;
  }
  if (modifier.action === "set-terrain") {
    if (modifier.terrain === "clear") {
      state.battle.terrain = "";
      state.battle.terrainTurns = 0;
      appendBattleLog(mon.displayName, "cleared the terrain.");
      return true;
    }
    setTerrain(modifier.terrain, mon);
    return true;
  }
  return false;
}

function runCustomAbilityEvent(mon, eventName, context = {}) {
  const ability = getCustomAbility(mon);
  if (!ability?.modifiers?.length) return;
  ability.modifiers
    .filter((modifier) => modifier.event === eventName)
    .forEach((modifier) => {
      if (!matchesAbilityModifierChance(modifier)) return;
      applyCustomAbilityModifier(mon, modifier, context);
    });
}

function runCustomAbilityContactOnHit(defender, attacker, move, totalDamage) {
  if (!defender || !attacker || defender.fainted || !isContactMove(move)) return;
  runCustomAbilityEvent(defender, "contact-on-hit", {
    attacker,
    opponent: attacker,
    target: attacker,
    move,
    totalDamage,
  });
}

function runCustomAbilityFaintReplacement(faintedMon, source = {}) {
  const attacker = source.attacker;
  if (attacker && attacker !== faintedMon && !attacker.fainted) {
    runCustomAbilityEvent(attacker, "faint-replacement", {
      target: faintedMon,
      opponent: faintedMon,
      attacker,
      move: source.move,
    });
  }
  ["alpha", "beta"].forEach((sideKey) => {
    const active = getActiveCombatant(sideKey);
    if (!active || active === faintedMon || active.fainted || active === attacker) return;
    runCustomAbilityEvent(active, "faint-replacement", {
      target: faintedMon,
      opponent: faintedMon,
      attacker,
      move: source.move,
    });
  });
}

function applyCustomAbilityMoveUse(mon, move, context = {}) {
  const ability = getCustomAbility(mon);
  if (!ability?.modifiers?.length || !move) return;
  ability.modifiers
    .filter((modifier) => modifier.event === "move-use")
    .forEach((modifier) => {
      if (!matchesAbilityModifierChance(modifier)) return;
      if (modifier.action === "rewrite-move-type") {
        move.type = modifier.type;
      }
      if (modifier.action === "rewrite-move-category") {
        move.damageClass = normalizeMoveCategory(modifier.moveCategory);
      }
    });
}

function applyCustomAbilityPriorityTargeting(mon, move, context = {}) {
  const ability = getCustomAbility(mon);
  if (!ability?.modifiers?.length || !move) return;
  ability.modifiers
    .filter((modifier) => modifier.event === "priority-targeting" && modifier.action === "retarget-move")
    .forEach((modifier) => {
      if (!matchesAbilityModifierChance(modifier)) return;
      if (modifier.targeting === "self") move.target = "user";
      if (["normal", "random-opponent", "all-opponents", "all-adjacent"].includes(modifier.targeting)) move.target = "selected-pokemon";
    });
}

function getCustomAbilityPriorityBonus(mon) {
  const ability = getCustomAbility(mon);
  if (!ability?.modifiers?.length) return 0;
  return ability.modifiers
    .filter((modifier) => modifier.event === "priority-targeting" && modifier.action === "modify-priority")
    .filter((modifier) => matchesAbilityModifierChance(modifier))
    .reduce((total, modifier) => total + (safeNumber(modifier.priority) || 0), 0);
}

function getCustomAbilityDamageModifier(mon, move, eventName, typeMultiplier = 1, role = "attacker") {
  const ability = getCustomAbility(mon);
  if (!ability?.modifiers?.length || !move) return 1;
  return ability.modifiers
    .filter((modifier) => modifier.event === eventName)
    .filter((modifier) => matchesAbilityModifierChance(modifier))
    .reduce((modifierTotal, modifier) => {
      if (role === "attacker" && modifier.action === "boost-type-damage" && move.type === modifier.type) {
        return modifierTotal * (1 + (modifier.amount / 100));
      }
      if (role === "defender" && modifier.action === "reduce-type-damage" && move.type === modifier.type) {
        return modifierTotal * Math.max(0, 1 - (modifier.amount / 100));
      }
      if (role === "attacker" && modifier.action === "boost-type-damage" && modifier.type === "All" && typeMultiplier > 1) {
        return modifierTotal * (1 + (modifier.amount / 100));
      }
      return modifierTotal;
    }, 1);
}

function handleCustomAbilityMoveImmunity(attacker, defender, move) {
  const ability = getCustomAbility(defender);
  if (!ability?.modifiers?.length || !move) return false;
  const immunity = ability.modifiers.find((modifier) => (
    modifier.event === "immunity-damage"
    && modifier.action === "grant-immunity"
    && modifier.type === move.type
    && matchesAbilityModifierChance(modifier)
  ));
  if (!immunity) return false;
  appendBattleLog(defender.displayName, `is immune to ${move.type}-type moves because of ${defender.ability}.`);
  return true;
}

function getHighestStatKey(mon) {
  const keys = ["attack", "defense", "spattack", "spdefense", "speed"];
  return keys.reduce((best, key) => (mon.stats[key] > mon.stats[best] ? key : best), "attack");
}

function opposingActiveHasAbility(mon, abilityName) {
  if (!state.battle.started || !mon) return false;
  const sideKey = ["alpha", "beta"].find((key) => state.battle.teams[key]?.combatants?.includes(mon));
  if (!sideKey) return false;
  const requested = toId(abilityName);
  return getActiveCombatants(otherSideKey(sideKey)).some((foe) => {
    if (requested === "unnerve" && ["asoneglastrier", "asonespectrier"].includes(abilityId(foe))) return !isAbilitySuppressed(mon, foe);
    return hasActiveAbility(foe, abilityName, mon);
  });
}

function isTrappedByAbility(mon, foe) {
  if (!mon || !foe || mon.fainted || foe.fainted) return false;
  if (canUseHeldItem(mon) && cleanText(mon.item) === "Shed Shell") return false;
  const foeAbility = abilityId(foe);
  if (foeAbility === "shadowtag" && abilityId(mon) !== "shadowtag") return true;
  if (foeAbility === "arenatrap" && isGrounded(mon)) return true;
  if (foeAbility === "magnetpull" && mon.types.includes("Steel")) return true;
  return false;
}

function countFaintedTeammates(mon) {
  const sideKey = getBattleSideForMon(mon);
  if (!sideKey) return 0;
  return state.battle.teams[sideKey].combatants.filter((teammate) => teammate !== mon && teammate.fainted).length;
}

function activeAbilityExists(abilityName) {
  return ["alpha", "beta"].some((sideKey) => {
    return getActiveCombatants(sideKey).some((mon) => hasActiveAbility(mon, abilityName));
  });
}

function getAuraDamageModifier(move) {
  if (!move?.type) return 1;
  const fairyAura = activeAbilityExists("fairy aura");
  const darkAura = activeAbilityExists("dark aura");
  if ((move.type === "Fairy" && fairyAura) || (move.type === "Dark" && darkAura)) {
    return activeAbilityExists("aura break") ? 0.75 : 4 / 3;
  }
  return 1;
}

function isProtosynthesisActive(mon) {
  return abilityId(mon) === "protosynthesis" && getActiveWeather() === "sun";
}

function isQuarkDriveActive(mon) {
  return abilityId(mon) === "quarkdrive" && getActiveTerrain() === "electric";
}

function hasActivePlusMinusPartner(mon) {
  const sideKey = getBattleSideForMon(mon);
  if (!sideKey) return false;
  return getActiveCombatants(sideKey).some((active) => active !== mon && ["plus", "minus"].includes(abilityId(active)));
}

function activatePowerConstruct(mon) {
  if (!mon || abilityId(mon) !== "powerconstruct" || mon.powerConstructed || mon.fainted || mon.hp > Math.floor(mon.maxHp / 2)) return false;
  const oldMax = mon.maxHp;
  mon.powerConstructed = true;
  mon.currentForm = "Complete";
  mon.maxHp = Math.floor(mon.maxHp * 1.5);
  mon.stats.hp = mon.maxHp;
  mon.hp += mon.maxHp - oldMax;
  appendBattleLog(mon.displayName, "assembled into Complete Forme with Power Construct.");
  return true;
}

function triggerBattleBond(attacker) {
  if (!attacker || attacker.fainted || abilityId(attacker) !== "battlebond" || attacker.battleBonded) return false;
  attacker.battleBonded = true;
  attacker.currentForm = "Ash";
  const applied = applyBoostChanges(attacker, [
    { stat: "attack", change: 1 },
    { stat: "spattack", change: 1 },
    { stat: "speed", change: 1 },
  ]);
  appendBattleLog(attacker.displayName, applied.length ? "transformed with Battle Bond." : "activated Battle Bond.");
  return true;
}

function clearFieldWithTeraformZero(mon) {
  if (!mon || abilityId(mon) !== "teraformzero") return;
  const hadField = Boolean(state.battle.weather || state.battle.terrain);
  state.battle.weather = "";
  state.battle.weatherTurns = 0;
  state.battle.terrain = "";
  state.battle.terrainTurns = 0;
  if (hadField) appendBattleLog(mon.displayName, "reset the weather and terrain with Teraform Zero.");
}

function triggerBoostAbility(mon, boosts, text) {
  const applied = applyBoostChanges(mon, boosts);
  if (applied.length) appendBattleLog(mon.displayName, text);
}

function triggerFaintAbilities(faintedMon, source = {}) {
  const attacker = source.attacker;
  if (attacker && attacker !== faintedMon && !attacker.fainted) {
    if (abilityId(faintedMon) === "innardsout" && source.damageTaken) {
      applyDirectDamage(attacker, Math.max(1, source.damageTaken), "Innards Out");
    }
    const attackerAbility = abilityId(attacker);
    if (["receiver", "powerofalchemy"].includes(attackerAbility) && faintedMon.ability && !UNSWAPPABLE_ABILITIES.has(abilityId(faintedMon))) {
      attacker.ability = faintedMon.ability;
      appendBattleLog(attacker.displayName, `copied ${faintedMon.displayName}'s ability with ${attackerAbility === "receiver" ? "Receiver" : "Power of Alchemy"}.`);
    }
    triggerBattleBond(attacker);
    if (attackerAbility === "moxie") triggerBoostAbility(attacker, [{ stat: "attack", change: 1 }], "raised its Attack with Moxie.");
    if (attackerAbility === "chillingneigh") triggerBoostAbility(attacker, [{ stat: "attack", change: 1 }], "raised its Attack with Chilling Neigh.");
    if (attackerAbility === "asoneglastrier") triggerBoostAbility(attacker, [{ stat: "attack", change: 1 }], "raised its Attack with As One.");
    if (attackerAbility === "grimneigh") triggerBoostAbility(attacker, [{ stat: "spattack", change: 1 }], "raised its Sp. Atk with Grim Neigh.");
    if (attackerAbility === "asonespectrier") triggerBoostAbility(attacker, [{ stat: "spattack", change: 1 }], "raised its Sp. Atk with As One.");
    if (attackerAbility === "beastboost") {
      const bestStat = getHighestStatKey(attacker);
      triggerBoostAbility(attacker, [{ stat: bestStat, change: 1 }], `raised its ${STAT_LABELS[bestStat]} with Beast Boost.`);
    }
  }
  ["alpha", "beta"].forEach((sideKey) => {
    const active = getActiveCombatant(sideKey);
    if (!active || active === faintedMon || active.fainted) return;
    if (abilityId(active) === "soulheart") {
      triggerBoostAbility(active, [{ stat: "spattack", change: 1 }], "raised its Sp. Atk with Soul-Heart.");
    }
  });
}

function getAbilityPriorityBonus(mon, move) {
  const id = abilityId(mon);
  if (!move) return 0;
  let bonus = getCustomAbilityPriorityBonus(mon);
  if (id === "prankster" && move.damageClass === "status") bonus += 1;
  if (id === "galewings" && move.type === "Flying" && mon.hp === mon.maxHp) bonus += 1;
  if (id === "triage" && isHealingMove(move)) bonus += 3;
  if (id === "myceliummight" && move.damageClass === "status") bonus -= 0.1;
  if (id === "stall") bonus -= 0.1;
  return bonus;
}

function isHealingMove(move) {
  if (!move) return false;
  return move.healing > 0 || move.drain > 0 || HEALING_MOVE_IDS.has(move.id);
}

function moveHasSecondaryEffects(move) {
  if (!move) return false;
  return Boolean(
    move.flinchChance > 0
    || (move.ailment && move.ailment !== "none" && move.ailment !== "unknown")
    || (Array.isArray(move.boosts) && move.boosts.length && (move.statChance || move.damageClass === "status"))
    || (Array.isArray(move.modifiers) && move.modifiers.length)
  );
}

function getModifiedMovePower(user, target, move) {
  let power = Math.max(0, move?.power || 0);
  const userAbility = abilityId(user);
  if (userAbility === "technician" && power > 0 && power <= 60) power = Math.floor(power * 1.5);
  return power;
}

function getStabModifier(user) {
  return abilityId(user) === "adaptability" ? 2 : 1.5;
}

function getOffensiveAbilityModifier(user, target, move, typeMultiplier) {
  const id = abilityId(user);
  let modifier = 1;
  if (id === "defeatist" && user.hp <= Math.floor(user.maxHp / 2) && (move.damageClass === "physical" || move.damageClass === "special")) modifier *= 0.5;
  if (id === "blaze" && move.type === "Fire" && user.hp <= Math.floor(user.maxHp / 3)) modifier *= 1.5;
  if (id === "torrent" && move.type === "Water" && user.hp <= Math.floor(user.maxHp / 3)) modifier *= 1.5;
  if (id === "overgrow" && move.type === "Grass" && user.hp <= Math.floor(user.maxHp / 3)) modifier *= 1.5;
  if (id === "swarm" && move.type === "Bug" && user.hp <= Math.floor(user.maxHp / 3)) modifier *= 1.5;
  if (id === "guts" && move.damageClass === "physical" && user.status) modifier *= 1.5;
  if (id === "hustle" && move.damageClass === "physical") modifier *= 1.5;
  if (id === "toxicboost" && move.damageClass === "physical" && (user.status === "poison" || user.status === "tox")) modifier *= 1.5;
  if (id === "flareboost" && move.damageClass === "special" && user.status === "burn") modifier *= 1.5;
  if (id === "flashfire" && user.flashFireBoost && move.type === "Fire") modifier *= 1.5;
  if (id === "waterbubble" && move.type === "Water") modifier *= 2;
  if (id === "tintedlens" && typeMultiplier > 0 && typeMultiplier < 1) modifier *= 2;
  if (id === "solarpower" && getActiveWeather() === "sun" && move.damageClass === "special") modifier *= 1.5;
  if (id === "battery" && move.damageClass === "special") modifier *= 1.3;
  if (id === "powerspot") modifier *= 1.3;
  if (["plus", "minus"].includes(id) && hasActivePlusMinusPartner(user) && move.damageClass === "special") modifier *= 1.5;
  if (id === "analytic" && target && getModifiedBattleStat(user, "speed") < getModifiedBattleStat(target, "speed")) modifier *= 1.3;
  if (id === "stakeout" && target?.switchedInThisTurn) modifier *= 2;
  if (id === "sheerforce" && move.damageClass !== "status" && moveHasSecondaryEffects(move)) modifier *= 1.3;
  if (id === "sandforce" && getActiveWeather() === "sand" && ["Rock", "Ground", "Steel"].includes(move.type)) modifier *= 1.3;
  if (id === "strongjaw" && isBiteMove(move)) modifier *= 1.5;
  if (id === "ironfist" && isPunchMove(move)) modifier *= 1.2;
  if (id === "megalauncher" && isPulseMove(move)) modifier *= 1.5;
  if (id === "sharpness" && isSlicingMove(move)) modifier *= 1.5;
  if (id === "toughclaws" && isContactMove(move)) modifier *= 1.3;
  if (id === "punkrock" && isSoundMove(move)) modifier *= 1.3;
  if (id === "rockypayload" && move.type === "Rock") modifier *= 1.5;
  if (id === "steelworker" && move.type === "Steel") modifier *= 1.5;
  if (id === "steelyspirit" && move.type === "Steel") modifier *= 1.5;
  if (id === "transistor" && move.type === "Electric") modifier *= 1.3;
  if (id === "dragonsmaw" && move.type === "Dragon") modifier *= 1.5;
  if (id === "neuroforce" && typeMultiplier > 1) modifier *= 1.25;
  if (id === "reckless" && move.drain < 0) modifier *= 1.2;
  if (id === "supremeoverlord") modifier *= 1 + Math.min(5, countFaintedTeammates(user)) * 0.1;
  return modifier;
}

function getDefensiveAbilityModifier(attacker, defender, move, typeMultiplier) {
  const id = getActualAbilityId(defender);
  if (isAbilitySuppressed(attacker, defender)) return 1;
  let modifier = 1;
  if (["filter", "solidrock", "prismarmor"].includes(id) && typeMultiplier > 1) modifier *= 0.75;
  if (id === "thickfat" && (move.type === "Fire" || move.type === "Ice")) modifier *= 0.5;
  if (id === "heatproof" && move.type === "Fire") modifier *= 0.5;
  if (id === "multiscale" && defender.hp === defender.maxHp) modifier *= 0.5;
  if (id === "shadowshield" && defender.hp === defender.maxHp) modifier *= 0.5;
  if (id === "furcoat" && move.damageClass === "physical") modifier *= 0.5;
  if (id === "icescales" && move.damageClass === "special") modifier *= 0.5;
  if (id === "marvelscale" && move.damageClass === "physical" && defender.status) modifier *= (2 / 3);
  if (id === "waterbubble" && move.type === "Fire") modifier *= 0.5;
  if (id === "dryskin" && move.type === "Fire") modifier *= 1.25;
  if (id === "punkrock" && isSoundMove(move)) modifier *= 0.5;
  if (id === "fluffy") {
    if (move.type === "Fire") modifier *= 2;
    else if (isContactMove(move)) modifier *= 0.5;
  }
  if (id === "friendguard") modifier *= 0.75;
  if (id === "purifyingsalt" && move.type === "Ghost") modifier *= 0.5;
  if (id === "terashell" && defender.hp === defender.maxHp && typeMultiplier > 0) modifier *= 0.5 / typeMultiplier;
  return modifier;
}

function handleAbilityMoveImmunity(attacker, defender, move) {
  if (!defender || !move || isAbilitySuppressed(attacker, defender)) return false;
  if (handleCustomAbilityMoveImmunity(attacker, defender, move)) return true;
  const id = getActualAbilityId(defender);
  if (id === "overcoat" && isPowderMove(move)) {
    appendBattleLog(defender.displayName, "ignored the powder move with Overcoat.");
    return true;
  }
  if (["soundproof", "cacophony"].includes(id) && isSoundMove(move)) {
    appendBattleLog(defender.displayName, "ignored the sound move with Soundproof.");
    return true;
  }
  if (id === "bulletproof" && isBallOrBombMove(move)) {
    appendBattleLog(defender.displayName, "blocked the projectile move with Bulletproof.");
    return true;
  }
  if (id === "windrider" && isWindMove(move)) {
    triggerBoostAbility(defender, [{ stat: "attack", change: 1 }], "raised its Attack with Wind Rider.");
    appendBattleLog(defender.displayName, "ignored the wind move with Wind Rider.");
    return true;
  }
  if (id === "levitate" && move.type === "Ground") {
    appendBattleLog(defender.displayName, "is immune thanks to Levitate.");
    return true;
  }
  if (id === "flashfire" && move.type === "Fire") {
    defender.flashFireBoost = true;
    appendBattleLog(defender.displayName, "absorbed the fire with Flash Fire.");
    return true;
  }
  if (id === "waterabsorb" && move.type === "Water") {
    const healed = healCombatant(defender, Math.max(1, Math.floor(defender.maxHp / 4)));
    if (healed > 0) appendBattleLog(defender.displayName, `restored ${healed} HP with Water Absorb.`);
    else appendBattleLog(defender.displayName, "ignored the Water-type move with Water Absorb.");
    return true;
  }
  if (id === "dryskin" && move.type === "Water") {
    const healed = healCombatant(defender, Math.max(1, Math.floor(defender.maxHp / 4)));
    if (healed > 0) appendBattleLog(defender.displayName, `restored ${healed} HP with Dry Skin.`);
    else appendBattleLog(defender.displayName, "ignored the Water-type move with Dry Skin.");
    return true;
  }
  if (id === "stormdrain" && move.type === "Water") {
    applyBoostChanges(defender, [{ stat: "spattack", change: 1 }]);
    appendBattleLog(defender.displayName, "drew in the Water-type move with Storm Drain.");
    return true;
  }
  if (id === "voltabsorb" && move.type === "Electric") {
    const healed = healCombatant(defender, Math.max(1, Math.floor(defender.maxHp / 4)));
    if (healed > 0) appendBattleLog(defender.displayName, `restored ${healed} HP with Volt Absorb.`);
    else appendBattleLog(defender.displayName, "ignored the Electric-type move with Volt Absorb.");
    return true;
  }
  if (id === "lightningrod" && move.type === "Electric") {
    applyBoostChanges(defender, [{ stat: "spattack", change: 1 }]);
    appendBattleLog(defender.displayName, "drew in the Electric-type move with Lightning Rod.");
    return true;
  }
  if (id === "motordrive" && move.type === "Electric") {
    applyBoostChanges(defender, [{ stat: "speed", change: 1 }]);
    appendBattleLog(defender.displayName, "boosted its Speed with Motor Drive.");
    return true;
  }
  if (id === "sapsipper" && move.type === "Grass") {
    applyBoostChanges(defender, [{ stat: "attack", change: 1 }]);
    appendBattleLog(defender.displayName, "raised its Attack with Sap Sipper.");
    return true;
  }
  if (id === "eartheater" && move.type === "Ground") {
    const healed = healCombatant(defender, Math.max(1, Math.floor(defender.maxHp / 4)));
    if (healed > 0) appendBattleLog(defender.displayName, `restored ${healed} HP with Earth Eater.`);
    return true;
  }
  if (id === "wellbakedbody" && move.type === "Fire") {
    applyBoostChanges(defender, [{ stat: "defense", change: 2 }]);
    appendBattleLog(defender.displayName, "hardened itself with Well-Baked Body.");
    return true;
  }
  if (id === "wonderguard" && move.damageClass !== "status" && getTypeMultiplier(move.type, defender.types, defender) <= 1) {
    appendBattleLog(defender.displayName, "is protected by Wonder Guard.");
    return true;
  }
  if (id === "goodasgold" && move.damageClass === "status" && abilityId(attacker) !== "myceliummight") {
    appendBattleLog(defender.displayName, "blocked the status move with Good as Gold.");
    return true;
  }
  return false;
}

function canReceiveStatus(mon, status, source = null) {
  if (blocksStatusFromTerrain(mon, status)) return false;
  const id = getActualAbilityId(mon);
  if (!id || (source && isAbilitySuppressed(source, mon))) return true;
  if (id === "leafguard" && getActiveWeather() === "sun") return false;
  if (id === "flowerveil" && mon.types.includes("Grass")) return false;
  if (["comatose", "purifyingsalt"].includes(id)) return false;
  if (status === "burn" && ["waterveil", "waterbubble"].includes(id)) return false;
  if (status === "paralysis" && id === "limber") return false;
  if ((status === "poison" || status === "tox") && ["immunity", "pastelveil"].includes(id)) return false;
  if (status === "sleep" && ["insomnia", "vitalspirit", "sweetveil"].includes(id)) return false;
  if (status === "freeze" && id === "magmaarmor") return false;
  return true;
}

function canReceiveConfusion(mon, source = null) {
  if (blocksConfusionFromTerrain(mon)) return false;
  const id = getActualAbilityId(mon);
  if (!id || (source && isAbilitySuppressed(source, mon))) return true;
  return !["owntempo", "comatose", "purifyingsalt"].includes(id);
}

function isContactMove(move) {
  if (!move || move.damageClass !== "physical") return false;
  const id = move.id || "";
  if (NON_CONTACT_MOVE_IDS.has(id)) return false;
  if (CONTACT_HINT_KEYWORDS.some((hint) => id.includes(hint))) return true;
  if (NON_CONTACT_HINT_KEYWORDS.some((hint) => id.includes(hint))) return false;
  return move.target === "selected-pokemon" || move.target === "random-opponent";
}

function makesContact(attacker, move) {
  return abilityId(attacker) !== "longreach" && isContactMove(move);
}

function applyContactAbilityEffects(attacker, defender, move) {
  if (!attacker || !defender || attacker.fainted || !makesContact(attacker, move) || isAbilitySuppressed(attacker, defender)) return;
  const id = getActualAbilityId(defender);
  if (["roughskin", "ironbarbs"].includes(id)) {
    applyDirectDamage(attacker, Math.max(1, Math.floor(attacker.maxHp / 8)), defender.ability || "contact recoil");
    return;
  }
  if (["gooey", "tanglinghair"].includes(id)) {
    const applied = applyBoostChanges(attacker, [{ stat: "speed", change: -1 }], defender);
    if (applied.length) appendBattleLog(attacker.displayName, "had its Speed lowered by contact.");
    return;
  }
  if (id === "static" && Math.random() < 0.3) {
    if (inflictMajorStatus(attacker, "paralysis")) appendBattleLog(attacker.displayName, "was paralyzed by Static.");
    return;
  }
  if (id === "flamebody" && Math.random() < 0.3) {
    if (inflictMajorStatus(attacker, "burn")) appendBattleLog(attacker.displayName, "was burned by Flame Body.");
    return;
  }
  if (id === "poisonpoint" && Math.random() < 0.3) {
    if (inflictMajorStatus(attacker, "poison")) appendBattleLog(attacker.displayName, "was poisoned by Poison Point.");
    return;
  }
  if (abilityId(attacker) === "poisontouch" && Math.random() < 0.3) {
    if (inflictMajorStatus(defender, "poison", { source: attacker })) appendBattleLog(defender.displayName, "was poisoned by Poison Touch.");
  }
  if (id === "effectspore" && !attacker.types.includes("Grass") && Math.random() < 0.3) {
    const roll = Math.random();
    if (roll < 1 / 3) {
      if (inflictMajorStatus(attacker, "sleep")) appendBattleLog(attacker.displayName, "fell asleep from Effect Spore.");
    } else if (roll < 2 / 3) {
      if (inflictMajorStatus(attacker, "paralysis")) appendBattleLog(attacker.displayName, "was paralyzed by Effect Spore.");
    } else if (inflictMajorStatus(attacker, "poison")) {
      appendBattleLog(attacker.displayName, "was poisoned by Effect Spore.");
    }
  }
  if (id === "mummy" && !UNSWAPPABLE_ABILITIES.has(abilityId(attacker))) {
    attacker.ability = "Mummy";
    appendBattleLog(attacker.displayName, "had its ability changed to Mummy.");
  }
  if (id === "lingeringaroma" && !UNSWAPPABLE_ABILITIES.has(abilityId(attacker))) {
    attacker.ability = "Lingering Aroma";
    appendBattleLog(attacker.displayName, "had its ability changed to Lingering Aroma.");
  }
  if (id === "wanderingspirit" && !UNSWAPPABLE_ABILITIES.has(abilityId(attacker)) && !UNSWAPPABLE_ABILITIES.has(id)) {
    const defenderAbilityName = defender.ability;
    defender.ability = attacker.ability;
    attacker.ability = defenderAbilityName;
    appendBattleLog(defender.displayName, "swapped abilities with Wandering Spirit.");
  }
}

function applyAftermathAbility(attacker, defender, move) {
  if (!attacker || attacker.fainted || !defender || !makesContact(attacker, move) || isAbilitySuppressed(attacker, defender)) return;
  if (getActualAbilityId(defender) === "aftermath") {
    applyDirectDamage(attacker, Math.max(1, Math.floor(attacker.maxHp / 4)), "Aftermath");
  }
}

function applyDamageTakenAbilityEffects(attacker, defender, move) {
  if (!attacker || !defender || defender.fainted || isAbilitySuppressed(attacker, defender)) return;
  const id = getActualAbilityId(defender);
  if (id === "gulpmissile" && defender.gulpMissileLoaded) {
    defender.gulpMissileLoaded = false;
    applyDirectDamage(attacker, Math.max(1, Math.floor(attacker.maxHp / 4)), "Gulp Missile");
    const applied = applyBoostChanges(attacker, [{ stat: "defense", change: -1 }], defender);
    if (applied.length) appendBattleLog(attacker.displayName, "had its Defense lowered by Gulp Missile.");
  }
  if (id === "stamina") {
    triggerBoostAbility(defender, [{ stat: "defense", change: 1 }], "raised its Defense with Stamina.");
  }
  if (id === "weakarmor" && move.damageClass === "physical") {
    const lowered = applyBoostChanges(defender, [{ stat: "defense", change: -1 }], attacker);
    const raised = applyBoostChanges(defender, [{ stat: "speed", change: 2 }]);
    if (lowered.length || raised.length) appendBattleLog(defender.displayName, "changed its stats with Weak Armor.");
  }
  if (id === "watercompaction" && move.type === "Water") {
    triggerBoostAbility(defender, [{ stat: "defense", change: 2 }], "raised its Defense with Water Compaction.");
  }
  if (id === "justified" && move.type === "Dark") {
    triggerBoostAbility(defender, [{ stat: "attack", change: 1 }], "raised its Attack with Justified.");
  }
  if (id === "rattled" && ["Bug", "Dark", "Ghost"].includes(move.type)) {
    triggerBoostAbility(defender, [{ stat: "speed", change: 1 }], "raised its Speed with Rattled.");
  }
  if (id === "berserk" && defender.hp > 0 && defender.hp <= Math.floor(defender.maxHp / 2) && !defender.berserkTriggered) {
    defender.berserkTriggered = true;
    triggerBoostAbility(defender, [{ stat: "spattack", change: 1 }], "raised its Sp. Atk with Berserk.");
  }
  if (id === "angershell" && defender.hp > 0 && defender.hp <= Math.floor(defender.maxHp / 2) && !defender.angerShellTriggered) {
    defender.angerShellTriggered = true;
    const applied = [
      ...applyBoostChanges(defender, [{ stat: "attack", change: 1 }, { stat: "spattack", change: 1 }, { stat: "speed", change: 1 }]),
      ...applyBoostChanges(defender, [{ stat: "defense", change: -1 }, { stat: "spdefense", change: -1 }], attacker),
    ];
    if (applied.length) appendBattleLog(defender.displayName, "changed its stats with Anger Shell.");
  }
  if (id === "colorchange" && move.type && defender.types[0] !== move.type) {
    defender.types = [move.type];
    appendBattleLog(defender.displayName, `changed type to ${move.type} with Color Change.`);
  }
  if (id === "electromorphosis" && !defender.chargedMoveBoost) {
    defender.chargedMoveBoost = true;
    appendBattleLog(defender.displayName, "became charged with Electromorphosis.");
  }
  if (id === "windpower" && isWindMove(move) && !defender.chargedMoveBoost) {
    defender.chargedMoveBoost = true;
    appendBattleLog(defender.displayName, "became charged with Wind Power.");
  }
  if (id === "steamengine" && (move.type === "Fire" || move.type === "Water")) {
    triggerBoostAbility(defender, [{ stat: "speed", change: 6 }], "raised its Speed with Steam Engine.");
  }
  if (id === "thermalexchange" && move.type === "Fire") {
    triggerBoostAbility(defender, [{ stat: "attack", change: 1 }], "raised its Attack with Thermal Exchange.");
  }
  if (id === "toxicdebris" && move.damageClass === "physical") {
    const sideKey = getBattleSideForMon(attacker);
    if (sideKey && placeHazard(sideKey, "toxic-spikes")) appendBattleLog(defender.displayName, "scattered Toxic Spikes with Toxic Debris.");
  }
  if (id === "cursedbody" && attacker.lastMoveUsed && Math.random() < 0.3) {
    if (abilityId(attacker) === "aromaveil") {
      appendBattleLog(attacker.displayName, "protected itself from Disable with Aroma Veil.");
      return;
    }
    attacker.disabledMove = attacker.lastMoveUsed;
    attacker.disabledTurns = 4;
    appendBattleLog(attacker.displayName, `${attacker.lastMoveUsed} was disabled by Cursed Body.`);
  }
  if (id === "perishbody" && makesContact(attacker, move)) {
    attacker.perishCount = 3;
    defender.perishCount = 3;
    appendBattleLog(defender.displayName, "started a perish count with Perish Body.");
  }
  if (id === "cottondown" && !attacker.fainted) {
    const applied = applyBoostChanges(attacker, [{ stat: "speed", change: -1 }], defender);
    if (applied.length) appendBattleLog(attacker.displayName, "had its Speed lowered by Cotton Down.");
  }
  if (id === "sandspit") setWeather("sand", defender);
  if (id === "seedsower") setTerrain("grassy", defender);
}

function applyAttackerAfterHitAbilities(attacker, defender, move, totalDamage) {
  if (!attacker || attacker.fainted || !defender || defender.fainted || totalDamage <= 0) return;
  if (abilityId(attacker) === "toxicchain" && Math.random() < 0.3) {
    if (inflictMajorStatus(defender, "tox", { source: attacker })) appendBattleLog(defender.displayName, "was badly poisoned by Toxic Chain.");
  }
}

function triggerDancerCopies(user, move) {
  if (!moveIdMatches(move, ["dance"]) || user.dancerMoveCopied === move.id) return;
  const dancer = getActiveCombatant(otherSideKey(getBattleSideForMon(user)));
  if (!dancer || dancer.fainted || abilityId(dancer) !== "dancer") return;
  dancer.dancerMoveCopied = move.id;
  if (move.boosts?.length && SELF_TARGETS.has(move.target)) {
    const applied = applyBoostChanges(dancer, move.boosts);
    if (applied.length) appendBattleLog(dancer.displayName, `copied ${move.name || move.id} with Dancer: ${describeBoostChanges(applied)}.`);
  } else {
    appendBattleLog(dancer.displayName, `danced along with ${move.name || move.id}.`);
  }
  dancer.dancerMoveCopied = "";
}

function canStealItem(source, target) {
  if (!source || !target || source.fainted || target.fainted) return false;
  if (source.item || !target.item || target.itemConsumed) return false;
  if (abilityId(target) === "stickyhold") return false;
  return true;
}

function stealItem(source, target, label) {
  if (!canStealItem(source, target)) {
    if (abilityId(target) === "stickyhold" && target.item && !target.itemConsumed) appendBattleLog(target.displayName, "held onto its item with Sticky Hold.");
    return false;
  }
  source.item = target.item;
  source.itemConsumed = false;
  target.item = "";
  target.itemConsumed = false;
  appendBattleLog(source.displayName, `${label} stole ${source.item}.`);
  return true;
}

function applyItemTheftAbilities(attacker, defender, move, totalDamage) {
  if (!attacker || !defender || !totalDamage) return;
  if (abilityId(attacker) === "magician" && !attacker.stolenItemThisTurn) {
    attacker.stolenItemThisTurn = stealItem(attacker, defender, "Magician");
  }
  if (getActualAbilityId(defender) === "pickpocket" && makesContact(attacker, move) && !defender.stolenItemThisTurn) {
    defender.stolenItemThisTurn = stealItem(defender, attacker, "Pickpocket");
  }
}

function applyReflectedStatusMove(user, reflector, move) {
  if (!user || user.fainted) return false;
  if (move.id === "toxic-spikes" || move.id === "spikes" || move.id === "stealth-rock" || move.id === "sticky-web") {
    return true;
  }
  if (move.id === "toxic") {
    if (inflictMajorStatus(user, "tox", { ...move, source: reflector })) appendBattleLog(user.displayName, "was badly poisoned.");
    return true;
  }
  if (move.boosts?.length) {
    const applied = applyBoostChanges(user, move.boosts, reflector);
    if (applied.length) appendBattleLog(user.displayName, describeBoostChanges(applied));
    return true;
  }
  if (move.ailment === "confusion") {
    if (inflictConfusion(user, { ...move, source: reflector })) appendBattleLog(user.displayName, "became confused.");
    return true;
  }
  if (["burn", "poison", "paralysis", "sleep", "freeze"].includes(move.ailment)) {
    if (inflictMajorStatus(user, move.ailment, { ...move, source: reflector })) appendBattleLog(user.displayName, describeStatusInfliction(move.ailment));
    return true;
  }
  return false;
}

function placeHazard(sideKey, moveId) {
  const hazards = state.battle.hazards[sideKey];
  if (!hazards) return false;
  if (moveId === "stealth-rock") {
    if (hazards.stealthRock) return false;
    hazards.stealthRock = true;
    return true;
  }
  if (moveId === "spikes") {
    if (hazards.spikes >= 3) return false;
    hazards.spikes += 1;
    return true;
  }
  if (moveId === "toxic-spikes") {
    if (hazards.toxicSpikes >= 2) return false;
    hazards.toxicSpikes += 1;
    return true;
  }
  if (moveId === "sticky-web") {
    if (hazards.stickyWeb) return false;
    hazards.stickyWeb = true;
    return true;
  }
  return false;
}

function applyEntryHazards(sideKey, incomingMon = null) {
  const mon = incomingMon || getActiveCombatant(sideKey);
  const hazards = state.battle.hazards[sideKey];
  if (!mon || mon.fainted || !hazards) return;
  if (canUseHeldItem(mon) && cleanText(mon.item) === "Heavy-Duty Boots") {
    appendBattleLog(mon.displayName, "ignored entry hazards with Heavy-Duty Boots.");
    return;
  }
  if (hazards.toxicSpikes && mon.types.includes("Poison")) {
    hazards.toxicSpikes = 0;
    appendBattleLog(mon.displayName, "absorbed the Toxic Spikes.");
  }
  if (hazards.stealthRock && abilityId(mon) !== "magicguard") {
    const multiplier = Math.max(0.25, getTypeMultiplier("Rock", mon.types, mon));
    applyDirectDamage(mon, Math.max(1, Math.floor((mon.maxHp * multiplier) / 8)), "Stealth Rock");
  }
  if (mon.fainted) return;
  if (hazards.spikes && isGrounded(mon) && abilityId(mon) !== "magicguard") {
    const fraction = hazards.spikes === 1 ? 8 : hazards.spikes === 2 ? 6 : 4;
    applyDirectDamage(mon, Math.max(1, Math.floor(mon.maxHp / fraction)), "Spikes");
  }
  if (mon.fainted) return;
  if (hazards.toxicSpikes && isGrounded(mon) && !mon.types.includes("Poison") && !mon.types.includes("Steel")) {
    const status = hazards.toxicSpikes >= 2 ? "tox" : "poison";
    if (inflictMajorStatus(mon, status)) appendBattleLog(mon.displayName, status === "tox" ? "was badly poisoned by Toxic Spikes." : "was poisoned by Toxic Spikes.");
  }
  if (hazards.stickyWeb && isGrounded(mon)) {
    const applied = applyBoostChanges(mon, [{ stat: "speed", change: -1 }]);
    if (applied.length) appendBattleLog(mon.displayName, "was slowed by Sticky Web.");
  }
}

function applySwitchOutAbilities(mon) {
  const id = getActualAbilityId(mon);
  runCustomAbilityEvent(mon, "switch-out", { opponent: getActiveCombatant(otherSideKey(getBattleSideForMon(mon))) });
  if (id === "naturalcure" && (mon.status || mon.confusionTurns > 0)) {
    mon.status = "";
    mon.statusTurns = 0;
    mon.toxicCounter = 0;
    mon.confusionTurns = 0;
    appendBattleLog(mon.displayName, "was cured by Natural Cure.");
  }
  if (id === "regenerator" && !mon.fainted) {
    const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 3)));
    if (healed > 0) appendBattleLog(mon.displayName, `restored ${healed} HP with Regenerator.`);
  }
  if (id === "neutralizinggas") {
    appendBattleLog(mon.displayName, "stopped releasing Neutralizing Gas.");
  }
  mon.ability = mon.originalAbility;
}

function applySwitchInAbilities(sideKey, mode, incomingMon = null) {
  const mon = incomingMon || getActiveCombatant(sideKey);
  const activeIndex = getActiveIndexes(sideKey).find((index) => getCombatantByIndex(sideKey, index) === mon);
  const foe = getOpposingTarget(sideKey, activeIndex);
  if (!mon || mon.fainted) return;
  const id = getActualAbilityId(mon);
  runCustomAbilityEvent(mon, "switch-in", { opponent: foe });
  runCustomAbilityEvent(mon, "weather-terrain", { opponent: foe });
  if (id === "intimidate" && foe && !foe.fainted && hasActiveAbility(mon, "intimidate")) {
    if (["innerfocus", "owntempo", "scrappy", "guarddog", "oblivious"].includes(abilityId(foe))) {
      appendBattleLog(foe.displayName, `blocked Intimidate with ${foe.ability}.`);
      if (abilityId(foe) === "guarddog") triggerBoostAbility(foe, [{ stat: "attack", change: 1 }], "raised its Attack with Guard Dog.");
    } else {
      const applied = applyBoostChanges(foe, [{ stat: "attack", change: -1 }], mon);
      if (applied.length) appendBattleLog(mon.displayName, `lowered ${foe.displayName}'s Attack with Intimidate.`);
    }
  }
  if (id === "intrepidsword") triggerBoostAbility(mon, [{ stat: "attack", change: 1 }], "raised its Attack with Intrepid Sword.");
  if (id === "dauntlessshield") triggerBoostAbility(mon, [{ stat: "defense", change: 1 }], "raised its Defense with Dauntless Shield.");
  if (id === "hospitality") {
    const healed = healCombatant(mon, Math.max(1, Math.floor(mon.maxHp / 4)));
    if (healed > 0) appendBattleLog(mon.displayName, "restored HP with Hospitality.");
  }
  if (id === "costar" && foe && !foe.fainted) {
    mon.boosts = { ...foe.boosts };
    appendBattleLog(mon.displayName, `copied ${foe.displayName}'s stat changes with Costar.`);
  }
  if (id === "curiousmedicine") {
    const cleared = BATTLE_STAGE_KEYS.some((stat) => mon.boosts[stat] < 0);
    BATTLE_STAGE_KEYS.forEach((stat) => {
      if (mon.boosts[stat] < 0) mon.boosts[stat] = 0;
    });
    if (cleared) appendBattleLog(mon.displayName, "cleared its stat drops with Curious Medicine.");
  }
  if (id === "pastelveil" && (mon.status === "poison" || mon.status === "tox")) {
    mon.status = "";
    mon.toxicCounter = 0;
    appendBattleLog(mon.displayName, "was cured of poison by Pastel Veil.");
  }
  if (id === "sweetveil" && mon.status === "sleep") {
    mon.status = "";
    mon.statusTurns = 0;
    appendBattleLog(mon.displayName, "woke up with Sweet Veil.");
  }
  if (id === "download" && foe && !foe.fainted) {
    const stat = getModifiedBattleStat(foe, "defense") <= getModifiedBattleStat(foe, "spdefense") ? "attack" : "spattack";
    triggerBoostAbility(mon, [{ stat, change: 1 }], `raised its ${STAT_LABELS[stat]} with Download.`);
  }
  if (id === "forewarn" && foe && !foe.fainted) {
    const strongest = foe.moves
      .map((moveSlot) => getBattleMove(moveSlot.name))
      .filter(Boolean)
      .sort((left, right) => (right.power || 0) - (left.power || 0))[0];
    if (strongest) appendBattleLog(mon.displayName, `forewarned ${strongest.name || strongest.id}.`);
  }
  if (id === "anticipation" && foe && !foe.fainted) {
    const dangerous = foe.moves
      .map((moveSlot) => getBattleMove(moveSlot.name))
      .filter(Boolean)
      .some((move) => move.category === "ohko" || getMoveTypeMultiplier(foe, move, mon) > 1);
    if (dangerous) appendBattleLog(mon.displayName, "shuddered with Anticipation.");
  }
  if (id === "supersweetsyrup" && foe && !foe.fainted) {
    const applied = applyBoostChanges(foe, [{ stat: "evasion", change: -1 }], mon);
    if (applied.length) appendBattleLog(mon.displayName, `lowered ${foe.displayName}'s evasiveness with Supersweet Syrup.`);
  }
  if (id === "drizzle") setWeather("rain", mon);
  if (id === "drought") setWeather("sun", mon);
  if (id === "desolateland") setWeather("sun", mon);
  if (id === "primordialsea") setWeather("rain", mon);
  if (id === "orichalcumpulse") setWeather("sun", mon);
  if (id === "sandstream") setWeather("sand", mon);
  if (id === "snowwarning") setWeather("snow", mon);
  if (id === "electricsurge") setTerrain("electric", mon);
  if (id === "hadronengine") setTerrain("electric", mon);
  if (id === "grassysurge") setTerrain("grassy", mon);
  if (id === "mistysurge") setTerrain("misty", mon);
  if (id === "psychicsurge") setTerrain("psychic", mon);
  clearFieldWithTeraformZero(mon);
  if (id === "embodyaspect") {
    const bestStat = getHighestStatKey(mon);
    triggerBoostAbility(mon, [{ stat: bestStat, change: 1 }], `raised its ${STAT_LABELS[bestStat]} with Embody Aspect.`);
  }
  if (id === "trace" && foe && foe.ability) {
    mon.ability = stripTypeChangingAbility(foe.ability) || foe.ability;
    appendBattleLog(mon.displayName, `copied ${foe.displayName}'s ability with Trace.`);
  }
  if (id === "imposter" && foe && !foe.fainted) {
    transformCombatant(mon, foe, "Imposter");
  }
  if (id === "frisk" && foe?.item) {
    appendBattleLog(mon.displayName, `revealed ${foe.displayName}'s ${foe.item} with Frisk.`);
  }
  if (id === "neutralizinggas") {
    appendBattleLog(mon.displayName, "filled the field with Neutralizing Gas.");
  }
  if (mode === "lead" && id) appendBattleLog(mon.displayName, `entered battle with ${mon.ability || "its ability"}.`);
}

function inflictMajorStatus(mon, status, move = {}) {
  if (mon.fainted || mon.status) return false;
  if (!canReceiveStatus(mon, status, move.source)) return false;
  if (status === "burn" && mon.types.includes("Fire")) return false;
  if ((status === "poison" || status === "tox") && abilityId(move.source) !== "corrosion" && (mon.types.includes("Poison") || mon.types.includes("Steel"))) return false;
  if (status === "freeze" && mon.types.includes("Ice")) return false;
  if (status === "paralysis" && mon.types.includes("Electric")) return false;
  mon.status = status;
  mon.toxicCounter = 0;
  mon.statusTurns = status === "sleep" ? (move.sleepTurns || randomBetween(1, 3)) : 0;
  if (maybeUseStatusCureItem(mon, status)) return false;
  if ((status === "poison" || status === "tox") && move.source && abilityId(move.source) === "poisonpuppeteer") {
    if (inflictConfusion(mon, { source: move.source })) appendBattleLog(mon.displayName, "became confused by Poison Puppeteer.");
  }
  if (move.source && abilityId(mon) === "synchronize" && ["burn", "poison", "tox", "paralysis"].includes(status)) {
    if (inflictMajorStatus(move.source, status, { source: mon })) appendBattleLog(move.source.displayName, `was affected by Synchronize.`);
  }
  return true;
}

function inflictConfusion(mon, move) {
  if (mon.fainted || mon.confusionTurns > 0) return false;
  if (!canReceiveConfusion(mon, move.source)) return false;
  mon.confusionTurns = move.maxTurns ? randomBetween(move.minTurns || 2, move.maxTurns) : randomBetween(2, 4);
  if (maybeUseStatusCureItem(mon, "confusion")) return false;
  return true;
}

function maybeUseStatusCureItem(mon, incomingStatus) {
  const item = cleanText(mon.item);
  if (!item || !canUseHeldItem(mon)) return false;
  if (opposingActiveHasAbility(mon, "unnerve") && /Berry/i.test(item)) return false;
  if (item === "Lum Berry" && (incomingStatus || mon.status || mon.confusionTurns > 0)) {
    consumeItem(mon);
    mon.status = "";
    mon.statusTurns = 0;
    mon.toxicCounter = 0;
    mon.confusionTurns = 0;
    appendBattleLog(mon.displayName, "used Lum Berry to recover.");
    return true;
  }
  if (item === "Chesto Berry" && incomingStatus === "sleep") {
    consumeItem(mon);
    mon.status = "";
    mon.statusTurns = 0;
    appendBattleLog(mon.displayName, "woke up with Chesto Berry.");
    return true;
  }
  return false;
}

function applyThresholdItem(mon) {
  const item = cleanText(mon.item);
  const threshold = abilityId(mon) === "gluttony" ? Math.floor(mon.maxHp / 2) : (["Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry"].includes(item) ? Math.floor(mon.maxHp / 4) : Math.floor(mon.maxHp / 2));
  if (!item || !canUseHeldItem(mon) || mon.fainted || mon.hp <= 0 || mon.hp > threshold) return;
  if (opposingActiveHasAbility(mon, "unnerve") && /Berry/i.test(item)) return;
  if (item === "Sitrus Berry" || item === "Oran Berry" || ["Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry"].includes(item)) {
    useBerryItem(mon, item);
    return;
  }
}

function calculateConfusionDamage(mon) {
  const levelFactor = Math.floor((2 * mon.level) / 5) + 2;
  const baseDamage = Math.floor(Math.floor((levelFactor * 40 * Math.max(1, mon.stats.attack)) / Math.max(1, mon.stats.defense)) / 50) + 2;
  return Math.max(1, baseDamage);
}

function applyBoostChanges(mon, boosts, source = null, options = {}) {
  const actual = [];
  let loweredByOpponent = false;
  boosts.forEach((boost) => {
    if (!boost || !BATTLE_STAGE_KEYS.includes(boost.stat) || !boost.change) return;
    let change = boost.change;
    const blockedByOpponent = change < 0 && source && !options.reflected && !isAbilitySuppressed(source, mon);
    const monAbility = abilityId(mon);
    if (blockedByOpponent && STAT_DROP_BLOCK_ABILITIES.has(monAbility)) {
      appendBattleLog(mon.displayName, `${mon.ability || "Its ability"} blocked the stat drop.`);
      return;
    }
    if (blockedByOpponent && monAbility === "bigpecks" && boost.stat === "defense") {
      appendBattleLog(mon.displayName, "blocked the Defense drop with Big Pecks.");
      return;
    }
    if (blockedByOpponent && monAbility === "flowerveil" && mon.types.includes("Grass")) {
      appendBattleLog(mon.displayName, "blocked the stat drop with Flower Veil.");
      return;
    }
    if (blockedByOpponent && monAbility === "mirrorarmor") {
      appendBattleLog(mon.displayName, "reflected the stat drop with Mirror Armor.");
      applyBoostChanges(source, [{ stat: boost.stat, change }], mon, { reflected: true });
      return;
    }
    if (monAbility === "contrary") change *= -1;
    if (monAbility === "simple") change *= 2;
    const next = clamp(mon.boosts[boost.stat] + change, -6, 6);
    const delta = next - mon.boosts[boost.stat];
    if (!delta) return;
    mon.boosts[boost.stat] = next;
    if (source && delta < 0) loweredByOpponent = true;
    actual.push({ stat: boost.stat, change: delta });
  });
  if (source && loweredByOpponent && !options.reflected) {
    const id = abilityId(mon);
    if (id === "defiant") {
      const triggered = applyBoostChanges(mon, [{ stat: "attack", change: 2 }], null, { reflected: true });
      if (triggered.length) appendBattleLog(mon.displayName, "raised its Attack with Defiant.");
    }
    if (id === "competitive") {
      const triggered = applyBoostChanges(mon, [{ stat: "spattack", change: 2 }], null, { reflected: true });
      if (triggered.length) appendBattleLog(mon.displayName, "raised its Sp. Atk with Competitive.");
    }
  }
  triggerOpportunist(mon, actual, options);
  return actual;
}

function triggerOpportunist(boostedMon, appliedBoosts, options = {}) {
  if (options.opportunist || !appliedBoosts.some((boost) => boost.change > 0)) return;
  const sideKey = getBattleSideForMon(boostedMon);
  if (!sideKey) return;
  const opportunist = getActiveCombatant(otherSideKey(sideKey));
  if (!opportunist || opportunist.fainted || abilityId(opportunist) !== "opportunist") return;
  const copied = appliedBoosts
    .filter((boost) => boost.change > 0)
    .map((boost) => ({ stat: boost.stat, change: boost.change }));
  const applied = applyBoostChanges(opportunist, copied, null, { opportunist: true });
  if (applied.length) appendBattleLog(opportunist.displayName, "copied the stat boosts with Opportunist.");
}

function getBoostEffectChance(move, user = null) {
  if (!move.boosts?.length) return 0;
  const chance = move.statChance || 100;
  return abilityId(user) === "serenegrace" ? Math.min(100, chance * 2) : chance;
}

function getAilmentEffectChance(move, user = null) {
  if (!move.ailment || move.ailment === "none" || move.ailment === "unknown") return 0;
  const chance = move.ailmentChance || (move.damageClass === "status" ? 100 : 0);
  return abilityId(user) === "serenegrace" ? Math.min(100, chance * 2) : chance;
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
  return getActiveCombatants(sideKey)[0] || null;
}

function getCombatantByIndex(sideKey, index) {
  const team = state.battle.teams[sideKey];
  return team?.combatants?.[index] || null;
}

function isDoubleBattle() {
  return state.battle.mode === "doubles";
}

function getActiveIndexes(sideKey) {
  const team = state.battle.teams[sideKey];
  if (!team) return [];
  const raw = Array.isArray(team.active) ? team.active : [team.active];
  return raw.filter((index) => Number.isInteger(index) && team.combatants[index] && !team.combatants[index].fainted);
}

function getActiveCombatants(sideKey) {
  return getActiveIndexes(sideKey).map((index) => getCombatantByIndex(sideKey, index)).filter(Boolean);
}

function getPrimaryActiveIndex(sideKey) {
  return getActiveIndexes(sideKey)[0] ?? 0;
}

function setActiveIndex(sideKey, fromIndex, toIndex) {
  const team = state.battle.teams[sideKey];
  if (!team) return;
  if (!Array.isArray(team.active)) {
    team.active = toIndex;
    return;
  }
  const slot = team.active.indexOf(fromIndex);
  if (slot >= 0) team.active[slot] = toIndex;
  else team.active[0] = toIndex;
}

function getOpposingTarget(sideKey, userIndex = getPrimaryActiveIndex(sideKey)) {
  const foeSide = otherSideKey(sideKey);
  const foeIndexes = getActiveIndexes(foeSide);
  if (!foeIndexes.length) return null;
  if (!isDoubleBattle()) return getCombatantByIndex(foeSide, foeIndexes[0]);
  const allyIndexes = getActiveIndexes(sideKey);
  const slot = Math.max(0, allyIndexes.indexOf(userIndex));
  return getCombatantByIndex(foeSide, foeIndexes[Math.min(slot, foeIndexes.length - 1)]) || getCombatantByIndex(foeSide, foeIndexes[0]);
}

function areAllBattleActionsQueued() {
  if (!state.battle.started || state.battle.winner) return false;
  return ["alpha", "beta"].every((sideKey) => getActiveIndexes(sideKey).every((activeIndex) => Boolean(state.battle.pendingActions[sideKey]?.[activeIndex])));
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
