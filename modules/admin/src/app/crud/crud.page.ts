import { LoginPage } from '../login/login.page';
import { WaitUntil } from '../common/waitUntilReady';
import { CreatePage } from './crudCreate/crud.create.page';
import { DeletePage } from './crudDelete/crud.delete.page';

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();

    public logo = element(by.id('logo'));
    public notification = by.id('notificationBox');
    public customersItem = by.className('customers');
    public customersTag = element(by.tagName('customers'));
    public metaDataItem = by.className('crudmetadata');
    public gridMetaDataItem = by.className('crudmetagriddata');
    public formMetaDataItem = by.className('crudmetaformdata');
    public gridMetaDataTag = element(by.tagName('crudMetaGridData'));
    public formMetaDataTag = by.tagName('crudMetaFormData');
    public btnAddRecord = by.id('addRow');
    public crudCreateTag = element(by.tagName('crud-create'));
    public crudViewTag = element(by.tagName('crud-view'));
    public btnDeleteRow = by.id('deleteRecord');
    public backBtn = by.id('back');
    public record = by.css('.ag-body-container > div:first-of-type');
    public editIcon = by.css('.ag-body-container > div:first-of-type .editIcon');
    public records = element.all(by.css('.ag-body-container > div'));
    public searchPanel = by.className('searchPanel');
    public chooseFirstLinkElement = by.css(
        '.ag-body-container > div:first-of-type .ag-selection-checkbox');

    private _ptor;

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getCrudView() {
        browser.get(browser.baseUrl + '/customers');
    }

    isPresentRecord() {
        return this._ptor.wait(protractor.until.elementLocated(this.record), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    getSizeRecords() {
        return this._ptor.wait(protractor.until.elementLocated(this.record), 5000)
            .then(() => {
                return Promise.resolve(this.records.count());
            });
    }

    deleteRecordsOnSecondLevel() {
        return this.clickOnBtnAddRecord()
            .then(() => {
                return this.crudCreate.clickOnContactsLinksetBtn()
                    .then(() => {
                        return this.crudCreate.chooseFirstLink()
                            .then(() => {
                                return this.clickOnDeleteButton()
                                    .then(() => {
                                        return this.crudDelete.clickOnOkBtn();
                                    });
                            });
                    });
            });
    }

    isEnabledDeleteButton() {
        WaitUntil.waitUntil(this.btnDeleteRow, this.ptor);
        return element(this.btnDeleteRow).isEnabled();
    }

    clickOnDeleteButton() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnDeleteRow), 5000)
            .then((el: webdriver.IWebElement) => {
                return WaitUntil.waitUntilEnabled(element(this.btnDeleteRow), this._ptor)
                    .then(() => {
                        return Promise.resolve(el.click());
                    });
            });
    }

    chooseFirstLink() {
        return this._ptor.wait(protractor.until.elementLocated(this.chooseFirstLinkElement), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBackBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.backBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnGridMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.gridMetaDataItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnFormMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.formMetaDataItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.metaDataItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnCustomers() {
        return this._ptor.wait(protractor.until.elementLocated(this.customersItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBtnAddRecord() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnAddRecord), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnEditIcon() {
        return this._ptor.wait(protractor.until.elementLocated(this.editIcon), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    isPresentGridMetaData() {
        WaitUntil.waitUntil(this.gridMetaDataTag, this.ptor);
        return this.gridMetaDataTag.isPresent();
    }

    isPresentFormMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.formMetaDataTag), 10000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    isPresentLogo() {
        WaitUntil.waitUntil(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntil.waitUntil(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCrudViewTag() {
        WaitUntil.waitUntil(this.crudViewTag, this.ptor);
        return this.crudViewTag.isPresent();
    }

    isPresentNotification() {
        return this._ptor.wait(protractor.until.elementLocated(this.notification), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    isPresentCustomers() {
        WaitUntil.waitUntil(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    }

    isDisplayedSearchPanel() {
        return this._ptor.wait(protractor.until.elementLocated(this.searchPanel), 10000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}