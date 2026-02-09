import petrovich from "petrovich";

export function toDative(name, gender) {
    return petrovich(
        {
            first: name,
            gender
        },
        "dative"
    ).first;
}