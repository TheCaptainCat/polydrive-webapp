window.addEventListener('dragenter', function( event ) {
  event.preventDefault();
  document.getElementById('drag-drop').classList.add('visible');
}, false);

window.addEventListener('dragleave', function( event ) {
  if (event.pageX != 0 || event.pageY != 0) {
    return false;
  }
  document.getElementById('drag-drop').classList.remove('visible');
}, false);

window.addEventListener('drop', function( event ) {
  console.log('DROP');
}, false);

window.addEventListener('dragdrop', function( event ) {
  console.log('dragDROP');
}, false);

window.addEventListener('dragover', function( event ) {
  event.preventDefault();
}, false);

window.addEventListener('dragend', function( event ) {
  console.log('dragend');
}, false);
