# Host an iPhone test preview (not a release)

This folder is a self-contained static webpage. It has no build step or backend requirement.

## Vercel Hobby option

- Hobby has a free tier for eligible **non-commercial personal** projects.
- Connect the GitHub repository `circadiansummer/AID-Little-Tools` in Vercel.
- Configure Root Directory: `story-card-studio/mobile`.
- Select Other / no framework / static output. The `index.html` redirects to the current touch development HTML file.
- **Configure Deployment Protection BEFORE sharing the URL.** A private GitHub repository does not automatically make a deployed website private. Use Vercel Authentication and check the current account/plan deployment protection options.
- Confirm no billing upgrade, paid add-on, or paid resource has been enabled.

The GitHub upload does not deploy anything. The user's Vercel connection and approval are required to publish a hosted preview.

## Safety

No story data should be sent to an external server: the Studio is designed to process JSON locally in the user's browser. Do not add analytics, telemetry or upload forms without express approval. Use non-sensitive demonstration JSON when testing.

## Why HTTPS?

Opening standalone `.html` in iOS Files Quick Look may render a preview without running JavaScript or retaining storage. An actual HTTPS webpage opened in Safari is a more realistic testing environment.
