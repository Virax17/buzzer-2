# Buzzer Intelligence HUD kit

The shared look of the Buzzer Intelligence console ("Ai Intelligence - Layout" design): tokens,
components and the page frame. Build every page from these parts; never add one-off colours,
fonts or components. If something is missing, ask.

## Setup

```
nvm use          # Node 24 (.nvmrc)
npm ci
npm start        # http://localhost:4200 shows the example page
```

## Parts (`src/app/hud/`)

| Part               | Use                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `app-hud-shell`    | Page frame: header, sidebar, voice card, footer. Inputs `title`, `subtitle`, `active`, `prompts`; slots `shell-status`, `shell-action`. |
| `app-hud-panel`    | Card with the corner brackets. `title`, `hint`, slot `panel-action`.                                                                    |
| `app-hud-stat`     | KPI tile. `label`, `value`, `hint`, `tone`.                                                                                             |
| `app-hud-item`     | List row. Slots `item-icon`, `item-end`.                                                                                                |
| `app-hud-icon`     | Icon box for a 24×24 stroke SVG. `tone`.                                                                                                |
| `app-hud-tag`      | Status tag. `tone`.                                                                                                                     |
| `app-hud-dot`      | Status dot with its label. `tone`.                                                                                                      |
| `app-hud-progress` | Progress bar. `value` (0-100), `label`, `valueText`, `tone`.                                                                            |
| `app-hud-switch`   | On/off switch. `[(checked)]`, `label`.                                                                                                  |
| `app-hud-skeleton` | Loading placeholder. `width`, `height`.                                                                                                 |
| `app-hud-empty`    | Empty state. `title`, `text`.                                                                                                           |

Tones: `ok`, `warn`, `error`, `off`, `info`, `purple`.

Global classes (`src/styles.scss`): `hud-grid` with `hud-span-3` to `hud-span-12` (12 columns),
`hud-table`, `hud-btn` / `hud-btn--primary`, `hud-sm`, `hud-dim`, `hud-num`.
Tokens: `src/styles/_tokens.scss` (`--hud-*`).

`src/app/example/` uses every part on one made-up page: copy the patterns, not the content.

## Rules

- Match your page's design segment by segment: sizes, spacing, weight, icons, every text.
- Sample data in `<page>.data.ts` behind one `<page>.service.ts` returning an Observable (see
  `src/app/example/`); totals and percentages calculated, never typed in.
- Loading skeleton and empty state for every list and card; say every status in words too.
- No new npm packages, no chart libraries.
- `npm run lint`, `npm run test:ci`, `npm run build` green before handing over.
