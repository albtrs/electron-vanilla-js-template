//import 'ress/dist/ress.min.css';
import './index.css';

function popup() {
  //const text = document.getElementById("sample-text").value;
  alert('????');
}

const btnTest = document.getElementById('sample-button');
btnTest.addEventListener('click', async () => {
    await window.apis.simpleDialog("OK");
});

//async function openDialog() {
//  const result = await ipcRenderer.invoke('open-dialog', 'Hello, Electron!')
//  console.log(result)
//}
//
//openDialog()
