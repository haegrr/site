export function hashCode (str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) << 0;
  }

  return hash;
}

export function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
