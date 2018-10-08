import '../styles/styles.scss';
import { initBarAnimation } from './skills-animation';
import { addOfflineChecking } from './connection-checker';

initBarAnimation();
const offlineElement = document.getElementById('connection-status');
if(offlineElement) addOfflineChecking(offlineElement);


