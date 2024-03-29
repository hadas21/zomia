export const FETCH_ARTICLES = "FETCH_ARTICLES";
export const CREATE_ARTICLE = "CREATE_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../store";
import { Article } from "../../models/Article";
import { toast } from "react-toastify";
import { mockArticles } from "../../MOCK_DATA";

export const saveArticle = (item) => {
  return async (dispatch) => {
    try {
      await addDoc(collection(db, "articles"), {
        article: item,
      });

      dispatch({
        type: CREATE_ARTICLE,
        payload: {
          title: item.title,
          author: item.author,
          date: item.date,
          image: item.image,
          text: item.text,
          photoAttribution: item.photoAttribution,
          description: item.description,
          links: item.link,
          additionalImg: item.additionalImg,
        },
      });
      toast("Article has been successfully created");
    } catch (e) {
      toast("Error adding document: " + e);
    }
  };
};

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      let articles = [];

      const querySnapshot = await getDocs(collection(db, "articles"));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log("<<<<<<<doc", doc.data());
        articles.push(
          new Article(
            doc.id,
            doc.data().article.title ?? "",
            doc.data().article.image ?? "",
            doc.data().article.date ?? "",
            doc.data().article.author ?? "",
            doc.data().article.category ?? "",
            doc.data().article.description ?? "",
            doc.data().article.links ?? "",
            doc.data().article.text ?? "",
            doc.data().article.photoAttribution ?? "",
            doc.data().article.additionalImg ?? ""
          )
        );
      });

      // console.log("<<<<articles", articles);

      // USE THIS TO CONNECT TO HARDCODED DATA IF GOOGLE CLOUD IS DOWN
      // articles = mockArticles;

      dispatch({
        type: FETCH_ARTICLES,
        payload: articles,
      });
    } catch (err) {
      toast("fetch article error" + err);
    }
  };
};

export const deleteArticle = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "articles", id));
      dispatch({
        type: DELETE_ARTICLE,
        payload: id,
      });
      toast("Article has been successfully deleted");
    } catch (err) {
      toast("delete article error" + err);
    }
  };
};

export const updateArticle = (item) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "articles", item.id), {
        article: item,
      });

      dispatch({
        type: UPDATE_ARTICLE,
        payload: {
          title: item.title,
          image: item.image,
          date: item.date,
          author: item.author,
          description: item.description,
          links: item.link,
          text: item.text,
          photoAttribution: item.photoAttribution,
          additionalImg: item.additionalImg,
        },
        id: item.id,
      });
      toast("Article has been successfully updated");
    } catch (e) {
      toast("Error updating document: " + e);
    }
  };
};
