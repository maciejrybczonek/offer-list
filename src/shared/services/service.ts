export class Service {

    serializeParams(params: any) {
        let serializedParams = '';
        Object.keys(params).forEach((key, i) => {
            let value = params[key];
            if (value) {
                serializedParams += `${serializedParams.length === 0 ? '?' : '&'}${key}=${value}`;
            }
        });
        return serializedParams;
    }

}
