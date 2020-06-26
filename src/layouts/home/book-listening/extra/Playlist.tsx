import { SOURCE } from './../../../../app/app-environment';
export const Playlist = {
  getPlaylist: (bookDetail: any) => {
    console.log({bookDetail});
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
    console.log('playlist');
    console.log({playlist});
    // audioUrl: "uploads/audios/psychology1_chapter1.mp3"
    // bookId: 1
    // chapterNumber: 1
    // content: "ចិត្តសាស្ត្រ 1 ជំពូក 1 អ្នកភូមិ​អះអាង​ថា ពលរដ្ឋ ៣នាក់​ត្រូវ​បាន​អាជ្ញាធរ​ខេត្តក្រចេះ​ចាប់​ឃុំខ្លួន និង​យកគ្រឿង​ចក្រ​មកឈូស​ឆាយ​ផ្ទះពួកគេ បន្ទាប់ពី​ពលរដ្ឋ​ទាំងនោះ មិនព្រម​លក់​ដីឱ្យ​ក្រុមហ៊ុន​ឯកជន​មួយ ស្ថិត​ក្នុង​ឃុំ​ស្វាយជ្រះ ស្រុក​ស្នួល។ អ្នកស្រី សេង ស្រី​ស្រស់ អាយុ ២៩ឆ្នាំ រៀបរាប់​ប្រាប់​វី​អូ​ឌីតា​មទូ​រសព្ទ​ថា សមត្ថកិច្ច​ចម្រុះ​ប្រហែល ៥០នាក់ មាន​ទាំង​កម្លាំង​ប៉េ​អឹម និង​នគរបាល​ប្រដាប់ដោយ​កាំភ្លើង និង​អាជ្ញាធរ​ស្លៀកពាក់​ស៊ីវិល​ផង បាន​ចុះទៅ​ចាប់ខ្លួន​ឪពុក​របស់​គាត់ និង​អ្នកភូមិ ២នាក់​ផ្សេងទៀត បញ្ជូន​ទៅ​តុលាការ​ កាលពី​ថ្ងៃទី១ ខែមិថុនា។"
    // createdAt: "2020-06-13T07:25:03.626Z"
    // duration: 100
    // id: 1
    // title: "Psychology 1 Chapter 1"
    // updatedAt: "2020-06-13T07:25:03.626Z"
    //   {
    //     "id": "1111",
    //     "url": "https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj",
    //     "title": "Longing",
    //     "artist": "David Chavez",
    //     "artwork": "https://i.picsum.photos/id/100/200/200.jpg",
    //     "duration": 143
    //   }
    return playlist;
  },
};
