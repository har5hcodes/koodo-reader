import NoteModel from "../../model/Note";
import BookmarkModel from "../../model/Bookmark";
import HtmlBookModel from "../../model/HtmlBook";
import AddTrash from "../../utils/readUtils/addTrash";
// declare var window: any;
export function handleNotes(notes: NoteModel[]) {
  return { type: "HANDLE_NOTES", payload: notes };
}
export function handleOriginalText(originalText: string) {
  return { type: "HANDLE_ORIGINAL_TEXT", payload: originalText };
}
export function handleColor(color: number) {
  return { type: "HANDLE_COLOR", payload: color };
}
export function handleBookmarks(bookmarks: BookmarkModel[]) {
  return { type: "HANDLE_BOOKMARKS", payload: bookmarks };
}
export function handleDigests(digests: NoteModel[]) {
  return { type: "HANDLE_DIGESTS", payload: digests };
}
export function handleHtmlBook(htmlBook: HtmlBookModel) {
  return { type: "HANDLE_HTML_BOOK", payload: htmlBook };
}
export function handleCurrentChapter(currentChapter: string) {
  return { type: "HANDLE_CURRENT_CHAPTER", payload: currentChapter };
}
export function handleCurrentChapterIndex(currentChapterIndex: number) {
  return { type: "HANDLE_CURRENT_CHAPTER_INDEX", payload: currentChapterIndex };
}
export function handleChapters(chapters: any) {
  return { type: "HANDLE_CHAPTERS", payload: chapters };
}
export function handleNoteKey(key: string) {
  return { type: "HANDLE_NOTE_KEY", payload: key };
}
export function handleFetchNotes() {
  return (dispatch: (arg0: { type: string; payload: NoteModel[] }) => void) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get?key=notes`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          let noteArr = data.data;
          let keyArr = AddTrash.getAllTrash();
          dispatch(handleNotes(handleKeyRemove(noteArr, keyArr)));
          dispatch(
            handleDigests(
              handleKeyRemove(
                noteArr.filter((item: NoteModel) => item.notes === ""),
                keyArr
              )
            )
          );
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };
}
export function handleFetchBookmarks() {
  return (
    dispatch: (arg0: { type: string; payload: BookmarkModel[] }) => void
  ) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get?key=bookmarks`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && data.data != null) {
          let bookmarkArr = data.data;
          let keyArr = AddTrash.getAllTrash();
          dispatch(handleBookmarks(handleKeyRemove(bookmarkArr, keyArr)));
        } else {
          return;
        }
      })
      .catch((error) => console.error("Error fetching bookmarks:", error));
  };
}
const handleKeyRemove = (items: any[], arr: string[]) => {
  let itemArr: any[] = [];
  if (!arr[0]) {
    return items;
  }
  for (let i = 0; i < items.length; i++) {
    if (arr.indexOf(items[i].bookKey) === -1) {
      itemArr.push(items[i]);
    }
  }
  return itemArr;
};
