export function createUsername(name){
    const nameParts  = name.trim().split(' ');
    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) return nameParts[0];
    return `${nameParts[0]}.${nameParts[nameParts.length - 1]}`;
}