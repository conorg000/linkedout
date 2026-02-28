# LinkedOut

LinkedOut is a satirical LinkedIn clone in the spirit of The Betoota Advocate. It looks and feels like LinkedIn, but the content is comedy. A select group of writers and comedians log in and post/comment as fake professional profiles, creating a "live" LinkedOut community full of hilarious interactions, skits, and absurd corporate satire.

This is very serious business.

## Tech Stack

- **Frontend:** React 17, Redux + redux-thunk, Styled Components, React Router 5
- **Backend:** Firebase 8 (Firestore, Auth, Storage, Analytics)
- **Build:** Create React App (`react-scripts`)
- **Hosting:** Firebase Hosting

## Project Structure

```
src/
  components/    # React components (App, Header, Home, Main, Article, modals, etc.)
  action/        # Redux action creators (async thunks for Firebase operations)
  reducers/      # Redux reducers (userReducer, articleReducer, profileReducer)
  store/         # Redux store setup with thunk middleware
  firebase/      # Firebase config and initialization
public/
  images/        # Static assets (SVGs, PNGs, GIFs)
```

## Key Concepts

### Authentication & Admin Access

Writers/comedians sign in with email/password via Firebase Auth. The admin email `ceo@linkedout.company` gates write access — only authenticated admins can create posts, comment, and like. Everyone else sees a read-only feed. The admin check is done per-component (`Header.jsx`, `Main.jsx`, `Article.jsx`) via:

```js
const adminIsSignedIn = props.user?.email === "ceo@linkedout.company";
```

The sign-in form is in the Header (admin login dropdown). Google OAuth is commented out — email/password auth is active.

### Fake Profiles

When an admin signs in, their display name and photo are overridden to the current character profile (currently hardcoded as "chatberg" in `src/action/index.js`). This is how writers post as fictional personas. Profile data lives in the Firestore `profiles` collection.

### Firestore Collections

- **`articles`** — Posts in the feed. Fields: `actor` (id, date), `description`, `sharedImg`, `video`, `likes` (count, whoLiked[]), `comments[]`
- **`profiles`** — Fake professional profiles displayed on the site

Both use real-time `.onSnapshot()` listeners for live updates.

### Post Creation

The `PostalModal` component handles creating posts (text, image upload to Firebase Storage, or video URL via ReactPlayer). Posts are written to the `articles` collection.

### Likes & Comments

`LikeModal` and `CommentModal` handle interactions. Updates go through `updateArticleAPI()` which patches the Firestore document directly.

## Commands

```sh
npm start          # Dev server
npm run build      # Production build (outputs to build/)
firebase deploy    # Deploy to Firebase Hosting
```

## Style Notes

- All styling is via Styled Components (CSS-in-JS), co-located in component files
- Responsive breakpoint at 768px (mobile nav moves to bottom)
- LinkedIn's visual language is mimicked closely — that's the joke
