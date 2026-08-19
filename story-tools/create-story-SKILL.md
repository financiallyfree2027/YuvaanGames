---
name: create-story
description: Create a complete, playable reading story for Yuvaan's story app from a one-line request like "a story about how rain happens" or "teach a 5-year-old how the heart works". Builds the story JSON, composes every page scene from the reusable SVG asset library, registers it, and verifies it. Use whenever the user asks for a new story, a new mission, or a story about any topic.
---

> **Portable copy.** This skill is also registered on the account, so `/create-story`
> works in Claude Code and Cowork. Keep this file in the repo so the instructions
> travel with the project. To install it manually elsewhere, copy this file to
> `.claude/skills/create-story/SKILL.md`.

# Create a story

Turn a one-line topic into a finished, playable story in Yuvaan's reading app.
The user should never have to write image prompts, pick assets, position
anything, or paste JSON.

Project root: `YuvaanGames-site/`. Read `CLAUDE.md` there first — it holds the
schema, the art style and the writing rules. This skill is the procedure.

## Step 1 — Decide the teaching
Pick **2–4 facts** a five-year-old should come away with. Write them plainly.
They go in the story's `facts` array and must each be *discovered* during the
adventure, never explained like a textbook.

## Step 2 — Invent the mission
Star **Milo** (the boy) and **Robo** (his small teal robot) unless the user
asks otherwise. Give them a rescue, a mystery, a problem or a journey.
Clear beginning → problem → ending.

## Step 3 — Write the pages
- **One short sentence per page.** 4–10 words. Very easy English.
- 15–20 pages by default. Up to ~28 for a bigger adventure.
- Dialogue and sound words (BOOM, WHOOSH, ZAP, CLINK) make it fun to read aloud.
- The child must be able to repeat every line out loud.

## Step 4 — Check the asset catalogue FIRST
Read `stories/story-assets/assets.json`. It maps every available asset name to
its file and tags. **Never invent a filename.** Reuse is the default — the same
whale, ocean and Milo poses should appear across many stories.

If something is missing, ask whether an existing asset communicates the idea
well enough (it usually does). Only if it genuinely does not, append to
`stories/story-assets/missing-assets.json`:
```json
{"id":"whale_breathing","category":"animals",
 "description":"Friendly blue whale at the surface breathing through its blowhole",
 "tags":["whale","ocean","breathing"]}
```
and use the nearest existing asset for now. Never reference a file that does
not exist — the page will render empty.

## Step 5 — Compose each page as a stage
```json
{"text":"Milo jumped.",
 "scene":{"bg":"bg_moon_surface","elements":[
   {"asset":"milo_jumping","x":42,"y":52,"w":30,"z":6,"anim":"float"},
   {"asset":"dust_puff","x":42,"y":80,"w":22,"z":3}]}}
```
- `x`/`y` are percentages of the picture panel, measured to the element centre.
- `w` is percentage of panel width. `z` is the layer.
- Ground is about `y:70`. Standing character `w:26–30`. Robo `w:19–22`.
- Speaker on the left, the thing being pointed at on the right.
- Animations: `float bob sway walk rise fall drift spin pop blink shake zoom`.
  Keep motion gentle. Two or three moving things per page at most.

## Step 6 — Write the files
Create `stories/data/<id>.json` following the schema in `CLAUDE.md`. Always set:
- `created` — **today's date**, so it sorts to the top of the menu
- `seq` — position if it belongs to a numbered series
- `lesson_word`, `lesson`, `tint`, `glow`, `facts`, `pages`, `questions`

Then add `"<id>.json"` to the `stories` array in `stories/data/index.json`.

Write **5 questions**, each 3 options, `a` = index of the correct one.

## Step 7 — Verify before saying it's done
1. Every `bg` and every `asset` in the story exists as a key in `assets.json`.
   Script this — do not eyeball it.
2. The story JSON parses.
3. Serve and load it in a browser:
   ```
   cd YuvaanGames-site && python3 -m http.server 8000
   ```
   Open `http://localhost:8000/stories/index.html`, confirm the new story is at
   the top of the menu, open it, page through a few screens, and check the
   console for errors and the network tab for 404s.
4. Confirm the original three stories still show their painted PNG art.

## Step 8 — Report briefly
Tell the user: the story title and page count, where the file is, which assets
were reused, and anything added to `missing-assets.json`. Nothing else.

## Never
- Never build a new HTML page for a story.
- Never modify `stories/index.html`'s reading flow, recording, highlighting or quiz.
- Never convert the three original stories to scenes — they have real recorded
  voice and painted illustrations.
- Never put more than one sentence on a page.
