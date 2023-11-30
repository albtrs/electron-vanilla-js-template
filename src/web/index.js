//import 'ress/dist/ress.min.css';
import './index.css';

const button = document.getElementById('sample-button');
button.addEventListener('click', async () => {
    await window.apis.simpleDialog("OK");
});
