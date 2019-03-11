// ====
// Imports
// ====
const vscode = require('vscode');
const singleFileAPI = require('./single-file-api.js');

// ====
// Methods
// ====

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('"vue-splitter" is now active!');

  let disposable = vscode.commands.registerTextEditorCommand('extension.vueSplit', async function (editor, edit){
    singleFileAPI.splitVueSectionsInNewEditors(editor);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}


module.exports = {
  activate,
  deactivate
}
