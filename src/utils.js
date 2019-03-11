const vscode = require('vscode');


function getEditorByFileAndView(fileName, viewColumn) {
  return vscode.window.visibleTextEditors.find(x => {
    return x.viewColumn === viewColumn && x.document.fileName === fileName
  });
}

async function goToLine(editor, lineNumber){
  try {
    if (!editor) {
      return;
    }

    if (lineNumber === null) {
      return;
    }
    let range = editor.document.lineAt(lineNumber).range;
    editor.selection = new vscode.Selection(range.start, range.end);
    editor.revealRange(range);
    await vscode.commands.executeCommand('editor.fold');
    return;

  } catch(err) {
    console.error('Vue splitter', err);
  }
}

module.exports = {
  getEditorByFileAndView,
  goToLine
}