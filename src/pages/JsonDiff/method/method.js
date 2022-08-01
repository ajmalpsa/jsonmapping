export default {
    diffJson: (j1, j2) => {
        // var aik = { "id": 50, "name": "AIK", "description": "Hejja!", "tasks": [{ 'foo': 'bar' }], "n": null, "n2": "6", "nan": NaN, "mightBeNaN": false };
        // var dif = { "id": 50, "name": "Djurgården", "description": "Hejja!", "tasks": [{ 'foo': 'zaz' }], "n": null, "n2": null, "nan": NaN, "mightBeNaN": NaN };

        // console.log();

        // ES6 implementation

        function diff(obj1, obj2) {
            const result = {};
            if (Object.is(obj1, obj2)) {
                return undefined;
            }
            if (!obj2 || typeof obj2 !== 'object') {
                return obj2;
            }
            Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
                if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
                    result[key] = obj2[key];
                }
                if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
                    const value = diff(obj1[key], obj2[key]);
                    if (value !== undefined) {
                        result[key] = value;
                    }
                }
            });
            return result;
        }
        return diff(j1, j2)
    }
}