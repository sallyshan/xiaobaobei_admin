/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
  return /^1([3456789])\d{9}$/.test(phone)
}

/**
 * @param {string} password
 * @returns {Boolean}
 */
export function validPassword(password) {
  return password && password.length > 5 && password < 50
}
