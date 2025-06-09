(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // ../bank_integration/bank_integration/public/js/common.js
  var require_common = __commonJS({
    "../bank_integration/bank_integration/public/js/common.js"(exports, module) {
      frappe.provide("bi");
      frappe.provide("modifyMethod");
      bi.listenForOtp = function(frm) {
        frappe.realtime.on("get_bank_otp", function(data) {
          if (!frm || data.uid != frm._uid || frm.otp_requested)
            return;
          frm.otp_requested = true;
          frappe.hide_msgprint();
          let msg = "";
          if (data.mobile_no) {
            msg += `registered mobile number (<strong>${data.mobile_no}</strong>)`;
          }
          if (data.email_id) {
            if (msg) {
              msg += " and ";
            } else {
              msg += "registered ";
            }
            msg += `email address (<strong>${data.email_id}</strong>)`;
          }
          if (!msg) {
            msg = "registered mobile number / email address";
          }
          var otp_dialog = frappe.prompt({
            fieldtype: "Data",
            label: "One Time Password",
            fieldname: "otp",
            reqd: 1,
            description: `An OTP has been sent to your ${msg} for further authentication.`
          }, function(_data) {
            frappe.call({
              method: "bank_integration.bank_integration.api.continue_with_otp",
              args: {
                otp: _data.otp,
                bank_name: data.bank_name,
                uid: data.uid,
                doctype: frm.doc.doctype,
                docname: frm.doc.name,
                logged_in: data.logged_in
              }
            });
            delete frm.otp_requested;
          }, "Enter OTP");
          otp_dialog.set_secondary_action(function() {
            frappe.call({
              method: "bank_integration.bank_integration.api.cancel_session",
              args: { bank_name: data.bank_name, logged_in: data.logged_in, uid: data.uid }
            });
            delete frm.otp_requested;
          });
        });
      };
      bi.listenForQuestions = function(frm) {
        frappe.realtime.on("get_bank_answers", function(data) {
          if (!frm || data.uid != frm._uid || frm.answers_requested || !data.questions)
            return;
          frm.answers_requested = true;
          frappe.hide_msgprint();
          let fields = [];
          for (let [fieldname, label] of Object.entries(data.questions)) {
            fields.push({
              fieldtype: "Data",
              label,
              fieldname,
              reqd: 1
            });
          }
          var dialog = frappe.prompt(fields, function(_data) {
            frappe.call({
              method: "bank_integration.bank_integration.api.continue_with_answers",
              args: {
                answers: _data,
                bank_name: data.bank_name,
                uid: data.uid,
                doctype: frm.doc.doctype,
                docname: frm.doc.name,
                logged_in: data.logged_in
              }
            });
            delete frm.answers_requested;
          }, "Answer Secure Access Questions");
          dialog.set_secondary_action(function() {
            frappe.call({
              method: "bank_integration.bank_integration.api.cancel_session",
              args: { bank_name: data.bank_name, logged_in: data.logged_in, uid: data.uid }
            });
            delete frm.answers_requested;
          });
        });
      };
      modifyMethod = function(source, funcName, newFunc, before = false) {
        let sourceObj = eval(source);
        if (!sourceObj) {
          console.error(`Could not find object: ${source}`);
          return;
        }
        let isPrototype = false;
        let oldFunc = sourceObj[funcName];
        if (!oldFunc) {
          oldFunc = sourceObj.prototype[funcName];
          isPrototype = true;
        }
        if (!oldFunc) {
          console.error(`Function ${funcName} does not exist for ${source}`);
          return;
        }
        function newFunction() {
          if (before) {
            let msg = newFunc.apply(this, arguments);
            if (msg === "return") {
              return;
            }
          }
          let out = oldFunc.apply(this, arguments);
          let new_out;
          if (!before) {
            let execNewFunc = () => {
              return newFunc.call(this, ...Array.from(arguments), out);
            };
            if (typeof out === "object" && out.then) {
              return out.then(execNewFunc);
            } else {
              new_out = execNewFunc();
            }
          }
          return new_out || out;
        }
        if (isPrototype) {
          sourceObj.prototype[funcName] = newFunction;
        } else {
          sourceObj[funcName] = newFunction;
        }
      };
    }
  });

  // ../bank_integration/bank_integration/public/js/bank_integration.bundle.js
  var import_common = __toESM(require_common());
})();
//# sourceMappingURL=bank_integration.bundle.UIB4DBHQ.js.map
