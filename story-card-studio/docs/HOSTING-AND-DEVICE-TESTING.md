# Mobile device testing / hosting

The mobile HTML builds are standalone static pages with no runtime server requirements. Downloading and opening them through iOS Files/Quick Look may show a non-interactive preview because JavaScript execution can be blocked. To test the app, host the **mobile touch** build as an HTTPS page that executes JS.

For privacy, prefer an access-controlled Vercel **preview deployment**. A logged-in ChatGPT session is not equivalent to Vercel login: deployment access is controlled by Vercel. Do not deploy to a publicly reachable production URL without explicit user consent. Some Vercel deployment-protection options may vary by plan.

Use `mobile/aid-story-card-editor-v4.12-mobile-touch-dev.html` as test source; when deploying, expose it as `index.html` in the deployment root, without altering its content. The other builds exist for archival/diff purposes only.

**Test before merge:** iPhone Safari load/tap/edit; file import and JSON export; touch long-press/cancel/scroll/Act move; navigation and screen keyboard; desktop regression; source hashes. A successful hosted deployment verifies only delivery, not correct iOS interactions.
