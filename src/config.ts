import dotenv from "dotenv"
import { Octokit } from "octokit"

dotenv.config()

const { GITHUB_TOKEN, REPO_NAME, OWNER, PORT } = process.env

const octokit = new Octokit({
  auth: GITHUB_TOKEN
})

export { GITHUB_TOKEN, REPO_NAME, OWNER, PORT, octokit }
