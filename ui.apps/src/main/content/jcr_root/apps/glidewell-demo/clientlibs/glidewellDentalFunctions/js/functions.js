/**
 * Highlight tooth
 * @name highlightTooth Highlight tooth
 * @param {string} group name
 */
function highlightTooth(groupName)
{
    var groupMap = {};
    groupMap.group1 = ["tooth1", "tooth2", "tooth3", "tooth4", "tooth5", "tooth6"];
    groupMap.group2 = ["tooth7", "tooth8", "tooth9", "tooth10"];
    groupMap.group3 = ["tooth11", "tooth12", "tooth13", "tooth14", "tooth15", "tooth16"];
    groupMap.group4 = ["tooth17", "tooth18", "tooth19", "tooth20", "tooth21", "tooth22"];
    groupMap.group5 = ["tooth23", "tooth24", "tooth25", "tooth26"];
    groupMap.group6 = ["tooth27", "tooth28", "tooth29", "tooth30", "tooth31", "tooth32"];
    var event = new CustomEvent("highlightTeeth", { detail: groupMap[groupName] });
    document.dispatchEvent(event);
}

/**
 * Navigate to Next Panel
 * @name navigateNext Navigate to Next Panel
 */
function navigateNext()
{
    var event = new CustomEvent("navigateNext");
    document.dispatchEvent(event);
}