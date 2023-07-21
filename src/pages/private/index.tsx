import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import BottomTabs from './bottomTabs/BottomTabs';
import { Redirect, Route } from 'react-router';
import Search from './search/Search';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import Songs from './songs/Songs';
import { SongForm } from './songForm';
import MixedAllChannels from './mixedAllChannels';
import MixedAllSongs from './mixedAllSongs';
import PlaySong from './playSong';

const PrivatePage: React.FC = () => {
  return (
    <IonPage>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/tab" />
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/playSong">
            <PlaySong />
          </Route>
          <Route exact path="/mixedAllChannels">
            <MixedAllChannels />
          </Route>
          <Route exact path="/mixedAllSongs">
            <MixedAllSongs />
          </Route>
          <Route exact path="/songForm">
            <SongForm />
          </Route>
          <Route exact path="/songs/:id">
            <Songs />
          </Route>
          <Route path="/tab">
            <BottomTabs />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  );
};
export default PrivatePage;
