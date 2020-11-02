import {PREFIX} from "/@/store/constants";

const KEY = PREFIX + '_max_record_id'

let maxRecordId = parseInt(window.localStorage.getItem(KEY) || '0') || 0
function generateRecordId() {
    return ++maxRecordId
}
function saveMaxRecordId() {
    window.localStorage.setItem(KEY, '' + maxRecordId)
}

export {
    generateRecordId,
    saveMaxRecordId
}
