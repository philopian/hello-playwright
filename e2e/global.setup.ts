import {test as setup} from "@playwright/test"
import { existsSync } from "fs";

import { STORAGE_STATE } from "../playwright.config";

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD


setup('Login',async ({page}) => {
  if (!existsSync(STORAGE_STATE)) {
    await page.goto('/')
    await page.locator('#username').fill(USER || "")
    await page.locator('#password').fill(PASSWORD || "")
    await page.locator('#submit').click()

    await page.waitForLoadState()
    await page.waitForTimeout(3000)

    await page.context().storageState({path:STORAGE_STATE})
  }
})