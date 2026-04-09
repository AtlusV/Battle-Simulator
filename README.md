# Dinodex Battle Studio

This is a no-build browser app for Dinodex Studio saves. It reads your custom dex JSON, lets you build two Showdown-style teams with held items, and runs a local turn-based battle between them.

## What it does

- Loads a Dinodex save JSON with custom species, forms, sprites, descriptions, and your save-backed team
- Shows the full associated creature art in the builder, dex view, and battle cards
- Builds `Team A` and `Team B` with up to six slots each
- Preserves and exports held items in Showdown-style text
- Imports Showdown-style text back into the currently selected team
- Downloads an updated save JSON with `Team A` merged back in
- Starts a local battle where both teams can choose moves or switch each turn
- Applies HP, damage, status, recoil, recovery, stat-stage changes, and a set of common held-item effects

## Current rules

- Abilities are intentionally skipped for now
- Custom moves can be given battle-ready effects in the Move Lab
- The move picker includes official moves plus your configured custom moves
- The battle simulator supports common battle effects, but not every niche cartridge or Showdown edge case yet

## Battle features

- Two active teams with manual move selection every turn
- Turn order from switching, move priority, and speed
- Physical, special, and status move handling
- Type effectiveness and STAB
- Burn, poison, toxic poison, paralysis, sleep, freeze, and confusion
- Stat boosts and drops from move metadata
- Recoil, drain, recovery, fixed-damage moves, and forced switching where supported
- Common held items such as Leftovers, Black Sludge, berries, Life Orb, Focus Sash, Rocky Helmet, Shell Bell, Choice items, Expert Belt, Air Balloon, and Weakness Policy

## How to use

1. Open [index.html](C:\Users\atlus\OneDrive\Documents\Battle Sim\index.html) in a browser.
2. Click `Load Dinodex Save` and choose your Dinodex JSON file.
3. Edit `Team A` or `Team B`, including moves and held items.
4. Use `Copy Team A To Team B` if you want a fast mirror for testing.
5. Click `Start Battle`, choose one action for each side, then click `Resolve Turn`.
6. Use the Showdown text box to import or export the active team.
7. Click `Download Updated Save` to save a JSON with the current `Team A`.

## Notes

- `Team A` round-trips to your save file.
- `Team B` is battle-only and stays inside the page.
- The original save schema mainly stores species and moves, so the downloaded save also includes extra fields like form, held item, level, and tera type when available.
