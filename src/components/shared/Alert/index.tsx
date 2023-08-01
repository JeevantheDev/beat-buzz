import { IonToast } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import React from 'react';

interface IProps {
  dismissHandler: (type?: 'auto' | 'click') => void;
  message?: string;
}

export const Alert: React.FC<IProps> = ({ dismissHandler, message }) => {
  return (
    <IonToast
      isOpen={!!message}
      message={message}
      color="danger"
      duration={1500000000}
      position="top"
      buttons={[
        {
          text: '',
          role: 'cancel',
          icon: closeCircle,
          handler: () => {
            dismissHandler('click');
          },
        },
      ]}
      onDidDismiss={(e: CustomEvent) => dismissHandler('auto')}
    />
  );
};
