// ====
// Imports
// ====
const vscode = require('vscode');
const utils = require('./utils');

// ====
// Methods
// ====

async function splitVueSectionsInNewEditors(editor){
  try {
    // Display a message box to the user
    const lineReferences = getVueLineNumbers(editor);

    // Script
    await vscode.commands.executeCommand('vscode.open', editor.document.uri, vscode.ViewColumn.One);
    lineReferences.lineScript && utils.goToLine(editor, lineReferences.lineScript);

    // Template
    await vscode.commands.executeCommand('vscode.open', editor.document.uri, vscode.ViewColumn.Two);
    const secondEditor = utils.getEditorByFileAndView(editor.document.fileName, vscode.ViewColumn.Two)
    lineReferences.lineTemplate && utils.goToLine(secondEditor, lineReferences.lineTemplate);

    // Style
    await vscode.commands.executeCommand('vscode.open', editor.document.uri, vscode.ViewColumn.Three);
    const thirdEditor = utils.getEditorByFileAndView(editor.document.fileName, vscode.ViewColumn.Three)
    lineReferences.lineStyle && utils.goToLine(thirdEditor, lineReferences.lineStyle);
  } catch (err) {
    console.error('Vue splitter', err);
  }
}

function getVueLineNumbers(editor) {
  var content = editor.document.getText();
  if (content.length) {
    let lineTemplate = null;
    let lineScript = null;
    let lineStyle = null;
    let lines = content.split('\n');

    lines.forEach((l, i) => {
      if (l.indexOf('<template>') !== -1) {
        lineTemplate = i;
      } else if (l.indexOf('<script>') !== -1) {
        lineScript = i;
      } else if (l.indexOf('<style') !== -1) {
        lineStyle = i;
      }
    });

    return {lineTemplate, lineScript, lineStyle};
  }

}

module.exports = {
  splitVueSectionsInNewEditors,
  getVueLineNumbers
}