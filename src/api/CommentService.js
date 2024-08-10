import NewService from '../core/apisService';

class CommentService extends NewService {
  actCreateComment = (params) => {
    return this.post(this.apiUlr() + '/api/comment', params);
  };
  actGetComment = (params) => {
    return this.get(this.apiUlr() + '/api/comment', params);
  };
  actGetCommentById = (id) => {
    return this.get(this.apiUlr() + `/api/comment/${id}`);
  };
  actUpdateComment = (id, params) => {
    return this.put(this.apiUlr() + `/api/comment/${id}`, params);
  };
  actDeleteComment = (id) => {
    return this.delete(this.apiUlr() + `/api/comment/${id}`);
  };
}
export default CommentService;
