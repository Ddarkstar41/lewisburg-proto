# Lewisburg — editing workflow prototype

A small, working Astro site with a browser-based CMS attached. Its only job is to answer one
question: **can two non-technical board members post an event without help?**

It is disposable. Don't polish it, don't migrate real content into it. Once the test is done,
we either build the real site on this foundation or delete it and go WordPress.

---

## What's in here

```
src/content/posts/     3 sample news posts (Markdown)
src/content/events/    4 sample events (Markdown)
src/content/issues/    the Lake Lots issue (Markdown)
src/pages/             home, about, events-and-news, issues, get-involved, contact
public/uploads/        lake-sunset.jpg — the hero photo, 2400px
public/admin/          the CMS — index.html + config.yml
```

Ten pages. Three CMS collections: **News Posts**, **Events**, and **Issues & Advocacy**.

Events and news share one public page (`/events-and-news/`) with three sections — Coming up, News,
Past events — but stay **separate collections** in the CMS, because an event needs a time and a
location and a news post doesn't. One page for readers, two clean forms for editors.

The issue collection is the interesting one — it turns an advocacy campaign into a form. Status,
permit number, a dated timeline, a document list, and a "what to do now" box with a deadline. A
board member can stand up a new issue page without touching layout.

Placeholders are marked on-page with dashed amber boxes: dues amount, meeting schedule, board
roster, parish phone numbers, and the Lake Lots timeline dates. Those are deliberately blank
rather than guessed — a wrong phone number on a contact page is worse than no page.

The site is static. Editors change Markdown files through the CMS; the CMS commits to GitHub;
Netlify rebuilds and redeploys. That round trip takes about 30–60 seconds.

---

## Deploy it (about 20 minutes, once)

### 1. Put it on GitHub

Create a new repository called `lewisburg-proto` (private is fine), then from this folder:

```bash
git init
git add -A
git commit -m "Editing workflow prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/lewisburg-proto.git
git push -u origin main
```

If you'd rather not use the command line, GitHub Desktop does the same thing with buttons.

### 2. Point the CMS at your repo

Open `public/admin/config.yml` and change one line:

```yaml
repo: YOUR-GITHUB-USERNAME/lewisburg-proto
```

Commit and push that change.

### 3. Connect Netlify

Sign in to Netlify with GitHub → **Add new site** → **Import an existing project** → pick the repo.

Build settings are already in `netlify.toml`, so accept the defaults and deploy. You'll get a URL
like `https://something-random-123.netlify.app`. Rename it to something memorable under
**Project configuration → General → Project details → Change project name**.

Then update `site_url` in `public/admin/config.yml` to match, and push again.

### 4. Turn on the login

This is the only fiddly step, and it's why we're hosting on Netlify — it saves deploying a
separate auth service.

**a. Register an OAuth app on GitHub.** Go to **Settings → Developer settings → OAuth Apps →
New OAuth App**:

| Field | Value |
| --- | --- |
| Application name | `Lewisburg CMS` |
| Homepage URL | your Netlify URL |
| Authorization callback URL | `https://api.netlify.com/auth/done` |

Generate a client secret and keep both values on screen.

**b. Install it in Netlify.** In your project: **Project configuration → Access & security → OAuth
→ Authentication Providers → Install Provider → GitHub**. Paste in the Client ID and Client Secret.
Save.

Direct link, once you know your project name:
`https://app.netlify.com/projects/YOUR-PROJECT-NAME/configuration/access#oauth`

### 5. Try it

Go to `https://your-site.netlify.app/admin/` and click **Log in with GitHub**.

If you land in an editor showing "News Posts", "Events" and "Issues & Advocacy" — it's working. Stop there. Don't
tidy anything up. The next person to touch it should be a board member who has never seen it.

---

## The actual test

Do this with each of the two prospective editors **separately**, in person if you can. Sit next
to them and do not help. What you're measuring is where they hesitate, not whether they
eventually succeed.

Give them a laptop, the URL, and these three tasks in order:

1. **Post an event.** "Add the November cleanup — Saturday, November 7th, 8am, corner of
   Northlake and Holly."
2. **Fix a mistake.** "The newest news post has a typo. Find it and fix it."
3. **Add a photo.** "Put a picture at the top of that post." (Have a photo on the desktop ready.)

### What to write down

- Did they get through GitHub account creation on their own?
- **The authorization screen.** It says something like *"Lewisburg CMS wants access to your
  repositories."* Did they read it and click through, or did they stop and ask if it was safe?
  This is the single most likely place to lose someone.
- Did they find **Publish**, or look for a "Save" button?
- After publishing, the change takes 30–60 seconds to appear on the site. Did that gap read as
  normal, or as "it didn't work"?
- Total time for task 1, unassisted.

### How to read the result

| Outcome | Decision |
| --- | --- |
| Both finished task 1 in under 10 minutes without asking | **Build it in Astro.** Saves ~$140/yr and the security burden. |
| One got stuck, mainly on the authorization screen | **Try Sanity** — same static site, but editors log in with email or Google and never see GitHub. |
| Either was visibly uncomfortable or lost interest | **Go WordPress.** Familiar editing wins; the maintenance cost is the price. |

There's no wrong answer here. The point is to find out in an afternoon rather than in month
three with all the content migrated.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```
