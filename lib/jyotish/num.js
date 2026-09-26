/** हिंदी अंक (देवनागरी) में संख्या। */
export const hindiNum = (n) => String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]);
