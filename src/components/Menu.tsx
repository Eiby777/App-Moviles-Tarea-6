
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, calculatorSharp, heartOutline, heartSharp, homeSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, tabletPortraitSharp, trailSignSharp, trashOutline, trashSharp, tvSharp, videocamSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  
  {
    title: 'Caja de Herramientas',
    url: '/page/Inbox',
    iosIcon: paperPlaneOutline,
    mdIcon: tvSharp
  },
  {
    title: 'Predecir Género',
    url: '/page/Predecir Género',
    iosIcon: heartOutline,
    mdIcon: trailSignSharp
  },
  {
    title: 'Predecir Edad',
    url: '/page/Predecir Edad',
    iosIcon: archiveOutline,
    mdIcon: tabletPortraitSharp
  },
  {
    title: 'Universidades por pais',
    url: '/page/Universidades',
    iosIcon: trashOutline,
    mdIcon: videocamSharp
  },
  {
    title: 'Clima',
    url: '/page/Clima',
    iosIcon: mailOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Contrátame',
    url: '/page/Contrátame',
    iosIcon: mailOutline,
    mdIcon: homeSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Página de Ionic</IonListHeader>
          
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
