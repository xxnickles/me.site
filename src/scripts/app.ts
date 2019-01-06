import '../styles/styles.scss';
import { initBarAnimation } from './skills-animation';
import { addOfflineChecking } from './connection-checker';
import { setFooterDate } from './footerDate';

initBarAnimation();
setFooterDate('footer > section#year')
const offlineElement = document.getElementById('connection-status');
if(offlineElement) addOfflineChecking(offlineElement);


