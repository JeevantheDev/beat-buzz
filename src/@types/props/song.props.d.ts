interface SongProps {
  isPlaying?: boolean;
  onClickDelete?: Function;
  showRightBtn?: boolean;
  onAddToPlaylist?: Function;
  playlist?: Playlists;
  playlists?: ImmutableArray<Playlists>;
  playlistAction?: 'add' | 'delete';
}
