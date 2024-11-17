import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax/')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click() //wait 15-30 seconds see text
    // const text = await successButton.textContent() //wait 15 seconds see text
    // expect(text).toEqual('Data loaded with AJAX get request.')

    // const text2 = await successButton.allTextContents() //not wait - test failed
    // expect(text2).toEqual('Data loaded with AJAX get request.')

    // await successButton.waitFor({state: "attached"}) // add waiter - test passed
    // const text3 = await successButton.allTextContents()
    // expect(text3).toEqual('Data loaded with AJAX get request.')

    //await expect(successButton).toHaveText('Data loaded with AJAX get request.') // wait ony 5 seconds - test failed
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) // increase waiting up to 20 sec
    
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    // ___wait for element
    await page.waitForSelector('.bg-success')
    const text = await successButton.allTextContents()

    // ___wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata') //wait for request to be successfully

    // __wait for network calls to be completed ('NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    //await page.waitForTimeout(15000) // NOT RECOMMENDED

    await page.waitForURL('') //when need to navigate to particular URL

    expect(text).toEqual('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
    //test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    //await successButton.click({timeout: 18000}) // pass
    await successButton.click()
})