import React from 'react'
import method from './method';
import { json1 } from "./jsons/json1" //new
import { json2 } from "./jsons/json2" //old
import { formatJson } from './method/formatter';
import { sortJson } from './method/sortJson';
import DisplayJson from './components/DisplayJson';


function JsonDiff() {

    let res = method.diffJson(sortJson(json2), sortJson(json1))
    let res2 = method.diffJson(sortJson(json2), sortJson(json1))

    let oldJson = formatJson(sortJson(json2)).split("\n");
    let newJson = formatJson(sortJson(json1)).split("\n");
    // let difference = formatJson(sortJson()).split("\n");

    let keys = Object.keys(res)
    let keys2 = Object.keys(res2)


    let commonKeys = findCommonKeys(keys, json2, keys2, json1)


    return (
        <div style={{ display: 'flex' }} >
            <DisplayJson json={json2} keys={keys2} commonKeys={commonKeys} />
            <DisplayJson json={json1} keys={keys} commonKeys={commonKeys} />
        </div>
    )
}

const findCommonKeys = (leftKeys, rightObj, rightKeys, leftObj) => {
    //console.log(leftKeys, rightObj);
    let c1 = Object.entries(rightObj).map((ro) => {
        if (leftKeys.find(i => i === ro[0]))
            return ro[0]
        else return null
    })
    let c2 = Object.entries(leftObj).map((ro) => {
        if (rightKeys.find(i => i === ro[0]))
            return ro[0]
        else return null
    })

    let commonKeys = c1.filter(function (obj) {
        return c2.indexOf(obj) !== -1 && obj !== null;
    });

    return commonKeys
}

export default JsonDiff