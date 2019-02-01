import {
  CREATE_ARTICLE,
  ERROR_CREATE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLE_ERROR,
  LIKE,
  UNLIKE,
  LIKE_ERROR,
  GET_ARTICLE_COMMENTS,
  COMMENT_ON_ARTICLE,
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_SUCCESS_MSG,
  GET_ALL_ARTICLES_FAILURE_MSG,
  BOOKMARK,
  BOOKMARK_ERROR,
  BOOKMARK_ON_ALL,
  UNBOOKMARK,
  UNBOOKMARK_ERROR,
  UNBOOKMARK_ON_ALL,
  EDIT_COMMENT,
} from '../actions/types';

const initialState = {
  response: '',
  selectedArticle: { comments: [] },
  all: { data: [], pageCount: 0 },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  const { all: { data } } = state;
  const { selectedArticle } = state;
  switch (type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        response: payload,
      };
    case ERROR_CREATE_ARTICLE:
      return {
        ...state,
        response: { message: payload },
      };
    case VIEW_ARTICLE:
      return {
        ...state,
        response: action.payload,
        isLike: action.payload.getOneArticle.favorited,
      };
    case VIEW_ARTICLE_ERROR:
      return {
        ...state,
        response: { message: payload },
      };
    case LIKE:
      return {
        ...state,
        type: action.type,
        isLike: true,
      };
    case UNLIKE:
      return {
        ...state,
        type: action.type,
        isLike: false,
      };
    case LIKE_ERROR:
      return {
        ...state,
        type: action.type,
        likeError: action.error,
      };
    case GET_ARTICLE_COMMENTS:
      return payload
        ? { ...state, selectedArticle: { ...state.selectedArticle, comments: payload } }
        : { ...state };
    case COMMENT_ON_ARTICLE:
      return { ...state };
    case GET_ALL_ARTICLES:
      return { ...state, all: action.payload };
    case GET_ALL_ARTICLES_SUCCESS_MSG:
      return { ...state, message: action.payload };
    case GET_ALL_ARTICLES_FAILURE_MSG:
      return { ...state, message: action.payload };
    case BOOKMARK:
      return {
        ...state,
        response: {
          ...state.response,
          getOneArticle: {
            ...state.response.getOneArticle,
            bookmarked: true,
          },
        },
      };

    case BOOKMARK_ON_ALL:
      return {
        ...state,
        all: {
          ...state.all,
          data: data.map((article) => {
            if (article.id === payload.id) {
              const modifiedArticle = { ...article };
              modifiedArticle.bookmarked = true;
              return modifiedArticle;
            }
            return article;
          }),
        },
      };

    case BOOKMARK_ERROR:
      return {
        ...state,
        bookMarkmessage: action.payload,
      };
    case UNBOOKMARK:
      return {
        ...state,
        response: {
          ...state.response,
          getOneArticle: {
            ...state.response.getOneArticle,
            bookmarked: false,
          },
        },
      };

    case UNBOOKMARK_ON_ALL:
      return {
        ...state,
        all: {
          ...state.all,
          data: data.map((article) => {
            if (article.id === payload.articleId) {
              const modifiedArticle = { ...article };
              modifiedArticle.bookmarked = false;
              return modifiedArticle;
            }
            return article;
          }),
        },
      };

    case UNBOOKMARK_ERROR:
      return {
        ...state,
        unbookmarkMessage: action.payload,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        selectedArticle: {
          ...selectedArticle,
          comments: selectedArticle.comments.map((comment) => {
            if (comment.id === payload.id) {
              const updatedComment = { ...comment };
              updatedComment.body = payload.body;
              return updatedComment;
            }
            return comment;
          }),
        },
      };
    default:
      return state;
  }
};
