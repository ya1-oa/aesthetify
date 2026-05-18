# Hydrogen Scaffold Steps
> Run these commands in YOUR terminal (not Claude Code). These are interactive.

---

## Step 1 — Open a fresh terminal

Open Windows Terminal or PowerShell as normal (not through Claude Code).
Make sure Node works first:

```powershell
node --version   # should print v20.x.x or higher
npm --version    # should print 10.x.x or higher
```

If node isn't found, restart your terminal — winget updates PATH only for new sessions.

---

## Step 2 — Navigate to the project parent folder

```powershell
cd "C:\Users\okaak\OneDrive\docs onedrive\Desktop\Software Design"
```

---

## Step 3 — Run the Hydrogen scaffold

```powershell
npm create @shopify/hydrogen@latest
```

When it prompts you, answer like this:

| Prompt | Your Answer |
|---|---|
| Where do you want to create your project? | `aesthetify` |
| Link to Shopify account? | `Skip for now` (we'll add creds via .env later) |
| Template | `Demo store` (gives us real pre-built routes) |
| Language | `TypeScript` |
| Install dependencies? | `Yes` |
| TailwindCSS? | `Yes` |

> ⚠️ If it warns that the `aesthetify` folder already exists and asks to merge/overwrite — choose **yes/continue**. It won't touch our `docs/` or `study/` folders.

---

## Step 4 — Start the dev server (sanity check)

```powershell
cd aesthetify
npm run dev
```

You should see something like:
```
  ➜  Local:   http://localhost:3000/
```

Open it in your browser. You'll see the Hydrogen demo store (ugly default styles — that's expected). This confirms the scaffold worked.

Hit `Ctrl+C` to stop it.

---

## Step 5 — Come back to Claude Code

Tell Claude: "Scaffold is done, dev server ran." Then Claude will:
- Overwrite `tailwind.config.ts` with the Aesthetify brand tokens (already written)
- Update `app/styles/app.css` to add Google Fonts
- Make Commit 2 and Commit 3

---

## What the CLI generated (so you know what you got)

```
aesthetify/
├── app/
│   ├── components/          ← pre-built Shopify components (Cart, ProductCard, etc.)
│   ├── routes/              ← pre-built pages (/, /products/:handle, /collections/:handle, /cart)
│   ├── styles/app.css       ← Tailwind base import
│   ├── root.tsx             ← Root layout (html, head, body)
│   ├── entry.client.tsx     ← Browser entry point
│   └── entry.server.tsx     ← Server entry point (SSR)
├── server.ts                ← Remix HTTP server + Shopify context
├── package.json
├── tailwind.config.ts       ← We'll replace this with our brand version
├── vite.config.ts           ← Vite bundler config
└── tsconfig.json
```

---

*After scaffold is confirmed working, return here and Claude takes over for Commit 3.*
