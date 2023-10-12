import express, { Request, Response } from "express"
import { octokit, REPO_NAME, OWNER, PORT } from "./config"

const app = express()
app.use(express.raw({ type: "*/*" }))

app.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!REPO_NAME || !OWNER) throw new Error("No env values!")

    const lastestRelease = await octokit.rest.repos.getLatestRelease({
      repo: REPO_NAME,
      owner: OWNER
    })

    const exeAssetBrowserDownloadUrl = lastestRelease.data.assets.filter(
      (asset) => asset.browser_download_url.split(".").pop() === "exe"
    )[0].browser_download_url

    res.redirect(301, exeAssetBrowserDownloadUrl)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})

export { app }
