export function parseDate(date) {
  let parts = date.trim().split('.');
  return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
}

export function getErrorInfo(e){
  if (e.type) {
    return  e;
  } else if (e.constructor.name === 'TypeError') {
    return {type: 'offline'}
  } else {
    return {type: 'unknown'}
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
