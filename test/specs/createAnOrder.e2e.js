const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('Setting the addresses', async () => {
        await browser.url(`/`)
        const fromAddress = 'East 2nd Street, 601'
        const toAddress = '1300 1st St'
        await page.fillAddresses(fromAddress, toAddress);
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(await fromField).toHaveValue(fromAddress);
        await expect(await toField).toHaveValue(toAddress);
    })

    it('Selecting Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = $('div=Supportive');
        await supportiveButton.click();
        expect(supportiveButton.parentElement()).toHaveElementClass('active')
    })

    it('Filling in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Adding a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.clickPaymentButton();
        await page.fillCardDetails(helper.getCardNumber(), helper.getCVVNumber());
        expect($(page.paymentModal)).toHaveElementClass('active');
    })

    it('Writing a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.clickPaymentButton();
        await page.fillCardDetails(helper.getCardNumber(), helper.getCVVNumber(), true); // close payment window
        const message = 'Test'
        await page.writeMessage();
        expect($(page.messageInput)).toHaveValue(message);
    })
    ////////////////
    it('Adding Blanket and hankerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.clickPaymentButton();
        await page.fillCardDetails(helper.getCardNumber(), helper.getCVVNumber(), true);
        await page.writeMessage();
        await page.clickBlanketSwitch()
        expect($(page.blanketsSwitch)).toBeChecked();
    })
    it('Ordering 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.clickPaymentButton();
        await page.fillCardDetails(helper.getCardNumber(), helper.getCVVNumber(), true);
        await page.writeMessage();
        await page.clickBlanketSwitch()
        await page.addTwoIceCreams()
        const iceCreamCounter = await $(page.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        expect(iceCreamCounter).toHaveValue(2);
    })
    it('Wait for Car Search modal to appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.clickPaymentButton();
        await page.fillCardDetails(helper.getCardNumber(), helper.getCVVNumber(), true);
        await page.writeMessage();
        await page.clickBlanketSwitch()
        await page.addTwoIceCreams()
        //click order button
        await page.clickOrderButton();
        const carSearchModal = await $(page.orderModal)
        await carSearchModal.waitForDisplayed();
        expect(carSearchModal).toBeDisplayed();
    })
})