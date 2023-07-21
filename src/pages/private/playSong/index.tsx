import { IonPage, IonContent } from '@ionic/react';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Header, Player, SubHeader } from '../../../components';
import { useLocation } from 'react-router';
import { useFetchSongs } from '../../../stores';
import { AllSongs } from '../shared';
import { playAudio, getAudioSrc } from '../../../utils';

import './playsong.css';

const PlaySong: React.FC = () => {
  const location = useLocation();

  const songState = useFetchSongs();

  const { setCurrentSong } = songState;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { state } = location as { state?: SongsState };

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  const [sliderInfo, setSliderInfo] = useState<PlayerSliderInfo>({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  useLayoutEffect(() => {
    if (songState.getCurrentSong?.id) {
      playAudio(audioRef, audioPlaying, () => {
        setAudioPlaying(true);
        setCurrentSong({
          ...songState?.getCurrentSong,
          playing: true,
        } as CurrentSong);
      });
    }
  }, [songState.getCurrentSong?.id]);

  const timeUpdateHandler = (
    event: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    if (event.currentTarget) {
      const current = event.currentTarget.currentTime;
      const duration = event.currentTarget.duration || 0;

      const roundedCurrent = Math.round(current);
      const roundedDuration = Math.round(duration);
      const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

      updateSliderInfo({
        currentTime: current,
        duration: duration,
        animationPercentage: percentage,
        volume: event.currentTarget?.volume,
      });
    }
  };

  const updateSliderInfo = (slider: Object) => {
    setSliderInfo((prev) => ({
      ...prev,
      ...slider,
    }));
  };

  const onStopSong = () => {
    setAudioPlaying(false);
    setCurrentSong({
      ...songState?.getCurrentSong,
      playing: false,
    } as CurrentSong);
  };

  useEffect(() => {
    if (state?.songHeader) {
      setCurrentSong({
        thumbnail: state?.songHeader?.thumbnail || '',
        title: state?.songHeader?.title || '',
        id: state?.songHeader?.id || '',
        playing: audioPlaying,
      });
    }

    return () => {
      onStopSong();
    };
  }, [state]);

  const onClickPlay = () => {
    playAudio(audioRef, audioPlaying, () => {
      setAudioPlaying((prev) => {
        setCurrentSong({
          ...songState?.getCurrentSong,
          playing: !prev,
        } as CurrentSong);
        return !prev;
      });
    });
  };

  const onClickNextSong = () => {
    const [...songs] = songState.getSongsByPlayer;

    const songsSize = songs.length;

    const currentIdx = songs.findIndex(
      (song) => song.id === songState.getCurrentSong?.id
    );

    if (currentIdx !== -1) {
      const song = songs[(currentIdx + 1) % songsSize];
      const songPayload = {
        id: song.id,
        title: song.videoTitle,
        thumbnail: song.thumbnail,
      };
      setCurrentSong({ ...songPayload, playing: false });

      onSelectSong({ songHeader: songPayload });
    }
  };

  const onClickPrevSong = () => {
    const [...songs] = songState.getSongsByPlayer;

    const songsSize = songs.length;

    const currentIdx = songs.findIndex(
      (song) => song.id === songState.getCurrentSong?.id
    );

    if (currentIdx !== -1) {
      const idx = currentIdx - 1;

      const song = songs[idx === -1 ? songsSize - 1 : idx];

      const songPayload = {
        id: song.id,
        title: song.videoTitle,
        thumbnail: song.thumbnail,
      };

      setCurrentSong({ ...songPayload, playing: false });
      onSelectSong({ songHeader: songPayload });
    }
  };

  const onSelectSong = (...args: SongsState[]) => {
    if (args.length) {
      const [song] = args;

      if (song?.songHeader?.id === songState.getCurrentSong?.id) {
        onClickPlay();
        return;
      }

      playAudio(audioRef, true, () => onStopSong());

      updateSliderInfo({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
        volume: 0,
      });

      setCurrentSong({
        playing: false,
        id: song.songHeader?.id || '',
        title: song.songHeader?.title || '',
        thumbnail: song.songHeader?.thumbnail || '',
      });
    }
  };

  const songEndHandler = async () => {
    await playAudio(audioRef, audioPlaying, () => onStopSong());
    onClickNextSong();
  };

  const memoizedSongs = useMemo(() => {
    return (
      songState.getSongsByPlayer.length > 1 && (
        <div className="next-songs">
          <SubHeader text="Next" subText="Songs" />
          <AllSongs
            loading={false}
            currentSong={songState.getCurrentSong}
            songs={songState.getSongsByPlayer}
            showRightBtn={false}
            onClickPlay={onSelectSong}
          />
        </div>
      )
    );
  }, [songState.getCurrentSong]);

  return (
    <IonPage>
      <Header title={songState.getCurrentSong?.title || ''} showBack />
      <IonContent fullscreen className="ion-padding">
        <div className="play-song">
          {songState.getCurrentSong ? (
            <React.Fragment>
              <Player
                audioRef={audioRef}
                audioPlaying={audioPlaying}
                audioThumbnail={songState.getCurrentSong?.thumbnail || ''}
                audioTitle={songState.getCurrentSong?.title || ''}
                audioSrc={getAudioSrc(songState.getCurrentSong?.id || '')}
                sliderInfo={sliderInfo}
                updateSliderInfo={updateSliderInfo}
                onClickPlay={onClickPlay}
                onClickBack={onClickPrevSong}
                onClickNext={onClickNextSong}
              />
              <audio
                className="audio-none"
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={getAudioSrc(songState.getCurrentSong?.id || '')}
                autoPlay={false}
                onEnded={songEndHandler}
                controls
              />
            </React.Fragment>
          ) : (
            <h1>Loading...</h1>
          )}

          {memoizedSongs}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlaySong;
