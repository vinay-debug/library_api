import { InputValidationError } from './input.validation.error';

export class Helper {
    static handleValidationError = (result) => {
        let index = 1;
        const errorMessages = [];
        for (const er of result.errors) {
            errorMessages.push(` ${index}. ${er.msg} - <${er.value}> for <${er.param}> in ${er.location}`);
            index++;
        }
        throw new InputValidationError(errorMessages);
    };
}
