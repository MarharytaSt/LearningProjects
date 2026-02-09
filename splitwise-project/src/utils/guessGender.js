export function guessGender(name) {
    if (!name || typeof name !== "string") return "male";

    const normalized = name.trim().toLowerCase();
    const last = normalized.slice(-1);

    const maleExceptions = [
        "илья",
        "костя",
        "федя",
        "женя",
        "саша",
        "паша",
        "миша",
        "гриша",
        "никита",
        "леша",
        "даня",
        "ваня",
        "дима",
        "сергей",
        "слава"
    ]

    if (maleExceptions.includes(normalized)) {
        return "male";
    }

    const femaleEndings = ["а", "я"];

    return femaleEndings.includes(last) ? "female" : "male";
}