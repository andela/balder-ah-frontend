import MockAdapter from 'axios-mock-adapter';
import axios from '../../../utils/axiosInstance';
import { bookmarkArticle, unbookmarkArticle } from '../../../actions/reactions/bookmark';
import {
  BOOKMARK,
  BOOKMARK_ERROR,
  BOOKMARK_ON_ALL,
  UNBOOKMARK,
  UNBOOKMARK_ERROR,
  UNBOOKMARK_ON_ALL,
} from '../../../actions/types';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const slug = 'testing-123';
const id = '3';
const articlePage = 'allArticles';

describe('Bookmark action tests', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    dispatch.mockRestore();
    axiosMock.reset();
  });

  describe('Bookmark an article with correct type', () => {
    test('should bookmark an article for reading later', async () => {
      const payload = { message: 'Bookmarked article successully', bookmarked: true };
      await axiosMock.onPost().replyOnce(200, payload);
      await bookmarkArticle(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: BOOKMARK, payload });
    });

    test('should bookmark an article on all articles page for reading later', async () => {
      const payload = { data: { message: 'Bookmarked article successully', bookmarked: true }, id };
      await axiosMock.onPost().replyOnce(200, payload.data);
      await bookmarkArticle(slug, articlePage, id)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: BOOKMARK_ON_ALL, payload });
    });

    test('should not bookmark an article', async () => {
      const payload = 'Please login to bookmark an article';
      await axiosMock.onPost().replyOnce(403, payload);
      await bookmarkArticle(slug)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: BOOKMARK_ERROR, payload });
    });
  });

  describe('Un-Bookmark an article with correct type', () => {
    test('should unbookmark an article after reading', async () => {
      const payload = { message: 'un-bookmarked article successully', bookmarked: false };
      await axiosMock.onDelete().replyOnce(200, payload);
      await unbookmarkArticle(id)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNBOOKMARK, payload });
    });

    test('should unbookmark an article on all articles page after reading', async () => {
      const articleId = id;
      const payload = { data: { message: 'un-bookmarked article successully', bookmarked: false }, articleId };
      await axiosMock.onDelete().replyOnce(200, payload.data);
      await unbookmarkArticle(articleId, articlePage)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNBOOKMARK_ON_ALL, payload });
    });

    test('should not unbookmark an article', async () => {
      const payload = 'Article can not be unbookmarked';
      await axiosMock.onDelete().replyOnce(500, payload);
      await unbookmarkArticle(id)(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({ type: UNBOOKMARK_ERROR, payload });
    });
  });
});
