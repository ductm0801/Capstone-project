import NewService from '../core/apisService';

class TournamentService extends NewService {
  actCreateTournament = (params) => {
    return this.post(this.apiUlr() + '/api/tournament', params);
  };
  actGetTournament = (id) => {
    return this.get(this.apiUlr() + `/api/tournament/${id}`);
  };

}
export default TournamentService;
