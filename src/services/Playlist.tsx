import { SOURCE } from './../app/app-environment';
export const Playlist = {
  getPlaylist: (book: any) => {
    let playlist = book.chapters.map((track: any) => {
      return {
        "id": track.uuid,
        "url": SOURCE + track.audioUrl,
        "title": track.title,
        "artist": book.authorname,
        "artwork": SOURCE + book.imageUrl,
        "duration": track.duration
      }
    });
    return playlist;
  },
};
