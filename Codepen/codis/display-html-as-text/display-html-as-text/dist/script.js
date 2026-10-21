function isInline (node) {
  return (
    node.tagName === 'A' ||
    node.tagName === 'SPAN' || 
    node.tagName === 'STRONG' ||
    node.tagName === 'SMALL' ||
    node.tagName === 'CODE' ||
    node.tagName === 'LABEL' ||
    node.tagName === 'INPUT'
  );
}

function convertAttributestoString(attrs) {
  let string = '';
  if(attrs.length === 0) {
    return string;
  }
  for(let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    string += ` <span class="attribute-name">${attr.name}</span>`;
    string += `=<span class="attribute-value">"${attr.value}"</span>`;
  }
  return string;
}

function convertHTMLtoString(node, level = 0) {
  let string = '';
  if(node.nodeType === document.ELEMENT_NODE) {
    // If not inline then create a new block and add some padding
    if(isInline(node) !== true) {
      string += `<div style="padding-left: ${level*10}px">`;
    }
    
    // Self closing tag
    if(node.childNodes.length === 0) {
      string += '<span class="tag">&lt;' + node.tagName + '</span>';  
      string += convertAttributestoString(node.attributes);
      string += '<span class="tag">/&gt;</span>';  
    
    // Node with opening and closing tag
    }else{
      // Opening tag
      string += '<span class="tag">&lt;' + node.tagName + '</span>'; 
      string += convertAttributestoString(node.attributes);
      string += '<span class="tag">&gt;' + '</span>'; 
      // Content
      for(let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        string += convertHTMLtoString(child, level+1);  
      }
      // Closing tag
      string += '<span class="tag">&lt;/' + node.tagName + '&gt;</span>';
    }
    
    // Padding close
    if(isInline(node) !== true) {
      string += "</div>"; 
    }
  }else if(node.nodeType === document.TEXT_NODE){
    if(node.nodeValue.trim() !== '') {
      string += node.nodeValue;  
    }
  }
  return string;
}
let root = document.getElementsByTagName('code')[0];
const string = convertHTMLtoString(root);
document.getElementsByTagName('code')[0].innerHTML = string; // Comment this line to see the original render