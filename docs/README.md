# CIS 376 Web App Project

## Purpose
This front-end web application helps users log in and browse curated resources using search, filter, and sort.

## User Story
As a user, I want to log in, then search, filter by category, and sort items so I can quickly find the resource I need.

## Links
- Repository: https://github.com/ehassan256417-afk/CIS-376-MID-TERM-PROJECT
- Deployed App (GitHub Pages): https://ehassan256417-afk.github.io/CIS-376-MID-TERM-PROJECT/
- Design Ideas (Wiki): https://github.com/ehassan256417-afk/CIS-376-MID-TERM-PROJECT/wiki
- GitHub Profile: https://github.com/ehassan256417-afk

## How to Use
1. Open the app and go to **Login**.
2. Open the browser **Console** to see the password.
3. Enter a username + the password to sign in.
4. Use **Search**, **Category Filter**, and **Sort** to find items.
5. Switch between **Grid/List** views.
6. Open **View Session Data** to see current sessionStorage data and clear it.

## Verification (Validity & Accessibility)
- Verified HTML/CSS/JS runs without console errors in Chrome/Edge.
- Verified responsive layout on mobile and desktop using Bootstrap.
- Verified keyboard access for inputs and buttons (Tab/Enter).

## Authorship & Attribution
- Bootstrap (layout/components): https://getbootstrap.com/docs/5.3/getting-started/introduction/
- MDN Web Docs (HTML/CSS/JS references): https://developer.mozilla.org/
- GitHub Pages documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- (Add any other resources you used here.)

## Code Example (Highlighted)
The snippet below protects restricted pages by redirecting users to the login page if they are not authenticated:

```js
function requireAuthN() {
  if (sessionStorage.getItem("isAuthN") !== "true") {
    window.location.assign("./login.html");
  }
}