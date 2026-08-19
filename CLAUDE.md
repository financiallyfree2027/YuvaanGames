# Yuvaan's Games — project notes for Claude

Games and reading apps built for Yuvaan, age 5. This file is the permanent
brief: read it before changing anything here.

## The child
Five years old. Learning to read English. He cannot read long sentences,
and he cannot read instructions at all. Design for **pictures, icons,
numbers and sound** — never a paragraph of text he has to decode.

## Layout of the site
```
index.html              main menu (7 cards)
spidey-games.html       hub for the 5 Spidey games
spidey-games/           game1..game5 (self-contained HTML)
stories/                the reading app  ← the story system lives here
temple-run.html, finish-the-story.html, story_audio/
```

---

# THE STORY SYSTEM

Stories are **data, not pages**. Never hand-build HTML for a story.

```
stories/index.html              the reader engine (do not rebuild)
stories/stories.js              the 3 ORIGINAL stories (painted PNGs + recorded voice)
stories/voice.js                recorded-voice sprite map, word-aligned
stories/timings.js              PICS map for the original PNGs
stories/data/index.json         registry: which story files to load
stories/data/<id>.json          one file per story  ← new stories go here
stories/story-assets/           the reusable SVG art library
stories/story-assets/assets.json         catalogue: name → file + tags
stories/story-assets/missing-assets.json assets a story wanted but we lack
```

## Two kinds of page, one reader
- **Legacy page** — `{"art":"sick_boy","text":"..."}` → shows one painted PNG
  from `assets/img/`. The three original stories use this. **Do not convert them**;
  they have hand-recorded voice and real illustrations.
- **Scene page** — `{"text":"...","scene":{...}}` → composed live from SVG assets.
  All new stories use this.

## Story file schema
```json
{
  "id": "moon-rescue",
  "title": "Moon Rescue",
  "created": "2026-08-18",
  "seq": 1,
  "lesson_word": "THE MOON",
  "lesson": "One line shown under the title on the menu.",
  "tint": "#3D8DDB",
  "glow": "#7fb6ff",
  "facts": ["The Moon goes around Earth."],
  "pages": [
    { "text": "Milo jumped.",
      "scene": {
        "bg": "bg_moon_surface",
        "elements": [
          {"asset":"milo_jumping","x":42,"y":52,"w":30,"z":6,"anim":"float"},
          {"asset":"dust_puff","x":42,"y":80,"w":22,"z":3}
        ] } }
  ],
  "questions": [ {"q":"Where did they go?","o":["The Moon","A shop","A cave"],"a":0} ]
}
```

**Ordering:** the menu sorts by `created` descending, then `seq` ascending.
So a new story with today's date lands on top. Stories with no `created`
(the original three) sit at the bottom. Always set `created`.

**Element fields:** `asset` (required), `x` `y` (% of the stage, centre of the
element), `w` (% of stage width), `z` (layer, higher = in front), `anim`,
`flip`, `delay`.

**Animations available:** `float bob sway walk rise fall drift spin pop blink
shake zoom`. Keep it gentle — this is for a five-year-old.

**Positioning guide:** ground level is about `y:70`. A standing character is
`w:26–30`. Robo is shorter, `w:19–22`. Backgrounds keep their middle open so
characters sit cleanly. Put the speaker on the left, what they point at on the right.

## Asset rules
1. **Look in `assets.json` first.** Never invent a filename.
2. **Reuse aggressively.** The same whale, the same ocean, the same Milo pose
   should appear in many stories. That is the point of the system.
3. If nothing fits, first ask whether an existing asset communicates the idea
   well enough. Usually it does.
4. Only if it genuinely does not, append an entry to `missing-assets.json`:
   `{"id":"whale_breathing","category":"animals","description":"...","tags":[...]}`
   and use the closest existing asset in the meantime. **Never reference a file
   that does not exist** — the renderer will skip it and the page will look empty.

## Recurring characters — keep them
**Milo**, the boy: brown bowl cut, orange-red shirt, blue shorts.
**Robo**, his small teal robot friend with a screen face and one antenna.
They are in every mission. New stories should star them unless asked otherwise.

## Art style for new assets
Flat vector cartoon, thick rounded shapes, no outlines under 2px, no `<text>`,
viewBox `0 0 200 200` (backgrounds `0 0 800 500`), transparent, palette only:
`#E85D4A #F4A340 #FFC93C #2FAE7C #3D8DDB #12A99A #7B47C9 #FF8AC5 #8B5E3C
#F2C9A0 #FDFAF4 #241D15 #B8C6D1`. Prefix every gradient/clip `id` with the
filename stem — many SVGs get inlined on one page and duplicate ids break.

---

# WRITING RULES (apply automatically to every new story)

## Language
- Very easy English. Short sentences, usually **4–10 words**.
- Common everyday words. The child must be able to repeat the line aloud.
- Dialogue is encouraged. Sound words are great: BOOM, WHOOSH, CLINK, ZAP.
- **One sentence per page.** Never a paragraph on a reading screen.

## Story shape
- Give a mission, mystery, problem or rescue — not a lecture.
- Clear beginning, problem, ending. Make him want the next page.
- Humour and surprise are good.

## Education
- Teach **2–4 facts**, listed in `facts`.
- The character must **discover** the fact inside the adventure.
  - Bad: "Whales are mammals and breathe air."
  - Good: The whale swims up. / "Why is it going up?" / "It needs air!" / WHOOSH!

## Length
**15–20 pages** by default (up to ~28 is fine for a bigger adventure).
Then 5 questions in `questions`, each with 3 options and `a` = index of the right one.

---

# HOW TO ADD A NEW STORY

1. Decide the 2–4 facts.
2. Invent a mission for Milo and Robo.
3. Write it, one short sentence per page.
4. Read `story-assets/assets.json` and pick assets for every page.
5. Compose each scene: background + a few elements with x/y/w/z.
6. Add anything genuinely missing to `missing-assets.json`.
7. Write `stories/data/<id>.json` with today's date in `created`.
8. Add the filename to `stories/data/index.json`.
9. **Verify**: every `asset` and `bg` exists in `assets.json`; then serve the
   folder and load the page in a browser and confirm no 404s and no JS errors.

Serve locally with `python3 -m http.server 8000` from `YuvaanGames-site/` and
open `http://localhost:8000/stories/index.html`. The microphone in "My turn"
needs `localhost` or https — it will not work from a `file://` path.

## Do not break these
Word-by-word highlighting, tap-a-word-to-hear-it, "Read it", "My turn",
the microphone recording with ▶️/⏹ playback, the progress dots, the quiz,
the star counter, and the three original stories' painted art and recorded voice.
