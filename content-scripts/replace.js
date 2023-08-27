function walkNodes(node) {
  let child, next;

  if (node.tagName == "SCRIPT" || node.tagName === "STYLE") return;

  switch (node.nodeType) {
    case 1: // Element
    case 8: //
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walkNodes(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

function boldFirstLetters(str) {
  const words = str.split(" ").map((word) => {
    if (word.length > 2) {
      return `<span class="anchored">${word.slice(0, 2)}</span>${word.slice(
        2
      )}`;
    } else {
      return word;
    }
  });

  return words.join(" ");
}

function handleText(node) {
  if (node.textContent.length < 3) return;
  if (node.textContent != undefined && node.tagName == undefined) {
    const textNode = document.createElement("bettertext");
    textNode.innerHTML = boldFirstLetters(node.textContent);
    node.replaceWith(textNode);
  }
}

function run() {
  walkNodes(document.body);
}

window.addEventListener("load", run, false);
