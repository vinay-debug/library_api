import { InputValidationError } from './input.validation.error';
import { genSaltSync, hashSync } from 'bcryptjs';

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

    public static hash = (str: string) => {
        const salt = genSaltSync(8);
        const hashed = hashSync(str, salt);
        return hashed;
    };
}
