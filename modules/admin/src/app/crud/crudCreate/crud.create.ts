import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import {Router} from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";
import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from "ng2-select";

@Component({
    selector: 'crud-create',
    template: require('../form.html'),
    styles: [
        require('../form.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        MultipleSelect,
        CrudLinkset,
        MdCheckbox,
        SELECT_DIRECTIVES,
        BUTTON_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})

export class CrudCreate {
    public btnName:string = 'Create';

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.crudService.addingFormValid = false;
        this.crudService.model = {};
    }

    onSubmit() {
        this.crudService.createRecord(this.crudService.model);
        this.router.navigateByUrl(this.crudService.currPath)
    }

    isRequired(event) {
        if (event) {
            this.crudService.addingFormValid = true;
            return;
        }
    }
}