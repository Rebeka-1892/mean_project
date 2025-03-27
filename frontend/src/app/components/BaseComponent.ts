import {HttpErrorResponse} from '@angular/common/http';

export default class BaseComponent {
    error?: HttpErrorResponse;
    message?: string;
    errorMessage?: string = this.error?.error.message;
    constructor() {}
}
