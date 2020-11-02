import {PREFIX} from "/@/store/constants";

const KEY = PREFIX + '_' + 'max_category_id'

let maxCategoryId = parseInt(window.localStorage.getItem(KEY) || '0') || 0
function generateCategoryId() {
    return ++maxCategoryId
}
function saveMaxCategoryId() {
    window.localStorage.setItem(KEY, '' + maxCategoryId)
}

export {
    generateCategoryId,
    saveMaxCategoryId
}
