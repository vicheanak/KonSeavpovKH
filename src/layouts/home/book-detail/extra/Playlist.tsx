import { SOURCE } from './../../../../app/app-environment';
export const Playlist = {
  getPlaylist: (bookDetail: any) => {
    let playlist = bookDetail.chapters.map((track: any) => {
      return {
        "id": track.id,
        "url": SOURCE + track.audioUrl,
        "title": track.title,
        "artist": bookDetail.book.authorname,
        "artwork": SOURCE + bookDetail.book.imageUrl,
        "duration": track.duration
      }
    });
    return playlist;
  },
};
