/*eslint-disable*/


/*
 * using a https://developer.mozilla.org/en-US/docs/DOM/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support as prototype for this
 * @param { object } oTarget - arget object
 * @param { string } defaultMethodName - which method to use on oTarget call
 * @returns {object.Proxy}  
*/
export default (oTarget, defaultMethodName) => {
  return new Proxy(
    ()=>{}
    , {
      "get": function (_oTarget, sKey) {
        return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
      },
      apply(_oTarget, thisArg, argumentsList) {
        return oTarget[defaultMethodName].apply(thisArg, argumentsList);
      },
      "set": function (_oTarget, sKey, vValue) {
        if (sKey in oTarget) { return false; }
        return oTarget.setItem(sKey, vValue);
      },
      "deleteProperty": function (_oTarget, sKey) {
        if (sKey in oTarget) { return false; }
        return oTarget.removeItem(sKey);
      },
      "enumerate": function (_oTarget, sKey) {
        return oTarget.keys();
      },
      "iterate": function (_oTarget, sKey) {
        return oTarget.keys();
      },
      "ownKeys": function (_oTarget, sKey) {
        return oTarget.keys();
      },
      "has": function (_oTarget, sKey) {
        return sKey in oTarget || oTarget.hasItem(sKey);
      },
      "hasOwn": function (_oTarget, sKey) {
        return oTarget.hasItem(sKey);
      },
      "defineProperty": function (_oTarget, sKey, oDesc) {
        if (oDesc && "value" in oDesc) { oTarget.setItem(sKey, oDesc.value); }
        return oTarget;
      },
      "getPropertyNames": function (_oTarget) {
        return Object.getPropertyNames(oTarget).concat(oTarget.keys());
      },
      "getOwnPropertyNames": function (_oTarget) {
        return Object.getOwnPropertyNames(oTarget).concat(oTarget.keys());
      },
      "getPropertyDescriptor": function (_oTarget, sKey) {
        var vValue = oTarget[sKey] || oTarget.getItem(sKey)
        return vValue ? {
          "value": vValue,
          "writable": true,
          "enumerable": true,
          "configurable": false
        } : undefined;
      },
      "getOwnPropertyDescriptor": function (_oTarget, sKey) {
        var vValue = oTarget.getItem(sKey);
        return vValue ? {
          "value": vValue,
          "writable": true,
          "enumerable": true,
          "configurable": false
        } : undefined;
      },
      "fix":  function (_oTarget) {
        return "not implemented yet!";
      },
    });
};
/*eslint-enable*/
