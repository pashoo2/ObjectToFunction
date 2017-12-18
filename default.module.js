/*eslint-disable*/
/*
 * inspired by a https://developer.mozilla.org/en-US/docs/DOM/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support
 * @param { object } oTarget - arget object
 * @param { string } defaultMethodName - which method to use on oTarget call
 * @returns {object.Proxy}  
*/
export default (oTarget, defaultMethodName) => {
  return new Proxy(
    ()=>{}
    , {
      "get": function (_oTarget, sKey) {
        return oTarget[sKey] || undefined;
      },
      apply(_oTarget, thisArg, argumentsList) {
        return oTarget[defaultMethodName].apply(thisArg, argumentsList);
      },
      "set": function (_oTarget, sKey, vValue) {
        if (sKey in oTarget) { return false; }
        return oTarget[sKey] = vValue;
      },
      "deleteProperty": function (_oTarget, sKey) {
        if (sKey in oTarget) { return false; }
        return delete oTarget[sKey];
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
        return sKey in oTarget || oTarget.hasOwnProperty(sKey);
      },
      "hasOwn": function (_oTarget, sKey) {
        return oTarget.hasOwnProperty(sKey);
      },
      "defineProperty": function (_oTarget, sKey, oDesc) {
        if (oDesc && "value" in oDesc) {
          Object.defineProperty(oTarget, sKey, oDesc)
        }
        return oTarget;
      },
      "getPropertyNames": function (_oTarget) {
        return Object.getPropertyNames(oTarget).concat(oTarget.keys());
      },
      "getOwnPropertyNames": function (_oTarget) {
        return Object.getOwnPropertyNames(oTarget).concat(oTarget.keys());
      },
      "getPropertyDescriptor": function (_oTarget, sKey) {
        return Object.getOwnPropertyDescriptor(oTarget, sKey)
      },
      "getOwnPropertyDescriptor": function (_oTarget, sKey) {
        return Object.getOwnPropertyDescriptor(oTarget, sKey)
      }
    });
};
/*eslint-enable*/
