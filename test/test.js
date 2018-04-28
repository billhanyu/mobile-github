const wd = require('wd');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const localServer = require('./local-server.js');
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

const credentials = require('./getCredentials')();

const udid = credentials.udid;

// .app extension for testing on real device, .ipa extension for testing on simulator
const app = 'http://localhost:3000/mobilegithub.app';

const server = {
  host: 'localhost',
  port: 4723,
};

describe('Mobile-Github', () => {
  let driver;

  before(() => {
    driver = wd.promiseChainRemote(server);
    localServer.start();

    const desired = {
      udid, // udid of device
      platformName: 'iOS',
      platformVersion: '11.2',
      app,
      xcodeOrgId: credentials.xcodeOrgId,
      xcodeSigningId: 'iPhone Developer',
      deviceName: credentials.deviceName,
      clearSystemFiles: true,
    };
    return driver.init(desired);
  });

  after(() => {
    localServer.stop();
    return driver.quit();
  });

  it('should display every tab', () => {
    return driver.waitForElementByName('Xuanyu Zhou', 6000)
      .then(el => {
        return driver.elementByName('Xuanyu Zhou').text();
      })
      .then(result => {
        result.should.be.equal('Xuanyu Zhou');
        return driver
          .elementByXPath('//XCUIElementTypeButton[contains(@name, "Public Repos")]')
          .click()
          .sleep(200)
          .elementByXPath('//XCUIElementTypeButton[contains(@name, "Profile")]')
          .click()
          .sleep(200)
          .elementByXPath('//XCUIElementTypeButton[contains(@name, "Following")]')
          .click()
          .sleep(200)
          .elementByXPath('//XCUIElementTypeButton[contains(@name, "Followers")]')
          .click()
          .sleep(200)
          .elementByXPath('//XCUIElementTypeButton[contains(@name, "Me")]')
          .click()
          .sleep(1000);
      });
  });

  it('should be able to log in', () => {
    return driver
      .elementByName('usernameInput')
      .type(credentials.githubUsername)
      .elementByName('passwordInput')
      .type(credentials.githubPassword)
      .elementByName('Log In')
      .click()
      .sleep(1000);
  });

  it('should be able to visualize a repository', () => {
    const action = new wd.TouchAction();
    action.tap({ x: 181, y: 633 });
    return driver
      .elementByXPath('//XCUIElementTypeButton[contains(@name, "# Followers:")]')
      .click()
      .sleep(200)
      .elementByName('Slash0BZ')
      .click()
      .sleep(200)
      .elementByXPath('//XCUIElementTypeButton[contains(@name, "Public Repos")]')
      .click()
      .sleep(200)
      .performTouchAction(action)
      .sleep(5000);
  });
});
