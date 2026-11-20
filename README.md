# Holding Entry Calculator

A static English-language training app with one-degree controls, editable Heading and
Inbound Course fields, and a compass. The package carries over the source calculation
and its sector boundaries. Treat the app as a classroom aid.

## Preview locally

Extract the ZIP and open a terminal in the extracted folder. Run
`python -m http.server 8000 --bind 127.0.0.1`, then visit
`http://localhost:8000/`. Opening index.html directly runs the calculator,
but installation and offline caching require HTTPS or localhost.

## Deploy

Upload the extracted files and the icons folder to an HTTPS static host. Keep all paths
and filenames intact. The app works at a domain root or under a folder such as
`/holding-entry/`. Use the final URL with its trailing slash.

For GitHub Pages, commit the extracted contents at the root of the publishing branch.
In **Settings → Pages**, choose **Deploy from a branch** and select that branch and
**/(root)**. Enable **Enforce HTTPS** if available and open the Pages URL once deployment
finishes. [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Install and check offline use

1. Open the HTTPS URL with an internet connection.
2. On iPhone or iPad, use Safari’s Share menu, choose **Add to Home Screen**, enable
   **Open as Web App** if shown, and tap **Add**. On Android, use Chrome’s **Install app**
   or **Add to Home screen** option.
3. Launch from the Home Screen while still online so the installed app can cache its
   files. Once loaded, close it, turn on airplane mode, and open it again. Adjust both
   angles using the sliders and number fields, toggle turns, and try Reset.

[Apple’s iPhone instructions](https://support.apple.com/en-az/guide/iphone/iphea86e5236/26/ios/26)
· [Apple’s iPad instructions](https://support.apple.com/en-gb/guide/ipad/ipad8f1f7a29/ipados)

## Release updates

Upload the complete release together. Increment the version in `cacheName` in
`service-worker.js` for every offline asset change. Serve the worker with cache
revalidation if your host supports configurable response headers. Once the browser
downloads a new worker, it activates after existing app tabs and windows close.
